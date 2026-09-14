```react
import React, { useState, useMemo } from 'react';
import {
  Camera,
  Shield,
  Wifi,
  Sun,
  Wrench,
  Users,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Plus,
  Filter,
  Printer,
  Eye,
  DollarSign,
  TrendingUp,
  X,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Receipt,
  Download,
  Check,
  AlertCircle,
  Cpu,
  Server,
  UserCheck,
  Zap,
  HardDrive
} from 'lucide-react';

const INITIAL_CLIENTS = [
  {
    id: 'CL-101',
    name: 'مستشفى الشفاء التخصصي',
    type: 'قطاع صحي',
    contactPerson: 'د. خالد السقاف',
    phone: '+967 771 234 567',
    email: 'info@alshifa-hospital.com',
    city: 'صنعاء - حدة',
    balance: 4500, // المستحق الحالي
    totalBilled: 28500,
    totalPaid: 24000,
    status: 'active',
    warrantyStatus: 'valid',
    warrantyExpiry: '2027-08-15',
    contractStatus: 'active',
    category: 'all',
    systems: [
      { name: 'شبكة مراقبة 64 كاميرا IP 8MP 4K Uniview', category: 'cctv', date: '2024-08-10', warranty: '2027-08-10', status: 'يعمل بكفاءة' },
      { name: 'بنية تحتية سحابية وشبكات 10Gbps ميكروتيك', category: 'networks', date: '2024-09-01', warranty: '2026-09-01', status: 'يعمل بكفاءة' },
      { name: 'نظام أمان والتحكم بالدخول البيومتري ZKTeco', category: 'security', date: '2024-08-20', warranty: '2026-08-20', status: 'يعمل بكفاءة' }
    ]
  },
  {
    id: 'CL-102',
    name: 'بنك التضامن الإسلامي - الفرع الرئيسي',
    type: 'مصارف وتمويل',
    contactPerson: 'أ. طارق الحميري',
    phone: '+967 772 345 678',
    email: 'it-security@tadamonbank.ye',
    city: 'صنعاء - شارع الزبيري',
    balance: 0,
    totalBilled: 46200,
    totalPaid: 46200,
    status: 'active',
    warrantyStatus: 'valid',
    warrantyExpiry: '2028-01-20',
    contractStatus: 'active',
    category: 'security',
    systems: [
      { name: 'منظومة إنذار سرقة متقدمة وحساسات ليزرية بنكية', category: 'security', date: '2025-01-15', warranty: '2028-01-15', status: 'مراقب 24/7' },
      { name: 'خوادم تخزين ومصفوفات SAN 240TB للأرشفة الأمنية', category: 'cctv', date: '2025-01-15', warranty: '2028-01-15', status: 'يعمل بكفاءة' }
    ]
  },
  {
    id: 'CL-103',
    name: 'مصنع الأمل للمنتجات الغذائية',
    type: 'صناعي',
    contactPerson: 'المهندس ياسر راجح',
    phone: '+967 773 456 789',
    email: 'factory@alamal-food.com',
    city: 'المنطقة الصناعية',
    balance: 7800,
    totalBilled: 35000,
    totalPaid: 27200,
    status: 'overdue',
    warrantyStatus: 'valid',
    warrantyExpiry: '2026-12-10',
    contractStatus: 'active',
    category: 'solar',
    systems: [
      { name: 'محطة طاقة شمسية هجينة 35KVA مع بطاريات ليثيوم LiFePO4', category: 'solar', date: '2024-12-05', warranty: '2029-12-05', status: 'إنتاج 94%' },
      { name: 'كاميرات حرارية لمراقبة خطوط الإنتاج والمستودعات', category: 'cctv', date: '2024-12-10', warranty: '2026-12-10', status: 'بحاجة لصيانة دورية' }
    ]
  },
  {
    id: 'CL-104',
    name: 'أبراج النخبة السكنية (5 أبراج)',
    type: 'عقارات ومجمعات',
    contactPerson: 'أ. فهد الضلعي',
    phone: '+967 774 567 890',
    email: 'management@elitetowers.ye',
    city: 'حدة - المدينة السكنية',
    balance: 1200,
    totalBilled: 19800,
    totalPaid: 18600,
    status: 'active',
    warrantyStatus: 'expiring_soon',
    warrantyExpiry: '2026-10-30',
    contractStatus: 'active',
    category: 'networks',
    systems: [
      { name: 'شبكة ألياف ضوئية FTTH وإنتركوم مرئي IP لـ 120 شقة', category: 'networks', date: '2023-10-25', warranty: '2026-10-25', status: 'يعمل بكفاءة' },
      { name: 'بوابات دخول سيارات ذكية ANPR بقراءة اللوحات', category: 'security', date: '2023-11-01', warranty: '2025-11-01', status: 'منتهي الضمان' }
    ]
  },
  {
    id: 'CL-105',
    name: 'مجموعة الصافي التجارية',
    type: 'تجاري ومولات',
    contactPerson: 'م. نشوان القدسي',
    phone: '+967 775 678 901',
    email: 'admin@alsafi-group.com',
    city: 'صنعاء - الستين الغربي',
    balance: 0,
    totalBilled: 14500,
    totalPaid: 14500,
    status: 'active',
    warrantyStatus: 'expired',
    warrantyExpiry: '2025-11-15',
    contractStatus: 'expired',
    category: 'cctv',
    systems: [
      { name: 'كاميرات مراقبة هيكفيجن 32 نقطة مع نظام عد الزوار AI', category: 'cctv', date: '2023-05-10', warranty: '2025-05-10', status: 'خارج الضمان' }
    ]
  }
];

const INITIAL_INVOICES = [
  {
    id: 'INV-2026-089',
    clientId: 'CL-101',
    clientName: 'مستشفى الشفاء التخصصي',
    date: '2026-08-20',
    dueDate: '2026-09-20',
    category: 'cctv',
    items: [
      { description: 'توريد وتركيب 8 كاميرات مراقبة PTZ متحركة 4K', qty: 8, unitPrice: 450, total: 3600 },
      { description: 'وحدة تخزين شبكية NVR 32 قناة مع أقراص 24TB SkyHawk', qty: 1, unitPrice: 1200, total: 1200 },
      { description: 'أعمال تمديد كيابل ألياف ضوئية وعلب حماية خارجية', qty: 1, unitPrice: 500, total: 500 }
    ],
    subtotal: 5300,
    tax: 265, // 5%
    discount: 165,
    total: 5400,
    paidAmount: 900,
    status: 'partial'
  },
  {
    id: 'INV-2026-088',
    clientId: 'CL-103',
    clientName: 'مصنع الأمل للمنتجات الغذائية',
    date: '2026-07-15',
    dueDate: '2026-08-15',
    category: 'solar',
    items: [
      { description: 'محولات طاقة شمسية Deye 12KW Three Phase Hybrid', qty: 2, unitPrice: 2800, total: 5600 },
      { description: 'بنك بطاريات ليثيوم 200Ah 48V Dyness Rack', qty: 2, unitPrice: 2100, total: 4200 }
    ],
    subtotal: 9800,
    tax: 0,
    discount: 0,
    total: 9800,
    paidAmount: 2000,
    status: 'overdue'
  },
  {
    id: 'INV-2026-085',
    clientId: 'CL-102',
    clientName: 'بنك التضامن الإسلامي - الفرع الرئيسي',
    date: '2026-08-01',
    dueDate: '2026-08-30',
    category: 'security',
    items: [
      { description: 'عقد صيانة سنوي ذهبي VIP شامل الزيارات الطارئة والقطع', qty: 1, unitPrice: 7500, total: 7500 }
    ],
    subtotal: 7500,
    tax: 375,
    discount: 375,
    total: 7500,
    paidAmount: 7500,
    status: 'paid'
  },
  {
    id: 'INV-2026-081',
    clientId: 'CL-104',
    clientName: 'أبراج النخبة السكنية (5 أبراج)',
    date: '2026-08-10',
    dueDate: '2026-09-10',
    category: 'networks',
    items: [
      { description: 'سويتشات توزيع Cisco Gigabit 48 Port PoE+', qty: 3, unitPrice: 850, total: 2550 },
      { description: 'أجهزة بث واي فاي داخلية Ubiquiti UniFi U6 Pro', qty: 10, unitPrice: 190, total: 1900 }
    ],
    subtotal: 4450,
    tax: 222,
    discount: 72,
    total: 4600,
    paidAmount: 3400,
    status: 'partial'
  }
];

const INITIAL_TICKETS = [
  {
    id: 'TCK-401',
    clientName: 'مستشفى الشفاء التخصصي',
    system: 'كاميرات المراقبة',
    title: 'انقطاع إشارة كاميرات مدخل الطوارئ رقم 3 ورقم 4',
    priority: 'urgent',
    status: 'in_progress',
    technician: 'م. أحمد الشامي (مهندس شبكات وكاميرات)',
    createdAt: '2026-09-14 09:30',
    scheduledVisit: '2026-09-15 11:00',
    notes: 'تم فحص مسار كيبل الـ PoE المحتمل تعرضه للقطع في مسار السقف المستعار.'
  },
  {
    id: 'TCK-402',
    clientName: 'مصنع الأمل للمنتجات الغذائية',
    system: 'الطاقة البديلة والشمسية',
    title: 'فحص حراري روتيني وموازنة خلايا بطاريات الليثيوم',
    priority: 'medium',
    status: 'open',
    technician: 'م. حسام المعمري (مهندس طاقة متجددة)',
    createdAt: '2026-09-13 14:15',
    scheduledVisit: '2026-09-16 08:30',
    notes: 'طلب فحص كفاءة العاكس الهجين بعد تقلبات الجهد الكهربائي للشبكة العامة.'
  },
  {
    id: 'TCK-403',
    clientName: 'بنك التضامن الإسلامي',
    system: 'أنظمة الأمان والتحكم بالدخول',
    title: 'إعادة برمجة صلاحيات بوابات الخزنة الرئيسية وقارئات البصمة',
    priority: 'high',
    status: 'completed',
    technician: 'م. فؤاد العنسي (خبير أمن إلكتروني)',
    createdAt: '2026-09-12 11:00',
    scheduledVisit: '2026-09-12 15:00',
    notes: 'تم بنجاح ربط خادم ZKBioSecurity مع سيرفر Active Directory المصرفي.'
  }
];

const SYSTEMS_CATALOG = [
  {
    id: 'CAT-1',
    title: 'منظومة المراقبة الذكية الفائقة 4K AI',
    category: 'cctv',
    icon: Camera,
    badge: 'الأكثر طلباً للمؤسسات',
    desc: 'كاميرات ذكاء اصطناعي للتعرف على الوجوه، قراءة لوحات السيارات، التنبيه الفوري بالتعدي والحرائق مع مسجلات NVR سحابية مشفرة.',
    features: ['دقة تصل إلى 8 ميجابكسل 4K HDR', 'رؤية ليلية ملونة ColorVu 24/7', 'تشفير سحابي عالي الحماية AES-256', 'تطبيق موبايل سريع ومستقر'],
    basePrice: 1200,
    warranty: 'ضمان استبدال 3 سنوات'
  },
  {
    id: 'CAT-2',
    title: 'بوابات الأمان الإلكترونية والتحكم بالدخول',
    category: 'security',
    icon: Shield,
    badge: 'معتمد للمصارف والمقار الحساسة',
    desc: 'بوابات بصرية Flap Barriers، قارئات بصمة كف ووجه بدون لمس، منظومة أقفال مغناطيسية كهروميكانيكية مقاومة للاقتحام.',
    features: ['التعرف على الوجه خلال 0.2 ثانية', 'ربط فوري مع أنظمة الرواتب والموارد البشرية', 'إنذار ضد محاولات الفتح القسري', 'بطاريات طوارئ مدمجة'],
    basePrice: 1850,
    warranty: 'ضمان سنتين + دعم 24/7'
  },
  {
    id: 'CAT-3',
    title: 'شبكات الألياف الضوئية وحلول الاتصالات Enterprise',
    category: 'networks',
    icon: Wifi,
    badge: 'بنية تحتية موثوقة',
    desc: 'تصميم وتنفيذ شبكات LAN/WAN وكبائن السيرفرات، راوترات ميكروتيك، أنظمة الحماية الجدارية Fortinet، وشبكات الوايفاي المؤسسية.',
    features: ['سرعات نقل تصل إلى 40Gbps SFP+', 'فصل وتأمين شبكات الضيوف VLAN', 'تغطية واي فاي 6 فائقة التغطية والكثافة', 'مراقبة ومتابعة حركة المرور المباشرة'],
    basePrice: 2400,
    warranty: 'ضمان عتادي لمدة 3 سنوات'
  },
  {
    id: 'CAT-4',
    title: 'منظومات الطاقة الهجينة والشمسية الذكية',
    category: 'solar',
    icon: Sun,
    badge: 'استقلالية طاقة كاملة 100%',
    desc: 'محولات طاقة هجينة بقدرات من 5KVA إلى 100KVA، ألواح شمسية عالية الكفاءة N-Type TopCon، وبطاريات ليثيوم ذكية متصلة بالسحابة.',
    features: ['محولات Deye و Growatt الذكية', 'بطاريات تفريغ عميق تفوق 6000 دورة', 'مراقبة استهلاك الطاقة وتوليدها عبر التطبيق', 'تحويل تلقائي بدون انقطاع 0ms'],
    basePrice: 3800,
    warranty: 'ضمان 10 سنوات للألواح والبطاريات'
  },
  {
    id: 'CAT-5',
    title: 'عقود الصيانة التشغيلية والدعم الفني SLA',
    category: 'support',
    icon: Wrench,
    badge: 'استجابة طارئة خلال ساعتين',
    desc: 'خدمة دعم شاملة تغطي الصيانة الوقائية الشهرية، فحص الكيابل والحرارة، تحديث أنظمة الحماية، واستبدال الأجهزة التالفة فوراً.',
    features: ['فريق هندسي متخصص متنقل بسيارات مجهزة', 'خط ساخن طوارئ 24 ساعة', 'تقارير فنية شهرية عن صحة الأنظمة', 'توفير قطع غيار أصلية بأسعار تفضيلية'],
    basePrice: 600,
    warranty: 'عقد سنوي متجدد'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, clients, invoices, tickets, catalog, reports
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modals state
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form states
  const [newClientData, setNewClientData] = useState({
    name: '',
    type: 'شركة تجارية',
    contactPerson: '',
    phone: '',
    email: '',
    city: 'صنعاء',
    category: 'cctv'
  });

  const [paymentData, setPaymentData] = useState({
    invoiceId: '',
    amount: '',
    paymentMethod: 'تحويل بنكي',
    reference: '',
    notes: ''
  });

  const [newTicketData, setNewTicketData] = useState({
    clientName: '',
    system: 'كاميرات المراقبة',
    title: '',
    priority: 'medium',
    technician: 'م. أحمد الشامي'
  });

  const [newInvoiceData, setNewInvoiceData] = useState({
    clientId: '',
    dueDate: '2026-10-15',
    category: 'cctv',
    items: [{ description: '', qty: 1, unitPrice: 0 }],
    discount: 0
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const stats = useMemo(() => {
    const totalClientsCount = clients.length;
    const totalSales = invoices.reduce((acc, inv) => acc + inv.total, 0);
    const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
    const totalPendingDebt = invoices.reduce((acc, inv) => acc + (inv.total - inv.paidAmount), 0);
    const openTicketsCount = tickets.filter(t => t.status !== 'completed').length;
    const activeContractsCount = clients.filter(c => c.contractStatus === 'active').length;

    return {
      totalClientsCount,
      totalSales,
      totalCollected,
      totalPendingDebt,
      openTicketsCount,
      activeContractsCount
    };
  }, [clients, invoices, tickets]);

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.phone.includes(searchTerm);
      const matchCat = filterCategory === 'all' || c.category === filterCategory || c.category === 'all';
      return matchSearch && matchCat;
    });
  }, [clients, searchTerm, filterCategory]);

  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!newClientData.name || !newClientData.phone) return;

    const newId = `CL-${100 + clients.length + 1}`;
    const clientRecord = {
      id: newId,
      name: newClientData.name,
      type: newClientData.type,
      contactPerson: newClientData.contactPerson || 'غير محدد',
      phone: newClientData.phone,
      email: newClientData.email || 'client@opentik.ye',
      city: newClientData.city || 'صنعاء',
      balance: 0,
      totalBilled: 0,
      totalPaid: 0,
      status: 'active',
      warrantyStatus: 'valid',
      warrantyExpiry: '2028-01-01',
      contractStatus: 'active',
      category: newClientData.category,
      systems: [
        { name: 'مشروع تأسيس الأنظمة الذكية الأولى', category: newClientData.category, date: new Date().toISOString().split('T')[0], warranty: '2028-01-01', status: 'جاري التركيب' }
      ]
    };

    setClients([clientRecord, ...clients]);
    setIsNewClientModalOpen(false);
    setNewClientData({ name: '', type: 'شركة تجارية', contactPerson: '', phone: '', email: '', city: 'صنعاء', category: 'cctv' });
    triggerToast(`تم بنجاح تسجيل العميل الجديد: ${clientRecord.name}`);
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const client = clients.find(c => c.id === newInvoiceData.clientId);
    if (!client) return;

    const subtotal = newInvoiceData.items.reduce((sum, itm) => sum + (Number(itm.qty) * Number(itm.unitPrice)), 0);
    const tax = Math.round(subtotal * 0.05); // 5% tax
    const discount = Number(newInvoiceData.discount) || 0;
    const grandTotal = subtotal + tax - discount;

    const newInvId = `INV-2026-0${90 + invoices.length}`;
    const invoiceObj = {
      id: newInvId,
      clientId: client.id,
      clientName: client.name,
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvoiceData.dueDate,
      category: newInvoiceData.category,
      items: newInvoiceData.items.map(it => ({
        ...it,
        total: Number(it.qty) * Number(it.unitPrice)
      })),
      subtotal,
      tax,
      discount,
      total: grandTotal,
      paidAmount: 0,
      status: 'unpaid'
    };

    setInvoices([invoiceObj, ...invoices]);
    // update client financial summary
    setClients(prev => prev.map(c => {
      if (c.id === client.id) {
        return {
          ...c,
          totalBilled: c.totalBilled + grandTotal,
          balance: c.balance + grandTotal
        };
      }
      return c;
    }));

    setIsNewInvoiceModalOpen(false);
    triggerToast(`تم إنشاء الفاتورة ${newInvId} بمبلغ $${grandTotal.toLocaleString()} بنجاح`);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    const paymentAmount = Number(paymentData.amount);
    if (!paymentAmount || paymentAmount <= 0 || !paymentData.invoiceId) return;

    const targetInvoice = invoices.find(inv => inv.id === paymentData.invoiceId);
    if (!targetInvoice) return;

    const updatedInvoices = invoices.map(inv => {
      if (inv.id === targetInvoice.id) {
        const newPaid = inv.paidAmount + paymentAmount;
        let newStatus = 'partial';
        if (newPaid >= inv.total) newStatus = 'paid';
        return {
          ...inv,
          paidAmount: Math.min(newPaid, inv.total),
          status: newStatus
        };
      }
      return inv;
    });

    setInvoices(updatedInvoices);

    // Update client balance
    setClients(prev => prev.map(c => {
      if (c.id === targetInvoice.clientId) {
        return {
          ...c,
          totalPaid: c.totalPaid + paymentAmount,
          balance: Math.max(0, c.balance - paymentAmount)
        };
      }
      return c;
    }));

    setIsPaymentModalOpen(false);
    setPaymentData({ invoiceId: '', amount: '', paymentMethod: 'تحويل بنكي', reference: '', notes: '' });
    triggerToast(`تم إصدار سند القبض بمبلغ $${paymentAmount.toLocaleString()} وتحديث رصيد العميل`);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketData.clientName || !newTicketData.title) return;

    const newTicket = {
      id: `TCK-${400 + tickets.length + 1}`,
      clientName: newTicketData.clientName,
      system: newTicketData.system,
      title: newTicketData.title,
      priority: newTicketData.priority,
      status: 'open',
      technician: newTicketData.technician,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      scheduledVisit: 'خلال 24 ساعة',
      notes: 'تم استلام بلاغ الصيانة وجاري توجيه الفريق الفني الميداني.'
    };

    setTickets([newTicket, ...tickets]);
    setIsNewTicketModalOpen(false);
    setNewTicketData({ clientName: '', system: 'كاميرات المراقبة', title: '', priority: 'medium', technician: 'م. أحمد الشامي' });
    triggerToast(`تم فتح تذكرة دعم فني جديدة برقم ${newTicket.id}`);
  };

  const handleAddItemRow = () => {
    setNewInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', qty: 1, unitPrice: 0 }]
    }));
  };

  const handleUpdateItemRow = (index, field, val) => {
    setNewInvoiceData(prev => {
      const updated = [...prev.items];
      updated[index][field] = val;
      return { ...prev, items: updated };
    });
  };

  const handleRemoveItemRow = (index) => {
    if (newInvoiceData.items.length === 1) return;
    setNewInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white pb-12">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-cyan-950 border border-cyan-500/50 text-cyan-200 px-5 py-3.5 rounded-xl shadow-2xl shadow-cyan-950/80 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
     
