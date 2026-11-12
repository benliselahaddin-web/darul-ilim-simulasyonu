// Yurt Hadiseleri, Arızalar ve Disiplin Vakaları Havuzu (60+ Çeşit)
// Dârü'l-İlim ve Hikmet Simülatörü v2.7

const DORM_INCIDENTS_CATALOG = [
  // ==================== 1. TEKNİK & FİZİKSEL ARIZALAR (1-25) ====================
  {
    id: "inc_01",
    category: "technical",
    title: "Kalorifer Kazanı Basınç Tahliye Arızası",
    desc: "Kış ortasında kalorifer ana su vanası sızdırdı ve yurdun doğu cephesindeki petekler soğudu.",
    repairCost: 14000,
    severity: 3,
    isDisciplinary: false,
    stressDelta: 8,
    cohesionDelta: -2
  },
  {
    id: "inc_02",
    category: "technical",
    title: "Alt Kat Çamaşırhane Su Baskını",
    desc: "Sanayi tipi kurutma makinesinin tahliye borusu patladı, çamaşırhane zeminini su bastı.",
    repairCost: 9500,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 5,
    cohesionDelta: -1
  },
  {
    id: "inc_03",
    category: "technical",
    title: "Kütüphane Çatı Oluğu Taşması ve Nem Tehlikesi",
    desc: "Şiddetli sağanakta tıkanan çatı oluğu taşarak kütüphanenin üst tavanından damlamaya başladı; nadir ciltler acilen taşındı.",
    repairCost: 18000,
    severity: 4,
    isDisciplinary: false,
    stressDelta: 10,
    cohesionDelta: 0
  },
  {
    id: "inc_04",
    category: "technical",
    title: "Yurt Asansörü Halat ve Fren Emniyeti Arızası",
    desc: "Yurdun ana yolcu asansörü 3. ve 4. kat arasında kaldı; içindeki 3 talebe 20 dakika sonra itfaiye ve teknisyenle kurtarıldı.",
    repairCost: 12000,
    severity: 4,
    isDisciplinary: false,
    stressDelta: 12,
    cohesionDelta: 0
  },
  {
    id: "inc_05",
    category: "technical",
    title: "Mutfak Soğuk Hava Deposu Kompresör Arızası",
    desc: "Aşçının kurban ve vakıf etlerini sakladığı soğuk hava deposunun motoru yandı; acil yedek soğutucu kiralandı.",
    repairCost: 16500,
    severity: 3,
    isDisciplinary: false,
    stressDelta: 6,
    cohesionDelta: -1
  },
  {
    id: "inc_06",
    category: "technical",
    title: "Ana Elektrik Panosunda Şase ve Faz Yanması",
    desc: "Aşırı yüklenme sebebiyle yurt ana sigorta kutusu şase yaptı; etüt odası ve mescit bir gece karanlıkta kaldı.",
    repairCost: 8000,
    severity: 3,
    isDisciplinary: false,
    stressDelta: 7,
    cohesionDelta: 2 // Mum ışığında mütalaa uhuvveti artırdı
  },
  {
    id: "inc_07",
    category: "technical",
    title: "Sıcak Su Boyleri Kireç Tıkanması",
    desc: "Güneş enerjisi ve kazan boylerindeki kireç sebebiyle talebeler sabah namazı öncesinde soğuk suyla abdest almak durumunda kaldı.",
    repairCost: 7000,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 9,
    cohesionDelta: -2
  },
  {
    id: "inc_08",
    category: "technical",
    title: "Yurt İnternet Fiber Omurga Kablosunun Kopması",
    desc: "Sokaktaki belediye kazısı esnasında yurdun fiber hattı koptu; tez hazırlayan talebeler 3 gün internetsiz kaldı.",
    repairCost: 5500,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 11,
    cohesionDelta: 4 // İnternet kesilince hasoda çay sohbeti canlandı
  },
  {
    id: "inc_09",
    category: "technical",
    title: "Yurt Giriş Turnikesi ve Manyetik Kart Arızası",
    desc: "Yurdun otomatik ana giriş kapısı açık kaldı ve güvenlik kartlarını okumadı.",
    repairCost: 4500,
    severity: 1,
    isDisciplinary: false,
    stressDelta: 3,
    cohesionDelta: 0
  },
  {
    id: "inc_10",
    category: "technical",
    title: "Kilerde Haşere ve Güve Tespiti",
    desc: "Bakliyat ambarında güvelenme başladı; tüm yatakhaneler ve kiler profesyonel ilaçlamaya alındı.",
    repairCost: 8500,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 6,
    cohesionDelta: -1
  },
  {
    id: "inc_11",
    category: "technical",
    title: "Mescit Ses Sistemi ve Mikrofon Amfisi Yanması",
    desc: "Sabah mukabelesi sırasında akım dalgalanması amfiyi yaktı; ezan ve hutbe sesi aksadı.",
    repairCost: 6000,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 4,
    cohesionDelta: 0
  },
  {
    id: "inc_12",
    category: "technical",
    title: "Yurt Merdiven Mermerlerinin Buz Tutması",
    desc: "Kar fırtınasında dış giriş basamakları buz tuttu; kaymayı önlemek için acil kauçuk paspas ve tuzlama yapıldı.",
    repairCost: 3500,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 5,
    cohesionDelta: 1
  },
  {
    id: "inc_13",
    category: "technical",
    title: "Yemekhane Bulaşık Makinesi Tahliye Tıkanması",
    desc: "Aşçının sanayi tipi bulaşık makinesi arızalandı; talebeler nöbetleşe elde yıkamak zorunda kaldı.",
    repairCost: 5000,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 7,
    cohesionDelta: 3 // İmece usulü bulaşık nöbeti kaynaştırdı
  },
  {
    id: "inc_14",
    category: "technical",
    title: "Gece Yangın Sensörünün Hatalı Alarmı",
    desc: "Etüt odasındaki tozlanmış sensör gece 03:30'da çalarak tüm yurdu bahçeye döktü.",
    repairCost: 4000,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 10,
    cohesionDelta: 0
  },
  {
    id: "inc_15",
    category: "technical",
    title: "Yatak Odası Cam Menfezi ve Isı Kaybı",
    desc: "Pencerelerin fitilleri aşındığından kış rüzgarında odalarda cereyan oluştu.",
    repairCost: 7500,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 6,
    cohesionDelta: -1
  },
  {
    id: "inc_16",
    category: "technical",
    title: "Kütüphane Raflarında Ağır Yük Sebebiyle Bel Verme",
    desc: "Ciltli tefsir ve hadis külliyatlarının ağırlığından iki masif ahşap raf çöktü.",
    repairCost: 8000,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 4,
    cohesionDelta: 0
  },
  {
    id: "inc_17",
    category: "technical",
    title: "Yurt Arıtma Su Sebili Filtre Bozulması",
    desc: "İçme suyu arıtma ünitesinin membran filtreleri tıkandı, hazır damacana takviyesi yapıldı.",
    repairCost: 4000,
    severity: 1,
    isDisciplinary: false,
    stressDelta: 3,
    cohesionDelta: 0
  },
  {
    id: "inc_18",
    category: "technical",
    title: "Bahçe Duvarı Sıva Dökülmesi ve Aydınlatma Arızası",
    desc: "Medrese avlu duvarındaki taşlar gevşedi, gece aydınlatma projektörleri söndü.",
    repairCost: 9000,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 4,
    cohesionDelta: 0
  },
  {
    id: "inc_19",
    category: "technical",
    title: "Yemekhane Davlumbazı Yağ Filtresi Yangın Riski",
    desc: "Aşçı ocağının bacasında biriken yağ tabakası tutuşma tehlikesi oluşturdu; baca temizleme ekibi çağrıldı.",
    repairCost: 6500,
    severity: 3,
    isDisciplinary: false,
    stressDelta: 5,
    cohesionDelta: 0
  },
  {
    id: "inc_20",
    category: "technical",
    title: "Yurt Reviri Ecza Dolabı Malzeme Eksikliği",
    desc: "Mevsimlik tansiyon, ateş düşürücü ve ilk yardım kitlerinin son kullanma tarihi geçti; takviye yapıldı.",
    repairCost: 3000,
    severity: 1,
    isDisciplinary: false,
    stressDelta: 2,
    cohesionDelta: 0
  },

  // ==================== 2. SAĞLIK & TALEBE HADİSELERİ (21-35) ====================
  {
    id: "inc_21",
    category: "health",
    title: "Halı Saha Dostluk Maçında Ayak Bileği Burkulması / İncinmesi",
    desc: "İlahiyat fakültesi talebeleriyle yapılan haftalık halı saha maçında bir talebenin ayak bileği döndü; alçıya alındı.",
    repairCost: 3500,
    severity: 3,
    isDisciplinary: false,
    stressDelta: 8,
    cohesionDelta: 5 // Arkadaşları odasına yemek taşıyarak sahip çıktı
  },
  {
    id: "inc_22",
    category: "health",
    title: "Gece Vakti Akut Apandisit Şüphesi ve Acil Sevk",
    desc: "Gece 02:00'de şiddetli karın ağrısı çeken talebe yurt müdürü tarafından Haseki Hastanesi'ne yetiştirilerek ameliyata alındı.",
    repairCost: 5000,
    severity: 4,
    isDisciplinary: false,
    stressDelta: 12,
    cohesionDelta: 6
  },
  {
    id: "inc_23",
    category: "health",
    title: "Yurtta Mevsimsel Ağır Grip ve Salgın",
    desc: "Hava değişiminde 14 talebe aynı anda yüksek ateşle yatağa düştü; aşçı özel tavuk çorbası ve zencefil kaynattı.",
    repairCost: 4500,
    severity: 3,
    isDisciplinary: false,
    stressDelta: 10,
    cohesionDelta: 2
  },
  {
    id: "inc_24",
    category: "health",
    title: "Kütüphane Merdiveninden Düşerek Kolunu Çatlatma",
    desc: "En üst raftan Cürcânî şerhi almaya çalışırken dengesini kaybeden talebenin kolu incindi.",
    repairCost: 3000,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 7,
    cohesionDelta: 2
  },
  {
    id: "inc_25",
    category: "health",
    title: "Dışarıdan Yenen Tavuk Döner Sonrası Besin İntoksikasyonu",
    desc: "Fakülte çıkışı dışarıda yemek yiyen 4 talebede mide bulantısı ve halsizlik baş gösterdi.",
    repairCost: 2500,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 6,
    cohesionDelta: 0
  },
  {
    id: "inc_26",
    category: "health",
    title: "Talebede Yoğun Sınav Stresine Bağlı Migren Nöbeti",
    desc: "Finaller öncesinde uykusuz kalarak aralıksız metin ezberleyen talebede şiddetli migren ve görme bulanıklığı yaşandı.",
    repairCost: 1500,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 8,
    cohesionDelta: 1
  },
  {
    id: "inc_27",
    category: "health",
    title: "Buzda Kayarak Düşme ve Dirsek Zedelenmesi",
    desc: "Cuma namazına giderken avluda kayan talebenin dirseği morardı ve bandaja alındı.",
    repairCost: 2000,
    severity: 2,
    isDisciplinary: false,
    stressDelta: 4,
    cohesionDelta: 1
  },

  // ==================== 3. KURAL İHLALLERİ, YÜZ KIZARTICI SUÇLAR & DİSİPLİN (36-60) ====================
  // (BU VAKALARDA İLGİLİ TALEBENİN "TALEBE DOSYASI / SİCİL" KAYDINA ANINDA İŞLENİR)
  {
    id: "inc_28",
    category: "disciplinary",
    title: "Etüt Odasında Sert Münazaranın Kavgaya Dönüşmesi",
    desc: "Gece saat 23:45'te iki talebe arasında mezhep usulü tartışması şahsi hakarete ve yakadan tutmaya dönüştü.",
    repairCost: 0,
    severity: 4,
    isDisciplinary: true,
    recordTitle: "Yurtta Kavga ve İntizamı Ağır Şekilde Bozma",
    moralImpact: -18,
    stressDelta: 14,
    cohesionDelta: -8
  },
  {
    id: "inc_29",
    category: "disciplinary",
    title: "Gece Yangın Merdiveninden Kaçarak İzinsiz Dışarıda Kalma",
    desc: "Bir talebenin gece 01:00'de yangın merdivenini kullanarak yurttan kaçtığı ve sabah ezanında sivil kıyafetle döndüğü kamera kayıtlarıyla tespit edildi.",
    repairCost: 0,
    severity: 4,
    isDisciplinary: true,
    recordTitle: "İzinsiz Gece Yurdu Terk Etme ve Güvenlik İhlali",
    moralImpact: -22,
    stressDelta: 10,
    cohesionDelta: -4
  },
  {
    id: "inc_30",
    category: "disciplinary",
    title: "Yatak Odasında Gizlice Tütün ve Nargile İçilmesi",
    desc: "Yatakhaneden yükselen yoğun koku üzerine belletmen tarafından yapılan kontrolde gizlenmiş tütün takımı ve duman sensörünün bantlandığı görüldü.",
    repairCost: 2000,
    severity: 4,
    isDisciplinary: true,
    recordTitle: "Yatakhanede Ateşli Madde Kullanımı ve Yangın Güvenliğini Tehlikeye Atma",
    moralImpact: -20,
    stressDelta: 12,
    cohesionDelta: -6
  },
  {
    id: "inc_31",
    category: "disciplinary",
    title: "Kütüphaneden Nadir Eseri İzinsiz Çıkarma ve Tahrip Etme",
    desc: "Vakıf kütüphanesinden dışarı çıkarılması yasak olan şerh cildinin bir talebenin dolabında, sayfaları kahveyle lekelenmiş vaziyette bulundu.",
    repairCost: 3500,
    severity: 3,
    isDisciplinary: true,
    recordTitle: "Vakıf Malına İhmal, İtaatsizlik ve Eser Tahribatı",
    moralImpact: -16,
    stressDelta: 8,
    cohesionDelta: -3
  },
  {
    id: "inc_32",
    category: "disciplinary",
    title: "Dönem Sınavında Telefonla Cevap Alışverişi (Akademik Sahtecilik)",
    desc: "Fıkıh usulü vize sınavında masanın altına gizlenmiş akıllı telefondan soru paylaşıldığı salon gözetmenince tutanak altına alındı.",
    repairCost: 0,
    severity: 5,
    isDisciplinary: true,
    recordTitle: "Akademik Sınavda Hile ve Sahtecilik Teşebbüsü",
    moralImpact: -28,
    stressDelta: 16,
    cohesionDelta: -10
  },
  {
    id: "inc_33",
    category: "disciplinary",
    title: "Mescit Ayakkabılığından Para Alınması Şüphesi (Yüz Kızartıcı Eylem)",
    desc: "Cuma namazında başka bir talebenin montunun cebinden nakit para alındığı şüphesi üzerine idare tarafından arama yapıldı ve para tespit edildi.",
    repairCost: 0,
    severity: 5,
    isDisciplinary: true,
    recordTitle: "Yüz Kızartıcı Eylem - Hırsızlık Suçu ve Disiplin Soruşturması",
    moralImpact: -35,
    stressDelta: 20,
    cohesionDelta: -15
  },
  {
    id: "inc_34",
    category: "disciplinary",
    title: "Nöbetçi Belletmene Hakaret ve Emre Karşı Gelme",
    desc: "Gece ışıkların söndürülmesi uyarısına karşı çıkan talebe nöbetçi personele ağır saygısızlıkta bulunarak kapıyı çarptı.",
    repairCost: 0,
    severity: 3,
    isDisciplinary: true,
    recordTitle: "Yurt İdaresine Saygısızlık ve Açık İtaatsizlik",
    moralImpact: -15,
    stressDelta: 9,
    cohesionDelta: -5
  },
  {
    id: "inc_35",
    category: "disciplinary",
    title: "Yurt Odasında Başka Talebeler Üzerinde Tahakküm ve Baskı Kurma",
    desc: "Üst sınıf bir talebenin alt sınıf hazırlık talebelerine zorla temizlik ve şahsi hizmet yaptırdığı şikayetle ortaya çıktı.",
    repairCost: 0,
    severity: 4,
    isDisciplinary: true,
    recordTitle: "Talebeler Arası Zorbalık ve Şahsi Tahakküm Kurma",
    moralImpact: -24,
    stressDelta: 15,
    cohesionDelta: -12
  },
  {
    id: "inc_36",
    category: "disciplinary",
    title: "Sosyal Medyada Kurum İtibarına Aykırı Müstehzi Paylaşımlar",
    desc: "Bir talebenin anonim hesap üzerinden kurum hocalarını ve ders ciddiyetini alaya alan paylaşımlar yaptığı tespit edildi.",
    repairCost: 0,
    severity: 4,
    isDisciplinary: true,
    recordTitle: "Kurum İtibarını ve Mahremiyetini Zedeleme",
    moralImpact: -22,
    stressDelta: 12,
    cohesionDelta: -7
  },
  {
    id: "inc_37",
    category: "disciplinary",
    title: "Sabah Namazına ve Dersine Müzmin Şekilde Kalkmama",
    desc: "Yapılan 3 resmi uyarıya rağmen mazeretsiz olarak sabah namazı ve sabah 07:00 sarf dersine katılmamakta ısrar edilmesi.",
    repairCost: 0,
    severity: 3,
    isDisciplinary: true,
    recordTitle: "Mazeretsiz Müzmin Devamsızlık ve İhmalkarlık",
    moralImpact: -14,
    stressDelta: 8,
    cohesionDelta: -2
  },
  {
    id: "inc_38",
    category: "disciplinary",
    title: "Yemekhane Sırasında Başkalarının Hakkına Tecavüz ve Taşkınlık",
    desc: "İftar yemeğinde sırayı bozarak arbede çıkaran ve görevli aşçıya bağıran talebe hakkında tutanak tutuldu.",
    repairCost: 0,
    severity: 2,
    isDisciplinary: true,
    recordTitle: "Ortak Alanda Nezaketsizlik ve Taşkınlık",
    moralImpact: -10,
    stressDelta: 6,
    cohesionDelta: -4
  },
  {
    id: "inc_39",
    category: "disciplinary",
    title: "Yurda İdareden İzinsiz Yabancı Misafir Sokup Geceletme",
    desc: "Yurt kurallarına aykırı şekilde kurum dışından şahısların gece gizlice misafirhaneye değil öğrenci odasına sokulduğu görüldü.",
    repairCost: 0,
    severity: 3,
    isDisciplinary: true,
    recordTitle: "İzinsiz Şahısları Yatakhaneye Sokma ve Güvenlik Zaafı",
    moralImpact: -16,
    stressDelta: 9,
    cohesionDelta: -3
  },
  {
    id: "inc_40",
    category: "disciplinary",
    title: "Öğrenci Bursunun Kumar veya Kripto Varlık Spekülasyonunda Batırılması",
    desc: "Vakfın verdiği ilim bursunun sanal bahis sitelerinde tüketildiği ve arkadaşlarına borç takıldığı itiraf edildi.",
    repairCost: 0,
    severity: 5,
    isDisciplinary: true,
    recordTitle: "Vakıf Bursunu Gayrimeşru Alanlarda Tüketme ve Güveni Kötüye Kullanma",
    moralImpact: -32,
    stressDelta: 18,
    cohesionDelta: -10
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DORM_INCIDENTS_CATALOG };
}
