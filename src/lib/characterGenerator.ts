import fetch, { Response } from 'node-fetch'

import { logger } from 'src/lib/logger.js'
import { Character } from './interfaces.js'
import { APIResponse } from './interfaces.js'

export default async function* characterGenerator(): AsyncGenerator<Character, void, unknown> {
  try {
    let nextPage: string | null = 'https://swapi.dev/api/people/'

    while (nextPage) {
      const response: Response = await fetch(nextPage)
      const data = await response.json() as APIResponse

      nextPage = data.next

      for (const character of data.results) {
        yield character
      }
    }
  } catch (error) {
    logger.error('Error fetching characters:', error)
    throw error
  }
}
