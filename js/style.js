
const data = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    name: `Amoxicillin 500mg`,
    code: `MED002`,
    price: `3$`,
    quantity: 20,
    status: "متوفر",
}));

let rowsPerPage = 10;
let currentPage = 1;

const rowsSelect = document.getElementById("rowsPerPage");
const tableBody = document.querySelector("#myTable tbody");
const pagination = document.getElementById("paginationControls");
const tableContainer = document.getElementById("tableContainer");
const shownCountSpan = document.getElementById("shownCount");
const totalCountSpan = document.getElementById("totalCount");

totalCountSpan.textContent = Math.ceil(data.length / rowsPerPage);

function displayTable(page) {
    tableBody.innerHTML = "";

    let pageData;
    if (rowsPerPage === "all") {
        pageData = data;
        pagination.innerHTML = "";
        tableContainer.classList.add("table-scroll");
        shownCountSpan.textContent = 1 + " - " + data.length;
        totalCountSpan.textContent = 1;
    } else {
        const start = (page - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, data.length);
        pageData = data.slice(start, end);
        tableContainer.classList.remove("table-scroll");
        renderPagination();
        shownCountSpan.textContent = (start + 1) + " - " + end;
        totalCountSpan.textContent = Math.ceil(data.length / rowsPerPage);
    }

    pageData.forEach(item => {
        const row = `<tr>
        <td>${item.id.toString().padStart(2, '0')}</td>
        <td>${item.name}</td>
        <td>${item.code}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.status}</td>
        <td class="icon-col">⋮</td>
      </tr>`;
        tableBody.innerHTML += row;
    });
}

function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // زر التالي (بما أن الاتجاه RTL يكون على اليسار)
    const next = document.createElement("button");
    next.textContent = "التالي ←";
    next.classList.add("next");
    next.disabled = currentPage === totalPages;
    next.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayTable(currentPage);
        }
    };
    pagination.appendChild(next);

    // زر السابق
    const prev = document.createElement("button");
    prev.textContent = "← السابق";
    prev.classList.add("prev");
    prev.disabled = currentPage === 1;
    prev.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayTable(currentPage);
        }
    };
    pagination.appendChild(prev);

    // أزرار الأرقام تظهر بين التالي والسابق (بسبب RTL سيتم عرضها بالترتيب من اليمين لليسار)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        addPageButton(1);
        if (startPage > 2) {
            const dots = document.createTextNode("...");
            pagination.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        addPageButton(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createTextNode("...");
            pagination.appendChild(dots);
        }
        addPageButton(totalPages);
    }

    function addPageButton(page) {
        const btn = document.createElement("button");
        btn.textContent = page;
        if (page === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = page;
            displayTable(currentPage);
        };
        pagination.appendChild(btn);
    }
}

rowsSelect.addEventListener("change", () => {
    const val = rowsSelect.value;
    rowsPerPage = val === "all" ? "all" : parseInt(val);
    currentPage = 1;
    displayTable(currentPage);
});

displayTable(currentPage);
