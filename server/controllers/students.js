const Student = require('../models/student');
const path = require('path');
const fs = require('fs');
const { DEFAULT_STUDENT } = require('../common/consts');

module.exports.getAllStudents = async (req, res) => {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.offset);

    await Student
                .find()
                .limit(limit)
                .skip(skip)
                .exec((err, students) => res.json(students));
}

module.exports.createStudent = async (req, res) => {
    console.info(req.body, req);
    const photoUrl = req.file ? req.file.filename : '';
    const { speciality, group, gender } = req.body;
    const fio = req.body.fio || DEFAULT_STUDENT.fio;
    const email = req.body.email || DEFAULT_STUDENT.email;
    const rating = req.body.rating || DEFAULT_STUDENT.rating;
    const age = req.body.age || DEFAULT_STUDENT.age;

    const imagePath = path.join(process.cwd(), 'public/images', photoUrl);
    const photoData = photoUrl ? {
         data: fs.readFileSync(imagePath).toString('base64')
    } : Buffer.from('');
    await Student.create({
        fio, email, speciality, group, gender, rating, age, photoUrl, photoData
    });
}

module.exports.searchStudents = async (req, res) => {
    await Student
        .find({ fio: { $regex: req.query.fio } })
        .exec((err, students) => res.json(students));
}

module.exports.sortStudents = async (req, res) => {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.offset);
    const sortKey = req.query.sortKey;

    await Student
        .find()
        .sort({ [sortKey]: 1 })
        .exec((err, students) => res.json(students));
}