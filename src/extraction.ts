import { AnonymousUserAuthorization } from '../types/types';
import {
  BASE_URL,
  BASE_URL_API_AUTH,
  createAuthRegexByTextLength,
  FALLBACK_CLIENT_ID,
  FALLBACK_CLIENT_SECRET,
  REGEX_INITIAL_DATA_API_AUTH_1,
  USER_AGENT,
} from './constants';
import { objectToUrlEncodedString } from './util';

export function oauthClientCredentialsRequest(
  httpClient: IHttp,
  url: string,
  clientId: string,
  secret: string,
  throwOnInvalid = false,
): HttpResponse {
  if (!httpClient || !url || !clientId || !secret) {
    throw new ScriptException(
      'Invalid parameters provided to oauthClientCredentialsRequest',
    );
  }

  const body = objectToUrlEncodedString({
    client_id: clientId,
    client_secret: secret,
    grant_type: 'client_credentials',
  });

  try {
    return httpClient.POST(
      url,
      body,
      {
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: BASE_URL,
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=4',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
      },
      false,
    );
  } catch (error) {
    console.error('Error making OAuth client credentials request:', error);
    if (throwOnInvalid) {
      throw new ScriptException('Failed to obtain OAuth client credentials');
    }
    return null;
  }
}

export function extractClientCredentials(httpClient: IHttp) {
  const detailsRequestHtml = httpClient.GET(BASE_URL, {}, false);

  if (!detailsRequestHtml.isOk) {
    throw new ScriptException('Failed to fetch page to extract auth details');
  }

  const result = [
    {
      clientId: FALLBACK_CLIENT_ID,
      secret: FALLBACK_CLIENT_SECRET,
    },
  ];

  const match = detailsRequestHtml.body.match(REGEX_INITIAL_DATA_API_AUTH_1);

  if (match?.length === 2 && match[0] && match[1]) {
    result.unshift({
      clientId: match[0],
      secret: match[1],
    });
    log('Successfully extracted API credentials from page');
  } else {
    log('Failed to extract API credentials from page using regex. Using DOM parsing.');

    const htmlElement = domParser.parseFromString(
      detailsRequestHtml.body,
      'text/html',
    );
    const extractedId = getScriptVariableByTextLength(htmlElement, 20);
    const extractedSecret = getScriptVariableByTextLength(htmlElement, 40);

    if (extractedId && extractedSecret) {
      result.unshift({
        clientId: extractedId,
        secret: extractedSecret,
      });

      log(`Successfully extracted API credentials from page using DOM parsing: ${extractedSecret}`,);
    } else {
      log(
        'Failed to extract API credentials using DOM parsing with exact text length.',
      );
    }
  }

  return result;
}

export function getScriptVariableByTextLength(htmlElement, length: number) {
  const scriptTags = htmlElement.querySelectorAll(
    'script[type="text/javascript"]',
  );

  if (!scriptTags.length) {
    console.error('No script tags found.');
    return null; // or throw an error, depending on your use case
  }

  let pageContent = '';

  scriptTags.forEach((tag) => {
    pageContent += tag.outerHTML;
  });

  let matches = createAuthRegexByTextLength(length).exec(pageContent);

  if (matches?.length == 2) {
    return matches[1];
  }
}

export function getTokenFromClientCredentials(
  httpClient: IHttp,
  credentials,
  throwOnInvalid = false,
) {
  let result: AnonymousUserAuthorization = {
    isValid: false,
  };

  for (const credential of credentials) {
    const res = oauthClientCredentialsRequest(
      httpClient,
      BASE_URL_API_AUTH,
      credential.clientId,
      credential.secret,
    );

    if (res?.isOk) {
      const anonymousTokenResponse = JSON.parse(res.body);

      if (
        !anonymousTokenResponse.token_type ||
        !anonymousTokenResponse.access_token
      ) {
        console.error('Invalid token response', res);
        if (throwOnInvalid) {
          throw new ScriptException('', 'Invalid token response: ' + res.body);
        }
      }

      result = {
        anonymousUserAuthorizationToken: `${anonymousTokenResponse.token_type} ${anonymousTokenResponse.access_token}`,
        anonymousUserAuthorizationTokenExpirationDate:
          Date.now() + anonymousTokenResponse.expires_in * 1000,
        isValid: true,
      };

      break;
    } else {
      console.error('Failed to get token', res);
    }
  }

  return result;
}
