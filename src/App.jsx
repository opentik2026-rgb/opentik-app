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
  Briefcase,
  AlertCircle
} from 'lucide-react';

// استدعاء مكتبات أندرويد الرسمية للملفات والمشاركة
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSystem, setFilterSystem] = useState('all');
  const [currencyMode, setCurrencyMode] = useState('USD');
  const [toast, setToast] = useState(null);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // إعدادات الشركة
  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('opentik_settings');
    return saved ? JSON.parse(saved) : {
      companyName: 'شركة OpenTik للأنظمة الذكية',
      tagline: 'كاميرات مراقبة - شبكات - أنظمة أمان - طاقة بديلة - عقود صيانة SLA',
      crNumber: '10452',
      taxNumber: '30048921',
      phone: '777112233',
      address: 'شارع الزبيري - صنعاء',
      exchangeRate: 535,
      bankKuraimi: '3001245678',
      bankTadhamon: '1024558',
      bankQutaibi: '7789012',
      defaultWarranty: 'عام كامل ضمان استبدال فوري ضد عيوب المصنع'
    };
  });

  // بيانات العملاء
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
          { name: 'سويتش شبكة 16Port PoE Gigabit', qty: 1, price: 180 },
          { name: 'تمديدات وتركيب وبرمجة وتدريب الكادر', qty: 1, price: 250 }
        ],
        paid: 500,
        notes: 'الضمان لمدة عام كامل يشمل القطع والاستبدال الفوري ضد عيوب المصنع.'
      }
    ];
  });

  // عروض الأسعار
  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem('opentik_quotations');
    return saved ? JSON.parse(saved) : [];
  });

  // سندات القبض
  const [vouchers, setVouchers] = useState(() => {
    const saved = localStorage.getItem('opentik_vouchers');
    return saved ? JSON.parse(saved) : [];
  });

  // باقات OpenTik الذكية
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

  // المزامنة والتخزين
  useEffect(() => { localStorage.setItem('opentik_settings', JSON.stringify(systemSettings)); }, [systemSettings]);
  useEffect(() => { localStorage.setItem('opentik_clients', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('opentik_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('opentik_quotations', JSON.stringify(quotations)); }, [quotations]);
  useEffect(() => { localStorage.setItem('opentik_vouchers', JSON.stringify(vouchers)); }, [vouchers]);

  // النوافذ
  const [viewClientDetails, setViewClientDetails] = useState(null);
  const [statementClient, setStatementClient] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [creatingInvoice, setCreatingInvoice] = useState(false);
  const [creatingQuotation, setCreatingQuotation] = useState(false);
  const [creatingVoucher, setCreatingVoucher] = useState(null);
  const [newClientModal, setNewClientModal] = useState(false);
  const [autoActionModal, setAutoActionModal] = useState(null);

  // النماذج
  const [newClientForm, setNewClientForm] = useState({ name: '', contactPerson: '', phone: '', address: '', system: 'كاميرات مراقبة وشبكات', warrantyExpiry: '2027-09-15', devices: '' });
  const [invoiceForm, setInvoiceForm] = useState({ id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15', items: [{ name: '', qty: 1, price: 0 }], taxRate: 0, discount: 0, paid: 0, notes: '' });
  const [quotationForm, setQuotationForm] = useState({ id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15', validUntil: '2026-09-30', items: [{ name: '', qty: 1, price: 0 }], notes: '' });
  const [voucherForm, setVoucherForm] = useState({ amount: '', method: 'نقداً', notes: '' });

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
    if (currencyMode === 'YER') {
      return Math.round(amountUSD * (systemSettings.exchangeRate || 535)).toLocaleString() + ' ريال';
    }
    return '$' + amountUSD.toLocaleString();
  };

  // محرك توليد PDF محلي عالي الجودة بدون أي اعتماد خارجي
  const generateNativePdfBase64 = async () => {
    const element = document.getElementById('unified-printable-document');
    if (!element) {
      alert('لم يتم العثور على قالب المستند.');
      return null;
    }

    // توليد صورة عالية الدقة للوثيقة
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    const dataUri = pdf.output('datauristring');
    return dataUri.split(',')[1];
  };

  // ================= 1. مشاركة ملف PDF الفعلي عبر واتساب الأعمال أو العادي =================
  const handleSharePdfToWhatsApp = async () => {
    if (!autoActionModal || !autoActionModal.data || isProcessingPdf) return;
    setIsProcessingPdf(true);
    showNotification('جاري إنشاء ملف PDF وإرفاقه...');

    try {
      const base64Data = await generateNativePdfBase64();
      if (!base64Data) {
        setIsProcessingPdf(false);
        return;
      }

      const doc = autoActionModal.data;
      const fileName = (doc.id || 'Doc') + '_' + (doc.client || 'Client').replace(/\s+/g, '_') + '.pdf';

      if (Capacitor.isNativePlatform()) {
        // كتابة الملف في ذاكرة الكاش الخاصة بالتطبيق
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Cache
        });

        // فتح نافذة مشاركة أندرويد لاختيار واتساب وإرسال الملف الفعلي
        await Share.share({
          title: 'فاتورة رسمية - ' + doc.id,
          text: 'تحية طيبة من ' + systemSettings.companyName + '، مرفق لكم الفاتورة الرسمية PDF رقم ' + doc.id,
          url: savedFile.uri,
          dialogTitle: 'اختر واتساب لإرسال مستند الـ PDF'
        });
        showNotification('تم إرفاق ملف الـ PDF بنجاح ✔️');
      } else {
        // للمتصفح
        const blob = await (await fetch('data:application/pdf;base64,' + base64Data)).blob();
        const file = new File([blob], fileName, { type: 'application/pdf' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'فاتورة OpenTik' });
        } else {
          showNotification('تم فتح نافذة المشاركة');
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        alert('حدث خطأ أثناء المشاركة: ' + err.message);
      }
    } finally {
      setIsProcessingPdf(false);
    }
  };

  // ================= 2. تنزيل وحفظ ملف PDF في ذاكرة الهاتف =================
  const handleDownloadPDF = async () => {
    if (!autoActionModal || !autoActionModal.data || isProcessingPdf) return;
    setIsProcessingPdf(true);
    showNotification('جاري حفظ ملف الـ PDF في الهاتف...');

    try {
      const base64Data = await generateNativePdfBase64();
      if (!base64Data) {
        setIsProcessingPdf(false);
        return;
      }

      const doc = autoActionModal.data;
      const fileName = (doc.id || 'Doc') + '_' + (doc.client || 'Client').replace(/\s+/g, '_') + '.pdf';

      if (Capacitor.isNativePlatform()) {
        const result = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents
        });

        await Share.share({
          title: 'تم حفظ الفاتورة بنجاح',
          text: 'تم حفظ الملف في مجلد المستندات: ' + fileName,
          url: result.uri,
          dialogTitle: 'فتح أو حفظ ملف الـ PDF'
        });
        showNotification('تم حفظ ملف PDF في الهاتف بنجاح 📄');
      } else {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + base64Data;
        link.download = fileName;
        link.click();
        showNotification('تم تنزيل ملف الـ PDF 📄');
      }
    } catch (err) {
      alert('خطأ أثناء حفظ الملف: ' + err.message);
    } finally {
      setIsProcessingPdf(false);
    }
  };

  // إرسال رسالة واتساب مباشرة
  const handleDirectWhatsApp = (phone, text) => {
    const rawPhone = (phone || '').replace(/[^0-9]/g, '');
    const fullPhone = rawPhone.startsWith('967') ? rawPhone : ('967' + rawPhone);
    const encoded = encodeURIComponent(text);
    window.location.href = "whatsapp://send?phone=" + fullPhone + "&text=" + encoded;
  };

  // حفظ الفاتورة
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
    setAutoActionModal({ type: 'invoice', data: targetInv });
    showNotification('تم حفظ الفاتورة بنجاح ✔️');
  };

  // حفظ سند القبض
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
    setInvoices(invoices.map(inv => inv.id === creatingVoucher.id ? { ...inv, paid: (inv.paid || 0) + amt } : inv));
    setClients(clients.map(c => c.name === creatingVoucher.client ? { ...c, balance: Math.max(0, (c.balance || 0) - amt) } : c));
    setCreatingVoucher(null);
    setVoucherForm({ amount: '', method: 'نقداً', notes: '' });
    setAutoActionModal({ type: 'voucher', data: newVoucher });
    showNotification('تم إصدار سند القبض بنجاح 💵');
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

  // تحويل باقة
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
        notes: "باقة معتمدة من OpenTik: " + pkg.title + " (" + pkg.warranty + ")"
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

  const filteredClients = clients.filter(c => 
    c.name.includes(searchTerm) || c.phone.includes(searchTerm) || c.contactPerson.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      
      {/* إشعار منبثق تفاعلي */}
      {toast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* الشريط العلوي الفاخر */}
      <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-black text-xl text-white shadow-lg">
              OP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white">{systemSettings.companyName}</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">Pro v2.4</span>
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
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* التبويبات الرئيسية */}
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          <button onClick={() => setActiveTab('dashboard')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}>
            <Shield className="w-4 h-4" /> لوحة التحكم
          </button>
          <button onClick={() => setActiveTab('clients')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'clients' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}>
            <Users className="w-4 h-4" /> العملاء ({clients.length})
          </button>
          <button onClick={() => setActiveTab('invoices')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'invoices' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}>
            <FileText className="w-4 h-4" /> الفواتير ({invoices.length})
          </button>
          <button onClick={() => setActiveTab('quotations')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'quotations' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}>
            <FileCheck className="w-4 h-4" /> عروض الأسعار ({quotations.length})
          </button>
          <button onClick={() => setActiveTab('vouchers')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'vouchers' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}>
            <DollarSign className="w-4 h-4" /> سندات القبض ({vouchers.length})
          </button>
          <button onClick={() => setActiveTab('packages')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'packages' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}>
            <Layers className="w-4 h-4" /> الكتالوج الذكي
          </button>
          <button onClick={() => setActiveTab('settings')} className={"px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'settings' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}>
            <Settings className="w-4 h-4" /> إعدادات النظام
          </button>
        </nav>
      </header>

      {/* المحتوى */}
      <main className="p-4 flex-1 max-w-6xl w-full mx-auto space-y-5">
        
        {/* لوحة التحكم */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">إجمالي المبيعات</span>
                <h3 className="text-xl font-black text-white mt-1 font-mono">{formatMoney(totalSalesUSD)}</h3>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">المحصل الفعلي</span>
                <h3 className="text-xl font-black text-emerald-400 mt-1 font-mono">{formatMoney(totalCollectedUSD)}</h3>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">الديون المتبقية</span>
                <h3 className="text-xl font-black text-rose-400 mt-1 font-mono">{formatMoney(totalOutstandingUSD)}</h3>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">العملاء والمنشآت</span>
                <h3 className="text-xl font-black text-cyan-400 mt-1 font-mono">{clients.length}</h3>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-300">نسبة تحصيل السيولة النقدية:</span>
                <span className="font-mono text-emerald-400 font-bold">{collectionRate}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full" style={{ width: collectionRate + '%' }}></div>
              </div>
            </div>

            {/* أنظمة OpenTik */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" /> تخصصات شركة OpenTik للأنظمة الذكية
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
                  <span className="text-[10px] text-slate-400">دعم دوري</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* العملاء */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ابحث باسم العميل أو الهاتف..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-3 py-2 text-xs text-white"
                />
              </div>
              <button onClick={() => setNewClientModal(true)} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> إضافة عميل
              </button>
            </div>

            <div className="grid gap-3">
              {filteredClients.map(c => (
                <div key={c.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{c.id}</span>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        الضمان {c.warrantyStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">المسؤول: {c.contactPerson} | الهاتف: {c.phone} | النظام: {c.system}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDirectWhatsApp(c.phone, 'مرحباً ' + c.name + '، معكم شركة OpenTik للأنظمة الذكية.')} className="p-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded-lg">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setStatementClient(c)}
                      className="px-3 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" /> كشف حساب
                    </button>
                    <button onClick={() => setViewClientDetails(c)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs">
                      الملف الشامل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* الفواتير */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">فواتير التوريد والتركيب</h3>
                <p className="text-xs text-slate-400">إصدار الفواتير مع المعاينة والمشاركة المباشرة كـ PDF عبر واتساب</p>
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
                        <p className="text-xs text-slate-400 mt-1">الهاتف: {inv.phone} | التاريخ: {inv.date}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <button 
                          onClick={() => setAutoActionModal({ type: 'invoice', data: inv })}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs flex items-center gap-1.5 font-bold shadow"
                        >
                          <Eye className="w-3.5 h-3.5" /> معاينة وإرسال PDF
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
                            setVoucherForm({ amount: remaining > 0 ? remaining : '', method: 'نقداً', notes: 'سداد من فاتورة ' + inv.id });
                          }}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs flex items-center gap-1 font-bold"
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
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* الكتالوج الذكي */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white">كتالوج الباقات الذكية لشركة OpenTik</h3>
              <p className="text-xs text-slate-400">تحويل الباقة فوراً إلى فاتورة أو عرض سعر معتمد بضغطة زر</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] text-blue-400 font-semibold">{pkg.category}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{pkg.title}</h4>
                    <span className="text-[11px] text-emerald-400 font-medium block mt-1">الضمان: {pkg.warranty}</span>
                    
                    <div className="my-3">
                      <span className="text-lg font-black text-white font-mono">{formatMoney(pkg.price)}</span>
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

        {/* الإعدادات */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">إعدادات المنشأة والحسابات البنكية</h3>
            <div>
              <label className="text-slate-400 block mb-1">اسم المنشأة</label>
              <input type="text" value={systemSettings.companyName} onChange={e => setSystemSettings({...systemSettings, companyName: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">سعر صرف الدولار (مقابل الريال اليمني)</label>
              <input type="number" value={systemSettings.exchangeRate} onChange={e => setSystemSettings({...systemSettings, exchangeRate: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-mono font-bold" />
            </div>
            <button onClick={() => showNotification('تم حفظ الإعدادات بنجاح 💾')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1">
              <Save className="w-4 h-4" /> حفظ الإعدادات
            </button>
          </div>
        )}

      </main>

      {/* ================= نافذة كشف حساب العميل التفصيلي ================= */}
      {statementClient && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">كشف حساب: {statementClient.name}</h3>
              <button onClick={() => setStatementClient(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between">
                <div>
                  <span className="text-slate-400 block">الهاتف: {statementClient.phone}</span>
                  <span className="text-slate-400 block mt-0.5">النظام: {statementClient.system}</span>
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block">الرصيد المتبقي:</span>
                  <span className="text-base font-bold text-rose-400 font-mono">{formatMoney(statementClient.balance)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-300 block">سجل المعاملات والفواتير:</span>
                {invoices.filter(i => i.client === statementClient.name).map(inv => (
                  <div key={inv.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-mono text-blue-400 font-bold ml-1">{inv.id}</span>
                      <span className="text-slate-400 text-[10px]">{inv.date}</span>
                    </div>
                    <div className="text-left">
                      <span className="font-mono text-white block">{"$" + calculateFinalTotal(inv)}</span>
                      <span className="text-[10px] text-emerald-400">{"المسدد: $" + (inv.paid || 0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setStatementClient(null)} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">إغلاق</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= النافذة الذكية للمعاينة والمشاركة الأصلية ================= */}
      {autoActionModal && autoActionModal.data && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-md w-full p-5 space-y-4 shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  معاينة واعتماد: {autoActionModal.data.id}
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
            </div>

            {/* الأزرار التفاعلية الأصلية لنظام أندرويد */}
            <div className="space-y-2.5 pt-1 text-xs">
              
              {/* 1. مشاركة ملف PDF الفعلي عبر واتساب */}
              <button 
                onClick={handleSharePdfToWhatsApp}
                disabled={isProcessingPdf}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl py-3 font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 text-xs"
              >
                <Share2 className="w-4 h-4" /> 
                <span>{isProcessingPdf ? 'جاري تجهيز الملف...' : 'مشاركة وإرسال ملف الـ PDF عبر واتساب'}</span>
              </button>

              {/* 2. حفظ وتنزيل ملف PDF في ذاكرة الهاتف */}
              <button 
                onClick={handleDownloadPDF}
                disabled={isProcessingPdf}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-xl py-2.5 font-bold transition flex items-center justify-center gap-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-cyan-400" /> 
                <span>تنزيل وحفظ ملف PDF على الهاتف</span>
              </button>

              {/* 3. فتح شات واتساب بالنص مباشرة */}
              <button 
                onClick={() => {
                  const doc = autoActionModal.data;
                  const tot = calculateFinalTotal(doc);
                  const rem = tot - (doc.paid || 0);
                  const msg = 'مرحباً ' + doc.client + '، تحية من ' + systemSettings.companyName + '.\nفاتورة رقم: ' + doc.id + ' بإجمالي: $' + tot + ' والمتبقي: $' + rem;
                  handleDirectWhatsApp(doc.phone, msg);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl py-2 font-medium transition flex items-center justify-center gap-1.5 border border-slate-800 text-[11px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>مراسلة العميل بنص الفاتورة (فتح شات الواتساب مباشرة)</span>
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

      {/* ================= قالب الفاتورة الموحد الفائق الدقة ================= */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '794px', opacity: 0, pointerEvents: 'none', zIndex: -100 }}>
        {autoActionModal && autoActionModal.data && (
          <div id="unified-printable-document" className="p-8 bg-white text-slate-900 text-right font-sans" dir="rtl">
            <div className="flex justify-between items-center border-b-2 border-blue-600 pb-4 mb-5">
              <div>
                <h1 className="text-2xl font-black text-blue-700">{systemSettings.companyName}</h1>
                <p className="text-xs text-slate-600 mt-1">{systemSettings.tagline}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">السجل: {systemSettings.crNumber} | الضريبي: {systemSettings.taxNumber}</p>
              </div>
              <div className="text-left">
                <span className="text-xl font-bold text-slate-800 block">
                  {autoActionModal.type === 'invoice' ? 'فاتورة توريد وتركيب' : autoActionModal.type === 'voucher' ? 'سند قبض مالي' : 'عرض سعر رسمي'}
                </span>
                <span className="text-xs text-slate-500 font-mono">الرقم: {autoActionModal.data.id}</span>
                <p className="text-xs text-slate-500 font-mono">التاريخ: {autoActionModal.data.date || '2026-09-15'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg mb-5 border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-1">بيانات المنشأة / العميل:</span>
                <p className="font-semibold text-slate-700">الاسم: {autoActionModal.data.client}</p>
                <p className="text-slate-600">الهاتف: {autoActionModal.data.phone}</p>
                <p className="text-slate-600">المنظومة: {autoActionModal.data.system || 'أنظمة ذكية'}</p>
              </div>
              <div className="text-left">
                <span className="font-bold text-slate-800 block mb-1">الحسابات البنكية المعتمدة:</span>
                <p className="text-slate-600 font-mono">الكريمي: {systemSettings.bankKuraimi}</p>
                <p className="text-slate-600 font-mono">التضامن: {systemSettings.bankTadhamon}</p>
                <p className="text-slate-600 font-mono">القطيبي: {systemSettings.bankQutaibi}</p>
              </div>
            </div>

            {autoActionModal.data.items && (
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
                  {autoActionModal.data.items.map((it, idx) => (
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
            )}

            <div className="flex justify-between items-start mb-6">
              <div className="w-1/2 p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                <span className="font-bold block mb-1">ملاحظات وشروط الضمان:</span>
                <p className="text-slate-600">{autoActionModal.data.notes || systemSettings.defaultWarranty}</p>
              </div>
              {autoActionModal.type === 'invoice' && (
                <div className="w-1/3 space-y-1 text-xs">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-600">المجموع الفرعي:</span>
                    <span className="font-bold font-mono">{"$" + calculateSubtotal(autoActionModal.data.items)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-sm font-black">
                    <span>الإجمالي المستحق:</span>
                    <span className="text-blue-700 font-mono">{"$" + calculateFinalTotal(autoActionModal.data)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-emerald-700">
                    <span>المسدد:</span>
                    <span className="font-bold font-mono">{"$" + (autoActionModal.data.paid || 0)}</span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-sm text-rose-600">
                    <span>المتبقي المطلوب:</span>
                    <span className="font-mono">{"$" + (calculateFinalTotal(autoActionModal.data) - (autoActionModal.data.paid || 0))}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-300 text-xs">
              <div className="text-center">
                <p className="text-slate-500 mb-6">توقيع المستلم والاعتماد</p>
                <p className="text-slate-400">........................</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-700 flex flex-col items-center justify-center text-blue-700 font-bold p-2 rotate-[-12deg]">
                  <span className="text-[10px]">شركة OpenTik</span>
                  <span className="text-[12px] font-black">مـعـتـمـد</span>
                  <span className="text-[8px]">القسم المالي</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* نافذة إضافة فاتورة */}
      {creatingInvoice && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-lg w-full p-5 space-y-3 text-xs">
            <h3 className="font-bold text-white text-sm">إنشاء فاتورة توريد</h3>
            <form onSubmit={handleSaveInvoice} className="space-y-3">
              <input type="text" placeholder="اسم العميل" value={invoiceForm.client} onChange={e => setInvoiceForm({...invoiceForm, client: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" required />
              <input type="text" placeholder="رقم الهاتف" value={invoiceForm.phone} onChange={e => setInvoiceForm({...invoiceForm, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" required />
              <div className="space-y-2">
                {invoiceForm.items.map((it, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" placeholder="الصنف" value={it.name} onChange={e => {
                      const updated = [...invoiceForm.items]; updated[idx].name = e.target.value; setInvoiceForm({...invoiceForm, items: updated});
                    }} className="flex-1 bg-slate-950 border border-slate-700 rounded p-1.5 text-white" required />
                    <input type="number" placeholder="الكمية" value={it.qty} onChange={e => {
                      const updated = [...invoiceForm.items]; updated[idx].qty = Number(e.target.value); setInvoiceForm({...invoiceForm, items: updated});
                    }} className="w-16 bg-slate-950 border border-slate-700 rounded p-1.5 text-white text-center font-mono" />
                    <input type="number" placeholder="السعر" value={it.price} onChange={e => {
                      const updated = [...invoiceForm.items]; updated[idx].price = Number(e.target.value); setInvoiceForm({...invoiceForm, items: updated});
                    }} className="w-20 bg-slate-950 border border-slate-700 rounded p-1.5 text-white text-center font-mono" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setCreatingInvoice(false)} className="px-3 py-1.5 bg-slate-800 rounded">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 text-white rounded font-bold">حفظ ومعاينة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تفاصيل العميل */}
      {viewClientDetails && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-md w-full p-5 space-y-3 text-xs">
            <h3 className="font-bold text-white text-sm">{viewClientDetails.name}</h3>
            <p className="text-slate-400">الهاتف: {viewClientDetails.phone}</p>
            <p className="text-slate-400">النظام: {viewClientDetails.system}</p>
            <button onClick={() => setViewClientDetails(null)} className="w-full bg-slate-800 py-2 rounded text-white font-bold mt-2">إغلاق</button>
          </div>
        </div>
      )}

    </div>
  );
}
