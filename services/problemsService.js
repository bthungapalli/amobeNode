var counterModel = require("../models/counterModel");
var problemModel=require("../models/problemModel");
var solutionModel=require("../models/solutionModel");
var problemsService =function(){

return{

	update:function(object,conditions,update,callbackForUpdate){
		problemModel.update(conditions, update, callback);
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
		problemModel.remove(condition,function(err){
			 if(err){
				 console.log(err)
				 callbackForDelete(err);
			 }
			 callbackForDelete(null,{});
	 });
	},
	createOrUpdateSolution : function(user,solution,callbackForCreateOrUpdateSolution){
		 if(solution._id ==undefined){
			
			 var serviceObj=this;
			 counterModel.findByIdAndUpdate({_id : "solutionId"}, {$inc: {seq: 1} }, function(error, counter)   {
			 	 if(error){
			 		 console.log("error:"+error);
			 		callbackForCreateOrUpdateSolution(error);
			 	 }
			 	 var solutionCreated = new solutionModel(
			 	{"_id":counter.seq,"description": solution.description,
			     "problemId":solution.problemId,
				"created_by":user.email,
				"username":user.firstName+" "+user.lastName});
			 	 serviceObj.save(solutionCreated,callbackForCreateOrUpdateSolution);
			 });
		 }else{
			 var conditions = { "_id":solution._id };
			 var update = { $set: {"description": problem.description,
				 "updated_at":new Date()}};
			 this.update(solution,conditions,update,callbackForCreateOrUpdateProblem);
		 }
},
	createOrUpdateProblem : function(user,problem,callbackForCreateOrUpdateProblem){
			 if(problem._id ==undefined){
				
				 var serviceObj=this;
				 counterModel.findByIdAndUpdate({_id : "problemId"}, {$inc: {seq: 1} }, function(error, counter)   {
				 	 if(error){
				 		 console.log("error:"+error);
				 		callbackForCreateOrUpdateProblem(error);
				 	 }
				 	 var problemCreated = new problemModel(
				 	{"_id":counter.seq,"title": problem.title,
				     "accepted":false,
					"status":problem.status,
					"description": problem.description,
					"summary": problem.summary,
					"created_by":user.email,
					"category":problem.category,
					"subcategory":problem.subcategory,
					"username":user.firstName+" "+user.lastName,
					"anonymous":problem.anonymous});
				 	 serviceObj.save(problemCreated,callbackForCreateOrUpdateProblem);
				 });
			 }else{
				 var conditions = { "_id":problem._id };
				 var update = { $set: {"status":problem.status,"description": problem.description,
						"summary": problem.summary,"anonymous":problem.anonymous,
					 "updated_at":new Date()}};
				 this.update(problem,conditions,update,callbackForCreateOrUpdateProblem);
			 }
   },
   
   getAcceptedProblem:function(user,callbackForGetAcceptedProblems){
		 var condition;
		 condition={"accepted_by":user.email,"accepted":true};
		 var query =problemModel.find(condition);
		 this.execute(query,callbackForGetAcceptedProblems);
	 },
     acceptProblem:function(user,problem,callbackForGetAllProblems){
	   var conditions = { "_id":problem._id };
		 var update = { $set: {"accepted":true,"accepted_by":user.email}};
		 this.update(problem,conditions,update,callbackForGetAllProblems);
	 },
	 getAllProblems:function(user,callbackForGetAllProblems){
		 var categories=[];
		 var subcategories=[];
		 user.category.forEach(function(cat){
			 categories.push(cat.categoryName);
			 cat.subcategories.forEach(function(subcat){
				 subcategories.push(subcat);
			 })
		 });
		 
		 var condition={"status":"SAVE","accepted":false,"category":{ $in: categories },"subcategory":{ $in:subcategories }};
		 
		 console.log("********"+JSON.stringify(condition)+"**********")
		 var query =problemModel.find(condition);
		 this.execute(query,callbackForGetAllProblems);
	 },
	 getMyProblems:function(user,callbackForGetMyProblems){
		 var condition;
		 condition={"created_by":user.email};
		 var query =problemModel.find(condition);
		 this.execute(query,callbackForGetMyProblems);
	 },
	 getRecallsByFilter:function(user,recallFilter,callbackForGetAllRecallsByFilter){
			var condition;
			var startDate = new Date(recallFilter.fromDate);
			startDate.setDate(startDate.getDate());
			var endDate = new Date(recallFilter.toDate);
			endDate.setDate(endDate.getDate());
			startDate.setHours(0,0,0,0);
			endDate.setHours(23,59,59,999);
			
			var startDate;
			var endDate;
			if(recallFilter.fromDate !==undefined && recallFilter.toDate!==undefined){
				startDate= new Date(recallFilter.fromDate);
					startDate.setDate(startDate.getDate());
					 endDate = new Date(recallFilter.toDate);
					endDate.setDate(endDate.getDate());
					startDate.setHours(0,0,0,0);
					endDate.setHours(23,59,59,999);
			}else if(recallFilter.fromDate !==undefined){
				startDate= new Date(recallFilter.fromDate);
				startDate.setDate(startDate.getDate());
				 endDate = new Date(recallFilter.fromDate);
				endDate.setDate(endDate.getDate());
				startDate.setHours(0,0,0,0);
				endDate.setHours(23,59,59,999);
			}else if(recallFilter.toDate !==undefined){
				startDate= new Date(recallFilter.toDate);
				startDate.setDate(startDate.getDate());
				 endDate = new Date(recallFilter.toDate);
				endDate.setDate(endDate.getDate());
				startDate.setHours(0,0,0,0);
				endDate.setHours(23,59,59,999);
			}
			
			if(user.role==="Vendor"){
				
				if(recallFilter.fromDate !==undefined || recallFilter.toDate!==undefined){
					if(recallFilter.category=="All"){
						condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":user.categories},{"created_by":user.email}]};
					}else{
						condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":recallFilter.category},{"created_by":user.email}]};
					}
				}else{
					if(recallFilter.category=="All"){
						condition={$and : [{"categoryName":user.categories},{"created_by":user.email}]};
					}else{
						condition={$and : [{"categoryName":recallFilter.category},{"created_by":user.email}]};
					}
				}
				
			}else{
				
				if(recallFilter.fromDate !==undefined || recallFilter.toDate!==undefined){
					if(recallFilter.category=="All"){
						condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":user.categories}]};
					}else{
						condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":recallFilter.category}]};
					}
				}else{
					if(recallFilter.category=="All"){
						condition={$and : [{"categoryName":user.categories}]};
					}else{
						condition={$and : [{"categoryName":recallFilter.category}]};
					}
				}
				
			}
		 var query =problemModel.find(condition);
		 this.execute(query,callbackForGetAllRecallsByFilter);
	 },
	 getProblemById:function(id,callbackForGetProblemById){
		 var query =problemModel.findOne({"_id":id});
		 this.execute(query,callbackForGetProblemById);
	 },
	 getSolutionByProblemId:function(problemId,callbackForGetSolutionByProblemId){
		 var query =solutionModel.findOne({"problemId":problemId});
		 this.execute(query,callbackForGetSolutionByProblemId);
	 },
	 deleteRecall:function(id,callbackForDeleteRecall){
		 this.delete({"_id":id},callbackForDeleteRecall);
	 }

}
}

module.exports=problemsService();
