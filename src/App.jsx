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
