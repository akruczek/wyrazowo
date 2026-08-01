# Release process

> **Audience: humans.** This is the manual checklist for cutting a release and creating the git tag.
> It describes what this project has actually done for 59 releases, so a new release looks like the
> old ones. There is no CI and no fastlane — every step is run by hand.

Related: [`09-build-and-tooling.md`](09-build-and-tooling.md#versioning) explains the `versionCode`
arithmetic, [`12-project-history.md`](12-project-history.md) lists what shipped in each version.

---

## Quick checklist

For a normal minor release `1.22.1` → `1.23.0`:

```bash
git checkout develop && git pull                  # 1. start from up-to-date trunk
git checkout -b release/1.23.0                    # 2. release branch

cd scripts && node update-version-code.js 1.22.1 1.23.0 && cd ..
                                                  # 3. bump the three version files
# 4. edit changelog.md by hand — add the 1.23.0 section at the top
git commit -am "v1.23.0 bump version"

# ... do the release work, one commit per change, each prefixed "v1.23.0 " ...

git push -u origin release/1.23.0                 # 5. push branch, open PR into develop
# 6. merge the PR on GitHub

git checkout develop && git pull                  # 7. get the merge commit locally
git tag v1.23.0                                   # 8. tag it
git push origin v1.23.0                           # 9. push the tag — this is NOT automatic
```

Then build and upload to the stores from the tagged commit.

---

## How this repo has actually done it

Evidence from the history, so the convention is not guesswork:

| Fact | Detail |
| --- | --- |
| Trunk branch | `develop`. There is no `master` or `main` — `origin/HEAD` points at `develop`. |
| Release branches | `release/X.Y.Z`, branched from and merged back into `develop`. |
| Merge style | GitHub pull request, merge commit (`Merge pull request #22 from akruczek/release/1.22.0`). |
| Tag name | `vX.Y.Z` — lowercase `v`, no space, no suffix. |
| Tag type | **Lightweight** (plain `git tag vX.Y.Z`, no `-a`, no message). All 59 existing tags are lightweight. |
| What gets tagged | Minor releases: the **merge commit** on `develop`. Patch releases: usually the single fix commit. |
| Commit format | `vX.Y.Z lowercase description`, every commit in the release carries the version prefix. |
| Tags on origin | Yes, all tags are pushed. |

Two shapes of release show up in the log:

**Minor release** — a branch with several commits, merged via PR, tag on the merge commit:

```
41bc21a (tag: v1.22.0)  Merge pull request #22 from akruczek/release/1.22.0
01a9115                 v1.22.0 handle unhandled promise rejections - network
3e59458                 v1.22.0 advanced native search engine android
d04c46a                 v1.22.0 bump version
```

**Patch release** — a single fix commit on `develop`, tagged directly:

```
4f8bd6f (tag: v1.18.1)  v1.18.1 fix displaying Tx children
afa7f00 (tag: v1.10.1)  v1.10.1 fix google sign in on android and user data refresh in more tab
```

For a patch you can skip the release branch and PR entirely: commit on `develop`, tag, push.

---

## Step by step

### 1. Decide the version number

Semver as used here: **minor** for new features or dependency upgrades, **patch** for fixes only.
Major has never been bumped and doing so needs care — see the warning at the bottom.

### 2. Bump the version

```bash
cd scripts
node update-version-code.js 1.22.1 1.23.0
```

Both the old and the new version are required, in that order. The script does literal string
replacement across three files:

| File | What changes |
| --- | --- |
| `package.json` | `version` |
| `android/app/build.gradle` | `versionCode`, `versionName` |
| `ios/Wyrazowo.xcodeproj/project.pbxproj` | `CURRENT_PROJECT_VERSION`, `MARKETING_VERSION` (both Debug and Release) |

It prints a green success line per file. **Check `git diff` afterwards** — because it is string
replacement, a mismatched old version fails silently with no error and no change.

The version code is `major × 100`, then minor, then patch, concatenated: `1.23.0` → `100230`.

### 3. Update `changelog.md` by hand

The script does not touch it. Newest version goes at the top. Format:

```markdown
## 1.23.0 OPTIONAL TITLE
### Added
- New thing a user can see

### Changed
- Behaviour that is different now

### Fixed
- Bug that is gone

### Technical
- Refactors, dependency upgrades, anything invisible to users
```

The title in caps (`## 1.22.0 ADVANCED SEARCH`) is used for releases with a headline feature and
omitted for smaller ones. Only include the subsections you need. Because every commit is prefixed
with its version, `git log --grep "v1.23.0"` gives you the raw material for this section.

### 4. Do the work

One commit per logical change, each subject starting with the version:

```
v1.23.0 move word corpus into native assets
```

### 5. Open and merge the pull request

Push the branch and open a PR **into `develop`**. Title has been `Release/X.Y.Z`. Merge it on GitHub
with a merge commit — that merge commit is what gets tagged.

### 6. Create the tag

```bash
git checkout develop
git pull
git log -1 --oneline          # confirm you are on the merge commit you expect
git tag v1.23.0
git push origin v1.23.0
```

`git push` alone does **not** push tags. Without `git push origin v1.23.0` the tag stays on your
machine only.

To verify:

```bash
git ls-remote --tags origin | grep v1.23.0
```

### 7. Build and upload

There is no automation. Builds are made by hand:

- **iOS** — open `ios/Wyrazowo.xcworkspace` in Xcode, select a device target, Product → Archive.
- **Android** — `cd android && ./gradlew bundleRelease`.

Before either will work you need the word database generated, since `src/assets/slowa*.ts` is
gitignored — see the [setup runbook](09-build-and-tooling.md#setup-runbook).

> **Android release builds are currently signed with the committed `debug.keystore`.** Google Play
> will not accept an upload signed with a different key than the existing listing. This is a real
> release blocker; see [`11-tech-debt-and-modernization.md`](11-tech-debt-and-modernization.md).

---

## Fixing a mistake

```bash
git tag -d v1.23.0                    # delete locally
git push origin :refs/tags/v1.23.0    # delete on origin
```

Only do this if nobody has pulled the tag yet. Otherwise leave it and tag the correction as a new
patch version.

---

## Known irregularities in the existing tags

Worth knowing so they are not mistaken for a pattern to copy:

- **`v.1.11.0`** has a stray dot and there is no `v1.11.0`. A typo that was never corrected.
- **`v1.22.1` was never tagged.** The version shipped — `package.json`, `changelog.md` and the commit
  `eba0481` all say 1.22.1 — but the branch `release/1.22.1` was never merged into `develop` and no
  tag was created. The last tag is `v1.22.0` from April 2024. Decide whether to merge and tag it
  retroactively or fold it into the next release.
- Some minor releases (`v1.21.0`) are tagged on a plain commit rather than a merge commit, because
  the work landed on `develop` directly.

---

## Warning about a major version bump

Going to `2.0.0` breaks two things at once and needs manual fixing:

1. **The version code goes backwards.** `2.0.0` computes to `20000`, which is lower than `1.22.1`'s
   `100221`. Google Play rejects an upload whose `versionCode` is not higher than the last one.
2. **The bump script silently no-ops.** It builds the *old* version's code using the *new* major, so
   its search string does not match what is in the files, and the Gradle and Xcode replacements do
   nothing while still printing success.

Change the scheme to `major * 10000 + minor * 100 + patch` before ever bumping the major.
