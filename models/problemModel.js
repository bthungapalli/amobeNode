var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var counterModel     = require("./counterModel");



var counter = new counterModel({"_id":"problemId","seq": 1});
counter.save(function(err){
    if(err)
    	return err;
});

var ProblemSchema = new Schema({
	
   	_id:{type: Number, required: true,default:0},
    title: {type: String, required: true},
    description:{type: String, required: true},
    summary:{type: String, required: true},
    status:{type: String, required: true},
    category:{type: String, required: true},
    subcategory:{type: String, required: true},
    anonymous  :{type:Boolean,required: true,default: false},
    username:{type: String, required: true},
    accepted:{type: Boolean, required: false,default: false},
    filePath:{type:Array,required:false},
    accepted_by:{type: String, required: false},
    accepted_at:{type: Date, required: false},
    created_by:{type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


ProblemSchema.pre('save', function(next){

    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
    });

module.exports = mongoose.model('problems', ProblemSchema);
