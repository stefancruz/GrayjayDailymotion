# Dailymotion plugin for Grayjay - work in progress

Click [here](https://stefancruz.github.io/GrayjayDailymotion/index.html) to install into Grayjay

## Features
- [x] - Home
- [x] - Home search
- [x] - Live videos from home search
- [x] - Search autocomplete
- [x] - Video details (likes, dislikes, views, publish date)
- [x] - Subscriptions
- [x] - Channel search
- [x] - Channel details
- [x] - Channel playlist tab
- [x] - Downloads
- [x] - Playlists search
- [x] - Settings / Thumbnail resolution
- [x] - Settings / Creator avatar resolution
- [x] - Settings / Hide sensitive content
- [x] - Settings / Prefered Country
- [x] - Sign in (import subscriptions and playlists (and Likes, Favorites, Recently Watched))
- [x] - Policentric Comments
- [x] - Subtitles
- [x] - State management

## Todo 
- [ ] - Unit tests - (wip)
- [ ] - Platform comments (not generally available) - (wip)

## Known bugs
- [ ] - Live filter in Subscriptions tab


## Install
npm install

## Update graphql types (optional)

npm run codegen

## Build

npm run build

npm start - will build and watch for changes

# notes:
- Content of the 'build' folder should not be manually changed since it's recreated for each build. 
- Used [rollup](https://rollupjs.org/) to bundle all the scripts into one.
- Used npm shrinkwrap to lock the dependency versions of the project. This should avoid new bugs, vulnerabilities and breaking changes (in minor and patches), introduced when the dependencies are automatically updated by npm.