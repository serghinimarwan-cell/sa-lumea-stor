import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Heart, Search, Menu, X, ChevronLeft, ChevronRight, 
  Plus, Minus, Trash2, CheckCircle2, AlertCircle, ShoppingCart, 
  Lock, Eye, Edit, Trash, Package, DollarSign, Users, Copy, Check,
  ArrowRight, Shield, RefreshCw, Truck, Phone, MapPin, Mail, Sparkles,
  ExternalLink, LogOut, ChevronDown, Filter, Info, Star, Home, Box, Zap, User
} from 'lucide-react';

const SUPABASE_URL = "https://tfcwgecpdvodxxmvxnnn.supabase.co";
const SUPABASE_KEY = "sb_publishable_n_CFQHNUEOX_WagvE6cs6g_KW3hJtjK";

const fetchFromSupabase = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      ...options,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': options.prefer || 'return=representation',
        ...options.headers
      }
    });
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.error("Supabase Error:", err);
    return null;
  }
};

const REGIONS_SA = [
  "الرياض", "مكة المكرمة", "المدينة المنورة", "القصيم", "المنطقة الشرقية",
  "عسير", "تبوك", "حائل", "الحدود الشمالية", "جازان", "نجران", "الباحة", "الجوف"
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    category: "العناية بالبشرة",
    name: "كريم خلابة للإشراق والجمال",
    price: 150,
    inStock: true,
    description: "كريم خلابة للعناية بالبشرة، يُسوّق للمساعدة على تحسين مظهر إشراق البشرة ونضارتها.",
    features: ["يساعد في تحسين مظهر البشرة", "يمنح البشرة نضارة طبيعية", "تركيبة غنية ومغذية"],
    specs: "سعة العبوة مناسبة للاستخدام اليومي",
    contents: "عبوة كريم خلابة واحدة",
    usage: "يُوضع على بشرة نظيفة مرة إلى مرتين يومياً مع التدليك اللطيف.",
    images: ["https://media.taager.com/f3c2bcd2-6775-4f7e-b851-ec6c1d3a2b78.png"]
  },
  {
    id: 2,
    category: "العناية بالبشرة",
    name: "بكج سادوور الذهبي بالكولاجين لمحاربة التجاعيد (6 قطع)",
    price: 170,
    inStock: true,
    description: "مجموعة SADOER مكونة من 6 منتجات للعناية بالبشرة محفزة بالكولاجين لمرونة ونضارة أفضل.",
    features: ["ترطيب عميق للبشرة", "محاربة علامات التقدم في السن", "مجموعة متكاملة للعناية اليومية"],
    specs: "مجموعة 6 قطع متنوعة",
    contents: "6 قطع من منتجات سادوور الذهبية",
    usage: "تُستخدم المنتجات بالتتابع: الغسول، التونر، السيروم، ثم الكريم.",
    images: [
      "https://media.taager.com/9abf907c-fdc1-4180-8081-35744b6f7598.jpg",
      "https://media.taager.com/b36a9b82-3050-4da4-91cb-f542f09dc983.jpg",
      "https://media.taager.com/efc314eb-6f55-40e3-900e-300868cac7bf.jpg"
    ]
  },
  {
    id: 3,
    category: "العناية بالبشرة",
    name: "سيروم فيتامين سي طبيعي SADOER",
    price: 120,
    inStock: true,
    description: "سيروم فيتامين سي من SADOER للعناية بالبشرة وتوحيد لونها وإعادة الحيوية إليها.",
    features: ["مضاد لأكسدة البشرة", "يعزز الإشراق والترطيب", "سريع الامتصاص"],
    specs: "30 ml",
    contents: "عبوة سيروم 30 مل",
    usage: "توضع بضع قطرات على الوجه والرقبة صباحاً ومساءً.",
    images: [
      "https://media.taager.com/ac7d39c2-f5dc-43df-9a4a-db73d8003dc0.jpg",
      "https://media.taager.com/736b5dd8-1e09-4f9a-ac2e-85611b7f9037.jpg",
      "https://media.taager.com/d8398199-326f-4f04-9cab-6b754f566bd5.jpg"
    ]
  },
  {
    id: 4,
    category: "العناية بالبشرة",
    name: "إيكوالبيري الأزرق – سيروم هيالتوين المغذي 30 مل",
    price: 123,
    inStock: true,
    description: "سيروم هيالتوين من Eqqual Berry للعناية بالبشرة وترطيبها بفعالية عالية.",
    features: ["ترطيب مكثف", "تهدئة البشرة المجهدة", "تركيبة خفيفة غير لزجة"],
    specs: "30 ml",
    contents: "عبوة سيروم 30 مل",
    usage: "يُوزع على البشرة المغسولة ويُطبطب بلطف حتى الامتصاص.",
    images: [
      "https://media.taager.com/8ae13666-7f6b-4e5b-ae5f-7543392f0157.jpg",
      "https://media.taager.com/9d175b6c-845d-41ed-a538-9129b725e535.jpg",
      "https://media.taager.com/8676541f-d43f-481c-ae44-d62b845fd3b6.jpg",
      "https://media.taager.com/add6fbd1-5975-460d-a034-c0013834aa22.jpg"
    ]
  },
  {
    id: 5,
    category: "العناية بالبشرة",
    name: "عرض 3 من صابون حمض الكوجيك الكوري",
    price: 160,
    inStock: true,
    description: "عرض اقتصادي يتضمن ثلاث قطع من صابون حمض الكوجيك الكوري الشهير لتنظيف وتنقية البشرة.",
    features: ["تبييض وتنظيف عميق", "تفتيح التصبغات", "عرض ثلاثي توفيري"],
    specs: "3 قطع",
    contents: "3 قطع صابون",
    usage: "تُرغى الصابونة بالماء وتدلك بها البشرة لدقيقة ثم تغسل جيداً.",
    images: [
      "https://media.taager.com/0cc4b601-7e02-486d-86d5-bdcfd2f4599d.png",
      "https://media.taager.com/605d3d68-3a4e-47ad-9093-59cff2a587d2.jpg",
      "https://media.taager.com/0953ebec-aaf3-4c48-9597-2481bff45155.jpg",
      "https://media.taager.com/5675d38a-c14b-45ef-a951-2e563cb59597.jpg",
      "https://media.taager.com/bef5bd31-45ce-41fb-a915-1f1b65ef91e7.jpg",
      "https://media.taager.com/06b1ee2d-692a-465d-b5b4-cdf5148cc854.jpg",
      "https://media.taager.com/0c698428-0339-405a-98e4-ac91bd87d5d3.jpg"
    ]
  },
  {
    id: 6,
    category: "العناية بالبشرة",
    name: "جهاز مساج الوجه للتصريف اللمفاوي",
    price: 124,
    inStock: true,
    description: "جهاز مساج مخصص للوجه والرقبة يعمل بـ 3 أوضاع وإضاءة علاجية لتنشيط الدورة الدموية والتصريف اللمفاوي.",
    features: ["ثلاثة أوضاع عمل", "إضاءة حرارية علاجية", "يحفز مرونة الجلد والنضارة"],
    specs: "قابلة للشحن بـ USB",
    contents: "الجهاز + كابل الشحن + دليل المستعمل",
    usage: "يُستخدم مع سيروم أو زيت الوجه بحركات تصاعدية من الأسفل للأعلى.",
    images: [
      "https://media.taager.com/353aa8d3-bbc8-4025-b413-f80ddab7badf.png",
      "https://media.taager.com/1e1c2926-01c4-4721-9e59-abdc558e2323.png",
      "https://media.taager.com/d7abe7ff-0e62-4839-ba4d-879eb80ccbcb.png",
      "https://media.taager.com/f944d585-d17c-454f-9beb-8d1e39b6b3d8.png"
    ]
  },
  {
    id: 7,
    category: "العناية بالبشرة",
    name: "صابون حمض الكوجيك الكوري – قطعة واحدة",
    price: 113,
    inStock: true,
    description: "قطعة واحدة من صابون حمض الكوجيك الكوري للعناية بالبشرة وتنقيتها من الشوائب.",
    features: ["تنظيف عميق", "تفتيح وتوحيد لون البشرة", "حجم مناسب للاستجابة السريعة"],
    specs: "65g",
    contents: "قطعة واحدة (65 غرام)",
    usage: "يُغسل بها الوجه أو الجسم يومياً مع شطفه جيدا.",
    images: [
      "https://media.taager.com/b4e81370-8136-42d9-9753-6eb340022d2c.png",
      "https://media.taager.com/96ccf558-4def-4835-871f-46373e382ee1.jpg",
      "https://media.taager.com/7cf0ede3-e2ae-4ae4-b191-b537b83d5d3e.jpg",
      "https://media.taager.com/36f30629-0538-4270-8e5f-64656230c7e2.jpg",
      "https://media.taager.com/780f45c1-6e2a-4f93-b879-b280b7113bac.jpg",
      "https://media.taager.com/f33872b5-f05e-423b-ad5a-458c55eba073.jpg"
    ]
  },
  {
    id: 8,
    category: "العناية بالجسم",
    name: "لوشن كولاجين ليفت 10X لشد الترهلات – 300 غرام",
    price: 139,
    inStock: true,
    description: "لوشن مغذي للجسم من SADOER مركب بالكولاجين المكثف للعناية بالبشرة وترطيبها وشد الجلد.",
    features: ["تركيبة مكثفة 10X كولاجين", "ترطيب عميق يدوم طويلاً", "يساعد في تحسين مرونة الجلد"],
    specs: "300 غرام",
    contents: "عبوة لوشن ضغاط 300 غرام",
    usage: "يُدلك على كامل الجسم بعد الاستحمام بحركات دائرية.",
    images: [
      "https://media.taager.com/57bfb2c2-059a-47f0-bdc7-00e7aad421e6.png",
      "https://media.taager.com/ad1848c4-7cbf-49be-b42b-e4ff6ec9f785.png",
      "https://media.taager.com/f2248181-51de-4add-9490-9f5f64baa2d4.png"
    ]
  },
  {
    id: 9,
    category: "العناية بالجسم",
    name: "مجموعة فلاتر شاور معطرة – 4 روائح",
    price: 153,
    inStock: true,
    description: "مجموعة فلاتر مميزة للاستحمام معطرة بأربعة روائح منعشة تساعد على تنقية الماء وترطيب الجسم.",
    features: ["تنقية ماء الاستحمام من الشوائب", "روائح عطرية زكية ومنعشة", "سهلة التركيب على الدش"],
    specs: "4 فلاتر متنوعة",
    contents: "4 فلاتر دش بروائح مختلفة",
    usage: "تُرادَف على رأس الدش بسهولة وتُستبدل عند انتهاء المادة العطرية.",
    images: [
      "https://media.taager.com/6dfe0d47-9f49-4b28-99d2-b3cbef9e1f1c.png",
      "https://media.taager.com/dcd63c26-7395-49d3-ad53-8396d3738838.png",
      "https://media.taager.com/076eba0e-7093-4dfe-9ce0-5deb3452595d.png",
      "https://media.taager.com/5153278c-be27-4fbc-8a51-bf06bb046410.png",
      "https://media.taager.com/1cecdedb-fd55-45c7-aea7-ee23bb8ed4d6.png",
      "https://media.taager.com/e345422e-b584-44c5-8789-140b68cb0c90.png",
      "https://media.taager.com/e4866774-bf8c-4210-9d7d-9f32da9abca7.jpg"
    ]
  },
  {
    id: 10,
    category: "العناية بالجسم",
    name: "عرض 2 من غسول كير كول للمناطق الحساسة – 215 مل",
    price: 149,
    inStock: true,
    description: "عرض اقتصادي يتضمن عبوتين من غسول Care Cool المخصص للعناية الخارجية والحفاظ على الانتعاش.",
    features: ["عناية لطيفة بالبشرة الحساسة", "حماية وإنعاش ممتد", "عبوتان بسعر مميز"],
    specs: "215 مل لكل عبوة",
    contents: "عبوتان من الغسول",
    usage: "يُستخدم كمية قليلة مع الماء للاغتسال الخارجي ثم يُشطف جيداً.",
    images: ["https://media.taager.com/12f0fb13-544b-444d-af6b-bb637da10c90.jpg"]
  },
  {
    id: 11,
    category: "العناية بالجسم",
    name: "غسول كير كول للمناطق الحساسة بخلاصة النيلة الزرقاء",
    price: 130,
    inStock: true,
    description: "غسول مهدئ من Care Cool غني بخلاصة النيلة الزرقاء للعناية بالنظافة والانتعاش اليومي.",
    features: ["بخلاصة النيلة المغربية الزرقاء", "ينعش ويمنح شعوراً بالراحة", "تركيبة متوازنة الـ pH"],
    specs: "215 مل",
    contents: "عبوة واحدة 215 مل",
    usage: "يُوضع خفيفاً على المنطقة الخارجية ويغسل بماء فاتر.",
    images: [
      "https://media.taager.com/c85ec170-6e49-4e84-b707-b6d0de81d48d.jpg",
      "https://media.taager.com/b62e98c4-f748-4a73-a40e-34aa2a0d5528.jpg"
    ]
  },
  {
    id: 12,
    category: "العناية بالجسم",
    name: "غسول كير كول للمناطق الحساسة بخلاصة عكر فاسي",
    price: 130,
    inStock: true,
    description: "غسول مخصص من Care Cool مدعم بخلاصة العكر الفاسي الأصيل لنظافة وانتعاش دائمين.",
    features: ["مستخلص عكر فاسي الطبيعي", "تركيبة لطيفة آمنة", "رائحة زكية وانتعاش يدوم"],
    specs: "215 مل",
    contents: "عبوة واحدة 215 مل",
    usage: "يُغسل به الخارجي بالماء وتكرر العملية حسب الحاجة.",
    images: [
      "https://media.taager.com/11e8f1c3-ef79-450e-867f-300146ae35fe.jpg",
      "https://media.taager.com/7d274c2c-ad84-4019-8e10-baad28964333.jpg",
      "https://media.taager.com/ec9f5d55-500b-4a88-9189-4f28decabf1b.jpg"
    ]
  },
  {
    id: 13,
    category: "العناية بالشعر",
    name: "عرض 6 من زيت الشعر 108 عشبة الهندي",
    price: 199,
    inStock: true,
    description: "عرض التوفير الأكبر: 6 عبوات من زيت الشعر الهندي 108 عشبة الغني بالتغذية الطبيعية لجذور الشعر.",
    features: ["مزيج من 108 أعشاب هندية", "تغذية مكثفة وتقوية للشعر", "عرض عبوات متعددة"],
    specs: "6 عبوات زيت",
    contents: "6 عبوات من زيت 108 عشبة",
    usage: "يُدلك به فروة الرأس والشعر قبل الاستحمام بساعتين أو طوال الليل.",
    images: [
      "https://media.taager.com/39fa7e3b-5dc7-4443-8847-3932d055cdba.png",
      "https://media.taager.com/3b0d817d-cda3-44ae-a77a-17631c1e5223.webp",
      "https://media.taager.com/6c7ef829-3a44-4894-b4b3-b88ca04bbf64.webp",
      "https://media.taager.com/1c4b952f-9287-4704-9cd6-803abcacfb78.webp"
    ]
  },
  {
    id: 14,
    category: "العناية بالشعر",
    name: "زيت الشعر 108 عشبة الهندي – تركيبة جديدة – 250 مل",
    price: 118,
    inStock: true,
    description: "عبوة زيت الشعر الهندي 108 عشبة الشهيرة بالتركيبة المحدثة ذات التأثير الفعال لتنعيم وتقوية بصيلات الشعر.",
    features: ["تركيبة محدثة ومطورة", "يساعد على التقليل من التساقط", "يعطي لمعاناً ونعومة"],
    specs: "250 مل",
    contents: "عبوة واحدة 250 مل",
    usage: "يُطبق على الشعر وفروة الرأس مرتين إلى ثلاث مرات أسبوعياً.",
    images: [
      "https://media.taager.com/f34a2e5d-be1e-4fde-8c51-9cc75818cb77.jpg",
      "https://media.taager.com/683bae13-b03b-4a75-95bb-557c4584776d.jpg"
    ]
  },
  {
    id: 15,
    category: "العناية بالشعر",
    name: "باندل العناية والتصفيف: زيت الأعشاب 1 لتر + مصفف الشعر",
    price: 229,
    inStock: true,
    description: "مجموعة متكاملة تجمع بين زيت الأعشاب الهندية الحجم الكبير (1 لتر) وجهاز مصفف الشعر 2 في 1 لنتيجة احترافية.",
    features: ["زيت سعة ضخمة 1 لتر", "مصفف شعر احترافي 2 في 1", "توفير عالي وشامل"],
    specs: "زيت 1 لتر + جهاز تصفيف",
    contents: "عبوة زيت 1 لتر + مصفف شعر برأسين",
    usage: "يُغذى الشعر بالزيت أولاً ثم يُستعمل المصفف للحصول على تسريحة جذابة.",
    images: ["https://media.taager.com/4058d6e0-7860-412c-83e9-a2fbf1ee6fe3.jpg"]
  },
  {
    id: 16,
    category: "العناية بالشعر",
    name: "زيت الأعشاب الهندية لحماية الشعر – 1 لتر",
    price: 153,
    inStock: true,
    description: "عبوة عائلية كبيرة من زيت الأعشاب الهندية المخصص لحماية الشعر والتغذية العميقة من الجذور حتى الأطراف.",
    features: ["حجم كبير اقتصادي 1 لتر", "حماية الشعر من الجفاف والتلف", "مناسب لجميع أنواع الشعر"],
    specs: "1 لتر",
    contents: "عبوة زيت سعة 1000 مل",
    usage: "يُدلك على الشعر وفروة الرأس ويُترك لفترة كافية قبل الشطف.",
    images: [
      "https://media.taager.com/6a5a3b40-4c02-474a-97bc-56211ae791bc.jpg",
      "https://media.taager.com/d1535274-58c1-45c5-bbdc-98d6f39524c4.webp",
      "https://media.taager.com/5b4208bb-c6e6-471f-8c10-5d0131aeb5e1.webp"
    ]
  },
  {
    id: 17,
    category: "العناية بالشعر",
    name: "مصفف الشعر المزدوج 2 في 1 برأسين للتبديل",
    price: 170,
    inStock: true,
    description: "جهاز تصفيف شعر عصري وقوي بقدرة 1000W يأتي برأسين قابلين للتبديل لتجفيف وتنعيم الشعر بكل سهولة.",
    features: ["قدرة عالية 1000 واط", "رأسان مختلفان للتصفيف والتجفيف", "تحكم سهل ومريح بالحرارة"],
    specs: "1000W",
    contents: "الجهاز + ملحقان (رأسان للتبديل)",
    usage: "يُربط الرأس المطلوب ويُوصل بالكهرباء ثم تصفف الخصلات بحرارة مناسبة.",
    images: [
      "https://media.taager.com/bd5e1478-a35b-4ac0-8f39-7625c6ee0f00.jpg",
      "https://media.taager.com/295db8c9-5fdb-4310-920d-c8244215ef3f.jpg",
      "https://media.taager.com/0b1352f1-960a-4688-8beb-31d355974a35.jpg",
      "https://media.taager.com/7357c03c-9305-4aaf-b912-cc08da27788c.png"
    ]
  },
  {
    id: 18,
    category: "العناية بالشعر",
    name: "بكج دلال وتكثيف الشعر بالباتانا",
    price: 169,
    inStock: true,
    description: "مجموعة فاخرة لتكثيف وتغذية الشعر مستخلصة من زيت الباتانا المقوي مرفقة بفرشاة شعر بالبخار لتسهيل التوزيع.",
    features: ["تغذية مركزة بـ زيت الباتانا", "يساعد على التكثيف واللمعان", "فرشاة بخار مرافقة"],
    specs: "مجموعة كاملة + فرشاة",
    contents: "منتجات الباتانا + فرشاة شعر بالبخار",
    usage: "تُوضع منتجات الباتانا على الشعر وتُوزع بالفرشاة المرفقة لحصول أفضل نتيجة.",
    images: ["https://media.taager.com/d90a1a6b-e2be-46bc-bf02-87585b3a01b2.jpg"]
  },
  {
    id: 19,
    category: "العناية بالشعر",
    name: "مجموعة الباتانا: شامبو وبلسم وزيت وماسك",
    price: 142,
    inStock: true,
    description: "مجموعة الباتانا المتكاملة 4 في 1 لمعالجة وترطيب الشعر المجهد والمتعب برعاية فائقة.",
    features: ["روتين كامل بأربع الخطوات", "ترطيب وتنعيم فوريين", "يعيد الحيوية للشعر الجاف"],
    specs: "4 قطع متكاملة",
    contents: "شامبو + بلسم + زيت + ماسك",
    usage: "يغسل بالشامبو، ثم يوضع البلسم والماسك، ويختم بالزيت للتصفيف.",
    images: [
      "https://media.taager.com/2c78ea50-6686-4802-b840-98237200dd1a.jpg",
      "https://media.taager.com/52872518-933a-49a6-a43c-e34a9f686a62.jpg",
      "https://media.taager.com/99cb14df-0e40-4070-a273-d1587e914162.jpg",
      "https://media.taager.com/0795094b-ff63-48d3-a1d8-546b4e4179da.jpg",
      "https://media.taager.com/b7ab6c85-f26b-4514-a021-ad5f17cd380f.jpg"
    ]
  },
  {
    id: 20,
    category: "العناية بالشعر",
    name: "فرشاة تمليس الشعر بالبخار المضادة للحروق – JY-603",
    price: 130,
    inStock: true,
    description: "فرشاة تمليس الشعر بالبخار موديل JY-603 مع خاصية الرش والمحيط المضاد للحروق لحماية فروة الرأس واليدين.",
    features: ["تكنولوجيا التمليس بالبخار", "تصميم آمن مضاد للحروق", "بطارية قابلة للشحن سعة 300mAh"],
    specs: "موديل JY-603 / بطارية 300mAh",
    contents: "الفرشاة + كابل الشحن USB",
    usage: "تُشحن وتُمشّط بها خصلات الشعر الجافة أو الرطبة برفق.",
    images: [
      "https://media.taager.com/ed078034-fd24-49c6-b754-7ee25053e303.jpg",
      "https://media.taager.com/58420b7d-ad8b-4868-9886-3f8c992006af.jpg",
      "https://media.taager.com/55c7537c-c61f-43f4-b988-ffee6c8f9db0.jpg"
    ]
  }
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadData = async () => {
    const dbProducts = await fetchFromSupabase('products?select=*');
    if (dbProducts && Array.isArray(dbProducts) && dbProducts.length > 0) {
      setProducts(dbProducts);
    } else {
      for (let p of INITIAL_PRODUCTS) {
        await fetchFromSupabase('products', {
          method: 'POST',
          body: JSON.stringify(p)
        });
      }
      const reloaded = await fetchFromSupabase('products?select=*');
      if (reloaded) setProducts(reloaded);
    }

    const dbOrders = await fetchFromSupabase('orders?select=*&order=created_at.desc');
    if (dbOrders && Array.isArray(dbOrders)) {
      const formattedOrders = dbOrders.map(o => ({
        id: o.order_id,
        date: new Date(o.created_at).toLocaleString('ar-SA'),
        customer: {
          fullName: o.customer_name,
          phone: o.phone,
          extraPhone: o.alt_phone,
          region: o.region,
          city: o.city,
          district: '',
          street: o.address,
          buildingNo: '',
          nationalAddress: ''
        },
        items: [{ name: o.product_name, price: o.price, quantity: 1, images: [''] }],
        total: o.price,
        status: o.status || 'جديد'
      }));
      setOrders(formattedOrders);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const [currentCategory, setCurrentCategory] = useState("الكل");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0); 
  const [activeTab, setActiveTab] = useState('home'); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    extraPhone: '',
    region: 'الرياض',
    city: '',
    district: '',
    street: '',
    buildingNo: '',
    nationalAddress: ''
  });
  const [checkoutError, setCheckoutError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.inStock) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح! 🛒`);
  };

  const buyNow = (product) => {
    if (!product || !product.inStock) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const openProductDetails = (id) => {
    setSelectedProductId(id);
    setActiveImageIndex(0); 
    setActiveTab('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!checkoutData.fullName || !checkoutData.phone || !checkoutData.city || !checkoutData.street) {
      setCheckoutError('الرجاء تعبئة جميع الحقول الإلزامية المطلوبة بشكل صحيح');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCheckoutError('');
    if (cart.length === 0) return;

    const refNumber = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
    const firstItem = cart[0];

    const newDbOrder = {
      order_id: refNumber,
      customer_name: checkoutData.fullName,
      phone: checkoutData.phone,
      alt_phone: checkoutData.extraPhone || 'غير محدد',
      region: checkoutData.region,
      city: checkoutData.city,
      address: `${checkoutData.district} - ${checkoutData.street} - مبنى ${checkoutData.buildingNo}`,
      product_name: firstItem.name + (cart.length > 1 ? ` و ${cart.length - 1} منتجات أخرى` : ''),
      price: cartTotal,
      status: 'جديد',
      created_at: new Date().toISOString()
    };

    await fetchFromSupabase('orders', {
      method: 'POST',
      body: JSON.stringify(newDbOrder)
    });

    setOrderSuccess({
      id: refNumber,
      date: new Date().toLocaleString('ar-SA'),
      customer: { ...checkoutData },
      items: [...cart],
      total: cartTotal,
      status: 'جديد'
    });
    setCart([]);
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = currentCategory === 'الكل' || p.category === currentCategory;
      const matchesSearch = p.name.includes(searchQuery) || p.description.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [products, currentCategory, searchQuery]);

  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === (import.meta.env.VITE_ADMIN_PASSWORD || 'Marouane2001')) {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('كلمة المرور غير صحيحة');
    }
  };

  const updateProductStock = async (id, inStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock } : p));
    await fetchFromSupabase(`products?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ inStock })
    });
    showToast("تم تحديث حالة المخزون سحابياً بنجاح!");
  };

  const updateProductPrice = async (id, price) => {
    const numPrice = Number(price);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: numPrice } : p));
    await fetchFromSupabase(`products?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ price: numPrice })
    });
  };

  const updateOrderStatus = async (orderId, status) => {
    await fetchFromSupabase(`orders?order_id=eq.${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const copyTaagerData = (order) => {
    const text = `
رقم الطلب: ${order.id}
اسم الزبون: ${order.customer.fullName}
رقم الهاتف: ${order.customer.phone}
رقم إضافي (بديل): ${order.customer.extraPhone || 'غير محدد'}
المنطقة: ${order.customer.region}
المدينة: ${order.customer.city}
الحي: ${order.customer.district}
الشارع: ${order.customer.street}
رقم المبنى: ${order.customer.buildingNo}
العنوان الوطني: ${order.customer.nationalAddress || 'غير محدد'}
المبلغ الإجمالي: ${order.total} ريال
المنتجات:
${order.items.map(i => `- ${i.name} (الكمية: ${i.quantity}) بسعر: ${i.price} ريال`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-[#333] font-sans dir-rtl text-right" dir="rtl">
      
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#C26D85] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#FDE0E7]" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="bg-[#C26D85] text-white text-xs md:text-sm py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#FDE0E7]" />
        <span>توصيل سريع لجميع مناطق المملكة العربية السعودية | الدفع عند الاستلام</span>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F5E6E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex md:hidden items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-[#C26D85] hover:bg-[#FDF4F5] focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            <div className="flex-1 md:flex-none text-center md:text-right cursor-pointer" onClick={() => { setActiveTab('home'); setSelectedProductId(null); setOrderSuccess(null); }}>
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C26D85] via-[#D4AF37] to-[#FDE0E7] p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1">
                    <ShoppingBag className="w-6 h-6 text-[#C26D85]" />
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-xl md:text-2xl text-[#C26D85] tracking-wider leading-none">S.A LUMÉA</span>
                  <span className="text-[10px] text-[#D4AF37] tracking-widest font-semibold uppercase mt-0.5">BEAUTY & CARE</span>
                  <span className="text-[10px] text-[#888] font-serif italic mt-0.5">جمالك .. اهتمامنا ♡</span>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <button 
                onClick={() => { setActiveTab('home'); setCurrentCategory('الكل'); setSelectedProductId(null); setOrderSuccess(null); }}
                className={`hover:text-[#C26D85] transition-colors ${activeTab === 'home' && currentCategory === 'الكل' && selectedProductId === null ? 'text-[#C26D85] font-bold border-b-2 border-[#C26D85] pb-1' : 'text-gray-700'}`}
              >
                الرئيسية
              </button>
              <button 
                onClick={() => { setActiveTab('home'); setCurrentCategory('العناية بالبشرة'); setSelectedProductId(null); setOrderSuccess(null); }}
                className={`hover:text-[#C26D85] transition-colors ${currentCategory === 'العناية بالبشرة' && selectedProductId === null ? 'text-[#C26D85] font-bold border-b-2 border-[#C26D85] pb-1' : 'text-gray-700'}`}
              >
                العناية بالبشرة
              </button>
              <button 
                onClick={() => { setActiveTab('home'); setCurrentCategory('العناية بالجسم'); setSelectedProductId(null); setOrderSuccess(null); }}
                className={`hover:text-[#C26D85] transition-colors ${currentCategory === 'العناية بالجسم' && selectedProductId === null ? 'text-[#C26D85] font-bold border-b-2 border-[#C26D85] pb-1' : 'text-gray-700'}`}
              >
                العناية بالجسم
              </button>
              <button 
                onClick={() => { setActiveTab('home'); setCurrentCategory('العناية بالشعر'); setSelectedProductId(null); setOrderSuccess(null); }}
                className={`hover:text-[#C26D85] transition-colors ${currentCategory === 'العناية بالشعر' && selectedProductId === null ? 'text-[#C26D85] font-bold border-b-2 border-[#C26D85] pb-1' : 'text-gray-700'}`}
              >
                العناية بالشعر
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#FDF4F5] text-[#C26D85] hover:bg-[#F9E5E8] transition-colors"
                aria-label="عربة التسوق"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('admin'); setOrderSuccess(null); }}
                className="p-2 text-gray-500 hover:text-[#C26D85] transition-colors text-xs flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>لوحة الإدارة</span>
              </button>
            </div>

          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#F5E6E8] px-4 pt-2 pb-4 space-y-2">
            <button 
              onClick={() => { setActiveTab('home'); setCurrentCategory('الكل'); setSelectedProductId(null); setIsMenuOpen(false); setOrderSuccess(null); }}
              className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-[#FDF4F5] hover:text-[#C26D85]"
            >
              الرئيسية (جميع المنتجات)
            </button>
            <button 
              onClick={() => { setActiveTab('home'); setCurrentCategory('العناية بالبشرة'); setSelectedProductId(null); setIsMenuOpen(false); setOrderSuccess(null); }}
              className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-[#FDF4F5] hover:text-[#C26D85]"
            >
              العناية بالبشرة
            </button>
            <button 
              onClick={() => { setActiveTab('home'); setCurrentCategory('العناية بالجسم'); setSelectedProductId(null); setIsMenuOpen(false); setOrderSuccess(null); }}
              className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-[#FDF4F5] hover:text-[#C26D85]"
            >
              العناية بالجسم
            </button>
            <button 
              onClick={() => { setActiveTab('home'); setCurrentCategory('العناية بالشعر'); setSelectedProductId(null); setIsMenuOpen(false); setOrderSuccess(null); }}
              className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-[#FDF4F5] hover:text-[#C26D85]"
            >
              العناية بالشعر
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">

        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FDF4F5] via-[#FFF0F3] to-[#F9E5E8] p-6 md:p-14 border border-[#F5E6E8] shadow-sm">
              <div className="max-w-2xl space-y-4">
                <span className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs font-semibold text-[#C26D85] border border-[#F5E6E8]">
                  متجر التجميل والجمال الأول ♡
                </span>
                <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                  اكتشفي سر <span className="text-[#C26D85]">الجمال الفاخر</span> والعناية المتكاملة
                </h1>
                <p className="text-gray-650 text-sm md:text-lg leading-relaxed">
                  تشكيلة ممتازة من منتجات العناية بالبشرة، الشعر والجسم المختارة بعناية للسوق السعودي. توصيل سريع ودفع عند الاستلام.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setCurrentCategory('الكل')}
                    className="px-6 py-3 bg-[#C26D85] text-white font-medium rounded-xl hover:bg-[#b05c73] transition-all shadow-md shadow-[#C26D85]/20 text-sm"
                  >
                    تسوقي الآن
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {currentCategory === 'الكل' ? 'جميع المنتجات المتوفرة' : currentCategory}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">عرض {filteredProducts.length} منتجاً عالي الجودة</p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400"/>
                  <input 
                    type="text"
                    placeholder="ابحثي عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pr-9 pl-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                  />
                </div>

                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto">
                  {['الكل', 'العناية بالبشرة', 'العناية بالجسم', 'العناية بالشعر'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCurrentCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${currentCategory === cat ? 'bg-[#C26D85] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3"/>
                <h3 className="text-lg font-bold text-gray-800">لا توجد منتجات مطابقة للبحث</h3>
                <p className="text-sm text-gray-500 mt-1">جربي البحث بكلمات أخرى أو تغيير التصنيف.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setCurrentCategory('الكل'); }}
                  className="mt-4 px-4 py-2 bg-[#C26D85] text-white text-xs font-medium rounded-lg hover:bg-[#b05c73]"
                >
                  عرض كافة المنتجات
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#F5E6E8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    <div 
                      className="relative aspect-square bg-[#FFF9FA] overflow-hidden cursor-pointer"
                      onClick={() => openProductDetails(product.id)}
                    >
                      <img 
                        src={product.images?.[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full font-bold">نفدت الكمية</span>
                        </div>
                      )}
                      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#C26D85] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#F5E6E8]">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 
                          onClick={() => openProductDetails(product.id)}
                          className="font-bold text-gray-900 text-xs md:text-sm line-clamp-2 hover:text-[#C26D85] cursor-pointer transition-colors leading-snug"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">{product.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-sm md:text-base font-extrabold text-[#C26D85]">{product.price}</span>
                          <span className="text-[10px] text-gray-500 mr-1 font-medium">ريال سعودي</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => buyNow(product)}
                            disabled={!product.inStock}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${product.inStock ? 'bg-[#D4AF37] text-white hover:bg-[#c29e2f]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                          >
                            اشتري الآن
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className={`p-1.5 rounded-xl transition-all ${product.inStock ? 'bg-[#FDF4F5] text-[#C26D85] hover:bg-[#C26D85] hover:text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            title="إضافة للسلة"
                          >
                            <ShoppingCart className="w-4 h-4"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'product' && selectedProduct && (
          <div className="space-y-6">
            <button
              onClick={() => { setActiveTab('home'); setSelectedProductId(null); }}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#C26D85] font-medium"
            >
              <ArrowRight className="w-4 h-4"/>
              <span>العودة إلى المنتجات</span>
            </button>

            <div className="bg-white rounded-3xl border border-[#F5E6E8] p-4 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#FFF9FA] border border-[#F5E6E8]">
                  <img 
                    src={selectedProduct.images?.[activeImageIndex]} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedProduct.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImageIndex === index ? 'border-[#C26D85]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#FDF4F5] text-[#C26D85] text-xs font-bold rounded-full mb-3">
                    {selectedProduct.category}
                  </span>
                  <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                    {selectedProduct.name}
                  </h1>
                  
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-2xl md:text-3xl font-black text-[#C26D85]">{selectedProduct.price}</span>
                    <span className="text-sm font-bold text-gray-500">ريال سعودي</span>
                    <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-bold mr-auto">شامل الضريبة • متوفر للتوصيل</span>
                  </div>

                  <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-6 space-y-4">
                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div className="bg-[#FFF9FA] p-4 rounded-2xl border border-[#F5E6E8]">
                        <h4 className="font-bold text-xs text-[#C26D85] mb-2">مميزات المنتج:</h4>
                        <ul className="space-y-1.5 text-xs text-gray-700">
                          {selectedProduct.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="block font-bold text-gray-900 mb-0.5">المواصفات:</span>
                        <span>{selectedProduct.specs}</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="block font-bold text-gray-900 mb-0.5">محتويات العبوة:</span>
                        <span>{selectedProduct.contents}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600">
                      <span className="block font-bold text-gray-900 mb-0.5">طريقة الاستخدام:</span>
                      <span>{selectedProduct.usage}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => buyNow(selectedProduct)}
                    disabled={!selectedProduct.inStock}
                    className={`flex-1 py-3.5 font-bold rounded-2xl shadow-md transition-all text-sm flex items-center justify-center gap-2 ${selectedProduct.inStock ? 'bg-[#D4AF37] hover:bg-[#c29e2f] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    <span>{selectedProduct.inStock ? 'اطلبي الآن (الدفع عند الاستلام)' : 'المنتج نفد من المخزون'}</span>
                  </button>
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    disabled={!selectedProduct.inStock}
                    className={`px-5 py-3.5 font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2 border ${selectedProduct.inStock ? 'bg-[#FDF4F5] hover:bg-[#C26D85] hover:text-white text-[#C26D85] border-[#F5E6E8]' : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'}`}
                  >
                    <ShoppingCart className="w-5 h-5"/>
                    <span className="hidden sm:inline">أضف للسلة</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-gray-500">
                  <div className="p-2 bg-gray-50 rounded-xl flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-[#C26D85]"/>
                    <span>توصيل لجميع مناطق السعودية</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-xl flex flex-col items-center gap-1">
                    <Shield className="w-4 h-4 text-[#C26D85]"/>
                    <span>منتجات أصلية مضمونة</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-xl flex flex-col items-center gap-1">
                    <DollarSign className="w-4 h-4 text-[#C26D85]"/>
                    <span>الدفع عند الاستلام</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checkout' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">إتمام الطلب</h1>
              <p className="text-sm text-gray-500">الرجاء إدخال بيانات التوصيل بدقة لضمان سرعة وصول طلبك في المملكة العربية السعودية</p>
            </div>

            {checkoutError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0"/>
                <span>{checkoutError}</span>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="bg-white rounded-3xl border border-[#F5E6E8] p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#C26D85]"/>
                  <span>المعلومات الشخصية</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">الاسم الكامل *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: سارة أحمد"
                      value={checkoutData.fullName}
                      onChange={e => setCheckoutData({...checkoutData, fullName: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">رقم الهاتف (واتساب) *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="05xxxxxxxx"
                      value={checkoutData.phone}
                      onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">رقم هاتف إضافي (اختياري)</label>
                    <input 
                      type="tel" 
                      placeholder="رقم بديل للتأكيد"
                      value={checkoutData.extraPhone}
                      onChange={e => setCheckoutData({...checkoutData, extraPhone: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C26D85]"/>
                  <span>عنوان التوصيل في السعودية</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">المنطقة *</label>
                    <select 
                      value={checkoutData.region}
                      onChange={e => setCheckoutData({...checkoutData, region: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    >
                      {REGIONS_SA.map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">المدينة *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: الرياض، جدة، الدمام..."
                      value={checkoutData.city}
                      onChange={e => setCheckoutData({...checkoutData, city: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">الحي *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="اسم الحي"
                      value={checkoutData.district}
                      onChange={e => setCheckoutData({...checkoutData, district: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">الشارع *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="اسم الشارع"
                      value={checkoutData.street}
                      onChange={e => setCheckoutData({...checkoutData, street: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">رقم المبنى / الشقة *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="رقم المبنى"
                      value={checkoutData.buildingNo}
                      onChange={e => setCheckoutData({...checkoutData, buildingNo: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">العنوان الوطني (إن وجد)</label>
                    <input 
                      type="text" 
                      placeholder="4 أرقام أو الرمز البريدي"
                      value={checkoutData.nationalAddress}
                      onChange={e => setCheckoutData({...checkoutData, nationalAddress: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#FFF9FA] p-4 rounded-2xl border border-[#F5E6E8] space-y-2">
                <h4 className="font-bold text-xs text-[#C26D85]">ملخص الطلب:</h4>
                <div className="space-y-1 text-xs text-gray-600 max-h-32 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} (×{item.quantity})</span>
                      <span className="font-bold">{item.price * item.quantity} ريال</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#F5E6E8] flex justify-between font-extrabold text-sm text-gray-900">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-[#C26D85]">{cartTotal} ريال سعودي</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#C26D85] shrink-0"/>
                <div className="text-xs text-gray-600">
                  <span className="font-bold text-gray-900 block">طريقة الدفع: الدفع عند الاستلام (COD)</span>
                  <span>لن يتم دفع أي مبلغ مالى الآن حتى تستلم طلبك بنفسك وتتأكد منه.</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all"
                >
                  العودة للتسوق
                </button>
                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="flex-1 py-3 bg-[#C26D85] hover:bg-[#b05c73] text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>تأكيد وإرسال الطلب الآن</span>
                  <ArrowRight className="w-4 h-4 rotate-180"/>
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#F5E6E8] p-8 shadow-sm">
                <div className="text-center space-y-2 mb-6">
                  <div className="w-12 h-12 bg-[#FDF4F5] rounded-full flex items-center justify-center mx-auto text-[#C26D85]">
                    <Lock className="w-6 h-6"/>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">تسجيل دخول لوحة الإدارة</h2>
                  <p className="text-xs text-gray-500">أدخل كلمة المرور الخاصة بلوحة التحكم</p>
                </div>

                {adminError && (
                  <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4"/>
                    <span>{adminError}</span>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">كلمة المرور</label>
                    <input 
                      type="password"
                      required
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C26D85]"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#C26D85] hover:bg-[#b05c73] text-white font-bold rounded-xl text-sm shadow-md transition-all"
                  >
                    دخول اللوحة
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#F5E6E8] shadow-sm">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">لوحة تحكم المتجر (سحابية)</h2>
                    <p className="text-xs text-gray-500 mt-0.5">المنتجات والطلبات متزامنة سحابياً ولحظياً عبر Supabase</p>
                  </div>
                  <button 
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4"/>
                    <span>تسجيل الخروج</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-[#F5E6E8] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#C26D85]"/>
                        <span>إدارة المنتجات والمخزون</span>
                      </h3>
                      <span className="text-xs bg-[#FDF4F5] text-[#C26D85] px-2.5 py-1 rounded-full font-bold">{products.length} منتج</span>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                      {products.map(p => (
                        <div key={p.id} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <img src={p.images?.[0]} alt="" className="w-10 h-10 rounded-xl object-cover" />
                            <div>
                              <span className="font-bold text-gray-900 block line-clamp-1">{p.name}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <input 
                                  type="number" 
                                  value={p.price}
                                  onChange={e => updateProductPrice(p.id, e.target.value)}
                                  className="w-16 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-[#C26D85]"
                                />
                                <span className="text-gray-500">ريال</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateProductStock(p.id, !p.inStock)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${p.inStock ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                            >
                              {p.inStock ? 'متوفر' : 'نفد'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-[#F5E6E8] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#C26D85]"/>
                        <span>الطلبات الواردة (سحابية)</span>
                      </h3>
                      <span className="text-xs bg-[#D4AF37] text-white px-2.5 py-1 rounded-full font-bold">{orders.length} طلب</span>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                      {orders.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 text-xs">لا توجد طلبات واردة حتى الآن</div>
                      ) : (
                        orders.map(order => (
                          <div key={order.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#C26D85]">{order.id}</span>
                              <span className="text-gray-400">{order.date}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-gray-600">
                              <div><strong className="text-gray-900">الاسم:</strong> {order.customer.fullName}</div>
                              <div><strong className="text-gray-900">الهاتف:</strong> {order.customer.phone}</div>
                              <div><strong className="text-gray-900">المدينة:</strong> {order.customer.city} ({order.customer.region})</div>
                              <div><strong className="text-gray-900">الإجمالي:</strong> <span className="text-[#C26D85] font-bold">{order.total} ريال</span></div>
                            </div>

                            <div className="p-2 bg-white rounded-xl border border-gray-200 space-y-1">
                              <span className="font-bold text-gray-900 block">المنتجات المطلوبة:</span>
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-gray-600 text-[11px]">
                                  <span>{item.name} (×{item.quantity})</span>
                                  <span>{item.price * item.quantity} ريال</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500 font-bold">الحالة:</span>
                                <select 
                                  value={order.status}
                                  onChange={e => updateOrderStatus(order.id, e.target.value)}
                                  className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
                                >
                                  <option value="جديد">جديد</option>
                                  <option value="قيد التأكيد">قيد التأكيد</option>
                                  <option value="جاري الشحن">جاري الشحن</option>
                                  <option value="تم التوصيل">تم التوصيل</option>
                                  <option value="ملغي">ملغي</option>
                                </select>
                              </div>

                              <button
                                onClick={() => copyTaagerData(order)}
                                className="px-3 py-1.5 bg-[#C26D85] text-white rounded-xl text-xs font-bold hover:bg-[#b05c73] transition-all flex items-center gap-1.5"
                              >
                                {copiedId === order.id ? <Check className="w-3.5 h-3.5"/> : <Copy className="w-3.5 h-3.5"/>}
                                <span>{copiedId === order.id ? 'تم النسخ!' : 'نسخ بيانات تاجر'}</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {orderSuccess && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 text-center shadow-2xl animate-scaleIn">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10"/>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-gray-900">تم استلام طلبك بنجاح! ♡</h2>
                <p className="text-sm text-gray-500">شكراً لتسوقك معنا في S.A LUMÉA. سيتم التواصل معك قريباً لتأكيد طلبك وتوصيله.</p>
              </div>

              <div className="bg-[#FFF9FA] p-4 rounded-2xl border border-[#F5E6E8] text-right space-y-2 text-xs text-gray-700">
                <div className="flex justify-between font-bold text-sm text-[#C26D85]">
                  <span>رقم الطلب:</span>
                  <span>{orderSuccess.id}</span>
                </div>
                <div className="border-t border-[#F5E6E8] pt-2 space-y-1">
                  <div><strong>الاسم:</strong> {orderSuccess.customer.fullName}</div>
                  <div><strong>الهاتف:</strong> {orderSuccess.customer.phone}</div>
                  <div><strong>العنوان:</strong> {orderSuccess.customer.region} - {orderSuccess.customer.city} - {orderSuccess.customer.district}</div>
                  <div><strong>المبلغ الإجمالي:</strong> <span className="font-bold text-[#C26D85]">{orderSuccess.total} ريال سعودي (الدفع عند الاستلام)</span></div>
                </div>
              </div>

              <button
                onClick={() => { setOrderSuccess(null); setActiveTab('home'); }}
                className="w-full py-3.5 bg-[#C26D85] hover:bg-[#b05c73] text-white font-bold rounded-xl text-sm shadow-md transition-all"
              >
                العودة إلى المتجر
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

          <div className="absolute inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="p-4 bg-[#FFF9FA] border-b border-[#F5E6E8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#C26D85]"/>
                  <h3 className="font-bold text-gray-900">عربة التسوق ({cartCount})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto"/>
                    <p className="text-sm font-bold text-gray-700">عربة التسوق فارغة حالياً</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 bg-[#C26D85] text-white text-xs font-bold rounded-xl hover:bg-[#b05c73]"
                    >
                      تصفحي المنتجات الآن
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 items-center">
                      <img src={item.images?.[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1">{item.name}</h4>
                        <div className="text-[#C26D85] font-extrabold text-xs mt-0.5">{item.price} ريال</div>

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 hover:bg-gray-100 text-gray-600 text-xs"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-bold text-gray-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-gray-100 text-gray-600 text-xs"
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 &&, (
                <div className="p-4 bg-[#FFF9FA] border-t border-[#F5E6E8] space-y-4">
                  <div className="flex justify-between items-center text-sm font-extrabold text-gray-900">
                    <span>المجموع الكلي:</span>
                    <span className="text-[#C26D85] text-lg">{cartTotal} ريال سعودي</span>
                  </div>

                  <button
                    onClick={() => { setIsCartOpen(false); setActiveTab('checkout'); }}
                    className="w-full py-3.5 bg-[#C26D85] hover:bg-[#b05c73] text-white font-bold rounded-2xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <span>إتمام الطلب (الدفع عند الاستلام)</span>
                    <ArrowRight className="w-4 h-4 rotate-180"/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-[#F5E6E8] py-8 mt-16 text-center text-xs text-gray-500 space-y-3">
        <div className="flex items-center justify-center gap-3">
          <span className="font-bold text-base text-[#C26D85]">S.A LUMÉA</span>
          <span>•</span>
          <span>جميع الحقوق محفوظة © 2026</span>
        </div>
        <p>متجر متخصص في منتجات العناية بالبشرة، الجسم والشعر الفاخرة في المملكة العربية السعودية ♡</p>
      </footer>
    </div>
  );
}