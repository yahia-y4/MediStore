
    // عناصر عامة
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');
    const editBtn  = document.getElementById('editBtn');
    const cancelEdit = document.getElementById('cancelEdit');
    const toast = document.getElementById('toast');

    // الحقول (عرض)
    const v = {
      username: document.getElementById('v_username'),
      email:    document.getElementById('v_email'),
      fullname: document.getElementById('v_fullname'),
      phone:    document.getElementById('v_phone'),
      role:     document.getElementById('v_role'),
      address:  document.getElementById('v_address')
    };
    // الحقول (نموذج)
    const f = {
      form:     document.getElementById('editMode'),
      username: document.getElementById('username'),
      email:    document.getElementById('email'),
      fullname: document.getElementById('fullname'),
      phone:    document.getElementById('phone'),
      role:     document.getElementById('role'),
      address:  document.getElementById('address')
    };

    // تبديل العرض/التعديل
    editBtn.addEventListener('click', () => {
      viewMode.style.display = 'none';
      editMode.style.display = 'block';
      f.username.focus();
    });

    cancelEdit.addEventListener('click', () => {
      editMode.style.display = 'none';
      viewMode.style.display = 'block';
    });

    // حفظ التعديلات
    f.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!f.form.checkValidity()){
        // إبراز الحقول غير الصالحة
        [...f.form.elements].forEach(el => {
          if(el.willValidate && !el.checkValidity()) el.style.borderColor='rgba(239,68,68,.7)';
          else if(el.style) el.style.borderColor='';
        });
        return;
      }

      // تحديث قيم العرض
      v.username.textContent = f.username.value.trim();
      v.email.textContent    = f.email.value.trim();
      v.fullname.textContent = f.fullname.value.trim();
      v.phone.textContent    = f.phone.value.trim();
      v.role.textContent     = f.role.value.trim();
      v.address.textContent  = f.address.value.trim();

      // إظهار رسالة نجاح
      toast.classList.add('show');
      setTimeout(()=>toast.classList.remove('show'), 2200);

      // العودة لوضع العرض
      editMode.style.display = 'none';
      viewMode.style.display = 'block';
    });

    // ------- تغيير الصورة -------
    const overlay = document.getElementById('photoOverlay');
    const openPhotoModal = document.getElementById('openPhotoModal');
    const closeModal = document.getElementById('closeModal');
    const savePhoto = document.getElementById('savePhoto');
    const removePhoto = document.getElementById('removePhoto');
    const fileInput = document.getElementById('fileInput');
    const modalPreview = document.getElementById('modalPreview');
    const avatarImg = document.getElementById('avatarImg');

    // اعداد المعاينة الأولية
    modalPreview.src = avatarImg.src;

    function showOverlay(show=true){
      overlay.classList.toggle('show', show);
      overlay.setAttribute('aria-hidden', String(!show));
      if(show) fileInput.value = '';
    }

    openPhotoModal.addEventListener('click', ()=> showOverlay(true));
    closeModal.addEventListener('click', ()=> showOverlay(false));

    // رفع صورة جديدة ومعاينتها فوريًا
    fileInput.addEventListener('change', (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = () => { modalPreview.src = reader.result; };
      reader.readAsDataURL(file);
    });

    // إزالة الصورة (يتم تعيين معاينة فارغة أنيقة)
    removePhoto.addEventListener('click', ()=>{
      modalPreview.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
          <rect width="100%" height="100%" fill="#0b1722"/>
          <g fill="#8fa6b9" font-family="sans-serif" font-size="18" text-anchor="middle">
            <text x="50%" y="52%">لا توجد صورة</text>
          </g>
        </svg>
      `);
    });

    // حفظ الصورة
    savePhoto.addEventListener('click', ()=>{
      avatarImg.src = modalPreview.src;
      showOverlay(false);
      toast.textContent = 'تم تحديث الصورة بنجاح ✅';
      toast.classList.add('show');
      setTimeout(()=>{
        toast.classList.remove('show');
        toast.textContent = 'تم حفظ التغييرات بنجاح ✅';
      }, 2200);
    });

    // إغلاق النافذة بالضغط خارجها أو بالـ ESC
    overlay.addEventListener('click', (e)=>{ if(e.target === overlay) showOverlay(false); });
    window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') showOverlay(false); });

    // تحسين لمسات الهاتف: منع تكبير مزدوج على الأزرار المكررة
    document.addEventListener('touchend', ()=>{}, {passive:true});
