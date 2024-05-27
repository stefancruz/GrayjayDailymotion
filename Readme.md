# Dailymotion plugin for Grayjay - work in progress


Click [here](https://stefancruz.github.io/GrayjayDailymotion/index.html) to install into Grayjay


npm install

optional to update graphql types:
npm run get-token
npm run codegen

npm run build

# notes:
- Content of the 'build' folder should not be manually changed because it's recreated for each build. 
- Eventually the build will be done on ci/cd but for now, the build folder wil be committed to source control
- Used [rollup](https://rollupjs.org/) to bundle all the scripts into one.
- Used npm shrinkwrap to lock the dependency versions of the project. This should avoid new bugs, vulnerabilities and breaking changes (in minor and patches), introduced when the dependencies are automatically updated by npm.