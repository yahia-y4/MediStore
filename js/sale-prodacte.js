
document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("sell_products_container");
    const addProductBtn = document.getElementById("add-sell-product");

    // 🔹 دالة لتحديث أرقام المنتجات بعد أي تعديل
    function updateProductNumbers() {
        const productNumbers = productsContainer.querySelectorAll(".product-number");
        productNumbers.forEach((num, index) => {
            num.textContent = index + 1;
        });
    }

    // 🔹 إضافة منتج جديد
    addProductBtn.addEventListener("click", function () {
        const firstProduct = productsContainer.querySelector(".info-prodacte");
        if (!firstProduct) return;

        const newProduct = firstProduct.cloneNode(true);

        // تصفير القيم داخل المدخلات
        const inputs = newProduct.querySelectorAll("input");
        inputs.forEach(input => input.value = "");

        // ربط زر الحذف بالعنصر الجديد
        const deleteBtn = newProduct.querySelector(".delete-product");
        deleteBtn.addEventListener("click", function () {
            newProduct.remove();
            updateProductNumbers();
        });

        // إضافة العنصر الجديد للحاوية
        productsContainer.appendChild(newProduct);
        updateProductNumbers();
    });

    // 🔹 تفعيل زر الحذف للمنتج الأول
    const firstDeleteBtn = productsContainer.querySelector(".delete-product");
    if (firstDeleteBtn) {
        firstDeleteBtn.addEventListener("click", function (e) {
            // لا تحذف إذا بقي منتج واحد فقط
            if (productsContainer.querySelectorAll(".info-prodacte").length > 1) {
                e.target.closest(".info-prodacte").remove();
                updateProductNumbers();
            } else {
                alert("يجب أن يكون هناك منتج واحد على الأقل في الفاتورة.");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const addProdactSection = document.getElementById("add_prodact");
    const prodactAdindSection = document.getElementById("prodact_adind");

    const addedProductsBtn = document.getElementById("added_sell_fatora_button");
    const returnFatoraBtn = document.getElementById("return_fatora_product_button");

    // 🔹 عند الضغط على زر "العناصر المضافة"
    addedProductsBtn.addEventListener("click", function (e) {
        e.preventDefault(); // يمنع الانتقال للرابط
        addProdactSection.style.display = "none";
        prodactAdindSection.style.display = "block";
    });

    // 🔹 عند الضغط على زر "الرجوع إلى الفاتورة"
    returnFatoraBtn.addEventListener("click", function (e) {
        e.preventDefault();
        prodactAdindSection.style.display = "none";
        addProdactSection.style.display = "block";
    });

    // افتراضياً نخلي صفحة الفاتورة ظاهرة فقط
    addProdactSection.style.display = "block";
    prodactAdindSection.style.display = "none";
});

// صفحة البحث وجدول المنتجات المضافة 
document.addEventListener("DOMContentLoaded", function () {
    // بيانات تجريبية (يمكنك جلبها من قاعدة بيانات أو LocalStorage)
    let products = [
        { name: "بنادول", code: "P001", price: 1500, stock: 20 },
        { name: "فولتارين", code: "P002", price: 2500, stock: 15 },
        { name: "كومتركس", code: "P003", price: 1800, stock: 8 },
        { name: "فيتامين سي", code: "P004", price: 1000, stock: 50 },
        { name: "زنك", code: "P005", price: 1200, stock: 12 },
        { name: "حبوب الحديد", code: "P006", price: 2000, stock: 30 },
        { name: "دواء سعال", code: "P007", price: 1700, stock: 10 },
        { name: "مسكن ألم", code: "P008", price: 3000, stock: 25 },
        { name: "مضاد حيوي", code: "P009", price: 5000, stock: 5 },
        { name: "بنادول", code: "P001", price: 1500, stock: 20 },
        { name: "فولتارين", code: "P002", price: 2500, stock: 15 },
        { name: "كومتركس", code: "P003", price: 1800, stock: 8 },
        { name: "فيتامين سي", code: "P004", price: 1000, stock: 50 },
        { name: "زنك", code: "P005", price: 1200, stock: 12 },
        { name: "حبوب الحديد", code: "P006", price: 2000, stock: 30 },
        { name: "دواء سعال", code: "P007", price: 1700, stock: 10 },
        { name: "مسكن ألم", code: "P008", price: 3000, stock: 25 },
        { name: "مضاد حيوي", code: "P009", price: 5000, stock: 5 },
        { name: "بنادول", code: "P001", price: 1500, stock: 20 },
        { name: "فولتارين", code: "P002", price: 2500, stock: 15 },
        { name: "كومتركس", code: "P003", price: 1800, stock: 8 },
        { name: "فيتامين سي", code: "P004", price: 1000, stock: 50 },
        { name: "زنك", code: "P005", price: 1200, stock: 12 },
        { name: "حبوب الحديد", code: "P006", price: 2000, stock: 30 },
        { name: "دواء سعال", code: "P007", price: 1700, stock: 10 },
        { name: "مسكن ألم", code: "P008", price: 3000, stock: 25 },
        { name: "مضاد حيوي", code: "P009", price: 5000, stock: 5 },
        { name: "بنادول", code: "P001", price: 1500, stock: 20 },
        { name: "فولتارين", code: "P002", price: 2500, stock: 15 },
        { name: "كومتركس", code: "P003", price: 1800, stock: 8 },
        { name: "فيتامين سي", code: "P004", price: 1000, stock: 50 },
        { name: "زنك", code: "P005", price: 1200, stock: 12 },
        { name: "حبوب الحديد", code: "P006", price: 2000, stock: 30 },
        { name: "دواء سعال", code: "P007", price: 1700, stock: 10 },
        { name: "مسكن ألم", code: "P008", price: 3000, stock: 25 },
        { name: "مضاد حيوي", code: "P009", price: 5000, stock: 5 },
        { name: "مطهر", code: "P010", price: 800, stock: 60 }
    ];

    let currentPage = 1;
    let rowsPerPage = 10;

    const searchInput = document.getElementById("searchAddedProducts");
    const tableBody = document.querySelector("#addedTable tbody");
    const totalCount = document.getElementById("addedTotalCount");
    const shownCount = document.getElementById("addedShownCount");
    const rowsSelect = document.getElementById("addedRowsPerPage");
    const paginationNumbers = document.getElementById("addedPaginationNumbers");
    const paginationPrev = document.getElementById("addedPaginationPrev");
    const paginationNext = document.getElementById("addedPaginationNext");

    // دالة لعرض الجدول
    function displayTable() {
        let filteredProducts = filterProducts();
        let start = (currentPage - 1) * rowsPerPage;
        let end = rowsPerPage === "all" ? filteredProducts.length : start + rowsPerPage;
        let paginatedProducts = rowsPerPage === "all" ? filteredProducts : filteredProducts.slice(start, end);

        tableBody.innerHTML = "";

        paginatedProducts.forEach((p, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td>${p.name}</td>
                <td>${p.code}</td>
                <td>${p.price}</td>
                <td>${p.stock}</td>
                <td class="icon-col">
                    <button class="delete-btn" data-code="${p.code}" style="background:none;border:none;cursor:pointer;">
                        🗑️
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // تحديث العدادات
        totalCount.textContent = filteredProducts.length;
        shownCount.textContent = paginatedProducts.length;

        renderPagination(filteredProducts.length);
    }

    // دالة الفلترة للبحث
    function filterProducts() {
        let query = searchInput.value.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.code.toLowerCase().includes(query)
        );
    }

    // دالة إنشاء التنقل بالصفحات
    function renderPagination(totalItems) {
        paginationNumbers.innerHTML = "";
        paginationPrev.innerHTML = `<button ${currentPage === 1 ? "disabled" : ""}>السابق</button>`;
        paginationNext.innerHTML = `<button ${(currentPage * rowsPerPage >= totalItems && rowsPerPage !== "all") ? "disabled" : ""}>التالي</button>`;

        let totalPages = rowsPerPage === "all" ? 1 : Math.ceil(totalItems / rowsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            let btn = document.createElement("button");
            btn.textContent = i;
            btn.className = (i === currentPage ? "active" : "");
            btn.addEventListener("click", () => {
                currentPage = i;
                displayTable();
            });
            paginationNumbers.appendChild(btn);
        }
    }

    // حدث البحث
    searchInput.addEventListener("input", () => {
        currentPage = 1;
        displayTable();
    });

    // تغيير عدد العناصر في الصفحة
    rowsSelect.addEventListener("change", () => {
        rowsPerPage = rowsSelect.value === "all" ? "all" : parseInt(rowsSelect.value);
        currentPage = 1;
        displayTable();
    });

    // السابق
    paginationPrev.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayTable();
        }
    });

    // التالي
    paginationNext.addEventListener("click", () => {
        let filteredProducts = filterProducts();
        let totalPages = rowsPerPage === "all" ? 1 : Math.ceil(filteredProducts.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayTable();
        }
    });

    // حذف المنتج
    tableBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn") || e.target.closest(".delete-btn")) {
            let code = e.target.dataset.code || e.target.closest(".delete-btn").dataset.code;
            products = products.filter(p => p.code !== code);
            displayTable();
        }
    });

    // أول تحميل
    displayTable();
});

