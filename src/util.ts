const objectToUrlEncodedString = (obj) => {

    const encodedParams = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {

            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(obj[key]);
            encodedParams.push(`${encodedKey}=${encodedValue}`);
        }
    }

    return encodedParams.join('&');
}

export default {
    objectToUrlEncodedString,
}