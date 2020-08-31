const mongoose = require('mongoose')

const templateSchema = mongoose.Schema({
    name: String,
    template: String,
    data: String
})

module.exports = mongoose.model('template', templateSchema)