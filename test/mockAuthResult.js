/*eslint camelcase: ["error", {properties: "never"}]*/

/**
 * Will hold the mock auth result from google
 *
 * @name mockAuthResult
 *
 * @param { number } expires_in
 * @param { number } first_issued_at
 * @param { number } expires_at
 * @param { string } access_token
 * @param { string } id_token
 * @param { string } scope
 *
 * @returns
 *      Mock Google Auth Result
 *
 */

export const mockAuthResult = {
  expires_in: 123456,
  access_token: 'holder',
  id_token: 'holder',
  scope: 'holder',
  first_issued_at: 1,
  expires_at: 1,
}
