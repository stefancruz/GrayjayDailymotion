const axios = require("axios").default;
const fs = require('fs');
const path = require("path");

const options = {
    method: 'POST',
    url: 'https://graphql.api.dailymotion.com/oauth/token',
    headers: {
        cookie: 'dmvk=664c425a1edc4; ts=351870; v1st=15af1984-8adb-4541-9020-b5712535e57b',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
        Accept: '*/*',
        'Accept-Language': 'en-GB,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        Origin: 'https://www.dailymotion.com',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=4',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache'
    },
    data: {
        client_id: 'f1a362d288c1b98099c7',
        client_secret: 'eea605b96e01c796ff369935357eca920c5da4c5',
        grant_type: 'client_credentials'
    }
};

axios.request(options).then(function (response) {
    const token = response.data.access_token;
    const filepath = path.join('./scripts', '.env');
    fs.writeFileSync(filepath, `GRAPHQL_ACCESS_TOKEN=${token}\n`);
}).catch(function (error) {
    console.error(error);
});