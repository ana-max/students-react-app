
const { getAllStudents, createStudent, searchStudents, sortStudents, deleteStudent } = require('./controllers/students');
const multer  = require("multer");

module.exports = (app) => {
    app.get('/api/students*', getAllStudents)
    app.post('/api/students*', createStudent);
    app.get('/api/search-students*', searchStudents);
    app.get('/api/sort-students*', sortStudents);
    app.delete('/api/delete-student*', deleteStudent);
};
