const { Schema, model } = require('mongoose')

const gameSchema = Schema({
    type: {
      type: String,
      required: true
    },
    gameId: {
      type: String,
      required: true,
      unique: true
    },
    t: Number,
    playerA: {
      type: Object,
      required: true
    },
    playerB: {
        type: Object,
        required: true
    },
    winner: String
})


gameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const cursorSchema = Schema({
    cursor: {
      type: String,
      required: true,
      unique: true
    }
})



cursorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
const CursorModel = model('CursorModel', cursorSchema)  
const GameModel = model('GameModel', gameSchema)

module.exports = {
  GameModel: GameModel,
  CursorModel: CursorModel
}