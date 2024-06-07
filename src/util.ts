let AUTHORIZATION_TOKEN_ANONYMOUS_USER: string = "";
let AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE: number;
let httpClientRequestToken: IHttp = http.newClient(false);

import {
    BASE_URL,
    USER_AGENT,
    BASE_URL_API,
    X_DM_Preferred_Country,
    countryNames,
    countryNamesToCode,
    CLIENT_ID,
    CLIENT_SECRET,
    BASE_URL_API_AUTH,
} from './constants'

export function getPreferredCountry(preferredCountryIndex) {
    const countryName = countryNames[preferredCountryIndex];
    const code = countryNamesToCode[countryName];
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

    var regex = new RegExp('^' + BASE_URL.replace(/\./g, '\\.') + '/[^/]+$');

    return regex.test(url);
}


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

    if(!usePlatformAuth){
        headersToAdd.Authorization =  getAnonymousUserTokenSingleton();
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