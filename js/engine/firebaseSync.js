// Dârü'l-İlim ve Hikmet Simülasyonu - Firebase Auth & Cloud Firestore Entegrasyonu (v2.7)
// Google ile Giriş Yap, Cloud Firestore (users/{uid}) Otomatik Bulut Senkronizasyonu

const firebaseConfig = {
  apiKey: "AIzaSyBFP27sXTToHE5Ndg-ffduOti168ML1Ka8",
  authDomain: "darul-ilim-simulasyonu.firebaseapp.com",
  projectId: "darul-ilim-simulasyonu",
  storageBucket: "darul-ilim-simulasyonu.firebasestorage.app",
  messagingSenderId: "627478727585",
  appId: "1:627478727585:web:171f1c58bdd2e2398b19e0"
};

let firebaseAuth = null;
let firestoreDb = null;
let currentAuthUser = null;
let isCloudSyncing = false;
let cloudSaveDebounceTimer = null;
let lastCloudSaveTime = null;

// Firebase Başlatma
function initFirebaseApp() {
  if (typeof firebase !== "undefined") {
    try {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      firebaseAuth = firebase.auth();
      firestoreDb = firebase.firestore();

      // Auth durum dinleyicisi
      firebaseAuth.onAuthStateChanged(handleAuthStateChanged);
      console.log("Firebase Auth & Firestore başarıyla başlatıldı.");
    } catch (err) {
      console.warn("Firebase başlatılırken istisna oluştu:", err);
    }
  } else {
    console.warn("Firebase SDK scriptleri henüz yüklenmedi.");
  }
}

// Auth Durumu Değiştiğinde
async function handleAuthStateChanged(user) {
  currentAuthUser = user;
  renderAuthUI();

  if (user) {
    console.log("Kullanıcı giriş yaptı:", user.displayName, user.email, user.uid);
    // Firestore'dan kayıtlı oyunu otomatik çek
    await loadGameFromCloud(user.uid);
  } else {
    console.log("Misafir (yerel) modda çalışılıyor.");
  }
}

// Google ile Giriş Yap
async function handleGoogleLogin() {
  if (!firebaseAuth) {
    alert("Firebase servisleri henüz hazır değil. Lütfen internet bağlantınızı kontrol edip sayfayı yenileyiniz.");
    return;
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const result = await firebaseAuth.signInWithPopup(provider);
    const user = result.user;
    if (typeof showToastNotification === "function") {
      showToastNotification(`Hoşgeldiniz, ${user.displayName || "Üstad"}! Google hesabınız bağlandı.`, "success");
    }
  } catch (error) {
    console.error("Google Giriş Hatası:", error);
    if (error.code === "auth/popup-blocked") {
      alert("Tarayıcınız Google giriş penceresini engelledi. Lütfen açılır pencerelere izin veriniz.");
    } else if (error.code === "auth/unauthorized-domain") {
      alert("Bu alan adı Firebase Console'da yetkilendirilmemiş. Localhost veya kendi domaininizi Firebase Auth Authorized Domains listesine ekleyiniz.");
    } else if (error.code !== "auth/popup-closed-by-user") {
      alert("Google ile giriş yapılırken bir sorun oluştu: " + error.message);
    }
  }
}

// Çıkış Yap
async function handleGoogleLogout() {
  if (!firebaseAuth) return;
  if (confirm("Google hesabınızdan çıkış yapmak istediğinize emin misiniz? (Oyununuz yerel olarak localStorage'da saklanmaya devam eder)")) {
    try {
      await firebaseAuth.signOut();
      currentAuthUser = null;
      renderAuthUI();
      if (typeof showToastNotification === "function") {
        showToastNotification("Hesabınızdan çıkış yapıldı. Misafir modundasınız.", "info");
      }
    } catch (err) {
      console.error("Çıkış hatası:", err);
    }
  }
}

// Firestore'dan Oyun Verisini Çek (users/{uid})
async function loadGameFromCloud(uid) {
  if (!firestoreDb || !uid) return false;

  try {
    updateCloudSyncUI("loading");
    const docRef = firestoreDb.collection("users").doc(uid);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const data = docSnap.data();
      if (data && data.gameState && data.gameState.isInitialized) {
        console.log("Firestore'dan bulut kaydı bulundu. Yükleniyor...", data.institutionName);
        
        // Simülasyon motoruna bulut kaydını yükle
        if (typeof game !== "undefined" && game.loadFromCloudData) {
          game.loadFromCloudData(data.gameState);
          lastCloudSaveTime = data.lastSavedLocal ? new Date(data.lastSavedLocal) : new Date();

          if (typeof showDashboard === "function") showDashboard();
          if (typeof renderAll === "function") renderAll();

          updateCloudSyncUI("saved");
          if (typeof showToastNotification === "function") {
            showToastNotification(`☁️ Bulut Kaydı Yüklendi: "${data.institutionName}" kurumu kaldığınız yerden devam ediyor.`, "success");
          }
          return true;
        }
      }
    } else {
      console.log("Kullanıcı için henüz Firestore kaydı bulunmuyor. Mevcut yerel oyun senkronize edilecek.");
      // Eğer mevcut yerel oyun açıksa buluta hemen yükle
      if (typeof game !== "undefined" && game.state && game.state.isInitialized) {
        syncGameToCloud(true);
      }
    }
  } catch (err) {
    console.error("Bulut kaydı çekilirken hata:", err);
    updateCloudSyncUI("error");
  }
  return false;
}

// Firestore'a Oyun Verisini Otomatik Kaydet (users/{uid})
function syncGameToCloud(immediate = false) {
  if (!currentAuthUser || !firestoreDb) return;
  if (typeof game === "undefined" || !game.state || !game.state.isInitialized) return;

  if (cloudSaveDebounceTimer) {
    clearTimeout(cloudSaveDebounceTimer);
  }

  const executeSave = async () => {
    try {
      isCloudSyncing = true;
      updateCloudSyncUI("syncing");

      // Firestore serialization için temiz kopyasını çıkar (fonksiyon ve döngüsel referanslardan arındır)
      const cleanGameState = JSON.parse(JSON.stringify(game.state));
      
      // activeModalEvent içindeki option fonksiyonlarını temizle
      if (cleanGameState.activeModalEvent && cleanGameState.activeModalEvent.options) {
        cleanGameState.activeModalEvent.options = cleanGameState.activeModalEvent.options.map(o => ({
          label: o.label || ""
        }));
      }

      const payload = {
        uid: currentAuthUser.uid,
        displayName: currentAuthUser.displayName || "İlim Sevdalısı",
        email: currentAuthUser.email || "",
        photoURL: currentAuthUser.photoURL || "",
        institutionName: cleanGameState.institutionName || "Dârü'l-İlim",
        academicYear: cleanGameState.academicYear || 1,
        currentMonthIndex: cleanGameState.currentMonthIndex || 0,
        currentDay: cleanGameState.currentDay || 1,
        budget: cleanGameState.budget || 0,
        reputation: cleanGameState.reputation || 35,
        totalStudents: (cleanGameState.students || []).filter(s => s.status === "active").length,
        lastSavedLocal: new Date().toISOString(),
        gameState: cleanGameState
      };

      // ServerTimestamp ekle
      if (firebase.firestore && firebase.firestore.FieldValue) {
        payload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
      }

      await firestoreDb.collection("users").doc(currentAuthUser.uid).set(payload, { merge: true });

      isCloudSyncing = false;
      lastCloudSaveTime = new Date();
      updateCloudSyncUI("saved");
    } catch (err) {
      console.warn("Buluta otomatik kayıt başarısız oldu:", err);
      isCloudSyncing = false;
      updateCloudSyncUI("error");
    }
  };

  if (immediate) {
    executeSave();
  } else {
    // 800ms debounce: Çok hızlı tıklamalarda Firestore kotasını korur
    cloudSaveDebounceTimer = setTimeout(executeSave, 800);
  }
}

// Arayüz: Auth Butonları ve Profil Alanı Çizimi
function renderAuthUI() {
  const containers = [
    document.getElementById("authContainerHeader"),
    document.getElementById("authContainerSetup")
  ];

  containers.forEach(container => {
    if (!container) return;

    if (currentAuthUser) {
      const photo = currentAuthUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
      const name = currentAuthUser.displayName || "Üstad";

      if (container.id === "authContainerHeader") {
        // Üst menüde yalnızca profil fotoğrafı gösterilir, isim gizlenir
        container.innerHTML = `
          <div class="relative flex items-center group cursor-pointer" onclick="if(confirm('${name} hesabından çıkış yapmak istiyor musunuz?')) handleGoogleLogout();" title="${name} (Buluta Bağlı • Çıkış için tıkla)">
            <img src="${photo}" alt="${name}" class="w-8 h-8 rounded-full border-2 border-emerald-600 object-cover shadow-sm transition group-hover:ring-2 group-hover:ring-emerald-400" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=047857&color=fff'">
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" title="Buluta Senkronize"></span>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 transition px-2.5 py-1 rounded-xl border border-slate-200">
            <img src="${photo}" alt="${name}" class="w-6 h-6 rounded-full border border-emerald-500 object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=047857&color=fff'">
            <div class="flex flex-col text-left">
              <span class="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">${name}</span>
              <span id="cloudStatusText" class="text-[9px] text-emerald-700 font-semibold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Buluta Bağlı
              </span>
            </div>
            <button onclick="handleGoogleLogout()" title="Çıkış Yap" class="text-slate-400 hover:text-red-600 transition p-1 ml-0.5">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        `;
      }
    } else {
      if (container.id === "authContainerHeader") {
        container.innerHTML = `
          <button onclick="handleGoogleLogin()" title="Google ile Giriş Yap" class="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-300 shadow-sm transition flex items-center gap-1.5 text-xs font-bold">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span class="hidden sm:inline">Giriş Yap</span>
          </button>
        `;
      } else {
        container.innerHTML = `
          <button onclick="handleGoogleLogin()" class="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 shadow-sm transition flex items-center gap-2">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google ile Giriş Yap</span>
          </button>
        `;
      }
    }
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Senkronizasyon Durum Rozeti Güncellemesi
function updateCloudSyncUI(status) {
  const el = document.getElementById("cloudStatusText");
  if (!el) return;

  if (status === "syncing") {
    el.className = "text-[9px] text-amber-600 font-semibold flex items-center gap-1";
    el.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span> Senkronize Ediliyor...`;
  } else if (status === "saved") {
    el.className = "text-[9px] text-emerald-700 font-semibold flex items-center gap-1";
    el.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Buluta Kaydedildi`;
  } else if (status === "loading") {
    el.className = "text-[9px] text-blue-600 font-semibold flex items-center gap-1";
    el.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> Veri Çekiliyor...`;
  } else if (status === "error") {
    el.className = "text-[9px] text-red-600 font-semibold flex items-center gap-1";
    el.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Bulut Hatası`;
  }
}

// Bildirim Toast Yardımcısı
function showToastNotification(message, type = "info") {
  const toast = document.createElement("div");
  let bg = "bg-slate-900 text-white";
  if (type === "success") bg = "bg-emerald-800 text-white";
  if (type === "warning") bg = "bg-amber-800 text-white";
  if (type === "error") bg = "bg-red-800 text-white";

  toast.className = `fixed bottom-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-white/20 transition-all duration-300 transform translate-y-4 opacity-0 ${bg}`;
  toast.innerHTML = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 50);

  setTimeout(() => {
    toast.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Sayfa yüklendiğinde Firebase başlat
document.addEventListener("DOMContentLoaded", () => {
  initFirebaseApp();
});
