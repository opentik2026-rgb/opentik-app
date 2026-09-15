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

  // 1. إعدادات النظام الشاملة
  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('opentik_settings_clean');
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
        { id: 'ENG-02', name: 'م. أحمد الخولاني', phone: '772233445', specialty: 'طاقة بديلة وانفرتر' },
        { id: 'ENG-03', name: 'م. مروان الصبري', phone: '773344556', specialty: 'أنظمة أمان وبصمة' }
      ],
      defaultWarrantyAr: 'ضمان رسمي معتمد لمدة عام كامل يشمل الاستبدال الفوري وقطع الغيار الأصلية ضد عيوب المصنع.'
    };
  });

  // 2. قاعدة بيانات العملاء
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('opentik_clients_clean');
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

  // 3. الفواتير
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('opentik_invoices_clean');
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

  // 4. عروض الأسعار
  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem('opentik_quotations_clean');
    return saved ? JSON.parse(saved) : [];
  });

  // 5. سندات القبض
  const [vouchers, setVouchers] = useState(() => {
    const saved = localStorage.getItem('opentik_vouchers_clean');
    return saved ? JSON.parse(saved) : [
      { id: 'RV-201', invoiceId: 'INV-1001', client: 'شركة النجم الذهبي للتجارة', phone: '777112233', amount: 500, date: '2026-09-10', method: 'تحويل بنكي', notes: 'دفعة أولى مقدمة مع التوريد' }
    ];
  });

  // 6. باقات الكتالوج
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
    },
    {
      id: 'PKG-02',
      title: 'محطة الطاقة البديلة الهجينة (Hybrid Solar 10KW)',
      category: 'الطاقة البديلة',
      priceUSD: 4900,
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
      priceUSD: 1150,
      warranty: 'عام كامل',
      items: [
        { name: 'راوتر مايكروتك MikroTik Cloud Router متقدم', qty: 1, price: 280 },
        { name: 'نقاط وصول سقفية Ruijie Reyee WiFi 6 للأعمال', qty: 4, price: 140 },
        { name: 'سويتش PoE إدارة كاملة وسيرفر راك مجهز', qty: 1, price: 310 }
      ]
    }
  ];

  // الحفظ التلقائي في الذاكرة
  useEffect(() => { localStorage.setItem('opentik_settings_clean', JSON.stringify(systemSettings)); }, [systemSettings]);
  useEffect(() => { localStorage.setItem('opentik_clients_clean', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('opentik_invoices_clean', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('opentik_quotations_clean', JSON.stringify(quotations)); }, [quotations]);
  useEffect(() => { localStorage.setItem('opentik_vouchers_clean', JSON.stringify(vouchers)); }, [vouchers]);

  // النوافذ المنبثقة
  const [clientModal, setClientModal] = useState({ open: false, mode: 'create', data: null });
  const [invoiceModal, setInvoiceModal] = useState({ open: false, mode: 'create', data: null });
  const [quotationModal, setQuotationModal] = useState({ open: false, mode: 'create', data: null });
  const [voucherModal, setVoucherModal] = useState({ open: false, data: null });
  const [viewClientDetails, setViewClientDetails] = useState(null);
  const [statementClient, setStatementClient] = useState(null);
  const [autoActionModal, setAutoActionModal] = useState(null);
  const [newEngineerModal, setNewEngineerModal] = useState(false);
  const [newBankModal, setNewBankModal] = useState(false);

  // نماذج الإدخال
  const [clientFormData, setClientFormData] = useState({
    name: '', contactPerson: '', phone: '', address: '', mapCoordinates: '15.3524,44.2075', system: 'كاميرات مراقبة وشبكات', warrantyExpiry: '2027-09-15', devicesText: ''
  });

  const [invoiceFormData, setInvoiceFormData] = useState({
    id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15',
    items: [{ name: '', qty: 1, price: 0 }],
    taxRate: 0, discount: 0, paid: 0, notes: ''
  });

  const [quotationFormData, setQuotationFormData] = useState({
    id: '', client: '', phone: '', system: 'كاميرات مراقبة وشبكات', date: '2026-09-15', validUntil: '2026-10-01',
    items: [{ name: '', qty: 1, price: 0 }], notes: ''
  });

  const [voucherFormData, setVoucherFormData] = useState({ amount: '', method: 'نقداً', notes: '' });
  const [engineerFormData, setEngineerFormData] = useState({ name: '', phone: '', specialty: 'كاميرات مراقبة' });
  const [bankFormData, setBankFormData] = useState({ bank: '', account: '', holder: 'شركة OpenTik' });

  // الحسابات الرياضية
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

  // ================= إجراءات العملاء (شغالة 100%) =================
  const handleOpenCreateClient = () => {
    setClientFormData({
      name: '', contactPerson: '', phone: '', address: '', mapCoordinates: '15.3524,44.2075', system: 'كاميرات مراقبة وشبكات', warrantyExpiry: '2027-09-15', devicesText: 'كاميرات مراقبة بدقة 5MP\nجهاز تسجيل NVR\nسويتش شبكة PoE'
    });
    setClientModal({ open: true, mode: 'create', data: null });
  };

  const handleOpenEditClient = (client) => {
    setClientFormData({
      name: client.name || '',
      contactPerson: client.contactPerson || '',
      phone: client.phone || '',
      address: client.address || '',
      mapCoordinates: client.mapCoordinates || '15.3524,44.2075',
      system: client.system || 'كاميرات مراقبة وشبكات',
      warrantyExpiry: client.warrantyExpiry || '2027-09-15',
      devicesText: (client.installedDevices || []).join('\n')
    });
    setClientModal({ open: true, mode: 'edit', data: client });
  };

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
      showNotification('تمت إضافة العميل والمنشأة بنجاح ✔️');
    } else {
      const updatedList = clients.map(c => c.id === clientModal.data.id ? {
        ...c,
        name: clientFormData.name,
        contactPerson: clientFormData.contactPerson || 'المسؤول',
        phone: clientFormData.phone,
        address: clientFormData.address,
        mapCoordinates: clientFormData.mapCoordinates,
        system: clientFormData.system,
        warrantyExpiry: clientFormData.warrantyExpiry,
        installedDevices: devicesList
      } : c);
      setClients(updatedList);
      showNotification('تم تحديث بيانات العميل بنجاح ✔️');
    }
    setClientModal({ open: false, mode: 'create', data: null });
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العميل وسجلاته؟')) {
      setClients(clients.filter(c => c.id !== clientId));
      showNotification('تم حذف العميل بنجاح');
    }
  };

  // ================= إجراءات الفواتير =================
  const handleOpenCreateInvoice = (clientObj = null) => {
    setInvoiceFormData({
      id: "INV-" + (1000 + invoices.length + 1),
      client: clientObj ? clientObj.name : (clients[0] ? clients[0].name : ''),
      phone: clientObj ? clientObj.phone : (clients[0] ? clients[0].phone : ''),
      system: clientObj ? clientObj.system : 'كاميرات مراقبة وشبكات',
      date: new Date().toISOString().split('T')[0],
      items: [{ name: '', qty: 1, price: 0 }],
      taxRate: systemSettings.defaultTaxRate || 0,
      discount: 0,
      paid: 0,
      notes: systemSettings.defaultWarrantyAr
    });
    setInvoiceModal({ open: true, mode: 'create', data: null });
  };

  const handleOpenEditInvoice = (inv) => {
    setInvoiceFormData(JSON.parse(JSON.stringify(inv)));
    setInvoiceModal({ open: true, mode: 'edit', data: inv });
  };

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
      showNotification('تم حفظ الفاتورة بنجاح وجاري فتح المعاينة ✔️');
    } else {
      setInvoices(invoices.map(i => i.id === invoiceModal.data.id ? invoiceFormData : i));
      setInvoiceModal({ open: false, mode: 'edit', data: null });
      setAutoActionModal({ type: 'invoice', data: invoiceFormData });
      showNotification('تم تحديث الفاتورة بنجاح ✔️');
    }
  };

  const handleDeleteInvoice = (invId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
      setInvoices(invoices.filter(i => i.id !== invId));
      showNotification('تم حذف الفاتورة بنجاح');
    }
  };

  // ================= إجراءات سندات القبض =================
  const handleOpenCreateVoucher = (inv) => {
    const finalTot = calculateFinalTotal(inv);
    const rem = Math.max(0, finalTot - (inv.paid || 0));
    setVoucherFormData({
      amount: rem > 0 ? rem : '',
      method: 'نقداً',
      notes: 'سداد دفعة من فاتورة رقم ' + inv.id
    });
    setVoucherModal({ open: true, data: inv });
  };

  const handleSaveVoucherSubmit = (e) => {
    e.preventDefault();
    if (!voucherFormData.amount || Number(voucherFormData.amount) <= 0) return;
    const amt = Number(voucherFormData.amount);
    const targetInv = voucherModal.data;

    const newVoucher = {
      id: "RV-" + (200 + vouchers.length + 1),
      invoiceId: targetInv.id,
      client: targetInv.client,
      phone: targetInv.phone,
      amount: amt,
      date: new Date().toISOString().split('T')[0],
      method: voucherFormData.method,
      notes: voucherFormData.notes || ('سداد من فاتورة رقم ' + targetInv.id)
    };

    setVouchers([newVoucher, ...vouchers]);
    setInvoices(invoices.map(i => i.id === targetInv.id ? { ...i, paid: (i.paid || 0) + amt } : i));
    setClients(clients.map(c => c.name === targetInv.client ? { ...c, balance: Math.max(0, (c.balance || 0) - amt) } : c));

    setVoucherModal({ open: false, data: null });
    setAutoActionModal({ type: 'voucher', data: newVoucher });
    showNotification('تم إصدار سند القبض وتحديث الحسابات 💵');
  };

  // ================= إجراءات عروض الأسعار =================
  const handleSaveQuotationSubmit = (e) => {
    e.preventDefault();
    const newQt = { ...quotationFormData, id: quotationFormData.id || ("QT-" + (300 + quotations.length + 1)) };
    setQuotations([newQt, ...quotations]);
    setQuotationModal({ open: false, mode: 'create', data: null });
    setAutoActionModal({ type: 'quotation', data: newQt });
    showNotification('تم حفظ عرض السعر بنجاح 📋');
  };

  const handleConvertQuotationToInvoice = (qt) => {
    setInvoiceFormData({
      id: "INV-" + (1000 + invoices.length + 1),
      client: qt.client,
      phone: qt.phone,
      system: qt.system,
      date: new Date().toISOString().split('T')[0],
      items: JSON.parse(JSON.stringify(qt.items)),
      taxRate: systemSettings.defaultTaxRate || 0,
      discount: 0,
      paid: 0,
      notes: "محولة من عرض السعر رقم: " + qt.id
    });
    setInvoiceModal({ open: true, mode: 'create', data: null });
  };

  // ================= تحويل باقة الكتالوج =================
  const handlePackageAction = (pkg, actionType) => {
    const selectedClient = clients[0] || { name: '', phone: '', system: pkg.category };
    if (actionType === 'invoice') {
      setInvoiceFormData({
        id: "INV-" + (1000 + invoices.length + 1),
        client: selectedClient.name,
        phone: selectedClient.phone,
        system: pkg.category,
        date: new Date().toISOString().split('T')[0],
        items: JSON.parse(JSON.stringify(pkg.items)),
        taxRate: 0,
        discount: 0,
        paid: 0,
        notes: "باقة OpenTik المعتمدة: " + pkg.title + " (" + pkg.warranty + ")"
      });
      setInvoiceModal({ open: true, mode: 'create', data: null });
    } else {
      setQuotationFormData({
        id: "QT-" + (300 + quotations.length + 1),
        client: selectedClient.name,
        phone: selectedClient.phone,
        system: pkg.category,
        date: new Date().toISOString().split('T')[0],
        validUntil: '2026-10-01',
        items: JSON.parse(JSON.stringify(pkg.items)),
        notes: "عرض سعر رسمي ساري المفعول - باقة: " + pkg.title
      });
      setQuotationModal({ open: true, mode: 'create', data: null });
    }
  };

  // واتساب فوري مباشر
  const handleDirectWhatsApp = (phone, text) => {
    const rawPhone = (phone || '').replace(/[^0-9]/g, '');
    const fullPhone = rawPhone.startsWith('967') ? rawPhone : ('967' + rawPhone);
    window.location.href = "whatsapp://send?phone=" + fullPhone + "&text=" + encodeURIComponent(text);
  };

  // نسخ تفاصيل الفاتورة
  const handleCopyInvoiceText = (doc) => {
    const tot = calculateFinalTotal(doc);
    const rem = tot - (doc.paid || 0);
    const text = `فاتورة رقم: ${doc.id}\nالعميل: ${doc.client}\nالنظام: ${doc.system}\nالإجمالي: $${tot}\nالمسدد: $${doc.paid || 0}\nالمتبقي: $${rem}\nشركة OpenTik للأنظمة الذكية`;
    navigator.clipboard.writeText(text);
    showNotification('تم نسخ تفاصيل الفاتورة بنجاح 📋');
  };

  // تصدير CSV
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
    link.download = 'OpenTik_Invoices_' + new Date().toISOString().split('T')[0] + '.csv';
    link.click();
    showNotification('تم تصدير سجل الفواتير إلى ملف CSV / Excel 📊');
  };

  // نسخ احتياطي JSON
  const handleExportBackup = () => {
    const data = { systemSettings, clients, invoices, quotations, vouchers, date: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'OpenTik_Backup_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    showNotification('تم تنزيل النسخة الاحتياطية بنجاح 💾');
  };

  // فلترة العملاء الآمنة
  const filteredClients = clients.filter(c => {
    const nameMatch = (c.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = (c.phone || '').includes(searchTerm);
    const contactMatch = (c.contactPerson || '').toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || phoneMatch || contactMatch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* الشريط العلوي */}
      <header className="bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
              OP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-white">{systemSettings.companyNameAr}</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/30">Pro v4.0</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400">{systemSettings.taglineAr}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
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
              className={"p-2 rounded-lg border transition " + (activeTab === 'settings' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300')}
              title="إعدادات النظام"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* التبويبات */}
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          <button onClick={() => setActiveTab('dashboard')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Shield className="w-3.5 h-3.5" /> لوحة التحكم
          </button>
          <button onClick={() => setActiveTab('clients')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'clients' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Users className="w-3.5 h-3.5" /> العملاء ({clients.length})
          </button>
          <button onClick={() => setActiveTab('invoices')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'invoices' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <FileText className="w-3.5 h-3.5" /> الفواتير ({invoices.length})
          </button>
          <button onClick={() => setActiveTab('quotations')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'quotations' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <FileCheck className="w-3.5 h-3.5" /> عروض الأسعار ({quotations.length})
          </button>
          <button onClick={() => setActiveTab('vouchers')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'vouchers' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <DollarSign className="w-3.5 h-3.5" /> سندات القبض ({vouchers.length})
          </button>
          <button onClick={() => setActiveTab('packages')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'packages' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Layers className="w-3.5 h-3.5" /> الكتالوج الذكي
          </button>
          <button onClick={() => setActiveTab('settings')} className={"px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0 " + (activeTab === 'settings' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300')}>
            <Settings className="w-3.5 h-3.5" /> إعدادات النظام
          </button>
        </nav>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-4 flex-1 max-w-6xl w-full mx-auto space-y-5">
        
        {/* ================= 1. لوحة التحكم ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">إجمالي المبيعات والعقود</span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1 font-mono">{formatMoney(totalSalesUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">المحصل الفعلي</span>
                <h3 className="text-lg sm:text-xl font-black text-emerald-400 mt-1 font-mono">{formatMoney(totalCollectedUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">الديون المتبقية</span>
                <h3 className="text-lg sm:text-xl font-black text-rose-400 mt-1 font-mono">{formatMoney(totalOutstandingUSD)}</h3>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow">
                <span className="text-xs text-slate-400">المنشآت النشطة</span>
                <h3 className="text-lg sm:text-xl font-black text-cyan-400 mt-1 font-mono">{clients.length}</h3>
              </div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold text-slate-300">نسبة تحصيل السيولة النقدية:</span>
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
                <span>تصدير البيانات إلى Excel / CSV</span>
              </button>
            </div>

            {/* مجالات وتخصصات OpenTik */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" /> تخصصات ومجالات شركة OpenTik
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Camera className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">كاميرات المراقبة</span>
                  <span className="text-[10px] text-slate-400">4K IP & Smart AI</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Wifi className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">الشبكات والـ IT</span>
                  <span className="text-[10px] text-slate-400">PoE & SD-WAN</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Sun className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">الطاقة البديلة</span>
                  <span className="text-[10px] text-slate-400">Hybrid & Lithium</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">أنظمة الأمان</span>
                  <span className="text-[10px] text-slate-400">بصمة وإنذار سرقة</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
                  <UserCheck className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <span className="text-xs font-bold block text-white">عقود الصيانة SLA</span>
                  <span className="text-[10px] text-slate-400">دعم ميداني دوري</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. إدارة العملاء التفاعلية ================= */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ابحث باسم المنشأة، المسؤول، الهاتف..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-3 py-2 text-xs text-white"
                />
              </div>
              <button 
                onClick={handleOpenCreateClient} 
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> إضافة عميل جديد
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
                        الضمان: {c.warrantyStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      المسؤول: {c.contactPerson} | الهاتف: {c.phone} | العنوان: {c.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <a 
                      href={"https://maps.google.com/?q=" + (c.mapCoordinates || '15.3524,44.2075')}
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition"
                      title="فتح موقع المنشأة في خرائط Google"
                    >
                      <MapPin className="w-4 h-4" />
                    </a>

                    <button onClick={() => handleDirectWhatsApp(c.phone, 'مرحباً ' + c.name + '، معكم شركة OpenTik للأنظمة الذكية.')} className="p-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded-lg" title="محادثة واتساب">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => setStatementClient(c)}
                      className="px-2.5 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" /> كشف حساب
                    </button>

                    <button 
                      onClick={() => setViewClientDetails(c)} 
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs"
                    >
                      الأجهزة المركبة
                    </button>

                    <button 
                      onClick={() => handleOpenEditClient(c)} 
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                      title="تعديل"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button 
                      onClick={() => handleDeleteClient(c.id)} 
                      className="p-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-800 rounded-lg"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. الفواتير ================= */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">فواتير التوريد والتركيب</h3>
                <p className="text-xs text-slate-400">إنشاء وتعديل الفواتير، وعرض المعاينة الرسمية والمشاركة</p>
              </div>
              <button 
                onClick={() => handleOpenCreateInvoice()}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> إنشاء فاتورة جديدة
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
                        <p className="text-xs text-slate-400 mt-1">{inv.phone} | التاريخ: {inv.date} | المنظومة: {inv.system}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <button 
                          onClick={() => setAutoActionModal({ type: 'invoice', data: inv })}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs flex items-center gap-1.5 font-bold shadow"
                        >
                          <Eye className="w-3.5 h-3.5" /> معاينة الفاتورة الرسمية
                        </button>
                        <button 
                          onClick={() => handleOpenCreateVoucher(inv)}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs flex items-center gap-1 font-bold"
                        >
                          <DollarSign className="w-3.5 h-3.5" /> سند قبض
                        </button>
                        <button 
                          onClick={() => handleOpenEditInvoice(inv)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                          title="تعديل"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteInvoice(inv.id)}
                          className="p-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-800 rounded-lg text-xs"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

        {/* ================= 4. عروض الأسعار ================= */}
        {activeTab === 'quotations' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">عروض الأسعار المعتمدة</h3>
                <p className="text-xs text-slate-400">إصدار عروض الأسعار مع إمكانية تحويلها لفاتورة توريد فوراً</p>
              </div>
              <button 
                onClick={() => {
                  setQuotationFormData({
                    id: "QT-" + (300 + quotations.length + 1),
                    client: clients[0] ? clients[0].name : '',
                    phone: clients[0] ? clients[0].phone : '',
                    system: 'كاميرات مراقبة وشبكات',
                    date: new Date().toISOString().split('T')[0],
                    validUntil: '2026-10-01',
                    items: [{ name: '', qty: 1, price: 0 }],
                    notes: 'عرض السعر ساري لمدة 15 يوماً من تاريخه.'
                  });
                  setQuotationModal({ open: true, mode: 'create', data: null });
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> إنشاء عرض سعر
              </button>
            </div>

            <div className="grid gap-3">
              {quotations.map(qt => {
                const total = calculateSubtotal(qt.items);
                return (
                  <div key={qt.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
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
                          <Eye className="w-3.5 h-3.5" /> معاينة العرض
                        </button>
                        <button 
                          onClick={() => handleConvertQuotationToInvoice(qt)}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs flex items-center gap-1 font-bold"
                        >
                          <FileText className="w-3.5 h-3.5" /> تحويل إلى فاتورة
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg text-xs">
                      <div>
                        <span className="text-slate-400">المنظومة: </span>
                        <strong className="text-white">{qt.system}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">الإجمالي: </span>
                        <strong className="text-emerald-400 font-mono text-sm">{formatMoney(total)}</strong>
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
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">سندات القبض المالي</h3>
                <p className="text-xs text-slate-400">سجل التحصيلات المالية المباشرة</p>
              </div>
              <div className="text-left bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">إجمالي المقبوضات</span>
                <span className="text-sm font-black text-emerald-400 font-mono">{formatMoney(totalCollectedUSD)}</span>
              </div>
            </div>

            <div className="grid gap-3">
              {vouchers.map(v => (
                <div key={v.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
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
                      <Eye className="w-3.5 h-3.5" /> معاينة السند
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 6. الكتالوج الذكي ================= */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white">كتالوج الباقات الذكية لشركة OpenTik</h3>
              <p className="text-xs text-slate-400">تحويل الباقة فوراً إلى فاتورة أو عرض سعر معتمد بضغطة زر</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] text-blue-400 font-semibold">{pkg.category}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{pkg.title}</h4>
                    <span className="text-[11px] text-emerald-400 font-medium block mt-1">الضمان: {pkg.warranty}</span>
                    
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

        {/* ================= 7. قسم إعدادات النظام الشامل ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-400" /> إعدادات وتخصيص نظام OpenTik الشامل
                </h3>
                <p className="text-slate-400 mt-0.5">التحكم بكافة بيانات المنشأة، البنوك، المهندسين، والنسخ الاحتياطي</p>
              </div>

              {/* تبويبات الإعدادات */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button 
                  onClick={() => setSettingsSubTab('company')}
                  className={"px-3 py-1.5 rounded-lg font-bold transition " + (settingsSubTab === 'company' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}
                >
                  المنشأة
                </button>
                <button 
                  onClick={() => setSettingsSubTab('financial')}
                  className={"px-3 py-1.5 rounded-lg font-bold transition " + (settingsSubTab === 'financial' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}
                >
                  المالية والعملات
                </button>
                <button 
                  onClick={() => setSettingsSubTab('banks')}
                  className={"px-3 py-1.5 rounded-lg font-bold transition " + (settingsSubTab === 'banks' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}
                >
                  الحسابات البنكية
                </button>
                <button 
                  onClick={() => setSettingsSubTab('engineers')}
                  className={"px-3 py-1.5 rounded-lg font-bold transition " + (settingsSubTab === 'engineers' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}
                >
                  المهندسون
                </button>
                <button 
                  onClick={() => setSettingsSubTab('data')}
                  className={"px-3 py-1.5 rounded-lg font-bold transition " + (settingsSubTab === 'data' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300')}
                >
                  البيانات والنسخ
                </button>
              </div>
            </div>

            {/* 1. بيانات المنشأة */}
            {settingsSubTab === 'company' && (
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" /> الهوية والبيانات الرسمية
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">اسم المنشأة (بالعربي)</label>
                    <input type="text" value={systemSettings.companyNameAr} onChange={e => setSystemSettings({...systemSettings, companyNameAr: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Company Name (English)</label>
                    <input type="text" value={systemSettings.companyNameEn} onChange={e => setSystemSettings({...systemSettings, companyNameEn: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">الأنشطة والشعار (يظهر في رأس الفاتورة)</label>
                    <input type="text" value={systemSettings.taglineAr} onChange={e => setSystemSettings({...systemSettings, taglineAr: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Tagline (English)</label>
                    <input type="text" value={systemSettings.taglineEn} onChange={e => setSystemSettings({...systemSettings, taglineEn: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">رقم السجل التجاري</label>
                    <input type="text" value={systemSettings.crNumber} onChange={e => setSystemSettings({...systemSettings, crNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">الرقم الضريبي (VAT ID)</label>
                    <input type="text" value={systemSettings.taxNumber} onChange={e => setSystemSettings({...systemSettings, taxNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">رقم هاتف المنشأة المعتمد</label>
                    <input type="text" value={systemSettings.phone} onChange={e => setSystemSettings({...systemSettings, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">البريد الإلكتروني</label>
                    <input type="text" value={systemSettings.email} onChange={e => setSystemSettings({...systemSettings, email: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-slate-400 block mb-1">عنوان المنشأة</label>
                    <input type="text" value={systemSettings.addressAr} onChange={e => setSystemSettings({...systemSettings, addressAr: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* 2. المالية والعملات */}
            {settingsSubTab === 'financial' && (
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> أسعار الصرف والضرائب الافتراضية
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">نسبة الضريبة الافتراضية للفواتير (%)</label>
                    <input type="number" value={systemSettings.defaultTaxRate} onChange={e => setSystemSettings({...systemSettings, defaultTaxRate: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">1 دولار = ريال يمني (YER)</label>
                    <input type="number" value={systemSettings.exchangeRates.YER} onChange={e => setSystemSettings({...systemSettings, exchangeRates: {...systemSettings.exchangeRates, YER: Number(e.target.value)}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-mono font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">1 دولار = ريال سعودي (SAR)</label>
                    <input type="number" step="0.01" value={systemSettings.exchangeRates.SAR} onChange={e => setSystemSettings({...systemSettings, exchangeRates: {...systemSettings.exchangeRates, SAR: Number(e.target.value)}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">1 دولار = درهم إماراتي (AED)</label>
                    <input type="number" step="0.01" value={systemSettings.exchangeRates.AED} onChange={e => setSystemSettings({...systemSettings, exchangeRates: {...systemSettings.exchangeRates, AED: Number(e.target.value)}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <label className="text-slate-400 block mb-1">نص الضمان الافتراضي أسفل الفواتير</label>
                  <textarea value={systemSettings.defaultWarrantyAr} onChange={e => setSystemSettings({...systemSettings, defaultWarrantyAr: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white h-16" />
                </div>
              </div>
            )}

            {/* 3. الحسابات البنكية */}
            {settingsSubTab === 'banks' && (
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h4 className="font-bold text-slate-200 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-cyan-400" /> الحسابات البنكية المعتمدة للتحصيل
                  </h4>
                  <button onClick={() => setNewBankModal(true)} className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> إضافة حساب بنكي
                  </button>
                </div>

                <div className="space-y-2">
                  {systemSettings.bankAccounts.map(b => (
                    <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <h5 className="font-bold text-white">{b.bank}</h5>
                        <p className="font-mono text-emerald-400 mt-0.5">رقم الحساب: {b.account}</p>
                        <span className="text-[10px] text-slate-500">اسم المستفيد: {b.holder}</span>
                      </div>
                      <button 
                        onClick={() => {
                          if (systemSettings.bankAccounts.length > 1) {
                            setSystemSettings({ ...systemSettings, bankAccounts: systemSettings.bankAccounts.filter(x => x.id !== b.id) });
                          } else {
                            alert('يجب الإبقاء على حساب بنكي واحد على الأقل.');
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. المهندسون والفنيون */}
            {settingsSubTab === 'engineers' && (
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h4 className="font-bold text-slate-200 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-400" /> مهندسو وفنيو العمليات الميدانية
                  </h4>
                  <button onClick={() => setNewEngineerModal(true)} className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> إضافة مهندس
                  </button>
                </div>

                <div className="space-y-2">
                  {systemSettings.engineers.map(eng => (
                    <div key={eng.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-blue-400 font-bold">{eng.id}</span>
                          <h5 className="font-bold text-white">{eng.name}</h5>
                        </div>
                        <p className="text-slate-400 text-xs mt-0.5">التخصص: {eng.specialty} | هاتف: {eng.phone}</p>
                      </div>
                      <button 
                        onClick={() => {
                          if (systemSettings.engineers.length > 1) {
                            setSystemSettings({ ...systemSettings, engineers: systemSettings.engineers.filter(x => x.id !== eng.id) });
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. النسخ الاحتياطي وإدارة البيانات */}
            {settingsSubTab === 'data' && (
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-purple-400" /> النسخ الاحتياطي وإدارة قاعدة البيانات
                </h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <h5 className="font-bold text-white">تصدير نسخة احتياطية (JSON)</h5>
                    <p className="text-slate-400 text-[11px]">حفظ كامل سجلات العملاء، الفواتير، السندات، والإعدادات بملف خارجي.</p>
                    <button onClick={handleExportBackup} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center justify-center gap-1.5">
                      <Download className="w-4 h-4" /> تصدير نسخة احتياطية الآن
                    </button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <h5 className="font-bold text-white">استعادة نسخة سابقة</h5>
                    <p className="text-slate-400 text-[11px]">اختر ملف JSON للنسخة السابقة لاسترجاع كافة الحركات والأرصدة.</p>
                    <input 
                      type="file" 
                      accept=".json"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          try {
                            const data = JSON.parse(event.target.result);
                            if (data.systemSettings) setSystemSettings(data.systemSettings);
                            if (data.clients) setClients(data.clients);
                            if (data.invoices) setInvoices(data.invoices);
                            if (data.quotations) setQuotations(data.quotations);
                            if (data.vouchers) setVouchers(data.vouchers);
                            showNotification('تم استعادة كافة البيانات والعملاء بنجاح 🔄');
                          } catch (err) {
                            alert('الملف المحدد غير صالح.');
                          }
                        };
                        reader.readAsText(file);
                      }}
                      className="block w-full text-slate-400 text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button onClick={() => showNotification('تم حفظ وتطبيق كافة الإعدادات بنجاح 💾')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-1.5 shadow">
                <Save className="w-4 h-4" /> حفظ كافة التغييرات
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ================= النافذة المنبثقة التفاعلية لإضافة / تعديل عميل ================= */}
      {clientModal.open && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                {clientModal.mode === 'create' ? 'إضافة منشأة وعميل جديد لـ OpenTik' : ('تعديل بيانات العميل: ' + (clientModal.data?.name || ''))}
              </h3>
              <button onClick={() => setClientModal({ open: false, mode: 'create', data: null })} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClientSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">اسم المنشأة أو الشركة *</label>
                <input 
                  type="text" 
                  value={clientFormData.name} 
                  onChange={e => setClientFormData({...clientFormData, name: e.target.value})} 
                  placeholder="مثال: شركة النجم للتجارة الدولية"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" 
                  required 
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-slate-400 block mb-1">اسم المسؤول المباشر</label>
                  <input 
                    type="text" 
                    value={clientFormData.contactPerson} 
                    onChange={e => setClientFormData({...clientFormData, contactPerson: e.target.value})} 
                    placeholder="مثال: أ. محمد العريقي"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">رقم الهاتف / الواتساب *</label>
                  <input 
                    type="text" 
                    value={clientFormData.phone} 
                    onChange={e => setClientFormData({...clientFormData, phone: e.target.value})} 
                    placeholder="مثال: 777112233"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                    required 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-slate-400 block mb-1">عنوان الموقع</label>
                  <input 
                    type="text" 
                    value={clientFormData.address} 
                    onChange={e => setClientFormData({...clientFormData, address: e.target.value})} 
                    placeholder="الشارع - الحي - المدينة"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">إحداثيات الخريطة (Latitude, Longitude)</label>
                  <input 
                    type="text" 
                    value={clientFormData.mapCoordinates} 
                    onChange={e => setClientFormData({...clientFormData, mapCoordinates: e.target.value})} 
                    placeholder="15.3524,44.2075"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-slate-400 block mb-1">المنظومة المنفذة</label>
                  <select 
                    value={clientFormData.system} 
                    onChange={e => setClientFormData({...clientFormData, system: e.target.value})} 
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="كاميرات مراقبة وشبكات">كاميرات مراقبة وشبكات</option>
                    <option value="طاقة بديلة وانفرتر">طاقة بديلة وانفرتر</option>
                    <option value="أنظمة أمان وبصمة">أنظمة أمان وبصمة</option>
                    <option value="شبكات مؤسسية وسيرفرات">شبكات مؤسسية وسيرفرات</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">تاريخ انتهاء الضمان</label>
                  <input 
                    type="date" 
                    value={clientFormData.warrantyExpiry} 
                    onChange={e => setClientFormData({...clientFormData, warrantyExpiry: e.target.value})} 
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">الأجهزة والمنظومات المركبة في الموقع (اكتب كل جهاز بسطر)</label>
                <textarea 
                  value={clientFormData.devicesText} 
                  onChange={e => setClientFormData({...clientFormData, devicesText: e.target.value})} 
                  placeholder="8x كاميرات شبكية Dahua
1x جهاز تسجيل NVR
1x سويتش PoE"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white h-20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setClientModal({ open: false, mode: 'create', data: null })} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                  إلغاء
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold">
                  {clientModal.mode === 'create' ? 'حفظ وإضافة العميل' : 'حفظ التعديلات'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= النافذة المنبثقة التفاعلية للفواتير ================= */}
      {invoiceModal.open && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                {invoiceModal.mode === 'create' ? 'إنشاء فاتورة توريد وتركيب جديدة' : ('تعديل الفاتورة: ' + (invoiceModal.data?.id || ''))}
              </h3>
              <button onClick={() => setInvoiceModal({ open: false, mode: 'create', data: null })} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoiceSubmit} className="space-y-3 text-xs">
              <div className="grid sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-slate-400 block mb-1">المنشأة / العميل *</label>
                  <input 
                    type="text" 
                    value={invoiceFormData.client} 
                    onChange={e => setInvoiceFormData({...invoiceFormData, client: e.target.value})}
                    placeholder="اسم العميل"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">رقم الهاتف</label>
                  <input 
                    type="text" 
                    value={invoiceFormData.phone} 
                    onChange={e => setInvoiceFormData({...invoiceFormData, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">تاريخ الفاتورة</label>
                  <input 
                    type="date" 
                    value={invoiceFormData.date} 
                    onChange={e => setInvoiceFormData({...invoiceFormData, date: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
              </div>

              {/* بنود الفاتورة الديناميكية */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200">الأجهزة والخدمات المتضمنة:</span>
                  <button 
                    type="button" 
                    onClick={() => setInvoiceFormData({ ...invoiceFormData, items: [...invoiceFormData.items, { name: '', qty: 1, price: 0 }] })}
                    className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> إضافة بند
                  </button>
                </div>

                <div className="space-y-2">
                  {invoiceFormData.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <input 
                        type="text" 
                        placeholder="اسم الجهاز أو الخدمة"
                        value={it.name}
                        onChange={e => {
                          const list = [...invoiceFormData.items]; list[idx].name = e.target.value; setInvoiceFormData({...invoiceFormData, items: list});
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                        required 
                      />
                      <input 
                        type="number" 
                        placeholder="الكمية"
                        value={it.qty}
                        onChange={e => {
                          const list = [...invoiceFormData.items]; list[idx].qty = Number(e.target.value); setInvoiceFormData({...invoiceFormData, items: list});
                        }}
                        className="w-16 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono"
                      />
                      <input 
                        type="number" 
                        placeholder="السعر ($)"
                        value={it.price}
                        onChange={e => {
                          const list = [...invoiceFormData.items]; list[idx].price = Number(e.target.value); setInvoiceFormData({...invoiceFormData, items: list});
                        }}
                        className="w-20 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (invoiceFormData.items.length > 1) {
                            setInvoiceFormData({ ...invoiceFormData, items: invoiceFormData.items.filter((_, i) => i !== idx) });
                          }
                        }}
                        className="text-rose-400 p-1 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-2.5 pt-2">
                <div>
                  <label className="text-slate-400 block mb-1">الخصم الممنوح ($)</label>
                  <input 
                    type="number" 
                    value={invoiceFormData.discount} 
                    onChange={e => setInvoiceFormData({...invoiceFormData, discount: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">المبلغ المسدد مقدماً ($)</label>
                  <input 
                    type="number" 
                    value={invoiceFormData.paid} 
                    onChange={e => setInvoiceFormData({...invoiceFormData, paid: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الإجمالي النهائي المحسوب</label>
                  <div className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-bold font-mono text-sm">
                    {"$" + calculateFinalTotal(invoiceFormData)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setInvoiceModal({ open: false, mode: 'create', data: null })} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                  إلغاء
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold">
                  حفظ الفاتورة والمعاينة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= النافذة المنبثقة التفاعلية لعروض الأسعار ================= */}
      {quotationModal.open && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                إنشاء عرض سعر رسمي معتمد
              </h3>
              <button onClick={() => setQuotationModal({ open: false, mode: 'create', data: null })} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuotationSubmit} className="space-y-3 text-xs">
              <div className="grid sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-slate-400 block mb-1">المنشأة / العميل *</label>
                  <input 
                    type="text" 
                    value={quotationFormData.client} 
                    onChange={e => setQuotationFormData({...quotationFormData, client: e.target.value})}
                    placeholder="اسم العميل"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">رقم الهاتف</label>
                  <input 
                    type="text" 
                    value={quotationFormData.phone} 
                    onChange={e => setQuotationFormData({...quotationFormData, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">صالح حتى تاريخ</label>
                  <input 
                    type="date" 
                    value={quotationFormData.validUntil} 
                    onChange={e => setQuotationFormData({...quotationFormData, validUntil: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200">المواصفات والأسعار:</span>
                  <button 
                    type="button" 
                    onClick={() => setQuotationFormData({ ...quotationFormData, items: [...quotationFormData.items, { name: '', qty: 1, price: 0 }] })}
                    className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> إضافة بند
                  </button>
                </div>

                <div className="space-y-2">
                  {quotationFormData.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <input 
                        type="text" 
                        placeholder="اسم الصنف أو التجهيز"
                        value={it.name}
                        onChange={e => {
                          const list = [...quotationFormData.items]; list[idx].name = e.target.value; setQuotationFormData({...quotationFormData, items: list});
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                        required 
                      />
                      <input 
                        type="number" 
                        placeholder="الكمية"
                        value={it.qty}
                        onChange={e => {
                          const list = [...quotationFormData.items]; list[idx].qty = Number(e.target.value); setQuotationFormData({...quotationFormData, items: list});
                        }}
                        className="w-16 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono"
                      />
                      <input 
                        type="number" 
                        placeholder="السعر ($)"
                        value={it.price}
                        onChange={e => {
                          const list = [...quotationFormData.items]; list[idx].price = Number(e.target.value); setQuotationFormData({...quotationFormData, items: list});
                        }}
                        className="w-20 bg-slate-900 border border-slate-700 rounded p-1.5 text-white text-center font-mono"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (quotationFormData.items.length > 1) {
                            setQuotationFormData({ ...quotationFormData, items: quotationFormData.items.filter((_, i) => i !== idx) });
                          }
                        }}
                        className="text-rose-400 p-1 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setQuotationModal({ open: false, mode: 'create', data: null })} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                  إلغاء
                </button>
                <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold">
                  حفظ عرض السعر والمعاينة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= نافذة تسجيل سند قبض ================= */}
      {voucherModal.open && voucherModal.data && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">تسجيل سند قبض مالي</h3>
              <button onClick={() => setVoucherModal({ open: false, data: null })} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveVoucherSubmit} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">العميل:</span>
                <strong className="text-white block mt-0.5">{voucherModal.data.client}</strong>
                <span className="text-[10px] text-blue-400">مرتبط بالفاتورة: {voucherModal.data.id}</span>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">المبلغ المقبوض ($) *</label>
                <input 
                  type="number" 
                  value={voucherFormData.amount} 
                  onChange={e => setVoucherFormData({...voucherFormData, amount: e.target.value})} 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm" 
                  required 
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">طريقة القبض</label>
                <select 
                  value={voucherFormData.method} 
                  onChange={e => setVoucherFormData({...voucherFormData, method: e.target.value})} 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="نقداً">نقداً</option>
                  <option value="تحويل بنكي">تحويل بنكي</option>
                  <option value="شيك مصرفي">شيك مصرفي</option>
                </select>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">البيان / ملاحظات السند</label>
                <input 
                  type="text" 
                  value={voucherFormData.notes} 
                  onChange={e => setVoucherFormData({...voucherFormData, notes: e.target.value})} 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" 
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setVoucherModal({ open: false, data: null })} className="px-3.5 py-2 bg-slate-800 rounded-xl">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold">تأكيد السند</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= نافذة إضافة مهندس ================= */}
      {newEngineerModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <h3 className="font-bold text-white text-sm">إضافة مهندس ميداني جديد</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!engineerFormData.name) return;
              const newEng = {
                id: "ENG-" + (systemSettings.engineers.length + 1).toString().padStart(2, '0'),
                name: engineerFormData.name,
                phone: engineerFormData.phone || '777000000',
                specialty: engineerFormData.specialty
              };
              setSystemSettings({ ...systemSettings, engineers: [...systemSettings.engineers, newEng] });
              setNewEngineerModal(false);
              setEngineerFormData({ name: '', phone: '', specialty: 'كاميرات مراقبة' });
              showNotification('تمت إضافة المهندس بنجاح ✔️');
            }} className="space-y-3 text-xs">
              <input type="text" placeholder="اسم المهندس" value={engineerFormData.name} onChange={e => setEngineerFormData({...engineerFormData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" required />
              <input type="text" placeholder="رقم الهاتف" value={engineerFormData.phone} onChange={e => setEngineerFormData({...engineerFormData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              <input type="text" placeholder="التخصص (مثال: طاقة شمسية، كاميرات، شبكات)" value={engineerFormData.specialty} onChange={e => setEngineerFormData({...engineerFormData, specialty: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setNewEngineerModal(false)} className="px-3 py-1.5 bg-slate-800 rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold">إضافة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= نافذة إضافة حساب بنكي ================= */}
      {newBankModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <h3 className="font-bold text-white text-sm">إضافة حساب بنكي معتمد</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!bankFormData.bank || !bankFormData.account) return;
              const newB = { id: Date.now().toString(), ...bankFormData };
              setSystemSettings({ ...systemSettings, bankAccounts: [...systemSettings.bankAccounts, newB] });
              setNewBankModal(false);
              setBankFormData({ bank: '', account: '', holder: 'شركة OpenTik' });
              showNotification('تمت إضافة الحساب البنكي بنجاح ✔️');
            }} className="space-y-3 text-xs">
              <input type="text" placeholder="اسم البنك (مثال: بنك اليمن الدولي)" value={bankFormData.bank} onChange={e => setBankFormData({...bankFormData, bank: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" required />
              <input type="text" placeholder="رقم الحساب أو الآيبان" value={bankFormData.account} onChange={e => setBankFormData({...bankFormData, account: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" required />
              <input type="text" placeholder="اسم صاحب الحساب" value={bankFormData.holder} onChange={e => setBankFormData({...bankFormData, holder: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setNewBankModal(false)} className="px-3 py-1.5 bg-slate-800 rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold">إضافة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= نافذة كشف حساب العميل ================= */}
      {statementClient && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">كشف حساب مالي: {statementClient.name}</h3>
              <button onClick={() => setStatementClient(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between">
                <div>
                  <span className="text-slate-400 block">الهاتف: {statementClient.phone}</span>
                  <span className="text-slate-400 block mt-0.5">النظام: {statementClient.system}</span>
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block">الرصيد القائم:</span>
                  <span className="text-base font-bold text-rose-400 font-mono">{formatMoney(statementClient.balance)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-300 block">سجل الفواتير والمعاملات:</span>
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

      {/* ================= نافذة تفاصيل الأجهزة المركبة للعميل ================= */}
      {viewClientDetails && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm">الأجهزة المركبة: {viewClientDetails.name}</h3>
              <button onClick={() => setViewClientDetails(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-slate-400">تاريخ انتهاء الضمان: <strong className="text-emerald-400">{viewClientDetails.warrantyExpiry}</strong></p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                {(viewClientDetails.installedDevices || []).map((dev, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{dev}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setViewClientDetails(null)} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">إغلاق</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= نافذة المعاينة والاعتماد الرسمية التفاعلية ================= */}
      {autoActionModal && autoActionModal.data && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-3 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full p-5 space-y-4 max-h-[92vh] overflow-y-auto shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  معاينة واعتماد المستند: {autoActionModal.data.id}
                </h3>
              </div>
              <button onClick={() => setAutoActionModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* بطاقة المستند الرسمية المعروضة على الشاشة للمعاينة */}
            <div className="bg-white text-slate-900 p-6 rounded-xl shadow font-sans text-xs space-y-4 border border-slate-200">
              <div className="flex justify-between items-center border-b-2 border-blue-600 pb-3">
                <div>
                  <h2 className="text-lg font-black text-blue-700">{systemSettings.companyNameAr}</h2>
                  <p className="text-[10px] text-slate-600">{systemSettings.taglineAr}</p>
                </div>
                <div className="text-left font-mono">
                  <span className="font-bold text-sm text-slate-800 block">
                    {autoActionModal.type === 'invoice' ? 'فاتورة ضريبية رسمية' : autoActionModal.type === 'voucher' ? 'سند قبض معتمد' : 'عرض سعر رسمي'}
                  </span>
                  <span className="text-blue-600 font-bold">{autoActionModal.data.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <span className="font-bold text-slate-700 block">بيانات العميل:</span>
                  <p className="font-semibold text-slate-800">{autoActionModal.data.client}</p>
                  <p className="text-slate-600">{autoActionModal.data.phone}</p>
                </div>
                <div className="text-left">
                  <span className="font-bold text-slate-700 block">التاريخ: {autoActionModal.data.date || '2026-09-15'}</span>
                  <span className="text-slate-600">المنظومة: {autoActionModal.data.system || 'أنظمة ذكية'}</span>
                </div>
              </div>

              {autoActionModal.data.items && (
                <table className="w-full text-right border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-blue-600 text-white font-bold">
                      <th className="p-1.5 border">#</th>
                      <th className="p-1.5 border">الصنف / الخدمة</th>
                      <th className="p-1.5 border text-center">الكمية</th>
                      <th className="p-1.5 border text-center">السعر ($)</th>
                      <th className="p-1.5 border text-center">الإجمالي ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autoActionModal.data.items.map((it, idx) => (
                      <tr key={idx} className="border-b border-slate-200">
                        <td className="p-1.5 border text-center font-mono">{idx + 1}</td>
                        <td className="p-1.5 border font-semibold">{it.name}</td>
                        <td className="p-1.5 border text-center font-mono">{it.qty}</td>
                        <td className="p-1.5 border text-center font-mono">{"$" + it.price}</td>
                        <td className="p-1.5 border text-center font-mono font-bold">{"$" + (it.qty * it.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {autoActionModal.type === 'invoice' && (
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-200 font-bold">
                  <span>المبلغ الإجمالي المستحق:</span>
                  <span className="text-base text-blue-700 font-mono">{"$" + calculateFinalTotal(autoActionModal.data)}</span>
                </div>
              )}

              {autoActionModal.type === 'voucher' && (
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-200 font-bold">
                  <span>المبلغ المقبوض:</span>
                  <span className="text-base text-emerald-700 font-mono">{"$" + autoActionModal.data.amount}</span>
                </div>
              )}
            </div>

            {/* أزرار الإجراءات التفاعلية المباشرة */}
            <div className="grid sm:grid-cols-3 gap-2 pt-1 text-xs">
              <button 
                onClick={() => {
                  const doc = autoActionModal.data;
                  const tot = calculateFinalTotal(doc);
                  const rem = tot - (doc.paid || 0);
                  const msg = `مرحباً بالعميل العزيز: ${doc.client}\nتحية طيبة من شركة OpenTik للأنظمة الذكية 🛡️\n\nتفاصيل الفاتورة الرسمية: ${doc.id}\nالمنظومة: ${doc.system}\nالإجمالي: $${tot}\nالمسدد: $${doc.paid || 0}\nالمتبقي المستحق: $${rem}\n\nشكراً لتعاملكم معنا.`;
                  handleDirectWhatsApp(doc.phone, msg);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <MessageCircle className="w-4 h-4" /> 
                <span>إرسال عبر واتساب</span>
              </button>

              <button 
                onClick={() => handleCopyInvoiceText(autoActionModal.data)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl py-2.5 font-bold transition flex items-center justify-center gap-1.5"
              >
                <Copy className="w-4 h-4 text-cyan-400" /> 
                <span>نسخ تفاصيل الفاتورة</span>
              </button>

              <button 
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2.5 font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" /> 
                <span>طباعة / حفظ PDF</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setAutoActionModal(null)} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
