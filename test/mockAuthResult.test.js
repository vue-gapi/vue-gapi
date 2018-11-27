/* eslint-env node, jest */
import { mockAuthResult } from './mockAuthResult'

it('matches if the actual obejct does not change', () => {
  expect(mockAuthResult).toEqual(
    expect.objectContaining({
        // eslint-disable-next-line
        expires_in: expect.any(Number),
        // eslint-disable-next-line
        access_token: expect.any(String),
        // eslint-disable-next-line
        id_token: expect.any(String),
        // eslint-disable-next-line
        scope: expect.any(String),
        // eslint-disable-next-line
        first_issued_at: expect.any(Number),
        // eslint-disable-next-line
        expires_at: expect.any(Number) 
    })
  )
})
