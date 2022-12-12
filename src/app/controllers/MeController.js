const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {

    // [GET] /me/stored/courses
    storeCourses(req, res, next) {
        Promise.all([Course.countDocumentsDeleted(), Course.find({})])
            .then(([deletedCount, courses]) =>
                res.render('me/store-courses', {
                    deletedCount: deletedCount,
                    courses: mutipleMongooseToObject(courses)
                })
            )
            .catch(next)
    }

    trashCourses(req, res, next) {
        Promise.all([Course.findDeleted(), Course.countDocuments()])
            .then(([courses, notDeleteCount]) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                    notDeleteCount: notDeleteCount
                })
            )
            .catch(next)
    }
}

module.exports = new MeController;