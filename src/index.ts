import { Readable, pipeline } from 'node:stream'

import createCharacterFilter from './lib/characterFilter.js'
import characterGenerator from './lib/characterGenerator.js'
import messageFormatter from './lib/messageFormatter.js'
import { logger } from 'src/lib/logger.js'

const characterFilter = createCharacterFilter()

pipeline(
  Readable.from(characterGenerator()),
  characterFilter,
  messageFormatter,
  logger,
  (error: Error | null ) => {
    if (error) {
      logger.error(error)
    }
  },
)
