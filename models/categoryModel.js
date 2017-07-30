var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var counterModel     = require("./counterModel");

var counter = new counterModel({"_id":"categoryId","seq": 1});
counter.save(function(err){
    if(err)
    	return err;
});

var CategorySchema = new Schema({
   	_id:{type: Number, required: true,default:0},
    categoryName: {type: String, required: true},
    subcategories: {type: Array, required: true},
    created_by: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


    CategorySchema.pre('save', function(next){

    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
    });

module.exports = mongoose.model('category', CategorySchema);
