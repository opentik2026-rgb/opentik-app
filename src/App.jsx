import React, { useState } from 'react';
import { 
  Shield, 
  Camera, 
  Wifi, 
  Sun, 
  Users, 
  FileText, 
  Wrench, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Phone, 
  DollarSign, 
  Trash2,
  Printer
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // بيانات العملاء الأولية
  const [clients, setClients] = useState([
    { id: 'CL-101', name: 'شركة النجم الذهبي للتجارة', phone: '777112233', system: 'كاميرات مراقبة وشبكات', balance: 1450, status: 'نشط' },
    { id: 'CL-102', name: 'مستشفى الأمل التخصصي', phone: '771223344', system: 'طاقة شمسية وسنترال', balance: 0, status: 'مكتمل' },
    { id: 'CL-103', name: 'مجمع العواضي التجاري', phone: '773445566', system: 'أنظمة إنذار وحضور وانصراف', balance: 3200, status: 'مستحق' },
    { id: 'CL-104', name: 'مؤسسة الريادة للاستيراد', phone: '770998877', system: 'كاميرات شبكية NVR وشبكات', balance: 800, status: 'نشط' },
  ]);

  // بيانات الفواتير
  const [invoices, setInvoices] = useState([
    { id: 'INV-1001', client: 'شركة النجم الذهبي للتجارة', total: 2450, paid: 1000, remaining: 1450, date: '2026-09-10', status: 'جزئي' },
    { id: 'INV-1002', client: 'مستشفى الأمل التخصصي', total: 5600, paid: 5600, remaining: 0, date: '2026-09-12', status: 'مدفوع' },
    { id: 'INV-1003', client: 'مجمع العواضي التجاري', total: 3200, paid: 0, remaining: 3200, date: '2026-09-14', status: 'غير مدفوع' },
  ]);

  // تذاكر الدعم الفني
  const [tickets, setTickets] = useState([
    { id: 'TK-501', client: 'شركة النجم الذهبي', issue: 'فقدان إشارة كاميرا المدخل الرئيسي', priority: 'عالية', status: 'قيد التنفيذ' },
    { id: 'TK-502', client: 'مجمع العواضي', issue: 'برمجة جهاز البصمة وتحديث الموظفين', priority: 'متوسطة', status: 'جديدة' },
  ]);

  // نماذج الإدخال السريع
  const [newClient, setNewClient] = useState({ name: '', phone: '', system: 'كاميرات مراقبة IP', balance: '' });
  const [newTicket, setNewTicket] = useState({ client: '', issue: '', priority: 'متوسطة' });
  const [searchTerm, setSearchTerm] = useState('');

  // إضافة عميل جديد
  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.phone) return;
    const clientRecord = {
      id: "CL-" + (100 + clients.length + 1),
      name: newClient.name,
      phone: newClient.phone,
      system: newClient.system,
      balance: parseFloat(newClient.balance) || 0,
      status: 'نشط'
    };
    setClients([clientRecord, ...clients]);
    setNewClient({ name: '', phone: '', system: 'كاميرات مراقبة IP', balance: '' });
  };

  // إضافة تذكرة صيانة
  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!newTicket.client || !newTicket.issue) return;
    const ticketRecord = {
      id: "TK-" + (500 + tickets.length + 1),
      client: newTicket.client,
      issue: newTicket.issue,
      priority: newTicket.priority,
      status: 'جديدة'
    };
    setTickets([ticketRecord, ...tickets]);
    setNewTicket({ client: '', issue: '', priority: 'متوسطة' });
  };

  // العمليات الحسابية للملخص
  const totalReceivables = clients.reduce((acc, c) => acc + (c.balance || 0), 0);
  const totalSales = invoices.reduce((acc, inv) => acc + (inv.total || 0), 0);
  const totalCollected = invoices.reduce((acc, inv) => acc + (inv.paid || 0), 0);

  const filteredClients = clients.filter(c => 
    c.name.includes(searchTerm) || c.phone.includes(searchTerm) || c.system.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col" dir="rtl">
      {/* الشريط العلوي */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
              OP
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">OpenTik للأنظمة الذكية</h1>
              <p className="text-xs text-slate-400">إدارة العملاء والحسابات والعمليات</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-3 py-1 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-medium">
              النظام متصل
            </span>
          </div>
        </div>

        {/* أزرار التنقل الرئيسية */}
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={"px-4 py-2 text-sm rounded-lg font-medium transition flex items-center gap-2 shrink-0 " + (activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700')}
          >
            <Shield className="w-4 h-4" /> لوحة التحكم
          </button>
          <button 
            onClick={() => setActiveTab('clients')}
            className={"px-4 py-2 text-sm rounded-lg font-medium transition flex items-center gap-2 shrink-0 " + (activeTab === 'clients' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700')}
          >
            <Users className="w-4 h-4" /> العملاء ({clients.length})
          </button>
          <button 
            onClick={() => setActiveTab('invoices')}
            className={"px-4 py-2 text-sm rounded-lg font-medium transition flex items-center gap-2 shrink-0 " + (activeTab === 'invoices' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700')}
          >
            <FileText className="w-4 h-4" /> الحسابات والفواتير
          </button>
          <button 
            onClick={() => setActiveTab('tickets')}
            className={"px-4 py-2 text-sm rounded-lg font-medium transition flex items-center gap-2 shrink-0 " + (activeTab === 'tickets' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700')}
          >
            <Wrench className="w-4 h-4" /> الدعم الفني ({tickets.length})
          </button>
        </nav>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-4 flex-1 max-w-7xl w-full mx-auto space-y-6">
        {/* تبويب لوحة التحكم */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
                <p className="text-xs text-slate-400">إجمالي المبيعات</p>
                <h3 className="text-xl font-bold text-white mt-1">{"$" + totalSales.toLocaleString()}</h3>
                <span className="text-[11px] text-emerald-400 font-medium mt-2 inline-block">مشاريع وعقود</span>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
                <p className="text-xs text-slate-400">المبالغ المحصلة</p>
                <h3 className="text-xl font-bold text-emerald-400 mt-1">{"$" + totalCollected.toLocaleString()}</h3>
                <span className="text-[11px] text-slate-400 mt-2 inline-block">سندات قبض معتمدة</span>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
                <p className="text-xs text-slate-400">المتبقي طرف العملاء</p>
                <h3 className="text-xl font-bold text-rose-400 mt-1">{"$" + totalReceivables.toLocaleString()}</h3>
                <span className="text-[11px] text-rose-300/80 mt-2 inline-block">ذمم مدينة واجبة السداد</span>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
                <p className="text-xs text-slate-400">العملاء النشطون</p>
                <h3 className="text-xl font-bold text-blue-400 mt-1">{clients.length}</h3>
                <span className="text-[11px] text-slate-400 mt-2 inline-block">أنظمة ذكية وطاقة</span>
              </div>
            </div>

            {/* قطاعات OpenTik */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <h2 className="text-sm font-bold text-slate-200 mb-3">مجالات وأنظمة الشركة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Camera className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-xs font-bold text-white">كاميرات المراقبة</h4>
                    <p className="text-[10px] text-slate-400">IP, NVR, Smart AI</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg"><Wifi className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-xs font-bold text-white">الشبكات والربط</h4>
                    <p className="text-[10px] text-slate-400">راوترات وسويتشات PoE</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg"><Sun className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-xs font-bold text-white">الطاقة البديلة</h4>
                    <p className="text-[10px] text-slate-400">انفرتر وبطاريات ليثيوم</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><Shield className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-xs font-bold text-white">أجهزة الإنذار والبصمة</h4>
                    <p className="text-[10px] text-slate-400">Access Control & PBX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* أحدث التذاكر والعمليات السريعة */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" /> تذاكر الدعم الفني العاجلة
                </h3>
                <div className="space-y-2">
                  {tickets.map(t => (
                    <div key={t.id} className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/40 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-white">{t.client}</span>
                        <p className="text-xs text-slate-400 mt-0.5">{t.issue}</p>
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" /> الفواتير المستحقة مؤخراً
                </h3>
                <div className="space-y-2">
                  {invoices.filter(i => i.remaining > 0).map(i => (
                    <div key={i.id} className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/40 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-white">{i.client}</span>
                        <p className="text-xs text-slate-400 mt-0.5">{"فاتورة رقم: " + i.id}</p>
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-rose-400 block">{"$" + i.remaining}</span>
                        <span className="text-[10px] text-slate-400">{i.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* تبويب العملاء */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            {/* إضافة عميل جديد */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" /> إضافة عميل جديد لنظام OpenTik
              </h3>
              <form onSubmit={handleAddClient} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input 
                  type="text" 
                  placeholder="اسم المنشأة أو العميل" 
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="رقم الهاتف" 
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <select 
                  value={newClient.system}
                  onChange={(e) => setNewClient({...newClient, system: e.target.value})}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="كاميرات مراقبة IP">كاميرات مراقبة IP</option>
                  <option value="طاقة شمسية وانفرتر">طاقة شمسية وانفرتر</option>
                  <option value="شبكات وربط لاسلكي">شبكات وربط لاسلكي</option>
                  <option value="أنظمة أمان وبصمة">أنظمة أمان وبصمة</option>
                  <option value="سنترال واتصالات">سنترال واتصالات</option>
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 text-sm font-bold transition flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> حفظ العميل
                </button>
              </form>
            </div>

            {/* شريط البحث */}
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="البحث باسم العميل، الهاتف، أو نوع النظام..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pr-9 pl-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* جدول العملاء */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="p-3">المعرف</th>
                      <th className="p-3">العميل</th>
                      <th className="p-3">الهاتف</th>
                      <th className="p-3">النظام المنفذ</th>
                      <th className="p-3">الرصيد المتبقي</th>
                      <th className="p-3">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {filteredClients.map(c => (
                      <tr key={c.id} className="hover:bg-slate-700/30">
                        <td className="p-3 text-slate-400 font-mono">{c.id}</td>
                        <td className="p-3 font-bold text-white">{c.name}</td>
                        <td className="p-3 text-slate-300 font-mono">{c.phone}</td>
                        <td className="p-3 text-slate-300">{c.system}</td>
                        <td className="p-3 font-bold text-rose-400">{"$" + c.balance}</td>
                        <td className="p-3">
                          <span className={"px-2 py-0.5 rounded text-[10px] " + (c.balance === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400')}>
                            {c.balance === 0 ? 'خالص' : 'عليه رصيد'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* تبويب الحسابات والفواتير */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">فواتير التوريد والتركيب</h3>
                <p className="text-xs text-slate-400">إدارة مستحقات مشاريع الأنظمة الذكية</p>
              </div>
              <button onClick={() => window.print()} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs flex items-center gap-1.5 transition">
                <Printer className="w-3.5 h-3.5" /> طباعة كشف الحساب
              </button>
            </div>

            <div className="grid gap-3">
              {invoices.map(inv => (
                <div key={inv.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-400 font-bold">{inv.id}</span>
                      <span className="text-xs text-slate-400">|</span>
                      <span className="text-sm font-bold text-white">{inv.client}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">تاريخ الإصدار: {inv.date}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/50">
                    <div>
                      <p className="text-[10px] text-slate-400">الإجمالي</p>
                      <p className="text-xs font-bold text-white">{"$" + inv.total}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">المدفوع</p>
                      <p className="text-xs font-bold text-emerald-400">{"$" + inv.paid}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">المتبقي</p>
                      <p className="text-xs font-bold text-rose-400">{"$" + inv.remaining}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تبويب تذاكر الدعم الفني */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-400" /> فتح بلاغ صيانة / دعم فني ميداني
              </h3>
              <form onSubmit={handleAddTicket} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input 
                  type="text" 
                  placeholder="اسم العميل أو المنشأة" 
                  value={newTicket.client}
                  onChange={(e) => setNewTicket({...newTicket, client: e.target.value})}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="وصف المشكلة (مثال: عطل في سويتش PoE، برمجة NVR...)" 
                  value={newTicket.issue}
                  onChange={(e) => setNewTicket({...newTicket, issue: e.target.value})}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 text-sm font-bold transition flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> تسجيل البلاغ
                </button>
              </form>
            </div>

            <div className="space-y-3">
              {tickets.map(t => (
                <div key={t.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-400 font-bold">{t.id}</span>
                      <h4 className="text-sm font-bold text-white">{t.client}</h4>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{t.issue}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
