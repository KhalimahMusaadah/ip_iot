<?php
header('Content-Type: application/json');
include '../config/koneksi.php';

if (!$conn) {
    echo json_encode(["error" => "Koneksi database gagal"]);
    exit;
}

$jenis = isset($_GET['jenis']) ? $_GET['jenis'] : '';
$server = isset($_GET['server']) ? $_GET['server'] : '';

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
