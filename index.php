<?php
error_reporting(E_ALL);
ini_set('display_error', '1');

require('api/services/DB.php');
use Services\DB;

require('api/controllers/PostsController.php');
//use Api\Controllers\PostsController;

$dir    = 'api/services';
$dir2    = 'api/controllers';
$files1 = scandir($dir);
$files2 = scandir($dir2);

print_r($files1);
echo "Hello";
print_r($files2);
