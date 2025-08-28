// =========================
// بيانات المنتجات (مثال)
// =========================
const confirmProducts = [
  { name: "منتج 1", code: "A101", price: 50, stock: 100 },
  { name: "منتج 2", code: "A102", price: 75, stock: 40 },
  { name: "منتج 3", code: "A103", price: 120, stock: 25 },
  { name: "منتج 4", code: "A104", price: 200, stock: 12 },
  { name: "منتج 5", code: "A105", price: 35, stock: 80 },
  { name: "منتج 6", code: "A106", price: 60, stock: 15 },
  { name: "منتج 7", code: "A107", price: 90, stock: 50 },
  { name: "منتج 8", code: "A108", price: 150, stock: 10 },
  { name: "منتج 9", code: "A109", price: 110, stock: 22 },
  { name: "منتج 10", code: "A110", price: 45, stock: 70 },
  { name: "منتج 11", code: "A111", price: 99, stock: 5 },
  { name: "منتج 12", code: "A112", price: 250, stock: 8 },
];

// =========================
// عناصر DOM
// =========================
const confirmTableBody = document.querySelector("#confirmTable tbody");
const confirmShownCount = document.getElementById("confirmShownCount");
const confirmTotalCount = document.getElementById("confirmTotalCount");
const confirmRowsPerPage = document.getElementById("confirmRowsPerPage");

const confirmPaginationPrev = document.getElementById("confirmPaginationPrev");
const confirmPaginationNumbers = document.getElementById("confirmPaginationNumbers");
const confirmPaginationNext = document.getElementById("confirmPaginationNext");

// =========================
// متغيرات عامة
// =========================
let currentPage = 1;
let rowsPerPage = parseInt(confirmRowsPerPage.value);

// =========================
// دالة عرض الجدول
// =========================
function displayConfirmTable() {
  confirmTableBody.innerHTML = "";

  let start = (currentPage - 1) * rowsPerPage;
  let end = rowsPerPage === "all" ? confirmProducts.length : start + rowsPerPage;
  let paginatedProducts =
    rowsPerPage === "all" ? confirmProducts : confirmProducts.slice(start, end);

  paginatedProducts.forEach((prod, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${prod.name}</td>
      <td>${prod.code}</td>
      <td>${prod.price} ل.س</td>
      <td>${prod.stock}</td>
      <td class="icon-col" style="text-align:center; cursor:pointer;">⋮</td>
    `;
    confirmTableBody.appendChild(row);
  });

  confirmShownCount.textContent = paginatedProducts.length;
  confirmTotalCount.textContent = confirmProducts.length;

  setupPagination();
}

// =========================
// دالة إنشاء الترقيم
// =========================
function setupPagination() {
  confirmPaginationNumbers.innerHTML = "";

  let pageCount = rowsPerPage === "all" ? 1 : Math.ceil(confirmProducts.length / rowsPerPage);

  // زر السابق
  confirmPaginationPrev.innerHTML =
    currentPage > 1 ? `<button onclick="changePage(${currentPage - 1})">→ السابق</button>` : "";

  // الأرقام
  for (let i = 1; i <= pageCount; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => changePage(i);
    confirmPaginationNumbers.appendChild(btn);
  }

  // زر التالي
  confirmPaginationNext.innerHTML =
    currentPage < pageCount ? `<button onclick="changePage(${currentPage + 1})">التالي ←</button>` : "";
}

// =========================
// تغيير الصفحة
// =========================
function changePage(page) {
  currentPage = page;
  displayConfirmTable();
}

// =========================
// تغيير عدد الصفوف
// =========================
confirmRowsPerPage.addEventListener("change", function () {
  rowsPerPage = this.value === "all" ? "all" : parseInt(this.value);
  currentPage = 1;
  displayConfirmTable();
});

// =========================
// تشغيل أولي
// =========================
displayConfirmTable();
