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
  DollarSign, 
  Layers, 
  MessageCircle, 
  Settings, 
  FileCheck, 
  Share2, 
  Save,
  Globe,
  MapPin,
  TrendingUp,
  Award,
  FileSpreadsheet,
  Calendar,
  Building2,
  PhoneCall,
  ExternalLink
} from 'lucide-react';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// قاموس الترجمة العالمي (Bilingual i18n Dictionary)
const translations = {
  ar: {
    appName: 'شركة OpenTik للأنظمة الذكية',
    tagline: 'أنظمة أمنية - كاميرات - شبكات - طاقة بديلة - عقود SLA',
    dashboard: 'لوحة التحكم',
    clients: 'إدارة العملاء',
    invoices: 'الفواتير والحسابات',
    quotations: 'عروض الأسعار',
    vouchers: 'سندات القبض',
    packages: 'الكتالوج الذكي',
    settings: 'إعدادات النظام',
    totalSales: 'إجمالي المبيعات',
    collected: 'المحصل الفعلي',
    outstanding: 'الديون المتبقية',
    activeClients: 'المنشآت النشطة',
    collectionRate: 'معدل تحصيل السيولة:',
    searchClient: 'ابحث باسم المنشأة، المسؤول، الهاتف...',
    addClient: 'إضافة عميل جديد',
    newInvoice: 'إنشاء فاتورة جديدة',
    newQuotation: 'إنشاء عرض سعر',
    issueVoucher: 'إصدار سند قبض',
    previewSend: 'معاينة وإرسال PDF',
    edit: 'تعديل',
    statement: 'كشف حساب',
    shareWhatsAppPdf: 'مشاركة وإرسال ملف الـ PDF عبر واتساب',
    downloadPdf: 'تنزيل وحفظ ملف PDF على الهاتف',
    directWhatsApp: 'مراسلة العميل (فتح شات الواتساب مباشرة)',
    systemSpecialties: 'تخصصات ومجالات OpenTik الذكية',
    cctv: 'كاميرات المراقبة',
    networks: 'الشبكات والـ IT',
    solar: 'الطاقة البديلة',
    security: 'أنظمة الأمان والبصمة',
    sla: 'عقود الصيانة SLA',
    convertInvoice: 'تحويل لفاتورة',
    convertQuote: 'تحويل لعرض سعر',
    companySettings: 'بيانات الشركة والفوترة',
    currencies: 'العملات وأسعار الصرف',
    exportCsv: 'تصدير البيانات إلى Excel / CSV',
    clientLocation: 'موقع المنشأة عبر خرائط Google',
    viewOnMap: 'فتح الموقع في الخريطة',
    status: 'الحالة',
    warranty: 'الضمان',
    valid: 'ساري',
    expired: 'منتهي',
    total: 'الإجمالي',
    paid: 'المسدد',
    remaining: 'المتبقي',
    close: 'إغلاق',
    save: 'حفظ'
  },
  en: {
    appName: 'OpenTik Smart Systems Enterprise',
    tagline: 'CCTV - Security Systems - IT Networks - Solar - SLA Maintenance',
    dashboard: 'Dashboard',
    clients: 'Clients CRM',
    invoices: 'Billing & Invoices',
    quotations: 'Quotations',
    vouchers: 'Receipt Vouchers',
    packages: 'Solutions Catalog',
    settings: 'Global Settings',
    totalSales: 'Total Revenue',
    collected: 'Collected Funds',
    outstanding: 'Receivables Due',
    activeClients: 'Active Enterprises',
    collectionRate: 'Cash Collection Rate:',
    searchClient: 'Search by client, contact, phone...',
    addClient: 'New Client',
    newInvoice: 'Create Invoice',
    newQuotation: 'New Quotation',
    issueVoucher: 'Issue Receipt',
    previewSend: 'Preview & Send PDF',
    edit: 'Edit',
    statement: 'Statement',
    shareWhatsAppPdf: 'Share & Attach PDF Document via WhatsApp',
    downloadPdf: 'Download PDF Document to Device',
    directWhatsApp: 'Direct Chat with Client on WhatsApp',
    systemSpecialties: 'OpenTik Enterprise Domains',
    cctv: 'CCTV & AI Vision',
    networks: 'IT & Cloud Networks',
    solar: 'Solar & Renewable Energy',
    security: 'Access Control & Alarms',
    sla: 'SLA Maintenance Contracts',
    convertInvoice: 'Convert to Invoice',
    convertQuote: 'Convert to Quotation',
    companySettings: 'Enterprise Profile & Invoicing',
    currencies: 'Currencies & Rates',
    exportCsv: 'Export Records to Excel / CSV',
    clientLocation: 'Site Location (Google Maps)',
    viewOnMap: 'View on Maps',
    status: 'Status',
    warranty: 'Warranty',
    valid: 'Active',
    expired: 'Expired',
    total: 'Total',
    paid: 'Paid',
    remaining: 'Remaining',
    close: 'Close',
    save: 'Save Changes'
  }
};

export default function App() {
  const [lang, setLang] = useState('ar');
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [toast, setToast] = useState(null);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // إعدادات الشركة العالمية
  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('opentik_global_settings');
    return saved ? JSON.parse(saved) : {
      companyNameAr: 'شركة OpenTik للأنظمة الذكية',
      companyNameEn: 'OpenTik Smart Systems Enterprise',
      taglineAr: 'أنظمة المراقبة والتحكم بالدخول، الشبكات المؤسسية، وحلول الطاقة البديلة',
      taglineEn: 'Surveillance, Access Control, Enterprise IT, & Hybrid Solar Solutions',
      crNumber: '10452-C',
      taxNumber: 'VAT-3004892100',
      phone: '+967 777 112 233',
      email: 'contact@opentik-systems.com',
      website: 'www.opentik-systems.com',
      addressAr: 'شارع الزبيري - المركز التقني - صنعاء',
      addressEn: 'Al-Zubairi St, Tech District, Sanaa',
      exchangeRates: { USD: 1, EUR: 0.92, SAR: 3.75, AED: 3.67, YER: 535 },
      bankKuraimi: '3001245678',
      bankTadhamon: '1024558',
      bankQutaibi: '7789012',
      defaultWarrantyAr: 'ضمان دولي معتمد لمدة عام كامل يشمل الاستبدال الفوري ضد عيوب التصنيع',
      defaultWarrantyEn: '1-Year International Replacement Warranty covering manufacturing defects'
    };
  });

  // قاعدة بيانات العملاء
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('opentik_global_clients');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'CL-101', 
        name: 'شركة النجم الذهبي للتجارة الدولية', 
        contactPerson: 'أ. محمد العريقي',
        phone: '777112233', 
        address: 'شارع الزبيري - صنعاء',
        mapCoordinates: '15.3524,44.2075',
        system: 'كاميرات مراقبة وشبكات', 
        warrantyExpiry: '2027-09-15',
        warrantyStatus: 'ساري',
        balance: 1450,
        installedDevices: ['8x Dahua 5MP IP AI Cameras', '1x NVR 16-CH 4K Pro', '1x 16Port PoE Gigabit Switch']
      },
      { 
        id: 'CL-102', 
        name: 'مستشفى الأمل التخصصي', 
        contactPerson: 'د. خالد عبدالجليل',
        phone: '771223344', 
        address: 'شارع تعز - صنعاء',
        mapCoordinates: '15.3312,44.2210',
        system: 'طاقة بديلة وانفرتر', 
        warrantyExpiry: '2028-09-12',
        warrantyStatus: 'ساري',
        balance: 0,
        installedDevices: ['1x Deye 12KW Three-Phase Hybrid Inverter', '2x 48V 100Ah Lithium Battery Banks']
      }
    ];
  });

  // الفواتير
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('opentik_global_invoices');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'INV-1001', 
        client: 'شركة النجم الذهبي للتجارة الدولية', 
        phone: '777112233',
        date: '2026-09-10', 
        system: 'كاميرات مراقبة وشبكات',
        taxRate: 0,
        discount: 100,
        items: [
          { name: 'Dahua 5MP IP AI Face Detection Camera', qty: 8, price: 65 },
          { name: 'NVR 16-CH 4K Pro with 4TB WD Purple Storage', qty: 1, price: 320 },
          { name: '16-Port PoE Managed Gigabit Switch', qty: 1, price: 180 },
          { name: 'Installation, Structured Cabling & SLA Commissioning', qty: 1, price: 250 }
        ],
        paid: 500,
        notes: 'الضمان لمدة عام كامل يشمل القطع والاستبدال الفوري ضد عيوب المصنع.'
      }
    ];
  });

  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem('opentik_global_quotations');
    return saved ? JSON.parse(saved) : [];
  });

  const [vouchers, setVouchers] = useState(() => {
    const saved = localStorage.getItem('opentik_global_vouchers');
    return saved ? JSON.parse(saved) : [];
  });

  // باقات OpenTik
  const packages = [
    {
      id: 'PKG-01',
      title: 'منظومة المراقبة الذكية الفائقة (IP 4K AI Enterprise)',
      category: 'كاميرات المراقبة',
      priceUSD: 1350,
      warranty: 'عامان ضمان استبدال',
      items: [
        { name: '4K Ultra-HD Smart AI IP Camera (Motorized Zoom)', qty: 8, price: 85 },
        { name: 'Enterprise NVR 16CH 4K with 6TB WD Purple HDD', qty: 1, price: 420 },
        { name: '16-Port PoE Managed Switch Gigabit High-Power', qty: 1, price: 150 },
        { name: 'Outdoor Rack Enclosure, Cabling & Setup', qty: 1, price: 100 }
      ]
    },
    {
      id: 'PKG-02',
      title: 'محطة الطاقة البديلة الهجينة (Hybrid Solar 10KW Pro)',
      category: 'الطاقة البديلة',
      priceUSD: 4900,
      warranty: '5 سنوات على بنك البطاريات',
      items: [
        { name: 'Deye 10KW Three-Phase Hybrid Solar Inverter', qty: 1, price: 1900 },
        { name: 'LiFePO4 10KWh Wall-Mounted Lithium Battery (6000 Cycles)', qty: 2, price: 1300 },
        { name: 'Heavy-Duty AC/DC Protection Box & Surge Arresters', qty: 1, price: 400 }
      ]
    },
    {
      id: 'PKG-03',
      title: 'البنية التحتية للشبكات المؤسسية (Enterprise WiFi 6)',
      category: 'الشبكات والـ IT',
      priceUSD: 1150,
      warranty: 'عام كامل',
      items: [
        { name: 'MikroTik Cloud Core Router Multi-WAN Failover', qty: 1, price: 280 },
        { name: 'Ruijie Reyee WiFi 6 High-Density Ceiling Access Points', qty: 4, price: 140 },
        { name: 'Smart PoE Switch 24-Port with Server Rack 9U', qty: 1, price: 310 }
      ]
    }
  ];

  // الحفظ التلقائي المحلي
  useEffect(() => { localStorage.setItem('opentik_global_settings', JSON.stringify(systemSettings)); }, [systemSettings]);
  useEffect(() => { localStorage.setItem('opentik_global_clients', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('opentik_global_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('opentik_global_quotations', JSON.stringify(quotations)); }, [quotations]);
  useEffect(() => { localStorage.setItem('opentik_global_vouchers', JSON.stringify(vouchers)); }, [vouchers]);

  // النوافذ المنبثقة
  const [viewClientDetails, setViewClientDetails] = useState(null);
  const [statementClient, setStatementClient] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [creatingInvoice, setCreatingInvoice] = useState(false);
  const [creatingQuotation, setCreatingQuotation] = useState(false);
  const [creatingVoucher, setCreatingVoucher] = useState(null);
  const [newClientModal, setNewClientModal] = useState(false);
  const [autoActionModal, setAutoActionModal] = useState(null);

  // النماذج
  const [newClientForm, setNewClientForm] = useState({ name: '', contactPerson: '', phone: '', address: '', mapCoordinates: '15.3524,44.2075', system: 'كاميرات مراقبة وشبكات', warrantyExpiry: '2027-09-15', devices: '' });
  const [invoiceForm, setInvoiceForm] = useState({ id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15', items: [{ name: '', qty: 1, price: 0 }], taxRate: 0, discount: 0, paid: 0, notes: '' });
  const [quotationForm, setQuotationForm] = useState({ id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15', validUntil: '2026-09-30', items: [{ name: '', qty: 1, price: 0 }], notes: '' });
  const [voucherForm, setVoucherForm] = useState({ amount: '', method: 'نقداً', notes: '' });

  // الحسابات والعملات
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

  // تنسيق العملات العالمية المتطورة
  const formatMoney = (amountUSD) => {
    const rate = systemSettings.exchangeRates[currency] || 1;
    const converted = Math.round(amountUSD * rate);
    const symbols = { USD: '$', EUR: '€', SAR: 'ر.س', AED: 'د.إ', YER: 'ريال' };
    return converted.toLocaleString() + ' ' + (symbols[currency] || currency);
  };

  // توليد PDF محلياً عالي الجودة
  const generateNativePdfBase64 = async () => {
    const element = document.getElementById('unified-printable-document');
    if (!element) return null;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    const dataUri = pdf.output('datauristring');
    return dataUri.split(',')[1];
  };

  // مشاركة PDF عبر واتساب
  const handleSharePdfToWhatsApp = async () => {
    if (!autoActionModal || !autoActionModal.data || isProcessingPdf) return;
    setIsProcessingPdf(true);
    showNotification(lang === 'ar' ? 'جاري إنشاء ملف PDF وإرفاقه...' : 'Generating & attaching PDF...');

    try {
      const base64Data = await generateNativePdfBase64();
      if (!base64Data) { setIsProcessingPdf(false); return; }

      const doc = autoActionModal.data;
      const fileName = (doc.id || 'Doc') + '_' + (doc.client || 'Client').replace(/\s+/g, '_') + '.pdf';

      if (Capacitor.isNativePlatform()) {
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Cache
        });

        await Share.share({
          title: doc.id + ' - ' + systemSettings.companyNameAr,
          text: (lang === 'ar' ? 'مرفق لكم المستند الرسمي PDF رقم ' : 'Official PDF Document attached: ') + doc.id,
          url: savedFile.uri,
          dialogTitle: 'WhatsApp / Share Document'
        });
        showNotification(lang === 'ar' ? 'تم إرفاق ملف الـ PDF بنجاح ✔️' : 'PDF Document attached successfully ✔️');
      } else {
        const blob = await (await fetch('data:application/pdf;base64,' + base64Data)).blob();
        const file = new File([blob], fileName, { type: 'application/pdf' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'OpenTik Document' });
        } else {
          showNotification('Document ready');
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') alert('Error: ' + err.message);
    } finally {
      setIsProcessingPdf(false);
    }
  };

  // تنزيل وحفظ PDF في الهاتف
  const handleDownloadPDF = async () => {
    if (!autoActionModal || !autoActionModal.data || isProcessingPdf) return;
    setIsProcessingPdf(true);
    showNotification(lang === 'ar' ? 'جاري حفظ ملف الـ PDF في الهاتف...' : 'Saving PDF to device...');

    try {
      const base64Data = await generateNativePdfBase64();
      if (!base64Data) { setIsProcessingPdf(false); return; }

      const doc = autoActionModal.data;
      const fileName = (doc.id || 'Doc') + '_' + (doc.client || 'Client').replace(/\s+/g, '_') + '.pdf';

      if (Capacitor.isNativePlatform()) {
        const result = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents
        });

        await Share.share({
          title: 'Document Saved',
          text: 'Saved in Documents folder: ' + fileName,
          url: result.uri,
          dialogTitle: 'Open PDF File'
        });
        showNotification(lang === 'ar' ? 'تم حفظ ملف PDF في مجلد Documents 📄' : 'PDF saved to Documents 📄');
      } else {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + base64Data;
        link.download = fileName;
        link.click();
        showNotification(lang === 'ar' ? 'تم تنزيل ملف الـ PDF 📄' : 'PDF downloaded 📄');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setIsProcessingPdf(false);
    }
  };

  // واتساب فوري
  const handleDirectWhatsApp = (phone, text) => {
    const rawPhone = (phone || '').replace(/[^0-9]/g, '');
    const fullPhone = rawPhone.startsWith('967') ? rawPhone : ('967' + rawPhone);
    window.location.href = "whatsapp://send?phone=" + fullPhone + "&text=" + encodeURIComponent(text);
  };

  // تصدير البيانات إلى Excel / CSV
  const exportToCSV = () => {
    const headers = "ID,Client,Phone,System,Date,TotalUSD,PaidUSD,RemainingUSD\n";
    const rows = invoices.map(i => {
      const tot = calculateFinalTotal(i);
      const rem = tot - (i.paid || 0);
      return `"${i.id}","${i.client}","${i.phone}","${i.system}","${i.date}",${tot},${i.paid || 0},${rem}`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'OpenTik_Invoices_' + new Date().toISOString().split('T')[0] + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification(lang === 'ar' ? 'تم تصدير سجل الفواتير إلى ملف CSV / Excel 📊' : 'Exported to CSV / Excel 📊');
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
    showNotification(lang === 'ar' ? 'تم حفظ الفاتورة بنجاح ✔️' : 'Invoice saved successfully ✔️');
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
        notes: systemSettings.defaultWarrantyAr
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
        notes: "Official Quotation valid for 15 days - OpenTik Package: " + pkg.title
      });
      setCreatingQuotation(true);
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm) || c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={"min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans " + (lang === 'ar' ? 'rtl' : 'ltr')} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* Global Header */}
      <header className="bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
              OP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-white">{lang === 'ar' ? systemSettings.companyNameAr : systemSettings.companyNameEn}</h1>
                <span className="text-[10px] bg-gradient-to-r from-blue-500/20 to-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/30">Global v3.0</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400">{lang === 'ar' ? systemSettings.taglineAr : systemSettings.taglineEn}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-bold transition flex items-center gap-1"
              title="Switch Language / تبديل اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Currency Selector */}
            <select 
              value={currency} 
              onChange={e => setCurrency(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-emerald-400 focus:outline-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="SAR">SAR (ر.س)</option>
              <option value="AED">AED (د.إ)</option>
              <option value="YER">YER (ريال)</option>
            </select>

            <button 
              onClick={() => setActiveTab('settings')}
              className={"p-1.5 rounded-lg border transition " + (activeTab === 'settings' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300')}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          <button onClick={() => setActiveTab('dashboard')} className={"px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Shield className="w-3.5 h-3.5" /> {t.dashboard}
          </button>
          <button onClick={() => setActiveTab('clients')} className={"px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'clients' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Users className="w-3.5 h-3.5" /> {t.clients} ({clients.length})
          </button>
          <button onClick={() => setActiveTab('invoices')} className={"px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'invoices' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <FileText className="w-3.5 h-3.5" /> {t.invoices} ({invoices.length})
          </button>
          <button onClick={() => setActiveTab('quotations')} className={"px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'quotations' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <FileCheck className="w-3.5 h-3.5" /> {t.quotations} ({quotations.length})
          </button>
          <button onClick={() => setActiveTab('packages')} className={"px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'packages' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Layers className="w-3.5 h-3.5" /> {t.packages}
          </button>
          <button onClick={() => setActiveTab('settings')} className={"px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'settings' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Settings className="w-3.5 h-3.5" /> {t.settings}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-4 flex-1 max-w-6xl w-full mx-auto space-y-5">
        
        {/* ================= 1. Dashboard ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">{t.totalSales}</span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1 font-mono">{formatMoney(totalSalesUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">{t.collected}</span>
                <h3 className="text-lg sm:text-xl font-black text-emerald-400 mt-1 font-mono">{formatMoney(totalCollectedUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">{t.outstanding}</span>
                <h3 className="text-lg sm:text-xl font-black text-rose-400 mt-1 font-mono">{formatMoney(totalOutstandingUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">{t.activeClients}</span>
                <h3 className="text-lg sm:text-xl font-black text-cyan-400 mt-1 font-mono">{clients.length}</h3>
              </div>
            </div>

            {/* Collection Progress & Quick CSV Export */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold text-slate-300">{t.collectionRate}</span>
                  <span className="font-mono text-emerald-400 font-bold">{collectionRate}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: collectionRate + '%' }}></div>
                </div>
              </div>

              <button 
                onClick={exportToCSV}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>{t.exportCsv}</span>
              </button>
            </div>

            {/* Systems Specialties */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" /> {t.systemSpecialties}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Camera className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">{t.cctv}</span>
                  <span className="text-[10px] text-slate-400">4K IP & Smart Vision</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Wifi className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">{t.networks}</span>
                  <span className="text-[10px] text-slate-400">PoE & SD-WAN</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Sun className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">{t.solar}</span>
                  <span className="text-[10px] text-slate-400">Hybrid & Lithium</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">{t.security}</span>
                  <span className="text-[10px] text-slate-400">Biometric & Alarm</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
                  <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">{t.sla}</span>
                  <span className="text-[10px] text-slate-400">24/7 Priority Support</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. Clients CRM with Google Maps ================= */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between gap-3">
              <div className="relative flex-1">
                <Search className={"w-4 h-4 absolute top-3 text-slate-400 " + (lang === 'ar' ? 'right-3' : 'left-3')} />
                <input 
                  type="text" 
                  placeholder={t.searchClient} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={"w-full bg-slate-950 border border-slate-700 rounded-lg py-2 text-xs text-white " + (lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3')}
                />
              </div>
              <button onClick={() => setNewClientModal(true)} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow">
                <Plus className="w-4 h-4" /> {t.addClient}
              </button>
            </div>

            <div className="grid gap-3">
              {filteredClients.map(c => (
                <div key={c.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{c.id}</span>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {t.warranty}: {c.warrantyStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {c.contactPerson} | {c.phone} | {c.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Google Maps Location Button */}
                    <a 
                      href={"https://maps.google.com/?q=" + (c.mapCoordinates || '15.3524,44.2075')}
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition"
                      title={t.clientLocation}
                    >
                      <MapPin className="w-4 h-4" />
                    </a>

                    <button onClick={() => handleDirectWhatsApp(c.phone, 'Hello ' + c.name + ', greetings from OpenTik Smart Systems.')} className="p-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded-lg">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => setStatementClient(c)}
                      className="px-3 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" /> {t.statement}
                    </button>

                    <button onClick={() => setViewClientDetails(c)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs">
                      {lang === 'ar' ? 'الأجهزة' : 'Devices'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. Invoices ================= */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">{t.invoices}</h3>
                <p className="text-xs text-slate-400">{lang === 'ar' ? 'إصدار الفواتير الرسمية مع خيارات المشاركة والحفظ' : 'Manage invoices, generate bilingual PDFs & share'}</p>
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
                    notes: lang === 'ar' ? systemSettings.defaultWarrantyAr : systemSettings.defaultWarrantyEn
                  });
                  setCreatingInvoice(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> {t.newInvoice}
              </button>
            </div>

            <div className="grid gap-3">
              {invoices.map(inv => {
                const finalTotal = calculateFinalTotal(inv);
                const remaining = finalTotal - (inv.paid || 0);
                return (
                  <div key={inv.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{inv.id}</span>
                          <h4 className="font-bold text-white">{inv.client}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{inv.phone} | {inv.date}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <button 
                          onClick={() => setAutoActionModal({ type: 'invoice', data: inv })}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs flex items-center gap-1.5 font-bold shadow"
                        >
                          <Eye className="w-3.5 h-3.5" /> {t.previewSend}
                        </button>
                        <button 
                          onClick={() => setEditingInvoice(JSON.parse(JSON.stringify(inv)))}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> {t.edit}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-lg text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.total}</span>
                        <span className="font-bold text-white font-mono">{formatMoney(finalTotal)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.paid}</span>
                        <span className="font-bold text-emerald-400 font-mono">{formatMoney(inv.paid || 0)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.remaining}</span>
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

        {/* ================= 4. Packages Catalog ================= */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white">{t.packages}</h3>
              <p className="text-xs text-slate-400">{lang === 'ar' ? 'تحويل الباقة فوراً إلى فاتورة أو عرض سعر معتمد بضغطة زر' : 'Convert ready solutions to Invoices or Quotations instantly'}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] text-blue-400 font-semibold">{pkg.category}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{pkg.title}</h4>
                    <span className="text-[11px] text-emerald-400 font-medium block mt-1">{t.warranty}: {pkg.warranty}</span>
                    
                    <div className="my-3">
                      <span className="text-lg font-black text-white font-mono">{formatMoney(pkg.priceUSD)}</span>
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
                      <FileText className="w-3.5 h-3.5" /> {t.convertInvoice}
                    </button>
                    <button 
                      onClick={() => handlePackageAction(pkg, 'quotation')}
                      className="bg-amber-600 hover:bg-amber-500 text-white rounded-lg py-2 text-xs font-bold transition flex items-center justify-center gap-1 shadow"
                    >
                      <FileCheck className="w-3.5 h-3.5" /> {t.convertQuote}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 5. Global Settings ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" /> {t.companySettings}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2">Profile & Branding (Arabic / English)</h4>
                <div>
                  <label className="text-slate-400 block mb-1">Company Name (Arabic)</label>
                  <input type="text" value={systemSettings.companyNameAr} onChange={e => setSystemSettings({...systemSettings, companyNameAr: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Company Name (English)</label>
                  <input type="text" value={systemSettings.companyNameEn} onChange={e => setSystemSettings({...systemSettings, companyNameEn: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">CR Number</label>
                    <input type="text" value={systemSettings.crNumber} onChange={e => setSystemSettings({...systemSettings, crNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Tax / VAT Number</label>
                    <input type="text" value={systemSettings.taxNumber} onChange={e => setSystemSettings({...systemSettings, taxNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2">Exchange Rates (Relative to 1 USD)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">1 USD = EUR (€)</label>
                    <input type="number" step="0.01" value={systemSettings.exchangeRates.EUR} onChange={e => setSystemSettings({...systemSettings, exchangeRates: {...systemSettings.exchangeRates, EUR: Number(e.target.value)}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">1 USD = SAR (ر.س)</label>
                    <input type="number" step="0.01" value={systemSettings.exchangeRates.SAR} onChange={e => setSystemSettings({...systemSettings, exchangeRates: {...systemSettings.exchangeRates, SAR: Number(e.target.value)}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">1 USD = AED (د.إ)</label>
                    <input type="number" step="0.01" value={systemSettings.exchangeRates.AED} onChange={e => setSystemSettings({...systemSettings, exchangeRates: {...systemSettings.exchangeRates, AED: Number(e.target.value)}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">1 USD = YER (ريال)</label>
                    <input type="number" value={systemSettings.exchangeRates.YER} onChange={e => setSystemSettings({...systemSettings, exchangeRates: {...systemSettings.exchangeRates, YER: Number(e.target.value)}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => showNotification(lang === 'ar' ? 'تم حفظ كافة الإعدادات بنجاح 💾' : 'Settings saved successfully 💾')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-1.5 shadow">
                <Save className="w-4 h-4" /> {t.save}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ================= Modal: Action Center & PDF Export ================= */}
      {autoActionModal && autoActionModal.data && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-md w-full p-5 space-y-4 shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  {autoActionModal.data.id}
                </h3>
              </div>
              <button onClick={() => setAutoActionModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <p><strong className="text-slate-400">{lang === 'ar' ? 'العميل: ' : 'Client: '}</strong>{autoActionModal.data.client}</p>
              <p><strong className="text-slate-400">{lang === 'ar' ? 'الهاتف: ' : 'Phone: '}</strong>{autoActionModal.data.phone || 'N/A'}</p>
              {autoActionModal.type === 'invoice' && (
                <div className="pt-1 border-t border-slate-800 flex justify-between font-bold">
                  <span>{t.total}:</span>
                  <span className="font-mono text-emerald-400">{formatMoney(calculateFinalTotal(autoActionModal.data))}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-2.5 pt-1 text-xs">
              <button 
                onClick={handleSharePdfToWhatsApp}
                disabled={isProcessingPdf}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl py-3 font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 text-xs"
              >
                <Share2 className="w-4 h-4" /> 
                <span>{isProcessingPdf ? (lang === 'ar' ? 'جاري التجهيز...' : 'Processing...') : t.shareWhatsAppPdf}</span>
              </button>

              <button 
                onClick={handleDownloadPDF}
                disabled={isProcessingPdf}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-xl py-2.5 font-bold transition flex items-center justify-center gap-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-cyan-400" /> 
                <span>{t.downloadPdf}</span>
              </button>

              <button 
                onClick={() => {
                  const doc = autoActionModal.data;
                  const tot = calculateFinalTotal(doc);
                  const rem = tot - (doc.paid || 0);
                  const msg = (lang === 'ar' ? 'مرحباً ' : 'Hello ') + doc.client + ',\n' + doc.id + ' | Total: $' + tot + ' | Due: $' + rem;
                  handleDirectWhatsApp(doc.phone, msg);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl py-2 font-medium transition flex items-center justify-center gap-1.5 border border-slate-800 text-[11px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.directWhatsApp}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setAutoActionModal(null)} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Modal: Statement of Account ================= */}
      {statementClient && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">{t.statement}: {statementClient.name}</h3>
              <button onClick={() => setStatementClient(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between">
                <div>
                  <span className="text-slate-400 block">{statementClient.phone}</span>
                  <span className="text-slate-400 block mt-0.5">{statementClient.system}</span>
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block">{t.outstanding}:</span>
                  <span className="text-base font-bold text-rose-400 font-mono">{formatMoney(statementClient.balance)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-300 block">{lang === 'ar' ? 'سجل الفواتير والمعاملات:' : 'Billing Ledger:'}</span>
                {invoices.filter(i => i.client === statementClient.name).map(inv => (
                  <div key={inv.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-mono text-blue-400 font-bold ml-1">{inv.id}</span>
                      <span className="text-slate-400 text-[10px]">{inv.date}</span>
                    </div>
                    <div className="text-left">
                      <span className="font-mono text-white block">{formatMoney(calculateFinalTotal(inv))}</span>
                      <span className="text-[10px] text-emerald-400">{"Paid: " + formatMoney(inv.paid || 0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setStatementClient(null)} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">{t.close}</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Printable Global Bilingual Invoice Template ================= */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '794px', opacity: 0, pointerEvents: 'none', zIndex: -100 }}>
        {autoActionModal && autoActionModal.data && (
          <div id="unified-printable-document" className="p-8 bg-white text-slate-900 text-right font-sans" dir="rtl">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-blue-600 pb-4 mb-5">
              <div>
                <h1 className="text-2xl font-black text-blue-700">{systemSettings.companyNameAr}</h1>
                <h2 className="text-sm font-bold text-slate-600 tracking-wider font-sans">{systemSettings.companyNameEn}</h2>
                <p className="text-[11px] text-slate-500 font-mono mt-1">CR: {systemSettings.crNumber} | VAT ID: {systemSettings.taxNumber}</p>
              </div>
              <div className="text-left font-mono">
                <span className="text-xl font-bold text-slate-900 block font-sans">
                  {autoActionModal.type === 'invoice' ? 'TAX INVOICE / فاتورة ضريبية' : 'OFFICIAL QUOTATION / عرض سعر'}
                </span>
                <span className="text-xs text-blue-600 font-bold">Doc #: {autoActionModal.data.id}</span>
                <p className="text-xs text-slate-500">Date: {autoActionModal.data.date || '2026-09-15'}</p>
              </div>
            </div>

            {/* Client & Bank Details */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg mb-5 border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-1">Customer Details / بيانات العميل:</span>
                <p className="font-semibold text-slate-800">{autoActionModal.data.client}</p>
                <p className="text-slate-600">Tel: {autoActionModal.data.phone}</p>
                <p className="text-slate-600">Domain: {autoActionModal.data.system || 'Smart Systems'}</p>
              </div>
              <div className="text-left font-mono">
                <span className="font-bold text-slate-800 block mb-1 font-sans">Approved Bank Accounts / الحسابات:</span>
                <p className="text-slate-600">Kuraimi: {systemSettings.bankKuraimi}</p>
                <p className="text-slate-600">Tadhamon: {systemSettings.bankTadhamon}</p>
                <p className="text-slate-600">Qutaibi: {systemSettings.bankQutaibi}</p>
              </div>
            </div>

            {/* Items Table */}
            {autoActionModal.data.items && (
              <table className="w-full text-right border-collapse mb-5 text-xs">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Item Description / البيان والمواصفات</th>
                    <th className="p-2 border text-center">Qty / الكمية</th>
                    <th className="p-2 border text-center">Unit ($)</th>
                    <th className="p-2 border text-center">Total ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {autoActionModal.data.items.map((it, idx) => (
                    <tr key={idx} className="border-b border-slate-200">
                      <td className="p-2 border text-center font-mono">{idx + 1}</td>
                      <td className="p-2 border font-semibold">{it.name}</td>
                      <td className="p-2 border text-center font-mono">{it.qty}</td>
                      <td className="p-2 border text-center font-mono">{"$" + it.price}</td>
                      <td className="p-2 border text-center font-mono font-bold">{"$" + (it.qty * it.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Financial Summary & QR Verification */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-1/2 p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                <span className="font-bold block mb-1">Warranty & SLA Conditions / الشروط والضمان:</span>
                <p className="text-slate-600 leading-relaxed">{autoActionModal.data.notes || systemSettings.defaultWarrantyAr}</p>
              </div>

              {autoActionModal.type === 'invoice' && (
                <div className="w-1/3 space-y-1 text-xs">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-bold font-mono">{"$" + calculateSubtotal(autoActionModal.data.items)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-sm font-black">
                    <span>Total USD:</span>
                    <span className="text-blue-700 font-mono">{"$" + calculateFinalTotal(autoActionModal.data)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-emerald-700">
                    <span>Paid Funds:</span>
                    <span className="font-bold font-mono">{"$" + (autoActionModal.data.paid || 0)}</span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-sm text-rose-600">
                    <span>Remaining Due:</span>
                    <span className="font-mono">{"$" + (calculateFinalTotal(autoActionModal.data) - (autoActionModal.data.paid || 0))}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Signatures and Stamp */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-300 text-xs">
              <div className="text-center">
                <p className="text-slate-500 mb-6">Receiver Signature / المستلم</p>
                <p className="text-slate-400">....................................</p>
              </div>

              {/* Digital E-Invoice QR Code Stamp */}
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 border-2 border-slate-800 p-1 bg-slate-50 flex items-center justify-center font-mono text-[8px] text-center leading-tight">
                  [QR-E-INVOICE]<br/>OPENTIK<br/>{autoActionModal.data.id}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 font-mono">Verified Digital Invoice</span>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-700 flex flex-col items-center justify-center text-blue-700 font-bold p-2 rotate-[-12deg]">
                  <span className="text-[10px]">OpenTik Systems</span>
                  <span className="text-[12px] font-black">APPROVED</span>
                  <span className="text-[8px]">Finance Dept</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
