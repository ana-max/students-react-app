const Student = require('../../models/student');

module.exports.getStudentsPageData = async (req, res) => {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.offset);

    Student
        .find()
        .limit(limit)
        .skip(skip)
        .exec((err, students) => res.json(students));
}

module.exports.createStudent = async (req, res) => {
    const photoUrl = req.query.photoUrl || '';
    const { fio, email, speciality, group, gender } = req.query;
    const rating = Number(req.query.rating);
    const age = Number(req.query.age);

    Student.create({
        fio, email, speciality, group, gender, rating, age, photoUrl
    })
}