module.exports=function(grunt){
	
	grunt.initConfig({
		concat:{
			options:{
				separator: '\n\n',
				stripBanners:true
			},
			dist: {
			      src: ['public/angularJs/amoeba.js','public/angularJs/modules/*/*.js','public/angularJs/modules/home/**/*.js','public/angularJs/modules/dashboard/**/*.js'],
			      dest: 'dist/amoeba.js',
			 }
		},
		eslint: {
			configFile: ".eslintrc",
		    format: require('eslint-html-reporter'),
		    outputFile: "reports/eslint-report.html",
	        target: ['public/angularJs/amoeba.js']
	    },
	    watch: {
	        concat : {
	          files: ['public/angularJs/amoeba.js'],
	          tasks:["concat"]
	        }
	       
	      },
	    
	})
	
	require('load-grunt-tasks')(grunt);
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('ui-deploy',['concat']);
	  grunt.registerTask('default',['concat','watch']);
};