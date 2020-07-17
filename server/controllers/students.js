const Student = require('../models/student');
const path = require('path');
const fs = require('fs');

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
    const { name, email, rating, age, speciality, group, gender } = req.query;
    const imagePath = path.join(process.cwd(), 'public/images', photoUrl);
    const photoData = photoUrl ? {
         data: fs.readFileSync(imagePath).toString('base64')
    } : Buffer.from('');
    await Student.create({
        name, email, speciality, group, gender, rating, age, photoUrl, photoData
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
