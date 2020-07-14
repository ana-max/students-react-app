const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    fio: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    age: {
        type: Number,
        required: true
    },
    photoUrl: {
        type: String
    },
    speciality: {
        type: String
    },
    group: {
        type: String
    }
});

module.exports = model('Student', studentSchema);
