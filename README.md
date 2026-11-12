# Dârü'l-İlim ve Hikmet: İslami ve Sosyal İlimler Tedrisat Simülasyonu

> **"Niyet hayır, âkıbet hayır, tevfîk Allah'tan — Virâ bismillâh"**

Türkiye'deki saygın ilmi vakıf ve merkezlerin (İSM, İSAR, Yavuz Selim Vakfı vd.) tedrisat geleneklerinden ilham alınarak geliştirilmiş; üniversite eğitimiyle eşzamanlı yürütülen akademik ve manevi bir akademi yönetim simülasyonu.

![GitHub Pages](https://img.shields.io/badge/deployment-GitHub%20Pages-brightgreen)
![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20Vanilla%20ES6-blue)
![Backend](https://img.shields.io/badge/Cloud-Firebase%20Auth%20%26%20Firestore-orange)

---

## 🌟 Temel Özellikler

### 1. 🎓 Akademik Tedrisat & Serbest Müfredat Tasarımı
- **Geniş Müfredat Havuzu (50+ Ders):** Sarf, Nahiv, Mantık, Belagat, Usûl-i Fıkıh, Tefsir, Hadis, Kelam, Tasavvuf, İslam İktisadı, Siyaset Felsefesi, Medeniyet Tarihi, vb.
- **Ders Atama & Kodlama:** Her ders için kod (örn. `SARF-101`, `USL-201`), sınıf seviyesi (Hazırlık, 1-4. Sınıf, Müfredat Dışı), dönem (Güz, Bahar, Yıllık) ve haftalık ders saati belirleme.
- **Atanan Seminerler & Müderris Eşleştirmesi:** Her derse yetkin müderris atama, hocasız dersler için uyarı sistemi ve ders düzenleme paneli.

### 2. 🌟 Talebe İhtisas Programı (Honors / Özel İhtisas Şûrası)
- Hazırlık sınıfı nihayetinde ve 2. senenin başında (16 Ağustos) toplanan **İhtisas & Tedrisat Programı Tasnif Şûrası**.
- Talebelerin istidat, ilim puanı, GANO ve ahlaki sebatına göre `⭐ İhtisasa Uygun` tavsiye algoritması.
- İhtisas sınıfındaki talebelere özel yoğunlaştırılmış etüt, araştırma ve neşriyat imkânları.

### 3. 👥 Talebe & Mülakat Kabul Sistemi
- İstanbul üniversitelerinde (İlahiyat, Hukuk, Tıp, İİBF vb.) okuyan talebe adayları arasından seçim.
- YKS sıralaması, ilim istidadı, ahlak ve zaaflar/mülahazalar incelenerek mülakat komisyonu değerlendirmesi.
- Aylık akademik ve ahlaki raporlar; disiplin, uyarma ve dönem sonu idari toplantıda ihraç süreçleri.

### 4. 🏢 Binalar, Vakıf Mülkleri ve Yurt Sistemi
- 5 seviye kurum binası (Kiralık tarihi binalardan modern medrese külliyelerine).
- 3 seviye yurt imkânı ve kontenjan takibi.
- Hayırsever ve hâmiler üzerinden tahsis ve teberru mekanizması.

### 5. ☁️ Firebase Authentication & Firestore Bulut Kayıt
- **Google ile Giriş Yap:** Oyuncu dilerse tek tıkla Google hesabıyla giriş yapabilir.
- **Otomatik Bulut Senkronizasyonu:** Oyun durumu (bütçe, talebeler, müderrisler, binalar, takvim) anlık olarak Cloud Firestore (`users/{uid}`) üzerinde yedeklenir.
- **Misafir Modu:** Giriş yapmadan `localStorage` üzerinden oynamaya devam edebilme esnekliği.

---

## 🚀 Kurulum ve Çalıştırma

Proje saf HTML5, modern TailwindCSS (CDN) ve modüler Vanilla ES6 JavaScript ile geliştirilmiştir. Ekstra bir derleme (build) veya npm kurulumu gerektirmez.

### Yerel Olarak Çalıştırma:
1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/benliselahaddin-web/darul-ilim-simulasyonu.git
   cd darul-ilim-simulasyonu
   ```
2. Herhangi bir yerel sunucu ile çalıştırın (veya `index.html` dosyasını tarayıcınızda açın):
   ```bash
   npx serve .
   # veya
   python -m http.server 8080
   ```
3. Tarayıcınızda `http://localhost:8080` adresine gidin.

### 🌐 GitHub Pages ile Yayınlama:
Bu repo, GitHub Actions ile otomatik GitHub Pages yayını için yapılandırılmıştır. `main` dalına her push yapıldığında site otomatik olarak güncellenir.

---

## 🏛️ Dizin Yapısı

```
darul-ilim-simulasyonu/
├── .github/
│   └── workflows/
│       └── pages.yml           # GitHub Pages otomatik dağıtım iş akışı
├── css/
│   └── style.css               # Özel animasyonlar ve medrese estetiği teması
├── js/
│   ├── data/
│   │   ├── initialData.js      # Müfredat, hoca, bina, bağışçı ve başlangıç verileri
│   │   └── namesData.js        # Talebe ve hoca isim veri tabanı
│   ├── engine/
│   │   ├── simulationEngine.js # Oyun mantığı, takvim, talebe ve bütçe motoru
│   │   └── firebaseSync.js     # Firebase Auth (Google) ve Firestore bulut senkronizasyonu
│   └── ui/
│       └── app.js              # Arayüz denetimi, sekmeler, modal pencereler ve şûra
├── index.html                  # Ana uygulama arayüzü ve modallar
├── .gitignore
└── README.md
```

---

## 📜 Lisans & Telif
Bu proje ilmi ve tedrisat simülasyonu amacıyla geliştirilmiştir. Tüm hakları saklıdır.
