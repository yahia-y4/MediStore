// بيانات تجريبية
let addedProducts = [
  { id: 1, code: "A100", name: "منتج 1", price: 100, stock: 20 },
  { id: 2, code: "B200", name: "منتج 2", price: 150, stock: 5 },
  { id: 3, code: "C300", name: "منتج 3", price: 200, stock: 0 },
  { id: 4, code: "D400", name: "منتج 4", price: 80, stock: 30 },
  { id: 5, code: "E500", name: "منتج 5", price: 50, stock: 12 },
  { id: 6, code: "F600", name: "منتج 6", price: 400, stock: 2 },
  { id: 7, code: "G700", name: "منتج 7", price: 90, stock: 0 },
  { id: 8, code: "H800", name: "منتج 8", price: 120, stock: 15 },
  { id: 9, code: "I900", name: "منتج 9", price: 75, stock: 6 },
  { id: 10, code: "J1000", name: "منتج 10", price: 300, stock: 1 },
];

// المتغيرات الأساسية
let currentPage = 1;
let rowsPerPage = 10;
let filteredProducts = [...addedProducts];

// عناصر DOM
const addedTableBody = document.querySelector("#addedTable tbody");
const addedTotalCount = document.getElementById("addedTotalCount");
const addedShownCount = document.getElementById("addedShownCount");
const addedRowsPerPage = document.getElementById("addedRowsPerPage");
const searchAddedProducts = document.getElementById("searchAddedProducts");
const addedPaginationNumbers = document.getElementById("addedPaginationNumbers");
const addedPaginationPrev = document.getElementById("addedPaginationPrev");
const addedPaginationNext = document.getElementById("addedPaginationNext");

// دالة لعرض البيانات
function displayTable() {
  addedTableBody.innerHTML = "";

  let start = (currentPage - 1) * rowsPerPage;
  let end = rowsPerPage === "all" ? filteredProducts.length : start + rowsPerPage;
  let paginatedItems = rowsPerPage === "all" ? filteredProducts : filteredProducts.slice(start, end);

  paginatedItems.forEach((product, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${product.name}</td>
      <td>${product.code}</td>
      <td>${product.price} $</td>
      <td>${product.stock}</td>
      <td><span class="delete-btn" data-id="${product.id}">🗑️</span></td>
    `;
    addedTableBody.appendChild(row);
  });

  addedTotalCount.textContent = filteredProducts.length;
  addedShownCount.textContent = paginatedItems.length;

  setupPagination();
}

// البحث
searchAddedProducts.addEventListener("input", () => {
  let query = searchAddedProducts.value.toLowerCase();
  filteredProducts = addedProducts.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.code.toLowerCase().includes(query) ||
    p.id.toString().includes(query)
  );
  currentPage = 1;
  displayTable();
});

// تغيير عدد الصفوف
addedRowsPerPage.addEventListener("change", () => {
  rowsPerPage = addedRowsPerPage.value === "all" ? "all" : parseInt(addedRowsPerPage.value);
  currentPage = 1;
  displayTable();
});

// الترقيم
function setupPagination() {
  addedPaginationNumbers.innerHTML = "";

  let totalPages = rowsPerPage === "all" ? 1 : Math.ceil(filteredProducts.length / rowsPerPage);

  // زر السابق
  addedPaginationPrev.innerHTML = currentPage > 1 ? `<button >&laquo;</button>` : "";
  if (currentPage > 1) {
    addedPaginationPrev.querySelector("button").addEventListener("click", () => {
      currentPage--;
      displayTable();
    });
  }

  // أرقام الصفحات
  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayTable();
    });
    addedPaginationNumbers.appendChild(btn);
  }

  // زر التالي
  addedPaginationNext.innerHTML = currentPage < totalPages ? `<button>&raquo;</button>` : "";
  if (currentPage < totalPages) {
    addedPaginationNext.querySelector("button").addEventListener("click", () => {
      currentPage++;
      displayTable();
    });
  }
}

// حذف منتج
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let id = parseInt(e.target.dataset.id);
    addedProducts = addedProducts.filter(p => p.id !== id);
    filteredProducts = [...addedProducts];
    displayTable();
  }
});

// أول عرض
displayTable();
