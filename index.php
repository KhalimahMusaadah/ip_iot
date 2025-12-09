<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Monitoring IP IoT</title>
    <!-- css -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <h2>Monitoring IP IoT</h2>

    <div class="filters">
        <select id="jenisFilter">
            <option value="">-- Semua Jenis Perangkat --</option>
            <option value="O">O</option>
            <option value="IO">IO</option>
        </select>

        <select id="serverFilter">
            <option value="">-- Semua Server --</option>
            <option value="sinkron_mesin">sinkron_mesin</option>
            <option value="server_lain">server_lain</option>
        </select>

        <button onclick="applyFilter()">Terapkan Filter</button>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>MAC Address</th>
                    <th>Nama Mesin</th>
                    <th>Status</th>
                    <th>IP Address</th>
                    <th>Last Update</th>
                </tr>
            </thead>
            <tbody id="iot-data"></tbody>
        </table>
    </div>

    <div class="pagination" id="pagination"></div>

    <script src="assets/js/script.js"></script>

</body>
</html>
