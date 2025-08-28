// استيراد الأحداث والمصفوفة الرئيسية من ملف main.js
// Events_M_C: كائن يحتوي على الوظائف المتعلقة بالأحداث (مثل جلب البيانات)
// AllItems_arry: مصفوفة تحتوي على كل العناصر للعرض في الجدول
import { Events_M_C, AllItems_arry } from "../main.js";

// إعداد المتغيرات الأساسية للتحكم في التصفح
let rowsPerPage = 10; // عدد الصفوف المعروضة في كل صفحة (يمكن تغييره)
let currentPage = 1; // الصفحة الحالية

// الحصول على عناصر DOM من الصفحة
const rowsSelect = document.getElementById("rowsPerPage"); // قائمة اختيار عدد الصفوف
const tableBody = document.querySelector("#myTable tbody"); // tbody للجدول لملئه بالبيانات
const tableContainer = document.getElementById("tableContainer"); // حاوية الجدول (لتحكم بالscroll)
const shownCountSpan = document.getElementById("shownCount"); // العنصر لعرض عدد الصفوف الظاهرة
const totalCountSpan = document.getElementById("totalCount"); // العنصر لعرض إجمالي عدد الصفحات

// عناصر التصفح (Pagination)
const paginationPrev = document.getElementById("paginationPrev"); // زر السابق
const paginationNumbers = document.getElementById("paginationNumbers"); // أزرار أرقام الصفحات
const paginationNext = document.getElementById("paginationNext"); // زر التالي

// دالة عرض الجدول
// تقوم بملء الجدول بالصفوف المناسبة للصفحة الحالية
async function displayTable(page = 1) {
    // جلب البيانات من خلال الحدث الموجود في Events_M_C
    await Events_M_C.getAllItemsEvent();

    // تفريغ الجدول قبل ملئه
    tableBody.innerHTML = "";
    let pageData;

    // حالة عرض كل العناصر دفعة واحدة (all)
    if (rowsPerPage === "all") {
        pageData = AllItems_arry; // استخدام كل العناصر
        tableContainer.classList.add("table-scroll"); // إضافة scroll عند الحاجة
        shownCountSpan.textContent = `1 - ${AllItems_arry.length}`; // عرض عدد العناصر
        totalCountSpan.textContent = 1; // إجمالي الصفحات = 1
        renderPagination(); // إعادة رسم أزرار التصفح (يمكن إخفاؤها)
    } else {
        // حساب البداية والنهاية للصفحة الحالية
        const start = (page - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, AllItems_arry.length);
        pageData = AllItems_arry.slice(start, end); // أخذ العناصر المناسبة للصفحة
        tableContainer.classList.remove("table-scroll"); // إزالة scroll إذا كان موجود
        renderPagination(); // إعادة رسم أزرار التصفح
        shownCountSpan.textContent = `${start + 1} - ${end}`; // تحديث عرض الصفوف
        totalCountSpan.textContent = Math.ceil(AllItems_arry.length / rowsPerPage); // إجمالي الصفحات
    }

    // إنشاء الصفوف وإضافتها للجدول
    const fragment = document.createDocumentFragment(); // لتحسين الأداء أثناء الإضافة
    pageData.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${item.id
                .toString()
                .padStart(2, "0")}</td>          <!-- رقم العنصر مع leading zero -->
        <td>${item.name
            }</td>                                   <!-- اسم المنتج -->
        <td>${item.company ?? "-"
            }</td>                         <!-- اسم الشركة (أو '-' إذا غير موجود) -->
      <td>${+item.selling_price + +item.profit_margin * +item.selling_price
            }</td> <!-- السعر مع هامش الربح -->
        <td>${item.quantity
            }</td>                                <!-- الكمية المتوفرة -->
        <td>${item.status ?? ""
            }</td>                            <!-- حالة المنتج (متوفر/غير متوفر) -->
        <td class="icon-col">⋮</td>                              <!-- أيقونة الخيارات -->
    `;
        fragment.appendChild(tr); // إضافة الصف للـ fragment
    });
    tableBody.appendChild(fragment); // إضافة كل الصفوف دفعة واحدة للجدول
}

// دالة إنشاء أزرار التصفح (Pagination)
function renderPagination() {
    // تفريغ الأزرار القديمة
    paginationPrev.innerHTML = "";
    paginationNumbers.innerHTML = "";
    paginationNext.innerHTML = "";

    // إذا اخترنا "all" لا حاجة لأزرار التصفح
    if (rowsPerPage === "all") return;

    // حساب إجمالي الصفحات
    const totalPages = Math.ceil(AllItems_arry.length / rowsPerPage);

    // زر السابق
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "→ السابق";
    prevBtn.disabled = currentPage === 1; // تعطيله إذا نحن في الصفحة الأولى
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayTable(currentPage);
        }
    };
    paginationPrev.appendChild(prevBtn);

    // تحديد نطاق الأزرار التي ستظهر (مثلاً ±2 حول الصفحة الحالية)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // إضافة أول صفحة وزر "..."
    if (startPage > 1) {
        addPageButton(1);
        if (startPage > 2)
            paginationNumbers.appendChild(document.createTextNode(" ... "));
    }

    // إضافة الأزرار الرئيسية حول الصفحة الحالية
    for (let i = startPage; i <= endPage; i++) addPageButton(i);

    // إضافة آخر صفحة وزر "..." إذا لم تظهر
    if (endPage < totalPages) {
        if (endPage < totalPages - 1)
            paginationNumbers.appendChild(document.createTextNode(" ... "));
        addPageButton(totalPages);
    }

    // زر التالي
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "التالي ←";
    nextBtn.disabled = currentPage === totalPages; // تعطيله إذا نحن في الصفحة الأخيرة
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayTable(currentPage);
        }
    };
    paginationNext.appendChild(nextBtn);

    // دالة مساعدة لإضافة زر رقم الصفحة
    function addPageButton(page) {
        const btn = document.createElement("button");
        btn.textContent = page;
        if (page === currentPage) btn.classList.add("active"); // تمييز الصفحة الحالية
        btn.onclick = () => {
            currentPage = page;
            displayTable(currentPage);
        };
        paginationNumbers.appendChild(btn);
    }
}

// تغيير عدد الصفوف في كل صفحة عند اختيار المستخدم
rowsSelect.addEventListener("change", () => {
    const val = rowsSelect.value;
    rowsPerPage = val === "all" ? "all" : parseInt(val);
    currentPage = 1; // العودة للصفحة الأولى عند التغيير
    displayTable(currentPage); // إعادة عرض الجدول
});

// عرض الجدول لأول مرة عند تحميل الصفحة
displayTable(currentPage);
