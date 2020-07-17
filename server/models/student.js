const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    photoUrl: {
        type: String
    },
    photoData: {
        data: String
    },
    speciality: {
        type: String,
        required: true
    },
    colorHex: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});

module.exports = model('Student', studentSchema);
