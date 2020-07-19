const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const Student = require('../models/student');

module.exports.getAllStudents = async (req, res) => {
    await Student
                .find()
                .exec((err, students) => res.json(students));
}

module.exports.createStudent = async (req, res) => {
    console.info(req);
    const photoUrl = req.file ? req.file.filename : '';
    const imagePath = path.join(process.cwd(), 'public/images', photoUrl);
    const outputFile = `${Date.now()}output.jpg`;
    await sharp(imagePath).resize({ width: 36 }).toFile(outputFile)
        .then(async () => {
            const photoData = photoUrl ? {
                data: fs.readFileSync(outputFile).toString('base64')
            } : Buffer.from('');
            fs.unlinkSync(outputFile);
            await Student.create({
                ...req.query, photoUrl, photoData
            }, (err, student) => {
                res.json(student);
            });
        })
}

module.exports.searchStudents = async (req, res) => {
    await Student
        .find({ name: { $regex: req.query.name } })
        .exec((err, students) => res.json(students));
}

module.exports.sortStudents = async (req, res) => {
    const sortKey = req.query.sortKey;
    const sortByAscending = req.query.sortByAscending;

    await Student
        .find()
        .sort({ [sortKey]: sortByAscending === 'true' ? 1 : -1 })
        .exec((err, students) => res.json(students));
}

module.exports.deleteStudent = async (req, _res) => {
    const id = req.query.id;
    console.info(id)
    await Student.deleteOne({_id: id});
}
