let AUTHORIZATION_TOKEN_ANONYMOUS_USER: string = "";
let AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE: number;
let httpClientRequestToken: IHttp = http.newClient(false);

import { Collection, Maybe, User, Video } from '../types/CodeGenDailymotion';
import { SourceCollectionToGrayjayPlaylistDetails, SourceVideoToGrayjayVideo } from './Mappers';
import {
    BASE_URL,
    USER_AGENT,
    BASE_URL_API,
    X_DM_Preferred_Country,
    COUNTRY_NAMES,
    COUNTRY_NAMES_TO_CODE,
    CLIENT_ID,
    CLIENT_SECRET,
    BASE_URL_API_AUTH,
    DURATION_THRESHOLDS,
} from './constants'
import { GET_FAVORITES_GQL_QUERY, GET_LIKED_VIDEOS_GQL_QUERY, GET_RECENTLY_WATCHED_GQL_QUERY } from './gqlQueries';

export function getPreferredCountry(preferredCountryIndex) {
    const countryName = COUNTRY_NAMES[preferredCountryIndex];
    const code = COUNTRY_NAMES_TO_CODE[countryName];
    const preferredCountry = (code || X_DM_Preferred_Country || '').toLowerCase();
    return preferredCountry;
}

export const objectToUrlEncodedString = (obj) => {

    const encodedParams: string[] = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {

            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(obj[key]);
            encodedParams.push(`${encodedKey}=${encodedValue}`);
        }
    }

    return encodedParams.join('&');
}


export function getChannelNameFromUrl(url) {
    const channel_name = url.split('/').pop();
    return channel_name;
}

export function isUsernameUrl(url) {

    const regex = new RegExp('^' + BASE_URL.replace(/\./g, '\\.') + '/[^/]+$');

    return regex.test(url);
}


// TODO: save to state
export function getAnonymousUserTokenSingleton() {
    // Check if the anonymous user token is available and not expired
    if (AUTHORIZATION_TOKEN_ANONYMOUS_USER) {

        const isTokenValid = AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE && new Date().getTime() < AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE;

        if (isTokenValid) {
            return AUTHORIZATION_TOKEN_ANONYMOUS_USER;
        }
    }

    // Prepare the request body for obtaining a new token
    const body = objectToUrlEncodedString({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials'
    });

    // Make the HTTP POST request to the authorization API
    const res = httpClientRequestToken.POST(`${BASE_URL_API_AUTH}`, body, {
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': BASE_URL,
        'DNT': '1',
        'Sec-GPC': '1',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Priority': 'u=4',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
    }, false);

    // Check if the response code indicates success
    if (res.code !== 200) {
        console.error('Failed to get token', res);
        throw new ScriptException("", "Failed to get token: " + res.code + " - " + res.body);
    }

    // Parse the response JSON to extract the token information
    const json = JSON.parse(res.body);

    // Ensure the response contains the necessary token information
    if (!json.token_type || !json.access_token) {
        console.error('Invalid token response', res);
        throw new ScriptException("", 'Invalid token response: ' + res.body);
    }

    // Store the token and its expiration date
    AUTHORIZATION_TOKEN_ANONYMOUS_USER = `${json.token_type} ${json.access_token}`;
    AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE = new Date().getTime() + (json.expires_in * 1000);

    return AUTHORIZATION_TOKEN_ANONYMOUS_USER;
}


export function executeGqlQuery(httpClient, requestOptions) {

    const headersToAdd = requestOptions.headers || {
        "User-Agent": USER_AGENT,
        "Accept": "*/*",
        // "Accept-Language": Accept_Language,
        "Referer": BASE_URL,
        "Origin": BASE_URL,
        "DNT": "1",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    }


    const gql = JSON.stringify({
        operationName: requestOptions.operationName,
        variables: requestOptions.variables,
        query: requestOptions.query,
    });

    const usePlatformAuth = requestOptions.usePlatformAuth == undefined ? false : requestOptions.usePlatformAuth;
    const throwOnError = requestOptions.throwOnError == undefined ? true : requestOptions.throwOnError;

    if (!usePlatformAuth) {
        headersToAdd.Authorization = getAnonymousUserTokenSingleton();
    }

    const res = httpClient.POST(BASE_URL_API, gql, headersToAdd, usePlatformAuth);

    if (!res.isOk) {
        console.error('Failed to get token', res);
        if (throwOnError) {
            throw new ScriptException("Failed to get token", res);
        }
    }

    const body = JSON.parse(res.body);

    // some errors may be returned in the body with a status code 200
    if (body.errors) {
        const message = body.errors.map(e => e.message).join(', ');

        if (throwOnError) {
            throw new UnavailableException(message);
        }
    }

    return body;
}



/**
 * Converts SRT subtitle format to VTT format.
 * 
 * @param {string} srt - The SRT subtitle string.
 * @returns {string} - The converted VTT subtitle string.
 */
export const convertSRTtoVTT = (srt) => {
    // Initialize the VTT output with the required header
    const vtt = ['WEBVTT\n\n'];
    // Split the SRT input into blocks based on double newlines
    const srtBlocks = srt.split('\n\n');

    // Process each block individually
    srtBlocks.forEach((block) => {
        // Split each block into lines
        const lines = block.split('\n');
        if (lines.length >= 3) {
            // Extract and convert the timestamp line
            const timestamp = lines[1].replace(/,/g, '.');
            // Extract the subtitle text lines
            const subtitleText = lines.slice(2).join('\n');
            // Add the converted block to the VTT output
            vtt.push(`${timestamp}\n${subtitleText}\n\n`);
        }
    });

    // Join the VTT array into a single string and return it
    return vtt.join('');
}



export const parseUploadDateFilter = (filter) => {
    let createdAfterVideos;

    const now = new Date();

    switch (filter) {
        case "today":
            // Last 24 hours from now
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            createdAfterVideos = yesterday.toISOString();
            break;
        case "thisweek":
            // Adjusts to the start of the current week (assuming week starts on Sunday)
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            createdAfterVideos = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()).toISOString();
            break;
        case "thismonth":
            // Adjusts to the start of the month
            createdAfterVideos = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
            break;
        case "thisyear":
            // Adjusts to the start of the year
            createdAfterVideos = new Date(now.getFullYear(), 0, 1).toISOString();
            break;
        default:
            createdAfterVideos = null;
    }
    return createdAfterVideos;
}


export const parseSort = (order) => {
    let sort;
    switch (order) {
        //TODO: refact this to use constants
        case "Most Recent":
            sort = "RECENT";
            break;
        case "Most Viewed":
            sort = "VIEW_COUNT";
            break;
        case "Most Relevant":
            sort = "RELEVANCE";
            break;
        default:
            sort = order; // Default to the original order if no match
    }
    return sort
}

export const getQuery = (context) => {
    context.sort = parseSort(context.order);

    if (!context.filters) {
        context.filters = {};
    }

    if (!context.page) {
        context.page = 1;
    }

    if (context?.filters.duration) {
        context.filters.durationMinVideos = DURATION_THRESHOLDS[context.filters.duration].min;
        context.filters.durationMaxVideos = DURATION_THRESHOLDS[context.filters.duration].max;
    } else {
        context.filters.durationMinVideos = null;
        context.filters.durationMaxVideos = null;
    }

    if (context.filters.uploaddate) {
        context.filters.createdAfterVideos = parseUploadDateFilter(context.filters.uploaddate[0]);
    }

    return context;
}


export function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export function getPages<TI, TO>(
    httpClient: IHttp,
    query: string,
    operationName: string,
    variables: any,
    usePlatformAuth: boolean,
    setRoot: (jsonResponse: any) => TI,
    hasNextCallback: (page: TI) => boolean,
    getNextPage: (page: TI, currentPage) => number,
    map: (page: any) => TO[]

): TO[] {

    let all: TO[] = [];

    if (!hasNextCallback) {
        hasNextCallback = () => false;
    }

    let hasNext = true;
    let nextPage = 1;

    do {

        variables = { ...variables, page: nextPage };

        const jsonResponse = executeGqlQuery(
            httpClient,
            {
                operationName,
                variables,
                query,
                usePlatformAuth
            });

        const root = setRoot(jsonResponse);

        nextPage = getNextPage(root, nextPage);

        const items = map(root);

        hasNext = hasNextCallback(root);

        all = all.concat(items);

    } while (hasNext);

    return all;
}


export function getLikePlaylist(pluginId: string, httpClient: IHttp, usePlatformAuth: boolean = false): PlatformPlaylistDetails {

    const videos: PlatformVideo[] = getPages<Maybe<User>, PlatformVideo>(
        httpClient,
        GET_LIKED_VIDEOS_GQL_QUERY,
        'USER_LIKED_VIDEOS_QUERY',
        {
            page: 1
        },
        usePlatformAuth,
        (jsonResponse) => jsonResponse?.data?.me,//set root
        (me) => (me?.likedMedias?.edges.length ?? 0) > 0 ?? false,//hasNextCallback
        (me, currentPage) => ++currentPage, //getNextPage
        (me) => me?.likedMedias?.edges.map(edge => {
            return SourceVideoToGrayjayVideo(pluginId, edge.node as Video);
        }));

    const collection = {
        "id": generateUUIDv4(),
        "name": "Liked",
        "creator": {}
    }

    return SourceCollectionToGrayjayPlaylistDetails(pluginId, collection as Collection, videos);
}

export function getFavoritesPlaylist(pluginId: string, httpClient: IHttp, usePlatformAuth: boolean = false): PlatformPlaylistDetails {

    const videos: PlatformVideo[] = getPages<Maybe<User>, PlatformVideo>(
        httpClient,
        GET_FAVORITES_GQL_QUERY,
        'USER_WATCH_LATER_VIDEOS_QUERY',
        {
            page: 1
        },
        usePlatformAuth,
        (jsonResponse) => jsonResponse?.data?.me,//set root
        (me) => (me?.watchLaterMedias?.edges.length ?? 0) > 0 ?? false,//hasNextCallback
        (me, currentPage) => ++currentPage, //getNextPage
        (me) => me?.watchLaterMedias?.edges.map(edge => {
            return SourceVideoToGrayjayVideo(pluginId, edge.node as Video);
        }));

    const collection = {
        "id": generateUUIDv4(),
        "name": "Favorites",
        "creator": {}
    }

    return SourceCollectionToGrayjayPlaylistDetails(pluginId, collection as Collection, videos);
}

export function getRecentlyWatchedPlaylist(pluginId: string, httpClient: IHttp, usePlatformAuth: boolean = false): PlatformPlaylistDetails {

    const videos: PlatformVideo[] = getPages<Maybe<User>, PlatformVideo>(
        httpClient,
        GET_RECENTLY_WATCHED_GQL_QUERY,
        'USER_WATCH_LATER_VIDEOS_QUERY',
        {
            page: 1
        },
        usePlatformAuth,
        (jsonResponse) => jsonResponse?.data?.me,//set root
        (me) => (me?.watchedVideos?.edges.length ?? 0) > 0 ?? false,//hasNextCallback
        (me, currentPage) => ++currentPage, //getNextPage
        (me) => me?.watchedVideos?.edges.map(edge => {
            return SourceVideoToGrayjayVideo(pluginId, edge.node as Video);
        }));

    const collection = {
        "id": generateUUIDv4(),
        "name": "Recently Watched",
        "creator": {}
    }

    return SourceCollectionToGrayjayPlaylistDetails(pluginId, collection as Collection, videos);
}
