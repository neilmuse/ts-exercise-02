import { Transform, TransformCallback } from 'node:stream'

import { Character } from './interfaces.js'

const createCharacterFilter = () => new Transform({
  objectMode: true,
  transform(data: Character, encoding: BufferEncoding, next: TransformCallback): void {
    if (data.gender === 'female') {
      this.push(data)
    }
    next()
  },
})

export default createCharacterFilter
