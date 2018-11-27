/* eslint-env node, jest */
/*eslint camelcase: ["error", {properties: "never"}]*/
import { mockAuthResult } from './mockAuthResult'

it('matches if the actual obejct does not change', () => {
  expect(mockAuthResult).toEqual(
    expect.objectContaining({
      expires_in: expect.any(Number),
      access_token: expect.any(String),
      id_token: expect.any(String),
      scope: expect.any(String),
      first_issued_at: expect.any(Number),
      expires_at: expect.any(Number)
    })
  )
})
