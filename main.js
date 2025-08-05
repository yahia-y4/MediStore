


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

      document.getElementById("add_item_in_buy_fatora_button").onclick =
        () => {};

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
        password_confirmation
      })
    });

    const data = await res.json();  

    if (!res.ok) {
      console.log(data.errors)
      return  data.errors 
    }

    console.log("تم اضافة المستخدم");
    console.log(data)
    return  data ;

  } catch (e) {
    console.log(e);
    return  e.message ;
  }
}

  }

  // ***********************(استدعاء كائنات من الاصناف )**************************//

//   const Events_M_C = new Events();
      const Api = new API();

   Api.register("y2","y2@gmail.com","12345678","12345678")
