<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
// Simple, secure contact endpoint using PDO prepared statements
// IMPORTANT: update the database credentials below before use.
$db_host = '127.0.0.1';
$db_name = 'tour_travel';
$db_user = 'root';
$db_pass = '1234'; // <-- change this

// Basic server-side validation
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
if(!$name || !$email || !$message){
  echo json_encode(['success'=>false,'error'=>'Please fill all fields.']);
  exit;
}
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
  echo json_encode(['success'=>false,'error'=>'Invalid email address.']);
  exit;
}
try{
  $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
  $pdo = new PDO($dsn, $db_user, $db_pass, [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
  $stmt = $pdo->prepare('INSERT INTO contacts (name,email,message,created_at) VALUES (:name,:email,:message,NOW())');
  $stmt->execute([':name'=>$name,':email'=>$email,':message'=>$message]);
  echo json_encode(['success'=>true]);
}catch(PDOException $e){
  // In production, log $e->getMessage() instead of returning it
  echo json_encode(['success'=>false,'error'=>'Server error. Please try again later.']);
}



