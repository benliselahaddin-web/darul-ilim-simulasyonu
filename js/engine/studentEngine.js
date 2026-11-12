// Talebe Üretimi, Mülakat Motoru ve Aylık Rapor Sistemi
// Yalnızca İstanbul Üniversiteleri, Çoğunluğu İlahiyat Fakültesi
// Başlangıçta GANO Yok (12. Sınıf Mezunları), YKS Sıralaması ve Alanı (SÖZ, EA, SAY)
// Çeşitlendirilmiş Mülakat Cevapları, Belirgin İnsani Zaaflar / Kusurlar, Zengin Müspet-Menfi Aylık Raporlar

const HIGH_SCHOOLS = [
  // İstanbul Seçkin İmam Hatipleri
  { name: "Kartal Anadolu İmam Hatip Lisesi", city: "İstanbul", tier: "prestij", baseScore: 92 },
  { name: "Kadıköy Ahmet Sani Gezici Kız AİHL", city: "İstanbul", tier: "prestij", baseScore: 91 },
  { name: "Beyoğlu Anadolu İmam Hatip Lisesi", city: "İstanbul", tier: "prestij", baseScore: 89 },
  { name: "M. Emin Saraç Anadolu İHL", city: "İstanbul", tier: "seckin", baseScore: 86 },
  { name: "Üsküdar Hakkı Demir AİHL", city: "İstanbul", tier: "seckin", baseScore: 85 },
  { name: "Tenzile Erdoğan Kız Anadolu İHL", city: "İstanbul", tier: "prestij", baseScore: 89 },
  // Anadolu ve Fen Liseleri (İstanbul Dışından Mezun Olup İstanbul Üniversitelerini Kazananlar)
  { name: "Konya Meram Fen Lisesi", city: "Konya", tier: "fen", baseScore: 94 },
  { name: "Trabzon Mahmut Celaleddin Ökten AİHL", city: "Trabzon", tier: "anadolu_ihl", baseScore: 84 },
  { name: "Kayseri Fen Lisesi", city: "Kayseri", tier: "fen", baseScore: 93 },
  { name: "Erzurum Anadolu İmam Hatip Lisesi", city: "Erzurum", tier: "anadolu_ihl", baseScore: 82 },
  { name: "Diyarbakır TOBB Fen Lisesi", city: "Diyarbakır", tier: "fen", baseScore: 91 },
  { name: "Bursa İpekçilik Anadolu İHL", city: "Bursa", tier: "anadolu_ihl", baseScore: 87 },
  { name: "Ankara Tevfik İleri Anadolu İHL", city: "Ankara", tier: "prestij", baseScore: 88 },
  { name: "Kabataş Erkek Lisesi", city: "İstanbul", tier: "anadolu_duz", baseScore: 95 },
  { name: "İstanbul Erkek Lisesi", city: "İstanbul", tier: "anadolu_duz", baseScore: 96 },
  { name: "Malatya Fethi Gemuhluoğlu Fen Lisesi", city: "Malatya", tier: "fen", baseScore: 88 }
];

// SADECE İSTANBUL'DAKİ ÜNİVERSİTELER VE FAKÜLTELER (Kurumumuz İstanbul'da Olduğu İçin)
// Ezici Çoğunluğu İlahiyat / İslami İlimler (%75+)
const UNIVERSITIES_FACULTIES = [
  // İlahiyat ve İslami İlimler (İstanbul İçi)
  { uni: "Marmara Üniversitesi", faculty: "İlahiyat Fakültesi (Arapça Hazırlıklı)", isTheology: true, defaultArea: "SÖZ" },
  { uni: "Marmara Üniversitesi", faculty: "İlahiyat Fakültesi (Türkçe / İkinci Öğretim)", isTheology: true, defaultArea: "SÖZ" },
  { uni: "İstanbul Üniversitesi", faculty: "İlahiyat Fakültesi (Klasik Usul / Arapça)", isTheology: true, defaultArea: "SÖZ" },
  { uni: "İstanbul Üniversitesi", faculty: "İlahiyat Fakültesi (İngilizce & Arapça)", isTheology: true, defaultArea: "SÖZ" },
  { uni: "29 Mayıs Üniversitesi", faculty: "Uluslararası İlahiyat Fakültesi (Üstün Başarı)", isTheology: true, defaultArea: "SÖZ" },
  { uni: "İbn Haldun Üniversitesi", faculty: "İslami İlimler Fakültesi (%100 Arapça)", isTheology: true, defaultArea: "SÖZ" },
  { uni: "Sabahattin Zaim Üniversitesi", faculty: "İslami İlimler Fakültesi", isTheology: true, defaultArea: "SÖZ" },
  { uni: "İstanbul Medeniyet Üniversitesi", faculty: "İslami İlimler Fakültesi", isTheology: true, defaultArea: "SÖZ" },

  // Sosyal ve Beşeri Bilimler (İstanbul İçi Seçkin Bölümler)
  { uni: "Boğaziçi Üniversitesi", faculty: "Sosyoloji Bölümü", isTheology: false, defaultArea: "EA" },
  { uni: "Boğaziçi Üniversitesi", faculty: "Felsefe Bölümü", isTheology: false, defaultArea: "EA" },
  { uni: "Boğaziçi Üniversitesi", faculty: "Tarih Bölümü", isTheology: false, defaultArea: "SÖZ" },
  { uni: "İstanbul Üniversitesi", faculty: "Hukuk Fakültesi", isTheology: false, defaultArea: "EA" },
  { uni: "Marmara Üniversitesi", faculty: "Hukuk Fakültesi", isTheology: false, defaultArea: "EA" },
  { uni: "İbn Haldun Üniversitesi", faculty: "Siyaset Bilimi ve Uluslararası İlişkiler", isTheology: false, defaultArea: "EA" },
  { uni: "İstanbul Üniversitesi", faculty: "Felsefe Bölümü", isTheology: false, defaultArea: "EA" }
];

const FAMILY_BACKGROUNDS = [
  { job: "Köy İmamı / Din Görevlisi", income: "Dar Gelirli", spiritualCulture: "Çok Yüksek" },
  { job: "Küçük Esnaf (Bakkal/Manav/Kırtasiye)", income: "Dar-Orta", spiritualCulture: "Yüksek" },
  { job: "İlkokul / Lise Öğretmeni", income: "Orta", spiritualCulture: "Yüksek" },
  { job: "Çiftçi / Ziraatçı", income: "Dar Gelirli", spiritualCulture: "Yüksek" },
  { job: "Kamu Memuru", income: "Orta", spiritualCulture: "Orta" },
  { job: "İnşaat / Fabrika İşçisi", income: "Dar Gelirli", spiritualCulture: "Yüksek" },
  { job: "Tüccar / Şirket Müdürü", income: "Yüksek", spiritualCulture: "Orta" },
  { job: "Avukat / Hukukçu", income: "Yüksek", spiritualCulture: "Yüksek" },
  { job: "Vaiz / Müftülük Personeli", income: "Orta", spiritualCulture: "Çok Yüksek" },
  { job: "Emekli Astsubay / Memur", income: "Orta", spiritualCulture: "Orta" }
];

// ERKEK İSİMLERİ (35 Adet)
const FIRST_NAMES_MALE = [
  "Abdullah", "Ahmet", "Ali", "Bekir", "Bilal", "Burhan", "Cihat", "Ebubekir", "Enes",
  "Faruk", "Fatih", "Hamza", "Hasan", "Hüseyin", "İbrahim", "İsmail", "Mahmut", "Mehmet",
  "Muhammed", "Mustafa", "Mücahit", "Necmettin", "Ömer", "Salih", "Selim", "Süleyman",
  "Taha", "Tarık", "Ubeydullah", "Yasin", "Yunus", "Yusuf", "Zeyd", "Zübeyr", "Halil"
];

// KIZ İSİMLERİ (35 Adet)
const FIRST_NAMES_FEMALE = [
  "Ayşe", "Fatma", "Zeynep", "Meryem", "Hatice", "Hümeyra", "Betül", "Rümeysa", "Esra",
  "Sümeyye", "Şule", "Şeyma", "Büşra", "Nurbanu", "Sare", "Meliha", "Zehra", "Hilal",
  "Nisa", "Beyza", "Kübra", "Havva", "Rabia", "Sena", "Asude", "Elif", "Reyhan",
  "Şüheda", "Tuğba", "Vildan", "Zülal", "Merve", "Gülbahar", "Hafsa", "Esma"
];

const LAST_NAMES = [
  "Acar", "Aksoy", "Albayrak", "Arslan", "Aydın", "Bozkurt", "Can", "Çelik", "Demir",
  "Doğan", "Erdoğan", "Güneş", "Kahraman", "Kara", "Kaya", "Kılıç", "Koç", "Korkmaz",
  "Özdemir", "Öztürk", "Polat", "Şahin", "Şimşek", "Taş", "Tekin", "Turan", "Yıldırım",
  "Yıldız", "Yılmaz", "Yüksel"
];

// TALEBENİN GERÇEKÇİ ZAAFLARI / KUSURLARI (Mülakatta ve Raporlarda Görünür)
const CANDIDATE_WEAKNESSES = [
  {
    title: "Sabah Namazı ve Erken Ders Zaafı (Gece Kuşu)",
    desc: "Gece geç saatlere kadar okuma veya bilgisayar başında kalıp sabah teheccüd ve sabah namazı müzakerelerine kalkmakta zorlanıyor.",
    admitStatement: "Hocam maalesef biyolojik ritmim geceye dönük; sabaha karşı zihnim açılıyor, sabah namazı sonrası ilk derslerde uykusuzluk çekebiliyorum."
  },
  {
    title: "Tenkide Karşı Alınganlık & Fevrilik",
    desc: "Müzakere halkalarında hocanın veya akranlarının ibare tahliline getirdiği eleştirileri şahsileştirip çabuk parlayabiliyor.",
    admitStatement: "Münazara anında biraz hırçınlaşabiliyorum; tezimin çürütülmesine tahammül etmekte henüz nefis terbiyesine ihtiyacım var."
  },
  {
    title: "Metin Ezberinde Sabırsızlık (Felsefe Heveskârı)",
    desc: "Arapça sarf/nahiv ve fıkıh ibarelerini satır satır ezberlemeyi sıkıcı buluyor; doğrudan büyük felsefi teorilere atlamak istiyor.",
    admitStatement: "Klasik metin ezberi beni bazen daraltıyor hocam; doğrudan çağdaş epistemoloji ve felsefi tartışmalara girmeyi arzuluyorum."
  },
  {
    title: "Sosyal Medya & Ekran Bağımlılığı",
    desc: "Akıllı telefonunu etüt masasında yanından ayıramıyor; bildirimler sebebiyle mütalaa derinliğini kaybediyor.",
    admitStatement: "Açık konuşmak gerekirse gün içinde telefon ve sosyal medya vaktimi çok çalıyor; kurumun disipliniyle bu zaafımı yenmek istiyorum."
  },
  {
    title: "Mükemmeliyetçi Yılgınlık & Panik Atak",
    desc: "Bir derste ufak bir başarısızlık yaşayınca toptan salma, derse girmeme ve içine kapanma meyli taşıyor.",
    admitStatement: "Bir metni tam kavrayamadığımda derin bir yetersizlik hissine kapılıp günlerce etütten kopabiliyorum."
  },
  {
    title: "Cemaat / Meşrep Taassubu",
    desc: "Farklı düşünce ve fıkhi meşreplere karşı ön yargılı; kendisi gibi düşünmeyen talebelerle samimiyet kurmakta mesafeli.",
    admitStatement: "Yetiştiğim muhit dışındaki fikir ekollerine bazen soğuk bakabiliyorum; bu kurumda ufkumu genişletmeyi umuyorum."
  },
  {
    title: "Düzensizlik & Oda Tertibi Zafiyeti",
    desc: "Kişisel dolabı, kitapları ve yatağı sürekli dağınık; yurt oda arkadaşlarıyla temizlik sırası yüzünden sürtüşme yaşayabilir.",
    admitStatement: "Kitaplarım ve şahsi eşyalarım biraz dağınıktır; oda arkadaşlarıma yük olmamak için kendimi terbiye etmem gerek."
  },
  {
    title: "Fakülte Vizesi Kaygısıyla Kurumu Savsaklama",
    desc: "Üniversite vizeleri yaklaştığında hemen panikleyip kurumun usul derslerini ve müzakere halkasını ikinci plana atma eğilimi var.",
    admitStatement: "Fakültede yüksek ortalama yapma hırsım yüksek; sınav haftalarında kurum derslerini aksatmaktan endişeleniyorum."
  },
  {
    title: "İçe Kapanıklık & Ketum Tabiat",
    desc: "Derdini, manevi sıkıntılarını veya hastalıklarını idareye ve arkadaşlarına açmaktan kaçınıp tek başına içine gömülüyor.",
    admitStatement: "Sıkıntımı kimseye belli etmem hocam; yardım istemekte çok ketumumdur, bu da bazen beni bunalıma itiyor."
  },
  {
    title: "Çabuk Sıkılma & İstikrar Problemi",
    desc: "Yeni bir kitaba büyük coşkuyla başlıyor ancak kitabın ortalarına doğru şevki kırılıp başka bir konuya atlamak istiyor.",
    admitStatement: "Başlangıçtaki heyecanımı dersin sonuna kadar korumakta zorlanıyorum; sebat konusunda desteğe muhtacım."
  }
];

// ÇEŞİTLENDİRİLMİŞ 6 MÜLAKAT SORUSU VE SEÇENEKLERİ (Talebenin Mizaç ve Zaafına Göre Değişir)
const INTERVIEW_QUESTIONS = [
  {
    id: "q_medrese",
    q: "Geleneksel medrese usulü metin ezberi ve mütalaasına haftada en az 15 saat ayırmaya hazır mısın?",
    options: [
      { text: "Bütün gayretimle hazırım; uykumdan ve sosyal hayatımdan feragat edip müzakere halkasını aksatmam.", intent: "medrese", score: 95 },
      { text: "Derslerimi dengeli götürmek isterim; etütleri hafta sonuna yayarak eksiksiz yerine getiririm.", intent: "dengeli", score: 85 },
      { text: "Zorlayıcı bir tempo ama kütüphanede sabahlayarak yetişmeye gayret edeceğim.", intent: "gayretli", score: 80 },
      { text: "Ağır bir yük; fakülte vizelerim çakıştığında kurum ödevlerini esnetmenizi rica edebilirim.", intent: "gevsek", score: 50 }
    ]
  },
  {
    id: "q_sosyal_bilim",
    q: "İslami ilimler ile çağdaş sosyal bilimler (sosyoloji, felsefe, hukuk) arasındaki ilişkiyi nasıl telakki ediyorsun?",
    options: [
      { text: "Kadim fıkıh, tefsir ve kelam mirasımızın anahtar kavramlarıyla Batı sosyal teorisini eleştirel tahkike tabi tutmalıyız.", intent: "vizyoner", score: 98 },
      { text: "Sosyal bilimleri çok iyi kavramalıyız; ancak klasik metinlerin usul otoritesini asla sarsmamalıyız.", intent: "usulcu", score: 90 },
      { text: "Ben daha ziyade klasik metinlerle meşgul olmak istiyorum; sosyal teoriler kafamızı bulandırabilir.", intent: "salt_klasik", score: 65 },
      { text: "Sosyal bilimleri akademik CV'mde prestijli bir basamak olarak kullanmak niyetindeyim.", intent: "pragmatist", score: 55 }
    ]
  },
  {
    id: "q_hedef",
    q: "10 yıl sonra kendini nerede ve hangi hizmet alanında hayal ediyorsun?",
    options: [
      { text: "Üniversitede veya bağımsız ilim meclisinde talebe yetiştiren, kadim ile moderni cem eden bir ilim insanı.", intent: "akademi", score: 96 },
      { text: "Kürsülerde, mekteplerde veya cemiyet vakıflarında şuurlu nesiller yetiştiren ihlaslı bir muallim/mürebbî.", intent: "irfan", score: 88 },
      { text: "Uluslararası platformlarda İslam düşüncesini temsil eden yabancı dille eserler veren bir araştırmacı.", intent: "kuresel", score: 92 },
      { text: "Bürokraside, yargıda veya özel sektörde iyi mevkilerde nüfuz sahibi bir yönetici.", intent: "dunyevi", score: 55 }
    ]
  },
  {
    id: "q_yurt_hukuku",
    q: "Yurt hayatında oda arkadaşlarınla yaşanabilecek anlaşmazlıklarda ve temizlik nöbetlerinde tavrın ne olur?",
    options: [
      { text: "Kardeşlik ve ihlas hukukunu önceleyip hakkımdan feragat ederim; mesele büyürse yurt müdürüne danışırım.", intent: "ahlak", score: 95 },
      { text: "Oda kurallarını açıkça müzakere eder, adil bir iş bölümüyle medeni bir uzlaşı ararım.", intent: "makul", score: 85 },
      { text: "Haksızlığa gelemem; odamdaki aksaklıkları anında idareye taşır veya odamı değiştirtirim.", intent: "bireysel", score: 60 }
    ]
  },
  {
    id: "q_catisma",
    q: "Fakülte vizelerin ile kurumun klasik sınavları aynı haftaya denk gelirse önceliğin ne olur?",
    options: [
      { text: "Her ikisini de bihakkın başarmak için fedakarlık yapar uykusuz kalırım; kurum ilmi asıl sermayemdir.", intent: "fedakar", score: 95 },
      { text: "Önce fakülte notlarımı emniyete alır, ardından kurum hocalarımızla telafi mütalaası yaparım.", intent: "pragmatik", score: 78 },
      { text: "Kurum yönetiminin bizlere anlayış gösterip klasik sınavı bir hafta ötelemesini talep ederim.", intent: "talepkar", score: 55 }
    ]
  },
  {
    id: "q_zaaf",
    q: "İlim yolunda seni en çok zorlayan veya terbiye edilmeye muhtaç gördüğün şahsi kusurun nedir?",
    options: [
      // Bu soru talebenin weakness alanına dinamik bağlanır
      { text: "Özel zaaf beyanı...", intent: "samimi_zaaf", score: 90 }
    ]
  }
];

// Tek bir aday üretir (12. Sınıf Mezunu, Başta GANO Yok, Sadece İstanbul Üniversiteleri)
function generateStudentCandidate(id, year, gender = "male", admissionCriteria = {}) {
  const isFemale = gender === "female";
  const firstName = isFemale 
    ? FIRST_NAMES_FEMALE[Math.floor(Math.random() * FIRST_NAMES_FEMALE.length)]
    : FIRST_NAMES_MALE[Math.floor(Math.random() * FIRST_NAMES_MALE.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const school = HIGH_SCHOOLS[Math.floor(Math.random() * HIGH_SCHOOLS.length)];

  // Üniversite: Kesinlikle İstanbul'daki üniversitelerden seçilir (%78 İlahiyat Fakültesi)
  let uni;
  if (Math.random() < 0.78) {
    const theologyUnis = UNIVERSITIES_FACULTIES.filter(u => u.isTheology);
    uni = theologyUnis[Math.floor(Math.random() * theologyUnis.length)];
  } else {
    uni = UNIVERSITIES_FACULTIES[Math.floor(Math.random() * UNIVERSITIES_FACULTIES.length)];
  }

  const family = FAMILY_BACKGROUNDS[Math.floor(Math.random() * FAMILY_BACKGROUNDS.length)];

  // YKS Alanı: SÖZ, EA veya SAY
  let yksArea = uni.defaultArea;
  if (!yksArea) {
    yksArea = uni.isTheology ? "SÖZ" : "EA";
  }
  if (school.tier === "fen" && Math.random() < 0.25) {
    yksArea = "SAY"; // Fen lisesi mezunu sayısal alandan girmiş olabilir
  }

  // YKS Sıralaması (Puan gösterilmeyecek, sadece Alan ve Sıralama)
  // İlahiyatta ilk 200 ile 8.500 arası; Sosyal bilimlerde ilk 80 ile 3.500 arası
  let yksRank;
  if (uni.isTheology) {
    yksRank = Math.floor(Math.random() * 8500) + 120;
  } else {
    yksRank = Math.floor(Math.random() * 3500) + 75;
  }

  // Talebenin Şahsi Kusuru / Zaafı (Her adayda farklı!)
  const weaknessObj = CANDIDATE_WEAKNESSES[Math.floor(Math.random() * CANDIDATE_WEAKNESSES.length)];

  // Zeka ve İlim İstidadı (Mülakatta ölçülecek potansiyel: 62 - 98)
  const rawTalent = Math.floor(Math.random() * 37) + 62;

  // Başlangıç Akademik Yetkinliği (ÇOK DÜŞÜK BAŞLAR: 12 - 20)
  const initialAcademicCompetence = Math.floor(Math.random() * 9) + 12;

  // Başlangıç Memnuniyeti (%48 - 72 arası mutedil başlar)
  const initialSatisfaction = Math.floor(Math.random() * 25) + 48;

  // Başlangıç Stres Seviyesi (20 - 38 arası)
  const initialStress = Math.floor(Math.random() * 19) + 20;

  // Ahlaki Durum
  const moralRand = Math.random();
  const initialMoralStatus = moralRand > 0.35 ? "iyi" : (moralRand > 0.08 ? "mükemmel" : "mütereddit");

  // İlgi Alanı
  const fields = ["fıkıh", "hadisTefsir", "kelamFelsefe", "sosyalBilimler", "arapcaDil", "sanatKultur"];
  const primaryField = fields[Math.floor(Math.random() * fields.length)];

  // 6 Mülakat Cevabı Simülasyonu
  const interviewAnswers = INTERVIEW_QUESTIONS.map(qObj => {
    if (qObj.id === "q_zaaf") {
      return {
        question: qObj.q,
        answer: `"${weaknessObj.admitStatement}"`,
        intent: "samimi_zaaf",
        score: Math.min(95, rawTalent + 4)
      };
    }

    const rand = Math.random();
    let optIndex = 0;
    if (rawTalent > 85) {
      optIndex = rand > 0.2 ? 0 : 1;
    } else if (rawTalent > 72) {
      optIndex = rand > 0.5 ? 0 : (rand > 0.2 ? 1 : 2);
    } else {
      optIndex = rand > 0.4 ? 1 : (rand > 0.2 ? 2 : 3);
    }
    optIndex = Math.min(optIndex, qObj.options.length - 1);

    return {
      question: qObj.q,
      answer: qObj.options[optIndex].text,
      intent: qObj.options[optIndex].intent,
      score: qObj.options[optIndex].score
    };
  });

  const interviewAvgScore = Math.round(
    interviewAnswers.reduce((acc, curr) => acc + curr.score, 0) / interviewAnswers.length
  );

  // Kurum İçi Başlangıç Notu (48 - 82)
  const internalScore = Math.floor(Math.random() * 35) + 48;

  return {
    id: `talebe_${year}_${id}`,
    fullName: `${firstName} ${lastName}`,
    gender: gender,
    emotionalSensitivity: isFemale ? 1.35 : 1.0, // Kız versiyonunda duygu ve stres daha çabuk etkilenir
    city: school.city,
    highSchool: school.name,
    highSchoolTier: school.tier,
    university: uni.uni,
    faculty: uni.faculty,
    isTheology: uni.isTheology,
    familyJob: family.job,
    familyIncome: family.income,
    spiritualCulture: family.spiritualCulture,
    yksArea: yksArea, // "SÖZ", "EA", "SAY"
    yksRank: yksRank, // Örn: 412
    weakness: weaknessObj.title,
    weaknessDesc: weaknessObj.desc,
    weaknessStatement: weaknessObj.admitStatement,
    academicCompetence: initialAcademicCompetence, // Senede 10-20 puan artacak
    satisfaction: initialSatisfaction,
    stressLevel: initialStress,
    moralStatus: initialMoralStatus,
    warningCount: 0,
    monthlyReports: [],
    talent: rawTalent, // İlim İstidadı (Mülakat sıralamasında kilit)
    primaryField: primaryField,
    interviewAnswers: interviewAnswers,
    interviewScore: interviewAvgScore,
    gano: null, // BAŞTA GANO YOKTUR! 12. Sınıf mezunu. 1. dönem sonu atanır!
    internalScore: internalScore,
    enrollmentYear: year,
    currentClassYear: 0, // 0: Hazırlık, 1: 1. Sınıf...
    track: "standart",
    observations: [],
    status: "candidate",
    career: null,
    marriageInvited: false
  };
}

// 75 Adaylık bir başvuru havuzu oluşturur (Yalnızca İstanbul üniversiteleri)
// Beyoğlu Anadolu İmam Hatip Lisesi'nden her sene minimum 2 öğrenci kabulü için havuza öncelikli eklenir
function generateAnnualCandidates(year, gender = "male", criteria = {}) {
  const poolSize = 75;
  const candidates = [];
  for (let i = 1; i <= poolSize; i++) {
    const cand = generateStudentCandidate(i, year, gender, criteria);

    // Beyoğlu Anadolu İHL mezunları (her sene minimum 2-4 aday en yüksek istidatla havuza gelir)
    if (i <= 5 && gender === "male") {
      cand.highSchool = "Beyoğlu Anadolu İmam Hatip Lisesi";
      cand.highSchoolTier = "prestij";
      cand.city = "İstanbul";
      cand.isBeyogluCrew = true;
      cand.talent = Math.floor(Math.random() * 12) + 84; // 84-95 arası yüksek istidat
      cand.interviewScore = Math.floor(Math.random() * 10) + 86;
      cand.yksRank = Math.floor(Math.random() * 600) + 90; // Yüksek derece
      cand.faculty = cand.isTheology ? "İlahiyat Fakültesi (Arapça Hazırlıklı)" : cand.faculty;
    }

    candidates.push(cand);
  }
  return candidates;
}

// Öğrenci için aylık zengin müspet ve menfi detaylı rapor üretir
function generateMonthlyStudentReport(student, monthName, year) {
  // Müspet (Pozitif) Gözlemler Havuzu
  const POSITIVE_OBSERVATIONS = [
    "Sarf ve nahiv müzakerelerinde metin ibaresini kusursuz çözüp akranlarına yardımcı oldu.",
    "Sabah namazı mukabelesinde ve erken etütte daima en önde; mescit ciddiyeti örnek teşkil ediyor.",
    "Fıkıh usulü tartışmasında klasik kaynaklara bihakkın atıf yaparak hocanın takdirini kazandı.",
    "Kütüphanede araştırma disiplini fevkalade; geceleri tezhip ve Osmanlıca risale istinsahı yapıyor.",
    "Yurt nöbetinde oda arkadaşlarına çay demleyip muhabbet ve kardeşlik havasını pekiştirdi.",
    "Sosyal bilimler seminerinde Batı modernitesi tenkidinde ufuk açıcı bir tebliğ sundu."
  ];

  // Menfi (Negatif / Zaaf) Gözlemler Havuzu
  const NEGATIVE_OBSERVATIONS = [
    "Gece etüdünde cep telefonu ve sosyal medyayla lüzumsuz meşguliyeti mütalaa verimini düşürdü.",
    "Hafta başı erken sabah dersine uykusuz ve konsantrasyonsuz geldi; uyarılması tavsiye edilir.",
    "Müzakere halkasında arkadaşının tenkidine karşı fevri ve tahammülsüz bir üslup takındı.",
    "Yurt odasında şahsi kitap ve eşyalarını dağınık bırakması sebebiyle oda arkadaşlarıyla sürtüşme yaşadı.",
    "Üniversite vize kaygısı sebebiyle kurum klasik ezberlerini savsaklama eğilimi gösterdi.",
    "Bir dersi kaçırınca yılgınlığa kapılıp etüt salonundan erken ayrıldı; rehberlik görüşmesi gerekiyor."
  ];

  // Rastgele müspet ve menfi seçimi (Ahlak ve strese göre ağırlıklanır)
  let posIndex = Math.floor(Math.random() * POSITIVE_OBSERVATIONS.length);
  let negIndex = Math.floor(Math.random() * NEGATIVE_OBSERVATIONS.length);

  // Öğrencinin şahsi zaafı raporda ara sıra zikredilir
  let negativeNote = NEGATIVE_OBSERVATIONS[negIndex];
  if (Math.random() < 0.45 && student.weakness) {
    negativeNote = `${student.weakness}: ${student.weaknessDesc}`;
  }

  let positiveNote = POSITIVE_OBSERVATIONS[posIndex];

  let academicStatus = "Muntazam & Gayretli";
  if (student.internalScore < 55 || (student.gano !== null && student.gano < 2.50)) {
    academicStatus = "Zayıf / İhtar Tehlikesi";
  } else if (student.internalScore < 70) {
    academicStatus = "Orta / Takip Altında";
  }

  const attendance = Math.floor(Math.random() * 8) + 93; // %93 - %100

  const report = {
    month: monthName,
    year: year,
    academicStatus: academicStatus,
    internalScore: student.internalScore,
    gano: student.gano !== null ? student.gano : "Henüz Belirlenmedi (12. Sınıf Mezunu)",
    moralStatus: student.moralStatus,
    attendance: attendance,
    stress: student.stressLevel,
    positiveNote: positiveNote,
    negativeNote: negativeNote,
    notes: `[Müspet]: ${positiveNote} — [Menfi / Dikkat]: ${negativeNote}`
  };

  student.monthlyReports.unshift(report);
  if (student.monthlyReports.length > 12) student.monthlyReports.pop();

  return report;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    HIGH_SCHOOLS,
    UNIVERSITIES_FACULTIES,
    FAMILY_BACKGROUNDS,
    FIRST_NAMES_MALE,
    FIRST_NAMES_FEMALE,
    LAST_NAMES,
    CANDIDATE_WEAKNESSES,
    INTERVIEW_QUESTIONS,
    generateStudentCandidate,
    generateAnnualCandidates,
    generateMonthlyStudentReport
  };
}