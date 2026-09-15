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
  PhoneCall,
  Save,
  Settings,
  FileCheck,
  Share2,
  Building,
  Briefcase
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSystem, setFilterSystem] = useState('all');
  const [currencyMode, setCurrencyMode] = useState('USD'); // USD أو YER
  const [toast, setToast] = useState(null);

  // إشعار تفاعلي
  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // إعدادات النظام والشركة
  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('opentik_settings');
    return saved ? JSON.parse(saved) : {
      companyName: 'شركة OpenTik للأنظمة الذكية',
      tagline: 'كاميرات مراقبة - شبكات - أنظمة أمان - طاقة بديلة - عقود صيانة SLA',
      crNumber: '10452',
      taxNumber: '30048921',
      phone: '777112233',
      address: 'شارع الزبيري - صنعاء',
      exchangeRate: 535, // سعر صرف الدولار
      bankKuraimi: '3001245678',
      bankTadhamon: '1024558',
      bankQutaibi: '7789012',
      defaultWarranty: 'عام كامل ضمان استبدال ضد عيوب المصنع'
    };
  });

  // العملاء
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
        installedDevices: ['8x كاميرات شبكية Dahua 5MP IP AI', '1x جهاز تسجيل NVR 16-CH 4K', '1x سويتش PoE 16Port']
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
        installedDevices: ['1x انفرتر هجين Deye 12KW Three-Phase', '2x بنك بطاريات ليثيوم 48V 100Ah']
      }
    ];
  });

  // الفواتير
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
          { name: 'كاميرا شبكية IP بدقة 5MP ذكية AI', qty: 8, price: 65 },
          { name: 'جهاز تسجيل NVR 16CH مع قرص 4TB Purple', qty: 1, price: 320 },
          { name: 'سويتش شبكة 16Port PoE ومستلزمات الربط', qty: 1, price: 180 },
          { name: 'تمديد وتركيب وبرمجة وتدريب الكادر', qty: 1, price: 250 }
        ],
        paid: 1000,
        notes: 'الضمان لمدة عام كامل يشمل القطع والاستبدال الفوري ضد عيوب المصنع.'
      }
    ];
  });

  // عروض الأسعار المعتمدة (Quotations)
  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem('opentik_quotations');
    return saved ? JSON.parse(saved) : [
      {
        id: 'QT-301',
        client: 'مجموعة التضامن الصناعية',
        phone: '773322110',
        date: '2026-09-15',
        validUntil: '2026-09-30',
        system: 'كاميرات مراقبة وطاقة شمسية',
        items: [
          { name: 'كاميرا متحركة PTZ بدقة 4K مع زووم بصري 32X', qty: 2, price: 350 },
          { name: 'منظومة طاقة شمسية احتياطية لكاميرات الحراسة', qty: 1, price: 850 }
        ],
        notes: 'عرض السعر ساري لمدة 15 يوماً من تاريخ صدوره.'
      }
    ];
  });

  // سندات القبض
  const [vouchers, setVouchers] = useState(() => {
    const saved = localStorage.getItem('opentik_vouchers');
    return saved ? JSON.parse(saved) : [
      { id: 'RV-201', invoiceId: 'INV-1001', client: 'شركة النجم الذهبي للتجارة', amount: 1000, date: '2026-09-10', method: 'تحويل بنكي', notes: 'دفعة أولى مقدمة مع التوريد' }
    ];
  });

  // تذاكر الصيانة
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('opentik_tickets');
    return saved ? JSON.parse(saved) : [
      { id: 'TK-501', client: 'شركة النجم الذهبي للتجارة', issue: 'فقدان إشارة الكاميرا رقم 3 في البوابة الخلفية', priority: 'عالية', engineer: 'م. سامي الحمادي', visitDate: '2026-09-16', status: 'قيد التنفيذ' }
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

  // حفظ تلقائي في التخزين المحلي
  useEffect(() => { localStorage.setItem('opentik_settings', JSON.stringify(systemSettings)); }, [systemSettings]);
  useEffect(() => { localStorage.setItem('opentik_clients', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('opentik_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('opentik_quotations', JSON.stringify(quotations)); }, [quotations]);
  useEffect(() => { localStorage.setItem('opentik_vouchers', JSON.stringify(vouchers)); }, [vouchers]);
  useEffect(() => { localStorage.setItem('opentik_tickets', JSON.stringify(tickets)); }, [tickets]);

  // الحالات المنبثقة
  const [viewClientDetails, setViewClientDetails] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [creatingInvoice, setCreatingInvoice] = useState(false);
  const [creatingQuotation, setCreatingQuotation] = useState(false);
  const [creatingVoucher, setCreatingVoucher] = useState(null);
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [newClientModal, setNewClientModal] = useState(false);

  // نافذة المعاينة والاعتماد التلقائية الفورية بعد الحفظ
  const [autoActionModal, setAutoActionModal] = useState(null); // { type: 'invoice' | 'voucher' | 'quotation', data: {...} }

  // نماذج الإدخال
  const [newClientForm, setNewClientForm] = useState({
    name: '', contactPerson: '', phone: '', address: '', system: 'كاميرات مراقبة وشبكات', warrantyExpiry: '2027-09-15', devices: ''
  });

  const [invoiceForm, setInvoiceForm] = useState({
    id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15',
    items: [{ name: '', qty: 1, price: 0 }],
    taxRate: 0, discount: 0, paid: 0, notes: ''
  });

  const [quotationForm, setQuotationForm] = useState({
    id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15', validUntil: '2026-09-30',
    items: [{ name: '', qty: 1, price: 0 }], notes: ''
  });

  const [voucherForm, setVoucherForm] = useState({ amount: '', method: 'نقداً', notes: '' });
  const [ticketForm, setTicketForm] = useState({ client: '', issue: '', priority: 'عالية', engineer: 'م. سامي الحمادي', visitDate: '2026-09-16' });

  // الحسابات الرياضية
  const calculateSubtotal = (items) => items.reduce((acc, item) => acc + ((Number(item.qty) || 0) * (Number(item.price) || 0)), 0);
  const calculateFinalTotal = (inv) => {
    const sub = calculateSubtotal(inv.items);
    const afterDiscount = sub - (Number(inv.discount) || 0);
    const tax = afterDiscount * ((Number(inv.taxRate) || 0) / 100);
    return afterDiscount + tax;
  };

  const totalSalesUSD = invoices.reduce((acc, inv) => acc + calculateFinalTotal(inv), 0);
  const totalCollectedUSD = vouchers.reduce((acc, v) => acc + (Number(v.amount) || 0), 0);
  const totalOutstandingUSD = totalSalesUSD - totalCollectedUSD;
  const collectionRate = totalSalesUSD > 0 ? Math.round((totalCollectedUSD / totalSalesUSD) * 100) : 0;

  // تحويل العملات
  const formatMoney = (amountUSD) => {
    if (currencyMode === 'YER') {
      const inYer = Math.round(amountUSD * (systemSettings.exchangeRate || 535));
      return inYer.toLocaleString() + ' ريال';
    }
    return '$' + amountUSD.toLocaleString();
  };

  // تصدير PDF فوري
  const handleExportPDF = (elementId, fileName) => {
    const element = document.getElementById(elementId);
    if (!element || !window.html2pdf) {
      alert('محرك الـ PDF جاري تجهيزه، يرجى المحاولة بعد لحظات...');
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

  // الإرسال الذكي عبر واتساب الأعمال أو واتساب العادي
  const handleSendWhatsApp = (phone, text, preferBusiness = true) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.startsWith('967') ? cleanPhone : ('967' + cleanPhone);
    const encoded = encodeURIComponent(text);

    if (preferBusiness) {
      // محاولة فتح واتساب الأعمال مباشرة عبر Intent الأندرويد، مع رابط بديل فوري
      const businessIntent = "intent://send?phone=" + fullPhone + "&text=" + encoded + "#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end";
      window.location.href = businessIntent;
      // إذا لم يكن متوفراً خلال ثانية يفتح الواتساب العادي تلقائياً
      setTimeout(() => {
        window.open("https://api.whatsapp.com/send?phone=" + fullPhone + "&text=" + encoded, '_blank');
      }, 1200);
    } else {
      window.open("https://api.whatsapp.com/send?phone=" + fullPhone + "&text=" + encoded, '_blank');
    }
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
    showNotification('تم حفظ العميل والمنشأة بنجاح ✔️');
  };

  // حفظ الفاتورة وإطلاق المعاينة والإرسال التلقائي
  const handleSaveInvoice = (e) => {
    e.preventDefault();
    let targetInv = null;
    if (editingInvoice) {
      targetInv = editingInvoice;
      setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? editingInvoice : inv));
      setEditingInvoice(null);
    } else {
      targetInv = { ...invoiceForm, id: invoiceForm.id || ("INV-" + (1000 + invoices.length + 1)) };
      setInvoices([targetInv, ...invoices]);
      setCreatingInvoice(false);
    }
    // فتح نافذة المعاينة والاعتماد والإرسال عبر واتساب تلقائياً
    setAutoActionModal({ type: 'invoice', data: targetInv });
    showNotification('تم حفظ الفاتورة وجاري فتح خيارات الاعتماد والإرسال 📄');
  };

  // حفظ سند القبض وإطلاق المعاينة والإرسال التلقائي
  const handleSaveVoucher = (e) => {
    e.preventDefault();
    if (!voucherForm.amount || Number(voucherForm.amount) <= 0) return;
    const amt = Number(voucherForm.amount);
    const newVoucher = {
      id: "RV-" + (200 + vouchers.length + 1),
      invoiceId: creatingVoucher.id,
      client: creatingVoucher.client,
      phone: creatingVoucher.phone,
      amount: amt,
      date: '2026-09-15',
      method: voucherForm.method,
      notes: voucherForm.notes || 'سداد دفعة من الفاتورة'
    };
    setVouchers([newVoucher, ...vouchers]);

    // تحديث رصيد الفاتورة والعميل
    setInvoices(invoices.map(inv => inv.id === creatingVoucher.id ? { ...inv, paid: (inv.paid || 0) + amt } : inv));
    setClients(clients.map(c => c.name === creatingVoucher.client ? { ...c, balance: Math.max(0, (c.balance || 0) - amt) } : c));

    setCreatingVoucher(null);
    setVoucherForm({ amount: '', method: 'نقداً', notes: '' });

    // فتح نافذة المعاينة والاعتماد والإرسال
    setAutoActionModal({ type: 'voucher', data: newVoucher });
    showNotification('تم إصدار سند القبض وجاري فتح نافذة الإرسال 💵');
  };

  // حفظ عرض السعر
  const handleSaveQuotation = (e) => {
    e.preventDefault();
    const newQt = { ...quotationForm, id: quotationForm.id || ("QT-" + (300 + quotations.length + 1)) };
    setQuotations([newQt, ...quotations]);
    setCreatingQuotation(false);
    setAutoActionModal({ type: 'quotation', data: newQt });
    showNotification('تم حفظ عرض السعر بنجاح 📋');
  };

  // تحويل باقة من الكتالوج إلى فاتورة أو عرض سعر
  const handlePackageAction = (pkg, actionType) => {
    const selectedClient = clients[0] || { name: '', phone: '' };
    if (actionType === 'invoice') {
      setInvoiceForm({
        id: "INV-" + (1000 + invoices.length + 1),
        client: selectedClient.name,
        phone: selectedClient.phone,
        system: pkg.category,
        date: '2026-09-15',
        items: JSON.parse(JSON.stringify(pkg.items)),
        taxRate: 0,
        discount: 0,
        paid: 0,
        notes: "باقة معتمدة من OpenTik - " + pkg.title + " (" + pkg.warranty + ")."
      });
      setCreatingInvoice(true);
    } else {
      setQuotationForm({
        id: "QT-" + (300 + quotations.length + 1),
        client: selectedClient.name,
        phone: selectedClient.phone,
        system: pkg.category,
        date: '2026-09-15',
        validUntil: '2026-09-30',
        items: JSON.parse(JSON.stringify(pkg.items)),
        notes: "عرض سعر رسمي ساري لمدة 15 يوماً - باقة: " + pkg.title
      });
      setCreatingQuotation(true);
    }
  };

  const filteredClients = clients.filter(c => {
    const matchSearch = c.name.includes(searchTerm) || c.phone.includes(searchTerm) || c.contactPerson.includes(searchTerm);
    const matchFilter = filterSystem === 'all' || c.system.includes(filterSystem);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      
      {/* إشعار تفاعلي علوي */}
      {toast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* الشريط العلوي */}
      <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20">
              OP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white">{systemSettings.companyName}</h1>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono font-bold">Pro v2.1</span>
              </div>
              <p className="text-[11px] text-slate-400">{systemSettings.tagline}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrencyMode(currencyMode === 'USD' ? 'YER' : 'USD')}
              className="px-2.5 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 font-bold transition flex items-center gap-1"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currencyMode === 'USD' ? 'دولار ($)' : 'ريال يمني'}</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={"p-2 rounded-lg border transition " + (activeTab === 'settings' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300')}
              title="إعدادات النظام"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* شريط الأقسام */}
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          <button onClick={() => setActiveTab('dashboard')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Shield className="w-4 h-4" /> لوحة التحكم
          </button>
          <button onClick={() => setActiveTab('clients')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'clients' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Users className="w-4 h-4" /> العملاء ({clients.length})
          </button>
          <button onClick={() => setActiveTab('invoices')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'invoices' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <FileText className="w-4 h-4" /> الفواتير ({invoices.length})
          </button>
          <button onClick={() => setActiveTab('quotations')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'quotations' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <FileCheck className="w-4 h-4" /> عروض الأسعار ({quotations.length})
          </button>
          <button onClick={() => setActiveTab('vouchers')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'vouchers' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <DollarSign className="w-4 h-4" /> سندات القبض ({vouchers.length})
          </button>
          <button onClick={() => setActiveTab('packages')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'packages' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Layers className="w-4 h-4" /> الكتالوج الذكي
          </button>
          <button onClick={() => setActiveTab('settings')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'settings' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Settings className="w-4 h-4" /> إعدادات النظام
          </button>
        </nav>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-4 flex-1 max-w-6xl w-full mx-auto space-y-5">
        
        {/* ================= 1. لوحة التحكم ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">إجمالي المبيعات</span>
                <h3 className="text-xl font-black text-white mt-1 font-mono">{formatMoney(totalSalesUSD)}</h3>
                <span className="text-[11px] text-blue-400 font-semibold mt-1 block">مشاريع وعقود</span>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">المحصل الفعلي</span>
                <h3 className="text-xl font-black text-emerald-400 mt-1 font-mono">{formatMoney(totalCollectedUSD)}</h3>
                <span className="text-[11px] text-emerald-400/90 font-semibold mt-1 block">{"التحصيل: " + collectionRate + "%"}</span>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">الديون المتبقية</span>
                <h3 className="text-xl font-black text-rose-400 mt-1 font-mono">{formatMoney(totalOutstandingUSD)}</h3>
                <span className="text-[11px] text-rose-400/90 font-semibold mt-1 block">واجبة السداد</span>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">العملاء النشطون</span>
                <h3 className="text-xl font-black text-cyan-400 mt-1 font-mono">{clients.length}</h3>
                <span className="text-[11px] text-cyan-400/90 font-semibold mt-1 block">منشآت معتمدة</span>
              </div>
            </div>

            {/* شريط السيولة */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-300">نسبة تحصيل السيولة النقدية:</span>
                <span className="font-mono text-emerald-400 font-bold">{collectionRate}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: collectionRate + '%' }}></div>
              </div>
            </div>

            {/* أنظمة OpenTik */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" /> مجالات وتخصصات OpenTik الذكية
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Camera className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">كاميرات المراقبة</span>
                  <span className="text-[10px] text-slate-400">IP & Smart AI</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Wifi className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">الشبكات والـ IT</span>
                  <span className="text-[10px] text-slate-400">PoE & WiFi 6</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Sun className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">الطاقة البديلة</span>
                  <span className="text-[10px] text-slate-400">انفرتر وليثيوم</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">أنظمة الأمان</span>
                  <span className="text-[10px] text-slate-400">بصمة وإنذار</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
                  <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">عقود الصيانة SLA</span>
                  <span className="text-[10px] text-slate-400">دعم ميداني</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. إدارة العملاء ================= */}
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
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-3 py-2 text-xs text-white placeholder-slate-400"
                  />
                </div>
                <select 
                  value={filterSystem} 
                  onChange={(e) => setFilterSystem(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white"
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
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> إضافة عميل جديد
              </button>
            </div>

            <div className="grid gap-3">
              {filteredClients.map(c => (
                <div key={c.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
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
                      <a href={"tel:" + c.phone} className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg">
                        <PhoneCall className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => handleSendWhatsApp(c.phone, 'مرحباً ' + c.name + '، معكم شركة OpenTik للأنظمة الذكية.')}
                        className="p-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded-lg"
                        title="واتساب الأعمال"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setViewClientDetails(c)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" /> الملف الشامل
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap justify-between items-center text-xs gap-2">
                    <div>
                      <span className="text-slate-400">المنظومة: </span>
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

        {/* ================= 3. الفواتير ================= */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">فواتير التوريد والتركيب</h3>
                <p className="text-xs text-slate-400">إصدار الفواتير مع المعاينة والاعتماد والإرسال المباشر بواتساب</p>
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
                    notes: systemSettings.defaultWarranty
                  });
                  setCreatingInvoice(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3.5 py-2 text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> إنشاء فاتورة
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
                        <p className="text-xs text-slate-400 mt-1">الهاتف: {inv.phone} | التاريخ: {inv.date} | المنظومة: {inv.system}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <button 
                          onClick={() => setAutoActionModal({ type: 'invoice', data: inv })}
                          className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs flex items-center gap-1 font-bold"
                        >
                          <Eye className="w-3.5 h-3.5" /> معاينة واعتماد وإرسال
                        </button>
                        <button 
                          onClick={() => setEditingInvoice(JSON.parse(JSON.stringify(inv)))}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1"
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
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-lg text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">الإجمالي</span>
                        <span className="font-bold text-white font-mono">{formatMoney(finalTotal)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">المسدد</span>
                        <span className="font-bold text-emerald-400 font-mono">{formatMoney(inv.paid || 0)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">المتبقي</span>
                        <span className={"font-bold font-mono " + (remaining > 0 ? 'text-rose-400' : 'text-emerald-400')}>
                          {formatMoney(remaining)}
                        </span>
                      </div>
                    </div>

                    {/* قالب PDF الرسمي المخفي للفاتورة */}
                    <div className="hidden">
                      <div id={"printable-invoice-" + inv.id} className="p-8 bg-white text-slate-900 text-right font-sans" dir="rtl">
                        <div className="flex justify-between items-center border-b-2 border-blue-600 pb-4 mb-5">
                          <div>
                            <h1 className="text-2xl font-black text-blue-700">{systemSettings.companyName}</h1>
                            <p className="text-xs text-slate-600 mt-1">{systemSettings.tagline}</p>
                            <p className="text-[11px] text-slate-500 font-mono mt-0.5">السجل التجاري: {systemSettings.crNumber} | الرقم الضريبي: {systemSettings.taxNumber}</p>
                          </div>
                          <div className="text-left">
                            <span className="text-xl font-bold text-slate-800 block">فاتورة ضريبية رسمية</span>
                            <span className="text-xs text-slate-500 font-mono">رقم الفاتورة: {inv.id}</span>
                            <p className="text-xs text-slate-500 font-mono">التاريخ: {inv.date}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg mb-5 border border-slate-200 text-xs">
                          <div>
                            <span className="font-bold text-slate-800 block mb-1">بيانات العميل:</span>
                            <p className="font-semibold text-slate-700">الاسم: {inv.client}</p>
                            <p className="text-slate-600">الهاتف: {inv.phone}</p>
                            <p className="text-slate-600">المنظومة: {inv.system}</p>
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-slate-800 block mb-1">الحسابات البنكية المعتمدة:</span>
                            <p className="text-slate-600 font-mono">الكريمي: {systemSettings.bankKuraimi}</p>
                            <p className="text-slate-600 font-mono">التضامن: {systemSettings.bankTadhamon}</p>
                            <p className="text-slate-600 font-mono">القطيبي: {systemSettings.bankQutaibi}</p>
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
                            <span className="font-bold block mb-1">ملاحظات وشروط الضمان:</span>
                            <p className="text-slate-600 leading-relaxed">{inv.notes || systemSettings.defaultWarranty}</p>
                          </div>
                          <div className="w-1/3 space-y-1 text-xs">
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-slate-600">المجموع:</span>
                              <span className="font-bold font-mono">{"$" + calculateSubtotal(inv.items)}</span>
                            </div>
                            {inv.discount > 0 && (
                              <div className="flex justify-between border-b pb-1 text-emerald-600">
                                <span>الخصم:</span>
                                <span className="font-bold font-mono">{"-$" + inv.discount}</span>
                              </div>
                            )}
                            <div className="flex justify-between border-b pb-1 text-sm font-black">
                              <span>الإجمالي النهائي:</span>
                              <span className="text-blue-700 font-mono">{"$" + finalTotal}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1 text-emerald-700">
                              <span>المسدد:</span>
                              <span className="font-bold font-mono">{"$" + (inv.paid || 0)}</span>
                            </div>
                            <div className="flex justify-between pt-1 font-bold text-sm text-rose-600">
                              <span>المتبقي المطلوب:</span>
                              <span className="font-mono">{"$" + remaining}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-300 text-xs">
                          <div className="text-center">
                            <p className="text-slate-500 mb-6">المستلم والاعتماد</p>
                            <p className="text-slate-400">........................</p>
                          </div>
                          <div className="text-center">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-700 flex flex-col items-center justify-center text-blue-700 font-bold p-2 rotate-[-12deg]">
                              <span className="text-[10px]">OpenTik</span>
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

        {/* ================= 4. عروض الأسعار (QUOTATIONS) ================= */}
        {activeTab === 'quotations' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">عروض الأسعار المعتمدة</h3>
                <p className="text-xs text-slate-400">إنشاء وتصدير عروض الأسعار التقديرية للعملاء والمنشآت</p>
              </div>
              <button 
                onClick={() => {
                  setQuotationForm({
                    id: "QT-" + (300 + quotations.length + 1),
                    client: clients[0] ? clients[0].name : '',
                    phone: clients[0] ? clients[0].phone : '',
                    system: 'كاميرات مراقبة وشبكات',
                    date: '2026-09-15',
                    validUntil: '2026-09-30',
                    items: [{ name: '', qty: 1, price: 0 }],
                    notes: 'عرض السعر ساري لمدة 15 يوماً من تاريخه.'
                  });
                  setCreatingQuotation(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3.5 py-2 text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> إنشاء عرض سعر
              </button>
            </div>

            <div className="grid gap-3">
              {quotations.map(qt => {
                const total = calculateSubtotal(qt.items);
                return (
                  <div key={qt.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">{qt.id}</span>
                          <h4 className="font-bold text-white">{qt.client}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">تاريخ الصدور: {qt.date} | الصلاحية حتى: {qt.validUntil}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setAutoActionModal({ type: 'quotation', data: qt })}
                          className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs flex items-center gap-1 font-bold"
                        >
                          <Eye className="w-3.5 h-3.5" /> معاينة واعتماد وإرسال
                        </button>
                        <button 
                          onClick={() => {
                            // تحويل عرض السعر إلى فاتورة
                            setInvoiceForm({
                              id: "INV-" + (1000 + invoices.length + 1),
                              client: qt.client,
                              phone: qt.phone,
                              system: qt.system,
                              date: '2026-09-15',
                              items: JSON.parse(JSON.stringify(qt.items)),
                              taxRate: 0,
                              discount: 0,
                              paid: 0,
                              notes: "تم تحويلها من عرض السعر رقم: " + qt.id
                            });
                            setCreatingInvoice(true);
                          }}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs flex items-center gap-1 font-bold"
                        >
                          <FileText className="w-3.5 h-3.5" /> تحويل إلى فاتورة
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg text-xs">
                      <div>
                        <span className="text-slate-400">المنظومة المقترحة: </span>
                        <strong className="text-white">{qt.system}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">الإجمالي التقديري: </span>
                        <strong className="text-emerald-400 font-mono text-sm">{formatMoney(total)}</strong>
                      </div>
                    </div>

                    {/* قالب PDF لعرض السعر */}
                    <div className="hidden">
                      <div id={"printable-quotation-" + qt.id} className="p-8 bg-white text-slate-900 text-right font-sans" dir="rtl">
                        <div className="flex justify-between items-center border-b-2 border-amber-600 pb-4 mb-5">
                          <div>
                            <h1 className="text-2xl font-black text-amber-700">{systemSettings.companyName}</h1>
                            <p className="text-xs text-slate-600 mt-1">{systemSettings.tagline}</p>
                          </div>
                          <div className="text-left">
                            <span className="text-xl font-bold text-slate-800 block">عرض سعر معتمد (Quotation)</span>
                            <span className="text-xs text-slate-500 font-mono">رقم العرض: {qt.id}</span>
                            <p className="text-xs text-slate-500 font-mono">تاريخ الصدور: {qt.date}</p>
                            <p className="text-xs text-slate-500 font-mono">ساري المفعول حتى: {qt.validUntil}</p>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg mb-5 border border-slate-200 text-xs">
                          <span className="font-bold text-slate-800 block mb-1">مقدم للأخوة / السادة:</span>
                          <p className="font-semibold text-slate-700">المنشأة: {qt.client} | الهاتف: {qt.phone}</p>
                        </div>

                        <table className="w-full text-right border-collapse mb-5 text-xs">
                          <thead>
                            <tr className="bg-amber-600 text-white">
                              <th className="p-2 border">#</th>
                              <th className="p-2 border">البيان والمواصفات</th>
                              <th className="p-2 border text-center">الكمية</th>
                              <th className="p-2 border text-center">السعر ($)</th>
                              <th className="p-2 border text-center">الإجمالي ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {qt.items.map((it, idx) => (
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
                            <span className="font-bold block mb-1">الشروط والملاحظات:</span>
                            <p className="text-slate-600">{qt.notes}</p>
                          </div>
                          <div className="w-1/3 text-xs text-left">
                            <span className="text-slate-600 block mb-1">إجمالي عرض السعر:</span>
                            <span className="text-xl font-black text-amber-700 font-mono">{"$" + total}</span>
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

        {/* ================= 5. سندات القبض ================= */}
        {activeTab === 'vouchers' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">سندات القبض المالي المعتمدة</h3>
                <p className="text-xs text-slate-400">سجل التحصيلات المالية المباشرة</p>
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
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-emerald-400 font-mono">{formatMoney(v.amount)}</span>
                    <button 
                      onClick={() => setAutoActionModal({ type: 'voucher', data: v })}
                      className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs flex items-center gap-1 font-bold"
                    >
                      <Eye className="w-3.5 h-3.5" /> معاينة وإرسال
                    </button>
                  </div>

                  {/* قالب PDF لسند القبض */}
                  <div className="hidden">
                    <div id={"printable-voucher-" + v.id} className="p-8 bg-white text-slate-900 text-right font-sans" dir="rtl">
                      <div className="flex justify-between items-center border-b-2 border-emerald-600 pb-4 mb-6">
                        <div>
                          <h1 className="text-2xl font-black text-emerald-700">{systemSettings.companyName}</h1>
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

        {/* ================= 6. الكتالوج المطور (باقات + تحويل لفاتورة أو عرض سعر) ================= */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white">كتالوج الباقات الذكية لشركة OpenTik</h3>
              <p className="text-xs text-slate-400">يمكنك تحويل أي باقة إلى فاتورة توريد أو عرض سعر معتمد فورياً</p>
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

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <button 
                      onClick={() => handlePackageAction(pkg, 'invoice')}
                      className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 text-xs font-bold transition flex items-center justify-center gap-1 shadow"
                    >
                      <FileText className="w-3.5 h-3.5" /> تحويل لفاتورة
                    </button>
                    <button 
                      onClick={() => handlePackageAction(pkg, 'quotation')}
                      className="bg-amber-600 hover:bg-amber-500 text-white rounded-lg py-2 text-xs font-bold transition flex items-center justify-center gap-1 shadow"
                    >
                      <FileCheck className="w-3.5 h-3.5" /> تحويل لعرض سعر
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 7. قسم إعدادات النظام الجديد ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" /> إعدادات وتخصيص نظام OpenTik
              </h3>
              <p className="text-xs text-slate-400">تعديل بيانات الشركة، الحسابات البنكية، وأسعار الصرف الرسمية</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              {/* بيانات الشركة */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-cyan-400" /> بيانات الشركة الرسمية
                </h4>
                <div>
                  <label className="text-slate-400 block mb-1">اسم المنشأة</label>
                  <input 
                    type="text" 
                    value={systemSettings.companyName}
                    onChange={e => setSystemSettings({...systemSettings, companyName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الوصف والأنشطة (يظهر في رأس الفاتورة)</label>
                  <input 
                    type="text" 
                    value={systemSettings.tagline}
                    onChange={e => setSystemSettings({...systemSettings, tagline: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">رقم السجل التجاري</label>
                    <input 
                      type="text" 
                      value={systemSettings.crNumber}
                      onChange={e => setSystemSettings({...systemSettings, crNumber: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">الرقم الضريبي</label>
                    <input 
                      type="text" 
                      value={systemSettings.taxNumber}
                      onChange={e => setSystemSettings({...systemSettings, taxNumber: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* الحسابات البنكية وسعر الصرف */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> الإعدادات المالية والبنكية
                </h4>
                <div>
                  <label className="text-slate-400 block mb-1">سعر صرف الدولار مقابل الريال اليمني</label>
                  <input 
                    type="number" 
                    value={systemSettings.exchangeRate}
                    onChange={e => setSystemSettings({...systemSettings, exchangeRate: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-mono font-bold"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">بنك الكريمي</label>
                    <input 
                      type="text" 
                      value={systemSettings.bankKuraimi}
                      onChange={e => setSystemSettings({...systemSettings, bankKuraimi: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">بنك التضامن</label>
                    <input 
                      type="text" 
                      value={systemSettings.bankTadhamon}
                      onChange={e => setSystemSettings({...systemSettings, bankTadhamon: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">بنك القطيبي</label>
                    <input 
                      type="text" 
                      value={systemSettings.bankQutaibi}
                      onChange={e => setSystemSettings({...systemSettings, bankQutaibi: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">نص الضمان الافتراضي</label>
                  <input 
                    type="text" 
                    value={systemSettings.defaultWarranty}
                    onChange={e => setSystemSettings({...systemSettings, defaultWarranty: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => showNotification('تم حفظ وتطبيق كافة إعدادات النظام بنجاح 💾')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-6 py-2.5 text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Save className="w-4 h-4" /> حفظ كافة الإعدادات
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ================= النوافذ المنبثقة ================= */}

      {/* نافذة المعاينة والاعتماد والإرسال الفوري التلقائية */}
      {autoActionModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  {autoActionModal.type === 'invoice' && ("معاينة واعتماد الفاتورة: " + autoActionModal.data.id)}
                  {autoActionModal.type === 'voucher' && ("معاينة واعتماد سند القبض: " + autoActionModal.data.id)}
                  {autoActionModal.type === 'quotation' && ("معاينة واعتماد عرض السعر: " + autoActionModal.data.id)}
                </h3>
              </div>
              <button onClick={() => setAutoActionModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <p><strong className="text-slate-400">العميل: </strong>{autoActionModal.data.client}</p>
              <p><strong className="text-slate-400">الهاتف: </strong>{autoActionModal.data.phone || 'غير مسجل'}</p>
              {autoActionModal.type === 'invoice' && (
                <div className="pt-1 border-t border-slate-800 flex justify-between font-bold">
                  <span>الإجمالي المستحق:</span>
                  <span className="font-mono text-emerald-400">{"$" + calculateFinalTotal(autoActionModal.data)}</span>
                </div>
              )}
              {autoActionModal.type === 'voucher' && (
                <div className="pt-1 border-t border-slate-800 flex justify-between font-bold">
                  <span>المبلغ المقبوض:</span>
                  <span className="font-mono text-emerald-400">{"$" + autoActionModal.data.amount}</span>
                </div>
              )}
              {autoActionModal.type === 'quotation' && (
                <div className="pt-1 border-t border-slate-800 flex justify-between font-bold">
                  <span>الإجمالي التقديري:</span>
                  <span className="font-mono text-amber-400">{"$" + calculateSubtotal(autoActionModal.data.items)}</span>
                </div>
              )}
            </div>

            {/* خطوات الاعتماد والإرسال */}
            <div className="space-y-2 pt-1 text-xs">
              <span className="font-bold text-slate-300 block">إجراءات الإرسال والتحميل:</span>

              {/* 1. تحميل PDF */}
              <button 
                onClick={() => {
                  const id = autoActionModal.type === 'invoice' ? ("printable-invoice-" + autoActionModal.data.id) :
                             autoActionModal.type === 'voucher' ? ("printable-voucher-" + autoActionModal.data.id) :
                             ("printable-quotation-" + autoActionModal.data.id);
                  handleExportPDF(id, autoActionModal.data.id + "_" + autoActionModal.data.client);
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-2.5 font-bold transition flex items-center justify-center gap-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-cyan-400" /> 1. تنزيل نسخة PDF الرسمية على الهاتف
              </button>

              {/* 2. إرسال عبر واتساب الأعمال */}
              <button 
                onClick={() => {
                  const phone = autoActionModal.data.phone || '777112233';
                  let msg = '';
                  if (autoActionModal.type === 'invoice') {
                    const total = calculateFinalTotal(autoActionModal.data);
                    const rem = total - (autoActionModal.data.paid || 0);
                    msg = 'مرحباً بالعميل العزيز: ' + autoActionModal.data.client + '\n' +
                          'تحية طيبة من ' + systemSettings.companyName + ' 🛡️\n\n' +
                          'مرفق لكم تفاصيل الفاتورة الرسمية رقم: ' + autoActionModal.data.id + '\n' +
                          'إجمالي الفاتورة: $' + total + '\n' +
                          'المسدد منها: $' + (autoActionModal.data.paid || 0) + '\n' +
                          'المتبقي المستحق: $' + rem + '\n\n' +
                          'شكراً لثقتكم بخدماتنا.';
                  } else if (autoActionModal.type === 'voucher') {
                    msg = 'مرحباً بالعميل العزيز: ' + autoActionModal.data.client + '\n' +
                          'سند قبض معتمد رقم: ' + autoActionModal.data.id + '\n' +
                          'استلمنا منكم مبلغ: $' + autoActionModal.data.amount + ' (' + autoActionModal.data.method + ')\n' +
                          'عن: ' + autoActionModal.data.notes + '\n\n' +
                          'شركة OpenTik للأنظمة الذكية.';
                  } else {
                    msg = 'مرحباً بالسادة: ' + autoActionModal.data.client + '\n' +
                          'مرفق لكم عرض السعر المعتمد رقم: ' + autoActionModal.data.id + '\n' +
                          'الإجمالي التقديري: $' + calculateSubtotal(autoActionModal.data.items) + '\n' +
                          'صالح حتى: ' + autoActionModal.data.validUntil + '\n\n' +
                          'شركة OpenTik للأنظمة الذكية.';
                  }
                  handleSendWhatsApp(phone, msg, true);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 font-bold transition flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" /> 2. إرسال عبر واتساب الأعمال (WhatsApp Business)
              </button>

              {/* 3. إرسال عبر واتساب العادي كخيار بديل */}
              <button 
                onClick={() => {
                  const phone = autoActionModal.data.phone || '777112233';
                  const msg = 'تحية طيبة من شركة OpenTik، مرفق لكم إشعار المعاملة رقم ' + autoActionModal.data.id;
                  handleSendWhatsApp(phone, msg, false);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl py-2 font-medium transition flex items-center justify-center gap-2 border border-slate-800 text-[11px]"
              >
                إرسال عبر تطبيق واتساب العادي
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setAutoActionModal(null)} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">
                تم وإنهاء
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
              <button onClick={() => setNewClientModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveNewClient} className="space-y-3 text-xs">
              <input type="text" placeholder="اسم المنشأة أو الشركة" value={newClientForm.name} onChange={e => setNewClientForm({...newClientForm, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" required />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="اسم المسؤول" value={newClientForm.contactPerson} onChange={e => setNewClientForm({...newClientForm, contactPerson: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                <input type="text" placeholder="رقم الهاتف" value={newClientForm.phone} onChange={e => setNewClientForm({...newClientForm, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" required />
              </div>
              <input type="text" placeholder="العنوان (مثال: شارع حدة - صنعاء)" value={newClientForm.address} onChange={e => setNewClientForm({...newClientForm, address: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              <select value={newClientForm.system} onChange={e => setNewClientForm({...newClientForm, system: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white">
                <option value="كاميرات مراقبة وشبكات">كاميرات مراقبة وشبكات</option>
                <option value="طاقة بديلة وانفرتر">طاقة بديلة وانفرتر</option>
                <option value="أنظمة إنذار وتحكم بالدخول">أنظمة إنذار وتحكم بالدخول</option>
                <option value="شبكات مؤسسية وسيرفرات">شبكات مؤسسية وسيرفرات</option>
              </select>
              <textarea placeholder="الأجهزة المركبة (اكتب كل جهاز في سطر)" value={newClientForm.devices} onChange={e => setNewClientForm({...newClientForm, devices: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white h-20" />
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
              <button onClick={() => { setCreatingInvoice(false); setEditingInvoice(null); }} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveInvoice} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">العميل</label>
                  <input type="text" value={editingInvoice ? editingInvoice.client : invoiceForm.client} onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, client: e.target.value}) : setInvoiceForm({...invoiceForm, client: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" required />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الهاتف</label>
                  <input type="text" value={editingInvoice ? editingInvoice.phone : invoiceForm.phone} onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, phone: e.target.value}) : setInvoiceForm({...invoiceForm, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">المنظومة</label>
                  <input type="text" value={editingInvoice ? editingInvoice.system : invoiceForm.system} onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, system: e.target.value}) : setInvoiceForm({...invoiceForm, system: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200">الأصناف والأجهزة والخدمات:</span>
                  <button type="button" onClick={() => {
                    if (editingInvoice) {
                      setEditingInvoice({ ...editingInvoice, items: [...editingInvoice.items, { name: '', qty: 1, price: 0 }] });
                    } else {
                      setInvoiceForm({ ...invoiceForm, items: [...invoiceForm.items, { name: '', qty: 1, price: 0 }] });
                    }
                  }} className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] flex items-center gap-1">
                    <Plus className="w-3 h-3" /> إضافة بند
                  </button>
                </div>

                <div className="space-y-2">
                  {(editingInvoice ? editingInvoice.items : invoiceForm.items).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <input type="text" placeholder="اسم الصنف أو الخدمة" value={item.name} onChange={e => {
                        const updated = [...(editingInvoice ? editingInvoice.items : invoiceForm.items)];
                        updated[idx].name = e.target.value;
                        editingInvoice ? setEditingInvoice({...editingInvoice, items: updated}) : setInvoiceForm({...invoiceForm, items: updated});
                      }} className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-white" required />
                      <input type="number" placeholder="الكمية" value={item.qty} onChange={e => {
                        const updated = [...(editingInvoice ? editingInvoice.items : invoiceForm.items)];
                        updated[idx].qty = Number(e.target.value);
                        editingInvoice ? setEditingInvoice({...editingInvoice, items: updated}) : setInvoiceForm({...invoiceForm, items: updated});
                      }} className="w-16 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono" />
                      <input type="number" placeholder="السعر ($)" value={item.price} onChange={e => {
                        const updated = [...(editingInvoice ? editingInvoice.items : invoiceForm.items)];
                        updated[idx].price = Number(e.target.value);
                        editingInvoice ? setEditingInvoice({...editingInvoice, items: updated}) : setInvoiceForm({...invoiceForm, items: updated});
                      }} className="w-20 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono" />
                      <button type="button" onClick={() => {
                        const list = (editingInvoice ? editingInvoice.items : invoiceForm.items);
                        if (list.length > 1) {
                          const updated = list.filter((_, i) => i !== idx);
                          editingInvoice ? setEditingInvoice({...editingInvoice, items: updated}) : setInvoiceForm({...invoiceForm, items: updated});
                        }
                      }} className="text-rose-400 p-1"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                <div>
                  <label className="text-slate-400 block mb-1">الخصم ($)</label>
                  <input type="number" value={editingInvoice ? editingInvoice.discount : invoiceForm.discount} onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, discount: Number(e.target.value)}) : setInvoiceForm({...invoiceForm, discount: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">المسدد مقدماً ($)</label>
                  <input type="number" value={editingInvoice ? editingInvoice.paid : invoiceForm.paid} onChange={e => editingInvoice ? setEditingInvoice({...editingInvoice, paid: Number(e.target.value)}) : setInvoiceForm({...invoiceForm, paid: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-slate-400 block mb-1">الإجمالي المحسوب</label>
                  <div className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-bold font-mono">
                    {"$" + calculateFinalTotal(editingInvoice || invoiceForm)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => { setCreatingInvoice(false); setEditingInvoice(null); }} className="px-3 py-1.5 bg-slate-800 text-white rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold">حفظ الفاتورة والمعاينة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة إنشاء عرض سعر */}
      {creatingQuotation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-2xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">إنشاء عرض سعر رسمي</h3>
              <button onClick={() => setCreatingQuotation(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveQuotation} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">العميل / المنشأة</label>
                  <input type="text" value={quotationForm.client} onChange={e => setQuotationForm({...quotationForm, client: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" required />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الهاتف</label>
                  <input type="text" value={quotationForm.phone} onChange={e => setQuotationForm({...quotationForm, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">المنظومة المقترحة</label>
                  <input type="text" value={quotationForm.system} onChange={e => setQuotationForm({...quotationForm, system: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200">المواصفات والأسعار:</span>
                  <button type="button" onClick={() => setQuotationForm({ ...quotationForm, items: [...quotationForm.items, { name: '', qty: 1, price: 0 }] })} className="px-2 py-1 bg-amber-600 text-white rounded text-[11px] flex items-center gap-1">
                    <Plus className="w-3 h-3" /> إضافة بند
                  </button>
                </div>
                <div className="space-y-2">
                  {quotationForm.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <input type="text" placeholder="اسم الصنف أو التجهيز" value={item.name} onChange={e => {
                        const updated = [...quotationForm.items];
                        updated[idx].name = e.target.value;
                        setQuotationForm({...quotationForm, items: updated});
                      }} className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-white" required />
                      <input type="number" placeholder="الكمية" value={item.qty} onChange={e => {
                        const updated = [...quotationForm.items];
                        updated[idx].qty = Number(e.target.value);
                        setQuotationForm({...quotationForm, items: updated});
                      }} className="w-16 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono" />
                      <input type="number" placeholder="السعر ($)" value={item.price} onChange={e => {
                        const updated = [...quotationForm.items];
                        updated[idx].price = Number(e.target.value);
                        setQuotationForm({...quotationForm, items: updated});
                      }} className="w-20 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono" />
                      <button type="button" onClick={() => {
                        if (quotationForm.items.length > 1) {
                          setQuotationForm({ ...quotationForm, items: quotationForm.items.filter((_, i) => i !== idx) });
                        }
                      }} className="text-rose-400 p-1"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setCreatingQuotation(false)} className="px-3 py-1.5 bg-slate-800 text-white rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold">حفظ عرض السعر والمعاينة</button>
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
              <button onClick={() => setCreatingVoucher(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveVoucher} className="space-y-3 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">العميل:</span>
                <strong className="text-white block mt-0.5">{creatingVoucher.client}</strong>
                <span className="text-[10px] text-blue-400">فاتورة: {creatingVoucher.id}</span>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">المبلغ المقبوض ($)</label>
                <input type="number" value={voucherForm.amount} onChange={e => setVoucherForm({...voucherForm, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm" required />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">طريقة القبض</label>
                <select value={voucherForm.method} onChange={e => setVoucherForm({...voucherForm, method: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white">
                  <option value="نقداً">نقداً</option>
                  <option value="تحويل بنكي">تحويل بنكي</option>
                  <option value="شيك مصرفي">شيك مصرفي</option>
                </select>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">البيان</label>
                <input type="text" value={voucherForm.notes} onChange={e => setVoucherForm({...voucherForm, notes: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setCreatingVoucher(null)} className="px-3 py-1.5 bg-slate-800 text-white rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold">إصدار السند والمعاينة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تفاصيل العميل */}
      {viewClientDetails && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-lg w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">{viewClientDetails.name}</h3>
                <span className="text-xs text-blue-400 font-mono">{viewClientDetails.id}</span>
              </div>
              <button onClick={() => setViewClientDetails(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div><span className="text-slate-400">المسؤول: </span><strong className="text-white">{viewClientDetails.contactPerson}</strong></div>
                <div><span className="text-slate-400">الهاتف: </span><strong className="text-white font-mono">{viewClientDetails.phone}</strong></div>
                <div className="col-span-2"><span className="text-slate-400">العنوان: </span><strong className="text-white">{viewClientDetails.address}</strong></div>
                <div><span className="text-slate-400">الضمان: </span><strong className="text-emerald-400">{viewClientDetails.warrantyExpiry}</strong></div>
                <div><span className="text-slate-400">الرصيد: </span><strong className="text-rose-400 font-mono">{formatMoney(viewClientDetails.balance)}</strong></div>
              </div>
              <div>
                <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-400" /> قائمة الأجهزة المركبة:
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
              <button onClick={() => setViewClientDetails(null)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">إغلاق</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
