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
  Edit3, 
  Download, 
  Search, 
  CheckCircle, 
  X, 
  Eye
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('invoices');
  
  // بيانات الفواتير مع بنود تفصيلية
  const [invoices, setInvoices] = useState([
    { 
      id: 'INV-1001', 
      client: 'شركة النجم الذهبي للتجارة', 
      phone: '777112233',
      date: '2026-09-10', 
      system: 'كاميرات مراقبة وشبكات',
      items: [
        { name: 'كاميرا شبكية IP بدقة 5MP ذكية', qty: 8, price: 65 },
        { name: 'جهاز تسجيل NVR 16CH مع قرص 4TB', qty: 1, price: 320 },
        { name: 'سويتش شبكة 16Port PoE ومستلزمات', qty: 1, price: 180 },
        { name: 'تمديد وتركيب وبرمجة المنظومة', qty: 1, price: 250 }
      ],
      paid: 1000,
      notes: 'ضمان لمدة عام كامل على الأجهزة ضد عيوب التصنيع.'
    },
    { 
      id: 'INV-1002', 
      client: 'مستشفى الأمل التخصصي', 
      phone: '771223344',
      date: '2026-09-12', 
      system: 'طاقة شمسية وانفرتر',
      items: [
        { name: 'انفرتر هجين Deye قدرة 12KW', qty: 1, price: 2100 },
        { name: 'بطارية ليثيوم 5KW مع قواطع الحماية', qty: 2, price: 1400 },
        { name: 'أعمال التركيب وتوزيع الأحمال', qty: 1, price: 700 }
      ],
      paid: 5600,
      notes: 'تم التسليم والفحص بحالة ممتازة.'
    }
  ]);

  // حالة التحكم بالنافذة المنبثقة للتعديل أو المعاينة
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [previewInvoice, setPreviewInvoice] = useState(null);

  // حساب إجماليات الفاتورة
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + ((Number(item.qty) || 0) * (Number(item.price) || 0)), 0);
  };

  // فتح نافذة تعديل فاتورة
  const handleEditClick = (inv) => {
    setEditingInvoice(JSON.parse(JSON.stringify(inv))); // نسخة عميقة للتعديل
  };

  // حفظ التعديلات
  const handleSaveInvoice = (e) => {
    e.preventDefault();
    setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? editingInvoice : inv));
    setEditingInvoice(null);
  };

  // تغيير قيم بنود الفاتورة أثناء التعديل
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...editingInvoice.items];
    updatedItems[index][field] = value;
    setEditingInvoice({ ...editingInvoice, items: updatedItems });
  };

  // إضافة بند جديد داخل الفاتورة
  const handleAddItem = () => {
    setEditingInvoice({
      ...editingInvoice,
      items: [...editingInvoice.items, { name: '', qty: 1, price: 0 }]
    });
  };

  // حذف بند
  const handleRemoveItem = (index) => {
    const updatedItems = editingInvoice.items.filter((_, i) => i !== index);
    setEditingInvoice({ ...editingInvoice, items: updatedItems });
  };

  // تصدير الفاتورة إلى ملف PDF على الهاتف
  const handleExportPDF = (invoice) => {
    const element = document.getElementById('printable-invoice-' + invoice.id);
    if (!element || !window.html2pdf) {
      alert('جاري تحميل أداة الـ PDF، يرجى المحاولة بعد لحظات...');
      return;
    }

    const opt = {
      margin: 10,
      filename: invoice.id + '_' + invoice.client + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* الرأس */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg">
              OP
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">OpenTik للأنظمة الذكية</h1>
              <p className="text-xs text-slate-400">إدارة الفواتير والحسابات</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
            نظام الفوترة نشط
          </span>
        </div>
      </header>

      {/* قائمة الفواتير */}
      <main className="p-4 max-w-5xl w-full mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> فواتير التوريد وعقود التركيب
          </h2>
        </div>

        <div className="grid gap-4">
          {invoices.map(inv => {
            const total = calculateTotal(inv.items);
            const remaining = total - inv.paid;
            return (
              <div key={inv.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-700/60 pb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{inv.id}</span>
                      <h3 className="font-bold text-white">{inv.client}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">الهاتف: {inv.phone} | التاريخ: {inv.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditClick(inv)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs flex items-center gap-1 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> تعديل الفاتورة
                    </button>
                    <button 
                      onClick={() => setPreviewInvoice(inv)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs flex items-center gap-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5" /> معاينة
                    </button>
                    <button 
                      onClick={() => handleExportPDF(inv)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs flex items-center gap-1 transition"
                    >
                      <Download className="w-3.5 h-3.5" /> تحميل PDF
                    </button>
                  </div>
                </div>

                {/* تفاصيل المبالغ */}
                <div className="grid grid-cols-3 gap-2 bg-slate-900/60 p-2.5 rounded-lg text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">الإجمالي</span>
                    <span className="text-xs font-bold text-white font-mono">{"$" + total.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">المسدد</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">{"$" + inv.paid.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">المتبقي</span>
                    <span className="text-xs font-bold text-rose-400 font-mono">{"$" + remaining.toLocaleString()}</span>
                  </div>
                </div>

                {/* قالب الفاتورة المخفي المخصص لإنتاج ملف الـ PDF بجودة A4 */}
                <div className="hidden">
                  <div id={"printable-invoice-" + inv.id} className="p-8 bg-white text-slate-900 text-right font-sans" dir="rtl">
                    <div className="flex justify-between items-center border-b-2 border-blue-600 pb-4 mb-6">
                      <div>
                        <h1 className="text-2xl font-black text-blue-700">OpenTik للأنظمة الذكية</h1>
                        <p className="text-xs text-slate-600 mt-1">كاميرات مراقبة - شبكات - أنظمة أمان - طاقة بديلة</p>
                      </div>
                      <div className="text-left">
                        <span className="text-xl font-bold text-slate-800">فاتورة توريد وتركيب</span>
                        <p className="text-xs text-slate-500 font-mono mt-1">رقم الفاتورة: {inv.id}</p>
                        <p className="text-xs text-slate-500 font-mono">التاريخ: {inv.date}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-800 mb-1">بيانات العميل:</h3>
                      <p className="text-sm font-semibold text-slate-700">الاسم: {inv.client}</p>
                      <p className="text-xs text-slate-600">رقم الهاتف: {inv.phone}</p>
                      <p className="text-xs text-slate-600">نوع النظام: {inv.system}</p>
                    </div>

                    <table className="w-full text-right border-collapse mb-6 text-sm">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="p-2 border">#</th>
                          <th className="p-2 border">البيان / الصنف</th>
                          <th className="p-2 border text-center">الكمية</th>
                          <th className="p-2 border text-center">سعر الوحدة ($)</th>
                          <th className="p-2 border text-center">الإجمالي ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inv.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-slate-200">
                            <td className="p-2 border text-center font-mono">{idx + 1}</td>
                            <td className="p-2 border font-medium">{item.name}</td>
                            <td className="p-2 border text-center font-mono">{item.qty}</td>
                            <td className="p-2 border text-center font-mono">{"$" + item.price}</td>
                            <td className="p-2 border text-center font-mono font-bold">{"$" + (item.qty * item.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="flex justify-between items-start mb-6">
                      <div className="w-1/2 p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                        <span className="font-bold block mb-1">ملاحظات وشروط الضمان:</span>
                        <p className="text-slate-600">{inv.notes || 'الضمان ساري بموجب الفاتورة الرسمية.'}</p>
                      </div>
                      <div className="w-1/3 space-y-1.5 text-sm">
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-600">إجمالي الفاتورة:</span>
                          <span className="font-bold font-mono">{"$" + total}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-slate-600">المبلغ المسدد:</span>
                          <span className="font-bold text-emerald-600 font-mono">{"$" + inv.paid}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-1">
                          <span className="text-rose-600">المتبقي المطلوب:</span>
                          <span className="text-rose-600 font-mono">{"$" + remaining}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 text-center text-xs text-slate-400">
                      شكراً لتعاملكم مع OpenTik للأنظمة الذكية | خدمات التركيب والدعم الفني المعتمد
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* نافذة منبثقة لتعديل الفاتورة (Edit Modal) */}
      {editingInvoice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-2xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-400" /> تعديل الفاتورة: {editingInvoice.id}
              </h3>
              <button onClick={() => setEditingInvoice(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">اسم العميل</label>
                  <input 
                    type="text" 
                    value={editingInvoice.client}
                    onChange={(e) => setEditingInvoice({...editingInvoice, client: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">رقم الهاتف</label>
                  <input 
                    type="text" 
                    value={editingInvoice.phone}
                    onChange={(e) => setEditingInvoice({...editingInvoice, phone: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              {/* جدول بنود الفاتورة للتعديل */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-300 font-bold">بنود الفاتورة والكميات</label>
                  <button 
                    type="button" 
                    onClick={handleAddItem}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> إضافة بند
                  </button>
                </div>
                <div className="space-y-2">
                  {editingInvoice.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-700">
                      <input 
                        type="text" 
                        placeholder="اسم الصنف / الخدمة"
                        value={item.name}
                        onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded p-1.5 text-white text-xs"
                      />
                      <input 
                        type="number" 
                        placeholder="الكمية"
                        value={item.qty}
                        onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                        className="w-16 bg-slate-800 border border-slate-700 rounded p-1.5 text-white text-xs text-center"
                      />
                      <input 
                        type="number" 
                        placeholder="السعر"
                        value={item.price}
                        onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                        className="w-20 bg-slate-800 border border-slate-700 rounded p-1.5 text-white text-xs text-center"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveItem(idx)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* تعديل المبلغ المدفوع */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-slate-300 block mb-1">المبلغ المسدد ($)</label>
                  <input 
                    type="number" 
                    value={editingInvoice.paid}
                    onChange={(e) => setEditingInvoice({...editingInvoice, paid: Number(e.target.value)})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">الإجمالي الجديد المحسوب</label>
                  <div className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-2 text-emerald-400 font-bold font-mono">
                    {"$" + calculateTotal(editingInvoice.items)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-700">
                <button 
                  type="button" 
                  onClick={() => setEditingInvoice(null)}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" /> حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة المعاينة السريعة */}
      {previewInvoice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-xl w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <h3 className="font-bold text-white">معاينة الفاتورة: {previewInvoice.id}</h3>
              <button onClick={() => setPreviewInvoice(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-400">العميل:</strong> {previewInvoice.client}</p>
              <p><strong className="text-slate-400">الهاتف:</strong> {previewInvoice.phone}</p>
              <div className="bg-slate-900 p-3 rounded-lg space-y-1">
                {previewInvoice.items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{it.name} (x{it.qty})</span>
                    <span className="font-mono">{"$" + (it.qty * it.price)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-700">
              <button 
                onClick={() => {
                  handleExportPDF(previewInvoice);
                  setPreviewInvoice(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> تنزيل الفاتورة PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
