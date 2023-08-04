// This script is to be used as part of the first time setup of this repo.
// It will generate a .npmrc file using env variables or by searching the .env file
// The auth key is needed to install the MachineCloud webapp components private package

const { readFileSync, writeFileSync, existsSync } = require('fs')

const MACHINE_CLOUD_NPM_AUTH_TOKEN = 'MACHINE_CLOUD_NPM_AUTH_TOKEN'
const NPMRC_PATH = './.npmrc'

const checkIfNpmrcFilePresent = () => {
  return existsSync(NPMRC_PATH)
}

const createNpmrcFile = authToken => {
  let contents = `registry=https://registry.npmjs.org/
  
always-auth=true
@ventionco:registry=https://npm.pkg.github.com/
_authToken=${authToken}

//npm.pkg.github.com/:_authToken=${authToken}
//npm.pkg.github.com/ventionco/:_authToken=${authToken}`

  writeFileSync(NPMRC_PATH, contents)
  console.log('|-> .npmrc file generated')
}

// assumes all files will have the pattern of key<separator>value
const getTokenFromFile = (filePath, separator) => {
  try {
    let matchingRow = readFileSync(filePath)
      .toString()
      .split('\n')
      .find(row => row.trim().includes(MACHINE_CLOUD_NPM_AUTH_TOKEN))

    let token = matchingRow ? matchingRow.split(separator)[1] : ''

    console.log(`|-> Token${token ? '' : ' not'} found in '${filePath}'`)

    return token
  } catch (error) {
    console.warn(`WARNING: unable to access: ${filePath}`)
    return ''
  }
}

const getAuthToken = () => {
  // desired precedence: shell env vars > .env
  return process.env.MACHINE_CLOUD_NPM_AUTH_TOKEN || getTokenFromFile('./.env', '=') || ''
}

const main = () => {
  console.log('--- NPMRC file generation ---')
  if (checkIfNpmrcFilePresent()) {
    console.log('|-> .npmrc file already present')
    console.log('|-> skipping generation')
    return
  }

  let authToken = getAuthToken().trim()

  if (!authToken) {
    console.error('ERROR: no machine cloud auth token found')
    console.warn(
      '|-> make sure to set the environment variable MACHINE_CLOUD_NPM_AUTH_TOKEN or add it to the env file'
    )
    console.log(
      '|-> You can generate one by following this guide: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    )
    console.log('|-> You will need a token with read:packages scope')
    process.exit(1)
  } else {
    try {
      createNpmrcFile(authToken)
    } catch (error) {
      console.error('ERROR: .npmrc file creation failed')
      console.error(error)
      process.exit(1)
    }
  }
}

main()
process.exit(0)
