<?php
header('Content-Type: application/json');
include '../config/koneksi.php';

if (!$conn) {
    echo json_encode(["error" => "Koneksi database gagal"]);
    exit;
}

$jenis = isset($_GET['jenis']) ? $_GET['jenis'] : '';
$server = isset($_GET['server']) ? $_GET['server'] : '';
$lastUpdate = isset($_GET['lastUpdate']) ? $_GET['lastUpdate'] : '';

$sql = "
    SELECT 
        mac_address,
        nama_mesin,
        SUBSTRING_INDEX(ext_port1, '|', -1) AS status,
        SUBSTRING_INDEX(ext_port1, '|', 1) AS ip_address,
        lastUpdate
    FROM setup_device
    WHERE 1=1
";

if ($jenis != '') {
    $sql .= " AND SUBSTRING_INDEX(mac_address, '_', 1) = '" . mysqli_real_escape_string($conn, $jenis) . "'";
}

if ($server != '') {
    $sql .= " AND serverFeeder = '" . mysqli_real_escape_string($conn, $server) . "'";
}

if ($lastUpdate == 'today') {
    $sql .= " AND DATE(lastUpdate) = CURDATE()";
}

if ($lastUpdate == '24h') {
    $sql .= " AND lastUpdate >= NOW() - INTERVAL 1 DAY";
}

if ($lastUpdate == '7d') {
    $sql .= " AND lastUpdate >= NOW() - INTERVAL 7 DAY";
}

if ($lastUpdate == '30d') {
    $sql .= " AND lastUpdate >= NOW() - INTERVAL 30 DAY";
}

$query = mysqli_query($conn, $sql);

if (!$query) {
    echo json_encode(["error" => "Query gagal: " . mysqli_error($conn)]);
    exit;
}

$data = [];
while($row = mysqli_fetch_assoc($query)){
    $data[] = $row;
}

echo json_encode($data);
?>
