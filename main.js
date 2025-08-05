class Events {
  constructor() {
    this.set_event();
  }
  set_event() {
    document.getElementById("storage").onclick = () => {
      document.getElementById("storage_page").style.display = "block";
      document.getElementById("Control_panel_page").style.display = "none";
    };

    document.getElementById("Control_panel").onclick = () => {
      document.getElementById("storage_page").style.display = "none";
      document.getElementById("Control_panel_page").style.display = "block";
    };

    // document.getElementById('conrol-2').onclick =()=>{
    //     document.getElementById('storage_page').style.display="block"
    //     document.getElementById('buy_fatora_box').style.display="none"
    //     Storage_M_C.cancel_buy_fatora()
    // }

    document.getElementById("add_new_buy_fatora_button").onclick = () => {
      document.getElementById("buy_fatora_box").style.display = "block";
      document.getElementById("storage_page").style.display = "none";
      Storage_M_C.start_buy_fatora();
    };

    document.getElementById("add_item_in_buy_fatora_button").onclick = () => {};

    document.getElementById("add_buy_fatora_button").onclick = () => {};
    document.getElementById("cancel_buy_fatora_button").onclick = () => {
      document.getElementById("storage_page").style.display = "block";
    };
    document.getElementById("morid_name").onclick = () => {
      document.getElementById("morid").style.display = "flex";
    };

    document.getElementById("morid_name").oninput = () => {};
  }
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
        return data;
      }
      console.log(data);
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
      return data;
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
      return data;
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
      return data;
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
      console.log( data);
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
      console.log( data);
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

//   const Events_M_C = new Events();
const Api = new API();

//  Api.register("y3","y4@gmail.com","12345678","12345678")
//  Api.login("y4@gmail.com","12345678")
// Api.addNewSupplier("yahia2", "67677867778");
// Api.deleteSupplier(6)
// Api.getAllSupplier();
// Api.getOneSupplier(2)
