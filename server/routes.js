const { getAllStudents, createStudent, searchStudents, sortStudents, deleteStudent } = require('./controllers/students');

module.exports = (app) => {
    app.get('/api/students*', getAllStudents);
    app.post('/api/students*', createStudent);
    app.delete('/api/students*', deleteStudent);

    app.get('/api/search-students*', searchStudents);
    app.get('/api/sort-students*', sortStudents);
};
