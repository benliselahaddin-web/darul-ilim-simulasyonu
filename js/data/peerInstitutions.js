// Kardeş Kurumlar ve Dinamik Hizmet Rekabeti
// İSAR (88) ve İSM (87) zirve kurumlar; YSV (38), Medrese-i Âliyye (36) ve Dârü'l-Hikme (35) bizim seviyemizde başlar.
// Yıllık rekabette puanlar dinamik olarak yükselir ve tatlı bir hizmet rekabeti yürütülür.

const PEER_INSTITUTIONS_DATA = [
  {
    id: "isar",
    name: "İSAR (İstanbul Araştırma ve Eğitim Vakfı)",
    motto: "Gelenekten Geleceğe Disiplinlerarası İlim ve Hikmet",
    foundedYear: 2009,
    location: "Üsküdar / İstanbul (Özbekler Tekkesi)",
    reputation: 88,
    branchScores: {
      fıkıh: 85,
      hadisTefsir: 84,
      kelamFelsefe: 92,
      sosyalBilimler: 94,
      arapcaDil: 90,
      sanatKultur: 80
    },
    strengthAreas: ["Disiplinlerarası Metot", "Yurt Dışı Doktora Ağı", "Modern Sosyal Teori"],
    weaknesses: ["Klasik Medrese Usulü İcazet Geleneği"],
    alumniProfileSummary: "Mezunlarının büyük kısmı yurt dışında doktoralarını tamamlayıp Türkiye'nin önde gelen üniversitelerinde öğretim üyesi veya düşünce kuruluşlarında direktör olarak görev yapmaktadır.",
    recentAchievement: "Uluslararası Karşılaştırmalı Hukuk ve Ahlak Sempozyumu düzenledi.",
    alumniDistribution: {
      akademi: 38,
      mebOgretmen: 8,
      diyanet: 10,
      dusunceKurulusu: 22,
      ticaret: 6,
      basinYayin: 6,
      hukuk: 6,
      burokrasi: 4
    }
  },
  {
    id: "ism",
    name: "İSM (İlimler ve Sanatlar Merkezi)",
    motto: "Klasik Alet İlimlerinden Modern Düşünceye 3500 Saatlik Yolculuk",
    foundedYear: 2007,
    location: "Üsküdar / İstanbul (Atik Valide Medresesi)",
    reputation: 87,
    branchScores: {
      fıkıh: 89,
      hadisTefsir: 88,
      kelamFelsefe: 83,
      sosyalBilimler: 84,
      arapcaDil: 95,
      sanatKultur: 83
    },
    strengthAreas: ["3500 Saatlik Yoğun Arapça", "Klasik Metin Tahlili", "İlahiyatçı Yetiştirme"],
    weaknesses: ["Pozitif Bilimler Entegrasyonu"],
    alumniProfileSummary: "Arapça klasik metin okumalarında ve alet ilimlerinde son derece köklü. Mezunları hem ilahiyat fakültelerinde akademisyen hem de Diyanet teşkilatında üst düzey araştırmacıdır.",
    recentAchievement: "Yaz döneminde Ürdün ve Mısır klasik metin tahlili kampını tamamladı.",
    alumniDistribution: {
      akademi: 35,
      mebOgretmen: 14,
      diyanet: 20,
      dusunceKurulusu: 12,
      ticaret: 7,
      basinYayin: 5,
      hukuk: 4,
      burokrasi: 3
    }
  },
  {
    id: "ysv",
    name: "Yavuz Selim Vakfı (Dâru'l-Erkam Tedrisatı)",
    motto: "Asr-ı Saadet Ölçülerinde Salih ve Müttakî Bir Nesil",
    foundedYear: 1985,
    location: "Fatih / İstanbul",
    reputation: 38, // Bizim seviyemizde (~38) başlar
    branchScores: {
      fıkıh: 42,
      hadisTefsir: 44,
      kelamFelsefe: 32,
      sosyalBilimler: 30,
      arapcaDil: 40,
      sanatKultur: 33
    },
    strengthAreas: ["Kadim Medrese İcazeti", "Hafızlık ve Hadis Hıfzı", "Cami Kürsüleri & Vaizlik"],
    weaknesses: ["Modern Batı Felsefesi"],
    alumniProfileSummary: "Hafızlık altyapılı, kadim medrese usulünü ihya eden talebeler yetiştirir. Mezunları fıkıh fetvasında, cami kürsülerinde ve müftülüklerde hürmet görmektedir.",
    recentAchievement: "İstanbul Fatih merkezli yeni tedrisat halkalarını başlattı.",
    alumniDistribution: {
      akademi: 18,
      mebOgretmen: 22,
      diyanet: 34,
      dusunceKurulusu: 6,
      ticaret: 10,
      basinYayin: 4,
      hukuk: 2,
      burokrasi: 4
    }
  },
  {
    id: "medreseAliyye",
    name: "Medrese-i Âliyye İlim Vakfı",
    motto: "Osmanlı Medrese Mirasını Şerh ve Haşiyelerle Yaşatmak",
    foundedYear: 2012,
    location: "Fatih / İstanbul",
    reputation: 36, // Bizim seviyemizde (~36) başlar
    branchScores: {
      fıkıh: 40,
      hadisTefsir: 38,
      kelamFelsefe: 36,
      sosyalBilimler: 28,
      arapcaDil: 39,
      sanatKultur: 32
    },
    strengthAreas: ["Osmanlı Haşiye Tedrisatı", "Molla Hüsrev Metodolojisi", "Yazma Eser Tahkiki"],
    weaknesses: ["İngilizce Akademik Yayıncılık"],
    alumniProfileSummary: "Molla Hüsrev, Sa'd et-Teftazani ve Kadı Beydavi haşiyelerini satır satır okuyan talebeler mezun eder. Yazma eser tahkiklerinde uzmanlaşmaktadırlar.",
    recentAchievement: "Süleymaniye Kütüphanesi ile ortak yazma eser semineri başlattı.",
    alumniDistribution: {
      akademi: 28,
      mebOgretmen: 18,
      diyanet: 24,
      dusunceKurulusu: 8,
      ticaret: 8,
      basinYayin: 8,
      hukuk: 3,
      burokrasi: 3
    }
  },
  {
    id: "darulhikme",
    name: "Dârü'l-Hikme Düşünce ve Araştırma Merkezi",
    motto: "Felsefe, Sosyal Bilim ve İslam Düşüncesinin Kavşağı",
    foundedYear: 2015,
    location: "Kadıköy / İstanbul",
    reputation: 35, // Bizim seviyemizde (~35) başlar
    branchScores: {
      fıkıh: 30,
      hadisTefsir: 32,
      kelamFelsefe: 40,
      sosyalBilimler: 41,
      arapcaDil: 35,
      sanatKultur: 34
    },
    strengthAreas: ["Karşılaştırmalı Felsefe", "Eleştirel Teori", "Sosyal Bilimler Atölyesi"],
    weaknesses: ["Klasik Arapça İrap Tahlili"],
    alumniProfileSummary: "Sosyal teori, eleştirel düşünce ve felsefe ağırlıklı bir tedrisat uygular. Mezunları sosyoloji ve felsefe bölümlerinde yoğunlaşır.",
    recentAchievement: "Doğu-Batı Düşünce Diyaloğu Yıllığı'nı neşretti.",
    alumniDistribution: {
      akademi: 32,
      mebOgretmen: 12,
      diyanet: 6,
      dusunceKurulusu: 26,
      ticaret: 8,
      basinYayin: 9,
      hukuk: 4,
      burokrasi: 3
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PEER_INSTITUTIONS_DATA };
}
