<?php
# This file can be used for testing by removing 
# RewriteRule ^ index.html [QSA,L]
# from your root level .htaccess file
error_reporting(E_ALL);
ini_set('display_error', '1');

require('api/services/DB.php');
use Services\DB;

echo "Hello";