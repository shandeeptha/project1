
<?php
include("db.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Invalid request method");
}

$playerid   = trim($_POST['playerid'] ?? '');
$playername = trim($_POST['playername'] ?? '');
$category   = trim($_POST['category'] ?? '');
$task       = trim($_POST['task'] ?? '');
$projectlink = trim($_POST['projectlink'] ?? '');

if (
    $playerid === '' ||
    $playername === '' ||
    $category === '' ||
    $task === ''
) {
    http_response_code(400);
    exit("Please complete all required fields.");
}

if ($projectlink !== '' &&
    !filter_var($projectlink, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    exit("Invalid project URL.");
}

$stmt = $conn->prepare(
    "INSERT INTO participants
    (playerid, playername, category, task, projectlink)
    VALUES (?, ?, ?, ?, ?)"
);

if (!$stmt) {
    http_response_code(500);
    exit("Database error.");
}

$stmt->bind_param(
    "sssss",
    $playerid,
    $playername,
    $category,
    $task,
    $projectlink
);

if ($stmt->execute()) {
    echo "Submission saved successfully.";
} else {
    http_response_code(500);
    echo "Submission failed.";
}

$stmt->close();
$conn->close();
?>
