const axios = require("axios").default;

const client_id = 'f1a362d288c1b98099c7';
const client_secret = 'eea605b96e01c796ff369935357eca920c5da4c5';
const grant_type = 'client_credentials';

// Function to fetch and save the token
async function fetchAndSaveToken() {
  const options = {
    method: 'POST',
    url: 'https://graphql.api.dailymotion.com/oauth/token',
    headers: {
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
      client_id,
      client_secret,
      grant_type
    }
  };

  try {
    const response = await axios.request(options);
    const token = response.data.access_token;
    console.log('Token fetched ');
    return token;
  } catch (error) {
    console.error('Error fetching the token:', error);
    throw error;
  }
}

// Main function to setup GraphQL Codegen config
async function setupCodegenConfig() {
  
  const token = await fetchAndSaveToken();

  const config = {
    overwrite: true,
    schema: {
      // URL of the GraphQL endpoint
      "https://graphql.api.dailymotion.com": {
        // Headers to be sent with the request
        headers: {
          // Authorization header with the token
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
          'Accept': '*/*',
          'Accept-Language': 'en-GB,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Origin': 'https://www.dailymotion.com',
          'DNT': '1',
          'Sec-GPC': '1',
          'Connection': 'keep-alive',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'Priority': 'u=4',
          'Cache-Control': 'no-cache'
        },
      },
    },
    generates: {
      "./types/CodeGenDailymotion.d.ts": {
        plugins: [
          "typescript",
          "typescript-operations",
          "typescript-resolvers",
        ],
      },
      "./types/CodeGenDailymotion.schema.json": {
        plugins: ["introspection"],
      },
    },
  };

  return config;
}

export default new Promise((resolve, reject) => {
  setupCodegenConfig()
    .then(config => {
      resolve(config);
    }).catch(error => {
      console.error('Failed to setup GraphQL Codegen config:', error);
      reject(error);
    });

})
