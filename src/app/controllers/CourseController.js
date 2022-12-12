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

    // [GET]: gửi yêu cầu lấy dữ liệu -->/courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST]gửi yêu cầu thêm dữ liệu -->/courses/create
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(error => {

            })
    }

    // [GET]: gửi yêu cầu lấy dữ liệu -->/courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)

    }

    // [PUT] -->/courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] -->/courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] -->/courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [RESTORE] -->/courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] -->/courses/handle-form-active
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                // vì courseIds là mảng nên ta phải sử dụng { _id: { $in: req.body.courseIds } }
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;

            default:
                res.json({ message: 'Hành động không hợp lệ' })
        }
    }

    handleFormActionsInGarage(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'delete-forever':
                Course.deleteOne({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({ message: 'Hành động không hợp lệ' })
        }
    }
}

module.exports = new CourseController();