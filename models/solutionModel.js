var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var counterModel     = require("./counterModel");



var counter = new counterModel({"_id":"solutionId","seq": 1});
counter.save(function(err){
    if(err)
    	return err;
});

var SolutionSchema = new Schema({
	
   	_id:{type: Number, required: true,default:0},
    description:{type: String, required: true},
    problemId:{type: Number, required: true},
    username:{type: String, required: true},
    created_by:{type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


SolutionSchema.pre('save', function(next){

    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
    });

module.exports = mongoose.model('solutions', SolutionSchema);
