const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    title: {type: String, default: 'Untitled'},
    description: {type: String},
    tag: {type: Array, default: 'General'},
    // color: {type: String, default: '#ffbb5c'},
    date: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('notes', NotesSchema)