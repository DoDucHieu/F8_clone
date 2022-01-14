const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[get] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        // res.json(res.locals._sort);

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([Course.countDocumentsDeleted(), courseQuery])
        .then(([countDeletedCourse, course]) => {
            res.render('me/stored-courses', { countDeletedCourse,
                                              course: multipleMongooseToObject(course),
                                            }
                      );
        })
        .catch(next)
    }

        //[get] /me/recycleBin/courses
        recycleBinCourses(req, res, next) {
            Course.findDeleted({})
            .then(course => {
                res.render('me/recycleBin-courses', {course: multipleMongooseToObject(course)});
            })
            .catch(next)
    
        }
}

module.exports = new MeController();

