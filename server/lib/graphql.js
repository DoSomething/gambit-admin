'use strict';

const superagent = require('superagent');
const logger = require('heroku-logger');

const config = require('../config/services').graphQL;

/**
 * Fetches GraphQL schema for Topic and Broadcast interfaces to use IntrospectionFragmentMatcher in
 * our Apollo client.
 *
 * @see https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
 */
module.exports.fetchSchema = async () => {
  logger.info('Fetching GraphQL schema');

  const res = await superagent.post(`${config.url}/graphql`)
    .send({
      variables: {},
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
    });

  const data = res.body.data;
  // Filter out any type information unrelated to unions or interfaces.
  const filteredData = data.__schema.types.filter(
    type => type.possibleTypes !== null,
  );
  data.__schema.types = filteredData;
  return data;
}
