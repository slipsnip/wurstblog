const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/crypto')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [ true, 'First name is required' ]
  },
  lastName: {
    type: String,
    required: [ true, 'Last name is required' ]
  },
  name: { type: String, maxlength: 35, required: [ true, 'username is required' ] },
  email: { type: String, maxlength: 50 },
  password: {
    type: Object,
    set: pwd => hashPassword(pwd),
    required: [ true, 'Password must not be blank' ]
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  solcialMedia: { type: Map, of: String },
  role: { type: String, required: [ true, 'Must select a role' ], enum: ['Admin', 'Editor', 'Author'] }
})

userSchema.virtual('roles').get(() => this.schema.path('role').enumValues)

module.export = new mongoose.model('Users', userSchema)
