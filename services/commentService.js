var counterModel = require("../models/counterModel");
var commentModel=require("../models/commentModel");
var commentService =function(){

return{

	update:function(object,conditions,update,callbackForUpdate){
		commentModel.update(conditions, update, callback);
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
		query.exec(function(err, recall){
				if(err)
					callbackForExecute(err);
					callbackForExecute(null,recall);
		});
	},
	save:function(recall,callbackForSave){
		recall.save(function(err){
			 if(err){
				 console.log(err)
				 callbackForSave(err);
			 }
			 callbackForSave(null,recall);
	 });
	},
	delete:function(condition,callbackForDelete){
		commentModel.remove(condition,function(err){
			 if(err){
				 console.log(err)
				 callbackForDelete(err);
			 }
			 callbackForDelete(null,{});
	 });
	},
	createComment : function(commentDetails,userDetails,callbackForCreateComment){
				
				 var serviceObj=this;
				 counterModel.findByIdAndUpdate({_id : "commentId"}, {$inc: {seq: 1} }, function(error, counter)   {
				 	 if(error){
				 		 console.log("error:"+error);
				 		callbackForCreateOrUpdateProblem(error);
				 	 }
				 	 var commentCreated = new commentModel({"_id":counter.seq,"comment": commentDetails.comment,
				     "problemId":commentDetails.problemId,"username":userDetails.firstName + " "+ userDetails.lastName,
					"email": userDetails.email});
				 	 serviceObj.save(commentCreated,callbackForCreateComment);
				 });
      },
	 getCommentsForProblemId:function(id,callbackForGetCommentsForProblemId){
		 var query =commentModel.find({"problemId":id});
		 this.execute(query,callbackForGetCommentsForProblemId);
	 }

  }
}

module.exports=commentService();
