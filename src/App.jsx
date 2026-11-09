import React, { useState, useEffect } from 'react';

// قائمة المحافظات الـ 13 الرسمية لتاجر
const SAUDI_REGIONS = [
  "المنطقة الشرقية",
  "منطقة الباحة",
  "منطقة الجوف",
  "منطقة الحدود الشمالية",
  "منطقة الرياض",
  "منطقة القصيم",
  "منطقة المدينة المنورة",
  "منطقة تبوك",
  "منطقة جازان",
  "منطقة حائل",
  "منطقة عسير",
  "منطقة مكة المكرمة",
  "منطقة نجران"
];

// قائمة المنتجات الـ 20 الكاملة
const initialProducts = [
  { id: 1, name: "كريم خلاية للإشراق والجمال", price: 150, category: "العناية البشرة", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=500", desc: "كريم خلاية للعناية بالبشرة. يُسوق للمساعدة على تحسين مظهر إشراق البشرة ونضارتها." },
  { id: 2, name: "مجموعة سادوور للعناية بالبشرة", price: 180, category: "العناية البشرة", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=500", desc: "مجموعة مرطبة وغنية بالكولاجين للعناية الشاملة." },
  { id: 3, name: "سيروم فيتامين سي النقي", price: 120, category: "العناية البشرة", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500", desc: "يحارب علامات التقدم في السن ويعيد للبشرة حيويتها." },
  { id: 4, name: "قناع الذهب اللامع للوجه", price: 95, category: "العناية البشرة", image: "https://images.unsplash.com/photo-1512290900672-8cb631a23862?auto=format&fit=crop&q=80&w=500", desc: "تنظيف عميق وإزالة الشوائب لمنحك بشرة كالنجمات." },
  { id: 5, name: "زيت ارغان مغربي أصلي", price: 140, category: "الشعر والجسم", image: "https://images.unsplash.com/photo-1608248597359-9743c393bc2f?auto=format&fit=crop&q=80&w=500", desc: "تغذية مكثفة للشعر والجسم بقطرات الذهب السائل." },
  { id: 6, name: "مصفف الشعر الاحترافي 5 في 1", price: 290, category: "أجهزة تجميل", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500", desc: "تصفيف وتجفيف احترافي في منزلك بكل سهولة." },
  { id: 7, name: "مقشر الجسم بالقهوة الطبيعية", price: 85, category: "العناية بالجسم", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=500", desc: "إزالة الخلايا الميتة وتنعيم البشرة بعمق." },
  { id: 8, name: "عطر ليالي الشرق الفاخر", price: 220, category: "عطور", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=500", desc: "رائحة ثابتة تدوم طويلاً وتأسر الأنفاس." },
  { id: 9, name: "مرطب الشفاه المغذي بالعسل", price: 45, category: "العناية بالبشرة", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=500", desc: "حماية وترطيب فائق للشفاه الجافة." },
  { id: 10, name: "جهاز تنظيف البشرة بالموجات", price: 160, category: "أجهزة تجميل", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500", desc: "تنظيف مسام الوجه وإزالة الرؤوس السوداء بفعالية." },
  { id: 11, name: "كشد ورفع محيط العينين", price: 110, category: "العناية بالبشرة", image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=500", desc: "تقليل الهالات السوداء والانتفاخات تحت العين." },
  { id: 12, name: "بخاخ تثبيت المكياج يدوم طويلاً", price: 90, category: "مكياج", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=500", desc: "يحافظ على إشراقة مكياجك طوال اليوم." },
  { id: 13, name: "مجموعة طلاء الأظافر العصري", price: 75, category: "مكياج", image: "https://images.unsplash.com/photo-1632345031435-8777f6c9ae8c?auto=format&fit=crop&q=80&w=500", desc: "ألوان جذابة وثابتة سريعة الجفاف." },
  { id: 14, name: "كريم اليدين المرطب بزبدة الشيا", price: 60, category: "العناية بالجسم", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=500", desc: "نعومة فائقة وحماية لليدين من الجفاف." },
  { id: 15, name: "مسكارة إطالة الرموش المكثفة", price: 95, category: "مكياج", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=500", desc: "حجم مذهل ورموش بارزة طوال اليوم." },
  { id: 16, name: "لوحة ظلال العيون الساحرة", price: 130, category: "مكياج", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=500", desc: "ألوان متنوعة تناسب كافة الإطلالات اليومية والمناسبة." },
  { id: 17, name: "غسول لطيف للبشرة الحساسة", price: 85, category: "العناية البشرة", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=500", desc: "تنظيف عميق دون تهيج أو جفاف للبشرة." },
  { id: 18, name: "شامبو مغذي بالزيوت الطبيعية", price: 100, category: "الشعر والجسم", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=500", desc: "يمنح الشعر لمعاناً وقوة لا تقاوم." },
  { id: 19, name: "سيروم إطالة وتقوية الرموش", price: 115, category: "مكياج", image: "https://images.unsplash.com/photo-1512290900672-8cb631a23862?auto=format&fit=crop&q=80&w=500", desc: "تركيبة طبيعية لتكثيف الرموش والحواجب." },
  { id: 20, name: "لوشن مرطب للجسم بالمسك", price: 105, category: "العناية بالجسم", image: "https://images.unsplash.com/photo-1608248597359-9743c393bc2f?auto=format&fit=crop&q=80&w=500", desc: "رائحة منعشة وترطيب عميق يدوم طويلاً." }
];

export default function App() {
  // الحالات الأساسية مع استرجاعها من localStorage لمنع مشكلة الـ Refresh
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sa_lumea_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sa_lumea_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sa_lumea_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // التنقل وحل مشكلة الـ Refresh نهائياً
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash.replace('#', '') || 'home';
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // نموذج الدفع الشبيه بتاجر
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    altPhone: '',
    region: SAUDI_REGIONS[0],
    address: ''
  });

  // بحث التتبع للزبون
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackedOrderResult, setTrackedOrderResult] = useState(null);

  useEffect(() => {
    localStorage.setItem('sa_lumea_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sa_lumea_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sa_lumea_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setCurrentView(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changeView = (view) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo(0, 0);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح ✨`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    changeView('checkout');
  };

  // تقديم الطلب وتوافقه مع تاجر
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('ar-SA'),
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      customer: { ...checkoutData },
      status: 'طلبك قيد المراجعة' // الحالة الأولى
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setTrackedOrderResult(newOrder);
    showToast(`تم تقديم طلبك بنجاح! رقم طلبك: ${orderId}`);
    changeView('track-result');
  };

  // إلغاء الطلب من قِبل الزبون (فقط في مرحلة "طلبك قيد المراجعة")
  const cancelOrderByCustomer = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId && o.status === 'طلبك قيد المراجعة') {
        const updated = { ...o, status: 'تم الإلغاء من قِبل العميل' };
        setTrackedOrderResult(updated);
        return updated;
      }
      return o;
    }));
    showToast('تم إلغاء الطلب بنجاح.');
  };

  return (
    <div className="min-h-screen bg-pink-50/30 text-gray-800 font-sans pb-16" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 text-sm animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => changeView('home')} className="text-xl font-bold tracking-wider text-pink-700">
              S.A LUMÉA
            </button>
            <span className="text-xs text-pink-500 hidden sm:inline">جمالك .. اهتمامنا 🤍</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => changeView('track')} className="text-xs sm:text-sm bg-pink-50 text-pink-700 px-3 py-1.5 rounded-lg font-medium hover:bg-pink-100 transition">
              📦 تتبع طلبي
            </button>
            <button onClick={() => changeView('cart')} className="relative p-2 bg-pink-50 rounded-full text-pink-700 hover:bg-pink-100 transition">
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((sum, i) => sum + i.qty, 0)}
                </span>
              )}
            </button>
            <button onClick={() => changeView('admin')} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition">
              لوحة الإدارة ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div>
            {/* Banner */}
            <div className="bg-gradient-to-r from-pink-600 to-rose-400 rounded-2xl p-6 sm:p-10 text-white mb-8 shadow-md">
              <h1 className="text-2xl sm:text-4xl font-extrabold mb-2">مرحباً بك في S.A LUMÉA ✨</h1>
              <p className="text-sm sm:text-base opacity-90 max-w-xl">أرقى منتجات العناية بالبشرة والجمال بأسعار تنافسية وتوصيل سريع لكافة مناطق المملكة.</p>
            </div>

            {/* Products Grid (Responsive 2 Columns on Mobile) */}
            <h2 className="text-xl font-bold mb-4 text-gray-800">منتجاتنا المميزة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-pink-50 flex flex-col justify-between">
                  <div>
                    <div className="relative pb-[100%] overflow-hidden bg-gray-100">
                      <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition duration-300" />
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full font-medium">{product.category}</span>
                      <h3 className="font-bold text-xs sm:text-sm mt-1 text-gray-800 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.desc}</p>
                    </div>
                  </div>
                  <div className="p-3 pt-0 flex flex-col gap-2">
                    <div className="font-bold text-pink-600 text-sm sm:text-base">{product.price} ريال</div>
                    <div className="grid grid-cols-2 gap-1">
                      <button onClick={() => { setSelectedProduct(product); changeView('details'); }} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] sm:text-xs py-1.5 rounded-lg font-medium transition">
                        التفاصيل
                      </button>
                      <button onClick={() => handleBuyNow(product)} className="bg-pink-600 hover:bg-pink-700 text-white text-[11px] sm:text-xs py-1.5 rounded-lg font-bold transition shadow-sm">
                        اشتري الآن ⚡
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCT DETAILS VIEW */}
        {currentView === 'details' && selectedProduct && (
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-pink-50 max-w-3xl mx-auto">
            <button onClick={() => changeView('home')} className="text-xs text-pink-600 mb-4 font-bold flex items-center gap-1">
              ← عودة للرئيسية
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden bg-gray-100 h-64 md:h-80">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-pink-50 text-pink-600 px-3 py-1 rounded-full font-medium">{selectedProduct.category}</span>
                  <h1 className="text-xl sm:text-2xl font-bold mt-2 text-gray-900">{selectedProduct.name}</h1>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">{selectedProduct.desc}</p>
                  <div className="text-2xl font-extrabold text-pink-600 mt-4">{selectedProduct.price} ريال</div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => addToCart(selectedProduct)} className="flex-1 bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 py-2.5 rounded-xl font-bold text-sm transition">
                    أضف للسلة 🛒
                  </button>
                  <button onClick={() => handleBuyNow(selectedProduct)} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-xl font-bold text-sm transition shadow-md">
                    اشتري الآن ⚡
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CART VIEW */}
        {currentView === 'cart' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-pink-50">
            <h1 className="text-xl font-bold mb-4">سلة المشتريات 🛒</h1>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">سلة المشتريات فارغة حالياً.</p>
                <button onClick={() => changeView('home')} className="bg-pink-600 text-white px-6 py-2 rounded-xl text-sm font-bold">تصفح المنتجات</button>
              </div>
            ) : (
              <div>
                <div className="divide-y divide-gray-100">
                  {cart.map(item => (
                    <div key={item.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div>
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <span className="text-xs text-gray-500">{item.price} ريال × {item.qty}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-pink-600">{item.price * item.qty} ريال</span>
                        <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="text-red-500 text-xs font-bold px-2 py-1 bg-red-50 rounded-lg">حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-6 pt-4 flex justify-between items-center">
                  <span className="font-bold text-gray-700">الإجمالي الكلي:</span>
                  <span className="text-xl font-extrabold text-pink-600">
                    {cart.reduce((sum, item) => sum + (item.price * item.qty), 0)} ريال
                  </span>
                </div>
                <button onClick={() => changeView('checkout')} className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-bold text-sm shadow-md transition">
                  إتمام الطلب الآن (الدفع عند الاستلام) 🚚
                </button>
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT VIEW (Taager Form Compliance) */}
        {currentView === 'checkout' && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-pink-50">
            <h1 className="text-xl font-bold mb-2">إتمام الطلب 📝</h1>
            <p className="text-xs text-gray-500 mb-6">يرجى تعبئة البيانات بدقة لضمان سرعة تأكيد وشحن الطلب.</p>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">الاسم بالكامل *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="أدخل اسمك الثلاثي"
                  value={checkoutData.fullName}
                  onChange={e => setCheckoutData({...checkoutData, fullName: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">رقم المحمول (بالأرقام الإنجليزية) *</label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-pink-500">
                    <span className="bg-gray-50 px-3 py-3 text-xs font-bold text-gray-600 border-l border-gray-200 flex items-center gap-1">🇸🇦 +966</span>
                    <input 
                      type="tel" 
                      required 
                      placeholder="512345678"
                      dir="ltr"
                      value={checkoutData.phone}
                      onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})}
                      className="w-full p-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">الرقم البديل (بالأرقام الإنجليزية) *</label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-pink-500">
                    <span className="bg-gray-50 px-3 py-3 text-xs font-bold text-gray-600 border-l border-gray-200 flex items-center gap-1">🇸🇦 +966</span>
                    <input 
                      type="tel" 
                      required 
                      placeholder="598765432"
                      dir="ltr"
                      value={checkoutData.altPhone}
                      onChange={e => setCheckoutData({...checkoutData, altPhone: e.target.value})}
                      className="w-full p-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">المحافظة / المنطقة *</label>
                <select 
                  value={checkoutData.region}
                  onChange={e => setCheckoutData({...checkoutData, region: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-pink-500"
                >
                  {SAUDI_REGIONS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">العنوان بالتفصيل (الحي، الشارع، رقم المبنى) *</label>
                <textarea 
                  required 
                  rows="2"
                  placeholder="مثال: حي الياسمين، شارع الملك فهد، منزل رقم 14"
                  value={checkoutData.address}
                  onChange={e => setCheckoutData({...checkoutData, address: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition">
                تأكيد وإرسال الطلب 🚀
              </button>
            </form>
          </div>
        )}

        {/* TRACK ORDER VIEW */}
        {currentView === 'track' && (
          <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-sm border border-pink-50 text-center">
            <h1 className="text-xl font-bold mb-2">تتبع حالة طلبك 🔍</h1>
            <p className="text-xs text-gray-500 mb-6">أدخل رقم الطلب أو رقم هاتفك لمعرفة أحدث مستجدات طلبك.</p>
            
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                placeholder="مثال: LUM-482910"
                value={trackingQuery}
                onChange={e => setTrackingQuery(e.target.value)}
                className="flex-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500"
              />
              <button 
                onClick={() => {
                  const found = orders.find(o => o.id === trackingQuery || o.customer.phone.includes(trackingQuery));
                  if (found) {
                    setTrackedOrderResult(found);
                    changeView('track-result');
                  } else {
                    showToast('لم يتم العثور على طلب بهذا الرقم.');
                  }
                }}
                className="bg-pink-600 text-white px-5 rounded-xl text-sm font-bold"
              >
                بحث
              </button>
            </div>
          </div>
        )}

        {/* TRACK RESULT VIEW & SMART CANCELLATION */}
        {currentView === 'track-result' && trackedOrderResult && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-pink-50">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h1 className="text-lg font-bold text-gray-800">تفاصيل الطلب: {trackedOrderResult.id}</h1>
                <span className="text-xs text-gray-500">تاريخ الطلب: {trackedOrderResult.date}</span>
              </div>
              <button onClick={() => changeView('track')} className="text-xs text-pink-600 font-bold">بحث عن طلب آخر</button>
            </div>

            {/* Status Progress Bar (5 States) */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-700 mb-4">حالة الطلب الحالية:</h3>
              <div className="space-y-3">
                {[
                  "طلبك قيد المراجعة",
                  "تم تأكيد طلبك",
                  "تم شحن طلبك",
                  "الطلب مع شركة الشحن",
                  "تم تسليم الطلب"
                ].map((st, idx) => {
                  const statesList = [
                    "طلبك قيد المراجعة",
                    "تم تأكيد طلبك",
                    "تم شحن طلبك",
                    "الطلب مع شركة الشحن",
                    "تم تسليم الطلب"
                  ];
                  const currentIndex = statesList.indexOf(trackedOrderResult.status);
                  const isDone = currentIndex >= idx;
                  const isCurrent = trackedOrderResult.status === st;

                  return (
                    <div key={st} className={`flex items-center gap-3 p-3 rounded-xl border ${isCurrent ? 'bg-pink-50 border-pink-200 text-pink-700 font-bold' : isDone ? 'bg-gray-50 border-gray-200 text-gray-700' : 'opacity-40 border-gray-100 text-gray-400'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isDone ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {idx + 1}
                      </div>
                      <span className="text-sm">{st}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Smart Cancellation Button (Only during "طلبك قيد المراجعة") */}
            {trackedOrderResult.status === 'طلبك قيد المراجعة' && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-800">إلغاء الطلب</h4>
                  <p className="text-[11px] text-amber-600">يمكنك إلغاء الطلب طالما لم يتم تأكيده بعد من قِبل الإدارة.</p>
                </div>
                <button 
                  onClick={() => cancelOrderByCustomer(trackedOrderResult.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  إلغاء الطلب
                </button>
              </div>
            )}

            {trackedOrderResult.status === 'تم الإلغاء من قِبل العميل' && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-center text-red-600 font-bold text-sm">
                تم إلغاء هذا الطلب بنجاح.
              </div>
            )}
          </div>
        )}

        {/* ADMIN PANEL */}
        {currentView === 'admin' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-pink-50">
            {!isAdmin ? (
              <div className="max-w-sm mx-auto text-center py-8">
                <h2 className="text-lg font-bold mb-4">لوحة تحكم الإدارة ⚙️</h2>
                <input 
                  type="password" 
                  placeholder="أدخل كلمة المرور (افتراضي: admin)"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm mb-4 focus:outline-none"
                />
                <button 
                  onClick={() => {
                    if (adminPassword === 'admin' || adminPassword === '') {
                      setIsAdmin(true);
                      showToast('تم تسجيل الدخول للوحة الإدارة بنجاح');
                    } else {
                      showToast('كلمة المرور غير صحيحة');
                    }
                  }} 
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm"
                >
                  دخول
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h1 className="text-xl font-bold">إدارة الطلبات ({orders.length})</h1>
                  <button onClick={() => setIsAdmin(false)} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">تسجيل خروج</button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">لا توجد طلبات واردة حتى الآن.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                          <div>
                            <span className="font-bold text-sm text-pink-600">{order.id}</span>
                            <span className="text-xs text-gray-500 ml-3">({order.date})</span>
                          </div>
                          
                          {/* Admin Status Dropdown (5 States) */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-600">الحالة:</span>
                            <select 
                              value={order.status}
                              onChange={e => {
                                const newStatus = e.target.value;
                                setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
                                showToast('تم تحديث حالة الطلب بنجاح');
                              }}
                              className="p-1.5 border border-gray-300 rounded-lg text-xs font-bold bg-white text-pink-700"
                            >
                              <option value="طلبك قيد المراجعة">طلبك قيد المراجعة</option>
                              <option value="تم تأكيد طلبك">تم تأكيد طلبك</option>
                              <option value="تم شحن طلبك">تم شحن طلبك</option>
                              <option value="الطلب مع شركة الشحن">الطلب مع شركة الشحن</option>
                              <option value="تم تسليم الطلب">تم تسليم الطلب</option>
                              <option value="تم الإلغاء من قِبل العميل">ملغي</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white p-3 rounded-lg border border-gray-100">
                          <div>
                            <p><strong>الاسم:</strong> {order.customer.fullName}</p>
                            <p><strong>الهاتف:</strong> +966 {order.customer.phone}</p>
                            <p><strong>الهاتف البديل:</strong> +966 {order.customer.altPhone}</p>
                          </div>
                          <div>
                            <p><strong>المحافظة:</strong> {order.customer.region}</p>
                            <p><strong>العنوان:</strong> {order.customer.address}</p>
                            <p><strong>الإجمالي:</strong> <span className="font-bold text-pink-600">{order.total} ريال</span></p>
                          </div>
                        </div>

                        {/* زر نسخ بيانات تاجر */}
                        <div className="mt-3 flex justify-end">
                          <button 
                            onClick={() => {
                              const taagerText = `طلب جديد: ${order.id}\nالاسم: ${order.customer.fullName}\nالهاتف: +966 ${order.customer.phone}\nالبديل: +966 ${order.customer.altPhone}\nالمحافظة: ${order.customer.region}\nالعنوان: ${order.customer.address}\nالمنتجات: ${order.items.map(i => `${i.name} (×${i.qty})`).join(', ')}\nالإجمالي: ${order.total} ريال`;
                              navigator.clipboard.writeText(taagerText);
                              showToast('تم نسخ بيانات تاجر بنجاح 📋');
                            }}
                            className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm"
                          >
                            نسخ بيانات تاجر 📋
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}