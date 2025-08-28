document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search_mored");
    const tableBody = document.querySelector("#suppliersTable tbody");
    const rowsPerPageSelect = document.getElementById("suppliersRowsPerPage");
    const paginationPrev = document.getElementById("suppliersPaginationPrev");
    const paginationNumbers = document.getElementById("suppliersPaginationNumbers");
    const paginationNext = document.getElementById("suppliersPaginationNext");
    const shownCount = document.getElementById("suppliersShownCount");
    const totalCount = document.getElementById("suppliersTotalCount");

    // بيانات وهمية للموردين
    const suppliers = [
        { name: "مؤسسة الغالي", phone: "0999999999", orders: 10, debt: 50000, paid: 20000 },
        { name: "مؤسسة الكرام", phone: "0988888888", orders: 8, debt: 10000, paid: 15000 },
        { name: "شركة الوفاء", phone: "0977777777", orders: 15, debt: 70000, paid: 30000 },
        { name: "مؤسسة النور", phone: "0966666666", orders: 5, debt: 0, paid: 10000 },
        { name: "شركة الأمل", phone: "0955555555", orders: 20, debt: 25000, paid: 25000 },
        { name: "مؤسسة الهدى", phone: "0944444444", orders: 12, debt: 15000, paid: 5000 },
        { name: "شركة الصدق", phone: "0933333333", orders: 6, debt: 20000, paid: 18000 },
        { name: "شركة الأمان", phone: "0922222222", orders: 11, debt: 35000, paid: 40000 },
        { name: "مؤسسة الياسمين", phone: "0911111111", orders: 3, debt: 5000, paid: 0 },
        { name: "مؤسسة الغالي", phone: "0999999999", orders: 10, debt: 50000, paid: 20000 },
        { name: "مؤسسة الكرام", phone: "0988888888", orders: 8, debt: 10000, paid: 15000 },
        { name: "شركة الوفاء", phone: "0977777777", orders: 15, debt: 70000, paid: 30000 },
        { name: "مؤسسة النور", phone: "0966666666", orders: 5, debt: 0, paid: 10000 },
        { name: "شركة الأمل", phone: "0955555555", orders: 20, debt: 25000, paid: 25000 },
        { name: "مؤسسة الهدى", phone: "0944444444", orders: 12, debt: 15000, paid: 5000 },
        { name: "شركة الصدق", phone: "0933333333", orders: 6, debt: 20000, paid: 18000 },
        { name: "شركة الأمان", phone: "0922222222", orders: 11, debt: 35000, paid: 40000 },
        { name: "مؤسسة الياسمين", phone: "0911111111", orders: 3, debt: 5000, paid: 0 },
        { name: "مؤسسة الغالي", phone: "0999999999", orders: 10, debt: 50000, paid: 20000 },
        { name: "مؤسسة الكرام", phone: "0988888888", orders: 8, debt: 10000, paid: 15000 },
        { name: "شركة الوفاء", phone: "0977777777", orders: 15, debt: 70000, paid: 30000 },
        { name: "مؤسسة النور", phone: "0966666666", orders: 5, debt: 0, paid: 10000 },
        { name: "شركة الأمل", phone: "0955555555", orders: 20, debt: 25000, paid: 25000 },
        { name: "مؤسسة الهدى", phone: "0944444444", orders: 12, debt: 15000, paid: 5000 },
        { name: "شركة الصدق", phone: "0933333333", orders: 6, debt: 20000, paid: 18000 },
        { name: "شركة الأمان", phone: "0922222222", orders: 11, debt: 35000, paid: 40000 },
        { name: "مؤسسة الياسمين", phone: "0911111111", orders: 3, debt: 5000, paid: 0 },
    ];

    let currentPage = 1;
    let rowsPerPage = parseInt(rowsPerPageSelect.value);

    // حساب الرصيد مع التلوين
    function formatBalance(debt, paid) {
        const balance = paid - debt;
        if (balance > 0) {
            return `<span style=" border-radius: 8px;background: #E6B905; display: inline-flex;padding: 4px 6px;justify-content: center;align-items: center;gap: 10px; font-weight:bold;">مدين ${balance}</span>`;
        } else if (balance < 0) {
            return `<span style="border-radius: 8px;background: #4CAF50; display: inline-flex;padding: 4px 6px;justify-content: center;align-items: center;gap: 10px;font-weight:bold;">دائن ${Math.abs(balance)}</span>`;
        } else {
            return `<span style=" border-radius: 8px;background: green; display: inline-flex;padding: 4px 6px;justify-content: center;align-items: center;gap: 10px; font-weight:bold;">متوازن</span>`;
        }
    }

    // عرض البيانات في الجدول
    function displaySuppliers() {
        const searchValue = searchInput.value.toLowerCase();
        const filtered = suppliers.filter((s) =>
            s.name.toLowerCase().includes(searchValue)
        );
        const total = filtered.length;

        rowsPerPage =
            rowsPerPageSelect.value === "all"
                ? total
                : parseInt(rowsPerPageSelect.value);
        const totalPages = Math.ceil(total / rowsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginated = filtered.slice(start, end);

        tableBody.innerHTML = "";

        paginated.forEach((s, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td>${s.name}</td>
                <td>${s.phone}</td>
                <td>${s.orders}</td>
                <td>${s.debt}</td>
                <td>${s.paid}</td>
                <td>${formatBalance(s.debt, s.paid)}</td>
                <td><span class="menu-btn">⋮</span></td>
            `;
            tableBody.appendChild(row);
        });

        // تحديث العدادات
        shownCount.textContent = currentPage; // الصفحة الحالية
        totalCount.textContent = totalPages;  // العدد الكلي للصفحات

        // بناء الصفحات
        paginationNumbers.innerHTML = "";
        let pagesToShow = [];

        // الصفحة الحالية والصفحتين بعدها
        for (let i = currentPage; i <= Math.min(currentPage + 2, totalPages); i++) {
            pagesToShow.push(i);
        }

        // إضافة ثلاث نقاط إذا بقي أكثر من صفحتين
        if (currentPage + 2 < totalPages - 2) {
            pagesToShow.push("...");
        }

        // آخر صفحتين
        for (let i = Math.max(totalPages - 1, currentPage + 3); i <= totalPages; i++) {
            if (i > currentPage + 2) pagesToShow.push(i);
        }

        // إنشاء الأزرار
        pagesToShow.forEach((p) => {
            const btn = document.createElement("button");
            btn.textContent = p;
            if (p === "...") {
                btn.disabled = true;
            } else {
                btn.classList.toggle("active", p === currentPage);
                btn.addEventListener("click", () => {
                    currentPage = p;
                    displaySuppliers();
                });
            }
            paginationNumbers.appendChild(btn);
        });

        paginationPrev.innerHTML = `<button  ${currentPage === 1 ? "disabled" : ""}>→ السابق</button>`;
        paginationNext.innerHTML = `<button ${currentPage === totalPages ? "disabled" : ""}>التالي ←</button>`;

        paginationPrev.querySelector("button").addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                displaySuppliers();
            }
        });

        paginationNext.querySelector("button").addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                displaySuppliers();
            }
        });
    }

    searchInput.addEventListener("input", () => {
        currentPage = 1;
        displaySuppliers();
    });

    rowsPerPageSelect.addEventListener("change", () => {
        currentPage = 1;
        displaySuppliers();
    });

    displaySuppliers();
});
