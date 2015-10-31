<?php

$recepient = "tbilous@gmail.com";
$sitename = "Hybrid ceramic";


$query = trim($_POST["query"]);
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$message = "Name: $name \nPhone: $phone \nComment: $query\nMail: $email";

$pagetitle = "Новый запрос с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
