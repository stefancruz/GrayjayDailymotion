import {
    BASE_URL,
    USER_AGENT,
    BASE_URL_API,
    X_DM_Preferred_Country,
    countryNames,
    countryNamesToCode
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
