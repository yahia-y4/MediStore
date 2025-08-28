// ======== بيانات تجريبية للجدول ========
const saleInvoiceData = [
    { name: "منتج 1", code: "P001", price: 100, remaining: 20 },
    { name: "منتج 2", code: "P002", price: 150, remaining: 10 },
    { name: "منتج 3", code: "P003", price: 200, remaining: 5 },
    { name: "منتج 4", code: "P004", price: 50, remaining: 15 },
    { name: "منتج 5", code: "P005", price: 75, remaining: 8 },
    { name: "منتج 6", code: "P006", price: 120, remaining: 12 },
    { name: "منتج 7", code: "P007", price: 90, remaining: 7 },
    { name: "منتج 8", code: "P008", price: 110, remaining: 3 },
    { name: "منتج 9", code: "P009", price: 95, remaining: 6 },
    { name: "منتج 10", code: "P010", price: 60, remaining: 14 },
    { name: "منتج 11", code: "P011", price: 130, remaining: 11 },
    { name: "منتج 12", code: "P012", price: 80, remaining: 9 },
];

// ======== المتغيرات ========
let currentPage = 1;
let rowsPerPage = 10;

const tableBody = document.querySelector("#saleInvoiceTable tbody");
const shownCount = document.getElementById("saleInvoiceShownCount"); // عدد العناصر بالصفحة
const totalCount = document.getElementById("saleInvoiceTotalCount"); // رقم الصفحة الحالية
const rowsPerPageSelect = document.getElementById("saleInvoiceRowsPerPage");

const paginationPrev = document.getElementById("saleInvoicePaginationPrev");
const paginationNext = document.getElementById("saleInvoicePaginationNext");
const paginationNumbers = document.getElementById("saleInvoicePaginationNumbers");

// ======== تحديث الجدول ========
function renderTable() {
    tableBody.innerHTML = "";

    let start = (currentPage - 1) * rowsPerPage;
    let end = rowsPerPage === "all" ? saleInvoiceData.length : start + rowsPerPage;
    let pageData = saleInvoiceData.slice(start, end);

    pageData.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${item.name}</td>
      <td>${item.code}</td>
      <td>${item.price}</td>
      <td>${item.remaining}</td>
      <td class="icon-col"><span class="delete-btn">🗑️</span></td>
    `;
        tableBody.appendChild(row);

        // حذف الصف عند الضغط على السلة
        row.querySelector(".delete-btn").addEventListener("click", () => {
            const idx = saleInvoiceData.indexOf(item);
            if (idx > -1) {
                saleInvoiceData.splice(idx, 1);
                if (rowsPerPage !== "all" && currentPage > Math.ceil(saleInvoiceData.length / rowsPerPage)) {
                    currentPage--;
                }
                renderTable();
                renderPagination();
            }
        });
    });

    // عرض عدد العناصر في الصفحة الحالية
    shownCount.textContent = pageData.length;

    // عرض رقم الصفحة الحالية من إجمالي الصفحات
    const totalPages = rowsPerPage === "all" ? 1 : Math.ceil(saleInvoiceData.length / rowsPerPage);
    totalCount.textContent = `${currentPage} / ${totalPages}`;
}

// ======== تغيير عدد الصفوف ========
rowsPerPageSelect.addEventListener("change", () => {
    const val = rowsPerPageSelect.value;
    rowsPerPage = val === "all" ? "all" : parseInt(val);
    currentPage = 1;
    renderTable();
    renderPagination();
});

// ======== إنشاء Pagination ========
function renderPagination() {
    paginationNumbers.innerHTML = "";

    if (rowsPerPage === "all") {
        paginationPrev.style.display = "none";
        paginationNext.style.display = "none";
        return;
    } else {
        paginationPrev.style.display = "inline-block";
        paginationNext.style.display = "inline-block";
    }

    const totalPages = Math.ceil(saleInvoiceData.length / rowsPerPage);

    // أرقام الصفحات
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("page-btn");
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            renderTable();
            renderPagination();
        });
        paginationNumbers.appendChild(btn);
    }

    // زر السابق
    paginationPrev.innerHTML = `<button ${currentPage === 1 ? "disabled" : ""}>→ السابق</button>`;
    paginationPrev.querySelector("button").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            renderPagination();
        }
    });

    // زر التالي
    paginationNext.innerHTML = `<button ${currentPage === totalPages ? "disabled" : ""}>التالي ←</button>`;
    paginationNext.querySelector("button").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            renderPagination();
        }
    });
}

// ======== تشغيل عند التحميل ========
renderTable();
renderPagination();
