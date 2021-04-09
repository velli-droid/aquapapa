<?php
    $to = "Адрес почты";
    $subject = 'Консультация'; //Заголовок сообщения
    $message = '
        <html>
            <head>
                <title>'.$subject.'</title>
            </head>
            <body>
                <p>Имя: '.$_POST['userName'].'</p>
                <p>Телефон: '.$_POST['userPhone'].'</p>
                <p>Email: '.$_POST['userEmail'].'</p>
                <p>Сообщение: '.$_POST['userMessage'].'</p>                                   
            </body>
        </html>'; //Текст сообщения
        
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Отправитель <from@example.com>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
?>