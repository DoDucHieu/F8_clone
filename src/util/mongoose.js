module.exports = {
    multipleMongooseToObject : function(mongoose){
        return mongoose.map(mongoose => mongoose.toObject());
    },

    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
}
    //Vì object trong mongoose phức tạp được tạo từ func contructor,
   // có proto, có thuộc tính phức tạp, mang tính bảo mật
   //nên nó ko cho dùng this.các key của object. nên ta phải dùng map rồi dùng toObject()
   //để chuyển thành object thông thường rồi mới dùng this.key