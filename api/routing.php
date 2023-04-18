<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
//require "services/DB.php";
require('controllers/PostsController.php');
require('controllers/UsersController.php');
require('Api.php');
//use services\DB;
use Api\Api;

// Getting url
$current_link = $_SERVER['REQUEST_URI'];

if(str_contains($current_link, '?'))
{
    $current_link = explode('?', $current_link)[0];
}

// Routes
$urls = [
    '/reactPhpBlogTemplate/api/posts' => ['PostsController@getPostsFromDatabase'],
    '/reactPhpBlogTemplate/api/searchResults' => ['PostsController@getSearchResults'],
    '/reactPhpBlogTemplate/api/getCurrentTopic' => ['PostsController@getCurrentTopic'],
    '/reactPhpBlogTemplate/api/submitNewUser' => ['UsersController@submitNewUser'],
    '/reactPhpBlogTemplate/api/checkUserCredentials' => ['UsersController@checkUserCredentials'],
    '/reactPhpBlogTemplate/api/checkForUserByEmail' => ['UsersController@checkForUserByEmail'],
    '/reactPhpBlogTemplate/api/getUsersFromDatabase' => ['UsersController@getUsersFromDatabase'],
];

$availableRoutes = array_keys($urls);

if(!in_array($current_link, $availableRoutes))
{
    header('HTTP/1.0 404 Not Found');
    exit;
}
Api::routing($current_link, $urls);