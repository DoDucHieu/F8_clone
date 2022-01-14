const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class HomeController {
    //[get] /home
    index(req, res, next) {
        Course.find({})
        .then(course => {
            res.render('home', {
            course: multipleMongooseToObject(course),
            });
        }) 
        //tham khảo tại https://handlebarsjs.com/guide/#installation
        .catch(next)
        //.catch(error => next(err))
    }

    show(req, res) {
        res.send('HOME PAGE');
    }
}

module.exports = new HomeController();

