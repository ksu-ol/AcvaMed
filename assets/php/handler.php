<?php
header('Content-Type: application/json');

$mysqli = new mysqli("127.0.0.1", "root", "root", "form_akvaMed");

if ($mysqli->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Ошибка подключения к БД: " . $mysqli->connect_error
    ]);
    exit;
}


// Получаем данные
$form = $_POST['form'] ?? [];
$name  = trim($form['name'][0] ?? '');
$email = trim($form['email'][0] ?? '');
$phone = trim($form['phone'][0] ?? '');

if (!$name || !$email || !$phone) {
    echo json_encode([
        "success" => false,
        "message" => "Заполните все поля"
    ]);
    exit;
}

// Валидация email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Некорректный email"
    ]);
    exit;
}

// Валидация телефона
$clean_phone = preg_replace('/\D/', '', $phone);
if (!preg_match('/^[78]\d{10}$/', $clean_phone)) {
    echo json_encode([
        "success" => false,
        "message" => "Некорректный телефон"
    ]);
    exit;
}

// Повторное отправление
$stmt = $mysqli->prepare("
    SELECT id FROM requests
    WHERE name = ? AND email = ? AND phone = ?
    AND created_at > NOW() - INTERVAL 5 MINUTE
");

$stmt->bind_param("sss", $name, $email, $phone);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Вы уже отправляли заявку в течение 5 минут"
    ]);
    exit;
}

$stmt = $mysqli->prepare("
    INSERT INTO requests (name, email, phone)
    VALUES (?, ?, ?)
");

$stmt->bind_param("sss", $name, $email, $phone);
$stmt->execute();


echo json_encode([
    "success" => true,
    "message" => "Заявка успешно отправлена (без БД)!"
]);
