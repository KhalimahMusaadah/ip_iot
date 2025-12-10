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
        <div class="filter-group">
            <label for="jenisFilter">Jenis Perangkat</label>
            <select id="jenisFilter">
                <option value="">-- Semua Jenis Perangkat --</option>
                <option value="O">O</option>
                <option value="M">M</option>
                <option value="A">A</option>
                <option value="I">I</option>
                <option value="P">P</option>
                <option value="D">D</option>
                <option value="V">V</option>
                <option value="IO">IO</option>
                <option value="G">G</option>
                <option value="AG">AG</option>
                <option value="IOT">IOT</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="serverFilter">Server</label>
            <select id="serverFilter">
                <option value="">-- Semua Server --</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="lastUpdateFilter">Last Update</label>
            <select id="lastUpdateFilter">
                <option value="">Semua</option>
                <option value="today">Hari Ini</option>
                <option value="24h">24 Jam Terakhir</option>
                <option value="7d">7 Hari Terakhir</option>
                <option value="30d">30 Hari Terakhir</option>
                <option value="90d">3 bulan terakhir</option>
            </select>
        </div>


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

    <!-- js -->
    <script src="assets/js/script.js"></script>

</body>
</html>
