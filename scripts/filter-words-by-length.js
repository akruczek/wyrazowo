const fs = require('fs');

fs.readFile('../src/assets/slowa.ts', 'utf8', (readPackageJsonError, packageJsonData) => {
  if (readPackageJsonError) {
    return console.log('\x1b[31mError reading slowa.ts file!\x1b[0m')
  }

  const _length = process.argv[process.argv.length - 1]

  console.log(`\x1b[33mGenerating slowa${_length}.ts file...\x1b[0m`)

  const words = packageJsonData
    ?.split("'")
    ?.[1]
    ?.split('.')
    ?.filter(({ length }) => _length == length)

  fs.writeFile(`../src/assets/slowa${_length}.ts`, `export default '${words.join('.')}'`, 'utf8', error => {
    if (error) {
      return console.log(`\x1b[31mError writing slowa${_length}.ts file!\x1b[0m`)
    }

    console.log(`\x1b[32mSuccessfully generated slowa${_length}.ts file with ${words.length} words!\x1b[0m`)
  })
})
