// Çekirdek Simülasyon Motoru (v2.6)
// Ağustos başlangıcı, Oryantasyon Haftası, 15-40 Talebe Kontenjanı, 5000-3000-1000 ₺ Burslar
// Min 400.000 ₺ Sabit Düzenli Esnaf Geliri, 500k-1.5M ₺ Bağış Yemeği, 5 Seviye Bina & 3 Seviye Yurt Pazarı
// Dönem İçi Hoca Eşleştirme Kilidi, Talebe Temsilcisi Hoca Raporu, Ayda 1 Hayırsever & Ayda 4 Yurt Etkinliği Kısıtı

const MONTH_NAMES = [
  "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", "Ocak",
  "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz"
];

// 100 ADET GERÇEKÇİ TALEBE TALEBİ VE ŞİKÂYETİ HAVUZU (Öğrenci-İdare Buluşması)
const CURRICULUM_AND_STUDENT_DEMANDS_100 = [
  { id: "d_1", topic: "Semaver Çayı ve Gece İkramı", text: "İhtisas kütüphanesine gece mütalaaları için kömürlü semaver ve bisküvi ikramı tahsisi talep ediliyor.", cost: 3000, effect: "Memnuniyet +6, Gece etüt verimi artar." },
  { id: "d_2", topic: "Yemekhanede Sıcak Tatlı Çıkartılması", text: "Haftada en az iki gün sütlaç veya baklava gibi ev tatlıları verilmesi isteniyor.", cost: 9000, effect: "Memnuniyet +8, Yemekhane tatmini yükselir." },
  { id: "d_3", topic: "Arapça Konuşma Kulübü (Muhadese)", text: "Amman veya Şam menşeli misafir bir muallimle haftada 3 gün pratik Arapça sohbet halkası açılması talep ediliyor.", cost: 12000, effect: "Dil kabiliyeti +10, Memnuniyet +7." },
  { id: "d_4", topic: "Vize Haftası Kurum Ezber Esnekliği", text: "Fakülte sınav haftalarında kurumun klasik metin ezberlerinin ve sabah etütlerinin hafifletilmesi isteniyor.", cost: 0, effect: "Stres -15 azalır, lakin disiplin hafif esner." },
  { id: "d_5", topic: "Yurt Çamaşırhanesine Ek Kurutma Makinesi", text: "Kış aylarında çamaşırların kurumaması sebebiyle endüstriyel kurutma makinesi talep ediliyor.", cost: 16000, effect: "Yurt konforu +10, Şikayetler biter." },
  { id: "d_6", topic: "Nadir Yazma Eserler Kütüphanesi Dijital Erişimi", text: "Süleymaniye ve İSAM kütüphanelerindeki taranmış yazmalara kurum fiber ağından doğrudan erişim aboneliği isteniyor.", cost: 7500, effect: "Araştırma yetkinliği +12, İtibar +1." },
  { id: "d_7", topic: "Hafta Sonu Doğa Yürüyüşü & Piknik", text: "Belgrad Ormanı veya Riva sahilinde hocalarla birlikte doğa yürüyüşü ve hasbihal talep ediliyor.", cost: 4500, effect: "Stres -14, Kardeşlik bağı kuvvetlenir." },
  { id: "d_8", topic: "Sabah Namazı Sonrası Sıcak Çorba", text: "Sabah mukabelesinden sonra ders başlamadan önce mercimek veya yayla çorbası ikramı isteniyor.", cost: 6000, effect: "Sabah dersine katılım +8, Memnuniyet +6." },
  { id: "d_9", topic: "Fıkıh Metinleri İçin Lügat Hibesi", text: "Her talebeye el-Mu'cemu'l-Vasît ve Lisânü'l-Arab cep sözlüğü temin edilmesi talep ediliyor.", cost: 11000, effect: "Arapça liyakati +8, Kütüphane bağı artar." },
  { id: "d_10", topic: "Odalara Masif Ahşap Kitaplık İlavesi", text: "Yurt odalarındaki kitapların yerlere taşması sebebiyle duvar raflarının çoğaltılması talep ediliyor.", cost: 8000, effect: "Oda tertibi düzelir, Memnuniyet +5." },
  { id: "d_11", topic: "Klasik Hat ve Tezhip Meşki", text: "Haftada bir gün icazetli bir hattat ile sülüs-nesih meşki halkası başlatılması talep ediliyor.", cost: 9000, effect: "Sanat yetkinliği +14, Ruh dinginliği artar." },
  { id: "d_12", topic: "Yurt Odalarında Wi-Fi Sinyal Güçlendirici", text: "Yurdun arka odalarında internetin çekmemesi sebebiyle akademik makalelere ulaşılamadığı belirtiliyor.", cost: 5000, effect: "Şikayetler çözülür, Memnuniyet +5." },
  { id: "d_13", topic: "Bahar Dönemi Kitap Fuarı Harçlığı", text: "Talebelerin İstanbul Kitap Fuarı'ndan klasik kaynak temin edebilmesi için kişi başı 1.000 ₺ kitap çeki talep ediliyor.", cost: 30000, effect: "Memnuniyet +12, Kütüphane zenginleşir." },
  { id: "d_14", topic: "Mescit Ses Yalıtımı ve Halı Yıkama", text: "Mescit halılarının buharlı yıkanması ve etüt sesinin mescide sızmaması için kapı yalıtımı isteniyor.", cost: 7000, effect: "İbadet huşuu artar, Memnuniyet +5." },
  { id: "d_15", topic: "Mantık ve Münazara Müsabakası Ödülü", text: "Dönem sonu kurum içi fıkıh-mantık münazara ligi tertiplenip şampiyon takıma umre veya balkan gezisi ödülü konması talep ediliyor.", cost: 35000, effect: "İlim gayreti tavan yapar (+16 yetkinlik)." },
  { id: "d_16", topic: "Yurt Mutfak Saatlerinin Esnetilmesi", text: "Gece 24:00'e kadar su ısıtıcısı ve ekmek arası atıştırmalık için mutfağın açık tutulması isteniyor.", cost: 2500, effect: "Gece ders çalışanların stresi -8 azalır." },
  { id: "d_17", topic: "Akademik Tez Yazım Atölyesi", text: "Yüksek lisans hazırlığındaki son sınıf talebelerine LaTeX ve Zotero ile akademik makale yazım eğitimi açılması isteniyor.", cost: 8000, effect: "Akademik mezuniyet oranı fırlar (+12)." },
  { id: "d_18", topic: "Kışlık Yorgan ve Ortopedik Yastık Yenilemesi", text: "Yurttaki eskiyen elyaf yastıkların yerine boyun ağrısını önleyen ortopedik yastıklar talep ediliyor.", cost: 14000, effect: "Talebe sağlığı düzelir, Uyku verimi artar." },
  { id: "d_19", topic: "Bursa & Edirne Tarihi Medreseler Gezisi", text: "Osmanlı ulemasının izinde bir hafta sonu Bursa Muradiye ve Edirne Selimiye ilim seyahati talep ediliyor.", cost: 18000, effect: "Stres -18, Tarih şuuru ve vefa +10." },
  { id: "d_20", topic: "Spor ve Kondisyon Odası Açılması", text: "Yurdun bodrum katına masa tenisi masası ve temel barfiks/dambıl aletleri konması talep ediliyor.", cost: 12000, effect: "Talebe zindeliği +10, Stres -10." }
];

class DarulIlimGame {
  constructor() {
    this.initDefaultState();
  }

  initDefaultState() {
    this.state = {
      isInitialized: false,
      genderMode: "male", // "male" (Beyefendiler) veya "female" (Hanımefendiler)

      // Kurum Temel Bilgileri
      institutionName: "Dârü'l-Fünûn İslami ve Sosyal İlimler Tedris Merkezi",
      programDurationYears: 5, // 5 yıl (Hazırlık + 4 Sınıf)
      difficultyLevel: "zorlayici", // "zorlayici" (5.000 ₺), "orta" (3.000 ₺), "rahat" (1.000 ₺)
      baseStipend: 5000,
      currentYearStipend: 5000, // Kullanıcı yeni yıl ekranında kendisi belirler
      admissionCriteria: {
        yksPriority: true,
        eliteHighSchoolsPriority: true,
        visionAlignment: true,
        interviewEmphasis: true,
        arabicBackground: false
      },

      // Zaman ve Takvim: AĞUSTOS (Index 0) İLE BAŞLAR!
      academicYear: 1,
      currentMonthIndex: 0, // 0 = Ağustos (Mülakat & Oryantasyon), 1 = Eylül (Ders Başlangıcı)... 11 = Temmuz
      currentDay: 1,
      totalDaysPassed: 0,
      viewingMonthOffset: 0,
      calendarViewMode: "admin", // "admin" (İdare Takvimi) vs "student" (Öğrenci Tedrisat & Tatil Takvimi)

      // Kurum Metrikleri
      reputation: 35, // 35 İLE BAŞLAR
      reputationGainedThisYear: 0, // Senede min 2, ortalama 3, max 5 artar
      budget: 280000, // 280.000 ₺ Başlangıç Kasası (Dengeli ve gerçekçi modern vakıf bütçesi)
      socialCohesion: 55, // Öğrenciler Arası Uhuvvet ve Sosyallik Düzeyi (%0 - %100)

      // Planlanan Konferanslar
      scheduledConferences: [],

      // Yurt Arızaları ve Disiplin Hadiseleri Takibi
      resolvedIncidentsHistory: [],
      monthlyDormIncidentsLog: [],
      pendingDormMaintenanceProposal: null,
      activeOttomanScenario: null,
      scholarsMarket: [],

      // Rastgele Vakıf Gündemi ve Yönetim Kurulu Olay Kartları (Modern Türkiye Gerçekleri)
      activeVakifEvent: null,
      lastVakifEventOutcome: null,
      vakifEventHistory: [],

      // Kurum & Yurt Binası Pazarı Durumu
      currentBuildingId: "bldg_1_fatih", // 1. Seviye Fatih Kiralık Eski Bina
      isBuildingAllocated: false,        // Tahsis edilirse kira = 0 ₺
      allocatedByDonorId: null,
      monthlyRent: 55000,                // bldg_1_fatih güncel dengeli kirası

      currentDormId: "dorm_lvl_1",       // 1. Seviye Yurt (35 Yatak, 58.000 ₺/ay)

      // Sabit Düzenli Esnaf ve Destekçi Bağışı (Aylık 110.000 - 150.000 ₺)
      localMerchantsDonationThisMonth: 135000,
      totalMerchantDonationsReceived: 0,

      // Personel Kadrosu
      viceDirector: null, // Müdür Yardımcısı
      dormManager: null,  // Yurt Müdürü / Müdiresi
      accountant: null,   // Muhasebeci / Mali Müşavir (Bilanço Sekmesini Açar)
      cook: null,         // Aşçı
      cleaningStaff: [],  // Temizlikçiler

      // Hoca Giderleri ve Kürsü Bütçesi
      scholarBudget: {
        totalMonthlyCost: 0,
        sponsoredMonthlyAmount: 0,
        sponsoredChairsCount: 0
      },

      // Ders - Hoca Eşleştirmesi (courseId -> scholarId)
      courseAssignments: {},

      // Özelleştirilmiş Müfredat & Seminer Dağılımı (Oyun başında veya atanan seminerlerde belirlenir)
      customCurriculum: [],
      hasDoneTrackSelectionThisYear: false,

      // Kısıtlar ve Zaman Sayaçları
      lastDonationDinnerTotalMonths: -99, // 5 ayda bir bağış yemeği yapılabilir
      lastDonorActionMonth: -1,          // Hayırsever etkileşimi (özel yemek, ziyaret vb.) AYDA EN FAZLA 1 KEZ
      monthlyStudentAppointmentsRemaining: 3, // Her ay 3 talebeyle birebir hasbihal (10, 20, 30. günler)
      monthlyGroupEventsRemaining: 4,     // Yurt grup stres etkinlikleri AYDA EN FAZLA 4 KEZ

      // Altyapı Seviyeleri (1-3)
      upgrades: {
        smartBoard: 1,
        library: 1,
        officeFurnishing: 1,
        dormDining: 1
      },

      // Yurt Durumu
      dormStatus: {
        capacity: 35, // 1. Seviye yurt kapasitesi
        occupancy: 0,
        satisfaction: 65,
        monthlyMaintenanceCost: 20000,
        lastReport: "Yurdumuzda etütler muntazam sürmektedir. Gece çay semaveri talebi iletildi."
      },

      // Listeler
      students: [],
      graduates: [],
      candidatesPool: [],
      hiredScholars: [],
      donors: typeof DONORS_DATA !== "undefined" ? JSON.parse(JSON.stringify(DONORS_DATA)) : [],
      peerInstitutions: typeof PEER_INSTITUTIONS_DATA !== "undefined" ? JSON.parse(JSON.stringify(PEER_INSTITUTIONS_DATA)) : [],

      // Branş Puanları
      branchScores: {
        fıkıh: 42,
        hadisTefsir: 40,
        kelamFelsefe: 38,
        sosyalBilimler: 36,
        arapcaDil: 45,
        sanatKultur: 32
      },

      // Bildirimler ve Raporlar
      notifications: [],
      termReports: [],
      activeModalEvent: null,
      adminMeetingData: null,
      studentMeetingData: null,
      dormReportModalData: null,
      studentAppointmentModalData: null,
      pendingAnnualStipendModal: false,
      completedTenYearsReportAvailable: false,

      // Son Ayın Detaylı Bilançosu (Muhasebe Görünümü İçin)
      lastMonthlyFinances: {
        esnafIncome: 420000,
        donorIncome: 0,
        chairSponsorshipIncome: 0,
        scholarCost: 0,
        staffCost: 0,
        stipendCost: 0,
        rentCost: 42000,
        dormCost: 20000,
        netCashFlow: 358000
      }
    };
  }

  // Yıllık Kontenjan Hesabı (1. Yıl: 15, Her Yıl +5, Maks: 40)
  getAnnualQuota() {
    return Math.min(40, 15 + (this.state.academicYear - 1) * 5);
  }

  // Aktif Müfredat Derslerini Getir (Kullanıcının belirlediği özel atamalar veya varsayılan 50 ders)
  getAllCourses() {
    if (this.state.customCurriculum && Array.isArray(this.state.customCurriculum) && this.state.customCurriculum.length > 0) {
      return this.state.customCurriculum;
    }
    return typeof COURSES_DATA !== "undefined" ? COURSES_DATA : [];
  }

  // Dönem İçi Hoca Eşleştirme Kilidi Kontrolü
  // Hoca-Ders eşleştirmeleri yalnızca dönem başlarında (Ağustos/Eylül ve Ocak) yapılabilir.
  isSemesterLocked() {
    const m = this.state.currentMonthIndex;
    const d = this.state.currentDay;
    // Ağustos (Month 0): Dönem başı, tamamen açık
    if (m === 0) return false;
    // Eylül (Month 1): İlk 15 gün ders kayıt ve eşleştirme açık
    if (m === 1 && d <= 15) return false;
    // Ocak (Month 5): Bahar dönemi başlangıcı ilk 15 gün açık
    if (m === 5 && d <= 15) return false;
    // Diğer tüm zamanlarda kilitlidir
    return true;
  }

  // Kurumu Başlat
  startInstitution(config) {
    this.state.institutionName = config.name || "Dârü'l-Fünûn İslami ve Sosyal İlimler Tedris Merkezi";
    this.state.programDurationYears = config.duration || 5;
    this.state.difficultyLevel = config.difficulty || "zorlayici";
    this.state.genderMode = config.gender || "male";

    // Burs Miktarı Belirleme: zorlayıcı: 5000, orta: 3000, rahat: 1000
    if (this.state.difficultyLevel === "zorlayici") {
      this.state.baseStipend = 5000;
    } else if (this.state.difficultyLevel === "orta") {
      this.state.baseStipend = 3000;
    } else {
      this.state.baseStipend = 1000;
    }
    this.state.currentYearStipend = this.state.baseStipend;

    if (config.criteria) {
      this.state.admissionCriteria = { ...this.state.admissionCriteria, ...config.criteria };
    }

    // Oyun Başında Belirlenen Özelleştirilmiş Müfredat Dağılımı
    if (config.customCurriculum && Array.isArray(config.customCurriculum) && config.customCurriculum.length > 0) {
      this.state.customCurriculum = config.customCurriculum;
    }

    this.state.isInitialized = true;

    // Aday havuzunu üret (Yalnızca İstanbul Üniversiteleri, Başta GANO yok)
    if (typeof generateAnnualCandidates === "function") {
      this.state.candidatesPool = generateAnnualCandidates(1, this.state.genderMode, this.state.admissionCriteria);
    }

    const quota = this.getAnnualQuota();
    this.addNotification({
      title: `${this.state.genderMode === 'female' ? 'Hanımefendiler' : 'Beyefendiler'} Tedrisatı Başladı!`,
      message: `${this.state.institutionName} için ilk akademik yıl Ağustos ayında mülakatlarla açıldı. İstanbul üniversitelerini kazanan seçkin adaylar arasından bu yılın kontenjanı olan ${quota} talebeyi mülakatla kabul edebilirsiniz. 24-28 Ağustos tarihlerinde Oryantasyon Haftası icra edilecektir.`,
      type: "success",
      date: "1 Ağustos, Yıl 1"
    });

    this.saveToStorage();
  }

  // Takvim Ayı Günleri (İdare Takvimi vs Öğrenci Tedrisat & Tatil Takvimi)
  getMonthDays(offset = 0) {
    const days = [];
    let targetMonthIndex = (this.state.currentMonthIndex + offset) % 12;
    if (targetMonthIndex < 0) targetMonthIndex += 12;

    const monthName = MONTH_NAMES[targetMonthIndex];
    const isCurrentActiveMonth = (offset === 0);
    const isStudentMode = (this.state.calendarViewMode === "student");

    for (let d = 1; d <= 30; d++) {
      let event = null;

      if (!isStudentMode) {
        // ==================== İDARE TAKVİMİ ====================
        // AĞUSTOS (Month 0): Mülakatlar & Oryantasyon Haftası
        if (targetMonthIndex === 0) {
          if (d === 1) event = { title: "Aday Mülakatları Başlar", type: "interview" };
          if (d === 15) event = { title: "Mülakat Değerlendirme Komisyonu", type: "interview" };
          if (d === 16) event = { title: "Güz Dönemi Ders & Seminer Kayıtları", type: "academic" };
          if (d === 24) event = { title: "Oryantasyon: Açılış Konferansı & Mütevelli Hasbihali", type: "orientation" };
          if (d === 25) event = { title: "Oryantasyon: Kütüphane & İlim Usûlü Semineri", type: "orientation" };
          if (d === 26) event = { title: "Oryantasyon: Tarihî Yarımada & Medreseler Gezisi", type: "orientation" };
          if (d === 27) event = { title: "Oryantasyon: Ulemâ Meclisi ve Çay Sohbeti", type: "orientation" };
          if (d === 28) event = { title: "Oryantasyon: Süleymaniye Camii Cuma Buluşması", type: "orientation" };
        }
        // EYLÜL (Month 1): Güz Tedrisatı Başlar
        if (targetMonthIndex === 1) {
          if (d === 1) event = { title: "Güz Tedrisatı Başlar & Seminer Hoca Eşleştirmesi", type: "academic" };
          if (d === 10) event = { title: "Yurt Müdürü İstişaresi", type: "dorm_report" };
          if (d === 25) event = { title: "Güz Vize Sınavları Başlar", type: "exam" };
        }
        // EKİM (Month 2)
        if (targetMonthIndex === 2) {
          if (d === 15) event = { title: "Öğrenci Temsilcileri ve İdare Buluşması", type: "student_meeting" };
        }
        // KASIM (Month 3)
        if (targetMonthIndex === 3) {
          if (d === 20) event = { title: "Aylık Hayırseverler Bağış Yemeği", type: "donor_dinner" };
        }
        // ARALIK (Month 4): Güz Finalleri & Dönem Sonu İdari Toplantı
        if (targetMonthIndex === 4) {
          if (d === 20) event = { title: "Güz Finalleri & Dönem Sonu İdari Heyeti", type: "admin_meeting" };
        }
        // OCAK (Month 5): Bahar Dönemi Başlar
        if (targetMonthIndex === 5) {
          if (d === 1) event = { title: "Bahar Tedrisatı Başlar & Seminer Hoca Eşleştirmesi", type: "academic" };
          if (d === 10) event = { title: "Yurt Müdürü İstişaresi", type: "dorm_report" };
        }
        // ŞUBAT (Month 6)
        if (targetMonthIndex === 6) {
          if (d === 20) event = { title: "Bahar Vizeleri & İlmi Sempozyum", type: "conference" };
        }
        // MART (Month 7)
        if (targetMonthIndex === 7) {
          if (d === 15) event = { title: "Öğrenci Temsilcileri ve İdare Buluşması", type: "student_meeting" };
        }
        // NİSAN (Month 8)
        if (targetMonthIndex === 8) {
          if (d === 20) event = { title: "Hayırseverler Meclisi İstişare Toplantısı", type: "donor_dinner" };
        }
        // MAYIS (Month 9): Bahar Finalleri & Sene Sonu Heyeti
        if (targetMonthIndex === 9) {
          if (d === 20) event = { title: "Bahar Finalleri & Sene Sonu İdari Heyeti", type: "admin_meeting" };
          if (d === 28) event = { title: "Hazırlık Sınıfı Yıl Sonu Mütalaası", type: "academic" };
        }
        // HAZİRAN (Month 10): Yaz Kampı
        if (targetMonthIndex === 10) {
          if (d === 15) event = { title: "Yaz İlim ve Mütalaa Kampı (Bursa/İznik)", type: "conference" };
        }
        // TEMMUZ (Month 11): Mezuniyet & Yeni Yıl Burs Belirleme
        if (targetMonthIndex === 11) {
          if (d === 15) event = { title: "Mezuniyet & İcazet Merasimi", type: "graduation" };
          if (d === 28) event = { title: "Akademik Yıl Sonu & Yeni Yıl Burs Belirleme", type: "annual_transition" };
        }
      } else {
        // ==================== ÖĞRENCİ TEDRİSAT & TATİL TAKVİMİ ====================
        if (targetMonthIndex === 0) {
          if (d >= 1 && d <= 15) event = { title: "Talebe Yaz İzni & Memleket Dönüşü", type: "holiday" };
          if (d === 16) event = { title: "Güz Dönemi Ders Kayıtları", type: "academic" };
          if (d >= 17 && d <= 23) event = { title: "Talebe Yaz İzni & Memleket Dönüşü", type: "holiday" };
          if (d === 24) event = { title: "Oryantasyon: Açılış & Mütevelli Hasbihali", type: "orientation" };
          if (d === 25) event = { title: "Oryantasyon: Kütüphane & İlim Usûlü Semineri", type: "orientation" };
          if (d === 26) event = { title: "Oryantasyon: Tarihî Yarımada Gezisi", type: "orientation" };
          if (d === 27) event = { title: "Oryantasyon: Ulemâ Meclisi ve Çay Sohbeti", type: "orientation" };
          if (d === 28) event = { title: "Oryantasyon: Süleymaniye Cuma Namazı", type: "orientation" };
        }
        if (targetMonthIndex === 1) {
          if (d === 1) event = { title: "Güz Dersleri Başlar (Emsile & Avamil)", type: "academic" };
          if (d >= 24 && d <= 30) event = { title: "Güz Vizeleri Sınav Haftası", type: "exam" };
        }
        if (targetMonthIndex === 2) {
          if (d === 15) event = { title: "Talebe Temsilcileri Talepleri", type: "student_meeting" };
          if (d === 28) event = { title: "Müzakere Halkaları Ara İmtihanı", type: "exam" };
        }
        if (targetMonthIndex === 3) {
          if (d === 15) event = { title: "Kütüphane Gece Mütalaası ve Semaver", type: "academic" };
        }
        if (targetMonthIndex === 4) {
          if (d >= 15 && d <= 25) event = { title: "Güz Dönemi Finalleri & Not Teslimi", type: "exam" };
          if (d >= 26) event = { title: "Sömestr Yarıyıl Tatili", type: "holiday" };
        }
        if (targetMonthIndex === 5) {
          if (d === 1) event = { title: "Bahar Dönemi Başlar (Metin Dağıtımı)", type: "academic" };
        }
        if (targetMonthIndex === 6) {
          if (d >= 18 && d <= 25) event = { title: "Bahar Vize Haftası", type: "exam" };
        }
        if (targetMonthIndex === 7) {
          if (d === 15) event = { title: "Ramazan İtikafı ve İftar Meclisi", type: "holiday" };
        }
        if (targetMonthIndex === 8) {
          if (d === 20) event = { title: "Yıl Sonu Tez & Metin Teslimi", type: "academic" };
        }
        if (targetMonthIndex === 9) {
          if (d >= 15 && d <= 25) event = { title: "Bahar Finalleri & İmtihanlar", type: "exam" };
        }
        if (targetMonthIndex === 10) {
          if (d >= 10 && d <= 25) event = { title: "Yaz Yoğunlaştırılmış Arapça Kampı", type: "conference" };
        }
        if (targetMonthIndex === 11) {
          if (d === 15) event = { title: "İcazet Merasimi & Mezuniyet", type: "graduation" };
          if (d > 15) event = { title: "Yaz Tatili & Sıla-i Rahim", type: "holiday" };
        }
      }

      // Her ayın 10, 20 ve 30. günlerinde Birebir Talebe Görüşmesi imkânı
      const isAppointmentDay = (d === 10 || d === 20 || d === 30);

      days.push({
        day: d,
        monthName: monthName,
        monthIndex: targetMonthIndex,
        isCurrent: isCurrentActiveMonth && (d === this.state.currentDay),
        isPast: isCurrentActiveMonth ? (d < this.state.currentDay) : (offset < 0),
        event: event,
        isAppointmentDay: isAppointmentDay
      });
    }
    return days;
  }

  setViewingMonthOffset(delta) {
    this.state.viewingMonthOffset += delta;
  }

  resetViewingMonthOffset() {
    this.state.viewingMonthOffset = 0;
  }

  toggleCalendarViewMode() {
    this.state.calendarViewMode = this.state.calendarViewMode === "admin" ? "student" : "admin";
    this.saveToStorage();
  }

  // Günlük açık/tamamlanmamış hadise kontrolü
  hasUncompletedEventToday() {
    if (this.state.activeVakifEvent) return true;
    if (this.state.activeModalEvent) return true;
    if (this.state.adminMeetingData) return true;
    if (this.state.studentMeetingData) return true;
    if (this.state.pendingAnnualStipendModal) return true;
    return false;
  }

  // Dönem Başı Kontrolü: Ders-Hoca eşleşmesi ve öğrencilerin ders almaya başlaması
  checkTermCanStart() {
    // Ağustos'un ilk yarısında (Aday Mülakatları dönemi 1-14. günler) kullanıcı serbestçe gün ilerletebilir
    if (this.state.currentMonthIndex === 0 && this.state.currentDay < 15) {
      return true;
    }

    const activeStudents = this.state.students.filter(s => s.status === "active");
    if (activeStudents.length === 0) {
      this.termStartBlockReason = "⚠️ Dönem Başlatılamaz: Kuruma henüz talebe kabul edilmemiştir! Lütfen 'TEDRİSAT > Talebeler & Mülakat' menüsünden mülakatları icra ederek kontenjanı doldurunuz.";
      return false;
    }

    // Aktif sınıflar
    const activeYears = Array.from(new Set(activeStudents.map(s => s.currentClassYear !== undefined ? s.currentClassYear : 0)));
    const allCourses = this.getAllCourses();
    const currentSemester = (this.state.currentMonthIndex >= 1 && this.state.currentMonthIndex <= 5) ? "guz" : ((this.state.currentMonthIndex >= 6 && this.state.currentMonthIndex <= 10) ? "bahar" : "guz");

    // Aktif sınıfların mevcut dönem dersleri
    const requiredCourses = allCourses.filter(c => activeYears.includes(c.classYear) && (c.semester === currentSemester || !c.semester));
    const unassigned = requiredCourses.filter(c => !this.state.courseAssignments[c.id]);

    if (unassigned.length > 0) {
      const sampleNames = unassigned.slice(0, 3).map(c => c.name).join(", ");
      this.termStartBlockReason = `⚠️ Dönem Başlatılamaz: Aktif sınıflar için ${unassigned.length} dersin hocası henüz atanmamıştır (${sampleNames}${unassigned.length > 3 ? '...' : ''})! Lütfen 'TEDRİSAT > Seminerler > Sınıf & Hoca Masası'ndan derslere hoca görevlendiriniz.`;
      return false;
    }

    // Öğrencilerin dersleri almaya başlaması
    activeStudents.forEach(st => {
      const stCourses = requiredCourses.filter(c => c.classYear === (st.currentClassYear || 0));
      st.enrolledCourses = stCourses.map(c => c.id);
    });

    this.termStartBlockReason = null;
    return true;
  }

  // Hoca-Ders Otomatik Eşleştirme Yardımcısı
  autoAssignScholarsToCourses() {
    const allCourses = this.getAllCourses();
    const scholars = this.state.hiredScholars || [];
    if (scholars.length === 0) return 0;
    let count = 0;

    allCourses.forEach(c => {
      if (!this.state.courseAssignments[c.id]) {
        // Branşa göre eşleşen hoca bul veya sırayla ata
        const match = scholars.find(s => s.specialty === c.branch || s.branch === c.branch) || scholars[count % scholars.length];
        if (match) {
          this.state.courseAssignments[c.id] = match.scholarId;
          count++;
        }
      }
    });

    this.saveToStorage();
    return count;
  }

  // Gün İlerletme (Kural: x. günde etkinlik varsa x+1'e o etkinlik tamamlanmadan geçilemez)
  advanceDays(step = 1) {
    if (step <= 0) return { success: true, advanced: 0 };

    // 1. Bugünkü tamamlanmamış bir hadise varsa bugünden çıkılamaz
    if (this.hasUncompletedEventToday()) {
      return {
        success: false,
        blocked: true,
        reason: `Bugünkü (${this.state.currentDay} ${MONTH_NAMES[this.state.currentMonthIndex]}) hadiseyi/istişareyi tamamlamadan sonraki güne geçemezsiniz!`
      };
    }

    // 2. Dönem başlangıç şartları (ders-hoca eşleşmesi ve öğrenci kabulleri)
    if (!this.checkTermCanStart()) {
      return {
        success: false,
        blocked: true,
        reason: this.termStartBlockReason
      };
    }

    let advanced = 0;
    for (let i = 0; i < step; i++) {
      // Bir gün ilerle
      this.state.currentDay++;
      this.state.totalDaysPassed++;
      advanced++;

      // Günlük hadise kontrollerini çalıştır
      this.checkDailyEvents();

      // Takvimde bugün bir etkinlik veya konferans var mı?
      const days = this.getMonthDays(0);
      const dayObj = days.find(d => d.day === this.state.currentDay);
      const hasConf = (this.state.scheduledConferences || []).some(
        c => !c.completed && c.monthIndex === this.state.currentMonthIndex && c.day === this.state.currentDay
      );
      const hasCalendarEvent = dayObj && dayObj.event;

      // Eğer ay sonu ise ayı devret ve 1. günde dur
      if (this.state.currentDay > 30) {
        this.state.currentDay = 1;
        this.advanceMonth();
        break;
      }

      // Eğer bugünde bir etkinlik tetiklendiyse veya takvim etkinliği/konferans varsa, x. günde DUR!
      // Kullanıcı bu etkinliği görmeli/tamamlamalı, x+1'e atlayamamalı.
      if (this.hasUncompletedEventToday() || hasCalendarEvent || hasConf) {
        break;
      }
    }

    this.resetViewingMonthOffset();
    this.saveToStorage();
    return { success: true, advanced };
  }

  // Bir sonraki takvim olayına atla (asla bir etkinliği atlayıp sonrakine geçmez)
  jumpToNextEvent() {
    if (this.hasUncompletedEventToday()) {
      return {
        success: false,
        blocked: true,
        reason: `Ayın ${this.state.currentDay}. günündeki hadiseyi tamamlamadan bir sonraki etkinliğe geçemezsiniz.`
      };
    }

    if (!this.checkTermCanStart()) {
      return {
        success: false,
        blocked: true,
        reason: this.termStartBlockReason
      };
    }

    const days = this.getMonthDays(0);
    // Gelecekteki etkinlikler
    const futureEvents = days.filter(d => d.day > this.state.currentDay && (d.event || d.isAppointmentDay));
    const targetDay = futureEvents.length > 0 ? futureEvents[0].day : (this.state.currentDay < 30 ? 30 : 31);
    const diff = targetDay - this.state.currentDay;
    return this.advanceDays(diff);
  }

  // Ay Geçişi ve Bilanço Hesaplamaları
  advanceMonth() {
    this.state.currentMonthIndex++;
    this.state.monthlyStudentAppointmentsRemaining = 3; // Her ay 3 randevu yenilenir
    this.state.monthlyGroupEventsRemaining = 4;        // Yurt stres etkinlikleri her ay 4'e yenilenir

    // 1. GELİRLER: Düzenli Yerel Esnaf ve Destekçi Bağışları (Aylık 110.000 - 150.000 ₺)
    const esnafDonation = Math.floor(Math.random() * 40000) + 110000;
    this.state.localMerchantsDonationThisMonth = esnafDonation;
    this.state.totalMerchantDonationsReceived += esnafDonation;
    this.state.budget += esnafDonation;

    // Kürsü Sponsorluk Geliri
    const chairIncome = this.state.scholarBudget.sponsoredMonthlyAmount || 0;
    this.state.budget += chairIncome;

    // 2. GİDERLER:
    // A) Bina Kirası ve Bakım/Faturalar (Doğalgaz, elektrik, su, internet)
    let rentCost = 0;
    let bldgMaintenance = 28000;
    if (typeof INSTITUTION_BUILDINGS_DATA !== "undefined") {
      const bldg = INSTITUTION_BUILDINGS_DATA.find(b => b.id === this.state.currentBuildingId);
      if (bldg) {
        bldgMaintenance = bldg.maintenanceCost || 28000;
        if (this.state.isBuildingAllocated || bldg.level === 5) {
          rentCost = 0;
        } else {
          rentCost = bldg.monthlyRent;
        }
      }
    } else {
      rentCost = this.state.isBuildingAllocated ? 0 : (this.state.monthlyRent || 48000);
    }

    // B) Öğrenci Bursları
    const activeStudents = this.state.students.filter(s => s.status === "active");
    const stipendCost = activeStudents.length * this.state.currentYearStipend;

    // C) Hoca Maaşları (Ayrı Bütçe Takibi)
    const scholarsCost = this.state.hiredScholars.reduce((acc, h) => acc + h.monthlySalary, 0);
    this.state.scholarBudget.totalMonthlyCost = scholarsCost;
    const netScholarCost = Math.max(0, scholarsCost - chairIncome);

    // D) Personel Maaşları (Müdür Yrd., Yurt Md., Aşçı, Muhasebeci, Temizlik)
    let staffCost = 0;
    if (this.state.viceDirector) staffCost += this.state.viceDirector.monthlySalary;
    if (this.state.dormManager) staffCost += this.state.dormManager.monthlySalary;
    if (this.state.accountant) staffCost += this.state.accountant.monthlySalary;
    if (this.state.cook) staffCost += this.state.cook.monthlySalary;
    if (this.state.cleaningStaff && this.state.cleaningStaff.length > 0) {
      staffCost += this.state.cleaningStaff.reduce((a, b) => a + b.monthlySalary, 0);
    }

    // E) Talebe Başına Mutfak/İaşe Gideri (Kahvaltı, öğle, akşam, et, meyve, kuru gıda)
    const perStudentFoodCost = 5500; // Aylık talebe başına 5.500 ₺ mutfak iaşesi
    const totalFoodCost = activeStudents.length * perStudentFoodCost;

    // F) Yurt Bakım, Isınma ve Ortak Giderler
    let dormCost = 58000;
    if (typeof DORM_BUILDINGS_DATA !== "undefined") {
      const dorm = DORM_BUILDINGS_DATA.find(d => d.id === this.state.currentDormId);
      dormCost = (dorm ? dorm.monthlyCost : 58000) + (this.state.upgrades.dormDining * 12000);
    } else {
      dormCost = this.state.dormStatus.monthlyMaintenanceCost + (this.state.upgrades.dormDining * 12000);
    }

    // Toplam Aylık Gider
    const totalExpense = rentCost + stipendCost + netScholarCost + staffCost + dormCost + bldgMaintenance + totalFoodCost;
    this.state.budget -= totalExpense;

    // 3. BÜTÇE AÇIĞI RİSKİ (Kasa Sıfırın Altına İndiğinde Memnuniyet ve İtibar Hızla Erir)
    if (this.state.budget < 0) {
      const deficit = Math.abs(this.state.budget);
      const repPenalty = Math.min(8, Math.max(3, Math.ceil(deficit / 60000)));
      const cohesionPenalty = Math.min(20, Math.max(8, Math.ceil(deficit / 30000)));
      const stressIncrease = Math.min(18, Math.max(8, Math.ceil(deficit / 35000)));

      this.state.reputation = Math.max(5, this.state.reputation - repPenalty);
      this.state.socialCohesion = Math.max(5, (this.state.socialCohesion || 55) - cohesionPenalty);
      this.state.dormStatus.satisfaction = Math.max(10, this.state.dormStatus.satisfaction - cohesionPenalty);

      activeStudents.forEach(st => {
        st.stressLevel = Math.min(98, st.stressLevel + stressIncrease);
        st.satisfaction = Math.max(10, (st.satisfaction || 70) - cohesionPenalty);
      });

      this.addNotification({
        title: `🚨 VAKIF BÜTÇE AÇIĞI VE MALİ KRİZ!`,
        message: `Vakıf kasası eksiye (${this.state.budget.toLocaleString('tr-TR')} ₺) düştü! Maaş, fatura ve burs ödemeleri aksadığı için talebe memnuniyeti (-${cohesionPenalty}) ve kurum itibarı (-${repPenalty}) hızla eriyor!`,
        type: "warning"
      });
    }

    // Muhasebe için bilanço kaydı oluştur
    this.state.lastMonthlyFinances = {
      esnafIncome: esnafDonation,
      donorIncome: 0,
      chairSponsorshipIncome: chairIncome,
      scholarCost: scholarsCost,
      staffCost: staffCost,
      stipendCost: stipendCost,
      rentCost: rentCost,
      dormCost: dormCost + bldgMaintenance,
      foodCost: totalFoodCost,
      netCashFlow: (esnafDonation + chairIncome) - totalExpense
    };

    // Her talebeye aylık detaylı rapor oluştur ve ilk dönem GANO ata
    const monthName = MONTH_NAMES[(this.state.currentMonthIndex - 1 + 12) % 12];
    activeStudents.forEach(st => {
      // 1. Dönem Sonu (Aralık sonu / Ocak başı: Month 4-5) GANO Ataması (1-4. sınıflar için)
      // Hazırlık sınıfı öğrencilerine (currentClassYear === 0) GANO atanmaz! Yalnızca internalScore (100 üzerinden) gösterilir.
      if (this.state.currentMonthIndex === 5 && st.currentClassYear > 0 && st.gano === null) {
        const calculatedGano = 2.60 + ((st.talent / 100) * 1.10) + ((Math.random() * 0.3) - 0.15);
        st.gano = parseFloat(Math.min(3.98, Math.max(2.40, calculatedGano)).toFixed(2));
      }

      // Duygu ve stres dalgalanması (kız öğrencilerde daha duyarlı)
      const stressDelta = (Math.floor(Math.random() * 9) - 4) * st.emotionalSensitivity;
      st.stressLevel = Math.max(10, Math.min(95, Math.round(st.stressLevel + stressDelta)));

      // Kurum içi tedrisat not dalgalanması
      st.internalScore = Math.max(45, Math.min(98, st.internalScore + Math.floor(Math.random() * 5) - 2));

      if (typeof generateMonthlyStudentReport === "function") {
        generateMonthlyStudentReport(st, monthName, this.state.academicYear);
      }
    });

    // Dönem Sonu Raporları (Aralık sonu: Güz; Mayıs sonu: Bahar)
    if (this.state.currentMonthIndex === 4) {
      this.generateTermReport("Güz");
    } else if (this.state.currentMonthIndex === 9) {
      this.generateTermReport("Bahar");
    }

    // Yıl devri kontrolü (12 ay dolunca: Temmuz bittiğinde)
    if (this.state.currentMonthIndex >= 12) {
      this.state.currentMonthIndex = 0;
      this.advanceAcademicYear();
    }

    this.updateMonthlyStudentSatisfaction();

    // Sosyallik / Uhuvvet Düzeyi ve Yurt İmkânları Etkisi
    let dormPotential = 55;
    if (this.state.currentDormId === "dorm_lvl_2") dormPotential = 75;
    if (this.state.currentDormId === "dorm_lvl_3") dormPotential = 92;
    if (this.state.upgrades && this.state.upgrades.library >= 2) dormPotential += 5;
    if (this.state.upgrades && this.state.upgrades.dormDining >= 2) dormPotential += 5;
    dormPotential = Math.min(100, dormPotential);

    const currentCohesion = this.state.socialCohesion || 55;
    const drift = (dormPotential - currentCohesion) * 0.25;
    this.state.socialCohesion = Math.min(100, Math.max(20, Math.round(currentCohesion + drift)));

    if (this.state.socialCohesion >= 70) {
      activeStudents.forEach(st => {
        st.stressLevel = Math.max(5, st.stressLevel - 4);
        st.academicCompetence += 2;
      });
    }

    // Yurt Müdürü Aylık Büyük Tadilat ve İhtiyaç Teklifi
    this.prepareMonthlyDormMaintenanceProposal();
  }

  // Yeni Akademik Yıla Geçiş (Temmuz Sonu / Ağustos Başı)
  advanceAcademicYear() {
    this.state.academicYear++;
    this.state.reputationGainedThisYear = 0;
    this.state.hasDoneTrackSelectionThisYear = false;

    // 1. Kullanıcıdan Özel Burs Belirleme Modalı Bayrağı
    this.state.pendingAnnualStipendModal = true;

    // 2. İtibar Kuralı: Min 2, Ortalama 3, Maks 5 Puan Artışı
    const repGain = Math.floor(Math.random() * 4) + 2; // 2, 3, 4 veya 5 puan!
    this.state.reputation = Math.min(98, this.state.reputation + repGain);
    this.state.reputationGainedThisYear = repGain;

    // 3. Öğrencilerin Akademik Yetkinliği (SENEDE 10 - 20 PUAN ARTAR!)
    this.state.students.forEach(st => {
      if (st.status === "active") {
        st.currentClassYear++;
        // Hazırlıktan 1. sınıfa geçenlere üniversite GANO'su atanır
        if (st.currentClassYear >= 1 && st.gano === null) {
          const calculatedGano = 2.65 + ((st.talent / 100) * 1.05) + ((Math.random() * 0.25) - 0.12);
          st.gano = parseFloat(Math.min(3.98, Math.max(2.50, calculatedGano)).toFixed(2));
        }

        const growth = Math.floor(Math.random() * 11) + 10;
        st.academicCompetence += growth;

        // Mezuniyet Şartı (Hazırlık + 4 Sınıf = 5 Yıl)
        if (st.currentClassYear >= this.state.programDurationYears) {
          this.graduateStudent(st);
        }
      }
    });

    // 4. Kardeş Kurumlar Güncellemesi
    this.updatePeerInstitutions();

    // 5. Yeni Aday Havuzu (75 Aday, Yalnızca İstanbul Üniversiteleri)
    if (typeof generateAnnualCandidates === "function") {
      this.state.candidatesPool = generateAnnualCandidates(this.state.academicYear, this.state.genderMode, this.state.admissionCriteria);
    }

    // 6. Mezun Kariyer Takibi
    if (this.state.academicYear % 2 === 0 && this.state.graduates.length > 0) {
      this.updateGraduateCareers();
    }

    if (this.state.academicYear >= 10) {
      this.state.completedTenYearsReportAvailable = true;
    }

    const quota = this.getAnnualQuota();
    this.addNotification({
      title: `${this.state.academicYear}. Akademik Yıl Açıldı! (Ağustos)`,
      message: `Yeni akademik yıl için mülakatlar başladı. Bu yılki yeni talebe kontenjanımız ${quota} kişidir. Yıllık itibar artışımız: +${repGain} puan (Mevcut İtibar: ${this.state.reputation}). Lütfen yeni yıl talebe burs miktarını belirleyiniz.`,
      type: "info",
      date: `Ağustos, Yıl ${this.state.academicYear}`
    });
  }

  // Kullanıcının Yeni Yıl Bursunu Belirlemesi
  setAnnualStipend(newAmount) {
    const stipend = Math.max(500, parseInt(newAmount) || this.state.currentYearStipend);
    this.state.currentYearStipend = stipend;
    this.state.pendingAnnualStipendModal = false;

    this.addNotification({
      title: "Yeni Yıl Talebe Bursu Kararlaştırıldı",
      message: `Mütevelli Heyeti kararıyla aylık talebe burs miktarı ${stipend.toLocaleString('tr-TR')} ₺/ay olarak yürürlüğe girdi.`,
      type: "success"
    });
    this.saveToStorage();
    return { success: true, newStipend: stipend };
  }

  // Öğrenci Mezun Et
  graduateStudent(student) {
    student.status = "graduated";
    student.graduationYear = this.state.academicYear;

    const fields = [
      { role: "Yüksek Lisans / Doktora Talebesi (Akademi Yolunda)", sector: "akademi", title: "Lisansüstü Araştırmacı" },
      { role: "Milli Eğitim Bakanlığı / İHL Muallimi", sector: "mebOgretmen", title: "İHL Muallimi" },
      { role: "Diyanet İşleri Başkanlığı / Vaiz & Müftü Yrd.", sector: "diyanet", title: "Din Görevlisi / Vaiz" },
      { role: "Düşünce Kuruluşu (İSAM / SETA / İLEM)", sector: "dusunceKurulusu", title: "Politika Araştırmacısı" },
      { role: "Özel Sektör / Helal Girişimcilik & Ticaret", sector: "ticaret", title: "Girişimci" },
      { role: "Yayıncılık / Klasik Eser Mütercimi & Editör", sector: "basinYayin", title: "Editör-Mütercim" },
      { role: "Hukuk Müşavirliği / Avukatlık", sector: "hukuk", title: "Hukuk Danışmanı" },
      { role: "Kamu / Bakanlık Uzmanlığı", sector: "burokrasi", title: "Kamu Uzman Yrd." }
    ];

    let chosen = fields[1];
    if (student.academicCompetence >= 40 && student.primaryField === "fıkıh") {
      chosen = Math.random() > 0.4 ? fields[0] : fields[2];
    } else if (student.academicCompetence >= 40 && (student.primaryField === "sosyalBilimler" || student.primaryField === "kelamFelsefe")) {
      chosen = Math.random() > 0.3 ? fields[0] : fields[3];
    } else {
      chosen = fields[Math.floor(Math.random() * fields.length)];
    }

    student.career = {
      sector: chosen.sector,
      currentTitle: chosen.title,
      roleDescription: chosen.role,
      phdCompleted: false,
      academicLevel: "YuksekLisans",
      yearsInCareer: 0,
      tenYearStatus: null
    };

    this.state.graduates.push(student);
  }

  // Mezun Kariyer Takibi
  updateGraduateCareers() {
    this.state.graduates.forEach(grad => {
      if (!grad.career) return;
      grad.career.yearsInCareer += 2;
      const years = grad.career.yearsInCareer;

      if (grad.career.sector === "akademi") {
        if (years < 3) {
          grad.career.currentTitle = "Yüksek Lisans Tez Aşaması";
        } else if (years >= 4 && years < 7) {
          grad.career.currentTitle = "Araştırma Görevlisi (Doktora Aşaması)";
        } else if (years >= 7 && years < 10) {
          grad.career.phdCompleted = true;
          grad.career.currentTitle = "Dr. Öğr. Üyesi";
        } else if (years >= 10) {
          grad.career.currentTitle = "Doçent Doktor";
          grad.career.roleDescription = "Doçentliğini aldı, kurumumuz adına uluslararası tebliğler sunuyor.";
        }
      } else if (grad.career.sector === "diyanet") {
        if (years >= 6) {
          grad.career.currentTitle = grad.gender === "female" ? "Başvaize / Din İşleri Uzmanı" : "İlçe Müftü Yardımcısı / Cezaevi Vaizi";
        }
      } else if (grad.career.sector === "ticaret") {
        if (years >= 6) {
          grad.career.currentTitle = "İhracatçı / Şirket Sahibi (Vakıf Bağışçısı)";
        }
      }

      if (years >= 10 && !grad.career.tenYearStatus) {
        grad.career.tenYearStatus = `Mezuniyetinin 10. senesinde ${grad.career.currentTitle} mertebesine vasıl oldu. Kurumumuzda aldığı ${grad.primaryField} temeliyle ilim camiasında hürmet edilen bir sima haline geldi.`;
      }
    });

    this.addNotification({
      title: "2 Yıllık Mezunlar Kariyer Anketi Tamamlandı",
      message: `${this.state.graduates.length} mezunumuzun akademik unvanları ve vazifeleri güncellendi.`,
      type: "info"
    });
  }

  // Ortalama Stres
  getAverageStress() {
    const active = this.state.students.filter(s => s.status === "active");
    if (active.length === 0) return 25;
    return Math.round(active.reduce((acc, s) => acc + s.stressLevel, 0) / active.length);
  }

  // Ortalama Memnuniyet
  getAverageSatisfaction() {
    const active = this.state.students.filter(s => s.status === "active");
    if (active.length === 0) return 65;
    return Math.round(active.reduce((acc, s) => acc + s.satisfaction, 0) / active.length);
  }

  // Günlük Hadise Kontrolleri
  checkDailyEvents() {
    // 1. Ayın 1. Günü: Müdür Yardımcısının Stres Durumunu Danışması
    if (this.state.currentDay === 1) {
      const avgStress = this.getAverageStress();
      if (avgStress > 55 && !this.state.activeModalEvent) {
        this.triggerStressReliefConsultation();
      }
    }

    // 2. Düğün Davetiyesi
    if (this.state.graduates.length > 0 && Math.random() < 0.03) {
      const eligible = this.state.graduates.filter(g => !g.marriageInvited);
      if (eligible.length > 0) {
        const grad = eligible[Math.floor(Math.random() * eligible.length)];
        grad.marriageInvited = true;
        this.triggerMarriageInvitation(grad);
      }
    }

    // 3. Öğrenci Talepleri Toplantısı (Ekim ve Mart aylarında: Month 2 ve Month 7)
    if ((this.state.currentMonthIndex === 2 || this.state.currentMonthIndex === 7) && this.state.currentDay === 15 && !this.state.studentMeetingData) {
      this.triggerStudentMeeting();
    }

    // 4. Dönem Sonu İdari Toplantı (Aralık ve Mayıs aylarında: Month 4 ve Month 9)
    if ((this.state.currentMonthIndex === 4 || this.state.currentMonthIndex === 9) && this.state.currentDay === 20 && !this.state.adminMeetingData) {
      this.triggerAdministrativeMeeting();
    }


    // 6. Planlanan Konferans Kontrolü
    if (this.state.scheduledConferences && this.state.scheduledConferences.length > 0) {
      const todayConfs = this.state.scheduledConferences.filter(c => 
        !c.completed && c.monthIndex === this.state.currentMonthIndex && c.day === this.state.currentDay
      );
      todayConfs.forEach(c => {
        c.completed = true;
        this.state.reputation += 4;
        this.state.socialCohesion = Math.min(100, (this.state.socialCohesion || 55) + 6);
        
        let affectedCount = 0;
        this.state.students.forEach(st => {
          const isTarget = c.targetGrades.includes("all") || c.targetGrades.includes(st.currentClassYear) || c.targetGrades.includes(String(st.currentClassYear));
          if (isTarget && st.status === "active") {
            st.stressLevel = Math.max(5, st.stressLevel - 14);
            st.academicCompetence += 6;
            st.satisfaction = Math.min(100, st.satisfaction + 8);
            affectedCount++;
          }
        });
        
        this.addNotification({
          title: `🎙️ İlim Konferansı İcra Edildi: ${c.speaker}`,
          message: `'${c.title}' konulu sempozyum ${c.location} mevkiinde ${affectedCount} talebenin iştirakiyle icra edildi. İtibar +4, Talebe Ufku +10.`,
          type: "academic"
        });
      });
    }

    // 7. Yurt Hadiseleri & Arızaları (Her ayın 6, 16 ve 26. günleri periyodik gerçekleşir)
    if (this.state.currentDay === 6 || this.state.currentDay === 16 || this.state.currentDay === 26) {
      this.processDailyDormIncidents();
    }

    // 8. RASTGELE VAKIF GÜNDEMİ VE YÖNETİM KURULU İMTİHANLARI (Modern Türkiye Gerçekleri)
    // Her ayın 8 ve 22. günlerinde kritik yönetim kurulu kararları masaya gelir
    if ((this.state.currentDay === 8 || this.state.currentDay === 22) && !this.state.activeVakifEvent && !this.state.activeModalEvent) {
      this.triggerRandomVakifEvent();
    }
  }

  // Rastgele Vakıf Gündemi Tetikle
  triggerRandomVakifEvent() {
    if (typeof VAKIF_EVENTS_DATA === "undefined" || !VAKIF_EVENTS_DATA || VAKIF_EVENTS_DATA.length === 0) return;

    if (!this.state.vakifEventHistory) this.state.vakifEventHistory = [];

    // Henüz yaşanmamış senaryoları filtrele
    let availableEvents = VAKIF_EVENTS_DATA.filter(ev => !this.state.vakifEventHistory.includes(ev.id));
    if (availableEvents.length === 0) {
      // Tüm havuz oynandıysa geçmişi tazele
      this.state.vakifEventHistory = [];
      availableEvents = VAKIF_EVENTS_DATA;
    }

    const selectedEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    this.state.activeVakifEvent = selectedEvent;

    this.addNotification({
      title: `⚡ Vakıf Meclisi Gündemi: ${selectedEvent.title}`,
      message: `Yönetim kurulu kritik bir karar almak üzere toplandı: '${selectedEvent.title}'. Lütfen kararı belirleyiniz.`,
      type: "decision"
    });
  }

  // Vakıf Gündemi Kararını Uygula
  resolveVakifEvent(optionIndex) {
    const ev = this.state.activeVakifEvent;
    if (!ev || !ev.options || !ev.options[optionIndex]) return null;

    const opt = ev.options[optionIndex];

    // 1. Mali etki (TL)
    if (typeof opt.cost === "number") {
      this.state.budget -= opt.cost;
    }

    // 2. İtibar etkisi
    if (opt.reputationDelta) {
      this.state.reputation = Math.max(5, Math.min(100, this.state.reputation + opt.reputationDelta));
    }

    // 3. Uhuvvet ve Talebe Memnuniyeti
    if (opt.cohesionDelta) {
      this.state.socialCohesion = Math.max(5, Math.min(100, (this.state.socialCohesion || 55) + opt.cohesionDelta));
      this.state.dormStatus.satisfaction = Math.max(10, Math.min(100, this.state.dormStatus.satisfaction + opt.cohesionDelta));
      this.state.students.forEach(st => {
        st.satisfaction = Math.max(10, Math.min(100, (st.satisfaction || 70) + opt.cohesionDelta));
      });
    }

    // 4. Stres seviyesi
    if (opt.stressDelta) {
      this.state.students.forEach(st => {
        st.stressLevel = Math.max(5, Math.min(98, st.stressLevel + opt.stressDelta));
      });
    }

    // 5. Akademik / İlim Puanı
    if (opt.academicDelta) {
      this.state.academicPoints = Math.max(0, (this.state.academicPoints || 0) + opt.academicDelta);
      this.state.students.forEach(st => {
        st.academicCompetence = Math.min(100, (st.academicCompetence || 50) + Math.round(opt.academicDelta / 2));
      });
    }

    // Geçmişe kaydet
    if (!this.state.vakifEventHistory) this.state.vakifEventHistory = [];
    this.state.vakifEventHistory.push(ev.id);

    const outcomeData = {
      eventTitle: ev.title,
      selectedOption: opt.label,
      outcomeText: opt.outcomeText,
      cost: opt.cost || 0,
      reputationDelta: opt.reputationDelta || 0,
      cohesionDelta: opt.cohesionDelta || 0,
      stressDelta: opt.stressDelta || 0,
      academicDelta: opt.academicDelta || 0
    };

    this.state.lastVakifEventOutcome = outcomeData;
    this.state.activeVakifEvent = null;

    this.addNotification({
      title: `📋 Karar İcra Edildi: ${ev.title}`,
      message: `${opt.label} kararı alındı. ${opt.outcomeText}`,
      type: "decision"
    });

    this.saveToStorage();
    return outcomeData;
  }

  // Müdür Yardımcısının Stres Danışması
  triggerStressReliefConsultation() {
    const yd = this.state.viceDirector || { name: "Müdür Yardımcısı", skills: [] };
    const avgStress = this.getAverageStress();

    this.state.activeModalEvent = {
      type: "stress_event",
      title: `⚠️ Talebe Stresi Yükseldi! (${avgStress}/100)`,
      message: `${yd.name} odanıza teşrif etti:\n\n"Kıymetli Müdürüm, ay başı itibarıyla yaptığımız istişarelerde talebelerimizin stres seviyesinin (%${avgStress}) yüksek seyrettiğini müşahade ettik. Zihinleri tazelemek ve kardeşlik bağını kuvvetlendirmek için aşağıdaki etkinliklerden birini icra etmenizi tensip buyurur musunuz? Etkinliklerin finansmanını belediye ve bakanlık bağlantılarımızdan karşılıyoruz."`,
      options: [
        {
          label: "Bolu Narven Doğa Kampı (Bakanlık Gençlik Desteğiyle - Ücretsiz)",
          action: () => {
            this.triggerDirectStressEvent("gezi");
            this.state.activeModalEvent = null;
          }
        },
        {
          label: "Boğaz'da Restoran Yemeği (Belediye Kültür Sponsoru - Ücretsiz)",
          action: () => {
            this.triggerDirectStressEvent("yemek");
            this.state.activeModalEvent = null;
          }
        },
        {
          label: "Yurtta Sıcak Çiğköfte & Maç Gecesi (Vakıf Kasası: 2.000 ₺)",
          action: () => {
            this.triggerDirectStressEvent("cigkofte");
            this.state.activeModalEvent = null;
          }
        },
        {
          label: "Şimdilik Ertele (Dersler Aksamamalı)",
          action: () => {
            this.addNotification({
              title: "Etkinlik Ertelendi",
              message: "Talebe stresi yüksek seviyede seyretmeye devam ediyor.",
              type: "warning"
            });
            this.state.activeModalEvent = null;
            this.saveToStorage();
          }
        }
      ]
    };
  }

  // Doğrudan Yurt Grup Stres Etkinliği Tetikleme (Ayda En Fazla 4 Kez!)
  triggerDirectStressEvent(type) {
    if (this.state.monthlyGroupEventsRemaining <= 0) {
      return {
        success: false,
        message: "Bu ayki yurt stres azaltma etkinlik kontenjanınız (4/4) doldu! Bir ay içinde ders düzenini bozmamak adına en fazla 4 etkinlik icra edilebilir."
      };
    }

    this.state.monthlyGroupEventsRemaining--;

    if (type === "gezi") {
      this.reduceAllStudentStress(25);
      this.addNotification({
        title: "Bolu Narven Doğa Gezisi Tamamlandı",
        message: "Gençlik ve Spor Bakanlığı tahsisiyle talebeler Bolu Narven tesislerinde kampa katıldı. Stres 25 puan azaldı!",
        type: "success"
      });
      this.saveToStorage();
      return { success: true, message: "Doğa kampı tamamlandı. Talebelerin stresi 25 puan düştü!" };
    } else if (type === "yemek") {
      this.reduceAllStudentStress(18);
      this.addNotification({
        title: "Boğaz'da Ziyafet Yemeği",
        message: "Belediye sosyal tesislerinde talebelerle moral yemeği yendi. Stres 18 puan düştü.",
        type: "success"
      });
      this.saveToStorage();
      return { success: true, message: "Restoran yemeği tamamlandı. Stres 18 puan geriledi." };
    } else if (type === "cigkofte") {
      this.state.budget -= 2000;
      this.reduceAllStudentStress(12);
      this.addNotification({
        title: "Yurtta Çiğköfte & Maç Gecesi",
        message: "Yemekhanede talebelerle çiğköfte yoğrulup maç izlendi. Stres 12 puan geriledi.",
        type: "info"
      });
      this.saveToStorage();
      return { success: true, message: "Çiğköfte gecesi tertiplendi. Stres 12 puan azaldı." };
    }

    return { success: false, message: "Bilinmeyen etkinlik türü." };
  }

  // Tüm Öğrencilerin Stresini Azalt
  reduceAllStudentStress(points) {
    this.state.students.forEach(st => {
      if (st.status === "active") {
        st.stressLevel = Math.max(10, st.stressLevel - points);
        st.satisfaction = Math.min(92, st.satisfaction + Math.round(points / 2));
      }
    });
  }

  // 100 Talebe Talebi Havuzundan Dinamik Toplantı Üretimi
  triggerStudentMeeting() {
    const shuffled = [...CURRICULUM_AND_STUDENT_DEMANDS_100].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3).map((item, idx) => ({
      id: `dem_${Date.now()}_${idx}`,
      topic: item.topic,
      text: item.text,
      cost: item.cost,
      acceptEffect: item.effect,
      status: "pending"
    }));

    this.state.studentMeetingData = {
      title: "Öğrenci Temsilcileri ve İdare İstişare Buluşması",
      date: `${this.state.currentDay} ${MONTH_NAMES[this.state.currentMonthIndex]}`,
      demands: selected
    };
  }

  // Öğrenci Talebine Aksiyon Ver
  handleStudentDemandAction(demandId, actionType) {
    if (!this.state.studentMeetingData) return;
    const demand = this.state.studentMeetingData.demands.find(d => d.id === demandId);
    if (!demand) return;

    demand.status = actionType;

    if (actionType === "accepted") {
      this.state.budget -= demand.cost;
      this.state.students.forEach(st => {
        if (st.status === "active") {
          st.satisfaction = Math.min(92, st.satisfaction + 6);
          st.stressLevel = Math.max(10, st.stressLevel - 5);
        }
      });
      this.addNotification({
        title: `Talep Kabul Edildi: ${demand.topic}`,
        message: `Talepler yerine getirildi. Bütçeden ${demand.cost.toLocaleString('tr-TR')} ₺ harcandı, memnuniyet arttı.`,
        type: "success"
      });
    } else if (actionType === "rejected") {
      this.state.students.forEach(st => {
        if (st.status === "active") {
          st.satisfaction = Math.max(35, st.satisfaction - 4);
        }
      });
      this.addNotification({
        title: `Talep Reddedildi: ${demand.topic}`,
        message: "İdare prensipler gereği talebi uygun bulmadı.",
        type: "warning"
      });
    } else {
      this.addNotification({
        title: `Talep İnceleniyor: ${demand.topic}`,
        message: "Talep sonraki mütevelli toplantısına havale edildi.",
        type: "info"
      });
    }

    this.saveToStorage();
  }

  // Yurt Müdürü İstişare Raporu Üret (Takvim Tıklamasında Açılır)
  generateDetailedDormReport() {
    const ym = this.state.dormManager || { name: "Yurt Müdürü", title: "İdareci" };
    const active = this.state.students.filter(s => s.status === "active");

    const problemStudents = active
      .filter(s => s.stressLevel > 65 || s.warningCount > 0 || (s.weakness && s.weakness.includes("Sabah")) || (s.weakness && s.weakness.includes("Tertip")))
      .slice(0, 4)
      .map(st => ({
        fullName: st.fullName,
        classYear: st.currentClassYear === 0 ? "Hazırlık" : `${st.currentClassYear}. Sınıf`,
        faculty: st.faculty,
        issue: st.weakness || "Gece geç yatma ve sabah dersine geç kalma",
        notes: `Yurt nöbetçisi tarafından etüt saatinde telefonla meşguliyeti veya oda tertipsizliği tespit edildi.`
      }));

    let currentCapacity = 35;
    let baseDormCost = 20000;
    if (typeof DORM_BUILDINGS_DATA !== "undefined") {
      const dorm = DORM_BUILDINGS_DATA.find(d => d.id === this.state.currentDormId);
      if (dorm) {
        currentCapacity = dorm.capacity;
        baseDormCost = dorm.monthlyCost;
      }
    }

    const dormBalance = {
      maintenanceCost: baseDormCost,
      foodKitchenCost: (this.state.upgrades.dormDining * 10000) + 15000,
      utilityBills: 12500,
      totalMonthlyCost: baseDormCost + (this.state.upgrades.dormDining * 10000) + 27500
    };

    const eventsHeld = [
      "Haftalık Yatsı Namazı Sonrası Çay ve Hadis Sohbeti (Hacı Veli Usta Çörekleriyle)",
      "Kütüphane Gece Mütalaası ve Semaver Halkası",
      "Periyodik Yangın Tatbikatı ve Kat Hijyen Denetimi",
      "Oda Temsilcileri Aylık Düzen ve Nöbet Toplantısı"
    ];

    const monthlyIncidents = this.state.monthlyDormIncidentsLog || [];
    const handledCount = monthlyIncidents.filter(i => i.isHandled).length;
    const pendingCount = monthlyIncidents.filter(i => !i.isHandled).length;

    // Beyoğlu Anadolu İHL Mezunlar Ekibi / Klik İncelemesi
    const beyogluStudents = active.filter(s => s.highSchool && s.highSchool.includes("Beyoğlu"));
    let beyogluReport = null;
    if (this.state.genderMode !== "female" && beyogluStudents.length >= 2) {
      const complaintsPool = [
        "Yurda son giriş saati olan 23:00'ı düzenli olarak ihlal ediyorlar; topluca dışarıda vakit geçirip geç saatlerde geliyorlar.",
        "Diğer liselerden gelen akranlarıyla kaynaşmayıp sadece kendi aralarında gruplaşıyorlar. Çay ocağı ve terası adeta kendi kontrollerine almış durumdalar.",
        "Gece geç saatlerde etüt salonu mutfağında gizlice toplanıp menemen ve semaver çayı yapıyorlar; nöbetçi belletmenin uyarılarına karşı birlik olup itiraz ediyorlar.",
        "Sabah etütlerine ve ilk derslere birbirlerini bekledikleri için 4-5 kişi birden toplu gecikmeyle giriyorlar.",
        "Hafta sonları idareden resmi izin kağıdı doldurmadan topluca gezi ve kamplara gidip akşam yoklamasında eksik çıkıyorlar.",
        "Farklı katlara dağıtılan odalarını gizlice birleştirip ranza ve dolapları taşıyarak müstakil koğuş kurma teşebbüsünde bulundular."
      ];
      const pickedComplaint = complaintsPool[(this.state.currentMonthIndex + this.state.academicYear) % complaintsPool.length];
      beyogluReport = {
        count: beyogluStudents.length,
        names: beyogluStudents.map(s => s.fullName).join(", "),
        complaint: pickedComplaint,
        urgency: "Dikkat Edilmeli",
        note: `Beyoğlu Anadolu İHL mezunu ${beyogluStudents.length} talebe kurumda güçlü ve bağımsız bir klik/tayfa oluşturmuş vaziyette. Ayrışmayı önlemek için ortak sorumluluklar verilmeli veya oda tertipleri karma hale getirilmelidir.`
      };
    }

    let summaryText = `${ym.name} arz ediyor: "Yurdumuzda uhuvvet seviyemiz %${this.state.socialCohesion || 55} düzeyindedir. Ay boyunca meydana gelen ${monthlyIncidents.length} hadisenin ${handledCount} tanesi idaremizce çözüme kavuşturulmuştur."`;
    if (beyogluReport) {
      summaryText += ` (Özel Not: Beyoğlu AİHL mezunlar ekibinin ${beyogluStudents.length} talebelik grubuyla ilgili disiplin ve intizam şikayetleri raporda sunulmuştur.)`;
    }

    return {
      managerName: ym.name,
      managerTitle: ym.title,
      date: `${this.state.currentDay} ${MONTH_NAMES[this.state.currentMonthIndex]}`,
      capacity: currentCapacity,
      occupancy: active.length,
      dormSatisfaction: this.state.dormStatus.satisfaction,
      socialCohesion: this.state.socialCohesion || 55,
      dormBalance: dormBalance,
      eventsHeld: eventsHeld,
      problemStudents: problemStudents,
      beyogluReport: beyogluReport,
      monthlyIncidents: monthlyIncidents,
      handledCount: handledCount,
      pendingCount: pendingCount,
      maintenanceProposal: this.state.pendingDormMaintenanceProposal,
      summary: summaryText
    };
  }

  // 10 Günlük Talebe Birebir İstişare Randevusu (10, 20, 30. günlerde)
  conductStudentAppointment(studentId, adviceTopic) {
    if (this.state.monthlyStudentAppointmentsRemaining <= 0) {
      return { success: false, message: "Bu ayki birebir hasbihal kontenjanınız (3 görüşme) doldu." };
    }

    const student = this.state.students.find(s => s.id === studentId);
    if (!student) return { success: false, message: "Talebe bulunamadı." };

    this.state.monthlyStudentAppointmentsRemaining--;

    let responseMsg = "";
    if (adviceTopic === "manevi") {
      student.satisfaction = Math.min(92, student.satisfaction + 8);
      student.stressLevel = Math.max(10, student.stressLevel - 15);
      student.moralStatus = "mükemmel";
      responseMsg = `${student.fullName} odanızda gözleri dolarak hasbihal etti: "Hocam, ilim yolundaki niyetimi tazelediniz. Allah sizden razı olsun; artık sabah derslerine canla başla sarılacağım."`;
    } else if (adviceTopic === "akademik") {
      student.academicCompetence += 5;
      student.satisfaction = Math.min(92, student.satisfaction + 6);
      student.stressLevel = Math.max(10, student.stressLevel - 8);
      responseMsg = `${student.fullName} ile metin tahlili metodu üzerine mütalaa yapıldı: "Hocam nahivdeki düğümü çözdüm, tavsiye ettiğiniz şerhleri kütüphaneden aldım."`;
    } else if (adviceTopic === "izin") {
      student.stressLevel = Math.max(10, student.stressLevel - 22);
      student.satisfaction = Math.min(92, student.satisfaction + 10);
      responseMsg = `${student.fullName}'e hafta sonu ailesini ziyaret etmesi için izin verildi: "Hocam üzerimdeki ağır stres kalktı, zihnim açıldı."`;
    } else {
      student.satisfaction = Math.min(92, student.satisfaction + 5);
      student.stressLevel = Math.max(10, student.stressLevel - 10);
      responseMsg = `${student.fullName} oda arkadaşlarıyla olan pürüzleri aktardı, aradaki muhabbet tatlıya bağlandı.`;
    }

    this.saveToStorage();
    return { success: true, message: responseMsg };
  }

  // Ders - Hoca Eşleştirme (Dönem başında yapılabilir, dönem içi KİLİTLİDİR)
  assignScholarToCourse(courseId, scholarId) {
    if (this.isSemesterLocked()) {
      return {
        success: false,
        message: "Dönem ortasında hoca değişikliği yapılamaz! Hoca-ders görevlendirmeleri yalnızca dönem başlarında (Ağustos/Eylül veya Ocak) yapılabilir."
      };
    }
    this.state.courseAssignments[courseId] = scholarId;
    this.saveToStorage();
    return { success: true };
  }

  unassignScholarFromCourse(courseId) {
    if (this.isSemesterLocked()) {
      return {
        success: false,
        message: "Dönem ortasında hoca sözleşmesi feshedilemez veya görevden alınamaz! Yalnızca dönem başlarında veya dönem sonu idari toplantıda işlem yapılabilir."
      };
    }
    delete this.state.courseAssignments[courseId];
    this.saveToStorage();
    return { success: true };
  }

  // Dönem Sonu İdari Toplantı (Talebe Temsilcisi Hoca Geri Bildirimleri ile Birlikte)
  triggerAdministrativeMeeting() {
    const active = this.state.students.filter(s => s.status === "active");
    const expulsionCandidates = active.filter(s => s.warningCount >= 2 || (s.gano !== null && s.gano < 2.30) || s.internalScore < 50);

    // Talebe Temsilcisi Hoca Değerlendirmeleri Üretimi (Sınıf bazında)
    const allCourses = this.getAllCourses();
    const studentRepFeedback = [];

    const classNames = ["Hazırlık Sınıfı", "1. Sınıf", "2. Sınıf", "3. Sınıf", "4. Sınıf"];
    classNames.forEach((clsName, yr) => {
      const clsCourses = allCourses.filter(c => c.classYear === yr);
      const assigned = clsCourses.filter(c => !!this.state.courseAssignments[c.id]);
      const unassigned = clsCourses.filter(c => !this.state.courseAssignments[c.id]);

      let comments = [];
      if (assigned.length > 0) {
        assigned.slice(0, 2).forEach(c => {
          const sch = this.state.hiredScholars.find(h => h.scholarId === this.state.courseAssignments[c.id]);
          if (sch) {
            comments.push(`${sch.name} hocamızın ${c.name} dersindeki ibare tahlillerinden talebeler fevkalade istifade ediyor.`);
          }
        });
      }
      if (unassigned.length > 0) {
        comments.push(`⚠️ Bu dönem ${unassigned[0].name} dersine hoca bulunamadığı için müzakere halkamız boş kaldı.`);
      }
      if (comments.length === 0) {
        comments.push("Tedrisat genel intizam içinde devam etmektedir.");
      }

      studentRepFeedback.push({
        classYearLabel: clsName,
        repName: `${clsName} Talebe Temsilcisi`,
        feedback: comments.join(" ")
      });
    });

    this.state.adminMeetingData = {
      title: `${this.state.currentMonthIndex < 6 ? 'Güz' : 'Bahar'} Dönemi Sonu İdari ve Disiplin Heyeti Toplantısı`,
      term: this.state.currentMonthIndex < 6 ? 'Güz' : 'Bahar',
      expulsionCandidates: expulsionCandidates,
      studentRepFeedback: studentRepFeedback,
      scholarsReview: this.state.hiredScholars.map(h => ({
        scholarId: h.scholarId,
        name: h.name,
        title: h.title,
        salary: h.monthlySalary,
        attendanceRate: h.attendanceRate || 97,
        studentApprovalRate: h.studentApprovalRate || 92,
        feedback: "Derslerine muntazam devam ediyor, talebeler usul tahlilinden istifade ediyor."
      })),
      budgetSummary: {
        currentBudget: this.state.budget,
        totalStudents: active.length
      }
    };
  }

  // Talebeyi Uyar
  warnStudent(studentId) {
    const student = this.state.students.find(s => s.id === studentId);
    if (!student) return;

    student.warningCount++;
    student.satisfaction = Math.max(30, student.satisfaction - 8);
    student.stressLevel = Math.min(95, student.stressLevel + 12);
    student.moralStatus = "ihtar_aldı";

    this.addNotification({
      title: `Talebeye Resmi İhtar Verildi: ${student.fullName}`,
      message: `${student.fullName} devamsızlık ve akademik zaafiyet sebebiyle ihtar aldı (Toplam İhtar: ${student.warningCount}/3).`,
      type: "warning"
    });

    this.saveToStorage();
  }

  // Talebeyi Kov (İhraç)
  expelStudent(studentId, reason = "Disiplin ve Akademik Yetersizlik") {
    const student = this.state.students.find(s => s.id === studentId);
    if (!student) return;

    student.status = "dismissed";
    student.dismissalReason = reason;
    this.state.dormStatus.occupancy = this.state.students.filter(s => s.status === "active").length;

    this.addNotification({
      title: `Talebenin Kurumla İlişiği Kesildi`,
      message: `${student.fullName} idari heyet kararıyla kurumdan ihraç edildi. Yurt kontenjanı açıldı.`,
      type: "danger"
    });

    this.saveToStorage();
  }

  // Hoca Sözleşmesi Feshi
  terminateScholarContract(scholarId) {
    const scholarIndex = this.state.hiredScholars.findIndex(h => h.scholarId === scholarId);
    if (scholarIndex === -1) return;

    const scholar = this.state.hiredScholars[scholarIndex];
    this.state.hiredScholars.splice(scholarIndex, 1);

    // Eşleşmiş dersleri temizle
    Object.keys(this.state.courseAssignments).forEach(cId => {
      if (this.state.courseAssignments[cId] === scholarId) {
        delete this.state.courseAssignments[cId];
      }
    });

    this.addNotification({
      title: `Hoca Sözleşmesi Feshedildi: ${scholar.name}`,
      message: `${scholar.title} ${scholar.name} ile yollar ayrıldı. İlgili dersler boşaldı.`,
      type: "warning"
    });

    this.saveToStorage();
  }

  // Resmi Dönem Raporu
  generateTermReport(termName) {
    const active = this.state.students.filter(s => s.status === "active");
    const studentsWithGano = active.filter(s => s.gano !== null);
    const avgGano = studentsWithGano.length > 0 
      ? (studentsWithGano.reduce((a, b) => a + b.gano, 0) / studentsWithGano.length).toFixed(2) 
      : "Hazırlık Sınıfı (Dönem Notu Takip Ediliyor)";

    const avgInternal = active.length > 0 ? Math.round(active.reduce((a, b) => a + b.internalScore, 0) / active.length) : 0;
    const avgSatisfaction = this.getAverageSatisfaction();
    const avgStress = this.getAverageStress();

    const report = {
      term: `${this.state.academicYear}. Yıl ${termName} Dönemi`,
      date: `${this.state.currentDay} ${MONTH_NAMES[this.state.currentMonthIndex]}`,
      studentCount: active.length,
      averageGano: avgGano,
      averageInternalScore: avgInternal,
      averageSatisfaction: avgSatisfaction,
      averageStress: avgStress,
      budgetBalance: this.state.budget,
      hiredScholarsCount: this.state.hiredScholars.length,
      reputation: this.state.reputation,
      summary: `${this.state.institutionName} ${this.state.academicYear}. yıl ${termName} dönemini ${active.length} aktif talebe ile tamamladı. Üniversite GANO ortalaması ${avgGano}, kurum içi tedrisat başarı ortalaması ${avgInternal}/100 olarak gerçekleşti.`
    };

    this.state.termReports.unshift(report);
  }

  // Hayırsever ile Etkileşim Kısıtı Kontrolü (AYDA EN FAZLA 1 KEZ BİRLEŞİK ETKİLEŞİM)
  canPerformDonorAction() {
    const currentTotalMonths = (this.state.academicYear * 12) + this.state.currentMonthIndex;
    return this.state.lastDonorActionMonth !== currentTotalMonths;
  }

  recordDonorAction() {
    this.state.lastDonorActionMonth = (this.state.academicYear * 12) + this.state.currentMonthIndex;
  }

  // Hayırsevere Özel Akşam Yemeği Daveti
  inviteDonorToDinner(donorId) {
    if (!this.canPerformDonorAction()) {
      return { success: false, message: "Hayırseverlerimizle birebir etkileşim (özel yemek, ziyaret vb.) ayda en fazla 1 kez icra edilebilir! Gelecek ay yeni bir buluşma planlayabilirsiniz." };
    }

    const donor = this.state.donors.find(d => d.id === donorId);
    if (!donor) return { success: false, message: "Hayırsever bulunamadı." };

    const cost = 8000;
    if (this.state.budget < cost) {
      return { success: false, message: "Kasada özel akşam yemeği bütçesi (8.000 ₺) bulunmuyor." };
    }

    this.state.budget -= cost;
    this.recordDonorAction();

    donor.trustScore = Math.min(98, donor.trustScore + 8);
    donor.relationshipLevel = Math.min(5, (donor.relationshipLevel || 1) + 1);

    this.saveToStorage();
    return {
      success: true,
      message: `${donor.name} ile baş başa akşam yemeğinde bir araya gelindi. Kurumun ilmi hedefleri paylaşıldı; güven ve muhabbet seviyesi arttı (Güven: %${donor.trustScore}, Samimiyet: ${donor.relationshipLevel} Yıldız).`
    };
  }

  // Talebeleri Hayırsevere Gösterme (Ziyaret & Müzakere İzleme)
  showStudentsToDonor(donorId) {
    if (!this.canPerformDonorAction()) {
      return { success: false, message: "Hayırsever etkileşimi ayda en fazla 1 kez yapılabilir! Gelecek ay yeni bir ziyaret planlayabilirsiniz." };
    }

    const donor = this.state.donors.find(d => d.id === donorId);
    if (!donor) return { success: false, message: "Hayırsever bulunamadı." };

    this.recordDonorAction();
    donor.trustScore = Math.min(98, donor.trustScore + 6);
    this.saveToStorage();
    return {
      success: true,
      message: `${donor.name} kurumumuzu teşrif etti. Talebelerin sabah namazı sonrası klasik Arapça müzakere halkasını izleyip çok duygulandı ve hayır dualarında bulundu (Güven: %${donor.trustScore}).`
    };
  }

  // Büyük Hayırseverler Bağış Yemeği (5 AYDA BİR YAPILABİLİR, %75 ÜZERİ GÜVEN ŞARTI, 500k - 1.5M ₺ NAKİT GETİRİR)
  holdMonthlyDonationDinner() {
    const totalCurrentMonths = (this.state.academicYear * 12) + this.state.currentMonthIndex;
    const monthsSinceLast = totalCurrentMonths - this.state.lastDonationDinnerTotalMonths;

    if (monthsSinceLast < 5) {
      const waitMonths = 5 - monthsSinceLast;
      return {
        success: false,
        message: `Büyük Hayırseverler Bağış Yemeği en fazla 5 ayda bir icra edilebilir! (Sonraki yemek için ${waitMonths} ay beklenmeli).`
      };
    }

    if (!this.canPerformDonorAction()) {
      return { success: false, message: "Bu ay zaten bir hayırsever faaliyeti icra ettiniz! Bağış yemeğini önümüzdeki ay tertip edebilirsiniz." };
    }

    const cost = 25000;
    if (this.state.budget < cost) {
      return { success: false, message: "Bağış yemeği salon ve ziyafet bütçesi (25.000 ₺) kasada mevcut değil." };
    }

    this.state.budget -= cost;
    this.state.lastDonationDinnerTotalMonths = totalCurrentMonths;
    this.recordDonorAction();

    let attendingDonorsCount = 0;
    // YALNIZCA GÜVEN SEVİYESİ %75 ÜZERİNDE OLANLAR KATILABİLİR!
    this.state.donors.forEach(donor => {
      const isUnlocked = this.state.reputation >= (donor.minReputationRequired || 30);
      if (isUnlocked && donor.trustScore >= 75) {
        attendingDonorsCount++;
        donor.trustScore = Math.min(98, donor.trustScore + 4);
      }
    });

    if (attendingDonorsCount === 0) {
      this.saveToStorage();
      return {
        success: true,
        message: "Bağış yemeği tertiplendi ancak güven seviyesi %75'in üzerinde hayırsever bulunmadığından katılım sağlanamadı. Hayırseverlerle istişare yemekleri yaparak güvenlerini artırınız."
      };
    }

    // Güncellenen ve Dengelenen Bağış Yemeği (180.000 ₺ - 350.000 ₺ arası dengeli nakit girişi)
    const baseYield = Math.floor(Math.random() * 90000) + 160000;
    const attendingFactor = Math.min(1.4, 0.8 + (attendingDonorsCount * 0.08));
    const totalDonationCollected = Math.round(Math.min(350000, Math.max(160000, baseYield * attendingFactor)));

    this.state.budget += totalDonationCollected;
    this.saveToStorage();

    return {
      success: true,
      message: `Tarihi medrese avlusunda görkemli bir İlim ve İnfak Yemeği icra edildi! Güven seviyesi %75 üzeri olan ${attendingDonorsCount} seçkin hayırseverimiz katıldı. Toplam ${totalDonationCollected.toLocaleString('tr-TR')} ₺ nakdi bağış vakıf kasamıza intikal etti!`
    };
  }

  // Hayırseverden Talepte Bulun (Burs, Kürsü Sponsorluğu, Kütüphane vb.)
  requestFromDonor(donorId, requestType) {
    const donor = this.state.donors.find(d => d.id === donorId);
    if (!donor) return { success: false, message: "Hayırsever bulunamadı." };

    if (this.state.reputation < (donor.minReputationRequired || 30)) {
      return {
        success: false,
        message: `${donor.name} henüz kurumunuzun itibarını (${this.state.reputation}) yeterli bulmuyor. Bu hayırsevere ulaşmak için gereken asgari itibar: ${donor.minReputationRequired}.`
      };
    }

    const rand = Math.random();
    const relBonus = ((donor.relationshipLevel || 1) - 1) * 0.10;
    const acceptanceThreshold = ((donor.trustScore / 100) * donor.generosity * (this.state.reputation / 55)) + relBonus;

    if (rand > acceptanceThreshold) {
      const excuse = donor.rejectionReasons[Math.floor(Math.random() * donor.rejectionReasons.length)];
      donor.trustScore = Math.max(30, donor.trustScore - 2);
      this.saveToStorage();
      return {
        success: false,
        message: `${donor.name} talebinizi geri çevirdi:\n"${excuse}"`
      };
    }

    let resultMessage = "";
    if (requestType === "burs") {
      const donation = donor.wealth === "Çok Yüksek" ? 190000 : (donor.wealth === "Yüksek" ? 100000 : 45000);
      this.state.budget += donation;
      resultMessage = `${donor.name} talebe burs fonumuza ${donation.toLocaleString('tr-TR')} ₺ nakdi bağış aktardı!`;
    } else if (requestType === "hocaKursusu") {
      this.state.scholarBudget.sponsoredMonthlyAmount += 28000;
      this.state.scholarBudget.sponsoredChairsCount++;
      resultMessage = `MÜJDE! ${donor.name} kurumumuzda bir "Klasik İlimler Kürsüsü" kurdu ve bir müderrisimizin 1 yıllık telif/maaşını (Aylık 28.000 ₺) bilfiil üstlendi!`;
    } else if (requestType === "egitimFonu") {
      const donation = donor.wealth === "Çok Yüksek" ? 140000 : 65000;
      this.state.budget += donation;
      resultMessage = `${donor.name} talebelerimizin lisansüstü eğitim fonuna ${donation.toLocaleString('tr-TR')} ₺ aktardı!`;
    } else if (requestType === "gezi") {
      this.reduceAllStudentStress(25);
      resultMessage = `${donor.name} talebelerimizi Bolu Narven Termal Tesisleri'nde kampa götürdü! Stres seviyeleri sıfırlandı!`;
    } else if (requestType === "yemekhane") {
      this.state.upgrades.dormDining = Math.min(3, this.state.upgrades.dormDining + 1);
      resultMessage = `${donor.name} yurt yemekhanesinin iaşe ve et/gıda tedarikini üstlendi.`;
    } else if (requestType === "kutuphane") {
      this.state.upgrades.library = Math.min(3, this.state.upgrades.library + 1);
      resultMessage = `${donor.name} kütüphanemize nadir yazmalar ve tefsir külliyatı bağışladı.`;
    } else if (requestType === "akilliTahta") {
      this.state.upgrades.smartBoard = Math.min(3, this.state.upgrades.smartBoard + 1);
      resultMessage = `${donor.name} sınıflara akıllı tahta ve fiber altyapı döşetti.`;
    } else if (requestType === "binaRenovasyon") {
      this.state.upgrades.officeFurnishing = Math.min(3, this.state.upgrades.officeFurnishing + 1);
      resultMessage = `${donor.name} tarihi binamızın ahşap tefrişat ve restorasyonunu yaptırdı.`;
    } else if (requestType === "kamuTahsisi") {
      this.state.budget += 60000;
      resultMessage = `${donor.name} bakanlık gençlik fonundan kurumumuza 60.000 ₺ proje hibesi çıkarttı.`;
    } else if (requestType === "konferansButcesi") {
      this.state.budget += 35000;
      this.state.reputation += 1;
      resultMessage = `${donor.name} uluslararası sempozyum bütçesi için 35.000 ₺ tahsis etti. İtibarımız +1 arttı!`;
    }

    donor.trustScore = Math.min(98, donor.trustScore + 4);
    this.saveToStorage();
    return { success: true, message: resultMessage };
  }

  // ==================== BİNA VE YURT PAZARI METOTLARI ====================
  rentBuilding(buildingId) {
    if (typeof INSTITUTION_BUILDINGS_DATA === "undefined") {
      return { success: false, message: "Bina verisi yüklenemedi." };
    }
    const bldg = INSTITUTION_BUILDINGS_DATA.find(b => b.id === buildingId);
    if (!bldg) return { success: false, message: "Bina bulunamadı." };

    if (bldg.type === "yalnizca_tahsis") {
      return { success: false, message: "5. Seviye Tarihi Medreseler parayla kiralanamaz! Yalnızca nüfuzlu bir hayırseverimiz vasıtasıyla tahsis ettirilebilir." };
    }

    this.state.currentBuildingId = buildingId;
    this.state.isBuildingAllocated = false;
    this.state.allocatedByDonorId = null;
    this.state.monthlyRent = bldg.monthlyRent;

    this.addNotification({
      title: "Yeni Kurum Binası Kiralandı",
      message: `${bldg.name} mülküne geçildi. Aylık kira bedeli: ${bldg.monthlyRent.toLocaleString('tr-TR')} ₺.`,
      type: "info"
    });
    this.saveToStorage();
    return { success: true, message: `${bldg.name} başarıyla kiralandı!` };
  }

  allocateBuilding(buildingId, donorId) {
    if (typeof INSTITUTION_BUILDINGS_DATA === "undefined") {
      return { success: false, message: "Bina verisi yüklenemedi." };
    }
    const bldg = INSTITUTION_BUILDINGS_DATA.find(b => b.id === buildingId);
    if (!bldg) return { success: false, message: "Bina bulunamadı." };

    if (!bldg.canBeAllocated) {
      return { success: false, message: "Bu bina tahsis edilemez, yalnızca kiralıktır." };
    }

    const donor = this.state.donors.find(d => d.id === donorId);
    if (!donor) return { success: false, message: "Tahsis talep edilecek hayırsever seçilmedi." };

    if ((donor.politicalPower || 1) < bldg.minDonorPoliticalPower) {
      return {
        success: false,
        message: `${donor.name} bu seviyedeki bir kamu binasının tahsisini sağlayacak bürokratik nüfuza (Gereken Güç: ${bldg.minDonorPoliticalPower}/5) sahip değil.`
      };
    }

    if (bldg.minReputationRequired && this.state.reputation < bldg.minReputationRequired) {
      return {
        success: false,
        message: `${bldg.name} tahsisi için kurumunuzun itibarı (${this.state.reputation}) yetersiz. Asgari ${bldg.minReputationRequired} itibar gereklidir.`
      };
    }

    if (donor.trustScore < 70) {
      return {
        success: false,
        message: `${donor.name} ile güven seviyeniz (%${donor.trustScore}) bu çapta bir tahsis lobisi talep etmek için yetersiz (En az %70 güven gereklidir).`
      };
    }

    this.state.currentBuildingId = buildingId;
    this.state.isBuildingAllocated = true;
    this.state.allocatedByDonorId = donorId;
    this.state.monthlyRent = 0; // KİRA SIFIRLANIR!
    this.state.reputation += (bldg.reputationBonus || 0);

    this.addNotification({
      title: `🏛️ Tarihî Bina Kurumumuza Tahsis Edildi!`,
      message: `${donor.name} devreye girdi ve Vakıflar Genel Müdürlüğü / Milli Emlak nezdinde lobi yaparak ${bldg.name} mülkünü 49 yıllığına bedelsiz (0 ₺ kira) kurumumuza tahsis ettirdi! İtibarımız +${bldg.reputationBonus} puan yükseldi!`,
      type: "success"
    });
    this.saveToStorage();
    return {
      success: true,
      message: `${donor.name} himayesiyle ${bldg.name} bedelsiz tahsis edildi! Kira gideri 0 ₺ oldu!`
    };
  }

  upgradeDorm(dormId) {
    if (typeof DORM_BUILDINGS_DATA === "undefined") {
      return { success: false, message: "Yurt verisi yüklenemedi." };
    }
    const dorm = DORM_BUILDINGS_DATA.find(d => d.id === dormId);
    if (!dorm) return { success: false, message: "Yurt modeli bulunamadı." };

    this.state.currentDormId = dormId;
    this.state.dormStatus.capacity = dorm.capacity;
    this.state.dormStatus.monthlyMaintenanceCost = dorm.monthlyCost;

    this.addNotification({
      title: "Talebe Yurdu Kapasitesi Güncellendi",
      message: `${dorm.name} modeline geçildi. Yatak kapasitesi: ${dorm.capacity}, aylık gider: ${dorm.monthlyCost.toLocaleString('tr-TR')} ₺.`,
      type: "info"
    });
    this.saveToStorage();
    return { success: true, message: `${dorm.name} aktif edildi! Kapasite: ${dorm.capacity} yatak.` };
  }

  // Talebe Kabulü (Yıllık Kontenjan Sınırıyla: 15-40 Talebe)
  admitCandidate(candidateId, track = "standart") {
    const quota = this.getAnnualQuota();
    const activeThisYear = this.state.students.filter(
      s => s.status === "active" && s.enrollmentYear === this.state.academicYear
    );

    if (activeThisYear.length >= quota) {
      return { success: false, message: `Kontenjan doldu! Bu yılın kontenjanı ${quota} talebedir.` };
    }

    const candidate = this.state.candidatesPool.find(c => c.id === candidateId);
    if (!candidate) return { success: false, message: "Aday bulunamadı." };

    candidate.status = "active";
    candidate.track = track;
    this.state.students.push(candidate);
    this.state.candidatesPool = this.state.candidatesPool.filter(c => c.id !== candidateId);

    this.state.dormStatus.occupancy = this.state.students.filter(s => s.status === "active").length;
    this.saveToStorage();

    return {
      success: true,
      message: `${candidate.fullName} kuruma kabul edildi. (${activeThisYear.length + 1} / ${quota})`
    };
  }

  // Kalan Kontenjanı İstidada Göre Otomatik Doldur (Beyoğlu İHL ekibi önceliğiyle)
  autoFillRemainingQuota() {
    const quota = this.getAnnualQuota();
    const activeThisYear = this.state.students.filter(
      s => s.status === "active" && s.enrollmentYear === this.state.academicYear
    );
    const needed = quota - activeThisYear.length;
    if (needed <= 0) return { count: 0, message: `Kontenjan zaten doludur (${quota}/${quota}).` };

    const sorted = [...this.state.candidatesPool].sort((a, b) => {
      let scoreA = a.talent + (a.highSchoolTier === "prestij" ? 15 : 0) + (10000 / a.yksRank);
      let scoreB = b.talent + (b.highSchoolTier === "prestij" ? 15 : 0) + (10000 / b.yksRank);
      return scoreB - scoreA;
    });

    let toAdmit = [];
    if (this.state.genderMode !== "female") {
      const alreadyAdmittedBeyoglu = activeThisYear.filter(
        s => s.highSchool && s.highSchool.includes("Beyoğlu")
      ).length;
      const neededBeyoglu = Math.max(0, 2 - alreadyAdmittedBeyoglu);

      const beyogluPool = sorted.filter(c => c.highSchool && c.highSchool.includes("Beyoğlu"));
      const nonBeyogluPool = sorted.filter(c => !c.highSchool || !c.highSchool.includes("Beyoğlu"));

      const pickedBeyoglu = beyogluPool.slice(0, Math.min(needed, neededBeyoglu));
      const remainingNeeded = needed - pickedBeyoglu.length;
      const rest = [...beyogluPool.slice(pickedBeyoglu.length), ...nonBeyogluPool].slice(0, remainingNeeded);
      toAdmit = [...pickedBeyoglu, ...rest];
    } else {
      toAdmit = sorted.slice(0, needed);
    }

    toAdmit.forEach(c => {
      c.status = "active";
      this.state.students.push(c);
    });

    const admittedIds = new Set(toAdmit.map(c => c.id));
    this.state.candidatesPool = this.state.candidatesPool.filter(c => !admittedIds.has(c.id));

    this.state.dormStatus.occupancy = this.state.students.filter(s => s.status === "active").length;
    this.saveToStorage();

    return {
      count: toAdmit.length,
      message: `${toAdmit.length} talebe kriterlere ve istidat puanına göre yerleştirildi (${quota}/${quota} Tamamlandı).`
    };
  }

  // Hoca Kadroya Kat (Pazar Kiralama)
  hireScholar(scholarId) {
    let pool = this.state.genderMode === "female" ? SCHOLARS_DATA_FEMALE : SCHOLARS_DATA_MALE;
    if (this.state.scholarsMarket && this.state.scholarsMarket.length > 0) {
      pool = [...this.state.scholarsMarket, ...pool];
    }
    const scholar = pool.find(s => s.id === scholarId || String(s.id) === String(scholarId));
    if (!scholar) return { success: false, message: "Hoca bulunamadı." };

    const reqRep = scholar.minReputationRequired !== undefined ? scholar.minReputationRequired : (scholar.minReputation || 20);
    if (this.state.reputation < reqRep) {
      return {
        success: false,
        message: `${scholar.title} ${scholar.name} teklifinizi geri çevirdi: "Kurumunuzun akademik itibarı (Mevcut: ${this.state.reputation}) henüz benim tedrisatım için yeterli olgunlukta değildir (Gereken İtibar: ${reqRep})."`
      };
    }

    if (this.state.budget < scholar.monthlySalary * 2) {
      return {
        success: false,
        message: `Bütçeniz kafi değil! ${scholar.name} aylık ${scholar.monthlySalary.toLocaleString('tr-TR')} ₺ telif talep ediyor.`
      };
    }

    const alreadyHired = this.state.hiredScholars.find(h => h.scholarId === scholarId);
    if (alreadyHired) {
      return { success: false, message: "Bu hocamız zaten kadromuzda derse girmektedir." };
    }

    this.state.hiredScholars.push({
      scholarId: scholar.id,
      name: scholar.name,
      title: scholar.title,
      specialty: scholar.specialty,
      monthlySalary: scholar.monthlySalary,
      expertiseScore: scholar.expertiseScore,
      attendanceRate: scholar.attendanceRate || 98,
      studentApprovalRate: scholar.studentApprovalRate || 94,
      gender: scholar.gender
    });

    this.saveToStorage();
    return {
      success: true,
      message: `${scholar.title} ${scholar.name} tedrisat kadromuza dahil oldu.`
    };
  }

  // Yurt Memnuniyeti
  updateMonthlyStudentSatisfaction() {
    let delta = Math.floor(Math.random() * 5) - 2;
    if (this.state.difficultyLevel === "zorlayici") delta -= 1;
    if (this.state.upgrades.dormDining === 3) delta += 2;
    if (this.state.upgrades.library >= 2) delta += 1;

    this.state.students.forEach(st => {
      if (st.status === "active") {
        let pDelta = (delta + (Math.floor(Math.random() * 3) - 1)) * st.emotionalSensitivity;
        st.satisfaction = Math.max(35, Math.min(92, Math.round(st.satisfaction + pDelta)));
      }
    });

    const active = this.state.students.filter(s => s.status === "active");
    if (active.length > 0) {
      this.state.dormStatus.satisfaction = Math.round(active.reduce((a, b) => a + b.satisfaction, 0) / active.length);
    }
  }

  // Kardeş Kurumlar
  updatePeerInstitutions() {
    if (!this.state.peerInstitutions) return;
    this.state.peerInstitutions.forEach(peer => {
      Object.keys(peer.branchScores).forEach(b => {
        const d = Math.floor(Math.random() * 3) - 1;
        peer.branchScores[b] = Math.max(30, Math.min(96, peer.branchScores[b] + d));
      });
      // İSAR ve İSM yüksek kalır; YSV, Medrese-i Aliyye ve Darulhikme rekabetle büyür
      if (peer.id === "isar" || peer.id === "ism") {
        peer.reputation = Math.max(85, Math.min(96, peer.reputation + (Math.random() > 0.5 ? 1 : -1)));
      } else {
        const growth = Math.floor(Math.random() * 4) + 1;
        peer.reputation = Math.min(90, peer.reputation + growth);
      }
    });
  }

  // Düğün Davetiyesi
  triggerMarriageInvitation(graduate) {
    this.state.activeModalEvent = {
      type: "wedding_invitation",
      title: "💍 Mezunumuzun Düğün Davetiyesi!",
      message: `${graduate.enrollmentYear}. dönem mezunumuz ${graduate.fullName} dünya evine giriyor. Sizi onur konuğu olarak merasime davet ediyor.\n\n"Hocam, tedrisatınızda yediğimiz ekmeğin ve aldığımız feyzin hakkı ödenmez. Düğünümüzde bulunmanız bizim için büyük bir şereftir."`,
      graduate: graduate,
      options: [
        {
          label: "Düğüne Bizzat İştirak Et (Altın Tak: 8.000 ₺)",
          action: () => {
            if (this.state.budget >= 8000) {
              this.state.budget -= 8000;
              this.state.reputation = Math.min(98, this.state.reputation + 0.5);
              this.addNotification({
                title: "Düğün Merasimine Katıldınız",
                message: `${graduate.fullName}'in nikahına katıldınız. Mezunların kuruma olan vefa bağı kuvvetlendi.`,
                type: "success"
              });
            } else {
              this.addNotification({
                title: "Kasada Bütçe Yetersiz",
                message: "Tebrik mesajı iletildi.",
                type: "warning"
              });
            }
            this.state.activeModalEvent = null;
            this.saveToStorage();
          }
        },
        {
          label: "Tebrik Telgrafı ve Çiçek Gönder (1.500 ₺)",
          action: () => {
            this.state.budget -= 1500;
            this.addNotification({
              title: "Tebrik Çiçeği Gönderildi",
              message: `${graduate.fullName}'e kurum adına çiçek ulaştırıldı.`,
              type: "info"
            });
            this.state.activeModalEvent = null;
            this.saveToStorage();
          }
        },
        {
          label: "Yoğunluk Sebebiyle Katılamayacağını Bildir",
          action: () => {
            this.state.activeModalEvent = null;
            this.saveToStorage();
          }
        }
      ]
    };
  }

  addNotification(notif) {
    this.state.notifications.unshift({
      id: Date.now() + Math.random(),
      title: notif.title,
      message: notif.message,
      type: notif.type || "info",
      date: notif.date || `${this.state.currentDay} ${MONTH_NAMES[this.state.currentMonthIndex]}`
    });
    if (this.state.notifications.length > 40) {
      this.state.notifications.pop();
    }
  }

  // Öğrenci İhtisas / Normal Tedrisat Tasnif Metodları
  updateStudentTrack(studentId, track) {
    const st = this.state.students.find(s => s.id === studentId);
    if (st) {
      st.track = track;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  batchUpdateStudentTracks(tracksMap) {
    let updatedCount = 0;
    let ihtisasCount = 0;
    Object.keys(tracksMap).forEach(stId => {
      const st = this.state.students.find(s => s.id === stId);
      if (st) {
        st.track = tracksMap[stId];
        if (st.track === "ihtisas") ihtisasCount++;
        updatedCount++;
      }
    });
    this.state.hasDoneTrackSelectionThisYear = true;
    this.addNotification({
      title: "Talebe İhtisas Tasnif Şûrası Tamamlandı",
      message: `${updatedCount} talebenin tedrisat programı tasnif edildi. Toplam ${ihtisasCount} talebe İhtisas Programına (İleri Düzey Metinler & Mütalaa Halkası) dahil edildi.`,
      type: "success"
    });
    this.saveToStorage();
    return { updatedCount, ihtisasCount };
  }

  // ==================== YURT HADİSELERİ VE ARIZA YÖNETİMİ ====================
  processDailyDormIncidents() {
    if (typeof DORM_INCIDENTS_CATALOG === "undefined" || DORM_INCIDENTS_CATALOG.length === 0) return;

    if (!this.state.resolvedIncidentsHistory) this.state.resolvedIncidentsHistory = [];
    if (!this.state.monthlyDormIncidentsLog) this.state.monthlyDormIncidentsLog = [];

    const active = this.state.students.filter(s => s.status === "active");

    // Tekrara düşmemek için bu dönem henüz çıkmamış bir arıza seç
    let available = DORM_INCIDENTS_CATALOG.filter(inc => !this.state.resolvedIncidentsHistory.includes(inc.id));
    if (available.length === 0) available = [...DORM_INCIDENTS_CATALOG];

    // Hanımefendiler modunda Beyoğlu İHL hadiselerini hariç tut
    if (this.state.genderMode === "female") {
      available = available.filter(inc => !inc.isBeyogluIncident);
    } else {
      // Erkek modunda ve en az 2 Beyoğlu talebesi varsa, Beyoğlu ekibi vakalarına %35 ağırlık ver
      const beyogluActive = active.filter(s => s.highSchool && s.highSchool.includes("Beyoğlu"));
      if (beyogluActive.length >= 2 && Math.random() < 0.35) {
        const beyogluOnly = available.filter(inc => inc.isBeyogluIncident);
        if (beyogluOnly.length > 0) available = beyogluOnly;
      }
    }

    const incident = available[Math.floor(Math.random() * available.length)];

    this.state.resolvedIncidentsHistory.push(incident.id);
    if (this.state.resolvedIncidentsHistory.length > 45) {
      this.state.resolvedIncidentsHistory.shift();
    }

    // Yurt müdürünün çözme başarısı (yetkinliğe göre %85 vs %50)
    const ym = this.state.dormManager;
    const resolutionChance = ym ? 0.85 : 0.50;
    const isHandled = Math.random() < resolutionChance;

    const cost = incident.repairCost || 0;
    if (cost > 0 && isHandled) {
      this.state.budget = Math.max(0, this.state.budget - cost);
    }

    // Eğer hadise kural ihlali veya yüz kızartıcı bir suç ise talebe dosyasına ANINDA işlenir
    let involvedStudent = null;
    if (incident.isDisciplinary && active.length > 0) {
      if (incident.isBeyogluIncident) {
        const beyogluActive = active.filter(s => s.highSchool && s.highSchool.includes("Beyoğlu"));
        involvedStudent = beyogluActive.length > 0
          ? beyogluActive[Math.floor(Math.random() * beyogluActive.length)]
          : active[Math.floor(Math.random() * active.length)];
      } else {
        involvedStudent = active[Math.floor(Math.random() * active.length)];
      }

      if (!involvedStudent.disciplineRecord) involvedStudent.disciplineRecord = [];

      involvedStudent.disciplineRecord.unshift({
        date: `${this.state.currentDay} ${MONTH_NAMES[this.state.currentMonthIndex]} (${this.state.academicYear}. Yıl)`,
        title: incident.recordTitle || incident.title,
        notes: incident.desc,
        severity: incident.severity,
        actionTaken: isHandled ? "Yurt Müdürü tarafından resmi tutanak tanzim edildi ve ikaz verildi." : "İdareye havale edildi."
      });

      involvedStudent.warningCount = (involvedStudent.warningCount || 0) + 1;
      involvedStudent.moralStatus = incident.severity >= 4 ? "zayıf" : "orta";
      involvedStudent.stressLevel = Math.min(95, involvedStudent.stressLevel + (incident.stressDelta || 12));
      if (incident.severity >= 4) {
        involvedStudent.hasSeriousMisconduct = true;
      }
    }

    // Genel sosyallik ve stres tesirleri
    if (incident.stressDelta) {
      active.forEach(st => {
        st.stressLevel = Math.min(95, Math.max(5, st.stressLevel + Math.round(incident.stressDelta * 0.4)));
      });
    }
    if (incident.cohesionDelta) {
      this.state.socialCohesion = Math.min(100, Math.max(15, (this.state.socialCohesion || 55) + incident.cohesionDelta));
    }

    const logEntry = {
      id: incident.id,
      day: this.state.currentDay,
      month: MONTH_NAMES[this.state.currentMonthIndex],
      title: incident.title,
      desc: incident.desc,
      category: incident.category,
      cost: cost,
      isDisciplinary: incident.isDisciplinary,
      involvedStudentName: involvedStudent ? involvedStudent.fullName : null,
      isHandled: isHandled,
      statusText: isHandled ? "✅ Yurt Müdürü Çözdü" : "⚠️ Müdahale Gecikti / İdareye İntikal Etti"
    };

    this.state.monthlyDormIncidentsLog.unshift(logEntry);

    this.addNotification({
      title: `🏠 Yurt Hadisesi: ${incident.title}`,
      message: `${incident.desc} ${isHandled ? 'Yurt müdürü derhal müdahale etti.' : 'Müdahale gecikti.'} ${involvedStudent ? `(İlgili Talebe: ${involvedStudent.fullName} - Dosyasına İşlendi)` : ''}`,
      type: incident.isDisciplinary ? "warning" : "info"
    });
  }

  // Yurt Müdürü Aylık Büyük Tadilat Teklifi
  prepareMonthlyDormMaintenanceProposal() {
    const proposals = [
      { id: "prop_kazan", title: "Kazan Dairesi & Kalorifer Tesisatı Yenilemesi", cost: 50000, desc: "Eskiyen boru hatlarının çelik borularla değişimi ve kalorifer veriminin artırılması.", effect: "Arıza riski %40 azalır, Talebe memnuniyeti +8." },
      { id: "prop_hasoda", title: "Hasoda & Şark Köşesi Çay Ocağı Tefrişatı", cost: 40000, desc: "Talebelerin akşam mütalaası yapabileceği geleneksel sedirli ve semaverli hasoda tefrişi.", effect: "Uhuvvet & Sosyallik +15, Talebe stresi -10." },
      { id: "prop_cati", title: "Kütüphane Çatı İzolasyonu ve Nem Bariyeri", cost: 35000, desc: "Çatı kalkanlarının su yalıtımı ve nem cihazı montajı.", effect: "Vakıf kitapları koruma altına alınır, Arıza riski -25%." },
      { id: "prop_mutfak", title: "Endüstriyel Mutfak Revizyonu ve Soğuk Hava Deposu", cost: 55000, desc: "Aşçı ünitesine paslanmaz teçhizat ve dijital soğutucu ilavesi.", effect: "Yemek hijyeni tavan yapar (+15), Aşçı morali artar." },
      { id: "prop_guvenlik", title: "Yangın Algılama ve Akıllı Güvenlik Turnikeleri", cost: 28000, desc: "Tüm katlara optik duman sensörü ve kartlı giriş otomasyonu.", effect: "Yurt güvenliği +25, Kaçak girişler sıfırlanır." }
    ];

    const idx = (this.state.currentMonthIndex + this.state.academicYear) % proposals.length;
    this.state.pendingDormMaintenanceProposal = proposals[idx];
  }

  approveDormMaintenanceProposal(proposalId) {
    const p = this.state.pendingDormMaintenanceProposal;
    if (!p || p.id !== proposalId) return { success: false, message: "Teklif bulunamadı." };

    if (this.state.budget < p.cost) {
      return { success: false, message: "Vakıf kasasında yeterli bütçe bulunmuyor." };
    }

    this.state.budget -= p.cost;
    this.state.socialCohesion = Math.min(100, (this.state.socialCohesion || 55) + 12);
    this.state.dormStatus.satisfaction = Math.min(100, this.state.dormStatus.satisfaction + 10);
    this.state.pendingDormMaintenanceProposal = null;

    this.addNotification({
      title: `🛠️ Yurt Tadilat Ödeneği Tahsis Edildi: ${p.title}`,
      message: `${p.cost.toLocaleString('tr-TR')} ₺ bütçe ayrılarak tadilat başlatıldı. Uhuvvet ve memnuniyet yükseldi.`,
      type: "success"
    });

    this.saveToStorage();
    return { success: true, message: "Tadilat projesi onaylandı." };
  }

  evaluateDormManager(actionType) {
    const ym = this.state.dormManager;
    if (!ym) return { success: false, message: "Atanmış yurt müdürü bulunmuyor." };

    if (actionType === "praise") {
      this.state.reputation = Math.min(98, this.state.reputation + 2);
      this.state.socialCohesion = Math.min(100, (this.state.socialCohesion || 55) + 4);
      this.addNotification({
        title: `👏 Yurt Müdürü Takdir Edildi`,
        message: `${ym.name} gösterdiği gayret ve arızalara hızlı müdahalesi sebebiyle tebrik edildi. İtibar +2.`,
        type: "success"
      });
    } else {
      ym.warningCount = (ym.warningCount || 0) + 1;
      this.addNotification({
        title: `⚠️ Yurt Müdürüne İdari İhtar Verildi`,
        message: `${ym.name}'e yurttaki aksaklıklar ve geciken tamiratlar sebebiyle resmi ikaz tebliğ edildi.`,
        type: "warning"
      });
    }

    this.saveToStorage();
    return { success: true };
  }

  // ==================== KONFERANS VE İLİM ETKİNLİĞİ PLANLAMA ====================
  scheduleConference({ speaker, title, day, monthIndex, location, targetGrades, cost }) {
    const conf = {
      id: "conf_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      speaker: speaker,
      title: title,
      day: parseInt(day) || 15,
      monthIndex: parseInt(monthIndex) !== undefined ? parseInt(monthIndex) : this.state.currentMonthIndex,
      location: location || "Medrese Konferans Salonu",
      targetGrades: targetGrades && targetGrades.length > 0 ? targetGrades : ["all"],
      cost: parseInt(cost) || 12000,
      completed: false
    };

    if (!this.state.scheduledConferences) this.state.scheduledConferences = [];
    this.state.scheduledConferences.push(conf);

    if (conf.cost > 0 && this.state.budget >= conf.cost) {
      this.state.budget -= conf.cost;
    }

    this.addNotification({
      title: `🎙️ Yeni Konferans Planlandı: ${speaker}`,
      message: `'${title}' başlıklı konferans ${conf.day} ${MONTH_NAMES[conf.monthIndex]} tarihine takvime işlendi.`,
      type: "info"
    });

    this.saveToStorage();
    return conf;
  }

  // ==================== HOCA PAZARINA ÖZEL HOCA EKLEME ====================
  addCustomScholarToMarket({ name, title, branch, ageCategory, experienceLevel, proximityDifficulty, gender }) {
    const exp = parseInt(experienceLevel) || 3;
    const prox = parseInt(proximityDifficulty) || 2;
    const ageCat = ageCategory || "olgun";

    // Min İtibar Hesabı
    const ageBonus = ageCat === "pir" ? 12 : (ageCat === "duayen" ? 8 : (ageCat === "olgun" ? 4 : 0));
    const minRep = Math.min(95, Math.max(20, 25 + (exp * 8) + (prox * 6) + ageBonus));

    // Aylık Maaş / Telif Hesabı
    const baseSalary = 16000;
    const expMult = [1.0, 1.4, 2.0, 2.8, 4.0][exp - 1] || 2.0;
    const proxMult = [1.0, 1.15, 1.4, 2.0, 3.2][prox - 1] || 1.2;
    const ageSalaryBonus = ageCat === "pir" ? 8000 : (ageCat === "duayen" ? 5000 : 0);
    const monthlySalary = Math.round((baseSalary * expMult * proxMult) + ageSalaryBonus);

    const proxLabels = ["Kurum Yanı (Fatih)", "İstanbul İçi", "Marmara / Hızlı Tren", "Şehirlerarası Uçak", "Yurt Dışı / Uluslararası"];
    const ageLabels = {
      genc: "28-35 Yaş (Genç Akademisyen)",
      olgun: "36-50 Yaş (Olgun Müderris)",
      duayen: "51-65 Yaş (Duayen Âlim)",
      pir: "65+ Yaş (Şeyhü'l-Kurra / Pir)"
    };

    const scholarObj = {
      id: "custom_sch_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      name: name,
      title: title || (exp >= 4 ? "Prof. Dr." : (exp >= 3 ? "Doç. Dr." : "Dr. Öğr. Üyesi")),
      branch: branch || "Fıkıh ve Usul",
      ageCategory: ageCat,
      ageCategoryLabel: ageLabels[ageCat] || "Olgun Müderris",
      experienceLevel: exp,
      proximityDifficulty: prox,
      proximityLabel: proxLabels[prox - 1] || "İstanbul İçi",
      specialty: branch || "Fıkıh ve Usul",
      monthlySalary: monthlySalary,
      minReputation: minRep,
      minReputationRequired: minRep,
      gender: gender || this.state.genderMode,
      isHired: false,
      pedagogicalPower: 55 + (exp * 9),
      academicDepth: 60 + (exp * 8) + (ageCat === "pir" ? 10 : 5),
      prestige: 15 + exp * 15,
      bio: `Kullanıcı tarafından davet edilen özel müderris. ${prox === 5 ? 'Yurt dışından gelen uluslararası misafir âlim statüsündedir.' : 'Kurum bünyesinde ihtisas halkalarına rehberlik etmektedir.'}`
    };

    if (!this.state.scholarsMarket || this.state.scholarsMarket.length === 0) {
      this.state.scholarsMarket = typeof SCHOLARS_DATA !== "undefined" ? JSON.parse(JSON.stringify(SCHOLARS_DATA)) : [];
    }
    this.state.scholarsMarket.unshift(scholarObj);

    this.addNotification({
      title: `🎖️ Hoca Pazarına Eklendi: ${scholarObj.title} ${scholarObj.name}`,
      message: `${scholarObj.branch} sahasındaki hoca pazara eklendi. (Gereken İtibar: ${minRep}, Maaş: ${monthlySalary.toLocaleString('tr-TR')} ₺/ay)`,
      type: "success"
    });

    this.saveToStorage();
    return scholarObj;
  }

  // ==================== MÜFREDAT HAVUZUNA DERS EKLEME & 60% KURALI ====================
  addCustomCourseToPool(courseData) {
    const all = this.getAllCourses();
    const newCourse = {
      id: Date.now(),
      code: (courseData.code || "ÖZEL-" + (all.length + 1)).trim().toUpperCase(),
      name: courseData.name.trim(),
      textbook: (courseData.textbook || courseData.name).trim(),
      branch: courseData.branch || "Fıkıh ve Usul",
      category: "islami_ilimler",
      classYear: courseData.classYear !== undefined ? parseInt(courseData.classYear) : -1,
      semester: courseData.semester || "guz",
      weeklyHours: parseInt(courseData.weeklyHours) || 3,
      credit: 2,
      difficulty: parseInt(courseData.difficulty) || 3,
      ottomanLevel: parseInt(courseData.ottomanLevel) || 2,
      isClassicMethod: true,
      description: courseData.description || "Kullanıcı tarafından müfredata dahil edilen ihtisas dersi.",
      impact: { fıkıh: 5, arapcaDil: 4, kelamFelsefe: 2, hadisTefsir: 2, sosyalBilimler: 2, sanatKultur: 0 }
    };

    if (!this.state.customCurriculum || this.state.customCurriculum.length === 0) {
      this.state.customCurriculum = typeof COURSES_DATA !== "undefined" ? JSON.parse(JSON.stringify(COURSES_DATA)) : [];
    }
    this.state.customCurriculum.push(newCourse);

    this.addNotification({
      title: `📚 Yeni Seminer Havuzda: [${newCourse.code}] ${newCourse.name}`,
      message: `Okutulacak Metin: '${newCourse.textbook}'. Ders artık seminer atama masasında mevcuttur.`,
      type: "success"
    });

    this.saveToStorage();
    return newCourse;
  }

  // Tevâzün Kuralı Kontrolü (Maksimum %60 Branş Sınırı)
  validateCurriculumBranchCap(targetClassYear, targetBranch, additionalHours = 0) {
    const all = this.getAllCourses();
    const yr = parseInt(targetClassYear);
    if (yr === -1) return { valid: true };

    const classCourses = all.filter(c => c.classYear === yr);
    let branchHours = additionalHours;
    let totalHours = additionalHours;

    classCourses.forEach(c => {
      const h = parseInt(c.weeklyHours) || 3;
      totalHours += h;
      if (c.branch === targetBranch) {
        branchHours += h;
      }
    });

    if (totalHours <= 4) return { valid: true, ratio: branchHours / Math.max(1, totalHours) };

    const ratio = branchHours / totalHours;
    if (ratio > 0.601) {
      return {
        valid: false,
        ratio: ratio,
        branch: targetBranch,
        message: `Tevâzün İlkesi: ${targetBranch} dersleri bu sınıf seviyesinin toplam ders saatinin %${Math.round(ratio * 100)}'ini oluşturuyor. Osmanlı medrese nizamında tek bir ilim dalı %60'ı aşamaz.`
      };
    }
    return { valid: true, ratio: ratio };
  }

  // 3 İdeal Osmanlı Medresesi Senaryosunu Uygulama
  applyOttomanScenario(scenarioKey) {
    if (typeof OTTOMAN_SCENARIOS === "undefined" || !OTTOMAN_SCENARIOS[scenarioKey]) {
      return { success: false, message: "Senaryo bulunamadı." };
    }
    const scenario = OTTOMAN_SCENARIOS[scenarioKey];

    if (!this.state.customCurriculum || this.state.customCurriculum.length === 0) {
      this.state.customCurriculum = typeof COURSES_DATA !== "undefined" ? JSON.parse(JSON.stringify(COURSES_DATA)) : [];
    }

    // Önce tüm dersleri müfredat dışı yap (-1)
    this.state.customCurriculum.forEach(c => {
      c.classYear = -1;
    });

    // Senaryo derslerini ata
    Object.keys(scenario.defaultAssignments).forEach(cidStr => {
      const cid = parseInt(cidStr);
      const assignment = scenario.defaultAssignments[cid];
      const targetCourse = this.state.customCurriculum.find(c => c.id === cid);
      if (targetCourse) {
        targetCourse.classYear = assignment.classYear;
        targetCourse.semester = assignment.semester;
        targetCourse.weeklyHours = assignment.weeklyHours;
      }
    });

    this.state.activeOttomanScenario = scenarioKey;
    this.state.reputation = Math.min(98, this.state.reputation + (scenario.reputationBonus || 8));

    this.addNotification({
      title: `📜 Osmanlı Medresesi Senaryosu Uygulandı: ${scenario.shortTitle}`,
      message: `${scenario.name} müfredatı devreye alındı. Kadim eser hiyerarşisi oluşturuldu. Kurum İtibarı +${scenario.reputationBonus || 8}.`,
      type: "success"
    });

    this.saveToStorage();
    return { success: true, scenario };
  }

  // 4. Sınıf Alan Seçimi (Branşlaşma)
  setStudentSpecializationField(studentId, fieldName) {
    const st = this.state.students.find(s => s.id === studentId);
    if (!st) return false;
    st.specializationField = fieldName;
    if (st.currentClassYear === 4) {
      st.hasAdvancedReadingCircle = true;
      st.academicCompetence += 6;
    }
    this.saveToStorage();
    return true;
  }

  saveToStorage() {
    try {
      localStorage.setItem("darul_ilim_savegame_v2", JSON.stringify(this.state));
    } catch (e) {
      console.warn("Kayıt hatası:", e);
    }

    // Buluta Otomatik Senkronizasyon (Eğer Google ile giriş yapılmışsa)
    if (typeof syncGameToCloud === "function") {
      syncGameToCloud();
    }
  }

  loadFromCloudData(cloudState) {
    if (cloudState && typeof cloudState === "object") {
      this.state = cloudState;
      try {
        localStorage.setItem("darul_ilim_savegame_v2", JSON.stringify(this.state));
      } catch (e) {
        console.warn("Yerel kayıt güncellenemedi:", e);
      }
      return true;
    }
    return false;
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem("darul_ilim_savegame_v2");
      if (data) {
        this.state = JSON.parse(data);
        // İhtisas kaldırıldı: Tüm öğrenciler normal kategoride eğitime devam eder
        if (this.state && Array.isArray(this.state.students)) {
          this.state.students.forEach(st => {
            st.track = "normal";
          });
        }

        // Beyoğlu Anadolu İHL tayfası geriye dönük uyumluluk güvencesi (erkek modu için en az 2 talebe)
        if (this.state && this.state.genderMode !== "female" && Array.isArray(this.state.students)) {
          const beyogluCount = this.state.students.filter(
            s => s.status === "active" && s.highSchool && s.highSchool.includes("Beyoğlu")
          ).length;
          if (beyogluCount < 2) {
            const activeBoys = this.state.students.filter(s => s.status === "active");
            for (let i = 0; i < Math.min(activeBoys.length, 2 - beyogluCount); i++) {
              activeBoys[i].highSchool = "Beyoğlu Anadolu İmam Hatip Lisesi";
              activeBoys[i].highSchoolTier = "prestij";
              activeBoys[i].isBeyogluCrew = true;
            }
          }
        }
        return true;
      }
    } catch (e) {
      console.warn("Kayıt okuma hatası:", e);
    }
    return false;
  }

  resetGame() {
    localStorage.removeItem("darul_ilim_savegame_v2");
    this.initDefaultState();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DarulIlimGame, MONTH_NAMES, CURRICULUM_AND_STUDENT_DEMANDS_100 };
}
