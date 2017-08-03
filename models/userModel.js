var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var counterModel     = require("./counterModel");
var categorySchema = require("./categoryModel").schema;



var counter = new counterModel({"_id":"userId","seq": 1});
counter.save(function(err){
    if(err)
    	return err;
});

var UserSchema = new Schema({
   	_id:{type: Number, required: true,default:0},
    firstName: {type: String, required: true},
    lastName:{type: String, required: true},
    email: {type: String, required: true},
    password:{type: String, required: true},
    gender:{type: String, required: true},
    mobileNumber: {type: Number, required: true},
    address:{type: String, required: true},
    city:{type: String, required: true},
    state: {type: String, required: true},
    zipcode:{type:Number,required:false},
    role:{type:String,required:true},
    userImagePath:{type:String,required:false},
    age:{type:Number,required:false},
    height:{type:Number,required:false},
    weight:{type:Number,required:false},
    category:{type:[categorySchema],required:false},
    experience:{type:Number,required:false},
    cases:{type:Number,required:false},
    isActive:{type:Boolean,required:false},
    last_login: {type: Date,required:false},
    token:{type:Number,required:true},
    registrationConfirmed:{type:Boolean,required:false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


    UserSchema.pre('save', function(next){

    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
    });

module.exports = mongoose.model('amoebaUsers', UserSchema);
