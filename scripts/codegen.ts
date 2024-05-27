import type { CodegenConfig } from '@graphql-codegen/cli';
const path = require('path');

const currentDirectory = process.cwd();

require('dotenv').config({ path: path.join(currentDirectory, 'scripts', '.env')});

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    // URL of the GraphQL endpoint
    "https://graphql.api.dailymotion.com": {
      // Headers to be sent with the request
      headers: {
        // Authorization header with the token from environment variables
        'Authorization': `Bearer ${process.env.GRAPHQL_ACCESS_TOKEN}`,
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

export default config;
