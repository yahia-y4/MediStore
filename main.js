// ---/المتغيرات/---

let AllSupplier_arry = [];
let SelectedSupplier_op = {};
let balanceStatusSupplier_op = {};
let AllItems_arry = [];

//------------------//

class Events {
  constructor() {
    this.set_event()
    //  this.getAllSupplierEvent()
    // this.getOneSupplierEvent(7)
    // this.balanceStatusSupplierEvent(7)
    // this.addNewItemEvent();
    // this.updateItemEvent()
    // this.getAllItemsEvent()
  }
  async set_event() {

    // ----------/ عند الضغط على انشاء الحساب/---------------
    const create_New_account = document.getElementById("create_New_account")
    if(create_New_account){
      create_New_account.onclick =()=>{
        this.addUserEvent()
      }
    }
    //---------------------------------------------------------//



    // -------------/عند الضغط على تسجيل الدخول/---------------
    const login = document.getElementById("login_but")
    if(login){
      login.onclick=()=>{
        this.loginEvent()
      }
    }
    //---------------------------------------------------------//




  }



  // -------- / احداث المصادقة /------------
  async addUserEvent() {
    const name = document.getElementById("New_account_name").value;
    const email = document.getElementById("New_account_email").value;
    const password = document.getElementById("New_account_password").value;
    const password_confirmation = document.getElementById("New_account_password").value;

    if (!name || !email || !password || !password_confirmation) {
      console.log("نقص في معلومات المستخدم");
      return;
    }
    if (password !== password_confirmation) {
      console.log("خطا في كلمة المرور");
      return;
    }
   const data = await Api.register(name, email, password, password_confirmation);
   console.log(data)
   if (data.message == 'User registered successfully'){
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
   const data = await Api.login(email,password);
 
   if(data.message== "Login successful"){
     window.location.href = "index.html";
   }
  }
  async logoutEvent() {
    await Api.logout();
  }
  // -----------------------------------------//






  // -------- / احداث الموردين /------------
  async addNewSupplierEvent() {
    const name = "";
    const contact_details = "";
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
    console.log(SelectedSupplier);
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
    console.log(balanceStatusSupplier_op);
  }
  async deleteSupplierEvent(id) {
    await Api.deleteSupplier(id);
  }
  //---------------------------------------//






  // ---------/احداث العناصر/-----------
  async addNewItemEvent() {
    const name = "itme-1";
    const company = "co_item-1";
    const profit_margin = 0.1;
    const selling_price = 3;
    const barcode = "7364996254";
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
   async updateItemEvent(){
    const id=3
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
      const data = await Api.updateOneItem(id,name,company,wholesale_price,profit_margin,selling_price,barcode,expiry_date,quantity)
      console.log(data)

   }
   async getAllItemsEvent(){
    await Api.getAllItems()
    console.log(AllItems_arry)
   }


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
      SelectedSupplier_op = data;
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
      balanceStatusSupplier_op = data.data;
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
    warehouse_owner_name,
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
      AllItems_arry = data.data
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
      console.log(data);
      return data;
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
      return data;
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
      return data;
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
}

// ***********************(استدعاء كائنات من الاصناف )**************************//

const Api = new API();
const Events_M_C = new Events();
