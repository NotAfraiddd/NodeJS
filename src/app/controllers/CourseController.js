const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {
    // [GET] http://localhost:3000/khoa-hoc/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) })
            })
            .catch(next);
    }

    // [GET]: gửi yêu cầu lấy dữ liệu -->/khoa-hoc/tao
    create(req,res, next){
        res.render('courses/create')
    }

    // [POST]gửi yêu cầu thêm dữ liệu -->/khoa-hoc/tao
    store(req,res, next){
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body)
        course.save()
        .then(() => res.redirect(`/`))
        .catch(error =>{
            
        })
    }
}

module.exports = new CourseController();