// Kurum İdari ve Destek Personeli Havuzu (Müdür Yardımcıları, Yurt Müdürleri, Aşçılar, Temizlik)
// Erkek ve Kadın programlarına göre ayrılmıştır. Günümüz Türkiye'si piyasa maaş ve huzur hakları güncellenmiştir.

// --- MÜDÜR YARDIMCILARI (ERKEK) ---
const VICE_DIRECTORS_MALE = [
  {
    id: "m_yd_1",
    name: "Ömer Faruk Hoca",
    title: "Müdür Yardımcısı (Talebe Dostu)",
    gender: "male",
    monthlySalary: 52000,
    experience: 8,
    skills: ["Talebe Psikolojisi", "Manevi Sohbetler", "Stres Yönetimi", "Etkinlik Teşkilatı"],
    personality: "Talebelerle abi-kardeş hukuku kuran, gece etütlerini bizzat takip eden samimi bir teşkilatçı.",
    stressReductionBonus: 8,
    councilConnectionBonus: 5
  },
  {
    id: "m_yd_2",
    name: "Dr. Selim Mümtaz Bey",
    title: "Müdür Yardımcısı (Akademik & Disiplin)",
    gender: "male",
    monthlySalary: 58000,
    experience: 12,
    skills: ["Ders Programı Takibi", "YÖK/Akademi Protokolleri", "Ciddi İdare Disiplini"],
    personality: "Disiplinden taviz vermeyen, devamsızlık ve notları titizlikle denetleyen resmiyetçi bir bürokrat.",
    stressReductionBonus: 3,
    councilConnectionBonus: 8
  },
  {
    id: "m_yd_3",
    name: "Bilal Eren Bey",
    title: "Müdür Yardımcısı (Bürokrasi & Belediye Bağlantısı)",
    gender: "male",
    monthlySalary: 55000,
    experience: 10,
    skills: ["Belediye İlişkileri", "Kamu Tahsisleri", "Sponsorluk & Gezi Finansmanı"],
    personality: "Yerel yönetimlerle ve bakanlıklarla arası fevkalade iyi, gezileri ve etkinlikleri sponsorlara finanse ettiren bir isim.",
    stressReductionBonus: 6,
    councilConnectionBonus: 12
  }
];

// --- MÜDÜR YARDIMCILARI (KADIN) ---
const VICE_DIRECTORS_FEMALE = [
  {
    id: "f_yd_1",
    name: "Zeynep Betül Hanım",
    title: "Müdür Yardımcısı (Rehberlik & İrfan)",
    gender: "female",
    monthlySalary: 52000,
    experience: 9,
    skills: ["Kız Talebe Rehberliği", "Hassas İletişim", "Manevi Sohbetler", "Etkinlik Yönetimi"],
    personality: "Kız talebelerin her derdini dinleyen, stres anında çay-sohbet halkası kuran müşfik bir abla.",
    stressReductionBonus: 9,
    councilConnectionBonus: 5
  },
  {
    id: "f_yd_2",
    name: "Dr. Reyhan Şule Hanım",
    title: "Müdür Yardımcısı (Akademik Disiplin)",
    gender: "female",
    monthlySalary: 58000,
    experience: 11,
    skills: ["Müfredat Denetimi", "Kütüphane Sistemi", "Yüksek Not Takibi"],
    personality: "Kız talebelerin üniversite GANO ve kurum içi notlarını sıkı takip eden akademik bir idareci.",
    stressReductionBonus: 4,
    councilConnectionBonus: 7
  },
  {
    id: "f_yd_3",
    name: "Ayşe Serra Hanım",
    title: "Müdür Yardımcısı (Vakıf & Sosyal İlişkiler)",
    gender: "female",
    monthlySalary: 55000,
    experience: 10,
    skills: ["Bakanlık/Belediye Fonları", "Hanım Hayırsever Ağları", "Gezi Organizasyonları"],
    personality: "Belediyelerin kültür müdürlükleriyle güçlü bağları olan, gezi ve kamplara tam hibe çıkaran becerikli bir idareci.",
    stressReductionBonus: 7,
    councilConnectionBonus: 11
  }
];

// --- YURT MÜDÜRLERİ (ERKEK) ---
const DORM_MANAGERS_MALE = [
  {
    id: "m_ym_1",
    name: "Hacı Mehmet Efendi",
    title: "Kıdemli Yurt Müdürü",
    gender: "male",
    monthlySalary: 44000,
    experience: 15,
    skills: ["Yurt Disiplini", "Gece Nöbeti", "Sabah Namazı Takibi"],
    bio: "Eski medrese geleneğini yansıtan, gece etütlerinde çay demleyip talebelere nasihat eden baba bir idareci."
  },
  {
    id: "m_ym_2",
    name: "İsmail Hakkı Bey",
    title: "Yurt ve Tesis Müdürü",
    gender: "male",
    monthlySalary: 48000,
    experience: 10,
    skills: ["Tesis Bakım Onarımı", "Yangın & Güvenlik Mevzuatı", "Temizlik Teftişi"],
    bio: "Binanın teknik arızalarını anında gideren, odaların düzenine çok önem veren bir teknik idareci."
  }
];

// --- YURT MÜDÜRLERİ (KADIN) ---
const DORM_MANAGERS_FEMALE = [
  {
    id: "f_ym_1",
    name: "Hacer Meliha Hanımefendi",
    title: "Kıdemli Kız Yurdu Müdiresi",
    gender: "female",
    monthlySalary: 44000,
    experience: 14,
    skills: ["Mahremiyet Titizliği", "Kız Yurdu Huzuru", "Gece Mütalaa Nöbeti"],
    bio: "Mahremiyet kurallarına son derece dikkat eden, kız talebelere anne şefkatiyle kol kanat geren kıymetli bir müdire."
  },
  {
    id: "f_ym_2",
    name: "Rumeysa Nur Hanım",
    title: "Kız Yurdu Müdiresi & İlahiyatçı",
    gender: "female",
    monthlySalary: 48000,
    experience: 8,
    skills: ["Yurt Etütleri", "Temizlik ve Düzen", "Manevi Rehberlik"],
    bio: "Genç, dinamik ve kız talebelerin yurt şikayetlerini ivedilikle çözen gayretli bir yurt idarecisi."
  }
];

// --- AŞÇILAR (ERKEK VE KADIN) ---
const COOKS_DATA = [
  {
    id: "cook_m1",
    name: "Hacı Veli Usta (Bolu Aşçısı)",
    title: "Baş Aşçı",
    gender: "male",
    monthlySalary: 42000,
    experience: 20,
    cuisine: "Geleneksel Türk & Osmanlı Saray Mutfağı",
    bio: "Mengenli usta. Kuru fasulyeden kuzu incike, yayla çorbasından revaniye talebelere ziyafet çeker."
  },
  {
    id: "cook_m2",
    name: "Hasan Usta",
    title: "Aşçı",
    gender: "male",
    monthlySalary: 36000,
    experience: 12,
    cuisine: "Ev Yemekleri ve Doyurucu Tabldot",
    bio: "Talebelerin karnını doyurmayı ibadet bilen, hijyene son derece düşkün bir esnaf aşçısı."
  },
  {
    id: "cook_f1",
    name: "Gülizar Abla",
    title: "Baş Aşçı (Hanım)",
    gender: "female",
    monthlySalary: 42000,
    experience: 18,
    cuisine: "Anadolu Anne Ev Yemekleri & Çorbalar",
    bio: "Talebelere kendi evlatları gibi tereyağlı sıcak çorbalar, sarmalar ve zengin tatlılar pişirir."
  },
  {
    id: "cook_f2",
    name: "Fatma Teyze",
    title: "Aşçı (Hanım)",
    gender: "female",
    monthlySalary: 36000,
    experience: 15,
    cuisine: "Dengeli ve Sağlıklı Mutfak",
    bio: "Doğal zeytinyağlılar ve vitaminli menüler hazırlayarak talebelerin zihin açıklığına destek olur."
  }
];

// --- MUHASEBECİLER (ERKEK VE KADIN) ---
const ACCOUNTANTS_MALE = [
  {
    id: "acc_m1",
    name: "SMMM Hacı Hayati Efendi",
    title: "Kıdemli Mali Müşavir & Vakıf Muhasebecisi",
    gender: "male",
    monthlySalary: 45000,
    experience: 22,
    skills: ["Vakıf Bilanço Takibi", "Vergi Muafiyeti & Sayıştay Mevzuatı", "Esnaf Düzenli Bağış Defteri", "Hoca Kürsü Bütçesi"],
    bio: "Fatih ve Süleymaniye vakıflarının mali defterlerini 20 yıl tutmuş, her kuruşun hesabını zerre zerre bilen emektar muhasebeci."
  },
  {
    id: "acc_m2",
    name: "SMMM Kenan Demir Bey",
    title: "Mali İşler Müdürü & Bağımsız Denetçi",
    gender: "male",
    monthlySalary: 48000,
    experience: 14,
    skills: ["Dijital Bilanço Yazılımı", "Holding Bağış Raporlaması", "Finansal Tahmin & Nakit Akışı"],
    bio: "Kurumsal holding tecrübeli; vakfın 12 aylık nakit projeksiyonunu ve hoca giderleri bütçesini milimetrik planlayan uzman maliyeci."
  }
];

const ACCOUNTANTS_FEMALE = [
  {
    id: "acc_f1",
    name: "SMMM Zeynep Betül Hanım",
    title: "Mali Müşavir & Vakıf Saymanı",
    gender: "female",
    monthlySalary: 45000,
    experience: 16,
    skills: ["Vakıf Bilançosu & İnfak Fonları", "Burs Dağıtım Bordrosu", "Vergi Muafiyeti Denetimi", "Mali Şeffaflık"],
    bio: "Kız vakıf kuruluşlarında uzun yıllar mali müşavirlik yapmış, bütçe disiplininde tavizsiz ve titiz bir hanım mali uzman."
  },
  {
    id: "acc_f2",
    name: "SMMM Merve Şerife Hanım",
    title: "Bütçe ve Finansal Denetim Uzmanı",
    gender: "female",
    monthlySalary: 48000,
    experience: 12,
    skills: ["Holding Sponsorluk Takibi", "Kürsü Bütçesi Tahsisi", "Esnaf Bağış Akış Analizi"],
    bio: "İstanbul Üniversitesi İktisat mezunu; kurumun gelir-gider dengesini koruyan ve şeffaf bilanço raporları sunan genç ve yetkin maliyeci."
  }
];

// --- TEMİZLİK GÖREVLİLERİ (ERKEK VE KADIN) ---
const CLEANING_STAFF_DATA = [
  {
    id: "clean_m1",
    name: "Ramazan Efendi",
    title: "Temizlik ve Meydancı Görevlisi",
    gender: "male",
    monthlySalary: 28000,
    experience: 7,
    bio: "Sınıfları, mescidi ve abdesthaneleri her sabah tertemiz pırıl pırıl yapan emektar çalışan."
  },
  {
    id: "clean_m2",
    name: "Cemal Bey",
    title: "Temizlik Görevlisi",
    gender: "male",
    monthlySalary: 28000,
    experience: 5,
    bio: "Yurt koridorlarını ve ortak alanları hijyen standartlarına uygun olarak dezenfekte eder."
  },
  {
    id: "clean_f1",
    name: "Emine Hanım",
    title: "Kız Yurdu Temizlik Görevlisi",
    gender: "female",
    monthlySalary: 28000,
    experience: 8,
    bio: "Kız yurdu etüt salonlarını ve odalarını titizlikle temizleyen dürüst ve temiz bir hanımefendi."
  },
  {
    id: "clean_f2",
    name: "Zehra Abla",
    title: "Kız Yurdu Temizlik Görevlisi",
    gender: "female",
    monthlySalary: 28000,
    experience: 6,
    bio: "Sabahın erken saatlerinde sınıfları ve ortak kullanım alanlarını havalandırıp tertemiz yapar."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    VICE_DIRECTORS_MALE,
    VICE_DIRECTORS_FEMALE,
    DORM_MANAGERS_MALE,
    DORM_MANAGERS_FEMALE,
    ACCOUNTANTS_MALE,
    ACCOUNTANTS_FEMALE,
    COOKS_DATA,
    CLEANING_STAFF_DATA
  };
}
