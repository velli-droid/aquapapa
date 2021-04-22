<?php
    // Файлы phpmailer
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    require 'phpmailer/Exception.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host = '194.61.0.8'; // SMTP сервера вашей почты
    $mail->Username = 'karaban21'; // Логин на почте
    $mail->Password = '4H0s5X1x'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom('admin@aquapapa.ru'); // Адрес самой почты и имя отправителя

    // кому отправить
    $mail->addAddress('info@aquapapa.ru');
    $mail->addAddress('andrew.griaznow@yandex.ru');
    $mail->addAddress('vel.boyar@gmail.com');
    
    
    $mail->isHTML(true);
    $mail->Subject = $_POST['formSubject'];

    $body = '<h1>Письмо с сайта AQUAPAPA!</h1>';

    if(trim(!empty($_POST['userName']))){
        $body.='<p>Имя: '.$_POST['userName'].'</p>';
    }
    if(trim(!empty($_POST['userEmail']))){
        $body.='<p>Email: '.$_POST['userEmail'].'</p>';
    }
    if(trim(!empty($_POST['userPhone']))){
        $body.='<p>Телефон: '.$_POST['userPhone'].'</p>';
    }
    if(trim(!empty($_POST['userQuestion']))){
        $body.='<p>Вопрос: '.$_POST['userQuestion'].'</p>';
    }

    $mail->Body = $body;

    // отправляем
    if(!$mail->send()) {
        $message = 'Oшибка';
    } else {
        $message = 'Данные отправлены';
    }

    $responce = ['message' => $message];
    

    header('Content-type: application/json');
    echo json_encode($responce);
?>