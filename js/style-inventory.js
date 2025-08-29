// بيانات تجريبية للمخزون
const productsData = [
  { name: "شاشة", code: "PRD001", price: 120, stock: 5, status: "متاح" },
  { name: "ماوس", code: "PRD002", price: 20, stock: 50, status: "متاح" },
  { name: "كيبورد", code: "PRD003", price: 35, stock: 2, status: "منخفض" },
  { name: "لاب توب", code: "PRD004", price: 850, stock: 10, status: "متاح" },
  { name: "هارد ديسك", code: "PRD005", price: 60, stock: 1, status: "منخفض" },
  { name: "USB", code: "PRD006", price: 15, stock: 120, status: "الأكثر مبيعاً" },
  { name: "شاحن", code: "PRD007", price: 25, stock: 15, status: "متاح" },
  { name: "كاميرا", code: "PRD008", price: 220, stock: 3, status: "منخفض" },
];

// عناصر DOM
const tableBody = document.querySelector("#myTable tbody");
const totalCountElements = document.querySelectorAll("#totalCount");
const shownCount = document.getElementById("shownCount");
const rowsPerPageSelect = document.getElementById("rowsPerPage");
const paginationPrev = document.getElementById("paginationPrev");
const paginationNumbers = document.getElementById("paginationNumbers");
const paginationNext = document.getElementById("paginationNext");
const filterTabs = document.querySelectorAll("#filter-tabs span");

// إعدادات
let currentPage = 1;
let rowsPerPage = parseInt(rowsPerPageSelect.value);
let currentFilter = "all";

// دالة عرض الجدول
function displayTable() {
  tableBody.innerHTML = "";

  // تصفية حسب التبويبات
  let filteredProducts = productsData.filter(prod => {
    if (currentFilter === "low") return prod.stock <= 5;
    if (currentFilter === "best") return prod.status === "الأكثر مبيعاً";
    return true;
  });

  // تحديث العدد الكلي
  totalCountElements.forEach(el => el.textContent = filteredProducts.length);

  let start = (currentPage - 1) * rowsPerPage;
  let end = rowsPerPage === "all" ? filteredProducts.length : start + rowsPerPage;
  let paginatedItems = rowsPerPage === "all" ? filteredProducts : filteredProducts.slice(start, end);

  shownCount.textContent = paginatedItems.length;

  // تعبئة الجدول
  paginatedItems.forEach((prod, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${prod.name}</td>
      <td>${prod.code}</td>
      <td>${prod.price}$</td>
      <td>${prod.stock}</td>
      <td>${prod.status}</td>
      <td class="icon-col"><span class="action-icon" style="cursor:pointer;"></span></td>
    `;
    tableBody.appendChild(row);
  });

  setupPagination(filteredProducts.length);
}

// إعداد Pagination
function setupPagination(totalItems) {
  paginationNumbers.innerHTML = "";
  let pageCount = rowsPerPage === "all" ? 1 : Math.ceil(totalItems / rowsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayTable();
    });
    paginationNumbers.appendChild(btn);
  }

  paginationPrev.innerHTML = `<button style ${currentPage === 1 ? "disabled" : ""}>→ السابق</button>`;
  paginationNext.innerHTML = `<button ${currentPage === pageCount ? "disabled" : ""}> التالي←</button>`;

  paginationPrev.querySelector("button").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayTable();
    }
  };

  paginationNext.querySelector("button").onclick = () => {
    if (currentPage < pageCount) {
      currentPage++;
      displayTable();
    }
  };
}

// تغيير عدد العناصر في الصفحة
rowsPerPageSelect.addEventListener("change", () => {
  rowsPerPage = rowsPerPageSelect.value === "all" ? "all" : parseInt(rowsPerPageSelect.value);
  currentPage = 1;
  displayTable();
});

// التبويبات
filterTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    filterTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentFilter = tab.dataset.filter;
    currentPage = 1;
    displayTable();
  });
});

// تشغيل أول مرة
displayTable();
