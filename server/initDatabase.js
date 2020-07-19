const path = require('path');
const fs = require('fs');

const database = require('./database');
const Student = require('./models/student');
const students = require('./mocks/students.json');


database().then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    fillCollection().then(() => process.exit(0));

}).catch(() => {
    console.error('Unable to connect to database');
});

async function fillCollection() {
    await Student.remove({});
    for (const student of students) {
        await Student.create({
            ...student,
            photoData: {
                data: fs.readFileSync(path.join(process.cwd(), 'public/images', student.photoUrl)).toString('base64')
            }
        });
    }
}
