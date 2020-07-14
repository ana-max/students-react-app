const database = require('./database');
const Student = require('./models/student');
const students = require('./mocks/students.json');
const mongoose = require('mongoose');

database().then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    fillCollection().then(() => process.exit(0));

}).catch(() => {
    console.error('Unable to connect to database');
});

async function fillCollection() {
    await Student.remove({});
    for (const student of students) {
        await Student.create(student)
    }
}