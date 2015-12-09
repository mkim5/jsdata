'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('post', {
		url: '/post/:postId',
		templateUrl: 'js/post/post.html',
		controller: 'PostCtrl', 
		resolve: {
			users: function(User){
				// GET - > '/api/users'
				return User.findAll()
			}
		}
	})
});

// add necessary dependencies 
app.controller('PostCtrl', function($scope, Post, $stateParams) {

	Post.findAll()
	.then(function(posts) {
		$scope.allPosts = posts;
	})

	/* 1. FIND POST
		use state params to retrieve the post id and attach post object to scope 
		on controller load 
	*/
	Post.find($stateParams.postId)
		.then(function(post) {
			$scope.currentPost = post;
		});

	/*
		2. DELETE POST 
		create a function that destroys the post, adds an alert that the post has been 
		successfully deleted, and redirects to the main state. 
	*/
	$scope.destroy = function() {
		Post.destroy($stateParams.postId)
		.then(function(post) {
			$scope.destroySuccess = "Post was successfully deleted.";
			$scope.destroyedPost = post;
		})
	};

	/*
		3. EDIT POST 
		create a function that edits the post, adds an alert that the post has been 
		successfully edited, and displays the edited post.  

	*/
	$scope.edit = function() {
		$scope.currentPost.DSupdate()
		.then(function(updatedPost) {
			$scope.editSuccess = "Post was edited successfully.";
			$scope.updatedPost = updatedPost;
		})
	}


})