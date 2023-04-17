<?php
# This file can be used for testing by removing 
# RewriteRule ^ index.html [QSA,L]
# from your root level .htaccess file
error_reporting(E_ALL);
ini_set('display_error', '1');

require('api/services/DB.php');
use Services\DB;

// require('api/controllers/PostsController.php');
// use Api\Controllers\PostsController;
//require('api/controllers/UsersController.php');
//use Api\Controllers\UsersController;

//echo "Hello World";

// echo "\nGetting posts and saving to DB";
// (new PostsController)->getPosts();

//echo "\nGetting users from DB";
//(new UsersController)->getUsersFromDatabase();