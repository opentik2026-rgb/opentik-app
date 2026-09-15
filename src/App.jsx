import React, { useState, useEffect } from 'react';
import { 
  Shield, Camera, Wifi, Sun, Users, FileText, Wrench, Plus, 
  Edit3, Trash2, Search, CheckCircle2, X, Eye, DollarSign, 
  Layers, MessageCircle, Settings, FileCheck, Save, MapPin, 
  Building2, UserCheck, CreditCard, RotateCcw, Printer, Copy,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settingsSubTab, setSettingsSubTab] = useState('company');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  // إشعار منبثق
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // 1. إعدادات النظام المكتملة
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('opentik_pro_settings');
    return saved ? JSON.parse(saved) : {
      companyName: 'شركة OpenTik للأنظمة الذكية',
      tagline: 'أنظمة أمنية - شبكات - طاقة بديلة - عقود صيانة',
      taxNumber: '3004892100',
      crNumber: '10452-C',
      phone: '777112233',
      email: 'info@opentik.com',
      address: 'صنعاء - شارع الزبيري',
      defaultWarranty: 'الضمان ساري لمدة عام كامل شامل الاستبدال للقطع المعيبة مصنعياً.',
      taxRate: 0,
      banks: [
        { id: '1', bankName: 'بنك الكريمي', account: '3001245678' },
        { id: '2', bankName: 'بنك التضامن', account: '1024558' }
      ]
    };
  });

  // 2. قاعدة البيانات
  const [clients, setClients] = useState(() => JSON.parse(localStorage.getItem('opentik_pro_clients')) || []);
  const [invoices, setInvoices] = useState(() => JSON.parse(localStorage.getItem('opentik_pro_invoices')) || []);
  const [quotations, setQuotations] = useState(() => JSON.parse(localStorage.getItem('opentik_pro_quotations')) || []);
  const [vouchers, setVouchers] = useState(() => JSON.parse(localStorage.getItem('opentik_pro_vouchers')) || []);

  // باقات النظام
  const packages = [
    { id: 'PKG-01', title: 'منظومة مراقبة IP 4K AI', category: 'كاميرات المراقبة', price: 1350, items: [{ name: 'كاميرا IP 4K ذكية', qty: 8, price: 85 }, { name: 'جهاز تسجيل NVR 16CH', qty: 1, price: 420 }, { name: 'سويتش شبكة 16Port PoE', qty: 1, price: 150 }, { name: 'تركيب وتمديد', qty: 1, price: 100 }] },
    { id: 'PKG-02', title: 'محطة طاقة بديلة 10KW', category: 'الطاقة البديلة', price: 4900, items: [{ name: 'انفرتر Deye 10KW', qty: 1, price: 1900 }, { name: 'بطارية ليثيوم 10KWh', qty: 2, price: 1300 }, { name: 'قواطع وحماية', qty: 1, price: 400 }] },
    { id: 'PKG-03', title: 'شبكة مؤسسية WiFi 6', category: 'الشبكات', price: 1150, items: [{ name: 'راوتر MikroTik', qty: 1, price: 280 }, { name: 'نقاط وصول WiFi 6', qty: 4, price: 140 }, { name: 'سويتش إدارة PoE', qty: 1, price: 310 }] }
  ];

  // الحفظ التلقائي
  useEffect(() => localStorage.setItem('opentik_pro_settings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('opentik_pro_clients', JSON.stringify(clients)), [clients]);
  useEffect(() => localStorage.setItem('opentik_pro_invoices', JSON.stringify(invoices)), [invoices]);
  useEffect(() => localStorage.setItem('opentik_pro_quotations', JSON.stringify(quotations)), [quotations]);
  useEffect(() => localStorage.setItem('opentik_pro_vouchers', JSON.stringify(vouchers)), [vouchers]);

  // الحالات والنوافذ المنبثقة
  const [modal, setModal] = useState(null); // 'client', 'invoice', 'quotation', 'voucher'
  const [editData, setEditData] = useState(null);
  const [printDoc, setPrintDoc] = useState(null); // Document to print

  // النماذج
  const [formData, setFormData] = useState({});

  // الحسابات
  const calcSubtotal = (items) => (items || []).reduce((acc, it) => acc + ((Number(it.qty)||0) * (Number(it.price)||0)), 0);
  const calcTotal = (doc) => {
    if(!doc) return 0;
    const sub = calcSubtotal(doc.items);
    const afterDisc = sub - (Number(doc.discount)||0);
    return afterDisc + (afterDisc * ((Number(settings.taxRate)||0)/100));
  };

  const totalSales = invoices.reduce((acc, inv) => acc + calcTotal(inv), 0);
  const totalCollected = vouchers.reduce((acc, v) => acc + (Number(v.amount)||0), 0);
  const collectionRate = totalSales > 0 ? Math.round((totalCollected / totalSales) * 100) : 0;

  // الإجراءات
  const handleWhatsApp = (phone, text) => {
    const raw = (phone || '').replace(/[^0-9]/g, '');
    const num = raw.startsWith('967') ? raw : ('967' + raw);
    window.location.href = `whatsapp://send?phone=${num}&text=${encodeURIComponent(text)}`;
  };

  const handlePrint = (doc, type) => {
    setPrintDoc({ ...doc, docType: type });
    showToast('جاري تجهيز المستند للطباعة/الحفظ كـ PDF...');
    setTimeout(() => window.print(), 500);
  };

  // فتح نموذج عميل
  const openClientModal = (client = null) => {
    if (client) {
      setFormData({ ...client, devicesText: (client.devices || []).join('\n') });
      setEditData(client);
    } else {
      setFormData({ name: '', phone: '', address: '', system: 'أنظمة ذكية', warrantyExpiry: '', devicesText: '' });
      setEditData(null);
    }
    setModal('client');
  };

  const saveClient = (e) => {
    e.preventDefault();
    const devs = (formData.devicesText || '').split('\n').filter(d => d.trim());
    if (editData) {
      setClients(clients.map(c => c.id === editData.id ? { ...formData, devices: devs } : c));
      showToast('تم تحديث بيانات العميل');
    } else {
      const newClient = { ...formData, id: 'CL-' + Date.now(), devices: devs, balance: 0 };
      setClients([newClient, ...clients]);
      showToast('تمت إضافة العميل بنجاح');
    }
    setModal(null);
  };

  // فتح نموذج فاتورة
  const openInvoiceModal = (inv = null) => {
    if (inv) {
      setFormData(JSON.parse(JSON.stringify(inv)));
      setEditData(inv);
    } else {
      const defClient = clients[0] || {};
      setFormData({
        id: 'INV-' + Math.floor(Math.random() * 10000), client: defClient.name || '', phone: defClient.phone || '',
        system: defClient.system || '', date: new Date().toISOString().split('T')[0], items: [{ name: '', qty: 1, price: 0 }],
        discount: 0, paid: 0, notes: settings.defaultWarranty
      });
      setEditData(null);
    }
    setModal('invoice');
  };

  const saveInvoice = (e) => {
    e.preventDefault();
    if (editData) {
      setInvoices(invoices.map(i => i.id === editData.id ? formData : i));
      showToast('تم تحديث الفاتورة');
    } else {
      setInvoices([formData, ...invoices]);
      // تحديث رصيد العميل
      const due = calcTotal(formData) - Number(formData.paid||0);
      setClients(clients.map(c => c.name === formData.client ? { ...c, balance: (c.balance||0) + due } : c));
      showToast('تم إنشاء الفاتورة بنجاح');
    }
    setModal(null);
    handlePrint(formData, 'فاتورة ضريبية رسمية');
  };

  // فتح نموذج عرض سعر
  const openQuotationModal = () => {
    const defClient = clients[0] || {};
    setFormData({
      id: 'QT-' + Math.floor(Math.random() * 10000), client: defClient.name || '', phone: defClient.phone || '',
      system: defClient.system || '', date: new Date().toISOString().split('T')[0], items: [{ name: '', qty: 1, price: 0 }],
      notes: 'عرض السعر ساري لمدة 15 يوماً.'
    });
    setModal('quotation');
  };

  const saveQuotation = (e) => {
    e.preventDefault();
    setQuotations([formData, ...quotations]);
    setModal(null);
    handlePrint(formData, 'عرض سعر معتمد (Quotation)');
    showToast('تم إنشاء عرض السعر');
  };

  // فتح نموذج سند قبض
  const openVoucherModal = (inv) => {
    const due = calcTotal(inv) - (inv.paid || 0);
    setFormData({
      invoiceId: inv.id, client: inv.client, phone: inv.phone, amount: due > 0 ? due : '',
      method: 'نقداً', notes: 'دفعة من حساب فاتورة ' + inv.id
    });
    setModal('voucher');
  };

  const saveVoucher = (e) => {
    e.preventDefault();
    const amt = Number(formData.amount);
    const newVoucher = { id: 'RV-' + Math.floor(Math.random()*10000), date: new Date().toISOString().split('T')[0], ...formData };
    
    setVouchers([newVoucher, ...vouchers]);
    setInvoices(invoices.map(i => i.id === formData.invoiceId ? { ...i, paid: (i.paid||0) + amt } : i));
    setClients(clients.map(c => c.name === formData.client ? { ...c, balance: Math.max(0, (c.balance||0) - amt) } : c));
    
    setModal(null);
    handlePrint(newVoucher, 'سند قبض مالي');
    showToast('تم إصدار سند القبض بنجاح');
  };

  // تحويل الباقات
  const convertPackage = (pkg, type) => {
    const defClient = clients[0] || {};
    setFormData({
      id: (type==='inv' ? 'INV-' : 'QT-') + Math.floor(Math.random() * 10000),
      client: defClient.name || '', phone: defClient.phone || '', system: pkg.category,
      date: new Date().toISOString().split('T')[0], items: JSON.parse(JSON.stringify(pkg.items)),
      discount: 0, paid: 0, notes: type==='inv' ? settings.defaultWarranty : 'عرض سعر ساري لمدة 15 يوماً'
    });
    setEditData(null);
    setModal(type === 'inv' ? 'invoice' : 'quotation');
  };

  const deleteRecord = (list, setList, id, msg) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      setList(list.filter(x => x.id !== id));
      showToast(msg);
    }
  };

  const filterList = (list) => list.filter(item => 
    (item.name || item.client || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.phone || '').includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 rtl" dir="rtl">
      
      {/* التنبيهات الذكية */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-2xl border border-blue-400 flex items-center gap-2 text-xs font-bold animate-pulse print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* ================= الشريط العلوي الفخم ================= */}
      <header className="bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-lg print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-black text-xl text-white shadow-lg">
              OP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-white truncate max-w-[180px]">{settings.companyName}</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">Pro v6.0</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{settings.tagline}</p>
            </div>
          </div>
          
          <button onClick={() => setActiveTab('settings')} className={"p-2 rounded-lg border transition " + (activeTab === 'settings' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300')}>
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* شريط الأقسام السريع */}
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Shield className="w-4 h-4" /> المنصة</button>
          <button onClick={() => setActiveTab('clients')} className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${activeTab === 'clients' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Users className="w-4 h-4" /> العملاء</button>
          <button onClick={() => setActiveTab('invoices')} className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${activeTab === 'invoices' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><FileText className="w-4 h-4" /> الفواتير</button>
          <button onClick={() => setActiveTab('quotations')} className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${activeTab === 'quotations' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><FileCheck className="w-4 h-4" /> عروض أسعار</button>
          <button onClick={() => setActiveTab('vouchers')} className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${activeTab === 'vouchers' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><DollarSign className="w-4 h-4" /> سندات قبض</button>
          <button onClick={() => setActiveTab('packages')} className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${activeTab === 'packages' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Layers className="w-4 h-4" /> الكتالوج</button>
        </nav>
      </header>

      {/* ================= محتوى التطبيق ================= */}
      <main className="p-4 flex-1 max-w-6xl w-full mx-auto space-y-5 print:hidden">
        
        {/* 1. لوحة التحكم */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-slate-700 shadow-lg">
                <span className="text-xs text-slate-400">إجمالي المبيعات</span>
                <h3 className="text-xl font-black text-white mt-1 font-mono">${totalSales.toLocaleString()}</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-slate-700 shadow-lg">
                <span className="text-xs text-slate-400">المحصل الفعلي</span>
                <h3 className="text-xl font-black text-emerald-400 mt-1 font-mono">${totalCollected.toLocaleString()}</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-slate-700 shadow-lg">
                <span className="text-xs text-slate-400">الديون (ذمم)</span>
                <h3 className="text-xl font-black text-rose-400 mt-1 font-mono">${(totalSales - totalCollected).toLocaleString()}</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-slate-700 shadow-lg">
                <span className="text-xs text-slate-400">المنشآت النشطة</span>
                <h3 className="text-xl font-black text-cyan-400 mt-1 font-mono">{clients.length}</h3>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-300">مؤشر تحصيل السيولة النقدية:</span>
                <span className="font-mono text-emerald-400 font-bold">{collectionRate}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all" style={{ width: collectionRate + '%' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* 2. إدارة العملاء */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                <input type="text" placeholder="بحث باسم العميل أو الهاتف..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-9 pl-3 py-2.5 text-xs text-white focus:border-blue-500 outline-none transition" />
              </div>
              <button onClick={() => openClientModal()} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Plus className="w-4 h-4" /> إضافة
              </button>
            </div>

            <div className="grid gap-3">
              {filterList(clients).map(c => (
                <div key={c.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between gap-3 hover:border-slate-700 transition">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {c.name} <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">{c.id}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5">{c.contactPerson} | <span className="font-mono text-slate-300">{c.phone}</span> | {c.system}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button onClick={() => handleWhatsApp(c.phone, `مرحباً ${c.name}، تواصل من ${settings.companyName}`)} className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl hover:bg-emerald-900 transition"><MessageCircle className="w-4 h-4" /></button>
                    <a href={`http://maps.google.com/?q=${c.mapCoordinates || c.address}`} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 text-amber-400 rounded-xl hover:bg-slate-700 transition"><MapPin className="w-4 h-4" /></a>
                    <button onClick={() => { setModal('statement'); setEditData(c); }} className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition">كشف حساب</button>
                    <button onClick={() => openClientModal(c)} className="p-2.5 bg-slate-800 text-slate-200 rounded-xl hover:bg-slate-700 transition"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteRecord(clients, setClients, c.id, 'تم حذف العميل')} className="p-2.5 bg-rose-950/50 text-rose-400 rounded-xl hover:bg-rose-900 transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. الفواتير */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                <input type="text" placeholder="بحث في الفواتير..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-9 pl-3 py-2.5 text-xs text-white outline-none" />
              </div>
              <button onClick={() => openInvoiceModal()} className="bg-blue-600 text-white rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Plus className="w-4 h-4" /> فاتورة جديدة
              </button>
            </div>

            <div className="grid gap-3">
              {filterList(invoices).map(inv => {
                const total = calcTotal(inv);
                const rem = total - (inv.paid || 0);
                return (
                  <div key={inv.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between border-b border-slate-800 pb-3 gap-3">
                      <div>
                        <h4 className="font-bold text-white flex items-center gap-2">
                          {inv.client} <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">{inv.id}</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-1.5">{inv.date} | الهاتف: {inv.phone}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handlePrint(inv, 'فاتورة ضريبية رسمية')} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"><Printer className="w-3.5 h-3.5" /> PDF / طباعة</button>
                        <button onClick={() => openVoucherModal(inv)} className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"><DollarSign className="w-3.5 h-3.5" /> قبض</button>
                        <button onClick={() => openInvoiceModal(inv)} className="p-2 bg-slate-800 text-slate-200 rounded-xl"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => deleteRecord(invoices, setInvoices, inv.id, 'تم حذف الفاتورة')} className="p-2 bg-rose-950/50 text-rose-400 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl text-center text-xs">
                      <div><span className="text-[10px] text-slate-500 block mb-1">الإجمالي</span><span className="font-bold text-white font-mono">${total.toLocaleString()}</span></div>
                      <div><span className="text-[10px] text-slate-500 block mb-1">المسدد</span><span className="font-bold text-emerald-400 font-mono">${(inv.paid||0).toLocaleString()}</span></div>
                      <div><span className="text-[10px] text-slate-500 block mb-1">المتبقي</span><span className={`font-bold font-mono ${rem > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>${rem.toLocaleString()}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. عروض الأسعار */}
        {activeTab === 'quotations' && (
          <div className="space-y-4">
            <button onClick={openQuotationModal} className="w-full bg-blue-600 text-white rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg">
              <Plus className="w-5 h-5" /> إنشاء عرض سعر رسمي
            </button>
            <div className="grid gap-3">
              {quotations.map(qt => (
                <div key={qt.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center gap-3">
                  <div>
                    <h4 className="font-bold text-white">{qt.client}</h4>
                    <p className="text-xs text-slate-400 mt-1">{qt.id} | صالح لغاية: {qt.validUntil}</p>
                    <p className="text-sm font-bold text-amber-400 mt-1 font-mono">${calcSubtotal(qt.items).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-1.5 flex-col sm:flex-row">
                    <button onClick={() => handlePrint(qt, 'عرض سعر معتمد (Quotation)')} className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"><Printer className="w-3.5 h-3.5" /> PDF</button>
                    <button onClick={() => deleteRecord(quotations, setQuotations, qt.id, 'تم الحذف')} className="p-2 bg-rose-950/50 text-rose-400 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. السندات والكتالوج (مختصرة لترتيب الكود) */}
        {activeTab === 'vouchers' && (
          <div className="grid gap-3">
            {vouchers.map(v => (
              <div key={v.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white">{v.client}</h4>
                  <p className="text-xs text-slate-400 mt-1">{v.id} | {v.date} | {v.method}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-emerald-400 font-mono text-lg">${v.amount.toLocaleString()}</span>
                  <button onClick={() => handlePrint(v, 'سند قبض مالي')} className="p-2 bg-slate-800 text-white rounded-xl"><Printer className="w-4 h-4" /></button>
                  <button onClick={() => deleteRecord(vouchers, setVouchers, v.id, 'تم الحذف')} className="p-2 bg-rose-950/50 text-rose-400 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between h-full space-y-4">
                <div>
                  <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-1 rounded">{pkg.category}</span>
                  <h4 className="text-sm font-bold text-white mt-3 leading-relaxed">{pkg.title}</h4>
                  <div className="text-xl font-black text-white font-mono mt-2">${pkg.price}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => convertPackage(pkg, 'inv')} className="bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1"><FileText className="w-3.5 h-3.5" /> لفاتورة</button>
                  <button onClick={() => convertPackage(pkg, 'qt')} className="bg-amber-600 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1"><FileCheck className="w-3.5 h-3.5" /> لعرض سعر</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. إعدادات النظام المكتملة */}
        {activeTab === 'settings' && (
          <div className="space-y-4 text-xs">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button onClick={()=>setSettingsSubTab('company')} className={`px-4 py-2 rounded-xl font-bold transition ${settingsSubTab==='company' ? 'bg-blue-600 text-white':'bg-slate-900 text-slate-400'}`}>الشركة</button>
              <button onClick={()=>setSettingsSubTab('finance')} className={`px-4 py-2 rounded-xl font-bold transition ${settingsSubTab==='finance' ? 'bg-blue-600 text-white':'bg-slate-900 text-slate-400'}`}>المالية والبنوك</button>
              <button onClick={()=>setSettingsSubTab('data')} className={`px-4 py-2 rounded-xl font-bold transition ${settingsSubTab==='data' ? 'bg-blue-600 text-white':'bg-slate-900 text-slate-400'}`}>البيانات</button>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              {settingsSubTab === 'company' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-slate-400 block mb-1">اسم الشركة المعتمد</label><input type="text" value={settings.companyName} onChange={e=>setSettings({...settings, companyName:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white" /></div>
                  <div><label className="text-slate-400 block mb-1">النشاط (يظهر تحت الشعار)</label><input type="text" value={settings.tagline} onChange={e=>setSettings({...settings, tagline:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white" /></div>
                  <div><label className="text-slate-400 block mb-1">الرقم الضريبي (VAT)</label><input type="text" value={settings.taxNumber} onChange={e=>setSettings({...settings, taxNumber:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono" /></div>
                  <div><label className="text-slate-400 block mb-1">رقم الهاتف الرسمي</label><input type="text" value={settings.phone} onChange={e=>setSettings({...settings, phone:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono" /></div>
                  <div className="sm:col-span-2"><label className="text-slate-400 block mb-1">نص الضمان الافتراضي للفواتير</label><textarea value={settings.defaultWarranty} onChange={e=>setSettings({...settings, defaultWarranty:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white h-16" /></div>
                </div>
              )}

              {settingsSubTab === 'finance' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="text-slate-400 block mb-1">الضريبة الافتراضية (%)</label><input type="number" value={settings.taxRate} onChange={e=>setSettings({...settings, taxRate:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono" /></div>
                  </div>
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <h4 className="font-bold text-white flex justify-between items-center">الحسابات البنكية المعروضة في الفاتورة 
                      <button onClick={()=>setSettings({...settings, banks: [...settings.banks, {id: Date.now().toString(), bankName:'', account:''}]})} className="text-blue-400 flex items-center gap-1"><Plus className="w-4 h-4"/> إضافة</button>
                    </h4>
                    {settings.banks.map((b, idx) => (
                      <div key={b.id} className="flex gap-2">
                        <input type="text" placeholder="اسم البنك" value={b.bankName} onChange={e=>{const nb=[...settings.banks]; nb[idx].bankName=e.target.value; setSettings({...settings, banks:nb})}} className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-white" />
                        <input type="text" placeholder="رقم الحساب" value={b.account} onChange={e=>{const nb=[...settings.banks]; nb[idx].account=e.target.value; setSettings({...settings, banks:nb})}} className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono" />
                        <button onClick={()=>{setSettings({...settings, banks: settings.banks.filter(x=>x.id!==b.id)})}} className="text-rose-400 p-2"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {settingsSubTab === 'data' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <button onClick={() => {
                    const data = JSON.stringify({ settings, clients, invoices, quotations, vouchers }, null, 2);
                    const blob = new Blob([data], {type:'application/json'});
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = `OpenTik_Backup_${Date.now()}.json`; a.click();
                  }} className="p-4 bg-slate-950 rounded-xl border border-slate-700 text-white font-bold flex flex-col items-center gap-2 hover:bg-slate-800 transition"><Download className="w-6 h-6 text-blue-400"/> أخذ نسخة احتياطية لكامل النظام (JSON)</button>
                  
                  <button onClick={() => {
                    if(window.confirm('سيتم حذف كافة السجلات والفواتير وإعادة التطبيق للصفر، هل أنت متأكد؟')){
                      localStorage.clear(); window.location.reload();
                    }
                  }} className="p-4 bg-rose-950/20 rounded-xl border border-rose-900/50 text-rose-400 font-bold flex flex-col items-center gap-2 hover:bg-rose-900/40 transition"><RotateCcw className="w-6 h-6"/> إعادة ضبط المصنع (حذف كل شيء)</button>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => showToast('تم حفظ إعدادات النظام بنجاح 💾')} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"><Save className="w-4 h-4"/> حفظ الإعدادات</button>
            </div>
          </div>
        )}

      </main>

      {/* ================= النوافذ المنبثقة التفاعلية (Modals) ================= */}

      {/* نموذج العميل */}
      {modal === 'client' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto print:hidden">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-base">{editData ? 'تعديل بيانات العميل' : 'إضافة منشأة جديدة'}</h3>
              <button onClick={() => setModal(null)} className="text-slate-400 bg-slate-800 p-1.5 rounded-full hover:text-white hover:bg-rose-500 transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={saveClient} className="space-y-4 text-sm">
              <div><label className="text-slate-400 block mb-1.5">اسم المنشأة *</label><input type="text" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition" required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-slate-400 block mb-1.5">رقم الهاتف *</label><input type="text" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono outline-none focus:border-blue-500 transition" required /></div>
                <div><label className="text-slate-400 block mb-1.5">المسؤول</label><input type="text" value={formData.contactPerson} onChange={e=>setFormData({...formData, contactPerson:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-slate-400 block mb-1.5">المنظومة</label><input type="text" value={formData.system} onChange={e=>setFormData({...formData, system:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition" /></div>
                <div><label className="text-slate-400 block mb-1.5">إحداثيات الخريطة (اختياري)</label><input type="text" value={formData.mapCoordinates} onChange={e=>setFormData({...formData, mapCoordinates:e.target.value})} placeholder="مثال: 15.35,44.20" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono outline-none focus:border-blue-500 transition" /></div>
              </div>
              <div><label className="text-slate-400 block mb-1.5">الأجهزة المركبة (جهاز في كل سطر)</label><textarea value={formData.devicesText} onChange={e=>setFormData({...formData, devicesText:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white h-24 outline-none focus:border-blue-500 transition" /></div>
              <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-600/30 transition">{editData ? 'تحديث البيانات' : 'حفظ العميل'}</button>
            </form>
          </div>
        </div>
      )}

      {/* نماذج الفواتير وعروض الأسعار */}
      {(modal === 'invoice' || modal === 'quotation') && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto print:hidden">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-2xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-base">{modal === 'invoice' ? 'فاتورة توريد رسمية' : 'عرض سعر معتمد'} {formData.id}</h3>
              <button onClick={() => setModal(null)} className="text-slate-400 bg-slate-800 p-1.5 rounded-full hover:text-white hover:bg-rose-500 transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={modal === 'invoice' ? saveInvoice : saveQuotation} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="col-span-2"><label className="text-slate-400 block mb-1.5">اسم العميل *</label><input type="text" value={formData.client} onChange={e=>setFormData({...formData, client:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white" required /></div>
                <div className="col-span-2"><label className="text-slate-400 block mb-1.5">الهاتف</label><input type="text" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono" /></div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center"><span className="font-bold text-white">الأصناف والخدمات:</span><button type="button" onClick={() => setFormData({...formData, items: [...formData.items, {name:'', qty:1, price:0}]})} className="bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"><Plus className="w-3.5 h-3.5"/> بند</button></div>
                {formData.items.map((it, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" placeholder="اسم الصنف" value={it.name} onChange={e=>{const l=[...formData.items]; l[idx].name=e.target.value; setFormData({...formData, items:l})}} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white" required />
                    <input type="number" placeholder="الكمية" value={it.qty} onChange={e=>{const l=[...formData.items]; l[idx].qty=Number(e.target.value); setFormData({...formData, items:l})}} className="w-16 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-center font-mono" />
                    <input type="number" placeholder="السعر" value={it.price} onChange={e=>{const l=[...formData.items]; l[idx].price=Number(e.target.value); setFormData({...formData, items:l})}} className="w-24 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-center font-mono" />
                    <button type="button" onClick={()=>{if(formData.items.length>1) setFormData({...formData, items: formData.items.filter((_,i)=>i!==idx)})}} className="text-rose-400 p-2"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div><label className="text-slate-400 block mb-1.5">الخصم ($)</label><input type="number" value={formData.discount} onChange={e=>setFormData({...formData, discount:Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono" /></div>
                {modal === 'invoice' && <div><label className="text-slate-400 block mb-1.5">المدفوع مقدماً ($)</label><input type="number" value={formData.paid} onChange={e=>setFormData({...formData, paid:Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono" /></div>}
                <div className="col-span-2"><label className="text-slate-400 block mb-1.5">الإجمالي النهائي المحسوب</label><div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-2.5 text-blue-400 font-bold text-center font-mono text-base">${calcTotal(formData)}</div></div>
              </div>

              <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-600/30 transition">حفظ وإنشاء {modal==='invoice'?'الفاتورة':'عرض السعر'} (معاينة PDF)</button>
            </form>
          </div>
        </div>
      )}

      {/* كشف حساب العميل */}
      {modal === 'statement' && editData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto print:hidden">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-base">كشف حساب: {editData.name}</h3>
              <button onClick={() => setModal(null)} className="text-slate-400 bg-slate-800 p-1.5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 text-sm">الرصيد القائم المتبقي:</span>
              <span className="text-xl font-black text-rose-400 font-mono">${editData.balance?.toLocaleString()}</span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <span className="font-bold text-slate-300 text-xs block mb-2">سجل الفواتير:</span>
              {invoices.filter(i => i.client === editData.name).length === 0 ? <p className="text-xs text-slate-500 text-center py-4">لا توجد فواتير مسجلة</p> : null}
              {invoices.filter(i => i.client === editData.name).map(inv => (
                <div key={inv.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <div><span className="font-mono text-blue-400 font-bold block">{inv.id}</span><span className="text-slate-500">{inv.date}</span></div>
                  <div className="text-left"><span className="font-mono text-white font-bold block">${calcTotal(inv)}</span><span className="text-emerald-400">سُدد: ${inv.paid}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* سند القبض */}
      {modal === 'voucher' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-sm w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-base">إصدار سند قبض</h3>
              <button onClick={() => setModal(null)} className="text-slate-400 bg-slate-800 p-1.5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={saveVoucher} className="space-y-4 text-sm">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800"><span className="text-xs text-slate-400 block">العميل: {formData.client}</span><strong className="text-white text-xs block mt-1">فاتورة: {formData.invoiceId}</strong></div>
              <div><label className="text-slate-400 block mb-1.5">المبلغ المقبوض ($)</label><input type="number" value={formData.amount} onChange={e=>setFormData({...formData, amount:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono text-base font-bold" required /></div>
              <div><label className="text-slate-400 block mb-1.5">طريقة الدفع</label><select value={formData.method} onChange={e=>setFormData({...formData, method:e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"><option>نقداً</option><option>تحويل بنكي</option></select></div>
              <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-base shadow-lg shadow-emerald-600/30 transition">إصدار السند</button>
            </form>
          </div>
        </div>
      )}

      {/* ================= قالب الطباعة الأصلي (Native PDF Print) مخفي عن الشاشة، يظهر فقط عند الطباعة ================= */}
      {printDoc && (
        <div className="hidden print:block w-full text-black font-sans text-sm bg-white p-2" dir="rtl">
          {/* رأس الفاتورة الرسمي */}
          <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight">{settings.companyName}</h1>
              <p className="text-sm mt-1 font-bold text-slate-600">{settings.tagline}</p>
              <div className="text-xs mt-2 space-y-0.5 text-slate-500 font-mono">
                <p>الرقم الضريبي (VAT): {settings.taxNumber}</p>
                <p>السجل التجاري (CR): {settings.crNumber}</p>
              </div>
            </div>
            <div className="text-left">
              <span className="inline-block px-4 py-1.5 border-2 border-slate-800 text-xl font-black tracking-widest rounded-lg mb-2">{printDoc.docType}</span>
              <p className="font-mono text-base font-bold">رقم المستند: {printDoc.id}</p>
              <p className="font-mono text-sm text-slate-600 mt-0.5">التاريخ: {printDoc.date || new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>

          {/* بيانات العميل */}
          <div className="flex justify-between items-start border border-slate-300 p-4 rounded-xl mb-6 bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-800 mb-2 border-b border-slate-300 inline-block pb-1">بيانات العميل / Customer Details:</h3>
              <p className="font-bold text-lg">{printDoc.client}</p>
              <p className="font-mono text-slate-700 mt-1">الهاتف: {printDoc.phone}</p>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-800 mb-2 border-b border-slate-300 inline-block pb-1">الحسابات البنكية المعتمدة:</h3>
              {settings.banks.map(b => (
                <p key={b.id} className="font-mono text-xs mt-1"><span className="font-bold">{b.bankName}:</span> {b.account}</p>
              ))}
            </div>
          </div>

          {/* جدول الأصناف للفواتير وعروض الأسعار */}
          {printDoc.items && (
            <table className="w-full text-right border-collapse mb-6">
              <thead>
                <tr className="bg-slate-100 border-y-2 border-slate-800 font-bold">
                  <th className="py-2.5 px-2 w-12 text-center border-l border-slate-300">م</th>
                  <th className="py-2.5 px-2 border-l border-slate-300">البيان والمواصفات</th>
                  <th className="py-2.5 px-2 w-20 text-center border-l border-slate-300">الكمية</th>
                  <th className="py-2.5 px-2 w-28 text-center border-l border-slate-300">سعر الوحدة</th>
                  <th className="py-2.5 px-2 w-32 text-center bg-slate-200">الإجمالي ($)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {printDoc.items.map((it, idx) => (
                  <tr key={idx} className="border-b border-slate-300">
                    <td className="py-2.5 px-2 text-center font-mono border-l border-slate-300">{idx + 1}</td>
                    <td className="py-2.5 px-2 font-bold border-l border-slate-300">{it.name}</td>
                    <td className="py-2.5 px-2 text-center font-mono border-l border-slate-300">{it.qty}</td>
                    <td className="py-2.5 px-2 text-center font-mono border-l border-slate-300">${it.price}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-black bg-slate-50">${it.qty * it.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* الإجمالي وسند القبض */}
          <div className="flex justify-between items-start">
            <div className="w-1/2 text-xs text-slate-600 border border-slate-300 p-3 rounded-lg leading-relaxed">
              <strong className="block text-slate-800 mb-1 text-sm border-b pb-1">الشروط والأحكام:</strong>
              {printDoc.notes || settings.defaultWarranty}
            </div>

            {/* مجاميع الفاتورة */}
            {printDoc.items && (
              <div className="w-1/3 border-2 border-slate-800 rounded-xl overflow-hidden">
                <div className="flex justify-between px-3 py-2 border-b border-slate-300 bg-slate-50">
                  <span className="font-bold">المجموع الفرعي:</span>
                  <span className="font-mono font-bold">${calcSubtotal(printDoc.items)}</span>
                </div>
                {printDoc.discount > 0 && (
                  <div className="flex justify-between px-3 py-2 border-b border-slate-300 text-red-600 bg-red-50">
                    <span className="font-bold">الخصم الممنوح:</span>
                    <span className="font-mono font-bold">-${printDoc.discount}</span>
                  </div>
                )}
                <div className="flex justify-between px-3 py-2.5 border-b border-slate-300 bg-slate-100 text-lg">
                  <span className="font-black">الإجمالي المستحق:</span>
                  <span className="font-mono font-black">${calcTotal(printDoc)}</span>
                </div>
                {printDoc.docType.includes('فاتورة') && (
                  <>
                    <div className="flex justify-between px-3 py-2 border-b border-slate-300 text-green-700 bg-green-50">
                      <span className="font-bold">المبلغ المسدد:</span>
                      <span className="font-mono font-bold">${printDoc.paid || 0}</span>
                    </div>
                    <div className="flex justify-between px-3 py-2.5 bg-slate-800 text-white text-base">
                      <span className="font-bold">المتبقي المطلوب:</span>
                      <span className="font-mono font-bold">${calcTotal(printDoc) - (printDoc.paid || 0)}</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* تصميم سند القبض المستقل */}
            {printDoc.amount && (
              <div className="w-full text-base border-2 border-slate-800 rounded-xl p-5 bg-slate-50">
                <div className="flex justify-between border-b border-slate-300 pb-3 mb-3">
                  <span className="font-bold">استلمنا من الأخ/السادة: <span className="font-black text-lg">{printDoc.client}</span></span>
                  <span className="font-mono font-black text-2xl border-2 border-slate-800 px-4 py-1 rounded bg-white">${printDoc.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">طريقة الدفع: <span className="font-normal">{printDoc.method}</span></span>
                  <span className="font-bold">البيان: <span className="font-normal">{printDoc.notes}</span></span>
                </div>
              </div>
            )}
          </div>

          {/* التواقيع */}
          <div className="mt-16 flex justify-between items-center text-center font-bold">
            <div className="w-1/3">
              <p className="mb-8">توقيع المستلم والختم</p>
              <div className="border-b-2 border-dotted border-slate-400 mx-10"></div>
            </div>
            <div className="w-1/3 flex flex-col items-center">
              <div className="w-24 h-24 border-4 border-slate-800 rounded-full flex flex-col items-center justify-center text-slate-800 rotate-[-15deg] opacity-80">
                <span className="text-[10px] uppercase">OpenTik Systems</span>
                <span className="text-sm font-black">مـعـتـمـد</span>
                <span className="text-[10px] font-mono">{printDoc.date}</span>
              </div>
            </div>
            <div className="w-1/3">
              <p className="mb-8">الإدارة المالية / المبيعات</p>
              <div className="border-b-2 border-dotted border-slate-400 mx-10"></div>
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-slate-500 font-mono border-t border-slate-300 pt-2">
            تم إصدار هذه الوثيقة آلياً من نظام OpenTik الذكي لإدارة العمليات والمبيعات.
          </div>
        </div>
      )}

    </div>
  );
}
