<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require "services/DB.php";
use services\DB;
use Api\Api;

require('controllers/PostsController.php');
require('Api.php');

// Getting url
$current_link = $_SERVER['REQUEST_URI'];

if(str_contains($current_link, '?'))
{
    $current_link = explode('?', $current_link)[0];
}

// Routes
$urls = [
    '/reactPhp/api/posts' => ['PostsController@getPostsFromDatabase'],
    '/reactPhp/api/searchResult' => ['PostsController@getSearchResults'],
    '/reactPhp/api/getCurrentTopic' => ['PostsController@getCurrentTopic'],
];

$availableRoutes = array_keys($urls);

if(!in_array($current_link, $availableRoutes))
{
    header('HTTP/1.0 404 Not Found');
    exit;
}

Api::routing($current_link, $urls);