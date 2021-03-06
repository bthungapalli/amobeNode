var counterModel = require("../models/counterModel");
var userModel=require("../models/userModel");
var userService =function(){

return{

	update:function(object,conditions,update,callbackForUpdate){
		 userModel.update(conditions, update, callback);
		 function callback (err, numAffected) {
			 if(err){
				 console.log("error:"+err);
				 callbackForUpdate(err);
			 }
			 console.log(numAffected + "rows updates");
			 callbackForUpdate(null,object);
		 };
	},
	execute:function(query,callbackForExecute){
		query.exec(function(err, user){
				if(err)
					callbackForExecute(err);
					callbackForExecute(null,user);
		});
	},
	save:function(user,callbackForSave){
		user.save(function(err){
			 if(err){
				 console.log(err)
				 callbackForSave(err);
			 }
			 callbackForSave(null,user);
	 });
	},
		createOrUpdateUser : function(user,callbackForCreateOrUpdateUser){
			 if(user._id ==undefined){
				 var serviceObj=this;
				 counterModel.findByIdAndUpdate({_id : "userId"}, {$inc: {seq: 1} }, function(error, counter)   {
				 	 if(error){
				 		 console.log("error:"+error);
				 		 callbackForCreateOrUpdateUser(error);
				 	 }
				 	 var userCreated = new userModel({"_id":counter.seq,"firstName": user.firstName,"lastName": user.lastName,"password":user.password,"token":Math.random().toFixed(15),
					"email":user.email,"mobileNumber":user.mobileNumber,"address":user.address,"city":user.city,"state":user.state,"zipcode":user.zipcode,"cases":user.cases,"registrationConfirmed":false,
					"anonymous":true,"role":user.role,"age":user.age,"category":user.category,"isActive": true,"last_login":new Date()});
				 	 serviceObj.save(userCreated,callbackForCreateOrUpdateUser);
				 });
			 }else{
				 var conditions = { "_id":user._id };
				 var update = { $set: {"mobileNumber":user.mobileNumber,"address":user.address,"firstName": user.firstName,"lastName": user.lastName,
					             "anonymous":user.anonymous,"city":user.city,"state":user.state,"zipcode":user.zipcode,"category":user.category,
					             "age":user.age,"cases":user.cases,"updated_at":new Date()}};
				 this.update(user,conditions,update,callbackForCreateOrUpdateUser);
			 }
   },
	 checkUser:function(user,callbackForCheckUser){
		 var query = userModel.findOne({"email":user.email,"isActive":true});
		 this.execute(query,callbackForCheckUser);
	 },
	 getAllUsers:function(callbackForGetAllUsers){
		 var query = userModel.find({});
		 this.execute(query,callbackForGetAllUsers);
	 },
	 activeOrInActivateUser:function(user,callbackForActiveOrInActivateUser){
		 var conditions = { "_id":user._id };
		 var update = { $set: {"isActive": user.isActive}};
		 this.update(user,conditions,update,callbackForActiveOrInActivateUser);
	 },
	 getUser:function(id,callbackForGetUser){
		 var query = userModel.findOne({"email":id});
		 this.execute(query,callbackForGetUser);
	 },
	 getAllUsersBasedOnCategory:function(category,callbackForGetAllUsersBasedOnCategory){
		 var query = userModel.find({ "categories": { $in: [category] } }); 
		 this.execute(query,callbackForGetAllUsersBasedOnCategory);
	 },
	 getUsersBasedonCatAndSubcategory:function(problem,callbackForGetUsersBasedonCatAndSubcategory){
		 var condition={ "category.categoryName": { $in: [problem.category] },"category.subcategories": { $in: [problem.subcategory] } };
		 var query = userModel.find(condition); 
		 this.execute(query,callbackForGetUsersBasedonCatAndSubcategory);
	 },
	 getUsersForProblem:function(category,subcategory,accepted_by,callbackForGetUsersForProblem){
		 var condition={ "category.categoryName": { $in: [category] },"category.subcategories": { $in: [subcategory] }
                        ,"email":{$nin: accepted_by} };
		 var query = userModel.find(condition); 
		 this.execute(query,callbackForGetUsersForProblem);
	 },
	 updateImagePath:function(fileName,id,callbackForUpdateImagePath){
		 var conditions = { "_id":id };
		 var update = { $set: {"userImagePath":fileName,"updated_at":new Date()}};
		 this.update({},conditions,update,callbackForUpdateImagePath);
	 },
	 getUserForToken:function(token,callbackForGetUsersForToken){
		 var condition={ "token": token};
		 var query = userModel.find(condition); 
		 this.execute(query,callbackForGetUsersForToken);
	 },
	 activateUserByToken:function(token,callbackForActivateUserByToken){
		 var conditions = { "token":token };
		 var update = { $set: {"registrationConfirmed":true,"updated_at":new Date()}};
		 this.update({},conditions,update,callbackForActivateUserByToken);
	 }

}
}

module.exports=userService();
