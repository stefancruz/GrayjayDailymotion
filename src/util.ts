import {
    BASE_URL,
    COUNTRY_NAMES,
    COUNTRY_NAMES_TO_CODE,
    DURATION_THRESHOLDS
} from './constants'

export function getPreferredCountry(preferredCountryIndex) {
    const countryName = COUNTRY_NAMES[preferredCountryIndex];
    const code = COUNTRY_NAMES_TO_CODE[countryName];
    return (code  || '').toLowerCase();
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
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}