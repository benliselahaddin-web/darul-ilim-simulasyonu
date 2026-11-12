// Dârü'l-İlim ve Hikmet Simülatörü - Günümüz Türkiye'si Vakıf Gündemi ve Rastgele Olay Kartları (v2.7)
// Modern Türkiye'deki İlim Vakıfları, Medreseler, Enflasyon, Mevzuat ve İdare Gerçekleri
// Toplam 40 Detaylı Senaryo

const VAKIF_EVENTS_DATA = [
  // ==================== 1. MALİ İKİLEMLER VE ENFLASYON KRİZLERİ ====================
  {
    id: "event_enflasyon_gida",
    title: "Enflasyon ve Mutfak/İaşe Zamları",
    category: "Mali İkilem",
    badge: { text: "Yüksek Enflasyon", bg: "bg-red-100", textCol: "text-red-800" },
    icon: "shopping-bag",
    description: "Toptancı gıda tedarikçimiz ve kasap, et, bakliyat, süt ürünleri ve sıvı yağ fiyatlarına son 3 ayda %45 zam geldiğini bildirdi. Aşçıbaşı odanıza gelerek:\n\n'Müdürüm, mevcut iaşe ödeneğiyle talebelerimize haftada 3 gün kıymalı/etli yemek ve kaliteli kahvaltı çıkarmamız imkânsız hale geldi. Ya mutfak bütçemizi ciddi oranda artıralım ya da menüdeki protein porsiyonlarını kısıp çorba ve makarnaya ağırlık verelim.'",
    options: [
      {
        label: "Kaliteden Asla Ödün Verme (Farkı Kasadan Karşıla)",
        desc: "Talebelerin zihin açıklığı ve sağlığı her şeyden üstündür. 60.000 ₺ ek ödenek çıkart ve aylık mutfak bütçesini artır.",
        cost: 60000,
        reputationDelta: 3,
        cohesionDelta: 10,
        stressDelta: -8,
        academicDelta: 4,
        outcomeText: "Talebeler yemekhane kalitesinin korunmasından büyük memnuniyet duydu. Et ve meyve porsiyonları eksilmedi, kardeşlik ve çalışma şevki zirveye çıktı; lakin vakıf kasasından ciddi bir meblağ eksildi."
      },
      {
        label: "Tasarruf Menüsüne Geç (Porsiyonları ve Et Gününü Azalt)",
        desc: "Kasa dengesini korumak için haftalık et gününü 1'e indir, menüyü karbonhidrat ve bakliyatla sadeleştir.",
        cost: 10000,
        reputationDelta: -2,
        cohesionDelta: -12,
        stressDelta: 10,
        academicDelta: -2,
        outcomeText: "Maddi olarak bütçe korundu fakat talebeler arasında yemeklerin doyuruculuğu ve lezzeti konusunda derin hoşnutsuzluk başladı. Gece etütlerinde açlık şikâyetleri arttı."
      }
    ]
  },
  {
    id: "event_dogalgaz_fatura",
    title: "Kış Ayları ve Doğalgaz/Elektrik Faturaları",
    category: "Mali İkilem",
    badge: { text: "Ağır Fatura", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "flame",
    description: "İstanbul'da dondurucu poyraz ve kar yağışı başladı. Tarihi yüksek tavanlı dersliklerin ve yurt odalarının ısınması için kombiler son kademede çalışıyor. İGDAŞ ve BEDAŞ'tan gelen aylık faturalar rekor seviyeye ulaştı (75.000 ₺).\n\nYurt müdürü, 'Hocam, tasarruf için gece 23:00'ten sonra kombileri kısalım mı, yoksa talebelerin hastalanmaması için tam kapasite yakmaya devam mı edelim?' diye soruyor.",
    options: [
      {
        label: "Kombileri Tam Kapasite Çalıştır (Sağlık ve Rahatlık Öncelikli)",
        desc: "75.000 ₺ yüksek fatura bedelini öde; sınıflar ve yurt 24 saat sıcak kalsın.",
        cost: 75000,
        reputationDelta: 2,
        cohesionDelta: 8,
        stressDelta: -6,
        academicDelta: 3,
        outcomeText: "Talebeler soğuk kış günlerinde sıcacık dersliklerde mütalaa yaptı, hiçbir öğrenci salgına yakalanmadı. Vakfın kasası zorlansa da huzur muhafaza edildi."
      },
      {
        label: "Saatli Isıtmaya Geç ve Termostatı Düşür",
        desc: "Kombileri belirli saatlerde çalıştırıp 35.000 ₺ tasarruf et. Talebelere polar ve battaniye takviyesi yap.",
        cost: 25000,
        reputationDelta: -2,
        cohesionDelta: -10,
        stressDelta: 12,
        academicDelta: -5,
        outcomeText: "Fatura masrafı yarıya indi fakat yurt odalarında sabah ayazında uyanmak zorlaştı. Birkaç talebe bronşit oldu, ders devamsızlıkları baş gösterdi."
      }
    ]
  },
  {
    id: "event_kira_artisi",
    title: "Kira Artışı ve Mülk Sahibi Krizi",
    category: "Mali İkilem",
    badge: { text: "Kira Krizi", bg: "bg-red-100", textCol: "text-red-800" },
    icon: "home",
    description: "Kiralık ek bina ve dersliklerimizin mülk sahibi avukatıyla haber gönderdi. Piyasa rayiçlerinin çok altında kaldığımızı iddia ederek kiranın %120 oranında artırılmasını veya 2 ay içinde binanın tahliye edilmesini talep ediyor.\n\nMütevelli heyetinde tansiyon yüksek: Bir kısım hoca 'Hakkımızdır, mahkemeye verelim' derken, idareciler 'Taşınma masrafı ve itibar kaybı daha büyük olur' görüşünde.",
    options: [
      {
        label: "Pazarlık Yap ve Zammı Kabul Et (Kontratı Yenile)",
        desc: "Mülk sahibiyle el sıkış, 50.000 ₺ peşin fark öde ve huzuru bozma.",
        cost: 50000,
        reputationDelta: 1,
        cohesionDelta: 3,
        stressDelta: -4,
        academicDelta: 2,
        outcomeText: "Mülk sahibiyle uzlaşıldı, derslikler güvenceye alındı. Düzenli kira giderimiz artsa da eğitim düzeni sekteye uğramadı."
      },
      {
        label: "Talebi Reddet ve Odaları Sıkıştır (Ek Binayı Boşalt)",
        desc: "Fahiş zammı kabul etme, ek binadaki sınıfları ana binaya taşıyıp mevcut mekânı daralt.",
        cost: 12000,
        reputationDelta: -4,
        cohesionDelta: -12,
        stressDelta: 14,
        academicDelta: -6,
        outcomeText: "Kira artışından kurtulduk ancak sınıflar balık istifi oldu. Rahleler sıkıştı, kütüphanenin yarısı dersliğe dönüştürüldü. Talebelerin çalışma motivasyonu düştü."
      }
    ]
  },
  {
    id: "event_bagisci_darbogaz",
    title: "Ana Bağışçının Ekonomik Darboğazı",
    category: "Bağışçı ve Nüfuz",
    badge: { text: "Mali Şok", bg: "bg-red-100", textCol: "text-red-800" },
    icon: "briefcase",
    description: "Kurumumuza her ay 25 talebenin bursunu düzenli karşılayan büyük inşaat ve taahhüt şirketi sahibi hayırseverimiz konkordato ilan etti. Şirketin mali işler koordinatörü mahcubiyetle arayarak:\n\n'Hocam, banka hesaplarımız bloke oldu. En az 6-8 ay boyunca vakfınıza nakdi burs ve iaşe desteği aktaramayacağız. Hakkınızı helal edin.'",
    options: [
      {
        label: "Yedek Akçeyi Devreye Sok (Bursları Aynen Ödemeye Devam Et)",
        desc: "Vakfın birikmiş acil durum fonundan 90.000 ₺ harca, talebelere hissettirme.",
        cost: 90000,
        reputationDelta: 6,
        cohesionDelta: 10,
        stressDelta: -5,
        academicDelta: 2,
        outcomeText: "Talebeler en ufak bir mağduriyet yaşamadı. Vakfın mali gücü ve vefası ilim camiasında büyük takdir topladı; ancak kasanın güvenlik kalkanı eridi."
      },
      {
        label: "Talebelere Durumu Açıkla ve Bursları Yarıya İndir",
        desc: "Kriz süresince talebe burslarını %50 oranında keserek vakfın iflas riskini önle.",
        cost: 15000,
        reputationDelta: -5,
        cohesionDelta: -16,
        stressDelta: 18,
        academicDelta: -7,
        outcomeText: "Kasa iflastan korundu lakin bursla geçinen ve ailesine destek olan talebeler büyük şok yaşadı. Birkaç başarılı talebe ek iş aramak zorunda kaldı."
      }
    ]
  },

  // ==================== 2. İLMİ FIRSATLAR VE AKADEMİK İKİLEMLER ====================
  {
    id: "event_misafir_alim",
    title: "Yurt Dışından / İlahiyat Camiasından Misafir Âlim",
    category: "Akademik Fırsat",
    badge: { text: "Uluslararası İlim", bg: "bg-emerald-100", textCol: "text-emerald-800" },
    icon: "graduation-cap",
    description: "Ezher ve Şam ilim halkalarından icazetli, alanında dünya çapında otorite kabul edilen kıymetli bir Usûl-i Fıkıh ve Hadis allâmesi 1 dönemliğine Türkiye'ye teşrif etti.\n\nHocalarımız, 'Müdürüm, bu zâtı kurumumuzda 2 ay misafir edip talebelerimize yoğunlaştırılmış İlelü'l-Hadis ve Usûl semineri verdirelim. Uçak, konaklama ve hürmeten takdim edilecek telif bütçesi gerekiyor.' teklifinde bulundu.",
    options: [
      {
        label: "Tüm Masrafları Üstlen ve İhtisas Programı Aç (80.000 ₺)",
        desc: "Uçak bileti, misafirhane ve telif bedelini öde. Talebeler 2 ay boyunca doğrudan bu allâmenin dizinin dibinde ders görsün.",
        cost: 80000,
        reputationDelta: 8,
        cohesionDelta: 12,
        stressDelta: -4,
        academicDelta: 20,
        outcomeText: "Muazzam bir ilim bereketi hasıl oldu! Türkiye'nin dört bir yanından akademisyenler seminere dinleyici olarak geldi. Kurumun ilmi seviyesi çağ atladı."
      },
      {
        label: "Sadece Bir Akşam Çay-Hasbihal Programı Düzenle (12.000 ₺)",
        desc: "Bütçeyi sarsma; sadece konferans salonunda 2 saatlik genel bir sohbet ve akşam yemeği tertip et.",
        cost: 12000,
        reputationDelta: 2,
        cohesionDelta: 4,
        stressDelta: 0,
        academicDelta: 5,
        outcomeText: "Güzel ve feyizli bir akşam hasbihali icra edildi; fakat talebeler 'Keşke bir metin okuma imkânı bulabilseydik' diye hayıflandı."
      }
    ]
  },
  {
    id: "event_sartli_bagis",
    title: "Şartlı Bağış ve Torpil Teklifi",
    category: "Bağışçı ve Nüfuz",
    badge: { text: "Ahlaki İmtihan", bg: "bg-purple-100", textCol: "text-purple-800" },
    icon: "shield-alert",
    description: "Şehrin en zengin sanayicilerinden biri vakfımıza 200.000 ₺ nakdi bağış ve yeni bir kütüphane tefrişatı teklif etti. Ancak bir şartı var:\n\nYKS sıralaması düşük, mülakat heyetinin de 'ilim istidadı ve disiplini yetersiz' bularak elediği öz yeğeninin yatılı programa kontenjan dışı kabul edilmesini şart koşuyor.\n\nMüdür yardımcısı: 'Müdürüm, 200 bin lira çok büyük para, bir öğrenciyi idare edebilir miyiz acaba?' diye fısıldıyor.",
    options: [
      {
        label: "Liyakatten Taviz Verme! Şartlı Bağışı Reddet",
        desc: "İlim ocağına torpille talebe alınamaz. Parayı nazikçe geri çevir, hak eden talebenin hakkını koru.",
        cost: 0,
        reputationDelta: 7,
        cohesionDelta: 14,
        stressDelta: -2,
        academicDelta: 6,
        outcomeText: "Talebeler ve hocalar idarenin adaleti karşısında kuruma olan hürmetlerini katbekat artırdı. 'Burada torpil değil ihlas geçer' sözü dilden dile yayıldı."
      },
      {
        label: "Teklifi Kabul Et (200.000 ₺ Kasaya Girsin)",
        desc: "Bağışı kabul et, yeğeni özel statüde kaydet ve bütçeyi ferahlat.",
        cost: -200000, // Gelir!
        reputationDelta: -8,
        cohesionDelta: -16,
        stressDelta: 12,
        academicDelta: -8,
        outcomeText: "Kasaya yüklü bir para girdi fakat yeğenin kuralsız tavırları yurtta huzuru bozdu. Talebeler 'Biz gece gündüz çalıştık, parası olan torpille girdi' diyerek derin hayal kırıklığı yaşadı."
      }
    ]
  },
  {
    id: "event_kulliyat_alimi",
    title: "Kütüphane ve Yazma Eser / Külliyat Alımı",
    category: "Akademik Fırsat",
    badge: { text: "Nadir Külliyat", bg: "bg-indigo-100", textCol: "text-indigo-800" },
    icon: "book-open",
    description: "Yakın zamanda vefat eden ordinaryüs bir ilahiyat profesörünün varisleri, Beyazıt Sahaflar Çarşısı aracılığıyla merhumun 40 yıllık şahsi ihtisas kütüphanesini satışa çıkardı.\n\nİçinde Beyzâvî, Hidâye ve Telvîh'in nadir taşbaskı şerhleri ile ilk baskı 800 ciltlik fıkıh-kelam külliyatı bulunuyor. Sahaflar çarşısı derneği başkanı ilk teklifi kurumumuza getirdi.",
    options: [
      {
        label: "Tüm Külliyatı Satın Al (Kütüphaneye Kazandır - 95.000 ₺)",
        desc: "Bütçeyi zorla, 95.000 ₺ ödeyerek koleksiyonun tamamını kurum kütüphanesine kat.",
        cost: 95000,
        reputationDelta: 6,
        cohesionDelta: 6,
        stressDelta: -3,
        academicDelta: 18,
        outcomeText: "Kütüphanemiz bir hazineye kavuştu! Doktora ve yüksek lisans araştırmacıları kurumumuza akın etmeye başladı. Talebelerin klasik kaynaklara doğrudan erişimi sağlandı."
      },
      {
        label: "Yalnızca Temel 50 Eseri Seçip Al (30.000 ₺)",
        desc: "Sadece eksik temel metinleri al, bütçeyi sarsmadan mütevazı bir takviye yap.",
        cost: 30000,
        reputationDelta: 2,
        cohesionDelta: 2,
        stressDelta: 0,
        academicDelta: 7,
        outcomeText: "Temel fıkıh ve nahiv rafları zenginleşti; fakat hocalar 'Keşke o nadir tefsir nüshalarını da kaçırmasaydık' demekten kendilerini alamadı."
      }
    ]
  },

  // ==================== 3. MEVZUAT, DENETİM VE BÜROKRASİ ====================
  {
    id: "event_itfaiye_ruhsat",
    title: "İtfaiye Denetimi ve Yangın Merdiveni Zorunluluğu",
    category: "Bürokrasi ve Mevzuat",
    badge: { text: "Resmi Tebligat", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "shield-alert",
    description: "Büyükşehir İtfaiye Daire Başkanlığı müfettişleri yurdumuzda habersiz yangın güvenliği denetimi yaptı. Hazırlanan raporda:\n\n'Mevcut yangın kaçış merdiveninin standartlara uygun olmadığı, yangın söndürme tüplerinin periyodik basınç testlerinin geçtiği tespit edilmiştir. 30 gün içinde çelik yangın merdiveni ve yangın alarm santrali kurulmazsa yurt mühürlenecektir.'",
    options: [
      {
        label: "Yetkili Firmayla Anlaş ve Yangın Merdivenini Yenile (70.000 ₺)",
        desc: "Mevzuata harfiyen uy, çelik merdiven ve duman dedektörlerini tam teşekküllü taktır.",
        cost: 70000,
        reputationDelta: 3,
        cohesionDelta: 4,
        stressDelta: -5,
        academicDelta: 0,
        outcomeText: "Yurt yangın güvenliği ruhsatı eksiksiz alındı. Talebelerin ve velilerin içi ferahladı, kurum teftişten tam notla geçti."
      },
      {
        label: "Belediye ve İtfaiyeden Ek Süre Talep Et / Kısmi Bakım Yap",
        desc: "Sadece yangın tüplerini ve acil aydınlatmaları yenile, büyük merdiveni sonraki yıla ötele.",
        cost: 20000,
        reputationDelta: -3,
        cohesionDelta: -4,
        stressDelta: 10,
        academicDelta: 0,
        outcomeText: "Bürokratik tanıdıklarla 6 ay ek süre alındı ancak kaza riski devam ediyor. Yurt müdürü her akşam yangın alarmı korkusuyla nöbet tutuyor."
      }
    ]
  },
  {
    id: "event_sgk_teftis",
    title: "SGK ve Çalışma Bakanlığı Bordro Teftişi",
    category: "Bürokrasi ve Mevzuat",
    badge: { text: "Maliye & SGK", bg: "bg-blue-100", textCol: "text-blue-800" },
    icon: "file-text",
    description: "Sosyal Güvenlik Kurumu müfettişleri vakıf muhasebesini incelemeye aldı. Aşçı, temizlik personeli ve idari memurların fazla mesai kayıtları ile asgari ücret fark bordroları talep edildi.\n\nMali müşavirimiz: 'Müdürüm, geçmiş dönemde hafta sonu nöbetleri resmi bordroya tam yansıtılmamış. İdari para cezası yememek için 45.000 ₺ geriye dönük prim farkı ödememiz gerekiyor.'",
    options: [
      {
        label: "Tüm Prim ve Nöbet Farklarını Eksiksiz Öde (45.000 ₺)",
        desc: "Çalışanların kul hakkını ve hukuki şeffaflığı gözet, kurumu sıfır riskli temiz bir sicile kavuştur.",
        cost: 45000,
        reputationDelta: 2,
        cohesionDelta: 6,
        stressDelta: -3,
        academicDelta: 0,
        outcomeText: "Personelin yüzü güldü, kuruma olan sadakatleri arttı. SGK teftiş tutanağı 'Mevzuata Uygun' olarak kapatıldı."
      },
      {
        label: "Uzlaşma Komisyonuna Git ve Asgari Tutarla Kapat (18.000 ₺)",
        desc: "Vergi dairesi ve SGK uzlaşma kuruluna itiraz dilekçesi vererek cezayı hafiflet.",
        cost: 18000,
        reputationDelta: -1,
        cohesionDelta: -4,
        stressDelta: 4,
        academicDelta: 0,
        outcomeText: "Ceza miktarı düşürüldü fakat personel 'Hafta sonu nöbetlerimizin karşılığını tam alamadık' diye içten içe kırgınlık yaşadı."
      }
    ]
  },
  {
    id: "event_vize_haftasi",
    title: "İlahiyat Fakültesi Vize/Final Çakışması",
    category: "Talebe ve Eğitim",
    badge: { text: "Üniversite Sınavı", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "calendar",
    description: "Marmara, İstanbul ve 29 Mayıs İlahiyat Fakülteleri'nde vize sınav haftası başladı. Talebe temsilcisi odanıza gelerek:\n\n'Müdürüm, fakülte hocaları aşırı kalın vize kaynakları verdi. Talebeler geceleri sabahlıyor. Kurumumuzun sabah 06:30 Sarf-Nahiv ezber halkasını ve akşam mütalaalarını 10 günlüğüne tatil etmenizi istirham ediyoruz. Aksi takdirde fakülte GANOLARI 2.00'ın altına düşecek.'",
    options: [
      {
        label: "Ezberleri Hafiflet ve Talebelere Vize İzni Ver",
        desc: "Kurum derslerini 10 gün hafiflet, kütüphaneyi 24 saat çay ve meyve ikramıyla açık tut.",
        cost: 8000,
        reputationDelta: 1,
        cohesionDelta: 12,
        stressDelta: -16,
        academicDelta: 4,
        outcomeText: "Talebeler derin bir nefes aldı! Fakülte vize sınavlarından fevkalade yüksek notlar aldılar. Kurumun anlayışlı yönetimi talebe bağlılığını perçinledi."
      },
      {
        label: "Medrese Disiplininden Taviz Yok! Dersler Aynen Devam Etsin",
        desc: "'Gerçek ilim ehli uykusundan feragat eder' diyerek sabah derslerini ve ezberleri eksiksiz uygula.",
        cost: 0,
        reputationDelta: 2,
        cohesionDelta: -14,
        stressDelta: 22,
        academicDelta: -6,
        outcomeText: "Dersler aksamadı lakin talebeler aşırı uykusuzluktan bitap düştü. Fakülte sınavlarında beklenen başarı gelmedi, stres ve gerginlik tavan yaptı."
      }
    ]
  },
  {
    id: "event_tablet_altyapi",
    title: "Talebe Bilgisayar ve Dijital Araştırma Fonu",
    category: "Talebe ve Eğitim",
    badge: { text: "Dijitalleşme", bg: "bg-cyan-100", textCol: "text-cyan-800" },
    icon: "laptop",
    description: "Talebelerimizin büyük kısmı tez, seminer ödevi ve Şâmile/TDV İslâm Ansiklopedisi taramalarını eski cep telefonlarından yapmaya çalışıyor. Talebe meclisi, kütüphaneye 8 adet araştırma bilgisayarı ve talebelere paylaşımlı tablet havuzu kurulmasını talep ediyor.",
    options: [
      {
        label: "Dijital Araştırma Laboratuvarı Kur (65.000 ₺)",
        desc: "8 adet yüksek hızlı bilgisayar, 2 adet endüstriyel tarayıcı ve lisanslı veri tabanı aboneliği al.",
        cost: 65000,
        reputationDelta: 4,
        cohesionDelta: 8,
        stressDelta: -8,
        academicDelta: 15,
        outcomeText: "Kütüphane modern bir araştırma merkezine dönüştü. Talebelerin makale ve tez yazım hızı iki katına çıktı, akademik üretkenlik arttı."
      },
      {
        label: "Talebi Ertele (Sadece Mevcut 2 Eski Bilgisayarı Tamir Ettir)",
        desc: "Bütçeyi sarsma; eski kasaları formatlayıp kullanmaya devam edin.",
        cost: 6000,
        reputationDelta: -1,
        cohesionDelta: -6,
        stressDelta: 5,
        academicDelta: -2,
        outcomeText: "Maddi masraf yapılmadı ancak bilgisayar başında sıra kavgası yaşanmaya devam etti. Gençler günümüz araştırma imkânlarından mahrum kaldı."
      }
    ]
  },
  {
    id: "event_asci_ayrilmasi",
    title: "Baş Aşçının Ayrılması ve Yemekhane Boykotu",
    category: "Yurt ve İdare",
    badge: { text: "Yurt Krizi", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "coffee",
    description: "Yıllardır lezzetli yemekleriyle talebelerin gönlünü fetheden Bolulu baş aşçımız memleketteki ailevi sebeplerle ayrılmak zorunda kaldı. Yerine alelacele tutulan ucuz şirket personeli yemekleri tatsız, tuzsuz ve soğuk çıkardı.\n\nDün akşam çıkan lapalaşmış pirinç pilavı ve yanık çorba üzerine talebeler yemekhaneye inmeyip çay ocağında boykot başlattı.",
    options: [
      {
        label: "İyi Bir Mengenli Ustayla Anlaş (Maaşı Yüksek Tut - 40.000 ₺)",
        desc: "Piyasadan referanslı, talebe dilinden anlayan tecrübeli bir aşçıbaşı transfer et.",
        cost: 40000,
        reputationDelta: 2,
        cohesionDelta: 14,
        stressDelta: -10,
        academicDelta: 3,
        outcomeText: "Yeni usta mutfağa girer girmez nefis güveçler ve sıcak sıcak tatlılar çıkardı! Talebeler sevinçle alkış tuttu, yemekhane boykotu bitti."
      },
      {
        label: "Mevcut Personele İhtar Ver ve Menüyü Düzeltmesini İste",
        desc: "Yeni aşçı arama masrafına girme, yurt müdürünü mutfağa denetçi olarak görevlendir.",
        cost: 5000,
        reputationDelta: -3,
        cohesionDelta: -10,
        stressDelta: 8,
        academicDelta: -2,
        outcomeText: "Yemekler bir tık düzelse de eski lezzet yakalanamadı. Talebelerin dışarıdan çiğ köfte ve döner siparişi vermesiyle yurt bütçesi ve hijyen zorlandı."
      }
    ]
  },
  {
    id: "event_ramazan_kumanya",
    title: "Ramazan Erzak ve Kumanya Seferberliği",
    category: "Hayırsever & Çevre",
    badge: { text: "Ramazan İnfakı", bg: "bg-emerald-100", textCol: "text-emerald-800" },
    icon: "gift",
    description: "Mübarek Ramazan ayı yaklaşıyor. Fatih ve çevre ilçelerdeki ihtiyaç sahibi 250 aileye talebelerimizin bizzat dağıtacağı Ramazan erzak kolileri hazırlanması teklif edildi.\n\nİdare: 'Hocam, hem talebelerimiz halkla kaynaşır ve infak ahlakını yaşar, hem de vakfımızın çevre esnafı ve halk nezdindeki muhabbeti ziyadeleşir.' diyor.",
    options: [
      {
        label: "250 Aileye Zengin Kumanya Paketi Hazırla (85.000 ₺)",
        desc: "Kavurma, zeytinyağı, bakliyat ve temel gıdalardan oluşan paketleri talebelerle bizzat kapı kapı dağıt.",
        cost: 85000,
        reputationDelta: 9,
        cohesionDelta: 15,
        stressDelta: -6,
        academicDelta: 2,
        outcomeText: "Göz yaşartıcı sahneler yaşandı! Talebeler erzak kolilerini sırtlayıp yoksul hanelere ulaştırdı. Mahalle halkının duası ve vakfın itibarı arşa yükseldi."
      },
      {
        label: "Mütevazı 100 Koli Dağıt (30.000 ₺)",
        desc: "Bütçeyi aşırı zorlamadan temel ihtiyaç maddelerinden oluşan 100 koli ile yetin.",
        cost: 30000,
        reputationDelta: 4,
        cohesionDelta: 6,
        stressDelta: -2,
        academicDelta: 1,
        outcomeText: "Hayırlı bir hizmet ifa edildi, 100 hanenin yüzü güldürüldü. Bütçe dengesi korundu."
      }
    ]
  },
  {
    id: "event_deprem_karot",
    title: "Deprem Güçlendirme ve Karot Testi İkilemi",
    category: "Bürokrasi ve Mevzuat",
    badge: { text: "Deprem Riski", bg: "bg-red-100", textCol: "text-red-800" },
    icon: "alert-triangle",
    description: "İstanbul genelinde beklenen Marmara Depremi sebebiyle İlçe Belediyesi ve Çevre Şehircilik Müdürlüğü, 2000 yılı öncesi yapılan binalarda karot ve zemin etüdü yapılmasını zorunlu kıldı.\n\nEğer bina riskli çıkarsa 90 gün içinde boşaltılması gerekecek. Yurt müdürü: 'Hocam karot testi yaptırırsak mühürlenme riski var, yaptırmazsak büyük vebal altındayız.' diyor.",
    options: [
      {
        label: "Kapsamlı Deprem İncelemesi Yaptır ve Güçlendirme Projesi Başlat (90.000 ₺)",
        desc: "Can güvenliği her şeyin başıdır. Üniversite inşaat kürsüsünden hocalarla binayı güçlendir.",
        cost: 90000,
        reputationDelta: 5,
        cohesionDelta: 8,
        stressDelta: -8,
        academicDelta: 0,
        outcomeText: "Kolon ve kirişlere karbon elyaf güçlendirme yapıldı, bina depreme dayanıklı hale getirildi. Veliler kuruma şükran mektupları gönderdi."
      },
      {
        label: "Sadece Yüzeysel Çatlak ve Sıva Onarımı Yap (20.000 ₺)",
        desc: "Resmi karot testine girip tahliye riskini tetikleme; gözle görünen yerleri onar.",
        cost: 20000,
        reputationDelta: -4,
        cohesionDelta: -8,
        stressDelta: 14,
        academicDelta: 0,
        outcomeText: "Maddi masraf ertelendi ancak talebeler arasında 'Binamız depreme dayanıklı değil' fısıltıları yayıldı. Her sarsıntıda panik yaşanıyor."
      }
    ]
  },
  {
    id: "event_yabanci_ikamet",
    title: "Yabancı Uyruklu Talebe ve İkamet İzni Çıkmazı",
    category: "Bürokrasi ve Mevzuat",
    badge: { text: "Göç İdaresi", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "globe",
    description: "Balkanlar, Dağıstan ve Orta Asya'dan kurumumuzda okuyan 4 seçkin yabancı uyruklu talebemizin öğrenci ikamet izinleri yeni Göç İdaresi genelgesi sebebiyle askıya alındı. Deporte (sınır dışı) edilme tehlikesiyle karşı karşıyalar.\n\nHukuk danışmanımız: 'Acilen avukat tutulup dava açılması, üniversite yabancı öğrenci harçlarının ve sağlık sigortalarının vakıfça ödenmesi şart.' diyor.",
    options: [
      {
        label: "Tüm Harç ve Hukuki Masrafları Karşıla, Talebeleri Koru (45.000 ₺)",
        desc: "İslam kardeşliği sınır tanımaz. 4 yetenekli ilim yolcusunun ikametini yasal olarak garantiye al.",
        cost: 45000,
        reputationDelta: 4,
        cohesionDelta: 10,
        stressDelta: -6,
        academicDelta: 6,
        outcomeText: "İkamet izinleri başarıyla yenilendi! Dağıstanlı ve Boşnak talebeler sevinç gözyaşlarıyla hocalarına sarıldı. Kurumun ümmet vizyonu güçlendi."
      },
      {
        label: "Talebeler Kendi İmkanlarıyla Çözsün / Memleketlerine Dönsünler",
        desc: "Vakıf bütçesini yabancı uyruklu mevzuat masraflarına harcama.",
        cost: 0,
        reputationDelta: -6,
        cohesionDelta: -14,
        stressDelta: 16,
        academicDelta: -8,
        outcomeText: "Talebelerden ikisi vize ihlali sebebiyle sınır dışı edildi. Kalan öğrencilerde derin bir sahipsizlik duygusu ve keder oluştu."
      }
    ]
  },
  {
    id: "event_sosyal_medya",
    title: "Sosyal Medya ve Tanıtım İkilemi",
    category: "Vakıf İdaresi",
    badge: { text: "Medya ve İhlas", bg: "bg-purple-100", textCol: "text-purple-800" },
    icon: "video",
    description: "Genç idareciler ve talebe temsilcileri, kurumun ders halkalarını, fıkıh münazaralarını ve kütüphane hayatını profesyonel YouTube ve Instagram videolarıyla yayınlamak istiyor.\n\nEski ekol kıdemli hocalarımız ise sert çıkıyor: 'İlim şov malzemesi yapılamaz! Kamera giren meclisten ihlas uçar, talebeler beğeni ve izlenme peşinde nefislerine yenilir.'",
    options: [
      {
        label: "Dengeli Bir Dijital Medya Ekibi Kur (Kamera & Kurgu: 35.000 ₺)",
        desc: "Aşırıya kaçmadan, sadece ilmi sohbetleri ve sempozyumları kaliteli çekimle kamuoyuna aktar.",
        cost: 35000,
        reputationDelta: 8,
        cohesionDelta: 2,
        stressDelta: -2,
        academicDelta: 4,
        outcomeText: "Yayınlanan seminer kesitleri internette yüzbinlerce kişiye ulaştı! Vakfımıza yeni genç bağışçılar ve parlak lise mezunları akın etmeye başladı."
      },
      {
        label: "Geleneksel Çizgiyi Koru (Kamera ve Yayına İzin Verme)",
        desc: "Kurumu dijital gürültüden uzak tut, ihlas ve mahremiyet ilkesinden taviz verme.",
        cost: 0,
        reputationDelta: 2,
        cohesionDelta: 4,
        stressDelta: 0,
        academicDelta: 3,
        outcomeText: "Hocaların gönlü hoş tutuldu, medresenin mahrem ve vakur havası muhafaza edildi; lakin yeni nesil gençlere ve modern fonlara ulaşım sınırlı kaldı."
      }
    ]
  },
  {
    id: "event_muftuluk_sempozyum",
    title: "Diyanet ve İl Müftülüğü ile Ortak Sempozyum",
    category: "Akademik Fırsat",
    badge: { text: "Sempozyum", bg: "bg-emerald-100", textCol: "text-emerald-800" },
    icon: "award",
    description: "İstanbul İl Müftülüğü ve Diyanet Akademisi, kurumumuza 'Klasik Medrese Fıkhının Günümüz Finans ve Biyoetik Sorunlarına Çözümleri' başlıklı ortak bir ulusal sempozyum düzenleme teklifi getirdi.\n\nOrganizasyonun salon, tebliğ kitapçığı basımı ve misafir ulemanın ağırlama masraflarının yarısı vakfımıza ait olacak (55.000 ₺).",
    options: [
      {
        label: "Teklifi Kabul Et ve Ev Sahipliği Yap (55.000 ₺)",
        desc: "Diyanet camiasıyla köprü kur, kurumumuzun ilmi ağırlığını devlet protokolüne göster.",
        cost: 55000,
        reputationDelta: 10,
        cohesionDelta: 6,
        stressDelta: 2,
        academicDelta: 14,
        outcomeText: "Muazzam bir sempozyum icra edildi! Diyanet İşleri Başkanı bizzat katılarak kurumumuzu övdü. İtibarımız tavan yaptı."
      },
      {
        label: "Bütçe Yetersizliği Sebebiyle Nazikçe Teşekkür Et",
        desc: "55.000 ₺ harcamayı göze alma; kurumun kendi iç eğitimine odaklan.",
        cost: 0,
        reputationDelta: -2,
        cohesionDelta: 0,
        stressDelta: 0,
        academicDelta: 0,
        outcomeText: "Maddi kaynak kasada kaldı fakat resmi ilahiyat ve Diyanet camiasında kaçırılan büyük bir prestij fırsatı olarak kayda geçti."
      }
    ]
  },
  {
    id: "event_yaz_kampi",
    title: "Bolu / Abant Yaz İlim ve Dil Kampı",
    category: "Talebe ve Eğitim",
    badge: { text: "Yaz Kampı", bg: "bg-blue-100", textCol: "text-blue-800" },
    icon: "sun",
    description: "Bahar dönemi bitti. Talebeler, yaz sıcağında İstanbul'un gürültüsünden uzaklaşıp Bolu dağlarında 2 haftalık yoğunlaştırılmış Arapça Belağat ve Tefsir kampı yapılmasını arzuluyor.\n\nYurt müdürü konaklama, otobüs ve yemek masrafları için 60.000 ₺ bütçe çıkarttı.",
    options: [
      {
        label: "Kampı Onayla ve Otobüsleri Kaldır (60.000 ₺)",
        desc: "Talebeleri doğayla baş başa, çam kokuları içinde sabah namazından yatsıya feyizli bir kampa götür.",
        cost: 60000,
        reputationDelta: 4,
        cohesionDelta: 18,
        stressDelta: -20,
        academicDelta: 12,
        outcomeText: "Talebelerin hayatları boyunca unutamayacakları bir ilim kampı oldu! Stres tamamen sıfırlandı, kardeşlik bağları kenetlendi."
      },
      {
        label: "Kampı İptal Et, Eğitimi İstanbul'da Medresede Yap",
        desc: "Yol ve otel masrafına girme; yaz seminerlerini mevcut binada klima altında icra et.",
        cost: 8000,
        reputationDelta: 0,
        cohesionDelta: -8,
        stressDelta: 8,
        academicDelta: 4,
        outcomeText: "Bütçe korundu lakin İstanbul'un yaz sıcağında derslikler bunaltıcı oldu. Talebelerde yorgunluk ve moralsizlik gözlemlendi."
      }
    ]
  },
  {
    id: "event_kurban_hissesi",
    title: "Kurban Bayramı Hissesi ve Et Tedariki",
    category: "Hayırsever & Çevre",
    badge: { text: "Kurban İnfakı", bg: "bg-emerald-100", textCol: "text-emerald-800" },
    icon: "package",
    description: "Kurban Bayramı'nda hayırseverlerimiz kurumumuza 70 hisse kurban bağışladı. Kesimler yapıldı ancak yemekhanenin mevcut buzdolapları bu kadar eti muhafaza edecek kapasitede değil.\n\nAşçıbaşı: 'Müdürüm, acilen sanayi tipi derin dondurucu ve soğuk hava paneli almalıyız, yoksa etler 48 saatte kokacak!' diye feryat ediyor.",
    options: [
      {
        label: "Endüstriyel Soğuk Hava Deposu Kurdur (50.000 ₺)",
        desc: "Tüm kurban etlerini şoklayarak muhafaza et; talebelere 1 tam yıl boyunca kaliteli kırmızı et sağla.",
        cost: 50000,
        reputationDelta: 3,
        cohesionDelta: 12,
        stressDelta: -6,
        academicDelta: 2,
        outcomeText: "Mükemmel bir tesisat kuruldu! 70 hisse et hijyenik olarak saklandı. 1 yıl boyunca yemekhanenin et masrafı sıfıra indi."
      },
      {
        label: "Etin Çoğunu Çevre İhtiyaç Sahiplerine Dağıt, Azını Sakla",
        desc: "Soğutucu yatırımı yapma; etin %80'ini mahalledeki yoksullara paylaştır, kalanını hızlıca tüket.",
        cost: 8000,
        reputationDelta: 7,
        cohesionDelta: 4,
        stressDelta: 0,
        academicDelta: 0,
        outcomeText: "Mahalleli dualar etti, hayırseverler memnun kaldı; fakat 2 ay sonra yemekhanede et bitince kasadan yüksek piyasa fiyatıyla et almak zorunda kaldık."
      }
    ]
  },
  {
    id: "event_gece_mutalaa",
    title: "Gece Mütalaası ve Işık Kapatma Gerilimi",
    category: "Yurt ve İdare",
    badge: { text: "Talebe Anlaşmazlığı", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "moon",
    description: "Yurtta klasik metin ezberleyen gayretli kıdemli öğrenciler gece saat 03:00'e kadar odalarda ışık açık mütalaa yapıyor. Erken yatıp sabah namazına dinç kalkmak isteyen diğer talebeler ise uykusuzluktan şikâyetçi.\n\nİki grup arasında koridorda tartışma çıktı. Yurt müdürü meseleyi hakemliğinize getirdi.",
    options: [
      {
        label: "Kütüphaneyi 24 Saat Açık Tut ve Gece Etüt Odası Yap (15.000 ₺)",
        desc: "Odalarda saat 23:30'da kesin ışık söndürme kuralı koy; gece çalışanlara kütüphanede çay ve sessiz alan tahsis et.",
        cost: 15000,
        reputationDelta: 2,
        cohesionDelta: 8,
        stressDelta: -8,
        academicDelta: 6,
        outcomeText: "Sorun harika bir nizamla çözüldü. Gece çalışanlar kütüphanede feyizle okudu, uyumak isteyenler huzurla dinlendi."
      },
      {
        label: "Sert Saat Kuralı Getir (Gece 24:00'te Tüm Işıklar Sönsün)",
        desc: "Ek masraf yapma; gece ders çalışmayı yasakla, herkesi uyku saatine zorla.",
        cost: 0,
        reputationDelta: -2,
        cohesionDelta: -8,
        stressDelta: 10,
        academicDelta: -5,
        outcomeText: "Disiplin sağlandı ama azimli talebelerin çalışma şevki kırıldı. Bazı öğrenciler yorgan altında el feneriyle ibare çözmeye çalıştı."
      }
    ]
  },
  {
    id: "event_icazet_salonu",
    title: "Mezuniyet ve İcazet Merasimi Masrafları",
    category: "Vakıf İdaresi",
    badge: { text: "Büyük Merasim", bg: "bg-purple-100", textCol: "text-purple-800" },
    icon: "award",
    description: "Kurumumuzun 4 yıllık zorlu klasik ilimler tedrisatını tamamlayan talebelerimiz için icazet merasimi vakti geldi. Aileler, ulema meclisi ve üniversite rektörleri davetli.\n\nMütevelli heyeti ikiye bölündü: Bir grup 'Haliç Kongre Merkezi'nde 1500 kişilik görkemli bir salon kiralayalım' derken, diğer grup 'Kendi tarihi camimizde sade ve mütevazı yapalım' diyor.",
    options: [
      {
        label: "Haliç Kongre Merkezi'nde Büyük Merasim Düzenle (75.000 ₺)",
        desc: "Görkemli cübbe giyme, hatim duası ve ziyafet tertip et; kamuoyuna kurumun gücünü göster.",
        cost: 75000,
        reputationDelta: 10,
        cohesionDelta: 10,
        stressDelta: -4,
        academicDelta: 5,
        outcomeText: "Muazzam bir tören oldu! Televizyonlar ve basın geniş yer verdi. Mezun talebelerin ve ailelerinin gururu gözlerinden okundu. İtibarımız zirve yaptı."
      },
      {
        label: "Tarihi Fatih Camii'nde Sade Hatim ve İcazet Yap (15.000 ₺)",
        desc: "Lüks salon masrafından kaçın; geleneksel cami kürsüsünde dualarla icazetleri dağıt.",
        cost: 15000,
        reputationDelta: 4,
        cohesionDelta: 8,
        stressDelta: -2,
        academicDelta: 3,
        outcomeText: "Maneviyatı yüksek, gözlerden yaş getiren samimi bir merasim oldu. Bütçe zorlanmadı, ulema sadelikten dolayı idareyi tebrik etti."
      }
    ]
  },
  {
    id: "event_kripto_bagis",
    title: "Genç Bir İş İnsanından 'Kripto / Borsa' Bağışı",
    category: "Bağışçı ve Nüfuz",
    badge: { text: "Fıkhi İkilem", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "coins",
    description: "Fintek ve kripto para piyasalarından yüksek kazanç elde eden genç bir girişimci hayırsever, kurumumuza 180.000 ₺ bağış yapmak istediğini belirtti.\n\nAncak Fıkıh hocalarımız arasında tartışma çıktı: Bir hoca 'Kripto varlıkların fıkhi statüsü şüphelidir, medreseye girmesin' derken, diğer hoca 'Girişimcinin yasal şirket kazancıdır, infakı reddedilemez' diyor.",
    options: [
      {
        label: "Şüpheli Parayı Reddet (İlmi Takvayı Ön Plana Al)",
        desc: "İlim ocağımızın kursağından şüpheli kazanç geçmesin diyerek parayı kabul etme.",
        cost: 0,
        reputationDelta: 5,
        cohesionDelta: 6,
        stressDelta: 0,
        academicDelta: 4,
        outcomeText: "Fıkıh hocalarımız kurumun tavizsiz takvasından dolayı tebriklerini sundu. Talebeler şüpheli kazançlardan sakınma dersini bizzat ameli olarak müşahede etti."
      },
      {
        label: "Bağışı Kabul Et ve Talebe Yurdunun Masraflarına Kullan",
        desc: "Ruhsat fetvasını esas al; 180.000 ₺ ile kütüphane ve bina borçlarını kapat.",
        cost: -180000, // Gelir!
        reputationDelta: -3,
        cohesionDelta: 0,
        stressDelta: -4,
        academicDelta: 0,
        outcomeText: "Kasaya ilaç gibi gelen bir nakit girişi oldu, borçlar temizlendi; ancak bazı hocalarda 'Medresemize helalliği tartışmalı para girdi' kırgınlığı oluştu."
      }
    ]
  },
  {
    id: "event_fiber_internet",
    title: "Yurt İnternet Altyapısı ve Güvenli Ağ Filtresi",
    category: "Yurt ve İdare",
    badge: { text: "Teknoloji", bg: "bg-blue-100", textCol: "text-blue-800" },
    icon: "wifi",
    description: "Yurttaki mevcut Wi-Fi altyapısı çöktü. Talebeler online kütüphanelere, üniversite otomasyonuna ve akademik makalelere erişemiyor. Yeni fiber hat çekilecek.\n\nİdarede tartışma konusu: İnternete MEB/Diyanet tarzı katı güvenlik filtresi mi konmalı, yoksa lisansüstü araştırma için sınırsız erişim mi verilmeli?",
    options: [
      {
        label: "Yüksek Hızlı Fiber Hat ve Akıllı Akademik Filtre Kur (28.000 ₺)",
        desc: "Hem sosyal medya bağımlılığını önle hem de akademik ve kütüphane sitelerini son hızda aç.",
        cost: 28000,
        reputationDelta: 2,
        cohesionDelta: 6,
        stressDelta: -6,
        academicDelta: 8,
        outcomeText: "Mükemmel bir dijital denge kuruldu. Gece oyun ve dizi izleme eğilimi engellenirken tez araştırmaları ışık hızına ulaştı."
      },
      {
        label: "Sıradan Ev Tipi Modemle Devam Et (5.000 ₺)",
        desc: "Büyük masrafa girme; mevcut modemleri resetleyip kotalı internet ver.",
        cost: 5000,
        reputationDelta: -2,
        cohesionDelta: -8,
        stressDelta: 8,
        academicDelta: -4,
        outcomeText: "İnternet sürekli koptu. Talebeler mobil internet paketlerini tüketince idareye öfkelendi; tez yazımları aksadı."
      }
    ]
  },
  {
    id: "event_harvard_doktora",
    title: "Kıdemli Mezunun Oxford/Harvard Kabulü",
    category: "Akademik Fırsat",
    badge: { text: "Küresel Başarı", bg: "bg-emerald-100", textCol: "text-emerald-800" },
    icon: "globe-2",
    description: "Kurumumuzdan 2 yıl önce mezun olan ve medrese fıkhını modern hukukla birleştiren yetenekli bir talebemiz, Oxford Üniversitesi Şarkiyat Kürsüsü'ne tam burslu doktora kabulü aldı!\n\nTalebe kuruma gelerek elinizi öptü: 'Hocam, vize, uçak ve ilk yerleşme masraflarım için 50.000 ₺ can suyu desteğine ihtiyacım var. Döndüğümde medresemize hoca olacağım.'",
    options: [
      {
        label: "Yurt Dışı Akademik Hibe Fonu Ayır (50.000 ₺)",
        desc: "Talebemize 50.000 ₺ hibe ver, arkasında durarak uluslararası bir ilim köprüsü kur.",
        cost: 50000,
        reputationDelta: 12,
        cohesionDelta: 8,
        stressDelta: -4,
        academicDelta: 16,
        outcomeText: "Kurumumuzun adı dünya çapında duyuldu! Gazeteler 'Medreseden Oxford'a' manşetleri attı. Diğer talebeler için muazzam bir ilham kaynağı oldu."
      },
      {
        label: "Maddi Destek Veremeyeceğimizi Bildir, Sadece Dua Et",
        desc: "Vakıf kaynaklarını yurt dışına harcama; yerel eğitim bütçesini koru.",
        cost: 0,
        reputationDelta: -3,
        cohesionDelta: -6,
        stressDelta: 4,
        academicDelta: -4,
        outcomeText: "Talebe başka kurumlardan borç bularak gitti lakin 'Kendi kurumum beni en kritik anda yalnız bıraktı' kırgınlığını ömür boyu unutamadı."
      }
    ]
  },
  {
    id: "event_mescid_hali",
    title: "Mescid Halıları ve Ses Sistemi Yenilenmesi",
    category: "Yurt ve İdare",
    badge: { text: "Mescid Bakımı", bg: "bg-emerald-100", textCol: "text-emerald-800" },
    icon: "sparkles",
    description: "Kurum mescidimizin halıları 12 yıllık yoğun cemaat namazları ve mukabeleler sebebiyle aşındı ve koku yapmaya başladı. Ses sistemindeki cızırtı ise sabah namazı tilavetlerinin ahengini bozuyor.\n\nYurt müdürü mescidin yün halı ve kablosuz ses sistemiyle tefrişi için 45.000 ₺ teklif getirdi.",
    options: [
      {
        label: "Mescidi Baştan Aşağı Yenile (45.000 ₺)",
        desc: "Saf yün antibakteriyel halı döşet, akustik ses sistemi kurdurarak huzurlu bir ibadet iklimi sağla.",
        cost: 45000,
        reputationDelta: 4,
        cohesionDelta: 10,
        stressDelta: -8,
        academicDelta: 2,
        outcomeText: "Mescid mis gibi gül suyu koktu! Talebeler ve cuma cemaati huzur içinde ibadet etti. Kurumun manevi çehresi parıldadı."
      },
      {
        label: "Mevcut Halıları Yıkat ve İdare Et (8.000 ₺)",
        desc: "Halıları değiştirmek yerine profesyonel yıkama servisi çağır, mikrofonu lehimlet.",
        cost: 8000,
        reputationDelta: 0,
        cohesionDelta: 2,
        stressDelta: -2,
        academicDelta: 0,
        outcomeText: "Halılar temizlendi, koku giderildi. Bütçe sarsılmadan pratik bir çözüm üretildi."
      }
    ]
  },
  {
    id: "event_salgin_grip",
    title: "Yurt Odalarında Ağır Grip ve Salgın Dalgası",
    category: "Yurt ve İdare",
    badge: { text: "Sağlık Salgını", bg: "bg-red-100", textCol: "text-red-800" },
    icon: "thermometer",
    description: "Kış mevsiminde yurda yayılan domuz gribi (İnfluenza) sebebiyle 35 talebeden 18'i 39 derece ateşle yatak döşek yatıyor. Derslikler boşaldı, öksürük sesleri koridorları sardı.\n\nYurt hekimi: 'Müdürüm acil karantina odası kurmalı, serum ve vitamin takviyesi yapmalı, yemekhaneden zencefilli tavuk çorbası ve bal çıkartmalıyız.' diyor.",
    options: [
      {
        label: "Kapsamlı Sağlık Seferberliği Başlat (30.000 ₺)",
        desc: "Özel doktor ve hemşire getir, tüm odaları dezenfekte et, kaliteli vitamin ve sıcak menü uygula.",
        cost: 30000,
        reputationDelta: 3,
        cohesionDelta: 12,
        stressDelta: -10,
        academicDelta: 2,
        outcomeText: "Talebeler 4 günde ayağa kalktı! Veliler kurumun evlatlarına gösterdiği şefkat ve alakadan dolayı gözyaşlarıyla teşekkür etti."
      },
      {
        label: "Revirdeki Ağrı Kesicilerle İdare Et ve Dinlenmeye Bırak",
        desc: "Ek masraf yapma; hastaları odalarında istirahate çek, dersleri hafiflet.",
        cost: 4000,
        reputationDelta: -3,
        cohesionDelta: -8,
        stressDelta: 12,
        academicDelta: -6,
        outcomeText: "Salgın 2 haftadan fazla sürdü. Birkaç öğrencinin durumu ağırlaşınca acil servise kaldırıldı, veliler ihmalkârlık sebebiyle kuruma sitem etti."
      }
    ]
  },
  {
    id: "event_belediye_protokol",
    title: "Belediyeden Nakdi Gençlik Hibesi ve Protokol Teklifi",
    category: "Bağışçı ve Nüfuz",
    badge: { text: "Kamu Hibesi", bg: "bg-blue-100", textCol: "text-blue-800" },
    icon: "landmark",
    description: "İlçe Belediyesi Kültür Müdürlüğü, kurumumuza 100.000 ₺ nakdi gençlik proje hibesi vermek istiyor. Ancak protokol gereği belediyenin aylık bülteninde ve açılış törenlerinde vakfımızın adının siyasi protokolün yanında sıkça anılması gerekecek.\n\nMütevelli heyeti 'Bu hibe kasayı çok rahatlatır ama siyasi yafta yer miyiz?' diye tereddüt ediyor.",
    options: [
      {
        label: "Protokolü İmzala ve Hibeyi Al (100.000 ₺ Kasaya Girsin)",
        desc: "Kamu fonlarından yararlan, parayı talebe burslarına ve bina tadilatına kullan.",
        cost: -100000, // Gelir!
        reputationDelta: 1,
        cohesionDelta: 2,
        stressDelta: -3,
        academicDelta: 3,
        outcomeText: "Kasaya 100.000 ₺ girdi ve mali nefes alındı; ancak muhalif çevrelerden 'Belediyenin arka bahçesi oldular' homurtuları yükseldi."
      },
      {
        label: "Siyasi Protokolden Kaçın ve Bağımsızlığı Koru",
        desc: "Kurumun sivil ve her kesime eşit mesafedeki ilmi tarafsızlığını korumak için hibeyi reddet.",
        cost: 0,
        reputationDelta: 5,
        cohesionDelta: 6,
        stressDelta: 0,
        academicDelta: 2,
        outcomeText: "Hibe alınamadı lakin kurumun sivil duruşu ve bağımsız ilim ocağı kimliği akademi dünyasında saygıyla karşılandı."
      }
    ]
  },
  {
    id: "event_temsilci_secimi",
    title: "Talebe Temsilcisi Seçimi ve Odalar Arası Rekabet",
    category: "Talebe ve Eğitim",
    badge: { text: "Öğrenci Meclisi", bg: "bg-indigo-100", textCol: "text-indigo-800" },
    icon: "users",
    description: "Her yıl yapılan Talebe Temsilciliği seçimi yaklaştı. İki aday yarışıyor: Biri Fıkıh ve disiplin ağırlıklı gelenekçi bir kıdemli talebe, diğeri sosyal etkinlikleri ve üniversite kulüplerini öne çıkaran popüler bir öğrenci.\n\nOdalar arasında kulisler yapılıyor, tatlı ikramları dağıtılıyor. İdare bu süreci nasıl yönlendirmeli?",
    options: [
      {
        label: "Tüm Talebelere Ziyafet Ver ve Seçimi Şölene Dönüştür (16.000 ₺)",
        desc: "Vakıf bahçesinde mangal ve tatlı ikramı yap, demokratik ve kardeşçe bir meclis kur.",
        cost: 16000,
        reputationDelta: 2,
        cohesionDelta: 14,
        stressDelta: -10,
        academicDelta: 3,
        outcomeText: "Seçim bayram havasında geçti! Kazanan aday kaybedeni kucakladı. Talebelerin idareye güveni ve aralarındaki uhuvvet zirve yaptı."
      },
      {
        label: "Müdahale Etme; Kendi Aralarında Oylasınlar",
        desc: "Ek masraf yapma; odalarında sandık kurup neticeyi idareye bildirsinler.",
        cost: 0,
        reputationDelta: 0,
        cohesionDelta: -2,
        stressDelta: 2,
        academicDelta: 0,
        outcomeText: "Seçim olaysız bitti fakat taraflar arasında hafif bir soğukluk kaldı."
      }
    ]
  },
  {
    id: "event_metin_tahkiki",
    title: "Klasik Metin Tahkiki ve Neşir Fonu",
    category: "Akademik Fırsat",
    badge: { text: "Yazma Eser Neşri", bg: "bg-emerald-100", textCol: "text-emerald-800" },
    icon: "edit-3",
    description: "Süleymaniye Kütüphanesi'nde tek nüshası bulunan Osmanlı dönemi fakihlerinden birine ait 'Kitâbü'l-Fevâid' adlı fıkıh risalesinin tahkik edilip prestij boy basılması için bir yayınevi teklifte bulundu.\n\nHocalarımız: 'Talebelerimiz bu tahkiki hocalarının gözetiminde yapsın. Hem yazma eser okuma kabiliyetleri gelişsin hem de adları kitapta yer alsın. 35.000 ₺ telif ve teşvik bütçesi ayıralım.' diyor.",
    options: [
      {
        label: "Tahkik Projesini Başlat ve Talebeleri Teşvik Et (35.000 ₺)",
        desc: "Talebelerin akademik özgüvenini zirveye taşı, kurum adına prestijli bir ilmi eser yayınla.",
        cost: 35000,
        reputationDelta: 8,
        cohesionDelta: 6,
        stressDelta: 2,
        academicDelta: 16,
        outcomeText: "Eser harika bir baskıyla neşredildi! Talebeler kendi isimlerini taşıyan ciltleri ellerine aldıklarında büyük bir ilim aşkı ve iftihar yaşadı."
      },
      {
        label: "Proje Masrafını Üstlenme, Yayıncılığa Bütçe Ayırma",
        desc: "Talebelerin asli ders programına odaklanmasını iste, neşir projesini ertele.",
        cost: 0,
        reputationDelta: -1,
        cohesionDelta: -2,
        stressDelta: -2,
        academicDelta: -2,
        outcomeText: "Para kasada kaldı fakat talebeler gerçek bir yazma eser tahkik tecrübesinden mahrum kaldı."
      }
    ]
  },
  {
    id: "event_camasirhane_ariza",
    title: "Çamaşırhane Kazanının Patlaması",
    category: "Yurt ve İdare",
    badge: { text: "Fiziksel Kaza", bg: "bg-red-100", textCol: "text-red-800" },
    icon: "tool",
    description: "Yurdun alt katındaki 20 yıllık sanayi tipi çamaşır yıkama ve kurutma tesisatında basınç valfi patladı. Şans eseri yaralanan olmadı ancak çamaşırhane tamamen devre dışı kaldı.\n\nTalebelerin nevresimleri ve elbiseleri yıkanamıyor. Yurt müdürü acil 3 adet dayanıklı profesyonel makine alınmasını istiyor.",
    options: [
      {
        label: "Sanayi Tipi Sıfır Çamaşırhane Ünitesi Kurdur (48.000 ₺)",
        desc: "Garantili, sessiz ve yüksek kapasiteli makinelerle çamaşırhaneyi baştan inşa et.",
        cost: 48000,
        reputationDelta: 2,
        cohesionDelta: 8,
        stressDelta: -6,
        academicDelta: 0,
        outcomeText: "Mükemmel ve pırıl pırıl bir çamaşırhane kuruldu. Talebelerin kıyafet ve nevresim temizliği aksamadan çözüldü."
      },
      {
        label: "Eski Makineleri Çıkma Parçalarla Tamir Ettir (14.000 ₺)",
        desc: "Büyük harcama yapma; sanayiden ikinci el motor ve conta uydur.",
        cost: 14000,
        reputationDelta: -2,
        cohesionDelta: -6,
        stressDelta: 8,
        academicDelta: 0,
        outcomeText: "Makineler çalıştı lakin sık sık sigorta attırıyor ve çamaşırları tam sıkmıyor. Şikâyetler devam ediyor."
      }
    ]
  },
  {
    id: "event_iftar_evsahipligi",
    title: "Hayırseverler Meclisi İftar Yemeği",
    category: "Bağışçı ve Nüfuz",
    badge: { text: "Vakıf Ziyafeti", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "coffee",
    description: "Ramazan ortasında kurumumuza destek veren 40 büyük iş insanı ve bürokratı ağırlayacağımız yıllık geleneksel iftar vakti geldi.\n\nMali müşavirimiz: 'Müdürüm, ya Boğaz'da prestijli bir restoranda ağırlayıp cömertliklerini tetikleyeceğiz ya da tarihi medrese avlumuzda samimi ama mütevazı bir iftar sofrası kuracağız.'",
    options: [
      {
        label: "Tarihi Medrese Avlusunda Samimi İftar Sofrası Kur (35.000 ₺)",
        desc: "Lüks şatafattan kaçın; talebelerin ilahi okuduğu, manevi atmosferin buram buram hissedildiği bir sofra kur.",
        cost: 35000,
        reputationDelta: 6,
        cohesionDelta: 10,
        stressDelta: -4,
        academicDelta: 2,
        outcomeText: "İş insanları otel salonlarından bıkmışlardı! Medrese avlusundaki maneviyat ve talebelerin nezaketi hepsini derinden etkiledi. Güven ve bağışlar arttı."
      },
      {
        label: "Boğaz'da Prestijli Restoranda Ağırla (80.000 ₺)",
        desc: "Holding sahiplerine yakışır lüks bir protokol iftarı tertip et.",
        cost: 80000,
        reputationDelta: 4,
        cohesionDelta: -4,
        stressDelta: 2,
        academicDelta: 0,
        outcomeText: "Zengin bir davet oldu ancak bazı hayırseverler 'Vakfın parası lüks otellere mi harcanıyor?' diye fısıldaştı."
      }
    ]
  },
  {
    id: "event_kirat_hafizlik",
    title: "Kıraat ve Aşere-Takrib Hocalığı Talebi",
    category: "Akademik Fırsat",
    badge: { text: "Kur'an İlimleri", bg: "bg-indigo-100", textCol: "text-indigo-800" },
    icon: "book",
    description: "Talebelerimizin yarıya yakını lisede hafızlığını tamamlamış gençlerden oluşuyor. Reisü'l-Kurra ekolünden icazetli kıdemli bir Kur'an hocası, haftada 2 gün kuruma gelip Aşere-Takrib ve tashih-i huruf halkası açabileceğini bildirdi.\n\nAylık huzur hakkı ve ulaşım bedeli: 22.000 ₺.",
    options: [
      {
        label: "Hocayı Kadroya Kat ve Kıraat Halkasını Aç (22.000 ₺/ay)",
        desc: "Talebelerin hafızlıklarını taçlandır, Kur'an tilavetinde zirve bir mektep ol.",
        cost: 22000,
        reputationDelta: 5,
        cohesionDelta: 8,
        stressDelta: -6,
        academicDelta: 10,
        outcomeText: "Mescitten yükselen aşr-ı şerif sesleri gönülleri titretti! Talebeler makam ve tecvid inceliklerini kavradı. İlim ve irfan birleşti."
      },
      {
        label: "Müfredat Yoğunluğu Sebebiyle Teklifi Geri Çevir",
        desc: "Mevcut Sarf, Nahiv ve Fıkıh dersleri yeterli diyerek ek maliyete girme.",
        cost: 0,
        reputationDelta: 0,
        cohesionDelta: -2,
        stressDelta: 0,
        academicDelta: 0,
        outcomeText: "Ek masraf yapılmadı; lakin hafız talebeler Kur'an dersi alamadıkları için burukluk hissetti."
      }
    ]
  },
  {
    id: "event_kacak_isitici",
    title: "Odada Kaçak Elektrikli Soba ve Yangın Riski",
    category: "Yurt ve İdare",
    badge: { text: "Yurt Disiplini", bg: "bg-red-100", textCol: "text-red-800" },
    icon: "zap",
    description: "Yurt müdürü gece denetiminde 204 numaralı odada kaçak bir elektrikli ısıtıcı ve kettle yakaladı. Prizlerin erimeye başladığı ve yangın tehlikesi atlattığı görüldü.\n\nİdare: 'Talebeler üşüdükleri için getirmiş ama binayı yakabilirlerdi. Ağır disiplin cezası mı verelim yoksa yurdun peteklerini mi güçlendirelim?' diye soruyor.",
    options: [
      {
        label: "Tesisatı Güçlendir ve Odaya Ek Radyatör Taktır (18.000 ₺)",
        desc: "Talebeleri cezalandırmak yerine üşüme sorununu kökten çöz; yangın emniyetini sağla.",
        cost: 18000,
        reputationDelta: 2,
        cohesionDelta: 8,
        stressDelta: -6,
        academicDelta: 1,
        outcomeText: "Petekler genişletildi, odalar sıcacık oldu. Kaçak ısıtıcı ihtiyacı kalmadı, yangın riski tamamen ortadan kalktı."
      },
      {
        label: "Oda Sakinlerine Disiplin Cezası Ver ve Sobayı Müsadere Et",
        desc: "Maddi masraf yapma; kuralları çiğneyen talebelerin bursunu 1 ay askıya al.",
        cost: 0,
        reputationDelta: -1,
        cohesionDelta: -12,
        stressDelta: 14,
        academicDelta: -4,
        outcomeText: "Disiplin mesajı verildi ancak talebeler soğukta kalmaya devam etti. İdareye karşı soğukluk ve kırgınlık oluştu."
      }
    ]
  },
  {
    id: "event_bursa_konya_gezi",
    title: "Selçuklu ve Osmanlı İlim Merkezleri Gezisi",
    category: "Talebe ve Eğitim",
    badge: { text: "İlim Gezisi", bg: "bg-cyan-100", textCol: "text-cyan-800" },
    icon: "compass",
    description: "Talebe meclisi, hafta sonu Bursa Ulucami, Muradiye Medreseleri ve Konya Karatay Medresesi'ni ziyaret etmek üzere 2 günlük bir ilim ve tarih seyahati talep ediyor.\n\nHocalarımız: 'Talebelerin Osmanlı ve Selçuklu ilim hafızasını yerinde görmesi ufkunu açar.' görüşünde. Otobüs ve konaklama bütçesi: 42.000 ₺.",
    options: [
      {
        label: "Geziyi Onayla ve Otobüsleri Tahsis Et (42.000 ₺)",
        desc: "Talebeleri ecdadın ilim ocaklarına götür, moral ve tarih bilincini tazelet.",
        cost: 42000,
        reputationDelta: 4,
        cohesionDelta: 16,
        stressDelta: -14,
        academicDelta: 8,
        outcomeText: "Muhteşem bir seyahat oldu! Talebeler Molla Fenârî ve Sadreddin Konevî türbelerinde dualar etti, medrese mimarisini inceledi. Uhuvvet katlandı."
      },
      {
        label: "Ekonomik Gerekçelerle Geziyi Gelecek Yıla Ertele",
        desc: "Nakit akışını riske atma; geziyi daha sonraya bırak.",
        cost: 0,
        reputationDelta: -1,
        cohesionDelta: -6,
        stressDelta: 4,
        academicDelta: 0,
        outcomeText: "Talebeler üzüldü fakat bütçe dengesi korundu."
      }
    ]
  },
  {
    id: "event_zekat_fonu",
    title: "Zekat Fonu Ayırma ve Şer'i Muhasebe Denetimi",
    category: "Mali İkilem",
    badge: { text: "Fıkhi Muhasebe", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "scale",
    description: "Hayırseverlerden gelen bağışların bir kısmı 'Zekat', bir kısmı ise 'Genel Vakıf Bağışı' olarak yatırılıyor. Fıkıh kuralı gereği zekat parası binanın boyasına, klimasına veya genel işletme giderlerine harcanamaz; yalnızca doğrudan muhtaç talebelerin mülkiyetine (bursuna) verilmelidir.\n\nMali müşavirimiz: 'Müdürüm hesapları şer'i standartlara göre tamamen ayırmalıyız. Bunun için özel bir yazılım ve bağımsız fıkhi denetim gerekiyor.'",
    options: [
      {
        label: "Şer'i Muhasebe Yazılımı ve Bağımsız Denetim Kur (25.000 ₺)",
        desc: "Zekat havuzunu kuruşu kuruşuna ayır; bağışçıların ve Allah'ın huzurunda tam şeffaflık sağla.",
        cost: 25000,
        reputationDelta: 7,
        cohesionDelta: 4,
        stressDelta: -2,
        academicDelta: 5,
        outcomeText: "Kurumumuz 'Şer'i ve Mali Şeffaflık Belgesi' aldı! Hassas ve şuurlu zengin bağışçılar güvenle zekatlarını vakfımıza emanet etmeye başladı."
      },
      {
        label: "Mevcut Excel Tablosuyla İdare Et, Masraf Yapma",
        desc: "Manuel takiple devam et, profesyonel yazılım ücretinden kaçın.",
        cost: 0,
        reputationDelta: -2,
        cohesionDelta: 0,
        stressDelta: 4,
        academicDelta: 0,
        outcomeText: "Para kasada kaldı fakat muhasebeci hata yapma korkusuyla sürekli stres altında çalışıyor."
      }
    ]
  },
  {
    id: "event_fen_atolyesi",
    title: "Tıp ve Mühendislik Talebeleri İçin Mantık ve Felsefe Atölyesi",
    category: "Akademik Fırsat",
    badge: { text: "Çift Kanatlı İlim", bg: "bg-blue-100", textCol: "text-blue-800" },
    icon: "cpu",
    description: "Cerrahpaşa Tıp, İTÜ ve Boğaziçi Mühendislik'te okuyup aynı zamanda kurumumuzda yatılı kalan parlak talebelerimiz için 'İslam Düşüncesinde Bilim Tarihi ve Mantık' özel ihtisas atölyesi açılması önerildi.\n\nİSAM ve TÜBİTAK araştırmacısı iki saygın doçent haftalık seminer vermeyi kabul etti. 6 aylık gider: 36.000 ₺.",
    options: [
      {
        label: "Atölyeyi Aç ve Bilim Tarihi Kürsüsü Kur (36.000 ₺)",
        desc: "Geleceğin Müslüman hekim ve mühendislerine klasik mantık ve İslam bilim mirasını aşıla.",
        cost: 36000,
        reputationDelta: 7,
        cohesionDelta: 6,
        stressDelta: -4,
        academicDelta: 16,
        outcomeText: "Muhteşem bir sinerji doğdu! Tıp ve mühendislik talebeleri İbnü'l-Heysem ve Birûnî'nin izinde derinlik kazandı. Kurumun prestiji katlandı."
      },
      {
        label: "Sadece Klasik Dini İlimlerle Yetin, Atölyeyi Açma",
        desc: "Bütçeyi sarsma; müfredatı Sarf ve Fıkıh sınırında tut.",
        cost: 0,
        reputationDelta: -1,
        cohesionDelta: -2,
        stressDelta: 0,
        academicDelta: 0,
        outcomeText: "Masraf yapılmadı ancak fen ve mühendislik talebeleri entelektüel arayışlarında yalnız kaldı."
      }
    ]
  },
  {
    id: "event_servis_minibusu",
    title: "Vakıf Talebe Servis Minibüsü Alımı / Kiralanması",
    category: "Yurt ve İdare",
    badge: { text: "Ulaşım Sorunu", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "truck",
    description: "Sabah saatlerinde İstanbul'da metrobüs ve tramvay izdihamı sebebiyle talebelerimiz üniversitelerindeki sabah 08:30 derslerine yetişmekte büyük çile çekiyor. Yağmurlu günlerde derslere ıslak ve geç kalmış olarak giriyorlar.\n\nYurt müdürü 16 kişilik bir servis minibüsü kiralanması veya satın alınması için talepte bulundu.",
    options: [
      {
        label: "1 Yıllık Servis Minibüsü Hizmeti Kirala (55.000 ₺)",
        desc: "Talebelerin sabah fakültelere, akşam medreseye güvenli ve konforlu ulaşımını sağla.",
        cost: 55000,
        reputationDelta: 3,
        cohesionDelta: 12,
        stressDelta: -14,
        academicDelta: 4,
        outcomeText: "Büyük bir çile sona erdi! Talebeler yollarda helak olmadan, kitaplarını minibüste okuyarak fakültelerine ulaştı. Memnuniyet zirve yaptı."
      },
      {
        label: "İstanbulkart Aylık Abonman Desteği Ver (15.000 ₺)",
        desc: "Servis tutma; talebelere öğrenci İstanbulkart aylık yükleme desteği ver.",
        cost: 15000,
        reputationDelta: 1,
        cohesionDelta: 4,
        stressDelta: -4,
        academicDelta: 1,
        outcomeText: "Ekonomik bir rahatlama sağlandı ancak kalabalık toplu taşıma çilesi kısmen devam etti."
      }
    ]
  },
  {
    id: "event_miras_davasi",
    title: "Eski Bir Hayırseverin Mirasçılarının Dava Açması",
    category: "Bürokrasi ve Mevzuat",
    badge: { text: "Hukuki Kriz", bg: "bg-red-100", textCol: "text-red-800" },
    icon: "gavel",
    description: "Yıllar önce kurumumuza bina tahsis eden merhum bir hayırseverin yurt dışında yaşayan mirasçıları, tahsis sözleşmesine itiraz ederek binanın mülkiyetini geri almak için dava açtı.\n\nVakıf avukatı: 'Müdürüm karşı taraf çok güçlü bir hukuk bürosuyla geliyor. İstinaf ve Yargıtay sürecinde binayı kaybetmemek için iyi bir gayrimenkul hukukçusu ve keşif harçları için 40.000 ₺ gerekiyor.'",
    options: [
      {
        label: "En İyi Avukatlık Bürosuyla Anlaş ve Davayı Sahiplen (40.000 ₺)",
        desc: "Vakfın mülkünü ve merhumun vasiyetini sonuna kadar savun.",
        cost: 40000,
        reputationDelta: 3,
        cohesionDelta: 4,
        stressDelta: -4,
        academicDelta: 0,
        outcomeText: "Mahkeme tedbir kararını lehimize verdi! Binamızın tahliyesi engellendi, merhumun vakfiyesi korundu."
      },
      {
        label: "Mirasçılarla Arabulucuya Git ve Masrafsız Uzlaşma Ara",
        desc: "Pahalı avukat tutma; barodan arabulucu talep et.",
        cost: 10000,
        reputationDelta: -2,
        cohesionDelta: -4,
        stressDelta: 8,
        academicDelta: 0,
        outcomeText: "Süreç uzadı, binanın tapu durumu askıda kaldı. Gelecek yıla dair belirsizlik idareyi endişelendiriyor."
      }
    ]
  },
  {
    id: "event_burs_ara_zam",
    title: "Enflasyon Sebebiyle Talebe Burslarına Ara Zam Talebi",
    category: "Mali İkilem",
    badge: { text: "Burs Zam Talebi", bg: "bg-amber-100", textCol: "text-amber-800" },
    icon: "credit-card",
    description: "Üniversite kitap fiyatları, fakülte fotokopi giderleri ve şehir içi harcamalar katlandı. Mevcut aylık bursla geçinemeyen talebelerimiz toplu bir dilekçeyle idareden burslara ara zam yapılmasını talep etti.\n\nTalebe temsilcisi: 'Müdürüm, arkadaşlarımız fotokopi çektiremiyor, ay sonunu getiremiyor.' diyor.",
    options: [
      {
        label: "Aylık Burslara 1.500 ₺ Ek Zam Yap (Dönemlik Maliyet: 50.000 ₺)",
        desc: "Talebelerin elini rahatlat, ekonomik sıkıntıyı üzerlerinden alarak derslerine odaklanmalarını sağla.",
        cost: 50000,
        reputationDelta: 4,
        cohesionDelta: 16,
        stressDelta: -16,
        academicDelta: 6,
        outcomeText: "Talebelerin yüzü güldü! Maddi kaygılar son buldu, kütüphaneler dolup taştı. Kuruma olan bağlılık perçinlendi."
      },
      {
        label: "Yıl Sonuna Kadar Mevcut Bursu Sabit Tut",
        desc: "Bütçeyi riske atma; enflasyon zammını yeni akademik yıla ertele.",
        cost: 0,
        reputationDelta: -3,
        cohesionDelta: -12,
        stressDelta: 14,
        academicDelta: -4,
        outcomeText: "Kasa korundu lakin talebeler arasında maddi sıkıntı ve moralsizlik baş gösterdi."
      }
    ]
  },
  {
    id: "event_vakiflar_birligi",
    title: "Türkiye İlim Vakıfları Birliği Ortak Fonu",
    category: "Hayırsever & Çevre",
    badge: { text: "Vakıf Dayanışması", bg: "bg-emerald-100", textCol: "text-emerald-800" },
    icon: "handshake",
    description: "İstanbul'daki 12 köklü ilim vakfı (İSAR, İSM, Yavuz Selim vb.) ortak bir dayanışma fonu kurarak Anadolu'daki depremzede talebelere burs ve kardeş kurumlara kriz desteği sağlamak için 50.000 ₺ katılım payı davetinde bulundu.",
    options: [
      {
        label: "Dayanışma Fonuna 50.000 ₺ ile Kurucu Olarak Katıl",
        desc: "Kardeş vakıfların yanında yer al, vakıf birliğinin yönetiminde söz sahibi ol.",
        cost: 50000,
        reputationDelta: 9,
        cohesionDelta: 8,
        stressDelta: -4,
        academicDelta: 4,
        outcomeText: "Büyük bir vefa ve dayanışma örneği sergilendi. Kurumumuz Türkiye genelindeki vakıf camiasında lider konuma yükseldi."
      },
      {
        label: "Kendi İç Giderlerimizi Gerekçe Gösterip Katılma",
        desc: "Kendi talebelerimizin bütçesini riske atmamak için fona dâhil olma.",
        cost: 0,
        reputationDelta: -2,
        cohesionDelta: -2,
        stressDelta: 0,
        academicDelta: 0,
        outcomeText: "Nakit kasada kaldı ancak kardeş kurumlar nezdinde bir miktar 'içe kapanık ve dayanışmadan uzak' intibaı oluştu."
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { VAKIF_EVENTS_DATA };
}
