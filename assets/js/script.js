let allData = [];
let currentPage = 1;
const rowsPerPage = 20;
const pageGroupSize = 10;
let currentGroup = 0;

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        jenis: params.get('jenis') || '',
        server: params.get('server') || '',
        lastUpdate: params.get('lastUpdate') || '',
        page: parseInt(params.get('page')) || 1
    };
}

function updateUrl(jenis, server, lastUpdate, page) {
    const params = new URLSearchParams();
    if (jenis) params.set('jenis', jenis);
    if (server) params.set('server', server);
    if (lastUpdate) params.set('lastUpdate', lastUpdate);
    if (page > 1) params.set('page', page);
    
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.pushState({}, '', newUrl);
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
            
            const urlParams = getUrlParams();
            currentPage = urlParams.page;
            currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
            
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
    
    const urlParams = getUrlParams();
    updateUrl(urlParams.jenis, urlParams.server, urlParams.lastUpdate, page);
    
    renderTable();
    renderPagination();
}

function nextGroup() {
    currentGroup++;
    currentPage = currentGroup * pageGroupSize + 1;
    
    const urlParams = getUrlParams();
    updateUrl(urlParams.jenis, urlParams.server, urlParams.lastUpdate, currentPage);
    
    renderTable();
    renderPagination();
}

function prevGroup() {
    currentGroup--;
    currentPage = currentGroup * pageGroupSize + 1;
    
    const urlParams = getUrlParams();
    updateUrl(urlParams.jenis, urlParams.server, urlParams.lastUpdate, currentPage);
    
    renderTable();
    renderPagination();
}

function applyFilter() {
    const jenis = document.getElementById('jenisFilter').value;
    const server = document.getElementById('serverFilter').value;
    const lastUpdate = document.getElementById('lastUpdateFilter').value;
    
    updateUrl(jenis, server, lastUpdate, 1);
    
    loadData(jenis, server, lastUpdate);
}

window.addEventListener('DOMContentLoaded', function() {
    const params = getUrlParams();
    
    if (params.jenis) document.getElementById('jenisFilter').value = params.jenis;
    if (params.server) document.getElementById('serverFilter').value = params.server;
    if (params.lastUpdate) document.getElementById('lastUpdateFilter').value = params.lastUpdate;
    
    loadData(params.jenis, params.server, params.lastUpdate);
});