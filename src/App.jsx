import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Camera, 
  Wifi, 
  Sun, 
  Users, 
  FileText, 
  Wrench, 
  Plus, 
  Edit3, 
  Download, 
  Search, 
  CheckCircle, 
  CheckCircle2,
  X, 
  Eye, 
  Clock, 
  Phone, 
  DollarSign, 
  Layers, 
  Send,
  Award,
  MessageCircle,
  Database,
  ArrowUpRight,
  Share2,
  PhoneCall,
  Save,
  Check,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSystem, setFilterSystem] = useState('all');
  const [currencyMode, setCurrencyMode] = useState('USD'); // USD أو YER
  const [exchangeRate, setExchangeRate] = useState(535); // سعر صرف تقريبي للدولار
  const [toast, setToast] = useState(null);

  // إشعار تفاعلي سريع
  const showNotification = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // 1. العملاء الأوليون مع دعم التخزين المحلي
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('opentik_clients');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'CL-101', 
        name: 'شركة النجم الذهبي للتجارة', 
        contactPerson: 'أ. محمد العريقي',
        phone: '777112233', 
        address: 'شارع الزبيري - صنعاء',
        system: 'كاميرات مراقبة وشبكات', 
        warrantyExpiry: '2027-09-15',
        warrantyStatus: 'ساري',
        balance: 1450,
        installedDevices: [
          '8x كاميرات شبكية Dahua 5MP IP AI',
          '1x جهاز تسجيل NVR 16-Channel 4K',
          '1x سويتش 16Port PoE Gigabit'
        ]
      },
      { 
        id: 'CL-102', 
        name: 'مستشفى الأمل التخصصي', 
        contactPerson: 'د. خالد عبدالجليل',
        phone: '771223344', 
        address: 'شارع تعز - صنعاء',
        system: 'طاقة بديلة وانفرتر', 
        warrantyExpiry: '2028-09-12',
        warrantyStatus: 'ساري',
        balance: 0,
        installedDevices: [
          '1x انفرتر هجين Deye 12KW Three-Phase',
          '2x بنك بطاريات ليثيوم 48V 100Ah'
        ]
      },
      { 
        id: 'CL-103', 
        name: 'مجمع العواضي التجاري', 
        contactPerson: 'م. مروان الصبري',
        phone: '773445566', 
        address: 'حي الدائري الغربي',
        system: 'أنظمة إنذار وتحكم بالدخول', 
        warrantyExpiry: '2026-11-20',
        warrantyStatus: 'ساري',
        balance: 3200,
        installedDevices: [
          '4x أجهزة بصمة وجه وبطاقة ZKTeco',
          '4x أقفال مغناطيسية للأبواب الزجاجية'
        ]
      }
    ];
  });

  // 2. الفواتير
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('opentik_invoices');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'INV-1001', 
        client: 'شركة النجم الذهبي للتجارة', 
        phone: '777112233',
        date: '2026-09-10', 
        system: 'كاميرات مراقبة وشبكات',
        taxRate: 0,
        discount: 100,
        items: [
          { name: 'كاميرا شبكية IP بدقة 5MP ذكية مع كشف حركة', qty: 8, price: 65 },
          { name: 'جهاز تسجيل NVR 16CH مع قرص 4TB Purple', qty: 1, price: 320 },
          { name: 'سويتش شبكة 16Port PoE ومستلزمات الربط', qty: 1, price: 180 },
          { name: 'تمديد وتركيب وبرمجة وتدريب الكادر', qty: 1, price: 250 }
        ],
        paid: 1000,
        notes: 'الضمان لمدة عام كامل يشمل القطع والاستبدال الفوري ضد عيوب المصنع.'
      },
      { 
        id: 'INV-1002', 
        client: 'مستشفى الأمل التخصصي', 
        phone: '771223344',
        date: '2026-09-12', 
        system: 'طاقة بديلة وانفرتر',
        taxRate: 0,
        discount: 0,
        items: [
          { name: 'انفرتر هجين Deye قدرة 12KW ثلاثي الطور', qty: 1, price: 2100 },
          { name: 'بطارية ليثيوم 5KW مع نظام إدارة BMS', qty: 2, price: 1400 },
          { name: 'كابلات نحاسية وقواطع حماية وتوزيع أحمال', qty: 1, price: 700 }
        ],
        paid: 5600,
        notes: 'تم فحص وتشغيل المنظومة تحت الحمل الأقصى بنجاح تام.'
      }
    ];
  });

  // 3. سندات القبض
  const [vouchers, setVouchers] = useState(() => {
    const saved = localStorage.getItem('opentik_vouchers');
    return saved ? JSON.parse(saved) : [
      { id: 'RV-201', invoiceId: 'INV-1001', client: 'شركة النجم الذهبي للتجارة', amount: 1000, date: '2026-09-10', method: 'تحويل بنكي', notes: 'دفعة أولى مقدمة مع التوريد' },
      { id: 'RV-202', invoiceId: 'INV-1002', client: 'مستشفى الأمل التخصصي', amount: 5600, date: '2026-09-12', method: 'شيك مصرفي', notes: 'تسوية حساب منظومة الطاقة بالكامل' }
    ];
  });

  // 4. تذاكر الصيانة
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('opentik_tickets');
    return saved ? JSON.parse(saved) : [
      { id: 'TK-501', client: 'شركة النجم الذهبي للتجارة', issue: 'فقدان إشارة الكاميرا رقم 3 في البوابة الخلفية', priority: 'عالية', engineer: 'م. سامي الحمادي', visitDate: '2026-09-16', status: 'قيد التنفيذ' },
      { id: 'TK-502', client: 'مجمع العواضي التجاري', issue: 'برمجة وإسناد الصلاحيات لجهاز البصمة الرئيسي', priority: 'متوسطة', engineer: 'م. أحمد الخولاني', visitDate: '2026-09-17', status: 'جديدة' },
    ];
  });

  // باقات OpenTik
  const packages = [
    {
      id: 'PKG-01',
      title: 'منظومة المراقبة الذكية الفائقة (IP 4K AI)',
      category: 'كاميرات المراقبة',
      price: 1350,
      warranty: 'عامان ضمان استبدال',
      items: [
        { name: 'كاميرا شبكية IP بدقة 4K مع خاصية التعرف الذكي', qty: 8, price: 85 },
        { name: 'جهاز تسجيل NVR 16CH مع قرص 6TB WD Purple', qty: 1, price: 420 },
        { name: 'سويتش شبكة 16Port PoE Gigabit عالي التحمل', qty: 1, price: 150 },
        { name: 'كابينة وتمديدات وخدمة التركيب والبرمجة', qty: 1, price: 100 }
      ]
    },
    {
      id: 'PKG-02',
      title: 'محطة الطاقة البديلة الهجينة (Hybrid Solar 10KW)',
      category: 'الطاقة البديلة',
      price: 4900,
      warranty: '5 سنوات على البطاريات',
      items: [
        { name: 'انفرتر ذكي Deye Hybrid بقدرة 10KW متطور', qty: 1, price: 1900 },
        { name: 'بنك بطاريات ليثيوم 10KWh LiFePO4 دورات 6000', qty: 2, price: 1300 },
        { name: 'لوحة قواطع DC/AC ومستلزمات الحماية والربط', qty: 1, price: 400 }
      ]
    },
    {
      id: 'PKG-03',
      title: 'منظومة الشبكات المؤسسية وتغطية WiFi 6',
      category: 'الشبكات والـ IT',
      price: 1150,
      warranty: 'عام كامل',
      items: [
        { name: 'راوتر مايكروتك MikroTik Cloud Router متقدم', qty: 1, price: 280 },
        { name: 'نقاط وصول سقفية Ruijie Reyee WiFi 6 للأعمال', qty: 4, price: 140 },
        { name: 'سويتش PoE إدارة كاملة وسيرفر راك مجهز', qty: 1, price: 310 }
      ]
    }
  ];

  // مزامنة التخزين المحلي فوراً عند أي تغيير
  useEffect(() => {
    localStorage.setItem('opentik_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('opentik_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('opentik_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('opentik_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // الحالات المنبثقة (Modals)
  const [viewClientDetails, setViewClientDetails] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [creatingInvoice, setCreatingInvoice] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const [creatingVoucher, setCreatingVoucher] = useState(null);
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [newClientModal, setNewClientModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);

  // النماذج
  const [newClientForm, setNewClientForm] = useState({
    name: '', contactPerson: '', phone: '', address: '', system: 'كاميرات مراقبة وشبكات', warrantyExpiry: '2027-09-15', devices: ''
  });

  const [invoiceForm, setInvoiceForm] = useState({
    id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15',
    items: [{ name: '', qty: 1, price: 0 }],
    taxRate: 0, discount: 0, paid: 0, notes: ''
  });

  const [voucherForm, setVoucherForm] = useState({
    amount: '', method: 'نقداً', notes: ''
  });

  const [ticketForm, setTicketForm] = useState({
    client: '', issue: '', priority: 'عالية', engineer: 'م. سامي الحمادي', visitDate: '2026-09-16'
  });

  // الحسابات المالية
  const calculateSubtotal = (items) => {
    return items.reduce((acc, item) => acc + ((Number(item.qty) || 0) * (Number(item.price) || 0)), 0);
  };

  const calculateFinalTotal = (invoice) => {
    const sub = calculateSubtotal(invoice.items);
    const afterDiscount = sub - (Number(invoice.discount) || 0);
    const tax = afterDiscount * ((Number(invoice.taxRate) || 0) / 100);
    return afterDiscount + tax;
  };

  const totalSalesUSD = invoices.reduce((acc, inv) => acc + calculateFinalTotal(inv), 0);
  const totalCollectedUSD = vouchers.reduce((acc, v) => acc + (Number(v.amount) || 0), 0);
  const totalOutstandingUSD = totalSalesUSD - totalCollectedUSD;
  const collectionRate = totalSalesUSD > 0 ? Math.round((totalCollectedUSD / totalSalesUSD) * 100) : 0;

  // تحويل العملات للعرض
  const formatMoney = (amountUSD) => {
    if (currencyMode === 'YER') {
      const inYer = Math.round(amountUSD * exchangeRate);
      return inYer.toLocaleString() + ' ريال';
    }
    return '$' + amountUSD.toLocaleString();
  };

  // تصدير PDF مباشر
  const handleExportPDF = (elementId, fileName) => {
    const element = document.getElementById(elementId);
    if (!element || !window.html2pdf) {
      alert('محرك الـ PDF جاري تجهيزه، يرجى إعادة الضغط خلال لحظات...');
      return;
    }
    const opt = {
      margin: 10,
      filename: fileName + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    window.html2pdf().set(opt).from(element).save();
    showNotification('تم بدء تنزيل ملف الـ PDF بنجاح 📄');
  };

  // إرسال عبر واتساب المباشر
  const sendWhatsAppMessage = (phone, text) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.startsWith('967') ? cleanPhone : ('967' + cleanPhone);
    const url = 'https://wa.me/' + fullPhone + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  };

  // إرسال ملخص الفاتورة للعميل على الواتساب
  const handleWhatsAppInvoice = (inv) => {
    const total = calculateFinalTotal(inv);
    const rem = total - (inv.paid || 0);
    const text = 
      'مرحباً بالعميل العزيز: ' + inv.client + '\n' +
      'تحية طيبة من شركة OpenTik للأنظمة الذكية 🛡️\n\n' +
      'تفاصيل الفاتورة رقم: ' + inv.id + '\n' +
      'النظام المنفذ: ' + inv.system + '\n' +
      'إجمالي الفاتورة: $' + total + '\n' +
      'المسدد منها: $' + (inv.paid || 0) + '\n' +
      'المتبقي المستحق: $' + rem + '\n\n' +
      'شكراً لثقتكم بخدماتنا وأنظمتنا.';
    sendWhatsAppMessage(inv.phone, text);
  };

  // إرسال تفاصيل تذكرة الصيانة للمهندس أو العميل
  const handleWhatsAppTicket = (ticket) => {
    const text = 
      '📌 بلاغ صيانة معتمد - شركة OpenTik\n' +
      'رقم البلاغ: ' + ticket.id + '\n' +
      'المنشأة: ' + ticket.client + '\n' +
      'المشكلة: ' + ticket.issue + '\n' +
      'الأهمية: ' + ticket.priority + '\n' +
      'المهندس المكلف: ' + ticket.engineer + '\n' +
      'موعد الزيارة: ' + ticket.visitDate;
    sendWhatsAppMessage('777112233', text);
  };

  // حفظ العميل الجديد
  const handleSaveNewClient = (e) => {
    e.preventDefault();
    if (!newClientForm.name || !newClientForm.phone) return;
    const clientRecord = {
      id: "CL-" + (100 + clients.length + 1),
      name: newClientForm.name,
      contactPerson: newClientForm.contactPerson || 'المسؤول',
      phone: newClientForm.phone,
      address: newClientForm.address || 'صنعاء',
      system: newClientForm.system,
      warrantyExpiry: newClientForm.warrantyExpiry,
      warrantyStatus: 'ساري',
      balance: 0,
      installedDevices: newClientForm.devices ? newClientForm.devices.split('\n') : ['منظومة ذكية متكاملة']
    };
    setClients([clientRecord, ...clients]);
    setNewClientModal(false);
    setNewClientForm({ name: '', contactPerson: '', phone: '', address: '', system: 'كاميرات مراقبة وشبكات', warrantyExpiry: '2027-09-15', devices: '' });
    showNotification('تم إضافة المنشأة وحفظ ملف العميل بنجاح ✔️');
  };

  // حفظ أو تعديل الفاتورة
  const handleSaveInvoice = (e) => {
    e.preventDefault();
    if (editingInvoice) {
      setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? editingInvoice : inv));
      setEditingInvoice(null);
      showNotification('تم تحديث بيانات الفاتورة بنجاح ✔️');
    } else {
      const finalInv = { ...invoiceForm, id: invoiceForm.id || ("INV-" + (1000 + invoices.length + 1)) };
      setInvoices([finalInv, ...invoices]);
      setCreatingInvoice(false);
      showNotification('تم إنشاء الفاتورة وإدراجها في الحسابات ✔️');
    }
  };

  // حفظ سند قبض مالي
  const handleSaveVoucher = (e) => {
    e.preventDefault();
    if (!voucherForm.amount || Number(voucherForm.amount) <= 0) return;
    const amt = Number(voucherForm.amount);
    const newVoucher = {
      id: "RV-" + (200 + vouchers.length + 1),
      invoiceId: creatingVoucher.id,
      client: creatingVoucher.client,
      amount: amt,
      date: '2026-09-15',
      method: voucherForm.method,
      notes: voucherForm.notes || 'سداد دفعة من الفاتورة'
    };
    setVouchers([newVoucher, ...vouchers]);

    // تحديث المدفوع في الفاتورة
    setInvoices(invoices.map(inv => inv.id === creatingVoucher.id ? { ...inv, paid: (inv.paid || 0) + amt } : inv));

    // تحديث رصيد العميل
    setClients(clients.map(c => c.name === creatingVoucher.client ? { ...c, balance: Math.max(0, (c.balance || 0) - amt) } : c));

    setCreatingVoucher(null);
    setVoucherForm({ amount: '', method: 'نقداً', notes: '' });
    showNotification('تم تسجيل سند القبض وتحديث الأرصدة تلقائياً 💵');
  };

  // حفظ تذكرة صيانة
  const handleSaveTicket = (e) => {
    e.preventDefault();
    if (!ticketForm.client || !ticketForm.issue) return;
    const newTick = {
      id: "TK-" + (500 + tickets.length + 1),
      client: ticketForm.client,
      issue: ticketForm.issue,
      priority: ticketForm.priority,
      engineer: ticketForm.engineer,
      visitDate: ticketForm.visitDate,
      status: 'جديدة'
    };
    setTickets([newTick, ...tickets]);
    setCreatingTicket(false);
    setTicketForm({ client: '', issue: '', priority: 'عالية', engineer: 'م. سامي الحمادي', visitDate: '2026-09-16' });
    showNotification('تم فتح تذكرة الصيانة وإسنادها للمهندس 🛠️');
  };

  // تحديث حالة التذكرة بضغطة زر
  const updateTicketStatus = (ticketId, nextStatus) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: nextStatus } : t));
    showNotification('تم تحديث حالة التذكرة إلى: ' + nextStatus);
  };

  // نسخ احتياطي لقاعدة البيانات
  const handleExportBackup = () => {
    const backupData = { clients, invoices, vouchers, tickets, backupDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'OpenTik_Backup_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    showNotification('تم تصدير نسخة احتياطية من البيانات 💾');
  };

  // استعادة قاعدة البيانات من ملف
  const handleImportBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.clients) setClients(data.clients);
        if (data.invoices) setInvoices(data.invoices);
        if (data.vouchers) setVouchers(data.vouchers);
        if (data.tickets) setTickets(data.tickets);
        setShowBackupModal(false);
        showNotification('تمت استعادة قاعدة البيانات بنجاح تام 🔄');
      } catch (err) {
        alert('الملف غير صالح للاستعادة.');
      }
    };
    reader.readAsText(file);
  };

  const filteredClients = clients.filter(c => {
    const matchSearch = c.name.includes(searchTerm) || c.phone.includes(searchTerm) || c.contactPerson.includes(searchTerm);
    const matchFilter = filterSystem === 'all' || c.system.includes(filterSystem);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* التنبيه المنبثق التفاعلي (Toast Alert) */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 animate-bounce text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* الشريط العلوي لشركة OpenTik */}
      <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20">
              OP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white tracking-wide">OpenTik للأنظمة الذكية</h1>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono font-bold">Pro v2.0</span>
              </div>
              <p className="text-[11px] text-slate-400">إدارة العمليات الميدانية والحسابات السحابية</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* زر تبديل العملة الفوري ($ / YER) */}
            <button 
              onClick={() => setCurrencyMode(currencyMode === 'USD' ? 'YER' : 'USD')}
              className="px-2.5 py-1 text-xs bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg text-slate-200 font-bold transition flex items-center gap-1"
              title="تبديل العملة بين الدولار والريال"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currencyMode === 'USD' ? 'دولار ($)' : 'ريال يمني'}</span>
            </button>

            {/* زر النسخ الاحتياطي السريع */}
            <button 
              onClick={() => setShowBackupModal(true)}
              className="p-2 bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg transition"
              title="النسخ الاحتياطي وقاعدة البيانات"
            >
              <Database className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* شريط الأقسام التفاعلي مع عدادات حية */}
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700')}
          >
            <Shield className="w-4 h-4" /> لوحة التحكم
          </button>
          <button 
            onClick={() => setActiveTab('clients')}
            className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'clients' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700')}
          >
            <Users className="w-4 h-4" /> العملاء ({clients.length})
          </button>
          <button 
            onClick={() => setActiveTab('invoices')}
            className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'invoices' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700')}
          >
            <FileText className="w-4 h-4" /> الفواتير ({invoices.length})
          </button>
          <button 
            onClick={() => setActiveTab('vouchers')}
            className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'vouchers' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700')}
          >
            <DollarSign className="w-4 h-4" /> سندات القبض ({vouchers.length})
          </button>
          <button 
            onClick={() => setActiveTab('tickets')}
            className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'tickets' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700')}
          >
            <Wrench className="w-4 h-4" /> الدعم الفني ({tickets.filter(t => t.status !== 'تم الحل والإغلاق').length})
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'packages' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700')}
          >
            <Layers className="w-4 h-4" /> كتالوج الباقات
          </button>
        </nav>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-4 flex-1 max-w-6xl w-full mx-auto space-y-5">
        
        {/* ================= 1. لوحة التحكم التفاعلية ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            {/* المؤشرات المالية الذكية مع شريط التحصيل الحي */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
                <span className="text-xs text-slate-400 font-medium">إجمالي المبيعات والعقود</span>
                <h3 className="text-xl font-black text-white mt-1 font-mono">{formatMoney(totalSalesUSD)}</h3>
                <span className="text-[11px] text-blue-400 font-semibold mt-1 block">مشاريع منفذة</span>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
                <span className="text-xs text-slate-400 font-medium">المبالغ المحصلة</span>
                <h3 className="text-xl font-black text-emerald-400 mt-1 font-mono">{formatMoney(totalCollectedUSD)}</h3>
                <span className="text-[11px] text-emerald-400/90 font-semibold mt-1 block">{"النسبة: " + collectionRate + "%"}</span>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
                <span className="text-xs text-slate-400 font-medium">الديون المتبقية</span>
                <h3 className="text-xl font-black text-rose-400 mt-1 font-mono">{formatMoney(totalOutstandingUSD)}</h3>
                <span className="text-[11px] text-rose-400/90 font-semibold mt-1 block">واجبة التحصيل</span>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
                <span className="text-xs text-slate-400 font-medium">العملاء النشطون</span>
                <h3 className="text-xl font-black text-cyan-400 mt-1 font-mono">{clients.length}</h3>
                <span className="text-[11px] text-cyan-400/90 font-semibold mt-1 block">تحت الضمان</span>
              </div>
            </div>

            {/* شريط تقدم تحصيل السيولة النقدية */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-300">معدل تحصيل السيولة الإجمالي:</span>
                <span className="font-mono text-emerald-400 font-bold">{collectionRate}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-700" 
                  style={{ width: collectionRate + '%' }}
                ></div>
              </div>
            </div>

            {/* أنظمة ومجالات OpenTik */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" /> توزيع أنظمة ومجالات OpenTik
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg mb-2"><Camera className="w-5 h-5" /></div>
                  <span className="text-xs font-bold text-white">كاميرات المراقبة</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">IP & AI Security</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                  <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg mb-2"><Wifi className="w-5 h-5" /></div>
                  <span className="text-xs font-bold text-white">الشبكات والـ IT</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">PoE & WiFi 6</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg mb-2"><Sun className="w-5 h-5" /></div>
                  <span className="text-xs font-bold text-white">الطاقة البديلة</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Deye & Lithium</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg mb-2"><Shield className="w-5 h-5" /></div>
                  <span className="text-xs font-bold text-white">أنظمة الأمان</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">بصمة وإنذار سرقة</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center text-center col-span-2 sm:col-span-1">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg mb-2"><Award className="w-5 h-5" /></div>
                  <span className="text-xs font-bold text-white">عقود الصيانة SLA</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">دعم دوري وميداني</span>
                </div>
              </div>
            </div>

            {/* تذاكر الصيانة العاجلة والفواتير */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" /> تذاكر الدعم الفني العاجلة
                  </h3>
                  <button onClick={() => setActiveTab('tickets')} className="text-[11px] text-blue-400 hover:underline">عرض الكل</button>
                </div>
                <div className="space-y-2">
                  {tickets.slice(0, 3).map(t => (
                    <div key={t.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">{t.client}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-rose-500/20 text-rose-400 rounded font-semibold">{t.priority}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5">{t.issue}</p>
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-400" /> آخر فواتير التوريد والتركيب
                  </h3>
                  <button onClick={() => setActiveTab('invoices')} className="text-[11px] text-blue-400 hover:underline">عرض الفواتير</button>
                </div>
                <div className="space-y-2">
                  {invoices.slice(0, 3).map(inv => {
                    const finTotal = calculateFinalTotal(inv);
                    const rem = finTotal - (inv.paid || 0);
                    return (
                      <div key={inv.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                        <div>
                          <span className="font-mono text-xs text-blue-400 font-bold ml-1">{inv.id}</span>
                          <span className="text-xs font-bold text-white">{inv.client}</span>
                          <p className="text-[10px] text-slate-400">{inv.system}</p>
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-emerald-400 block font-mono">{formatMoney(finTotal)}</span>
                          <span className={"text-[10px] font-semibold " + (rem > 0 ? 'text-rose-400' : 'text-emerald-400')}>
                            {rem > 0 ? ("متبقي: " + formatMoney(rem)) : 'خالص'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. إدارة العملاء المتقدمة (CRM) ================= */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="ابحث باسم المنشأة، المسؤول، أو الهاتف..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select 
                  value={filterSystem} 
                  onChange={(e) => setFilterSystem(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="all">جميع الأنظمة</option>
                  <option value="كاميرات">كاميرات مراقبة</option>
                  <option value="طاقة">طاقة بديلة</option>
                  <option value="أمان">أنظمة أمان</option>
                  <option value="شبكات">شبكات</option>
                </select>
              </div>

              <button 
                onClick={() => setNewClientModal(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> إضافة عميل جديد
              </button>
            </div>

            <div className="grid gap-3">
              {filteredClients.map(c => (
                <div key={c.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{c.id}</span>
                        <h4 className="text-sm font-bold text-white">{c.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          الضمان {c.warrantyStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        المسؤول: <span className="text-slate-200">{c.contactPerson}</span> | هاتف: <span className="text-slate-200 font-mono">{c.phone}</span> | العنوان: {c.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a 
                        href={"tel:" + c.phone} 
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg transition"
                        title="اتصال مباشر"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => sendWhatsAppMessage(c.phone, 'مرحباً ' + c.name + '، تواصل معكم من فريق دعم OpenTik للأنظمة الذكية.')}
                        className="p-2 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded-lg transition"
                        title="محادثة واتساب"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setViewClientDetails(c)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" /> الملف الشامل
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap justify-between items-center text-xs gap-2">
                    <div>
                      <span className="text-slate-400">النظام: </span>
                      <span className="text-slate-200 font-semibold">{c.system}</span>
                      <span className="text-slate-500 mr-3">| انتهاء الضمان: {c.warrantyExpiry}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">الرصيد المتبقي: </span>
                      <span className={"font-bold font-mono " + (c.balance > 0 ? 'text-rose-400' : 'text-emerald-400')}>
                        {formatMoney(c.balance)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. الحسابات والفواتير (INVOICES) ================= */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">فواتير التوريد والتركيب الرسمية</h3>
                <p className="text-xs text-slate-400">إصدار وتعديل الفواتير مع إرسالها للعميل بواتساب وتحميلها PDF معتمد</p>
              </div>
              <button 
                onClick={() => {
                  setInvoiceForm({
                    id: "INV-" + (1000 + invoices.length + 1),
                    client: clients[0] ? clients[0].name : '',
                    phone: clients[0] ? clients[0].phone : '',
                    system: 'كاميرات مراقبة وشبكات',
                    date: '2026-09-15',
                    items: [{ name: '', qty: 1, price: 0 }],
                    taxRate: 0,
                    discount: 0,
                    paid: 0,
                    notes: 'ضمان عام كامل مع الدعم الفني الدوري.'
                  });
                  setCreatingInvoice(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> إنشاء فاتورة جديدة
              </button>
            </div>

            <div className="grid gap-3">
              {invoices.map(inv => {
                const finalTotal = calculateFinalTotal(inv);
                const remaining = finalTotal - (inv.paid || 0);
                return (
                  <div key={inv.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{inv.id}</span>
                          <h4 className="font-bold text-white">{inv.client}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          الهاتف: {inv.phone} | التاريخ: {inv.date} | المنظومة: {inv.system}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <button 
                          onClick={() => handleWhatsAppInvoice(inv)}
                          className="px-2.5 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded-lg text-xs flex items-center gap-1 font-bold"
                          title="إرسال الفاتورة عبر واتساب"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> واتساب
                        </button>
                        <button 
                          onClick={() => setEditingInvoice(JSON.parse(JSON.stringify(inv)))}
                          className="px-2.5 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-xs flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> تعديل
                        </button>
                        <button 
                          onClick={() => {
                            setCreatingVoucher(inv);
                            setVoucherForm({ amount: remaining > 0 ? remaining : '', method: 'نقداً', notes: 'سداد من فاتورة رقم ' + inv.id });
                          }}
                          className="px-2.5 py-1.5 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg text-xs flex items-center gap-1"
                        >
                          <DollarSign className="w-3.5 h-3.5" /> سند قبض
                        </button>
                        <button 
                          onClick={() => setPreviewInvoice(inv)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> معاينة
                        </button>
                        <button 
                          onClick={() => handleExportPDF("printable-invoice-" + inv.id, inv.id + "_" + inv.client)}
                          className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" /> تحميل PDF
                        </button>
                      </div>
                    </div>

                    {/* المبالغ والتفاصيل المالية */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-lg text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">الإجمالي النهائي</span>
                        <span className="font-bold text-white font-mono">{formatMoney(finalTotal)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">المسدد</span>
                        <span className="font-bold text-emerald-400 font-mono">{formatMoney(inv.paid || 0)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">الرصيد المتبقي</span>
                        <span className={"font-bold font-mono " + (remaining > 0 ? 'text-rose-400' : 'text-emerald-400')}>
                          {formatMoney(remaining)}
                        </span>
                      </div>
                    </div>

                    {/* القالب الرسمي المخفي للفاتورة PDF بالباركود والأختام والحسابات البنكية */}
                    <div className="hidden">
                      <div id={"printable-invoice-" + inv.id} className="p-8 bg-white text-slate-900 text-right font-sans" dir="rtl">
                        <div className="flex justify-between items-center border-b-2 border-blue-600 pb-4 mb-5">
                          <div>
                            <h1 className="text-2xl font-black text-blue-700">شركة OpenTik للأنظمة الذكية</h1>
                            <p className="text-xs text-slate-600 mt-1">كاميرات مراقبة - شبكات - أنظمة أمان - طاقة بديلة - عقود صيانة SLA</p>
                            <p className="text-[11px] text-slate-500 font-mono mt-0.5">السجل التجاري: 10452 | الرقم الضريبي: 30048921</p>
                          </div>
                          <div className="text-left">
                            <span className="text-xl font-bold text-slate-800 block">فاتورة ضريبية رسمية</span>
                            <span className="text-xs text-slate-500 font-mono">رقم الفاتورة: {inv.id}</span>
                            <p className="text-xs text-slate-500 font-mono">التاريخ: {inv.date}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg mb-5 border border-slate-200 text-xs">
                          <div>
                            <span className="font-bold text-slate-800 block mb-1">بيانات العميل والمنشأة:</span>
                            <p className="font-semibold text-slate-700">الاسم: {inv.client}</p>
                            <p className="text-slate-600">الهاتف: {inv.phone}</p>
                            <p className="text-slate-600">المنظومة المركبة: {inv.system}</p>
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-slate-800 block mb-1">الحسابات البنكية المعتمدة:</span>
                            <p className="text-slate-600 font-mono">بنك الكريمي: 3001245678</p>
                            <p className="text-slate-600 font-mono">بنك التضامن: 1024558</p>
                            <p className="text-slate-600 font-mono">بنك القطيبي: 7789012</p>
                          </div>
                        </div>

                        <table className="w-full text-right border-collapse mb-5 text-xs">
                          <thead>
                            <tr className="bg-blue-600 text-white">
                              <th className="p-2 border">#</th>
                              <th className="p-2 border">البيان / الأجهزة والخدمات</th>
                              <th className="p-2 border text-center">الكمية</th>
                              <th className="p-2 border text-center">سعر الوحدة ($)</th>
                              <th className="p-2 border text-center">الإجمالي ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inv.items.map((it, idx) => (
                              <tr key={idx} className="border-b border-slate-200">
                                <td className="p-2 border text-center font-mono">{idx + 1}</td>
                                <td className="p-2 border font-medium">{it.name}</td>
                                <td className="p-2 border text-center font-mono">{it.qty}</td>
                                <td className="p-2 border text-center font-mono">{"$" + it.price}</td>
                                <td className="p-2 border text-center font-mono font-bold">{"$" + (it.qty * it.price)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="flex justify-between items-start mb-6">
                          <div className="w-1/2 p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                            <span className="font-bold block mb-1">ملاحظات وشروط الضمان المعتمدة:</span>
                            <p className="text-slate-600 leading-relaxed">{inv.notes || 'الضمان ساري على القطع المذكورة ضد عيوب المصنع.'}</p>
                          </div>
                          <div className="w-1/3 space-y-1 text-xs">
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-slate-600">المجموع الفرعي:</span>
                              <span className="font-bold font-mono">{"$" + calculateSubtotal(inv.items)}</span>
                            </div>
                            {inv.discount > 0 && (
                              <div className="flex justify-between border-b pb-1 text-emerald-600">
                                <span>الخصم الممنوح:</span>
                                <span className="font-bold font-mono">{"-$" + inv.discount}</span>
                              </div>
                            )}
                            <div className="flex justify-between border-b pb-1 text-sm font-black">
                              <span>الإجمالي المستحق:</span>
                              <span className="text-blue-700 font-mono">{"$" + finalTotal}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1 text-emerald-700">
                              <span>المسدد بسندات:</span>
                              <span className="font-bold font-mono">{"$" + (inv.paid || 0)}</span>
                            </div>
                            <div className="flex justify-between pt-1 font-bold text-sm text-rose-600">
                              <span>المتبقي المطلوب:</span>
                              <span className="font-mono">{"$" + remaining}</span>
                            </div>
                          </div>
                        </div>

                        {/* الختم والباركود الرقمي */}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-300 text-xs">
                          <div className="text-center">
                            <p className="text-slate-500 mb-6">توقيع المستلم والاعتماد</p>
                            <p className="text-slate-400">....................................</p>
                          </div>
                          <div className="text-center flex flex-col items-center">
                            <div className="w-20 h-20 border-2 border-slate-800 p-1 bg-slate-50 flex items-center justify-center font-mono text-[9px] text-center leading-tight">
                              [QR CODE]<br/>OPENTIK<br/>{inv.id}
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1 font-mono">رمز الفاتورة الإلكترونية</span>
                          </div>
                          <div className="text-center">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-700 flex flex-col items-center justify-center text-blue-700 font-bold p-2 rotate-[-12deg] shadow-sm">
                              <span className="text-[10px]">شركة OpenTik</span>
                              <span className="text-[12px] font-black">مـعـتـمـد</span>
                              <span className="text-[8px]">القسم المالي</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= 4. سندات القبض المالية (VOUCHERS) ================= */}
        {activeTab === 'vouchers' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">سندات القبض المالي المعتمدة</h3>
                <p className="text-xs text-slate-400">سجل التحصيلات المالية المباشرة وتحديث الفواتير</p>
              </div>
              <div className="text-left bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">إجمالي المقبوضات</span>
                <span className="text-sm font-black text-emerald-400 font-mono">{formatMoney(totalCollectedUSD)}</span>
              </div>
            </div>

            <div className="grid gap-3">
              {vouchers.map(v => (
                <div key={v.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{v.id}</span>
                      <h4 className="font-bold text-white">{v.client}</h4>
                      <span className="text-[10px] text-slate-400">فاتورة: {v.invoiceId}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">البيان: {v.notes} | طريقة الدفع: {v.method}</p>
                    <span className="text-[10px] text-slate-500">التاريخ: {v.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-emerald-400 font-mono">{formatMoney(v.amount)}</span>
                    <button 
                      onClick={() => handleExportPDF("printable-voucher-" + v.id, v.id + "_" + v.client)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" /> سند PDF
                    </button>
                  </div>

                  {/* قالب سند القبض للطباعة */}
                  <div className="hidden">
                    <div id={"printable-voucher-" + v.id} className="p-8 bg-white text-slate-900 text-right font-sans" dir="rtl">
                      <div className="flex justify-between items-center border-b-2 border-emerald-600 pb-4 mb-6">
                        <div>
                          <h1 className="text-2xl font-black text-emerald-700">شركة OpenTik للأنظمة الذكية</h1>
                          <p className="text-xs text-slate-600">سند قبض مالي معتمد</p>
                        </div>
                        <div className="text-left font-mono">
                          <span className="text-lg font-bold text-slate-800 block">رقم السند: {v.id}</span>
                          <span className="text-xs text-slate-500">التاريخ: {v.date}</span>
                        </div>
                      </div>

                      <div className="space-y-4 text-sm bg-slate-50 p-5 rounded-lg border border-slate-200 mb-6">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-600 font-bold">استلمنا من الأخ / السادة:</span>
                          <span className="font-bold text-slate-900">{v.client}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-600 font-bold">مبلغ وقدره:</span>
                          <span className="font-black text-emerald-700 font-mono text-base">{"$" + v.amount}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-slate-600 font-bold">طريقة القبض:</span>
                          <span className="font-medium text-slate-800">{v.method}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 font-bold">وذلك عن (البيان):</span>
                          <span className="text-slate-800">{v.notes} (فاتورة {v.invoiceId})</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-8 border-t border-slate-300 text-xs">
                        <div className="text-center">
                          <p className="text-slate-500 mb-6">توقيع المسلم</p>
                          <p className="text-slate-400">........................</p>
                        </div>
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-600 flex flex-col items-center justify-center text-emerald-700 font-bold rotate-[-10deg]">
                            <span className="text-[9px]">OpenTik</span>
                            <span className="text-[11px] font-black">مقبوض</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-500 mb-6">أمين الصندوق / الإدارة المالية</p>
                          <p className="text-slate-400">........................</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 5. الدعم الفني والعمليات (TICKETS) ================= */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">إدارة بلاغات الصيانة والعمليات الميدانية</h3>
                <p className="text-xs text-slate-400">إسناد المهندسين، إرسال تفاصيل البلاغ بواتساب، وإغلاق التذاكر</p>
              </div>
              <button 
                onClick={() => setCreatingTicket(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> فتح بلاغ صيانة
              </button>
            </div>

            <div className="grid gap-3">
              {tickets.map(t => (
                <div key={t.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{t.id}</span>
                        <h4 className="font-bold text-white">{t.client}</h4>
                        <span className={"text-[10px] px-2 py-0.5 rounded font-semibold " + (t.priority === 'حرجة' || t.priority === 'عالية' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400')}>
                          أهمية {t.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 mt-1.5 font-medium">{t.issue}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleWhatsAppTicket(t)}
                        className="px-2.5 py-1 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded text-xs transition flex items-center gap-1"
                        title="إرسال البلاغ للمهندس عبر واتساب"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> واتساب المهندس
                      </button>

                      {t.status === 'جديدة' && (
                        <button 
                          onClick={() => updateTicketStatus(t.id, 'قيد التنفيذ')}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs transition"
                        >
                          بدء المعالجة
                        </button>
                      )}
                      {t.status === 'قيد التنفيذ' && (
                        <button 
                          onClick={() => updateTicketStatus(t.id, 'تم الحل والإغلاق')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> إغلاق التذكرة
                        </button>
                      )}
                      <span className={"text-xs px-2.5 py-1 rounded font-semibold " + (t.status === 'تم الحل والإغلاق' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300')}>
                        {t.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                    <span>المهندس المسؤول: <strong className="text-slate-200">{t.engineer}</strong></span>
                    <span>موعد الزيارة الميدانية: <strong className="text-slate-200">{t.visitDate}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 6. كتالوج الباقات (PACKAGES) ================= */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white">كتالوج الباقات الجاهزة لشركة OpenTik</h3>
              <p className="text-xs text-slate-400">تحويل الباقة فوراً إلى فاتورة عميل بضغطة زر واحدة</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] text-blue-400 font-semibold">{pkg.category}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{pkg.title}</h4>
                    <span className="text-[11px] text-emerald-400 font-medium block mt-1">الضمان: {pkg.warranty}</span>
                    
                    <div className="my-3">
                      <span className="text-lg font-black text-white font-mono">{formatMoney(pkg.price)}</span>
                      <span className="text-[10px] text-slate-400 block">شامل التوريد والتركيب والبرمجة</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 text-xs text-slate-300">
                      {pkg.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>• {it.name}</span>
                          <span className="font-mono text-slate-400">x{it.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setInvoiceForm({
                        id: "INV-" + (1000 + invoices.length + 1),
                        client: clients[0] ? clients[0].name : '',
                        phone: clients[0] ? clients[0].phone : '',
                        system: pkg.category,
                        date: '2026-09-15',
                        items: JSON.parse(JSON.stringify(pkg.items)),
                        taxRate: 0,
                        discount: 0,
                        paid: 0,
                        notes: "باقة OpenTik المعتمدة: " + pkg.title
                      });
                      setCreatingInvoice(true);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" /> تحويل الباقة إلى فاتورة عميل
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ================= النوافذ المنبثقة التفاعلية ================= */}

      {/* نافذة النسخ الاحتياطي والاستعادة */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" /> إدارة قاعدة البيانات والنسخ الاحتياطي
              </h3>
              <button onClick={() => setShowBackupModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <h4 className="font-bold text-white mb-1">1. تصدير نسخة احتياطية من الهاتف</h4>
                <p className="text-slate-400 mb-2">قم بتحميل ملف JSON يحتوي على جميع العملاء، الفواتير، وسندات القبض للرجوع إليه مستقبلاً.</p>
                <button 
                  onClick={handleExportBackup}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> تصدير ملف النسخة الاحتياطية (.json)
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <h4 className="font-bold text-white mb-1">2. استعادة نسخة احتياطية سابقة</h4>
                <p className="text-slate-400 mb-2">اختر ملف نسخة احتياطية لاسترجاع كافة السجلات والأرصدة إلى التطبيق.</p>
                <input 
                  type="file" 
                  accept=".json"
                  onChange={handleImportBackup}
                  className="block w-full text-slate-400 text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تفاصيل العميل والأجهزة */}
      {viewClientDetails && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-lg w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">{viewClientDetails.name}</h3>
                <span className="text-xs text-blue-400 font-mono">{viewClientDetails.id}</span>
              </div>
              <button onClick={() => setViewClientDetails(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div><span className="text-slate-400">المسؤول: </span><strong className="text-white">{viewClientDetails.contactPerson}</strong></div>
                <div><span className="text-slate-400">الهاتف: </span><strong className="text-white font-mono">{viewClientDetails.phone}</strong></div>
                <div className="col-span-2"><span className="text-slate-400">العنوان: </span><strong className="text-white">{viewClientDetails.address}</strong></div>
                <div><span className="text-slate-400">انتهاء الضمان: </span><strong className="text-emerald-400">{viewClientDetails.warrantyExpiry}</strong></div>
                <div><span className="text-slate-400">الرصيد المتبقي: </span><strong className="text-rose-400 font-mono">{formatMoney(viewClientDetails.balance)}</strong></div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-400" /> قائمة الأجهزة والمنظومات المركبة في المنشأة:
                </h4>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  {viewClientDetails.installedDevices.map((dev, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{dev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setViewClientDetails(null)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة إضافة عميل جديد */}
      {newClientModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">إضافة عميل ومنشأة جديدة</h3>
              <button onClick={() => setNewClientModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveNewClient} className="space-y-3 text-xs">
              <input 
                type="text" 
                placeholder="اسم المنشأة أو الشركة" 
                value={newClientForm.name} 
                onChange={e => setNewClientForm({...newClientForm, name: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                required 
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="اسم المسؤول" 
                  value={newClientForm.contactPerson} 
                  onChange={e => setNewClientForm({...newClientForm, contactPerson: e.target.value})}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                />
                <input 
                  type="text" 
                  placeholder="رقم الهاتف" 
                  value={newClientForm.phone} 
                  onChange={e => setNewClientForm({...newClientForm, phone: e.target.value})}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                  required 
                />
              </div>
              <input 
                type="text" 
                placeholder="العنوان (مثال: شارع حدة - صنعاء)" 
                value={newClientForm.address} 
                onChange={e => setNewClientForm({...newClientForm, address: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
              />
              <select 
                value={newClientForm.system} 
                onChange={e => setNewClientForm({...newClientForm, system: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option value="كاميرات مراقبة وشبكات">كاميرات مراقبة وشبكات</option>
                <option value="طاقة بديلة وانفرتر">طاقة بديلة وانفرتر</option>
                <option value="أنظمة إنذار وتحكم بالدخول">أنظمة إنذار وتحكم بالدخول</option>
                <option value="شبكات مؤسسية وسيرفرات">شبكات مؤسسية وسيرفرات</option>
              </select>
              <textarea 
                placeholder="الأجهزة المركبة (اكتب كل جهاز في سطر)" 
                value={newClientForm.devices} 
                onChange={e => setNewClientForm({...newClientForm, devices: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white h-20"
              />
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setNewClientModal(false)} className="px-3 py-1.5 bg-slate-800 text-white rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold">حفظ العميل</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة إنشاء / تعديل فاتورة */}
      {(creatingInvoice || editingInvoice) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-2xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">
                {editingInvoice ? ("تعديل الفاتورة: " + editingInvoice.id) : "إنشاء فاتورة توريد وتركيب جديدة"}
              </h3>
              <button onClick={() => { setCreatingInvoice(false); setEditingInvoice(null); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">العميل</label>
                  <input 
                    type="text" 
                    value={editingInvoice ? editingInvoice.client : invoiceForm.client}
                    onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, client: e.target.value}) : setInvoiceForm({...invoiceForm, client: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الهاتف</label>
                  <input 
                    type="text" 
                    value={editingInvoice ? editingInvoice.phone : invoiceForm.phone}
                    onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, phone: e.target.value}) : setInvoiceForm({...invoiceForm, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">المنظومة</label>
                  <input 
                    type="text" 
                    value={editingInvoice ? editingInvoice.system : invoiceForm.system}
                    onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, system: e.target.value}) : setInvoiceForm({...invoiceForm, system: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200">الأصناف والأجهزة والخدمات:</span>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (editingInvoice) {
                        setEditingInvoice({ ...editingInvoice, items: [...editingInvoice.items, { name: '', qty: 1, price: 0 }] });
                      } else {
                        setInvoiceForm({ ...invoiceForm, items: [...invoiceForm.items, { name: '', qty: 1, price: 0 }] });
                      }
                    }}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> إضافة بند
                  </button>
                </div>

                <div className="space-y-2">
                  {(editingInvoice ? editingInvoice.items : invoiceForm.items).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <input 
                        type="text" 
                        placeholder="اسم الصنف أو الخدمة" 
                        value={item.name}
                        onChange={e => {
                          const updated = [...(editingInvoice ? editingInvoice.items : invoiceForm.items)];
                          updated[idx].name = e.target.value;
                          editingInvoice ? setEditingInvoice({...editingInvoice, items: updated}) : setInvoiceForm({...invoiceForm, items: updated});
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-white" 
                        required 
                      />
                      <input 
                        type="number" 
                        placeholder="الكمية" 
                        value={item.qty}
                        onChange={e => {
                          const updated = [...(editingInvoice ? editingInvoice.items : invoiceForm.items)];
                          updated[idx].qty = Number(e.target.value);
                          editingInvoice ? setEditingInvoice({...editingInvoice, items: updated}) : setInvoiceForm({...invoiceForm, items: updated});
                        }}
                        className="w-16 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono" 
                      />
                      <input 
                        type="number" 
                        placeholder="السعر ($)" 
                        value={item.price}
                        onChange={e => {
                          const updated = [...(editingInvoice ? editingInvoice.items : invoiceForm.items)];
                          updated[idx].price = Number(e.target.value);
                          editingInvoice ? setEditingInvoice({...editingInvoice, items: updated}) : setInvoiceForm({...invoiceForm, items: updated});
                        }}
                        className="w-20 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono" 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          const list = (editingInvoice ? editingInvoice.items : invoiceForm.items);
                          if (list.length > 1) {
                            const updated = list.filter((_, i) => i !== idx);
                            editingInvoice ? setEditingInvoice({...editingInvoice, items: updated}) : setInvoiceForm({...invoiceForm, items: updated});
                          }
                        }}
                        className="text-rose-400 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                <div>
                  <label className="text-slate-400 block mb-1">الخصم الممنوح ($)</label>
                  <input 
                    type="number" 
                    value={editingInvoice ? editingInvoice.discount : invoiceForm.discount}
                    onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, discount: Number(e.target.value)}) : setInvoiceForm({...invoiceForm, discount: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">المسدد مقدماً ($)</label>
                  <input 
                    type="number" 
                    value={editingInvoice ? editingInvoice.paid : invoiceForm.paid}
                    onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, paid: Number(e.target.value)}) : setInvoiceForm({...invoiceForm, paid: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-slate-400 block mb-1">الإجمالي النهائي</label>
                  <div className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-bold font-mono">
                    {"$" + calculateFinalTotal(editingInvoice || invoiceForm)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => { setCreatingInvoice(false); setEditingInvoice(null); }} className="px-3 py-1.5 bg-slate-800 text-white rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold">حفظ الفاتورة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة إصدار سند قبض */}
      {creatingVoucher && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">إصدار سند قبض مالي</h3>
              <button onClick={() => setCreatingVoucher(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveVoucher} className="space-y-3 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">العميل:</span>
                <strong className="text-white block mt-0.5">{creatingVoucher.client}</strong>
                <span className="text-[10px] text-blue-400">فاتورة: {creatingVoucher.id}</span>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">المبلغ المقبوض ($)</label>
                <input 
                  type="number" 
                  value={voucherForm.amount} 
                  onChange={e => setVoucherForm({...voucherForm, amount: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm" 
                  required 
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">طريقة الدفع</label>
                <select 
                  value={voucherForm.method} 
                  onChange={e => setVoucherForm({...voucherForm, method: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="نقداً">نقداً</option>
                  <option value="تحويل بنكي">تحويل بنكي (الكريمي / التضامن)</option>
                  <option value="شيك مصرفي">شيك مصرفي</option>
                </select>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">البيان / الملاحظات</label>
                <input 
                  type="text" 
                  value={voucherForm.notes} 
                  onChange={e => setVoucherForm({...voucherForm, notes: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setCreatingVoucher(null)} className="px-3 py-1.5 bg-slate-800 text-white rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold">تأكيد وإصدار السند</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تسجيل بلاغ صيانة */}
      {creatingTicket && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">فتح بلاغ صيانة ودعم فني</h3>
              <button onClick={() => setCreatingTicket(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveTicket} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">العميل</label>
                <select 
                  value={ticketForm.client} 
                  onChange={e => setTicketForm({...ticketForm, client: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  required
                >
                  <option value="">اختر العميل...</option>
                  {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">وصف العطل أو المشكلة</label>
                <textarea 
                  value={ticketForm.issue} 
                  onChange={e => setTicketForm({...ticketForm, issue: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white h-16" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">الأهمية</label>
                  <select 
                    value={ticketForm.priority} 
                    onChange={e => setTicketForm({...ticketForm, priority: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="حرجة">حرجة</option>
                    <option value="عالية">عالية</option>
                    <option value="متوسطة">متوسطة</option>
                    <option value="عادية">عادية</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">المهندس المكلف</label>
                  <input 
                    type="text" 
                    value={ticketForm.engineer} 
                    onChange={e => setTicketForm({...ticketForm, engineer: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setCreatingTicket(false)} className="px-3 py-1.5 bg-slate-800 text-white rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold">تسجيل البلاغ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة المعاينة السريعة للفاتورة */}
      {previewInvoice && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-lg w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">معاينة الفاتورة: {previewInvoice.id}</h3>
              <button onClick={() => setPreviewInvoice(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-400">العميل: </strong>{previewInvoice.client}</p>
              <p><strong className="text-slate-400">المنظومة: </strong>{previewInvoice.system}</p>
              <div className="bg-slate-950 p-3 rounded-lg space-y-1.5">
                {previewInvoice.items.map((it, i) => (
                  <div key={i} className="flex justify-between border-b border-slate-800 pb-1">
                    <span>{it.name} (x{it.qty})</span>
                    <span className="font-mono text-emerald-400">{formatMoney(it.qty * it.price)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span>الإجمالي:</span>
                  <span className="font-mono text-white">{formatMoney(calculateFinalTotal(previewInvoice))}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button 
                onClick={() => {
                  handleExportPDF("printable-invoice-" + previewInvoice.id, previewInvoice.id + "_" + previewInvoice.client);
                  setPreviewInvoice(null);
                }} 
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> تحميل الفاتورة الرسمية PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
