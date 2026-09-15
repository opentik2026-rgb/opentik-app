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
  Trash2,
  Download, 
  Search, 
  CheckCircle, 
  CheckCircle2,
  X, 
  Eye, 
  DollarSign, 
  Layers, 
  MessageCircle, 
  Settings, 
  FileCheck, 
  Share2, 
  Save,
  Globe,
  MapPin,
  FileSpreadsheet,
  Building2,
  PhoneCall,
  UserCheck,
  CreditCard,
  RotateCcw,
  Printer,
  Copy
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settingsSubTab, setSettingsSubTab] = useState('company');
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [toast, setToast] = useState(null);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // إعدادات النظام الشاملة
  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('opentik_settings_final');
    return saved ? JSON.parse(saved) : {
      companyNameAr: 'شركة OpenTik للأنظمة الذكية',
      companyNameEn: 'OpenTik Smart Systems Enterprise',
      taglineAr: 'كاميرات مراقبة - شبكات مؤسسية - أنظمة أمان وبصمة - طاقة بديلة - عقود SLA',
      taglineEn: 'CCTV Surveillance, Enterprise IT, Biometrics, Solar & SLA Contracts',
      crNumber: '10452-C',
      taxNumber: 'VAT-3004892100',
      phone: '777112233',
      email: 'info@opentik-systems.com',
      website: 'www.opentik-systems.com',
      addressAr: 'شارع الزبيري - المركز التقني - صنعاء',
      defaultTaxRate: 0,
      exchangeRates: { USD: 1, EUR: 0.92, SAR: 3.75, AED: 3.67, YER: 535 },
      bankAccounts: [
        { id: '1', bank: 'بنك الكريمي الإسلامي', account: '3001245678', holder: 'شركة OpenTik' },
        { id: '2', bank: 'بنك التضامن الإسلامي', account: '1024558', holder: 'شركة OpenTik' },
        { id: '3', bank: 'بنك القطيبي الإسلامي', account: '7789012', holder: 'OpenTik Systems' }
      ],
      engineers: [
        { id: 'ENG-01', name: 'م. سامي الحمادي', phone: '771122334', specialty: 'كاميرات مراقبة وشبكات' },
        { id: 'ENG-02', name: 'م. أحمد الخولاني', phone: '772233445', specialty: 'طاقة بديلة وانفرتر' }
      ],
      defaultWarrantyAr: 'ضمان رسمي معتمد لمدة عام كامل يشمل الاستبدال الفوري وقطع الغيار الأصلية ضد عيوب المصنع.'
    };
  });

  // قاعدة بيانات العملاء
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('opentik_clients_final');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'CL-101', 
        name: 'شركة النجم الذهبي للتجارة', 
        contactPerson: 'أ. محمد العريقي',
        phone: '777112233', 
        address: 'شارع الزبيري - صنعاء',
        mapCoordinates: '15.3524,44.2075',
        system: 'كاميرات مراقبة وشبكات', 
        warrantyExpiry: '2027-09-15',
        warrantyStatus: 'ساري',
        balance: 1450,
        installedDevices: ['8x Dahua 5MP IP AI Cameras', '1x NVR 16-CH 4K Pro', '1x 16Port PoE Gigabit Switch']
      }
    ];
  });

  // الفواتير
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('opentik_invoices_final');
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
          { name: 'جهاز تسجيل NVR 16CH مع قرص 4TB Purple', qty: 1, price: 320 }
        ],
        paid: 500,
        notes: 'الضمان لمدة عام كامل يشمل القطع والاستبدال الفوري.'
      }
    ];
  });

  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem('opentik_quotations_final');
    return saved ? JSON.parse(saved) : [];
  });

  const [vouchers, setVouchers] = useState(() => {
    const saved = localStorage.getItem('opentik_vouchers_final');
    return saved ? JSON.parse(saved) : [
      { id: 'RV-201', invoiceId: 'INV-1001', client: 'شركة النجم الذهبي للتجارة', phone: '777112233', amount: 500, date: '2026-09-10', method: 'تحويل بنكي', notes: 'دفعة أولى مقدمة' }
    ];
  });

  const packages = [
    {
      id: 'PKG-01',
      title: 'منظومة المراقبة الذكية الفائقة (IP 4K AI)',
      category: 'كاميرات المراقبة',
      priceUSD: 1350,
      warranty: 'عامان ضمان استبدال',
      items: [
        { name: 'كاميرا شبكية IP بدقة 4K مع خاصية التعرف الذكي', qty: 8, price: 85 },
        { name: 'جهاز تسجيل NVR 16CH مع قرص 6TB WD Purple', qty: 1, price: 420 },
        { name: 'سويتش شبكة 16Port PoE Gigabit عالي التحمل', qty: 1, price: 150 },
        { name: 'كابينة وتمديدات وخدمة التركيب والبرمجة', qty: 1, price: 100 }
      ]
    }
  ];

  // الحفظ التلقائي
  useEffect(() => { localStorage.setItem('opentik_settings_final', JSON.stringify(systemSettings)); }, [systemSettings]);
  useEffect(() => { localStorage.setItem('opentik_clients_final', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('opentik_invoices_final', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('opentik_quotations_final', JSON.stringify(quotations)); }, [quotations]);
  useEffect(() => { localStorage.setItem('opentik_vouchers_final', JSON.stringify(vouchers)); }, [vouchers]);

  // النوافذ المنبثقة
  const [clientModal, setClientModal] = useState({ open: false, mode: 'create', data: null });
  const [invoiceModal, setInvoiceModal] = useState({ open: false, mode: 'create', data: null });
  const [quotationModal, setQuotationModal] = useState({ open: false, mode: 'create', data: null });
  const [voucherModal, setVoucherModal] = useState({ open: false, data: null });
  const [viewClientDetails, setViewClientDetails] = useState(null);
  const [statementClient, setStatementClient] = useState(null);
  const [autoActionModal, setAutoActionModal] = useState(null);
  const [newBankModal, setNewBankModal] = useState(false);

  // النماذج
  const [clientFormData, setClientFormData] = useState({ name: '', contactPerson: '', phone: '', address: '', mapCoordinates: '15.3524,44.2075', system: 'كاميرات مراقبة وشبكات', warrantyExpiry: '2027-09-15', devicesText: '' });
  const [invoiceFormData, setInvoiceFormData] = useState({ id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15', items: [{ name: '', qty: 1, price: 0 }], taxRate: 0, discount: 0, paid: 0, notes: '' });
  const [quotationFormData, setQuotationFormData] = useState({ id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15', validUntil: '2026-10-01', items: [{ name: '', qty: 1, price: 0 }], notes: '' });
  const [voucherFormData, setVoucherFormData] = useState({ amount: '', method: 'نقداً', notes: '' });
  const [bankFormData, setBankFormData] = useState({ bank: '', account: '', holder: 'شركة OpenTik' });

  // الحسابات
  const calculateSubtotal = (items) => (items || []).reduce((acc, item) => acc + ((Number(item.qty) || 0) * (Number(item.price) || 0)), 0);
  const calculateFinalTotal = (inv) => {
    if (!inv) return 0;
    const sub = calculateSubtotal(inv.items);
    const afterDiscount = sub - (Number(inv.discount) || 0);
    const tax = afterDiscount * ((Number(inv.taxRate) || 0) / 100);
    return afterDiscount + tax;
  };

  const totalSalesUSD = invoices.reduce((acc, inv) => acc + calculateFinalTotal(inv), 0);
  const totalCollectedUSD = vouchers.reduce((acc, v) => acc + (Number(v.amount) || 0), 0);
  const totalOutstandingUSD = totalSalesUSD - totalCollectedUSD;
  const collectionRate = totalSalesUSD > 0 ? Math.round((totalCollectedUSD / totalSalesUSD) * 100) : 0;

  const formatMoney = (amountUSD) => {
    const rate = systemSettings?.exchangeRates?.[currency] || 1;
    const converted = Math.round((amountUSD || 0) * rate);
    const symbols = { USD: '$', EUR: '€', SAR: 'ر.س', AED: 'د.إ', YER: 'ريال' };
    return converted.toLocaleString() + ' ' + (symbols[currency] || currency);
  };

  // ================= الإجراءات الأساسية =================
  const handleDirectWhatsApp = (phone, text) => {
    const rawPhone = (phone || '').replace(/[^0-9]/g, '');
    const fullPhone = rawPhone.startsWith('967') ? rawPhone : ('967' + rawPhone);
    window.location.href = "whatsapp://send?phone=" + fullPhone + "&text=" + encodeURIComponent(text);
  };

  const handleCopyInvoiceText = (doc) => {
    const tot = calculateFinalTotal(doc);
    const rem = tot - (doc.paid || 0);
    const text = `رقم المستند: ${doc.id}\nالعميل: ${doc.client}\nالنظام: ${doc.system}\nالإجمالي: $${tot}\nالمسدد: $${doc.paid || 0}\nالمتبقي: $${rem}\n${systemSettings.companyNameAr}`;
    navigator.clipboard.writeText(text);
    showNotification('تم نسخ تفاصيل الفاتورة 📋');
  };

  // ================= إدارة العملاء =================
  const handleSaveClientSubmit = (e) => {
    e.preventDefault();
    if (!clientFormData.name || !clientFormData.phone) return;
    const devicesList = (clientFormData.devicesText || '').split('\n').filter(d => d.trim().length > 0);
    if (clientModal.mode === 'create') {
      const newClient = {
        id: "CL-" + (100 + clients.length + 1),
        name: clientFormData.name,
        contactPerson: clientFormData.contactPerson || 'المسؤول',
        phone: clientFormData.phone,
        address: clientFormData.address || 'صنعاء',
        mapCoordinates: clientFormData.mapCoordinates || '15.3524,44.2075',
        system: clientFormData.system || 'كاميرات مراقبة وشبكات',
        warrantyExpiry: clientFormData.warrantyExpiry || '2027-09-15',
        warrantyStatus: 'ساري',
        balance: 0,
        installedDevices: devicesList.length > 0 ? devicesList : ['منظومة ذكية متكاملة']
      };
      setClients([newClient, ...clients]);
      showNotification('تمت إضافة العميل بنجاح ✔️');
    } else {
      setClients(clients.map(c => c.id === clientModal.data.id ? { ...c, ...clientFormData, installedDevices: devicesList } : c));
      showNotification('تم تحديث بيانات العميل ✔️');
    }
    setClientModal({ open: false, mode: 'create', data: null });
  };

  // ================= إدارة الفواتير =================
  const handleSaveInvoiceSubmit = (e) => {
    e.preventDefault();
    if (!invoiceFormData.client) return;
    if (invoiceModal.mode === 'create') {
      const newInv = { ...invoiceFormData, id: invoiceFormData.id || ("INV-" + (1000 + invoices.length + 1)) };
      setInvoices([newInv, ...invoices]);
      const due = calculateFinalTotal(newInv) - (newInv.paid || 0);
      setClients(clients.map(c => c.name === newInv.client ? { ...c, balance: (c.balance || 0) + due } : c));
      setInvoiceModal({ open: false, mode: 'create', data: null });
      setAutoActionModal({ type: 'invoice', data: newInv });
      showNotification('تم حفظ الفاتورة بنجاح ✔️');
    } else {
      setInvoices(invoices.map(i => i.id === invoiceModal.data.id ? invoiceFormData : i));
      setInvoiceModal({ open: false, mode: 'edit', data: null });
      setAutoActionModal({ type: 'invoice', data: invoiceFormData });
      showNotification('تم تحديث الفاتورة بنجاح ✔️');
    }
  };

  // ================= إدارة السندات وعروض الأسعار =================
  const handleSaveVoucherSubmit = (e) => {
    e.preventDefault();
    const amt = Number(voucherFormData.amount);
    const targetInv = voucherModal.data;
    const newVoucher = { id: "RV-" + (200 + vouchers.length + 1), invoiceId: targetInv.id, client: targetInv.client, phone: targetInv.phone, amount: amt, date: new Date().toISOString().split('T')[0], method: voucherFormData.method, notes: voucherFormData.notes || ('سداد من فاتورة ' + targetInv.id) };
    setVouchers([newVoucher, ...vouchers]);
    setInvoices(invoices.map(i => i.id === targetInv.id ? { ...i, paid: (i.paid || 0) + amt } : i));
    setClients(clients.map(c => c.name === targetInv.client ? { ...c, balance: Math.max(0, (c.balance || 0) - amt) } : c));
    setVoucherModal({ open: false, data: null });
    setAutoActionModal({ type: 'voucher', data: newVoucher });
    showNotification('تم إصدار سند القبض 💵');
  };

  const handleSaveQuotationSubmit = (e) => {
    e.preventDefault();
    const newQt = { ...quotationFormData, id: quotationFormData.id || ("QT-" + (300 + quotations.length + 1)) };
    setQuotations([newQt, ...quotations]);
    setQuotationModal({ open: false, mode: 'create', data: null });
    setAutoActionModal({ type: 'quotation', data: newQt });
    showNotification('تم حفظ عرض السعر 📋');
  };

  const filteredClients = clients.filter(c => (c.name || '').includes(searchTerm) || (c.phone || '').includes(searchTerm));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      
      {toast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* الشريط العلوي */}
      <header className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-lg print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
              OP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-white">{systemSettings.companyNameAr}</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">Stable v5.0</span>
              </div>
              <p className="text-[10px] text-slate-400">{systemSettings.taglineAr}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-emerald-400 focus:outline-none">
              <option value="USD">USD ($)</option>
              <option value="YER">YER (ريال)</option>
              <option value="SAR">SAR (ر.س)</option>
            </select>
            <button onClick={() => setActiveTab('settings')} className={"p-2 rounded-lg border transition " + (activeTab === 'settings' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300')}>
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* شريط التنقل */}
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          <button onClick={() => setActiveTab('dashboard')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}><Shield className="w-3.5 h-3.5" /> لوحة التحكم</button>
          <button onClick={() => setActiveTab('clients')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'clients' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}><Users className="w-3.5 h-3.5" /> العملاء ({clients.length})</button>
          <button onClick={() => setActiveTab('invoices')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'invoices' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}><FileText className="w-3.5 h-3.5" /> الفواتير ({invoices.length})</button>
          <button onClick={() => setActiveTab('vouchers')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'vouchers' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}><DollarSign className="w-3.5 h-3.5" /> سندات القبض ({vouchers.length})</button>
        </nav>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-4 flex-1 max-w-6xl w-full mx-auto space-y-5 print:hidden">
        
        {/* ================= لوحة التحكم ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">إجمالي المبيعات</span>
                <h3 className="text-lg font-black text-white mt-1 font-mono">{formatMoney(totalSalesUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">المحصل الفعلي</span>
                <h3 className="text-lg font-black text-emerald-400 mt-1 font-mono">{formatMoney(totalCollectedUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">الديون المتبقية</span>
                <h3 className="text-lg font-black text-rose-400 mt-1 font-mono">{formatMoney(totalOutstandingUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">المنشآت النشطة</span>
                <h3 className="text-lg font-black text-cyan-400 mt-1 font-mono">{clients.length}</h3>
              </div>
            </div>
          </div>
        )}

        {/* ================= العملاء ================= */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                <input type="text" placeholder="ابحث باسم العميل..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-3 py-2 text-xs text-white" />
              </div>
              <button onClick={handleOpenCreateClient} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow">
                <Plus className="w-4 h-4" /> إضافة عميل
              </button>
            </div>

            <div className="grid gap-3">
              {filteredClients.map(c => (
                <div key={c.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">الهاتف: {c.phone} | النظام: {c.system}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <a href={`https://maps.google.com/?q=${c.mapCoordinates}`} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 text-amber-400 rounded-lg"><MapPin className="w-4 h-4" /></a>
                    <button onClick={() => handleDirectWhatsApp(c.phone, 'مرحباً ' + c.name)} className="p-2 bg-emerald-950 text-emerald-400 rounded-lg"><MessageCircle className="w-4 h-4" /></button>
                    <button onClick={() => setStatementClient(c)} className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold"><FileText className="w-3.5 h-3.5 inline mr-1" /> كشف حساب</button>
                    <button onClick={() => handleOpenEditClient(c)} className="p-1.5 bg-slate-800 text-slate-200 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteClient(c.id)} className="p-1.5 bg-rose-950/60 text-rose-400 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= الفواتير ================= */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div><h3 className="text-sm font-bold text-white">فواتير التوريد والتركيب</h3></div>
              <button onClick={() => handleOpenCreateInvoice()} className="bg-blue-600 text-white rounded-lg px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow">
                <Plus className="w-4 h-4" /> فاتورة جديدة
              </button>
            </div>
            <div className="grid gap-3">
              {invoices.map(inv => {
                const finalTotal = calculateFinalTotal(inv);
                const remaining = finalTotal - (inv.paid || 0);
                return (
                  <div key={inv.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
                      <div><h4 className="font-bold text-white">{inv.client}</h4><p className="text-xs text-slate-400 mt-1">{inv.id} | {inv.date}</p></div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setAutoActionModal({ type: 'invoice', data: inv })} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold"><Eye className="w-3.5 h-3.5 inline mr-1" /> معاينة ومشاركة</button>
                        <button onClick={() => handleOpenCreateVoucher(inv)} className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"><DollarSign className="w-3.5 h-3.5 inline mr-1" /> سند قبض</button>
                        <button onClick={() => handleDeleteInvoice(inv.id)} className="p-1.5 bg-rose-950/60 text-rose-400 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= الإعدادات ================= */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
            <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2">الإعدادات العامة للشركة</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className="text-slate-400 block mb-1">اسم المنشأة</label><input type="text" value={systemSettings.companyNameAr} onChange={e => setSystemSettings({...systemSettings, companyNameAr: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" /></div>
              <div><label className="text-slate-400 block mb-1">الرقم الضريبي</label><input type="text" value={systemSettings.taxNumber} onChange={e => setSystemSettings({...systemSettings, taxNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" /></div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => showNotification('تم الحفظ 💾')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold"><Save className="w-4 h-4 inline mr-1" /> حفظ الإعدادات</button>
            </div>
          </div>
        )}

      </main>

      {/* ================= النوافذ المنبثقة التفاعلية (Modals) ================= */}

      {/* 1. نافذة إضافة عميل */}
      {clientModal.open && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">إضافة عميل جديد</h3>
              <button onClick={() => setClientModal({ open: false, mode: 'create', data: null })} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveClientSubmit} className="space-y-3 text-xs">
              <input type="text" placeholder="اسم المنشأة" value={clientFormData.name} onChange={e => setClientFormData({...clientFormData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" required />
              <input type="text" placeholder="رقم الهاتف" value={clientFormData.phone} onChange={e => setClientFormData({...clientFormData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" required />
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setClientModal({ open: false, mode: 'create', data: null })} className="px-4 py-2 bg-slate-800 text-white rounded-xl">إلغاء</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold">حفظ العميل</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. نافذة إضافة فاتورة */}
      {invoiceModal.open && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">إنشاء فاتورة توريد</h3>
              <button onClick={() => setInvoiceModal({ open: false, mode: 'create', data: null })} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveInvoiceSubmit} className="space-y-3 text-xs">
              <div className="grid sm:grid-cols-2 gap-2">
                <input type="text" placeholder="اسم العميل" value={invoiceFormData.client} onChange={e => setInvoiceFormData({...invoiceFormData, client: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" required />
                <input type="text" placeholder="الهاتف" value={invoiceFormData.phone} onChange={e => setInvoiceFormData({...invoiceFormData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center"><span className="text-white font-bold">الأصناف:</span> <button type="button" onClick={() => setInvoiceFormData({ ...invoiceFormData, items: [...invoiceFormData.items, { name: '', qty: 1, price: 0 }] })} className="bg-blue-600 text-white px-2 py-1 rounded">إضافة صنف</button></div>
                {invoiceFormData.items.map((it, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" placeholder="الاسم" value={it.name} onChange={e => { const list = [...invoiceFormData.items]; list[idx].name = e.target.value; setInvoiceFormData({...invoiceFormData, items: list}); }} className="flex-1 bg-slate-950 border border-slate-700 rounded p-1.5 text-white" required />
                    <input type="number" placeholder="الكمية" value={it.qty} onChange={e => { const list = [...invoiceFormData.items]; list[idx].qty = Number(e.target.value); setInvoiceFormData({...invoiceFormData, items: list}); }} className="w-16 bg-slate-950 border border-slate-700 rounded p-1.5 text-white text-center font-mono" />
                    <input type="number" placeholder="السعر" value={it.price} onChange={e => { const list = [...invoiceFormData.items]; list[idx].price = Number(e.target.value); setInvoiceFormData({...invoiceFormData, items: list}); }} className="w-20 bg-slate-950 border border-slate-700 rounded p-1.5 text-white text-center font-mono" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold">حفظ الفاتورة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. نافذة المعاينة والطباعة (بدون شاشة زرقاء) */}
      {autoActionModal && autoActionModal.data && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-3 z-50 overflow-y-auto print:bg-white print:p-0">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full p-5 space-y-4 max-h-[92vh] overflow-y-auto shadow-2xl print:shadow-none print:border-none print:bg-white">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 print:hidden">
              <h3 className="font-bold text-white text-sm">معاينة المستند: {autoActionModal.data.id}</h3>
              <button onClick={() => setAutoActionModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {/* الفاتورة الفعلية التي ستطبع */}
            <div className="bg-white text-slate-900 p-6 rounded-xl shadow font-sans text-xs border border-slate-200">
              <div className="flex justify-between border-b-2 border-blue-600 pb-3 mb-4">
                <div>
                  <h2 className="text-lg font-black text-blue-700">{systemSettings.companyNameAr}</h2>
                  <p className="text-[10px] text-slate-600">الرقم الضريبي: {systemSettings.taxNumber}</p>
                </div>
                <div className="text-left font-mono">
                  <span className="font-bold text-sm text-slate-800 block">فاتورة ضريبية رسمية</span>
                  <span className="text-blue-600 font-bold">{autoActionModal.data.id}</span>
                </div>
              </div>
              <p className="font-bold mb-2">العميل: {autoActionModal.data.client}</p>
              {autoActionModal.data.items && (
                <table className="w-full text-right border-collapse mb-4">
                  <thead><tr className="bg-blue-600 text-white"><th className="p-2 border">الصنف</th><th className="p-2 border">الكمية</th><th className="p-2 border">السعر</th><th className="p-2 border">الإجمالي</th></tr></thead>
                  <tbody>
                    {autoActionModal.data.items.map((it, idx) => (
                      <tr key={idx}><td className="p-2 border">{it.name}</td><td className="p-2 border">{it.qty}</td><td className="p-2 border">${it.price}</td><td className="p-2 border font-bold">${it.qty * it.price}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
              {autoActionModal.type === 'invoice' && (
                <div className="font-bold text-blue-700 text-base">الإجمالي المستحق: ${calculateFinalTotal(autoActionModal.data)}</div>
              )}
            </div>

            {/* أزرار الإجراءات المستقرة */}
            <div className="grid sm:grid-cols-3 gap-2 pt-1 text-xs print:hidden">
              <button 
                onClick={() => handleDirectWhatsApp(autoActionModal.data.phone, `مرحباً بك، فاتورة رقم: ${autoActionModal.data.id} بإجمالي $${calculateFinalTotal(autoActionModal.data)}`)}
                className="bg-emerald-600 text-white rounded-xl py-2.5 font-bold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" /> إرسال عبر واتساب
              </button>
              <button 
                onClick={() => handleCopyInvoiceText(autoActionModal.data)}
                className="bg-slate-800 text-white border border-slate-700 rounded-xl py-2.5 font-bold flex items-center justify-center gap-1.5"
              >
                <Copy className="w-4 h-4 text-cyan-400" /> نسخ التفاصيل
              </button>
              <button 
                onClick={() => window.print()}
                className="bg-blue-600 text-white rounded-xl py-2.5 font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> طباعة / حفظ PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
