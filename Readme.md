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
- [x] - Polycentric Comments
- [x] - Subtitles
- [x] - Platform comments (not generally available on Platform) - (WIP)

## Work in progress (WIP)

- [ ] - Harbor account verification

## Internals

- [x] - Save state between clients;
- [x] - Batch http requests when possible;
- [ ] - Optimize GraphQL queries;
- [ ] - Clean up request Headers;
- [ ] - Stop using configuration option allowAllHttpHeaderAccess;
- [ ] - Unit tests - (WIP);
- [ ] - Dev submit;
- [ ] - API fields deprecated with replacement not available yet (video?.viewCount, video?.stats?.views?.total);


## Todo 
- [ ] - Search creator's content;

## Grayjay
- [ ] - Live filter in Subscriptions tab
- [ ] - Thumbnails for vertical videos


## Install
npm install

## Update graphql types (optional)

npm run codegen

## Build

npm run build

npm start - will build and watch for changes

## Notes
- Content of the 'build' folder should not be manually changed since it's recreated for each build. 
- Used [rollup](https://rollupjs.org/) to bundle all the scripts into one.
- Used npm shrinkwrap to lock the dependency versions of the project. This should avoid new bugs, vulnerabilities and breaking changes (in minor and patches), introduced when the dependencies are automatically updated by npm.