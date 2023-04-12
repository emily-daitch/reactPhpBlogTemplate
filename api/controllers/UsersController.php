<?php
namespace Api\Controllers;
error_reporting(E_ALL);
ini_set('display_errors', '1');

//define('__ROOT__', dirname(dirname(dirname(__FILE__))));
require_once(__ROOT__.'/api/services/DB.php');
use Services\DB;
class UsersController
{
    public $conn = null;

    public function __construct()
    {
        // Create connection
        $this->conn = (new DB())->database();
    }

    // Uncomment for local development to resolve CORS issue
    public function getHeaders()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Credentials: *");
        header('Access-Control-Max-Age: 86400');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        }
    }

    public function submitNewUser()
    {
        try
        {
            $this->getHeaders();
            $submitResponse = null;
            $email = $_GET['email'] ?? null;
            $password = $_GET['password'] ?? null;

            if($email)
            {
                // for now, make username the email -- we will probably remove username as I don't plan to use one
                // this will also give us the chance to write a DB script to bulk edit the table ^.^
                // don't set id, let it suto-increment
                $hash = password_hash('somepassword', PASSWORD_ARGON2I, ['memory_cost' => 2048, 'time_cost' => 4, 'threads' => 3]);

                $sql = "INSERT INTO users(`username`, `email`, `password`) VALUES ('".$email."', '".$email."', '".$hash."')";

                // use argon2id to salt PW
                // pepper PW ?

                $submitResponse = mysqli_query($this->conn, $sql);
            }

            echo json_encode($submitResponse, JSON_PRETTY_PRINT);
        }
        catch(\Exception $e)
        {
            var_dump($e);
            exit;
        }
    }

    public function checkUserCredentials()
    {
        try
        {
            $this->getHeaders();
            $submitResponse = null;
            $email = $_GET['email'] ?? null;
            $password = $_GET['password'] ?? null;

            if($email)
            {
                // for now, make username the email -- we will probably remove username as I don't plan to use one
                // this will also give us the chance to write a DB script to bulk edit the table ^.^
                // don't set id, let it suto-increment
                //$hash = password_hash('somepassword', PASSWORD_ARGON2I, ['memory_cost' => 2048, 'time_cost' => 4, 'threads' => 3]);

                //$sql = "INSERT INTO users(`username`, `email`, `password`) VALUES ('".$email."', '".$email."', '".$hash."')";
                $sql = "SELECT `id`, `username`, `email`, `password` FROM `users` WHERE email = '".$email."'";
                // use argon2id to salt PW
                // pepper PW ?

                $submitResponse = mysqli_query($this->conn, $sql);

                if(password_verify($password, $stored_hash)) {
                    // password validated
                    echo json_encode($submitResponse, JSON_PRETTY_PRINT);
                    return;
                }
            }

            echo json_encode($submitResponse, JSON_PRETTY_PRINT);
        }
        catch(\Exception $e)
        {
            var_dump($e);
            exit;
        }
    }
}