/**
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
  // eslint-disable-next-line
  expires_in: 123456,
  // eslint-disable-next-line
  access_token: '',
  // eslint-disable-next-line
  id_token: '',
  // eslint-disable-next-line
  scope: '',
  // eslint-disable-next-line
  first_issued_at: 1,
  // eslint-disable-next-line
  expires_at: 1
}
