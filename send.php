<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require 'PHPMailer/src/Exception.php'
    require 'PHPMailer/src/PHPMailer.php'

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'PHPMailer/language/');
    $mail->isHTML(true);

    // от кого 
    $mail->setFrom('admin@aquapapa.ru')

    // кому отправить
    $mail->addAddress('info@aquapapa.ru');
    $mail->addAddress('andrew.griaznow@yandex.ru');
    $mail->addAddress('vel.boyar@gmail.com');
    
    $mail->Subject = 'Консультация';

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