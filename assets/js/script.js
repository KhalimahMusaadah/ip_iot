let allData = [];
let currentPage = 1;
const rowsPerPage = 20;
const pageGroupSize = 10;
let currentGroup = 0;

const savedPage = localStorage.getItem('currentPage');
if (savedPage) {
    currentPage = parseInt(savedPage);
}

function loadData(jenis='', server='', lastUpdate='') {
    fetch(`api/get_data.php?jenis=${jenis}&server=${server}&lastUpdate=${lastUpdate}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                document.getElementById('iot-data').innerHTML =
                    `<tr><td colspan="5" style="color:red;">${data.error}</td></tr>`;
                return;
            }

            allData = data;
            //currentPage = 1;
            //currentGroup = 0;
            renderTable();
            renderPagination();
        })
        .catch(err => {
            document.getElementById('iot-data').innerHTML =
                `<tr><td colspan="5" style="color:red;">Error: ${err}</td></tr>`;
        });
}

function renderTable() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = allData.slice(start, end);

    let html = '';

    pageData.forEach(row => {
        const ip = row.ip_address ?? '';
        const ipLink = ip ? `<a href="http://${ip}" target="_blank">${ip}</a>` : '';

        html += `
            <tr>
                <td>${row.mac_address ?? ''}</td>
                <td>${row.nama_mesin ?? ''}</td>
                <td>${row.status ?? ''}</td>
                <td>${ipLink}</td>
                <td>${row.lastUpdate ?? ''}</td>
            </tr>
        `;
    });

    document.getElementById('iot-data').innerHTML = html;
}

function renderPagination() {
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    const startPage = currentGroup * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

    let buttons = '';

    if (currentGroup > 0) {
        buttons += `<button class="nav-btn" onclick="prevGroup()">← Prev</button>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        buttons += `
            <button class="${i === currentPage ? 'active' : ''}"
                onclick="goToPage(${i})">${i}</button>
        `;
    }

    if (endPage < totalPages) {
        buttons += `<button class="nav-btn" onclick="nextGroup()">Next →</button>`;
    }

    document.getElementById('pagination').innerHTML = buttons;
}

function goToPage(page) {
    currentPage = page;
    localStorage.setItem('currentPage', page); // ✅ simpan halaman
    renderTable();
    renderPagination();
}


function nextGroup() {
    currentGroup++;
    currentPage = currentGroup * pageGroupSize + 1;
    renderTable();
    renderPagination();
}

function prevGroup() {
    currentGroup--;
    currentPage = currentGroup * pageGroupSize + 1;
    renderTable();
    renderPagination();
}

function applyFilter() {
    const jenis = document.getElementById('jenisFilter').value;
    const server = document.getElementById('serverFilter').value;
    const lastUpdate = document.getElementById('lastUpdateFilter').value;
    loadData(jenis, server, lastUpdate);
}

loadData();
setInterval(() => {
    const jenis = document.getElementById('jenisFilter').value;
    const server = document.getElementById('serverFilter').value;
    loadData(jenis, server);
}, 5000);
