import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const tacoSchema = new Schema({
  name: String,
  tasty: Boolean,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  comments: [commentSchema]
}, {
  timestamps: true,
})

const Taco = mongoose.model('Taco', tacoSchema)

export {
  Taco
}
