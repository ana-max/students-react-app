const { getStudentsPageData, createStudent } = require('./controllers/data/students');
const multer  = require("multer");

module.exports = (app) => {
    app
        .get('/api/students*', getStudentsPageData)
        .post('/api/students*', createStudent);
};