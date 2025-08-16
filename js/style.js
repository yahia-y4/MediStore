// بيانات وهمية
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

// عناصر الصفحة
const rowsSelect = document.getElementById("rowsPerPage");
const tableBody = document.querySelector("#myTable tbody");
const tableContainer = document.getElementById("tableContainer");
const shownCountSpan = document.getElementById("shownCount");
const totalCountSpan = document.getElementById("totalCount");

const paginationPrev = document.getElementById("paginationPrev");
const paginationNumbers = document.getElementById("paginationNumbers");
const paginationNext = document.getElementById("paginationNext");

// تعيين إجمالي الصفحات
function updateTotalCount() {
    totalCountSpan.textContent = rowsPerPage === "all" ? 1 : Math.ceil(data.length / rowsPerPage);
}

// عرض الجدول
function displayTable(page = 1) {
    tableBody.innerHTML = "";
    let pageData;

    if (rowsPerPage === "all") {
        pageData = data;
        tableContainer.classList.add("table-scroll"); // أضف CSS overflow إذا أحببت
        shownCountSpan.textContent = `1 - ${data.length}`;
        totalCountSpan.textContent = 1;
        renderPagination(); // إخفاء أو تعطيل الأزرار
    } else {
        const start = (page - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, data.length);
        pageData = data.slice(start, end);
        shownCountSpan.textContent = `${start + 1} - ${end}`;
        updateTotalCount();
        tableContainer.classList.remove("table-scroll");
        renderPagination();
    }

    // إضافة الصفوف
    const fragment = document.createDocumentFragment();
    pageData.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id.toString().padStart(2,'0')}</td>
            <td>${item.name}</td>
            <td>${item.code}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.status}</td>
            <td class="icon-col">⋮</td>
        `;
        fragment.appendChild(tr);
    });
    tableBody.appendChild(fragment);
}

// إنشاء أزرار الصفحة
function renderPagination() {
    // إفراغ الحاويات
    paginationPrev.innerHTML = "";
    paginationNumbers.innerHTML = "";
    paginationNext.innerHTML = "";

    if (rowsPerPage === "all") return; // لا حاجة لعرض pagination

    const totalPages = Math.ceil(data.length / rowsPerPage);

    // زر السابق
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← السابق";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayTable(currentPage);
        }
    };
    paginationPrev.appendChild(prevBtn);

    // أزرار الأرقام
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        addPageButton(1);
        if (startPage > 2) paginationNumbers.appendChild(document.createTextNode(" ... "));
    }

    for (let i = startPage; i <= endPage; i++) addPageButton(i);

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) paginationNumbers.appendChild(document.createTextNode(" ... "));
        addPageButton(totalPages);
    }

    // زر التالي
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "التالي →";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayTable(currentPage);
        }
    };
    paginationNext.appendChild(nextBtn);

    // دالة إضافة زر رقم الصفحة
    function addPageButton(page) {
        const btn = document.createElement("button");
        btn.textContent = page;
        if (page === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = page;
            displayTable(currentPage);
        };
        paginationNumbers.appendChild(btn);
    }
}

// تغيير عدد الصفوف في كل صفحة
rowsSelect.addEventListener("change", () => {
    const val = rowsSelect.value;
    rowsPerPage = val === "all" ? "all" : parseInt(val);
    currentPage = 1;
    displayTable(currentPage);
});

// أول عرض للجدول
displayTable(currentPage);
