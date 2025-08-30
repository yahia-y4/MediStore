// ---/المتغيرات/---

let AllSupplier_arry = [];
let AllItems_arry = [];
let Selected_Search_Items_arry = [];
let All_Buy_Invoices_arry = [];
let Temp_items_Buy_Invoice = [];
let Temp_items_single_sell = [];
let Temp_items_sale_Invoice = [];
let temp_table_buy_fatora = [];

//----
let SelectedSupplier_obj = {};
let balanceStatusSupplier_obj = {};
let SelectedItem_obj = {};
let Selected_Buy_Invoice_obj = {};
//----
let Temp_total_price_buy_Invoice = 0;
let temp_total_quantity_buy_Invoice=0;
let Temp_total_price_sale_Invoice = 0;
let selcted_item_id=0;
let selcted_moarid_id=0;

//------------------//



class Events {
  constructor() {
    this.set_event();
    this.getAllSupplierEvent();
    this.getOneSupplierEvent(7)
    // this.balanceStatusSupplierEvent(7)
    // this.addNewItemEvent();
    // this.updateItemEvent()
    this.getAllItemsEvent();
    // this.getOneItemEvent(3)
    // this.searchItemEvent("item 3")
    // setTimeout(() => {
    //      this.add_Item_to_temp_items_buy_Invoice()
    // }, 3000);
    // this.getBuyInvoiceEvent()
    // this.getOneBuyInvoiceEvent(1)
  }

  //-----/تنفيذ الاحداث /--------
  async set_event() {
    // ----------/ عند الضغط على انشاء الحساب/---------------
    const create_New_account = document.getElementById("create_New_account");
    if (create_New_account) {
      create_New_account.onclick = () => {
        this.addUserEvent();
      };
    }

    // -------------/عند الضغط على تسجيل الدخول/---------------
    const login = document.getElementById("login_but");
    if (login) {
      login.onclick = () => {
        this.loginEvent();
      };
    }

    // ----------------/اضافة مورد/--------------------
    const add_morid = document.getElementById("add-the-supplier");

    if (add_morid) {
      add_morid.onclick = () => {
        this.addNewSupplierEvent();
      };
    }

    //--------------/اضافة عنصر/--------------
    const add_item = document.getElementById("save_buy_add_item_button");
    console.log("-------");
    if (add_item) {
      add_item.onclick = () => {
        this.addNewItemEvent();
      };
    }
    const cancel_add_item = document.getElementById(
      "cancel_buy_add_item_button"
    );
    if (cancel_add_item) {
      cancel_add_item.onclick = () => {
        window.location.href = "Inventory.html";
      };
    }

    // -----------------/اضافة فاتورة شراء /--------------
    const input_barcode = document.getElementById("buy_fatora_item_barcode");
    if (input_barcode) {
      input_barcode.addEventListener("input", () => {
        this.when_code_input();
      });
    }
    const input_quantity = document.getElementById("buy_fatora_item_quantity");
    if (input_quantity) {
      input_quantity.addEventListener("input", () => {
        this.when_code_input();
      });
    }

    const add_one_item_to_fatora = document.getElementById(
      "add_one_item_to_fatora_but"
    );
    if (add_one_item_to_fatora) {
      add_one_item_to_fatora.onclick = () => {
        this.add_Item_to_temp_items_buy_Invoice();
        document.getElementById("buy_fatora_item_name").value = "";
        document.getElementById("buy_fatora_item_co_name").value = "";
        document.getElementById("buy_fatora_item_quantity").value = "";
        document.getElementById("buy_fatora_item_barcode").value = "";
        document.getElementById("buy_fatora_item_total").value = "";
      };
    }

    const add_buy_fatora = document.getElementById("save__fatora_button")
    if(add_buy_fatora){
      add_buy_fatora.onclick =()=>{
        this.addNewBuyInvoiceEvent()
      }
    }


    //----------/عرض التعديل والحذف والتفاصيل للمنتج في التخزين/------------
    const more_info = document.getElementById("more_btn")
    if(more_info){
      more_info.onclick=()=>{
        this.show_info_item(selcted_item_id)
        document.getElementById("details_box").style.display="flex"
      }
    }
    const x_more_info_but = document.getElementById("x_more_info_but")
    if(x_more_info_but){
      x_more_info_but.onclick=()=>{
        
        document.getElementById("details_box").style.display="none"
         document.getElementById("details_buttons").style.display="none";

      }
    }

    const delete_item = document.getElementById("delete_btn_item")
    if(delete_item){
      delete_item.onclick =()=>{
         this.deleteOneItemEvent(selcted_item_id)
        
      }
    }

    const update_item = document.getElementById("edit_btn_item")
    if(update_item){
      update_item.onclick =()=>{
        this.click_on_update()
      }
    }
  }
  //----------------------------//


//-----------/عرض تفاصيل العنصر/-----------
click_on_item(id){
  selcted_item_id = id
  console.log(id)
  document.getElementById("details_buttons").style.display="flex";
}

show_info_item(id){
  const item = AllItems_arry.find(i => i.id == id)

  if(item){
    console.log(item)
    document.getElementById("product_name_info").innerText= item.name;
  document.getElementById("product_manufacturer_info").innerText=item.company
  document.getElementById("product_quantity_info").innerText=item.quantity
  document.getElementById("product_buy_price_info").innerText= item.selling_price
  document.getElementById("product_profit_price_info").innerText= item.profit_margin
  document.getElementById("product_sall_price_info").innerText= +item.selling_price + (+item.selling_price * +item.profit_margin)
  document.getElementById("product_expiry_date_info").innerText= item.expiry_date
  document.getElementById("product_code_info").innerText=item.barcode
  }

}


  // -------- / احداث المصادقة /-------------
  async addUserEvent() {
    const name = document.getElementById("New_account_name").value;
    const email = document.getElementById("New_account_email").value;
    const password = document.getElementById("New_account_password").value;
    const password_confirmation = document.getElementById(
      "New_account_password"
    ).value;

    if (!name || !email || !password || !password_confirmation) {
      console.log("نقص في معلومات المستخدم");
      return;
    }
    if (password !== password_confirmation) {
      console.log("خطا في كلمة المرور");
      return;
    }
    const data = await Api.register(
      name,
      email,
      password,
      password_confirmation
    );
    console.log(data);
    if (data.message == "User registered successfully") {
      window.location.href = "index.html";
    }
  }
  async loginEvent() {
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;
    if (!email || !password) {
      console.log("نقص في معلومات التسجيل");
      return;
    }
    const data = await Api.login(email, password);

    if (data.message == "Login successful") {
      window.location.href = "index.html";
    }
  }
  async logoutEvent() {
    await Api.logout();
  }
  // -----------------------------------------//

  // -------- / احداث الموردين /------------
  async addNewSupplierEvent() {
    const name = document.getElementById("morid_name").value;
    const contact_details = document.getElementById("phone").value;
    if (!name || !contact_details) {
      console.log("نقص في بيانات المورد");
      return;
    }
    await Api.addNewSupplier(name, contact_details);
  }
  async getAllSupplierEvent() {
    await Api.getAllSupplier();
    console.log(AllSupplier_arry);
  }
  async getOneSupplierEvent(id) {
    await Api.getOneSupplier(id);
    console.log(SelectedSupplier_obj);
  }
  async puyDebtSupplier() {
    const id = "";
    const amount = "";
    const payment_method = "";
    const notes = "";
    if (!id || !amount || !payment_method || !notes) {
      console.log("نقص في معلومات الدفعة");
      return;
    }
    await Api.puyDebtSupplier(id, amount, payment_method, notes);
  }
  async balanceStatusSupplierEvent(id) {
    await Api.balanceStatusSupplier(id);
    console.log(balanceStatusSupplier_obj);
  }
  async deleteSupplierEvent(id) {
    await Api.deleteSupplier(id);
  }

  click_on_moarid(id){
    selcted_moarid_id = id
    document.getElementById("details_buttons_moarid").style.display="flex";
  }
  //---------------------------------------//

  // ---------/احداث العناصر/-----------
  async addNewItemEvent() {
    const name = document.getElementById("item_name_add").value;
    const company = document.getElementById("item_co_name_add").value;
    const profit_margin = +document.getElementById("item_profit_margin_add")
      .value;
    const selling_price = +document.getElementById("item_price_add").value;
    const barcode = document.getElementById("item_barcode_add").value;
    const date = document.getElementById("item_expiry_date_add").value;
    const quantity = +document.getElementById("item_quantity_add").value;
    const expiry_date = new Date(date).toISOString().split("T")[0];

    if (
      !name ||
      !company ||
      !expiry_date ||
      !barcode ||
      profit_margin < 0 ||
      selling_price < 0 ||
      quantity < 0
    ) {
      console.log(" خطأ في معلومات العنصر ");
      return;
    }
    const wholesale_price = selling_price * quantity;
    const data = await Api.addNewItem(
      name,
      company,
      wholesale_price,
      profit_margin,
      selling_price,
      barcode,
      expiry_date,
      quantity
    );
    console.log(data);
  }

  // ----//تعديل---
  click_on_update(){
    sessionStorage.setItem("selected_item_id",selcted_item_id)
     window.location.href = "edite_item.html";
  }
  async updateItemEvent() {
    const id = 3;
    const name = "item 3";
    const company = "co_item-3";
    const profit_margin = 0.1;
    const selling_price = 3;
    const barcode = "77877673254";
    const expiry_date = "2026-07-29";
    const quantity = 10;

    if (
      !name ||
      !company ||
      !expiry_date ||
      !barcode ||
      profit_margin < 0 ||
      selling_price < 0 ||
      quantity < 0
    ) {
      console.log(" خطأ في معلومات العنصر ");
      return;
    }
    const wholesale_price = selling_price * quantity;
    const data = await Api.updateOneItem(
      id,
      name,
      company,
      wholesale_price,
      profit_margin,
      selling_price,
      barcode,
      expiry_date,
      quantity
    );
    console.log(data);
  }
  async getAllItemsEvent() {
    await Api.getAllItems();
    // console.log(AllItems_arry);
  }
  async getOneItemEvent(id) {
    await Api.getOneItem(id);
    console.log(SelectedItem_obj);
  }
  async searchItemEvent(query) {
    await Api.searchItem(query);
    console.log(Selected_Search_Items_arry);
  }
  async deleteOneItemEvent(id) {
    await Api.deleteOneItem(id);
  }
  async sellSingleItemsEvent() {
    const total_price = "";
    const invoice_date = "";
    const items = [];
    await Api.sellSingleItems(total_price, invoice_date, items);
  }
  //-------------------------------------//

  //----------/احداث فواتير الشراء/-------------
  // ----(دوال اضافة فاتورة شراء جديدة)----

  when_code_input() {
    const data = document.getElementById("buy_fatora_item_barcode").value;
    if (data) {
      const item = AllItems_arry.find((i) => i.barcode == data);
      if (item) {
        document.getElementById("buy_fatora_item_name").value = item.name;
        document.getElementById("buy_fatora_item_co_name").value = item.company;
        if (document.getElementById("buy_fatora_item_quantity").value) {
          document.getElementById("buy_fatora_item_total").value =
            +document.getElementById("buy_fatora_item_quantity").value *
            +item.selling_price;
        } else {
          document.getElementById("buy_fatora_item_total").value = "";
        }
      } else {
        document.getElementById("buy_fatora_item_name").value = "";
        document.getElementById("buy_fatora_item_co_name").value = "";
        document.getElementById("buy_fatora_item_total").value = "";
      }
    }
  }

  add_Item_to_temp_items_buy_Invoice() {
    const name = document.getElementById("buy_fatora_item_name").value;
    const company = document.getElementById("buy_fatora_item_co_name").value;
    const quantity = document.getElementById("buy_fatora_item_quantity").value;
    const barcode = document.getElementById("buy_fatora_item_barcode").value;
    if (!name || !company || quantity < 0) {
      console.log("خطا في ادخال بيانات العنصر");
      return;
    }

    this.handle_trmp_items_arry_Event(name, company, quantity, barcode);
    console.log(Temp_items_Buy_Invoice);
  }
  handle_trmp_items_arry_Event(name, company, quantity, barcode) {
    let temp_obj = {
      item_id: 0,
      quantity: quantity,
    };
    if (barcode) {
      const findeItem = AllItems_arry.find((item) => item.barcode == barcode);
      if (findeItem) {
        temp_obj.item_id = findeItem.id;
        Temp_items_Buy_Invoice.push(temp_obj);
        Temp_total_price_buy_Invoice += +quantity * +findeItem.selling_price;
        temp_total_quantity_buy_Invoice += +quantity
        document.getElementById("all-prodacte").value = temp_total_quantity_buy_Invoice
        document.getElementById("totale_price_buy_fatora").value = Temp_total_price_buy_Invoice
        this.add_item_to_table(
          findeItem.name,
          findeItem.company,
          quantity,
          findeItem.selling_price,
          +findeItem.selling_price * +quantity
        );
        console.log("تم اضافة هذا العنصر الى العناصر المؤقتة الخاصة بالفاتورة");
      } else {
        console.log("العنصر ليس له سجل بالمخزن");
      }
    } else if (name && company) {
      const findeItem = AllItems_arry.find(
        (item) => item.name == name && item.company == company
      );
      if (findeItem) {
        temp_obj.item_id = findeItem.id;
        Temp_items_Buy_Invoice.push(temp_obj);
        Temp_total_price_buy_Invoice += +quantity * +findeItem.selling_price;
        temp_total_quantity_buy_Invoice += +quantity
         document.getElementById("all-prodacte").value = temp_total_quantity_buy_Invoice
        document.getElementById("totale_price_buy_fatora").value = Temp_total_price_buy_Invoice
              this.add_item_to_table(
          findeItem.name,
          findeItem.company,
          quantity,
          findeItem.selling_price,
          +findeItem.selling_price * +quantity
        );
        console.log("تم اضافة هذا العنصر الى العناصر المؤقتة الخاصة بالفاتورة");
      } else {
        console.log("العنصر ليس له سجل بالمخزن");
      }
    } else {
      console.log("خطا في ادخال بيانات العنصر");
    }
  }

  add_item_to_table(name, co_name, quantity, price, total) {
    document.getElementById("buy_fatora_items_added_tbody").innerHTML += `

    
                                    <tr>
                                        <td>${name}</td>
                                        <td>${co_name} A</td>
                                        <td>${quantity}</td>
                                        <td>${price} $</td>
                                        <td>${total} $</td>
                                    </tr>
    `;
  }

  async addNewBuyInvoiceEvent() {
    const supplier_name = document.getElementById("morid_name").value;
    let supplier_id;
    const warehouse_owner_name = document.getElementById("boss_name").value;
    const total_price = Temp_total_price_buy_Invoice;
    const payment_status = "partial";
    const paid_amount = +document.getElementById("amount_paid").value;
    const invoice_date = new Date(document.getElementById("invoice_date").value)
      .toISOString()
      .split("T")[0];
    const items = Temp_items_Buy_Invoice;

    if (
      !supplier_name ||
      !warehouse_owner_name ||
      !payment_status ||
      !paid_amount ||
      !invoice_date ||
      !items
    ) {
      console.log("خطاء في مدخلات الفاتورة");
      return;
    }
    const findSupplier = AllSupplier_arry.find(
      (Supplier) => Supplier.name == supplier_name
    );
    if (findSupplier) {
      supplier_id = findSupplier.id;
    } else {
      console.log("خطأ في اسم المورد");
      return;
    }
    console.log(items);
    await Api.addNewBuyInvoice(
      supplier_id,
      warehouse_owner_name,
      total_price,
      payment_status,
      paid_amount,
      invoice_date,
      items
    );
  }
  //----------------------------------------//
  async getBuyInvoiceEvent() {
    await Api.getBuyInvoice();
    console.log(All_Buy_Invoices_arry);
  }
  async getOneBuyInvoiceEvent(id) {
    await Api.getOneBuyInvoice(id);
    console.log(Selected_Buy_Invoice_obj);
  }
  async deleteBuyInvoiceEvent(id) {
    await Api.deleteBuyInvoice(id);
  }
  //--------------------------------------------//

  //--------/احداث فواتير البيع/---------
  //---(دوال اضافة فاتورة بيع جديدة)---
  add_Item_to_temp_items_sale_Invoice() {
    const name = "item 3";
    const company = "co_item-3";
    const quantity = 20;
    const barcode = "77877673254";
    if (!name || !company || quantity < 0) {
      console.log("خطا في ادخال بيانات العنصر");
      return;
    }

    this.handle_trmp_items_sale_arry_Event(name, company, quantity, barcode);
    console.log(Temp_items_sale_Invoice);
  }
  handle_trmp_items_sale_arry_Event(name, company, quantity, barcode) {
    let temp_obj = {
      item_id: 0,
      quantity: quantity,
      selling_price: 0,
    };
    if (barcode) {
      const findeItem = AllItems_arry.find((item) => item.barcode == barcode);
      if (findeItem) {
        temp_obj.item_id = findeItem.id;
        temp_obj.selling_price = item.selling_price;
        Temp_items_sale_Invoice.push(temp_obj);
        Temp_total_price_sale_Invoice += +quantity * +findeItem.selling_price;

        console.log("تم اضافة هذا العنصر الى العناصر المؤقتة الخاصة بالفاتورة");
      } else {
        console.log("العنصر له له سجل بالمخزن");
      }
    } else if (name && company) {
      const findeItem = AllItems_arry.find(
        (item) => item.name == name && item.company == company
      );
      if (findeItem) {
        temp_obj.item_id = findeItem.id;
        temp_obj.selling_price = item.selling_price;
        Temp_items_sale_Invoice.push(temp_obj);
        Temp_total_price_sale_Invoice += +quantity * +findeItem.selling_price;
        console.log("تم اضافة هذا العنصر الى العناصر المؤقتة الخاصة بالفاتورة");
      } else {
        console.log("العنصر له له سجل بالمخزن");
      }
    } else {
      console.log("خطا في ادخال بيانات العنصر");
    }
  }
  async addNewSaleInvoiceEvent() {}

  //------------------------------------//

  //-------------------------------------//
}

class API {
  constructor() {
    this.B_URL = "http://prog2025.goldyol.com/api";
  }

  // =============== المصادقة ===================

  async register(name, email, password, password_confirmation) {
    try {
      const res = await fetch(`${this.B_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.errors);
        return data.errors;
      }

      console.log("تم اضافة المستخدم");
      console.log(data);
      localStorage.setItem("token", data.bearer_token);
      return data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  async login(email, password) {
    try {
      const res = await fetch(`${this.B_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.errors);
        return data.errors;
      }

      console.log(" تم التسجيل بنجاح ");
      console.log(data);
      localStorage.setItem("token", data.bearer_token);
      return data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  async logout() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("لا يوجد حساب مسجل بالفعل");
    }

    try {
      const res = await fetch(`${this.B_URL}/check`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.errors);
        return data.errors;
      }
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  //==============================================//

  // ================= الموردين =================

  // اضافة مورد
  async addNewSupplier(name, contact_details) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/suppliers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name,
          contact_details,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return data.errors;
      }
      console.log(data);
      window.location.href = "Suppliers .html";
    } catch (e) {
      console.log(e);
    }
  }

  // عرض كل الموردين
  async getAllSupplier() {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/suppliers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      }
      console.log(data);
      AllSupplier_arry = data.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  // عرض مورد معين
  async getOneSupplier(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/suppliers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log(data);
      SelectedSupplier_obj = data;
    } catch (e) {
      console.log(e);
    }
  }

  // دفع ديون المورد
  async puyDebtSupplier(id, amount, payment_method, notes) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/suppliers/${id}/pay-debt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          amount,
          payment_method,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return data.errors;
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  // عرض حالة رصيد المورد
  async balanceStatusSupplier(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/suppliers/${id}/balance-status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log(data);
      balanceStatusSupplier_obj = data.data;
    } catch (e) {
      console.log(e);
    }
  }
  // حذف مورد
  async deleteSupplier(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/suppliers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return data.message;
      }
      console.log("تم حذف المورد", id);
    } catch (e) {
      console.log(e);
    }
  }
  //==============================================//

  // ================ فواتير الشراء =============
  // اضافة فاتورة شراء
  async addNewBuyInvoice(
    supplier_id,
    warehouse_owner_name,
    total_price,
    payment_status,
    paid_amount,
    invoice_date,
    items
  ) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/purchase-invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          supplier_id,
          warehouse_owner_name,
          total_price,
          payment_status,
          paid_amount,
          invoice_date,
          items,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log("تمت الاضافة", data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  // عرض فواتير الشراء
  async getBuyInvoice() {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/purchase-invoices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      All_Buy_Invoices_arry = data.data;
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  // عرض فاتورة  شراء معينة
  async getOneBuyInvoice(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/purchase-invoices/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log(data);
      Selected_Buy_Invoice_obj = data.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  // حذف فاتورة شراء
  async deleteBuyInvoice(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/purchase-invoices/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log("تم الحذف", data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  //=================================================//

  // ================ فواتير البيع ===============
  //اضافة فاتورة بيع جديدة
  async addNewSaleInvoice(
    buyer_name,
    total_price,
    invoice_date,
    warehouse_owner_name = "المالك",
    items
  ) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/sale-invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          buyer_name,
          total_price,
          invoice_date,
          warehouse_owner_name,
          items,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return data;
      }
      console.log("تمت الاضافة", data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  //عرض فواتير البيع
  async getAllSaleInvoices() {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/sale-invoices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  // عرض فاتوة بيع معينة
  async getOneSaleInvoice(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/sale-invoices/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  // حذف فاتورة بيع
  async deleteSaleInvoice(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/sale-invoices/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log("تم الحذف", data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  //===============================================//

  //=================عناصر الفواتير===============
  // اضافة عنصر جديد
  async addNewItem(
    name,
    company,
    wholesale_price,
    profit_margin,
    selling_price,
    barcode,
    expiry_date,
    quantity
  ) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name,
          company,
          wholesale_price,
          profit_margin,
          selling_price,
          barcode,
          expiry_date,
          quantity,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return data;
      }
      console.log("تمت الاضافة", data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  //عرض كل العناصر
  async getAllItems() {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log(data);
      AllItems_arry = data.data;
    } catch (e) {
      console.log(e);
    }
  }
  // عرض عنصر معين
  async getOneItem(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/items/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      SelectedItem_obj = data.data;
    } catch (e) {
      console.log(e);
    }
  }
  // تعديل عنصر معين
  async updateOneItem(
    id,
    name,
    company,
    wholesale_price,
    profit_margin,
    selling_price,
    barcode,
    expiry_date,
    quantity
  ) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name,
          company,
          wholesale_price,
          profit_margin,
          selling_price,
          barcode,
          expiry_date,
          quantity,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  // حذف عنصر معين
  async deleteOneItem(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return data;
      }
      console.log(data);
       location.reload();
    } catch (e) {
      console.log(e);
    }
  }
  //البحث عن عنصر معين
  async searchItem(query) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/items/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          query,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return data;
      }
      console.log(data);
      Selected_Search_Items_arry = data.data;
    } catch (e) {
      console.log(e);
    }
  }
  //بيع عناصر فردية

  async sellSingleItems(total_price, invoice_date, items) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { errors: "خطا في التوكن " };
    }
    try {
      const res = await fetch(`${this.B_URL}/items/sell-single`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          total_price,
          invoice_date,
          items,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return data;
      }
      console.log("تم البيع", data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  //==============================================//

  //===============/الاحصائيات /====================
  // عرض الاحصائيات الشاملة
  async getAllStatistics() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("خطا في التوكن");
      return;
    }
    try {
      const res = await fetch(`${this.B_URL}/statistics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      } else {
        console.log(data);
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  //===============================================//
}

// ***********************(استدعاء كائنات من الاصناف )**************************//

const Api = new API();
const Events_M_C = new Events();

// -------------/ تنسيق صفحة index/---------------------

function index_style() {
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
      totalCountSpan.textContent = Math.ceil(
        AllItems_arry.length / rowsPerPage
      ); // إجمالي الصفحات
    }

    // إنشاء الصفوف وإضافتها للجدول
    const fragment = document.createDocumentFragment(); // لتحسين الأداء أثناء الإضافة
   pageData.forEach((item) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${item.id.toString().padStart(2, "0")}</td> <!-- رقم العنصر -->
    <td>${item.name}</td>                           <!-- اسم المنتج -->
    <td>${item.company ?? "-"}</td>                 <!-- الشركة -->
    <td>${+item.selling_price + +item.profit_margin * +item.selling_price}</td> <!-- السعر مع هامش الربح -->
    <td>${item.quantity}</td>                       <!-- الكمية -->
    <td>${item.status ?? ""}</td>                   <!-- الحالة -->
    <td class="icon-col">⋮</td>                     <!-- أيقونة الخيارات -->
  `;

  // ✅ إضافة event listener للـ ⋮
  const iconCol = tr.querySelector(".icon-col");
  iconCol.addEventListener("click", () => {
    Events_M_C.click_on_item(item.id);
  });

  fragment.appendChild(tr);
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
  if (!rowsSelect) {
    return;
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
}
index_style();

// -------------------التخزبن-----------------
function inventory_style() {
  // بيانات تجريبية للمخزون
  const productsData = [
    { name: "شاشة", code: "PRD001", price: 120, stock: 5, status: "متاح" },
    { name: "ماوس", code: "PRD002", price: 20, stock: 50, status: "متاح" },
    { name: "كيبورد", code: "PRD003", price: 35, stock: 2, status: "منخفض" },
    { name: "لاب توب", code: "PRD004", price: 850, stock: 10, status: "متاح" },
    { name: "هارد ديسك", code: "PRD005", price: 60, stock: 1, status: "منخفض" },
    {
      name: "USB",
      code: "PRD006",
      price: 15,
      stock: 120,
      status: "الأكثر مبيعاً",
    },
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
  if (!rowsPerPageSelect) {
    return;
  }

  // إعدادات
  let currentPage = 1;
  let rowsPerPage = parseInt(rowsPerPageSelect.value);
  let currentFilter = "all";

  // دالة عرض الجدول
  function displayTable() {
    tableBody.innerHTML = "";

    // تصفية حسب التبويبات
    let filteredProducts = productsData.filter((prod) => {
      if (currentFilter === "low") return prod.stock <= 5;
      if (currentFilter === "best") return prod.status === "الأكثر مبيعاً";
      return true;
    });

    // تحديث العدد الكلي
    totalCountElements.forEach(
      (el) => (el.textContent = filteredProducts.length)
    );

    let start = (currentPage - 1) * rowsPerPage;
    let end =
      rowsPerPage === "all" ? filteredProducts.length : start + rowsPerPage;
    let paginatedItems =
      rowsPerPage === "all"
        ? filteredProducts
        : filteredProducts.slice(start, end);

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
      <td class="icon-col"><span class="action-icon" style="cursor:pointer;" onCleck=x()>⋮</span></td>
    `;
      tableBody.appendChild(row);
    });

    setupPagination(filteredProducts.length);
  }

  // إعداد Pagination
  function setupPagination(totalItems) {
    paginationNumbers.innerHTML = "";
    let pageCount =
      rowsPerPage === "all" ? 1 : Math.ceil(totalItems / rowsPerPage);

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

    paginationPrev.innerHTML = `<button style ${
      currentPage === 1 ? "disabled" : ""
    }>→ السابق</button>`;
    paginationNext.innerHTML = `<button ${
      currentPage === pageCount ? "disabled" : ""
    }> التالي←</button>`;

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
    rowsPerPage =
      rowsPerPageSelect.value === "all"
        ? "all"
        : parseInt(rowsPerPageSelect.value);
    currentPage = 1;
    displayTable();
  });

  // التبويبات
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      currentFilter = tab.dataset.filter;
      currentPage = 1;
      displayTable();
    });
  });

  // تشغيل أول مرة
  displayTable();
}

inventory_style();

//---------الموردون----------

function morid_style() {
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search_mored");
    const tableBody = document.querySelector("#suppliersTable tbody");
    const rowsPerPageSelect = document.getElementById("suppliersRowsPerPage");
    const paginationPrev = document.getElementById("suppliersPaginationPrev");
    const paginationNumbers = document.getElementById(
      "suppliersPaginationNumbers"
    );
    const paginationNext = document.getElementById("suppliersPaginationNext");
    const shownCount = document.getElementById("suppliersShownCount");
    const totalCount = document.getElementById("suppliersTotalCount");

    // بيانات وهمية للموردين
    const suppliers = [
      {
        name: "مؤسسة الغالي",
        phone: "0999999999",
        orders: 10,
        debt: 50000,
        paid: 20000,
      },
      {
        name: "مؤسسة الكرام",
        phone: "0988888888",
        orders: 8,
        debt: 10000,
        paid: 15000,
      },
      {
        name: "شركة الوفاء",
        phone: "0977777777",
        orders: 15,
        debt: 70000,
        paid: 30000,
      },
      {
        name: "مؤسسة النور",
        phone: "0966666666",
        orders: 5,
        debt: 0,
        paid: 10000,
      },
      {
        name: "شركة الأمل",
        phone: "0955555555",
        orders: 20,
        debt: 25000,
        paid: 25000,
      },
      {
        name: "مؤسسة الهدى",
        phone: "0944444444",
        orders: 12,
        debt: 15000,
        paid: 5000,
      },
      {
        name: "شركة الصدق",
        phone: "0933333333",
        orders: 6,
        debt: 20000,
        paid: 18000,
      },
      {
        name: "شركة الأمان",
        phone: "0922222222",
        orders: 11,
        debt: 35000,
        paid: 40000,
      },
      {
        name: "مؤسسة الياسمين",
        phone: "0911111111",
        orders: 3,
        debt: 5000,
        paid: 0,
      },
      {
        name: "مؤسسة الغالي",
        phone: "0999999999",
        orders: 10,
        debt: 50000,
        paid: 20000,
      },
      {
        name: "مؤسسة الكرام",
        phone: "0988888888",
        orders: 8,
        debt: 10000,
        paid: 15000,
      },
      {
        name: "شركة الوفاء",
        phone: "0977777777",
        orders: 15,
        debt: 70000,
        paid: 30000,
      },
      {
        name: "مؤسسة النور",
        phone: "0966666666",
        orders: 5,
        debt: 0,
        paid: 10000,
      },
      {
        name: "شركة الأمل",
        phone: "0955555555",
        orders: 20,
        debt: 25000,
        paid: 25000,
      },
      {
        name: "مؤسسة الهدى",
        phone: "0944444444",
        orders: 12,
        debt: 15000,
        paid: 5000,
      },
      {
        name: "شركة الصدق",
        phone: "0933333333",
        orders: 6,
        debt: 20000,
        paid: 18000,
      },
      {
        name: "شركة الأمان",
        phone: "0922222222",
        orders: 11,
        debt: 35000,
        paid: 40000,
      },
      {
        name: "مؤسسة الياسمين",
        phone: "0911111111",
        orders: 3,
        debt: 5000,
        paid: 0,
      },
      {
        name: "مؤسسة الغالي",
        phone: "0999999999",
        orders: 10,
        debt: 50000,
        paid: 20000,
      },
      {
        name: "مؤسسة الكرام",
        phone: "0988888888",
        orders: 8,
        debt: 10000,
        paid: 15000,
      },
      {
        name: "شركة الوفاء",
        phone: "0977777777",
        orders: 15,
        debt: 70000,
        paid: 30000,
      },
      {
        name: "مؤسسة النور",
        phone: "0966666666",
        orders: 5,
        debt: 0,
        paid: 10000,
      },
      {
        name: "شركة الأمل",
        phone: "0955555555",
        orders: 20,
        debt: 25000,
        paid: 25000,
      },
      {
        name: "مؤسسة الهدى",
        phone: "0944444444",
        orders: 12,
        debt: 15000,
        paid: 5000,
      },
      {
        name: "شركة الصدق",
        phone: "0933333333",
        orders: 6,
        debt: 20000,
        paid: 18000,
      },
      {
        name: "شركة الأمان",
        phone: "0922222222",
        orders: 11,
        debt: 35000,
        paid: 40000,
      },
      {
        name: "مؤسسة الياسمين",
        phone: "0911111111",
        orders: 3,
        debt: 5000,
        paid: 0,
      },
    ];
    if (!rowsPerPageSelect) {
      return;
    }
    let currentPage = 1;
    let rowsPerPage = parseInt(rowsPerPageSelect.value);

    // حساب الرصيد مع التلوين
    function formatBalance(debt, paid) {
      const balance = paid - debt;
      if (balance > 0) {
        return `<span style=" border-radius: 8px;background: #E6B905; display: inline-flex;padding: 4px 6px;justify-content: center;align-items: center;gap: 10px; font-weight:bold;">مدين ${balance}</span>`;
      } else if (balance < 0) {
        return `<span style="border-radius: 8px;background: #4CAF50; display: inline-flex;padding: 4px 6px;justify-content: center;align-items: center;gap: 10px;font-weight:bold;">دائن ${Math.abs(
          balance
        )}</span>`;
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
      totalCount.textContent = totalPages; // العدد الكلي للصفحات

      // بناء الصفحات
      paginationNumbers.innerHTML = "";
      let pagesToShow = [];

      // الصفحة الحالية والصفحتين بعدها
      for (
        let i = currentPage;
        i <= Math.min(currentPage + 2, totalPages);
        i++
      ) {
        pagesToShow.push(i);
      }

      // إضافة ثلاث نقاط إذا بقي أكثر من صفحتين
      if (currentPage + 2 < totalPages - 2) {
        pagesToShow.push("...");
      }

      // آخر صفحتين
      for (
        let i = Math.max(totalPages - 1, currentPage + 3);
        i <= totalPages;
        i++
      ) {
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

      paginationPrev.innerHTML = `<button  ${
        currentPage === 1 ? "disabled" : ""
      }>→ السابق</button>`;
      paginationNext.innerHTML = `<button ${
        currentPage === totalPages ? "disabled" : ""
      }>التالي ←</button>`;

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
}

morid_style();

function buy_fatora_style() {
  let productCount = 1;
  let add = document.getElementById("add-product");
  if (!add) {
    return;
  }

  add.addEventListener("click", function () {
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
}














// تنسيق صفحة السجلات 
//==============================
// JavaScript لإدارة عرض الأقسام
//==============================

document.addEventListener("DOMContentLoaded", () => {
    // العناصر الرئيسية
    const overviewSection = document.getElementById("records-overview");
    const purchaseSection = document.getElementById("records-purchase");
    const salesSection = document.getElementById("records-sales");

    // أزرار العرض
    const btnSales = document.getElementById("btn-sales");
    const btnPurchase = document.getElementById("btn-purchase");

    // أزرار العودة
    const btnReturnPurchase = document.getElementById("btn-return-purchase");
    const btnReturnSales = document.getElementById("btn-return-sales");

    // دالة لإخفاء كل الأقسام
    function hideAllSections() {
        overviewSection.style.display = "none";
        purchaseSection.style.display = "none";
        salesSection.style.display = "none";
    }

    // عرض القسم المطلوب فقط
    function showSection(section) {
        hideAllSections();
        section.style.display = "block";
    }

    //===========================
    // الإعدادات الافتراضية عند التحميل
    //===========================
    showSection(overviewSection); // عرض القسم العام عند البداية

    //===========================
    // الأحداث
    //===========================

    // عرض فواتير البيع
    if (btnSales) {
        btnSales.addEventListener("click", () => {
            showSection(salesSection);
        });
    }

    // عرض فواتير الشراء
    if (btnPurchase) {
        btnPurchase.addEventListener("click", () => {
            showSection(purchaseSection);
        });
    }

    // زر العودة من فواتير الشراء
    if (btnReturnPurchase) {
        btnReturnPurchase.addEventListener("click", () => {
            showSection(overviewSection);
        });
    }

    // زر العودة من فواتير البيع
    if (btnReturnSales) {
        btnReturnSales.addEventListener("click", () => {
            showSection(overviewSection);
        });
    }

    //===========================
    // حذف صف من الجدول
    //===========================
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            if (row) {
                // تأكيد قبل الحذف
                const confirmDelete = confirm("هل تريد حذف هذا السجل؟");
                if (confirmDelete) {
                    row.remove();
                }
            }
        });
    });
});

//  نهاية تنسيق صفحة السجلات 
// تنسيق صفحة التقارير 

// نهاية تنسيق التقارير