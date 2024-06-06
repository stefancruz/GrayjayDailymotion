# Dailymotion plugin for Grayjay - work in progress


Click [here](https://stefancruz.github.io/GrayjayDailymotion/index.html) to install into Grayjay


## Install
npm install

## Update graphql types (optional)

npm run get-token

npm run codegen

## Build

npm run build

npm start - will build and watch for changes

# notes:
- Content of the 'build' folder should not be manually changed because it's recreated for each build. 
- Used [rollup](https://rollupjs.org/) to bundle all the scripts into one.
- Used npm shrinkwrap to lock the dependency versions of the project. This should avoid new bugs, vulnerabilities and breaking changes (in minor and patches), introduced when the dependencies are automatically updated by npm.