// Kurum Binaları ve Talebe Yurtları Pazarı Verisi
// Günümüz Türkiye'si ve İstanbul emlak, doğalgaz, elektrik, su ve aidat gerçeklerine göre dengelenmiştir.
// 5 Seviye Kurum Binası (Seviye arttıkça kira/ücret 2 katına çıkar; seviye 3, 4 ve 5 tahsis edilebilir)
// 3 Seviye Yurt Binası (Seviye arttıkça kapasite ve ücret 2 katına çıkar)

const INSTITUTION_BUILDINGS_DATA = [
  // ==================== 1. SEVİYE: KİRALIK ESKİ BİNA (DEPREM RİSKİ OLAN) ====================
  // Sadece para ile kiralanabilir. Düzenli kira ve yüksek bakım/fatura gideri vardır.
  {
    id: "bldg_1_beyoglu",
    level: 1,
    name: "1. Seviye Kiralık Eski Bina — Beyoğlu",
    location: "Beyoğlu / Tarlabaşı",
    type: "kiralik",
    canBeAllocated: false,
    monthlyRent: 48000,
    maintenanceCost: 28000,
    reputationBonus: 0,
    earthquakeRisk: "Yüksek Risk (1975 Öncesi Yığma Bina)",
    capacityDescription: "4 Küçük Derslik, 1 İdare Odası, Dar Mescit",
    description: "Beyoğlu arka sokaklarında eski kiralık apartman. Doğalgaz faturası yüksek, tavan akması ve rutubet problemleri mevcuttur."
  },
  {
    id: "bldg_1_kucukcekmece",
    level: 1,
    name: "1. Seviye Kiralık Eski Bina — Küçükçekmece",
    location: "Küçükçekmece / Cennet",
    type: "kiralik",
    canBeAllocated: false,
    monthlyRent: 44000,
    maintenanceCost: 25000,
    reputationBonus: 0,
    earthquakeRisk: "Yüksek Risk (Eski Betonarme)",
    capacityDescription: "3 Geniş Derslik, Mescit ve Küçük Etüt Odası",
    description: "Küçükçekmece'de eski bir iş hanı katı. Ulaşımı metrobüse yakın fakat binanın korozyon riski ve yüksek aidat gideri bulunuyor."
  },
  {
    id: "bldg_1_pendik",
    level: 1,
    name: "1. Seviye Kiralık Eski Bina — Pendik",
    location: "Pendik / Doğu Mahallesi",
    type: "kiralik",
    canBeAllocated: false,
    monthlyRent: 40000,
    maintenanceCost: 24000,
    reputationBonus: 0,
    earthquakeRisk: "Orta-Yüksek Risk",
    capacityDescription: "4 Derslik, Yemekhane Köşesi ve Müdür Odası",
    description: "Anadolu yakasında eski bina. Şehir merkezine ve büyük kütüphanelere mesafesi uzaktır; kışın ısınma maliyeti yüksektir."
  },
  {
    id: "bldg_1_fatih",
    level: 1,
    name: "1. Seviye Kiralık Eski Bina — Fatih",
    location: "Fatih / Çarşamba",
    type: "kiralik",
    canBeAllocated: false,
    monthlyRent: 55000, // Fatih bir tık daha pahalı
    maintenanceCost: 32000,
    reputationBonus: 1,
    earthquakeRisk: "Yüksek Risk (Tarihi Ahşap/Kâgir)",
    capacityDescription: "4 Klasik Rahleli Derslik, Ahşap Mescit",
    description: "Fatih ilim muhitinde, medreselere komşu kiralık eski konak. Muhit itibarı iyidir ancak Fatih piyasası ve eski tesisat sebebiyle masraflıdır."
  },

  // ==================== 2. SEVİYE: KİRALIK YENİ BİNA (ÜCRET 2 KATINA ÇIKAR) ====================
  // Deprem yönetmeliğine uygun, modern asansörlü, yangın merdivenli kiralık binalar.
  {
    id: "bldg_2_umraniye",
    level: 2,
    name: "2. Seviye Kiralık Yeni Bina — Ümraniye",
    location: "Ümraniye / Çakmak",
    type: "kiralik",
    canBeAllocated: false,
    monthlyRent: 85000,
    maintenanceCost: 48000,
    reputationBonus: 2,
    earthquakeRisk: "Depreme Dayanıklı (2020 Yapımı)",
    capacityDescription: "6 Akıllı Derslik, Fiber İnternet, Konferans Salonu",
    description: "Yeni inşa edilmiş plaza altı eğitim kompleksi. İzolasyonu ve derslik aydınlatması ferahtır, aidat ve bakım faturası yüksektir."
  },
  {
    id: "bldg_2_beykoz",
    level: 2,
    name: "2. Seviye Kiralık Yeni Bina — Beykoz",
    location: "Beykoz / Kavacık",
    type: "kiralik",
    canBeAllocated: false,
    monthlyRent: 90000,
    maintenanceCost: 52000,
    reputationBonus: 2,
    earthquakeRisk: "Depreme Dayanıklı (Sağlam Zemin)",
    capacityDescription: "6 Derslik, Yeşillikler İçinde Teras, Müzakere Odaları",
    description: "Boğaz sırtlarında temiz havalı, modern mimarili yeni bina. Zihni dinlendiren sakin bir tefekkür iklimi sağlar."
  },
  {
    id: "bldg_2_sariyer",
    level: 2,
    name: "2. Seviye Kiralık Yeni Bina — Sarıyer",
    location: "Sarıyer / Maden",
    type: "kiralik",
    canBeAllocated: false,
    monthlyRent: 95000,
    maintenanceCost: 55000,
    reputationBonus: 2,
    earthquakeRisk: "Depreme Dayanıklı",
    capacityDescription: "7 Derslik, Kütüphane Katı ve Seminer Salonu",
    description: "Sarıyer'de prestijli eğitim binası. Modern yangın ve güvenlik ruhsatları eksiksizdir."
  },
  {
    id: "bldg_2_uskudar",
    level: 2,
    name: "2. Seviye Kiralık Yeni Bina — Üsküdar",
    location: "Üsküdar / Bağlarbaşı",
    type: "kiralik",
    canBeAllocated: false,
    monthlyRent: 110000, // Üsküdar bir tık daha pahalı
    maintenanceCost: 62000,
    reputationBonus: 3,
    earthquakeRisk: "Depreme Dayanıklı (Yeni Mimari)",
    capacityDescription: "8 Derslik, İSAM Kütüphanesine Yürüme Mesafesi",
    description: "Üsküdar İlahiyat ve İSAM muhitinde sıfır bina. İlim talebeleri için İstanbul'un en kıymetli lokasyonlarından biridir."
  },

  // ==================== 3. SEVİYE: TAHSİS EDİLMİŞ BİNA ====================
  // Hem parayla kiralanabilir hem de siyasi bağlantılı hayırseverlerden tahsis istenebilir (0 ₺ kira!).
  {
    id: "bldg_3_sisli",
    level: 3,
    name: "3. Seviye Tahsis Edilmiş / Kiralık Bina — Şişli",
    location: "Şişli / Okmeydanı",
    type: "tahsis_veya_kiralik",
    canBeAllocated: true,
    monthlyRent: 160000,
    rentWhenAllocated: 0,
    maintenanceCost: 75000,
    reputationBonus: 4,
    minDonorPoliticalPower: 3,
    capacityDescription: "10 Büyük Derslik, Geniş Kütüphane, İdare Katı",
    description: "Kamu veya vakıf mülkiyetindeki müstakil bina. Siyasi gücü olan bir hayırseverimiz devreye girerse kuruma tahsis edilir (Kira: 0 ₺) veya parayla tutulabilir."
  },
  {
    id: "bldg_3_kartal",
    level: 3,
    name: "3. Seviye Tahsis Edilmiş / Kiralık Bina — Kartal",
    location: "Kartal / Soğanlık",
    type: "tahsis_veya_kiralik",
    canBeAllocated: true,
    monthlyRent: 150000,
    rentWhenAllocated: 0,
    maintenanceCost: 70000,
    reputationBonus: 4,
    minDonorPoliticalPower: 3,
    capacityDescription: "10 Derslik, Açık Avlu, Mescit ve Etüt Salonu",
    description: "Milli Emlak portföyünde yer alan eğitim kompleksi. Belediye meclisi bağlantısıyla kurumumuza bedelsiz tahsis edilebilir."
  },
  {
    id: "bldg_3_maltepe",
    level: 3,
    name: "3. Seviye Tahsis Edilmiş / Kiralık Bina — Maltepe",
    location: "Maltepe / Zümrütevler",
    type: "tahsis_veya_kiralik",
    canBeAllocated: true,
    monthlyRent: 155000,
    rentWhenAllocated: 0,
    maintenanceCost: 72000,
    reputationBonus: 4,
    minDonorPoliticalPower: 3,
    capacityDescription: "10 Derslik, 150 Kişilik Amfi, Yemekhane",
    description: "Geniş bahçeli kamu tesisi. Vakıf protokolü ile bedelsiz tahsis çıkartılabilir."
  },
  {
    id: "bldg_3_fatih",
    level: 3,
    name: "3. Seviye Tahsis Edilmiş / Kiralık Bina — Fatih",
    location: "Fatih / Vefa",
    type: "tahsis_veya_kiralik",
    canBeAllocated: true,
    monthlyRent: 180000, // Fatih biraz daha pahalı
    rentWhenAllocated: 0,
    maintenanceCost: 88000,
    reputationBonus: 5,
    minDonorPoliticalPower: 3,
    capacityDescription: "12 Klasik Derslik, Tarihi Kütüphane Salonu, İdare Binası",
    description: "Vefa semtinde köklü vakıf binası. Fatih merkezde olması sebebiyle ücreti biraz daha pahalıdır; tahsis ettirilmesi büyük bir mali zafer olur."
  },

  // ==================== 4. SEVİYE: MODERN TEÇHİZATLI KÜLLİYE (FETÖ MÜSADERESİ) ====================
  // Ücret 2 katına çıkar ya da Bakanlık/Vakıflar lobi tahsisiyle 0 ₺ kira!
  {
    id: "bldg_4_basaksehir",
    level: 4,
    name: "4. Seviye FETÖ Müsaderesi Modern Külliye — Başakşehir",
    location: "Başakşehir / 1. Kısım",
    type: "tahsis_veya_kiralik",
    canBeAllocated: true,
    monthlyRent: 290000,
    rentWhenAllocated: 0,
    maintenanceCost: 125000,
    reputationBonus: 7,
    minDonorPoliticalPower: 4,
    capacityDescription: "16 Akıllı Amfi, Yarı Olimpik Havuz, 300 Kişilik Konferans Salonu",
    description: "15 Temmuz sonrası devlete geçen lüks kolej kampüsü. Laboratuvarlar, fiber hatlar ve konferans salonlarıyla donatılmıştır."
  },
  {
    id: "bldg_4_silivri",
    level: 4,
    name: "4. Seviye FETÖ Müsaderesi Modern Külliye — Silivri",
    location: "Silivri / Selimpaşa",
    type: "tahsis_veya_kiralik",
    canBeAllocated: true,
    monthlyRent: 260000,
    rentWhenAllocated: 0,
    maintenanceCost: 115000,
    reputationBonus: 6,
    minDonorPoliticalPower: 4,
    capacityDescription: "Geniş Kampüs, 15 Derslik, Doğa İçinde İhtisas Halkaları",
    description: "Marmara denizi kıyısında geniş arazili kampüs. Şehir gürültüsünden uzak, yoğun kamplar için ideal bir eğitim üssüdür."
  },
  {
    id: "bldg_4_bagcilar",
    level: 4,
    name: "4. Seviye FETÖ Müsaderesi Modern Külliye — Bağcılar",
    location: "Bağcılar / Mahmutbey",
    type: "tahsis_veya_kiralik",
    canBeAllocated: true,
    monthlyRent: 280000,
    rentWhenAllocated: 0,
    maintenanceCost: 120000,
    reputationBonus: 7,
    minDonorPoliticalPower: 4,
    capacityDescription: "18 Derslik, Stüdyo Kayıt Odası, Kapalı Spor Salonu",
    description: "Medyateknoloji ve lüks dersliklerle tefriş edilmiş devasa bina. Ulaşım akslarının tam merkezindedir."
  },
  {
    id: "bldg_4_besiktas",
    level: 4,
    name: "4. Seviye FETÖ Müsaderesi Modern Külliye — Beşiktaş",
    location: "Beşiktaş / Yıldız",
    type: "tahsis_veya_kiralik",
    canBeAllocated: true,
    monthlyRent: 350000, // Beşiktaş bi tık daha pahalı
    rentWhenAllocated: 0,
    maintenanceCost: 145000,
    reputationBonus: 8,
    minDonorPoliticalPower: 4,
    capacityDescription: "Boğaz Manzaralı 16 Derslik, Tarihi Koruluk İçinde",
    description: "Beşiktaş sırtlarında, Boğaziçi'ne nazır devasa kolej binası. Lokasyonu sebebiyle piyasa değeri en yüksek müsadereli binadır."
  },

  // ==================== 5. SEVİYE: TARİHİ MEDRESE VE KÜLLİYESİ ====================
  // YALNIZCA TAHSİS İLE ALINABİLİR! Parayla kiralanamaz/satılamaz.
  {
    id: "bldg_5_fatih_sahni_seman",
    level: 5,
    name: "5. Seviye Tarihi Külliye: Fatih Sahn-ı Semân Medresesi",
    location: "Fatih Camii Külliyesi",
    type: "yalnizca_tahsis",
    canBeAllocated: true,
    monthlyRent: 0,
    rentWhenAllocated: 0,
    maintenanceCost: 165000,
    reputationBonus: 12,
    minReputationRequired: 55,
    minDonorPoliticalPower: 5,
    capacityDescription: "Fatih Sultan Mehmed'in 8 Akvâm Medresesi, Kubbeli Hücreler, Şadırvanlı Avlu",
    description: "Osmanlı yüksek ilimlerinin zirvesi. Fatih Sultan Mehmed Han'ın bizzat vakfettiği Sahn-ı Semân hücresi kurumumuza tahsis edilirse ilim dünyasında itibarımız zirveye ulaşır. YALNIZCA TAHSİS İLE ALINABİLİR."
  },
  {
    id: "bldg_5_suleymaniye",
    level: 5,
    name: "5. Seviye Tarihi Külliye: Süleymaniye Medresesi",
    location: "Süleymaniye Külliyesi (Mimar Sinan)",
    type: "yalnizca_tahsis",
    canBeAllocated: true,
    monthlyRent: 0,
    rentWhenAllocated: 0,
    maintenanceCost: 185000,
    reputationBonus: 14,
    minReputationRequired: 65,
    minDonorPoliticalPower: 5,
    capacityDescription: "Dârü'l-Hadis, Evvel ve Sânî Medreseleri, Haliç Manzaralı Kubbeler",
    description: "Kanuni Sultan Süleyman Han'ın ulemaya armağanı. Dârü'l-Hadis kubbesinde hadis meclisleri kurmak ümmet çapında bir vakar kaynağıdır. YALNIZCA TAHSİS İLE ALINABİLİR."
  },
  {
    id: "bldg_5_valide_i_atik",
    level: 5,
    name: "5. Seviye Tarihi Külliye: Valide-i Atik Medresesi",
    location: "Üsküdar / Atik Valide",
    type: "yalnizca_tahsis",
    canBeAllocated: true,
    monthlyRent: 0,
    rentWhenAllocated: 0,
    maintenanceCost: 150000,
    reputationBonus: 10,
    minReputationRequired: 50,
    minDonorPoliticalPower: 5,
    capacityDescription: "Mimar Sinan'ın Son Başyapıtı, Çinili Avlu, Kütüphane Hücresi",
    description: "Nurbanu Sultan'ın Üsküdar'da inşa ettirdiği şaheser. İSM'in de ilham aldığı manevi atmosferde talebe yetiştirme imkânı. YALNIZCA TAHSİS İLE ALINABİLİR."
  },
  {
    id: "bldg_5_sultanahmet",
    level: 5,
    name: "5. Seviye Tarihi Külliye: Sultanahmet Medresesi",
    location: "Sultanahmet Meydanı",
    type: "yalnizca_tahsis",
    canBeAllocated: true,
    monthlyRent: 0,
    rentWhenAllocated: 0,
    maintenanceCost: 200000,
    reputationBonus: 15,
    minReputationRequired: 70,
    minDonorPoliticalPower: 5,
    capacityDescription: "24 Kubbeli İhtisas Odası, Mermer Sütunlu Dershane",
    description: "I. Ahmed Han'ın inşa ettirdiği Ayasofya'ya nazır medrese. Yabancı ilim insanlarının ziyaret ettiği küresel bir merkez. YALNIZCA TAHSİS İLE ALINABİLİR."
  },
  {
    id: "bldg_5_ayasofya",
    level: 5,
    name: "5. Seviye Tarihi Külliye: Ayasofya Medresesi (Zirve Mekan)",
    location: "Ayasofya-i Kebir Camii Yanı",
    type: "yalnizca_tahsis",
    canBeAllocated: true,
    monthlyRent: 0,
    rentWhenAllocated: 0,
    maintenanceCost: 240000,
    reputationBonus: 20, // En yüksek itibar bonusu
    minReputationRequired: 85,
    minDonorPoliticalPower: 5,
    capacityDescription: "Fatih'in Ayasofya İlim Ocağı, Mermer Avlu, Altın Varaklı Başöğretmen Makamı",
    description: "İstanbul'un fethinden sonra açılan ilk ve en kutlu medrese. Ayasofya Külliyesi'nin kalbinde yer alır. Burayı tahsis almak cumhuriyet tarihinin en prestijli vakıf hadisesidir. EN PAHALISI VE EN İTİBARLISIDIR."
  }
];

// ==================== 3 SEVİYE TALEBE YURDU BİNASI ====================
// Seviye arttıkça yatak kapasitesi ve bakım/kira ücreti katlanır.
const DORM_BUILDINGS_DATA = [
  {
    id: "dorm_lvl_1",
    level: 1,
    name: "1. Seviye Mütevazı Talebe Yurdu",
    capacity: 35, // 35 Yatak
    monthlyCost: 58000, // Aylık bakım, doğalgaz, elektrik, su ve kira
    reputationBonus: 0,
    comfortScore: 60,
    description: "Koğuş tipi 4-6 kişilik odalar. Mütevazı çalışma masaları ve ortak banyolar. Başlangıç dönemi için ekonomik yurt modeli."
  },
  {
    id: "dorm_lvl_2",
    level: 2,
    name: "2. Seviye Modern Donanımlı Talebe Yurdu",
    capacity: 70, // 2 katı kapasite (70 Yatak)
    monthlyCost: 125000, // 2 katı ücret
    reputationBonus: 3,
    comfortScore: 80,
    description: "3 kişilik modern bazalı odalar, her odada müstakil çalışma masaları, gece mütalaa salonu ve 24 saat sıcak su konforu."
  },
  {
    id: "dorm_lvl_3",
    level: 3,
    name: "3. Seviye İhtisas Külliyesi Lüks Yurdu",
    capacity: 150, // 2 katından fazla kapasite (150 Yatak)
    monthlyCost: 250000, // Lüks külliye yurt gideri
    reputationBonus: 6,
    comfortScore: 95,
    description: "1-2 kişilik ses yalıtımlı ihtisas odaları, ortopedik yataklar, klima, 24 saat çay semaveri ve dinlenme salonu. Otel konforunda medrese yaşamı."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { INSTITUTION_BUILDINGS_DATA, DORM_BUILDINGS_DATA };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { INSTITUTION_BUILDINGS_DATA, DORM_BUILDINGS_DATA };
}