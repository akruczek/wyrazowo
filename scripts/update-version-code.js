const fs = require('fs');

fs.readFile('../package.json', 'utf8', (readPackageJsonError, packageJsonData) => {
  if (readPackageJsonError) {
    return console.log('\x1b[31mError reading package.json file!\x1b[0m')
  }

  const oldVersion = process.argv[process.argv.length - 2]
  const newVersion = process.argv[process.argv.length - 1]

  const oldVersionCode = [
    Number(newVersion.split('.')[0]) * 100,
    oldVersion.split('.')[1],
    oldVersion.split('.')[2],
  ].join('')

  const newVersionCode = [
    Number(newVersion.split('.')[0]) * 100,
    newVersion.split('.')[1],
    newVersion.split('.')[2],
  ].join('')

  console.log(`Updating: ${oldVersion} (${oldVersionCode}) -> ${newVersion} (${newVersionCode})`)

  const newPackageJsonData = packageJsonData.replace(`"version": "${oldVersion}",`, `"version": "${newVersion}",`)

  console.log('\x1b[33mUpdating package.json...\x1b[0m')

  fs.writeFile('../package.json', newPackageJsonData, 'utf8', error => {
    if (error) {
      return console.log('\x1b[31mError writing package.json file!\x1b[0m');
    }

    console.log('\x1b[32mSuccessfully updated package.json file!\x1b[0m')
  });

  console.log('\x1b[33mUpdating android/app/build.gradle...\x1b[0m')

  fs.readFile('../android/app/build.gradle', 'utf8', (readBuildGradleError, buildGradleData) => {
    if (readBuildGradleError) {
      return console.log('\x1b[31mError reading build.gradle file!\x1b[0m')
    }

    const newBuildGradle = buildGradleData
      .replace(`versionCode ${oldVersionCode}`, `versionCode ${newVersionCode}`)
      .replace(`versionName "${oldVersion}"`, `versionName "${newVersion}"`)

    fs.writeFile('../android/app/build.gradle', newBuildGradle, 'utf8', error => {
      if (error) {
        return console.log('\x1b[31mError writing build.gradle file!\x1b[0m');
      }
  
      console.log('\x1b[32mSuccessfully updated build.gradle file!\x1b[0m')
    });
  })

  fs.readFile('../ios/ScrabbleHelper.xcodeproj/project.pbxproj', 'utf8', (readPbxprojError, pbxprojData) => {
    if (readPbxprojError) {
      return console.log('\x1b[31mError reading project.pbxproj file!\x1b[0m')
    }

    const newPbxproj = pbxprojData
      .replace(`CURRENT_PROJECT_VERSION = ${oldVersionCode};`, `CURRENT_PROJECT_VERSION = ${newVersionCode};`)
      .replace(`MARKETING_VERSION = ${oldVersion};`, `MARKETING_VERSION = ${newVersion};`)
      .replace(`CURRENT_PROJECT_VERSION = ${oldVersionCode};`, `CURRENT_PROJECT_VERSION = ${newVersionCode};`)
      .replace(`MARKETING_VERSION = ${oldVersion};`, `MARKETING_VERSION = ${newVersion};`)

    fs.writeFile('../ios/ScrabbleHelper.xcodeproj/project.pbxproj', newPbxproj, 'utf8', error => {
      if (error) {
        return console.log('\x1b[31mError writing project.pbxproj file!\x1b[0m');
      }
  
      console.log('\x1b[32mSuccessfully updated project.pbxproj file!\x1b[0m')
    });
  })
});
