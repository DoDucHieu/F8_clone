const Course = require('../models/Course');

class NewController {
    //[get] /new
    index(req, res) {
        
        // res.render('news');
        Course.find({}, function(err, courses) {
            if(!err){
                res.json(courses);
            }
            else{
                res.status(400).json({ error: 'ERROR!'});
            }
        });
        //Find giống như câu lệnh SELECT được sử dụng để tìm dữ liệu trong bảng trong cơ sở dữ liệu MySQL
    }

    show(req, res) {

        res.send('NEWS DETAILS');
    }
}

module.exports = new NewController();

