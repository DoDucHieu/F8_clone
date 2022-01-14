const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { response } = require('express');

class CourseController {
    //[get] /courses/:slug

    // async show(req, res, next) {
    //     const data = await Course.findById(req.params.slug)
    //     console.log(data);
    // }

    show(req, res, next) {
        // Course.findById(req.params.slug)
        Course.findOne({slug: req.params.slug})
        .then(course => res.render('courses/show', { course: mongooseToObject(course) })) //'courses/show' là link tới file views
        .catch(next)
    }

    //[get] /courses/create
    create(req, res, next) {
       res.render('courses/create');
    }

    //[get] /courses/store
    store(req, res, next) {
       const formData = {...req.body}; // để đỡ bị tham chiếu tới req.body
       formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
       const course = new Course(formData);
       //tham khảo tại https://mongoosejs.com/docs/models.html#constructing-documents
       course.save()
       .then(() => res.redirect('/home'))
       .catch(reror => {

       })
     }

    //[get] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
        .then(course => res.render('courses/edit', {course:  mongooseToObject(course)}))
        .catch(next)
     }
 
    //[PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))// thêm key là location có giá trị là /me/stored/courses vào response header
        .catch(next)
    }

    //[DELETE] /courses/delete/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
        // .then(() => res.redirect('/me/stored/courses'))
        .then(() => res.redirect('back'))

        .catch(next)
    }

    //[DELETE] /courses/deletePermanently/:id
    deletePermanently(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[RESTORE] /courses/:id
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[DELETE] /courses/delete/:id
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'Xóa':
                Course.delete({_id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({message: 'Action invalid'});
        }
    }

}

module.exports = new CourseController();
