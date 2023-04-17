<?php
namespace Api\Controllers;
error_reporting(E_ALL);
ini_set('display_errors', '1');
//declare(strict_types=1);
//use Firebase\JWT\JWT;
require_once(__ROOT__.'api/controllers/vendor/autoload.php');

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
                $hash = password_hash($password, PASSWORD_ARGON2I, ['memory_cost' => 2048, 'time_cost' => 4, 'threads' => 3]);

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

    public function getUsersFromDatabase()
    {
        try
        {
            $this->getHeaders();

            $perPage = $_GET['limit'] ?? 5;
            $pageNumber = $_GET['offset'] ?? 0;
            $usersArray = [];

            $sql = "SELECT * FROM users";
            $totalUsers = mysqli_num_rows(mysqli_query($this->conn, $sql));

            $sql = "SELECT * FROM users ORDER BY id LIMIT $perPage OFFSET $pageNumber";
            $response = mysqli_query($this->conn, $sql);

            if($response)
            {
                while($row = mysqli_fetch_assoc($response))
                {
                    $usersArray['users'][] = $row;
                }
            }
            else
            {
                echo "Error ". $sql. "<br/>" . mysqli_error($this->conn);
            }

            $usersArray['count'] = $totalUsers;

            mysqli_close($this->conn);
            echo json_encode($usersArray, JSON_PRETTY_PRINT);
        }
        catch(\Exception $e)
        {
            var_dump($e->getMessage());
            exit;
        }
    }

    public function checkForUserByEmail()
    {
        try
        {
            $this->getHeaders();
            $submitResponse = null;
            $email = $_GET['email'] ?? null;

            if($email)
            {
                $sql = "SELECT * FROM users WHERE `email` = '$email'";

                $submitResponse = mysqli_query($this->conn, $sql);
                $totalMatches = mysqli_num_rows($submitResponse);

                if($totalMatches > 0){
                    $response = '{"response": "existing"}';
                    echo json_encode($response, JSON_PRETTY_PRINT);
                    return;
                } else{
                    $response = '{"response": "valid"}';
                    echo json_encode($response, JSON_PRETTY_PRINT);
                    return;
                }
            }

            $response = '{"response": "bad_request"}';
            echo json_encode($response, JSON_PRETTY_PRINT);
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
            $secret_Key  = '68V0zWFrS72GbpPreidkQFLfj4v9m3Ti+DXc8OB0gcM=';
            $date   = new DateTimeImmutable();
            $expire_at     = $date->modify('+6 minutes')->getTimestamp();      // Add 60 seconds
            $domainName = "your.domain.name";
            $username   = "username";                                           // Retrieved from filtered POST data
            $request_data = [
                'iat'  => $date->getTimestamp(),         // Issued at: time when the token was generated
                'iss'  => $domainName,                       // Issuer
                'nbf'  => $date->getTimestamp(),         // Not before
                'exp'  => $expire_at,                           // Expire
                'userName' => $username,                     // User name
            ];

            $submitResponse = null;
            $email = $_GET['email'] ?? null;
            $password = $_GET['password'] ?? null;

            if($email)
            {
                $sql = "SELECT * FROM users WHERE `email` = '$email'";

                $submitResponse = mysqli_query($this->conn, $sql);
                if($submitResponse)
                {
                    while($row = mysqli_fetch_assoc($submitResponse))
                    {
                        // we should only find one user after implementing duplicate detection / avoidance
                        $usersArray['users'][] = $row;
                    }
                }
                else
                {
                    echo "Error ". $sql. "<br/>" . mysqli_error($this->conn);
                }

                if(password_verify($password, $usersArray['users'][0]['password'])) {
                    // password validated
                    $jwt = '';
                    // JWT::encode(
                    //              $request_data,
                    //              $secret_Key,
                    //              'HS512'
                    //          );
                    // $response = "{
                    //     "verified": true,
                    //     "jwt": $jwt
                    // }"
                    echo json_encode($jwt, JSON_PRETTY_PRINT);
                    // $verified = '{"verified": true}';
                    // echo json_encode($verified, JSON_PRETTY_PRINT);
                    return;
                }
            }

            // extract credentials from the request
            // if ($hasValidCredentials) {
            //     echo JWT::encode(
            //         $request_data,
            //         $secret_Key,
            //         'HS512'
            //     );
            // }

            $verified = '{"verified": false}';
            echo json_encode($verified, JSON_PRETTY_PRINT);
        }
        catch(\Exception $e)
        {
            var_dump($e);
            exit;
        }
    }
}