let productCount = 1;

document.getElementById("add-product").addEventListener("click", function () {
  productCount++;

  // جلب أول منتج كقالب
  let firstProduct = document.querySelector(".info-prodacte");
  let newProduct = firstProduct.cloneNode(true);

  // تحديث الرقم
  newProduct.querySelector(".product-number").textContent = productCount;

  // تصفير المدخلات
  newProduct.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  // إضافة حدث الحذف
  newProduct
    .querySelector(".delete-product")
    .addEventListener("click", function () {
      newProduct.remove();
      updateProductNumbers();
    });

  // إضافة العنصر الجديد للحاوية
  document.getElementById("products-container").appendChild(newProduct);
});

// تحديث أرقام المنتجات بعد الحذف
function updateProductNumbers() {
  let products = document.querySelectorAll(".info-prodacte");
  products.forEach((prod, index) => {
    prod.querySelector(".product-number").textContent = index + 1;
  });
  productCount = products.length;
}

// إضافة حدث الحذف للمنتج الأول
document
  .querySelector(".delete-product")
  .addEventListener("click", function () {
    this.closest(".info-prodacte").remove();
    updateProductNumbers();
  });
