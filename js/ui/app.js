// Dârü'l-İlim ve Hikmet Simülasyonu - Kullanıcı Arayüzü Mantığı (v2.7)
// Atanan Seminerler & Serbest Müfredat Dağılımı, İhtisas Programı Tasnif Şûrası, Firebase Bulut Senkronizasyonu

const game = new DarulIlimGame();

// Aktif Sekme ve Alt Sekme Durumları
// Sekmeler: students, curriculum (Seminerler), scholars, staff, accounting, dorm (Binalar & Yurt), donors, peers, stats, graduates
let currentTab = "students";
let seminarSubTab = "assigned"; // "assigned" (Atanan Seminerler) | "assignments" (Sınıf & Hoca Eşleştirme Masası) | "selection" (Seminer Seçimi & Eserler) | "profiles" (Ders Profilleri)
let seminarBranchFilter = "all";   // "all", "Klasik Arapça", "Modern Arapça", "Fıkıh ve Usul", "Hadis ve Tefsir", "Kelam ve Mantık", "Sosyal Bilimler", "Sanat ve Metodoloji"
let seminarClassFilter = "all";    // "all", "0", "1", "2", "3", "4"
let seminarSemesterFilter = "all"; // "all", "guz", "bahar", "yillik"
let currentInterviewCandidateIndex = 0;

// Takvim Sınıf Filtresi ve Talebe Dosyası Sekmesi
let selectedCalendarGrade = "all"; // "all", "0", "1", "2", "3", "4"
let studentDetailActiveTab = "identity"; // "identity", "grades", "character", "discipline", "reports"
let activeDetailStudentId = null;
let selectionCourseSearch = "";
let selectionBranchFilter = "all";

// Filtre Değişkenleri
let studentFilterGano = "all"; // "all", "sub3", "sub25"
let studentFilterClass = "all"; // "all", "0", "1", "2", "3", "4"
let studentFilterStress = "all"; // "all", "high"
let studentFilterTrack = "all"; // "all", "ihtisas", "normal"
let studentSearchQuery = "";

// Adaylar Listesi Filtre & Sıralama
let candidateSortBy = "talent"; // "talent", "yks", "name"
let candidateFilterArea = "all"; // "all", "SÖZ", "EA", "SAY"
let candidateSearchQuery = "";

let scholarFilterSpecialty = "all";
let scholarFilterMaxPrice = 150000;

let curriculumActiveYear = 0; // 0: Hazırlık Sınıfı, 1: 1. Sınıf, 2: 2. Sınıf, 3: 3. Sınıf, 4: 4. Sınıf

// Kurulum Sırasında 50 Dersin Ayarları
let setupCoursesState = [];

// Sayfa Yüklendiğinde
document.addEventListener("DOMContentLoaded", () => {
  initSetupCoursesList();
  const hasSave = game.loadFromStorage();
  if (hasSave && game.state.isInitialized) {
    showDashboard();
  } else {
    showSetupWizard();
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function showSetupWizard() {
  document.getElementById("setupScreen").classList.remove("hidden");
  document.getElementById("dashboardScreen").classList.add("hidden");
  initSetupCoursesList();
  if (typeof renderAuthUI === "function") renderAuthUI();
}

function showDashboard() {
  document.getElementById("setupScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
  renderAll();
  if (typeof renderAuthUI === "function") renderAuthUI();
}

// Tüm Arayüzü Çiz
function renderAll() {
  renderHeader();
  renderCalendar();
  renderNotifications();
  if (typeof renderAuthUI === "function") renderAuthUI();

  // Aktif Sekmeyi Çiz
  if (currentTab === "students") renderStudentsTab();
  else if (currentTab === "curriculum") renderCurriculumTab();
  else if (currentTab === "scholars") renderScholarsTab();
  else if (currentTab === "staff") renderStaffTab();
  else if (currentTab === "accounting") renderAccountingTab();
  else if (currentTab === "dorm") renderDormTab();
  else if (currentTab === "donors") renderDonorsTab();
  else if (currentTab === "peers") renderPeersTab();
  else if (currentTab === "stats") renderStatsTab();
  else if (currentTab === "graduates") renderGraduatesTab();

  // Aktif Modalları Çiz
  renderActiveModalEvent();
  renderAdminMeetingModal();
  renderStudentMeetingModal();
  renderAnnualStipendModal();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ==================== ÜST PANEL SARKAN MENÜLER KONTROLÜ ====================
function toggleNavMenu(event, groupId) {
  if (event) {
    event.stopPropagation();
  }
  const allGroups = document.querySelectorAll(".nav-dropdown-group");
  const target = document.getElementById(groupId);
  const isOpen = target && target.classList.contains("is-open");
  
  allGroups.forEach(g => g.classList.remove("is-open"));
  if (target && !isOpen) {
    target.classList.add("is-open");
  }
}

function closeAllNavMenus() {
  document.querySelectorAll(".nav-dropdown-group").forEach(g => g.classList.remove("is-open"));
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-dropdown-group")) {
    closeAllNavMenus();
  }
});

// Eski çağrılar için boş uyumluluk fonksiyonları
function closeSidebarMenu() {
  closeAllNavMenus();
}
function toggleSidebarMenu() {}

// Sekme Değiştir (Üst menüden doğrudan ilgili içeriğe geçiş yapar)
function switchTab(tabName) {
  closeAllNavMenus();
  currentTab = tabName;
  renderAll();

  // Seçilen sekmeyi kullanıcı ekranında öne çıkar
  const container = document.getElementById("tabContentContainer");
  if (container) {
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Üst Durum Çubuğu
function renderHeader() {
  const s = game.state;
  const instNameEl = document.getElementById("headerInstName");
  if (instNameEl) instNameEl.innerText = s.institutionName;
  const acadYearEl = document.getElementById("headerAcademicYear");
  if (acadYearEl) acadYearEl.innerText = `${s.academicYear}. Akademik Yıl`;
  const dateEl = document.getElementById("headerDate");
  if (dateEl) dateEl.innerText = `${s.currentDay} ${MONTH_NAMES[s.currentMonthIndex]}`;

  // Kasa
  const budgetEl = document.getElementById("headerBudget");
  if (budgetEl) {
    budgetEl.innerText = `${s.budget.toLocaleString('tr-TR')} ₺`;
    budgetEl.className = s.budget < 0 ? "text-red-600 font-bold" : "text-emerald-700 font-bold";
  }

  // İtibar
  const repEl = document.getElementById("headerReputation");
  if (repEl) repEl.innerText = `${s.reputation} / 100`;
  const repGainEl = document.getElementById("headerReputationGain");
  if (repGainEl) repGainEl.innerText = `(Bu Yıl: +${s.reputationGainedThisYear})`;

  // Uhuvvet & Sosyallik Düzeyi
  const cohesion = s.socialCohesion || 55;
  const cohesionEl = document.getElementById("headerSocialCohesion");
  if (cohesionEl) cohesionEl.innerText = `🤝 %${cohesion}`;
  const sideCohesion = document.getElementById("sidebarSocialCohesion");
  if (sideCohesion) sideCohesion.innerText = `🤝 %${cohesion}`;
  const sideCohesionBar = document.getElementById("sidebarSocialCohesionBar");
  if (sideCohesionBar) sideCohesionBar.style.width = `${cohesion}%`;

  // Aktif Talebe / Yıllık Kontenjan
  const activeCount = s.students.filter(st => st.status === "active").length;
  const quota = game.getAnnualQuota();
  const stCountEl = document.getElementById("headerStudentCount");
  if (stCountEl) stCountEl.innerText = `${activeCount} / ${quota} Talebe`;
  const sideBadgeSt = document.getElementById("sidebarBadge_students");
  if (sideBadgeSt) sideBadgeSt.innerText = activeCount;

  // Aylık Burs
  const stipendEl = document.getElementById("headerStipend");
  if (stipendEl) stipendEl.innerText = `${s.currentYearStipend.toLocaleString('tr-TR')} ₺ / ay`;

  // Cinsiyet Rozeti (Varsa)
  const genderBadge = document.getElementById("headerGenderBadge");
  if (genderBadge) {
    if (s.genderMode === "female") {
      genderBadge.className = "px-2 py-0.5 rounded text-xs font-semibold bg-pink-100 text-pink-800 border border-pink-300";
      genderBadge.innerText = "Hanımefendiler Tedrisatı";
    } else {
      genderBadge.className = "px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300";
      genderBadge.innerText = "Beyefendiler Tedrisatı";
    }
  }

  // Bina Rozeti (Varsa)
  const buildingBadge = document.getElementById("headerBuildingBadge");
  if (buildingBadge) {
    let bldgName = "Kiralık Bina";
    if (typeof INSTITUTION_BUILDINGS_DATA !== "undefined") {
      const b = INSTITUTION_BUILDINGS_DATA.find(x => x.id === s.currentBuildingId);
      if (b) bldgName = b.name;
    }
    if (s.isBuildingAllocated || s.monthlyRent === 0) {
      buildingBadge.className = "px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300";
      buildingBadge.innerText = `Tahsisli (Kira: 0 ₺) • ${bldgName.split('—')[0]}`;
    } else {
      buildingBadge.className = "px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300";
      buildingBadge.innerText = `Kiralık (${s.monthlyRent.toLocaleString('tr-TR')} ₺/ay) • ${bldgName.split('—')[0]}`;
    }
  }
}

// 1 Aylık Takvim
function renderCalendar() {
  const offset = game.state.viewingMonthOffset;
  const days = game.getMonthDays(offset);
  const calContainer = document.getElementById("calendarGrid");
  const monthTitle = document.getElementById("calendarMonthTitle");
  const modeLabel = document.getElementById("calModeLabel");

  const targetMonthIndex = (game.state.currentMonthIndex + offset) % 12;
  const normalizedIndex = targetMonthIndex < 0 ? targetMonthIndex + 12 : targetMonthIndex;

  const isStudentMode = game.state.calendarViewMode === "student";
  if (modeLabel) {
    modeLabel.innerText = isStudentMode ? "[Öğrenci Tedrisat & Tatil Takvimi]" : "[İdare Takvimi]";
  }

  const gradeNames = {
    "all": "Tüm Sınıflar",
    "0": "Hazırlık Sınıfı",
    "1": "1. Sınıf",
    "2": "2. Sınıf",
    "3": "3. Sınıf",
    "4": "4. Sınıf (İhtisas)"
  };
  const gradeLabel = gradeNames[selectedCalendarGrade] || "Genel";

  monthTitle.innerText = `${MONTH_NAMES[normalizedIndex]} Ayı ${isStudentMode ? 'Tedrisat Takvimi' : 'İdare Takvimi'} [${gradeLabel}] ${offset !== 0 ? `(${offset > 0 ? '+' : ''}${offset} Ay)` : ''}`;

  let html = "";
  days.forEach(d => {
    let dayBg = "bg-white border-slate-200 text-slate-700";
    if (d.isCurrent) {
      dayBg = "bg-emerald-600 border-emerald-700 text-white font-bold ring-2 ring-emerald-400";
    } else if (d.isPast) {
      dayBg = "bg-slate-50 border-slate-200 text-slate-400";
    } else if (d.event) {
      if (d.event.type === "orientation") {
        dayBg = "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold";
      } else if (d.event.type === "holiday") {
        dayBg = "bg-sky-50 border-sky-300 text-sky-900 font-medium";
      } else {
        dayBg = "bg-amber-50 border-amber-300 text-amber-900 font-medium";
      }
    } else if (d.isAppointmentDay) {
      dayBg = "bg-blue-50/60 border-blue-200 text-blue-900 font-medium";
    }

    // Bu güne planlanmış ve seçili sınıfa yönelik konferanslar
    const dayConfs = (game.state.scheduledConferences || []).filter(c => {
      if (c.monthIndex !== normalizedIndex || c.day !== d.day) return false;
      if (selectedCalendarGrade === "all") return true;
      return c.targetGrades.includes("all") || c.targetGrades.includes(parseInt(selectedCalendarGrade)) || c.targetGrades.includes(String(selectedCalendarGrade));
    });

    let dotColor = "";
    if (d.isCurrent) dotColor = "bg-white";
    else if (dayConfs.length > 0) dotColor = "bg-purple-600";
    else if (d.event) {
      dotColor = d.event.type === "orientation" ? "bg-emerald-600" : (d.event.type === "holiday" ? "bg-sky-500" : "bg-amber-500");
    } else if (d.isAppointmentDay) {
      dotColor = "bg-blue-500";
    }

    html += `
      <div onclick="handleCalendarDaySingleClick(${d.day}, ${offset}, '${d.event ? d.event.type : ''}')"
           ondblclick="handleCalendarDayDoubleClick(${d.day}, ${offset}, '${d.event ? d.event.type : ''}')"
           class="p-1.5 min-h-[68px] rounded-lg border ${dayBg} cursor-pointer hover:shadow-md transition text-xs flex flex-col justify-between relative group select-none">
        <div class="flex justify-between items-center">
          <span class="font-semibold">${d.day}</span>
          ${dotColor ? `<span class="w-2 h-2 rounded-full ${dotColor}"></span>` : ''}
        </div>

        <div class="space-y-0.5 mt-0.5">
          ${dayConfs.map(conf => `
            <div class="truncate text-[9px] px-1 py-0.5 rounded bg-purple-100 text-purple-900 font-bold border border-purple-200 flex items-center gap-1" title="Konferans: ${conf.speaker} - '${conf.title}' (${conf.location})">
              <span>🎙️</span>
              <span class="truncate">${conf.speaker.split(' ').slice(-1)[0]}: ${conf.title}</span>
            </div>
          `).join('')}

          ${d.event ? `
            <div class="truncate text-[10px] leading-tight ${d.isCurrent ? 'text-white' : (d.event.type === 'orientation' ? 'text-emerald-800 font-bold' : 'text-amber-800 font-semibold')}" title="${d.event.title}">
              ${d.event.title}
            </div>
          ` : (d.isAppointmentDay ? `
            <div class="truncate text-[9px] leading-tight text-blue-700 font-medium">
              🤝 Talebe Hasbihali
            </div>
          ` : '')}
        </div>

        <div class="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-20 px-2.5 py-1 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl whitespace-nowrap pointer-events-none border border-slate-700">
          ${d.day} ${d.monthName}: ${dayConfs.length > 0 ? `🎙️ ${dayConfs[0].speaker}` : (d.event ? d.event.title : (d.isAppointmentDay ? '1-e-1 Talebe Görüşme Günü' : 'Tedrisat Günü'))} • <span class="text-amber-300 font-bold">(Çift tıkla: Güne İlerle)</span>
        </div>
      </div>
    `;
  });
  calContainer.innerHTML = html;
}

function handleCalendarGradeChange(grade) {
  selectedCalendarGrade = grade;
  renderCalendar();
}

// Konferans Planlama Modalı Fonksiyonları
function openAddConferenceModal() {
  const modal = document.getElementById("addConferenceModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.getElementById("confDay").value = game.state.currentDay;
  if (window.lucide) window.lucide.createIcons();
}

function closeAddConferenceModal() {
  const modal = document.getElementById("addConferenceModal");
  if (modal) modal.classList.add("hidden");
}

function toggleConfAllGrades(checked) {
  document.querySelectorAll(".conf-grade-cb").forEach(cb => {
    cb.checked = checked;
  });
}

function saveScheduledConference() {
  const speaker = document.getElementById("confSpeaker").value.trim();
  const title = document.getElementById("confTitle").value.trim();
  const day = parseInt(document.getElementById("confDay").value) || 15;
  const location = document.getElementById("confLocation").value;
  const cost = parseInt(document.getElementById("confCost").value) || 12000;

  if (!speaker || !title) {
    alert("Lütfen konuşmacı adı ve konferans başlığını giriniz.");
    return;
  }

  const allChecked = document.getElementById("confGrade_all").checked;
  let targetGrades = [];
  if (allChecked) {
    targetGrades = ["all"];
  } else {
    document.querySelectorAll(".conf-grade-cb").forEach(cb => {
      if (cb.checked) {
        const yr = parseInt(cb.id.replace("confGrade_", ""));
        targetGrades.push(yr);
      }
    });
    if (targetGrades.length === 0) targetGrades = ["all"];
  }

  const offset = game.state.viewingMonthOffset;
  const targetMonthIndex = (game.state.currentMonthIndex + offset + 12) % 12;

  game.scheduleConference({
    speaker,
    title,
    day,
    monthIndex: targetMonthIndex,
    location,
    targetGrades,
    cost
  });

  closeAddConferenceModal();
  renderCalendar();
  renderHeader();
  if (typeof showToastNotification === "function") {
    showToastNotification(`🎙️ ${speaker} konferansı takvime kaydedildi.`, "success");
  }
}

function handleCalPrevMonth() {
  game.setViewingMonthOffset(-1);
  renderCalendar();
}

function handleCalNextMonth() {
  game.setViewingMonthOffset(1);
  renderCalendar();
}

function handleCalResetMonth() {
  game.resetViewingMonthOffset();
  renderCalendar();
}

function handleToggleCalendarMode() {
  game.toggleCalendarViewMode();
  renderCalendar();
}

// Tek Tıklama: Yalnızca inceleme ve bilgilendirme yapar, GÜN İLERLETMEZ
function handleCalendarDaySingleClick(day, offset, eventType) {
  if (offset !== 0) {
    if (typeof showToastNotification === "function") {
      showToastNotification("Başka bir ayı inceliyorsunuz. Güncel aya dönmek için 'Mevcut Ay'a basınız.", "info");
    }
    return;
  }

  // Eğer bugünkü gün ise ve bugün bir etkinlik varsa aç
  if (day === game.state.currentDay) {
    if (eventType === "dorm_report") {
      showDormReportModal();
      return;
    }
    if (eventType === "student_meeting") {
      if (!game.state.studentMeetingData) game.triggerStudentMeeting();
      renderAll();
      return;
    }
    if (eventType === "admin_meeting") {
      if (!game.state.adminMeetingData) game.triggerAdministrativeMeeting();
      renderAll();
      return;
    }
    if (day === 10 || day === 20 || day === 30) {
      showStudentAppointmentModal();
      return;
    }
  }

  // Gelecek bir güne tek tıklandığında bilgilendir
  if (day > game.state.currentDay && typeof showToastNotification === "function") {
    showToastNotification(`📅 ${day} ${MONTH_NAMES[game.state.currentMonthIndex]} gününe ilerlemek için kutucuğa ÇİFT TIKLAYINIZ.`, "info");
  }
}

// Çift Tıklama: Güne ilerler (Arada etkinlik varsa x. günde durur, dönem şartı sağlanmadıysa engeller)
function handleCalendarDayDoubleClick(day, offset, eventType) {
  if (offset !== 0) {
    alert("Başka bir ayı inceliyorsunuz. Gün ilerletmek ve hadiseleri açmak için 'Mevcut Ay'a dönünüz.");
    game.resetViewingMonthOffset();
    renderCalendar();
    return;
  }

  // Geçmiş veya bugünkü gün
  if (day <= game.state.currentDay) {
    if (eventType === "dorm_report") {
      showDormReportModal();
      return;
    }
    if (eventType === "student_meeting") {
      if (!game.state.studentMeetingData) game.triggerStudentMeeting();
      renderAll();
      return;
    }
    if (eventType === "admin_meeting") {
      if (!game.state.adminMeetingData) game.triggerAdministrativeMeeting();
      renderAll();
      return;
    }
    if (day === 10 || day === 20 || day === 30) {
      showStudentAppointmentModal();
      return;
    }
    return;
  }

  // 1. Bugünkü tamamlanmamış bir hadise varsa ilerleyemez
  if (game.hasUncompletedEventToday && game.hasUncompletedEventToday()) {
    alert(`Ayın ${game.state.currentDay}. günündeki hadiseyi veya toplantıyı tamamlamadan bir sonraki güne geçemezsiniz!`);
    return;
  }

  // 2. Dönem başlama şartları (ders-hoca eşleşmesi ve öğrenci kabulleri)
  if (!game.checkTermCanStart()) {
    alert(game.termStartBlockReason || "Dönem başlaması için ders-hoca eşleştirmesi ve öğrenci kabulleri tamamlanmalıdır.");
    if (game.termStartBlockReason && game.termStartBlockReason.includes("hocası")) {
      switchTab("curriculum");
    } else {
      switchTab("students");
    }
    return;
  }

  // 3. Adım adım ilerlet (aradaki herhangi bir günde etkinlik varsa x. günde durur)
  const diff = day - game.state.currentDay;
  const res = game.advanceDays(diff);
  if (res && res.blocked) {
    alert(res.reason);
  }
  renderAll();
}

function handleAdvanceOneDay() {
  if (game.hasUncompletedEventToday && game.hasUncompletedEventToday()) {
    alert(`Ayın ${game.state.currentDay}. günündeki hadiseyi tamamlamadan sonraki güne geçemezsiniz.`);
    return;
  }
  if (!game.checkTermCanStart()) {
    alert(game.termStartBlockReason || "Dönem başlaması için ders-hoca eşleştirmesi ve öğrenci kabulleri tamamlanmalıdır.");
    if (game.termStartBlockReason && game.termStartBlockReason.includes("hocası")) {
      switchTab("curriculum");
    } else {
      switchTab("students");
    }
    return;
  }
  const res = game.advanceDays(1);
  if (res && res.blocked) {
    alert(res.reason);
  }
  renderAll();
}

function handleAdvanceNextEvent() {
  if (game.hasUncompletedEventToday && game.hasUncompletedEventToday()) {
    alert(`Ayın ${game.state.currentDay}. günündeki hadiseyi tamamlamadan ilerleyemezsiniz.`);
    return;
  }
  if (!game.checkTermCanStart()) {
    alert(game.termStartBlockReason || "Dönem başlatılamaz! Lütfen ders-hoca eşleşmesini ve talebe kabulünü tamamlayınız.");
    if (game.termStartBlockReason && game.termStartBlockReason.includes("hocası")) {
      switchTab("curriculum");
    } else {
      switchTab("students");
    }
    return;
  }
  const res = game.jumpToNextEvent();
  if (res && res.blocked) {
    alert(res.reason);
  }
  renderAll();
}

function handleAdvanceOneMonth() {
  if (game.hasUncompletedEventToday && game.hasUncompletedEventToday()) {
    alert(`Ayın ${game.state.currentDay}. günündeki hadiseyi tamamlamadan ayı ilerletemezsiniz.`);
    return;
  }
  if (!game.checkTermCanStart()) {
    alert(game.termStartBlockReason || "Dönem başlatılamaz! Lütfen ders-hoca eşleşmesini ve talebe kabulünü tamamlayınız.");
    if (game.termStartBlockReason && game.termStartBlockReason.includes("hocası")) {
      switchTab("curriculum");
    } else {
      switchTab("students");
    }
    return;
  }
  const remaining = 31 - game.state.currentDay;
  const res = game.advanceDays(remaining);
  if (res && res.blocked) {
    alert(res.reason);
  }
  renderAll();
}

// Bildirimler
function renderNotifications() {
  const drawerList = document.getElementById("notificationsList");
  if (!drawerList) return;

  const notifs = game.state.notifications;
  if (notifs.length === 0) {
    drawerList.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">Henüz bir hadise kaydı bulunmuyor.</div>`;
    return;
  }

  drawerList.innerHTML = notifs.slice(0, 15).map(n => {
    let icon = "bell";
    let color = "text-slate-600";
    if (n.type === "success") { icon = "check-circle"; color = "text-emerald-600"; }
    else if (n.type === "warning") { icon = "alert-triangle"; color = "text-amber-600"; }
    else if (n.type === "danger") { icon = "shield-alert"; color = "text-red-600"; }
    else if (n.type === "info") { icon = "info"; color = "text-blue-600"; }

    return `
      <div class="p-3 text-xs space-y-1 hover:bg-slate-50 transition">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-800 flex items-center gap-1.5">
            <i data-lucide="${icon}" class="w-3.5 h-3.5 ${color}"></i>
            ${n.title}
          </span>
          <span class="text-[10px] text-slate-400">${n.date || ''}</span>
        </div>
        <p class="text-slate-600 text-[11px] leading-relaxed">${n.message}</p>
      </div>
    `;
  }).join('');
}

function toggleNotificationsDrawer() {
  const drawer = document.getElementById("notificationsDrawer");
  drawer.classList.toggle("hidden");
  if (!drawer.classList.contains("hidden") && window.lucide) {
    window.lucide.createIcons();
  }
}

// ==================== SEKME 1: TALEBELER & MÜLAKAT ====================
function renderStudentsTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;
  const isFemale = s.genderMode === "female";

  const activeStudents = s.students.filter(st => st.status === "active");
  const thisYearAdmitted = activeStudents.filter(st => st.enrollmentYear === s.academicYear);
  const quota = game.getAnnualQuota();
  const quotaRemaining = quota - thisYearAdmitted.length;

  // Adaylar Listesi Filtreleme ve Sıralama
  let filteredCandidates = [...s.candidatesPool].filter(c => {
    if (candidateFilterArea !== "all" && c.yksArea !== candidateFilterArea) return false;
    if (candidateSearchQuery && !c.fullName.toLowerCase().includes(candidateSearchQuery.toLowerCase())) return false;
    return true;
  });

  filteredCandidates.sort((a, b) => {
    if (candidateSortBy === "talent") return b.talent - a.talent;
    if (candidateSortBy === "yks") return a.yksRank - b.yksRank;
    if (candidateSortBy === "interview") return b.interviewScore - a.interviewScore;
    return a.fullName.localeCompare(b.fullName, "tr");
  });

  // Kayıtlı Talebeler Filtreleme
  let filteredStudents = activeStudents.filter(st => {
    if (studentFilterGano === "sub3" && st.gano !== null && st.gano >= 3.00) return false;
    if (studentFilterGano === "sub25" && st.gano !== null && st.gano >= 2.50) return false;
    if (studentFilterClass !== "all" && st.currentClassYear.toString() !== studentFilterClass) return false;
    if (studentFilterStress === "high" && st.stressLevel <= 55) return false;
    if (studentSearchQuery && !st.fullName.toLowerCase().includes(studentSearchQuery.toLowerCase())) return false;
    return true;
  });

  // Sınıf bazında gruplama
  const groupedByClass = {};
  for (let yr = 0; yr <= s.programDurationYears; yr++) {
    const list = filteredStudents.filter(st => st.currentClassYear === yr);
    if (list.length > 0 || studentFilterClass === yr.toString() || studentFilterClass === "all") {
      groupedByClass[yr] = list;
    }
  }

  let html = `
    <div class="space-y-6">
      <!-- Kontenjan ve Mülakat Durum Paneli -->
      <div class="ottoman-card p-5 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-emerald-50/50 via-white to-amber-50/30">
        <div>
          <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
            <i data-lucide="users" class="text-emerald-800"></i>
            ${isFemale ? 'Kız Talebe Tedrisat Heyeti & Mülakat' : 'Talebe Tedrisat Heyeti & Mülakat Portalı'}
          </h2>
          <p class="text-xs text-slate-600 mt-1">
            Yalnızca <strong>İstanbul'daki üniversiteleri</strong> kazanan 12. sınıf mezunları başvurabilir. Başlangıçta GANO'ları bulunmaz; YKS alanı ve sıralamasıyla mülakata alınırlar.
          </p>
          <div class="flex flex-wrap items-center gap-2 mt-3 text-xs">
            <span class="px-2.5 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              ${s.academicYear}. Yıl Kontenjanı: <strong>${thisYearAdmitted.length} / ${quota}</strong>
            </span>
            <span class="px-2.5 py-1 rounded-full font-semibold bg-amber-100 text-amber-800 border border-amber-300">
              Kalan Kontenjan: ${quotaRemaining}
            </span>
            <span class="px-2.5 py-1 rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-300">
              Toplam Kayıtlı Talebe: ${activeStudents.length}
            </span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          ${quotaRemaining > 0 && s.candidatesPool.length > 0 ? `
            <button onclick="handleAutoFillQuota()" class="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2">
              <i data-lucide="sparkles"></i>
              İstidadı En Yüksek ${quotaRemaining} Adayı Tamamla
            </button>
          ` : `
            <span class="px-4 py-2.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
              <i data-lucide="check-circle" class="text-emerald-600"></i>
              ${quota}/${quota} Kontenjan Dolu
            </span>
          `}
        </div>
      </div>

      <!-- ==================== 1. MÜLAKAT BEKLEYEN ADAYLAR LİSTESİ ==================== -->
      ${s.candidatesPool.length > 0 && quotaRemaining > 0 ? `
        <div class="ottoman-card rounded-2xl border overflow-hidden bg-white shadow-sm">
          <div class="px-5 py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h3 class="font-bold text-sm flex items-center gap-2 font-amiri">
                <i data-lucide="clipboard-list" class="w-4 h-4 text-amber-400"></i>
                Mülakat Bekleyen İstanbul Adayları (${filteredCandidates.length} Aday)
              </h3>
              <p class="text-[11px] text-emerald-200">
                Adaylar ilim istidadı ve YKS derecesine göre sıralanmıştır. İnceleyerek kabul veya ret kararı verebilirsiniz.
              </p>
            </div>

            <!-- Sıralama ve Filtre Butonları -->
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <div class="flex items-center gap-1 bg-emerald-900/80 px-2 py-1 rounded-lg border border-emerald-700 text-slate-200">
                <span class="text-[10px] text-emerald-300">Sırala:</span>
                <select onchange="candidateSortBy = this.value; renderStudentsTab();" class="bg-transparent text-white text-xs focus:outline-none">
                  <option value="talent" ${candidateSortBy === 'talent' ? 'selected' : ''} class="text-slate-800">İlim İstidadı (Önerilen)</option>
                  <option value="yks" ${candidateSortBy === 'yks' ? 'selected' : ''} class="text-slate-800">YKS Derecesi</option>
                  <option value="interview" ${candidateSortBy === 'interview' ? 'selected' : ''} class="text-slate-800">Mülakat Puanı</option>
                  <option value="name" ${candidateSortBy === 'name' ? 'selected' : ''} class="text-slate-800">İsim Sırası</option>
                </select>
              </div>

              <div class="flex items-center gap-1 bg-emerald-900/80 px-2 py-1 rounded-lg border border-emerald-700 text-slate-200">
                <span class="text-[10px] text-emerald-300">YKS Alanı:</span>
                <select onchange="candidateFilterArea = this.value; renderStudentsTab();" class="bg-transparent text-white text-xs focus:outline-none">
                  <option value="all" ${candidateFilterArea === 'all' ? 'selected' : ''} class="text-slate-800">Tümü</option>
                  <option value="SÖZ" ${candidateFilterArea === 'SÖZ' ? 'selected' : ''} class="text-slate-800">SÖZ (İlahiyat)</option>
                  <option value="EA" ${candidateFilterArea === 'EA' ? 'selected' : ''} class="text-slate-800">EA (Hukuk/Sosyoloji)</option>
                  <option value="SAY" ${candidateFilterArea === 'SAY' ? 'selected' : ''} class="text-slate-800">SAY</option>
                </select>
              </div>

              <input 
                type="text" 
                placeholder="Aday Ara..." 
                value="${candidateSearchQuery}" 
                oninput="candidateSearchQuery = this.value; renderStudentsTab();"
                class="px-2.5 py-1 rounded-lg bg-emerald-900/80 border border-emerald-700 text-white placeholder-emerald-300 text-xs focus:outline-none"
              >
            </div>
          </div>

          <!-- Adaylar Tablosu -->
          <div class="overflow-x-auto max-h-96 overflow-y-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold sticky top-0 z-10">
                <tr>
                  <th class="py-2.5 px-4">Aday & Lise</th>
                  <th class="py-2.5 px-4">İstanbul Fakültesi</th>
                  <th class="py-2.5 px-4">YKS Sıralaması</th>
                  <th class="py-2.5 px-4">İlim İstidadı</th>
                  <th class="py-2.5 px-4">Belirgin Zaaf / Kusur</th>
                  <th class="py-2.5 px-4 text-right">Mülakat & Karar</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${filteredCandidates.slice(0, 30).map((cand, idx) => `
                  <tr class="hover:bg-emerald-50/40 transition">
                    <td class="py-2.5 px-4">
                      <div class="font-bold text-slate-900">${cand.fullName}</div>
                      <div class="text-[10px] text-slate-500">${cand.highSchool} (${cand.city})</div>
                    </td>
                    <td class="py-2.5 px-4">
                      <div class="font-medium text-emerald-900">${cand.faculty}</div>
                      <div class="text-[10px] text-slate-400">${cand.university}</div>
                    </td>
                    <td class="py-2.5 px-4">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${cand.yksArea === 'SÖZ' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
                        ${cand.yksArea}: #${cand.yksRank}
                      </span>
                    </td>
                    <td class="py-2.5 px-4">
                      <div class="flex items-center gap-1.5 font-bold text-slate-800">
                        <span class="w-2 h-2 rounded-full ${cand.talent > 80 ? 'bg-emerald-500' : 'bg-amber-500'}"></span>
                        ${cand.talent} / 100
                      </div>
                      <div class="text-[10px] text-slate-400">Mülakat: %${cand.interviewScore}</div>
                    </td>
                    <td class="py-2.5 px-4 max-w-xs">
                      <div class="text-red-700 font-semibold truncate" title="${cand.weaknessDesc}">
                        ⚠️ ${cand.weakness}
                      </div>
                      <div class="text-[10px] text-slate-500 italic truncate">
                        ${cand.weaknessStatement}
                      </div>
                    </td>
                    <td class="py-2.5 px-4 text-right">
                      <div class="inline-flex items-center gap-1.5">
                        <button onclick="openInterviewModalForCandidate('${cand.id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-[11px] transition border border-slate-300" title="6 Soruluk Detaylı Mülakat">
                          Mülakat Odası
                        </button>
                        <button onclick="handleDirectAccept('${cand.id}')" class="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] shadow transition">
                          Kabul Et
                        </button>
                        <button onclick="handleDirectReject('${cand.id}')" class="p-1 text-slate-400 hover:text-red-600 rounded transition" title="Reddet">
                          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <!-- ==================== 2. KURUMA KAYITLI TALEBELER ==================== -->
      <div class="ottoman-card p-5 rounded-2xl border bg-white shadow-sm space-y-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h3 class="font-bold text-slate-900 text-sm md:text-base font-amiri flex items-center gap-2">
              <i data-lucide="book-open" class="text-emerald-700"></i>
              Tedrisat Halkasındaki Kayıtlı Talebeler (${filteredStudents.length} / ${activeStudents.length})
            </h3>
            <p class="text-xs text-slate-500">
              Hazırlık sınıfında 100 üzerinden sınav ortalaması; 1-4. sınıflarda üniversite GANO'su takip edilir.
            </p>
          </div>

          <!-- Filtreler -->
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <!-- Sınıf Filtresi -->
            <div class="flex items-center gap-1.5">
              <span class="text-slate-500 font-medium">Sınıf:</span>
              <select onchange="studentFilterClass = this.value; renderStudentsTab();" class="filter-input px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white">
                <option value="all" ${studentFilterClass === 'all' ? 'selected' : ''}>Tüm Sınıflar</option>
                <option value="0" ${studentFilterClass === '0' ? 'selected' : ''}>Hazırlık Sınıfı</option>
                <option value="1" ${studentFilterClass === '1' ? 'selected' : ''}>1. Sınıf</option>
                <option value="2" ${studentFilterClass === '2' ? 'selected' : ''}>2. Sınıf</option>
                <option value="3" ${studentFilterClass === '3' ? 'selected' : ''}>3. Sınıf</option>
                <option value="4" ${studentFilterClass === '4' ? 'selected' : ''}>4. Sınıf</option>
              </select>
            </div>

            <!-- GANO Filtresi -->
            <div class="flex items-center gap-1.5">
              <span class="text-slate-500 font-medium">GANO:</span>
              <select onchange="studentFilterGano = this.value; renderStudentsTab();" class="filter-input px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white">
                <option value="all" ${studentFilterGano === 'all' ? 'selected' : ''}>Tümü</option>
                <option value="sub3" ${studentFilterGano === 'sub3' ? 'selected' : ''}>GANO &lt; 3.00 (Risk)</option>
                <option value="sub25" ${studentFilterGano === 'sub25' ? 'selected' : ''}>GANO &lt; 2.50 (İhtar Riski)</option>
              </select>
            </div>

            <!-- Stres Filtresi -->
            <div class="flex items-center gap-1.5">
              <span class="text-slate-500 font-medium">Stres:</span>
              <select onchange="studentFilterStress = this.value; renderStudentsTab();" class="filter-input px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white">
                <option value="all" ${studentFilterStress === 'all' ? 'selected' : ''}>Tümü</option>
                <option value="high" ${studentFilterStress === 'high' ? 'selected' : ''}>Yüksek Stres (%55+)</option>
              </select>
            </div>

            <input 
              type="text" 
              placeholder="Talebe Ara..." 
              value="${studentSearchQuery}" 
              oninput="studentSearchQuery = this.value; renderStudentsTab();"
              class="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none"
            >
          </div>
        </div>

        ${activeStudents.length === 0 ? `
          <div class="p-12 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            Henüz kuruma kabul edilmiş talebe bulunmuyor. Yukarıdaki listeden mülakatla talebe alabilirsiniz.
          </div>
        ` : `
          <div class="space-y-6">
            ${Object.keys(groupedByClass).map(yrKey => {
              const yr = parseInt(yrKey);
              const list = groupedByClass[yr];
              if (!list || list.length === 0) return '';
              const yrLabel = yr === 0 ? "Hazırlık Sınıfı (Alet İlimleri & Arapça)" : `${yr}. Sınıf Tedrisat Halkası`;

              return `
                <div class="space-y-2">
                  <div class="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-800 flex justify-between items-center border border-slate-200">
                    <span>${yrLabel} (${list.length} Talebe)</span>
                    <span class="text-[11px] text-slate-500 font-normal">
                      ${yr === 0 ? 'Not: 100 üzerinden sınav takibi yapılır' : 'Not: Üniversite GANO ve tedrisat notu'}
                    </span>
                  </div>

                  <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                      <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold">
                        <tr>
                          <th class="py-2.5 px-4">Talebe & İlgi Alanı</th>
                          <th class="py-2.5 px-4">İstanbul Fakültesi</th>
                          <th class="py-2.5 px-4">Akademik Başarı Gösterimi</th>
                          <th class="py-2.5 px-4">Stres & Ahlak</th>
                          <th class="py-2.5 px-4">Yetkinlik (+10-20/yıl)</th>
                          <th class="py-2.5 px-4 text-right">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100">
                        ${list.map(st => `
                          <tr class="hover:bg-slate-50 transition">
                            <td class="py-3 px-4">
                              <div class="font-bold text-slate-900">${st.fullName}</div>
                              ${(st.disciplineRecord && st.disciplineRecord.length > 0) ? `
                                <div class="mt-0.5">
                                  <span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300" title="Disiplin Tutanağı Mevcut">
                                    ⚠️ Tutanak (${st.disciplineRecord.length})
                                  </span>
                                </div>
                              ` : ''}
                            </td>
                            <td class="py-3 px-4">
                              <div class="font-medium text-slate-800">${st.faculty}</div>
                              <div class="text-[10px] text-slate-400">${st.university} (YKS: #${st.yksRank})</div>
                            </td>
                            <!-- ÖĞRENCİ NOT GÖSTERİMİ: HAZIRLIKTA 100 ÜZERİNDEN, 1-4. SINIFLARDA GANO -->
                            <td class="py-3 px-4">
                              ${st.currentClassYear === 0 ? `
                                <div class="font-bold text-indigo-800">
                                  Hazırlık Sınav Ortalaması: ${st.internalScore} / 100
                                </div>
                                <div class="text-[10px] text-slate-400">GANO: Henüz Yok (Hazırlık)</div>
                              ` : `
                                <div class="font-bold ${st.gano !== null && st.gano < 2.50 ? 'text-red-600' : (st.gano !== null && st.gano < 3.00 ? 'text-amber-700' : 'text-slate-800')}">
                                  Üniversite GANO: ${st.gano ? st.gano.toFixed(2) : '3.10'}
                                </div>
                                <div class="text-[10px] text-slate-500">Tedrisat Notu: ${st.internalScore} / 100</div>
                              `}
                            </td>
                            <td class="py-3 px-4">
                              <div class="flex items-center gap-1.5 font-bold ${st.stressLevel > 55 ? 'text-red-600' : 'text-slate-700'}">
                                <span class="w-2 h-2 rounded-full ${st.stressLevel > 55 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}"></span>
                                Stres: %${st.stressLevel} ${st.stressLevel > 55 ? '⭐ [Yüksek]' : ''}
                              </div>
                              <div class="text-[10px] text-slate-500">Ahlak: ${st.moralStatus} ${st.warningCount > 0 ? `• <span class="text-red-600 font-bold">${st.warningCount} İhtar</span>` : ''}</div>
                            </td>
                            <td class="py-3 px-4">
                              <div class="font-bold text-emerald-800">${st.academicCompetence} Puan</div>
                              <div class="text-[10px] text-slate-400">Memnuniyet: %${st.satisfaction}</div>
                            </td>
                            <td class="py-3 px-4 text-right">
                              <div class="inline-flex items-center gap-1">
                                <button onclick="showStudentDetailModal('${st.id}')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-semibold transition" title="Aylık Rapor ve Dosya">
                                  Dosya
                                </button>
                                <button onclick="handleWarnStudent('${st.id}')" class="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded text-[10px] font-semibold transition" title="Akademik / Ahlaki İhtar Ver">
                                  İhtar
                                </button>
                                <button onclick="handleExpelStudent('${st.id}')" class="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-[10px] font-semibold transition" title="Kurumla İlişiğini Kes">
                                  Kov
                                </button>
                              </div>
                            </td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function handleDirectAccept(candId) {
  const res = game.admitCandidate(candId, "standart");
  if (!res.success) alert(res.message);
  renderAll();
}

function handleDirectReject(candId) {
  game.state.candidatesPool = game.state.candidatesPool.filter(c => c.id !== candId);
  game.saveToStorage();
  renderAll();
}

function handleAutoFillQuota() {
  const res = game.autoFillRemainingQuota();
  alert(res.message);
  renderAll();
}

function handleWarnStudent(studentId) {
  game.warnStudent(studentId);
  renderAll();
}

function handleExpelStudent(studentId) {
  const st = game.state.students.find(s => s.id === studentId);
  if (!st) return;
  if (confirm(`${st.fullName} isimli talebenin kurumla ilişiği kesilecektir. Emin misiniz?`)) {
    game.expelStudent(studentId, "Disiplin ve devamsızlık");
    renderAll();
  }
}

// ==================== SEKME 2: SEMİNERLER (ESKİ 50 DERS MÜFREDATI) ====================
function renderCurriculumTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;

  const allCourses = game.getAllCourses();
  const missionPackages = typeof CURRICULUM_MISSION_PACKAGES !== "undefined" ? CURRICULUM_MISSION_PACKAGES : null;

  // Aktif Yıl Dersleri
  const yearCourses = allCourses.filter(c => c.classYear === curriculumActiveYear);
  const isLocked = game.isSemesterLocked();

  // Branş Filtreleme
  let displayedCourses = yearCourses;
  if (seminarBranchFilter !== "all") {
    displayedCourses = yearCourses.filter(c => c.branch === seminarBranchFilter);
  }

  const guzCourses = displayedCourses.filter(c => c.semester === "guz");
  const baharCourses = displayedCourses.filter(c => c.semester === "bahar");

  // Hoca Atama İstatistikleri
  const assignedCount = yearCourses.filter(c => !!s.courseAssignments[c.id]).length;
  const unassignedCount = yearCourses.length - assignedCount;

  let html = `
    <div class="space-y-6">
      <!-- Üst Başlık ve Alt Sekme Butonları -->
      <div class="ottoman-card p-5 rounded-2xl border bg-gradient-to-r from-emerald-50/50 via-white to-amber-50/30">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
              <i data-lucide="book-open" class="text-emerald-800"></i>
              Seminerler & Kadim Tedrisat Müfredatı
            </h2>
            <p class="text-xs text-slate-600 mt-1">
              Klasik Arapça, Modern Arapça, Fıkıh, Hadis-Tefsir ve Sosyal Bilimler halkaları. Her derse haftalık ders saati (saat/hafta) tayin edilmiştir.
            </p>
          </div>

          <!-- Alt Sekme Seçici: Atanan Seminerler vs Sınıf & Hoca Eşleştirme Masası vs Seminer Seçimi vs Ders Profilleri -->
          <div class="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
            <button onclick="seminarSubTab = 'assigned'; renderCurriculumTab();" class="px-3 py-1.5 rounded-lg font-bold transition ${seminarSubTab === 'assigned' ? 'bg-white text-emerald-800 shadow' : 'text-slate-600 hover:text-slate-900'}">
              <i data-lucide="book-check" class="inline w-3.5 h-3.5 mr-1"></i>
              Atanan Seminerler
            </button>
            <button onclick="seminarSubTab = 'assignments'; renderCurriculumTab();" class="px-3 py-1.5 rounded-lg font-bold transition ${seminarSubTab === 'assignments' ? 'bg-white text-emerald-800 shadow' : 'text-slate-600 hover:text-slate-900'}">
              <i data-lucide="layout-grid" class="inline w-3.5 h-3.5 mr-1"></i>
              Sınıf & Hoca Masası
            </button>
            <button onclick="seminarSubTab = 'selection'; renderCurriculumTab();" class="px-3 py-1.5 rounded-lg font-bold transition ${seminarSubTab === 'selection' ? 'bg-white text-emerald-800 shadow' : 'text-slate-600 hover:text-slate-900'}">
              <i data-lucide="plus-circle" class="inline w-3.5 h-3.5 mr-1"></i>
              Seminer Seçimi
            </button>
            <button onclick="seminarSubTab = 'profiles'; renderCurriculumTab();" class="px-3 py-1.5 rounded-lg font-bold transition ${seminarSubTab === 'profiles' ? 'bg-white text-emerald-800 shadow' : 'text-slate-600 hover:text-slate-900'}">
              <i data-lucide="library" class="inline w-3.5 h-3.5 mr-1"></i>
              Ders Profilleri
            </button>
          </div>
        </div>

        <!-- Dönem İçi Hoca Değişikliği Kilidi Uyarısı -->
        <div class="mt-4 p-3 rounded-xl border ${isLocked ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-emerald-50 border-emerald-300 text-emerald-900'} text-xs flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="${isLocked ? 'lock' : 'unlock'}" class="w-4 h-4"></i>
            <span>
              ${isLocked ? 
                '<strong>🔒 Dönem Tedrisatı Kilitli:</strong> Hoca görevlendirmeleri yalnızca dönem başlarında (Ağustos/Eylül veya Ocak) yapılabilir. Dönem sonu idari toplantıda sözleşme fesihleri değerlendirilir.' : 
                '<strong>🔓 Görevlendirme Dönemi Açık:</strong> Dönem başındasınız. Kadronuzdaki hocaları derslere görevlendirebilir veya değiştirebilirsiniz.'}
            </span>
          </div>
          <div class="flex items-center gap-2">
            ${unassignedCount > 0 && !isLocked ? `
              <button onclick="handleAutoAssignScholars()" class="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-sm transition flex items-center gap-1.5" title="Mevcut hocaları derslere otomatik ata">
                <i data-lucide="wand-2" class="w-3.5 h-3.5"></i>
                <span>Hocaları Otomatik Eşleştir</span>
              </button>
            ` : ''}
            <span class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200">
              ${assignedCount} / ${yearCourses.length} Ders Hocalı
            </span>
          </div>
        </div>
      </div>

      ${seminarSubTab === 'assigned' ? `
        <!-- ==================== 1. ALT SEKME: ATANAN SEMİNERLER (ÖZEL DAĞILIM) ==================== -->
        <div class="space-y-4">
          <!-- Filtreler: Sınıf ve Dönem -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 pb-3">
            <div class="flex flex-wrap items-center gap-1.5 text-xs">
              <span class="text-slate-500 font-semibold">Sınıf:</span>
              <button onclick="seminarClassFilter = 'all'; renderCurriculumTab();" class="px-3 py-1.5 rounded-lg font-bold transition ${seminarClassFilter === 'all' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                Tüm Sınıflar
              </button>
              ${[0, 1, 2, 3, 4].map(yr => `
                <button onclick="seminarClassFilter = '${yr}'; renderCurriculumTab();" class="px-3 py-1.5 rounded-lg font-bold transition ${seminarClassFilter === yr.toString() ? 'bg-emerald-800 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                  ${yr === 0 ? 'Hazırlık' : `${yr}. Sınıf`}
                </button>
              `).join('')}
            </div>

            <div class="flex flex-wrap items-center gap-2 text-xs">
              <span class="text-slate-500 font-semibold">Dönem:</span>
              <select onchange="seminarSemesterFilter = this.value; renderCurriculumTab();" class="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-xs">
                <option value="all" ${seminarSemesterFilter === 'all' ? 'selected' : ''}>Tüm Dönemler</option>
                <option value="guz" ${seminarSemesterFilter === 'guz' ? 'selected' : ''}>Güz Dönemi</option>
                <option value="bahar" ${seminarSemesterFilter === 'bahar' ? 'selected' : ''}>Bahar Dönemi</option>
              </select>

              <span class="text-slate-500 font-semibold ml-1">Branş:</span>
              <select onchange="seminarBranchFilter = this.value; renderCurriculumTab();" class="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-xs">
                <option value="all" ${seminarBranchFilter === 'all' ? 'selected' : ''}>Tüm Branşlar</option>
                <option value="Klasik Arapça" ${seminarBranchFilter === 'Klasik Arapça' ? 'selected' : ''}>Klasik Arapça</option>
                <option value="Modern Arapça" ${seminarBranchFilter === 'Modern Arapça' ? 'selected' : ''}>Modern Arapça</option>
                <option value="Fıkıh ve Usul" ${seminarBranchFilter === 'Fıkıh ve Usul' ? 'selected' : ''}>Fıkıh ve Usul</option>
                <option value="Hadis ve Tefsir" ${seminarBranchFilter === 'Hadis ve Tefsir' ? 'selected' : ''}>Hadis ve Tefsir</option>
                <option value="Kelam ve Mantık" ${seminarBranchFilter === 'Kelam ve Mantık' ? 'selected' : ''}>Kelam ve Mantık</option>
                <option value="Sosyal Bilimler" ${seminarBranchFilter === 'Sosyal Bilimler' ? 'selected' : ''}>Sosyal Bilimler</option>
                <option value="Sanat ve Metodoloji" ${seminarBranchFilter === 'Sanat ve Metodoloji' ? 'selected' : ''}>Sanat ve Metodoloji</option>
              </select>
            </div>
          </div>

          <!-- Atanan Seminerler Grid Kartları -->
          ${renderAssignedSeminarsGrid(allCourses)}
        </div>
      ` : (seminarSubTab === 'assignments' ? `
        <!-- ==================== 2. ALT SEKME: SINIF & HOCA EŞLEŞTİRME MASASI ==================== -->
        <div class="space-y-4">
          <!-- Sınıf Yılı Sekmeleri ve Branş Filtresi -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 pb-3">
            <div class="flex flex-wrap gap-1 text-xs">
              ${[0, 1, 2, 3, 4].map(yr => `
                <button onclick="curriculumActiveYear = ${yr}; renderCurriculumTab();" class="px-4 py-2 rounded-xl font-bold transition ${curriculumActiveYear === yr ? 'bg-emerald-800 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                  ${yr === 0 ? 'Hazırlık Sınıfı (Dil & Mantık)' : `${yr}. Sınıf Müfredatı`}
                </button>
              `).join('')}
            </div>

            <!-- Branş Filtresi -->
            <div class="flex items-center gap-2 text-xs">
              <span class="text-slate-500 font-semibold">Branş:</span>
              <select onchange="seminarBranchFilter = this.value; renderCurriculumTab();" class="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-xs">
                <option value="all" ${seminarBranchFilter === 'all' ? 'selected' : ''}>Tüm Branşlar</option>
                <option value="Klasik Arapça" ${seminarBranchFilter === 'Klasik Arapça' ? 'selected' : ''}>Klasik Arapça (Sarf-Nahiv-Belağat)</option>
                <option value="Modern Arapça" ${seminarBranchFilter === 'Modern Arapça' ? 'selected' : ''}>Modern Arapça (Muhadese & Basın)</option>
                <option value="Fıkıh ve Usul" ${seminarBranchFilter === 'Fıkıh ve Usul' ? 'selected' : ''}>Fıkıh ve Fıkıh Usûlü</option>
                <option value="Hadis ve Tefsir" ${seminarBranchFilter === 'Hadis ve Tefsir' ? 'selected' : ''}>Hadis ve Tefsir</option>
                <option value="Kelam ve Mantık" ${seminarBranchFilter === 'Kelam ve Mantık' ? 'selected' : ''}>Kelam ve Mantık/Felsefe</option>
                <option value="Sosyal Bilimler" ${seminarBranchFilter === 'Sosyal Bilimler' ? 'selected' : ''}>Sosyal Bilimler & Medeniyet</option>
                <option value="Sanat ve Metodoloji" ${seminarBranchFilter === 'Sanat ve Metodoloji' ? 'selected' : ''}>Sanat ve Metodoloji</option>
              </select>
            </div>
          </div>

          <!-- GÜZ DÖNEMİ DERSLERİ -->
          <div class="space-y-3">
            <h3 class="font-bold text-slate-800 text-sm font-amiri flex items-center gap-2">
              <i data-lucide="sun" class="text-amber-600"></i>
              Güz Dönemi Seminerleri (${guzCourses.length} Ders)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              ${guzCourses.map(c => renderCourseCard(c, isLocked)).join('')}
            </div>
          </div>

          <!-- BAHAR DÖNEMİ DERSLERİ -->
          <div class="space-y-3 pt-4">
            <h3 class="font-bold text-slate-800 text-sm font-amiri flex items-center gap-2">
              <i data-lucide="flower" class="text-emerald-600"></i>
              Bahar Dönemi Seminerleri (${baharCourses.length} Ders)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              ${baharCourses.map(c => renderCourseCard(c, isLocked)).join('')}
            </div>
          </div>
        </div>
      ` : (seminarSubTab === 'selection' ? `
        <!-- ==================== 3. ALT SEKME: SEMİNER SEÇİMİ & ESER HAVUZU ==================== -->
        <div class="space-y-4">
          <!-- Üst Eylem ve Bilgilendirme Kartı -->
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h3 class="font-bold text-slate-900 text-sm font-amiri flex items-center gap-2">
                <i data-lucide="layers" class="text-emerald-700"></i>
                Eser Havuzu & Serbest Ders Atama Masası
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">
                Kullanıcı ders kodu ve metnini girerek havuza ders ekleyebilir veya Osmanlı medrese hiyerarşisindeki eserleri dilediği sınıfa atayabilir.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <button onclick="openCustomCourseModal()" class="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                Yeni Ders & Metin Ekle
              </button>
              <button onclick="openIdealScenarioModal()" class="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition">
                <i data-lucide="scroll" class="w-3.5 h-3.5"></i>
                İdeal Osmanlı Senaryoları
              </button>
            </div>
          </div>

          <!-- Kadim Osmanlı Medresesi 4 Temel Kademe Eser Cetveli -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs">
            <div class="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60">
              <span class="badge-ottoman-1 px-2 py-0.5 rounded text-[10px] font-bold">1: İbtidâ-i Hâric</span>
              <p class="text-[11px] text-emerald-950 mt-1.5 leading-snug">Emsile, Binâ, Maksûd, Avâmil; Îsâgûcî; Kudûrî; Kırk Hadis; Celâleyn Tefsiri.</p>
            </div>
            <div class="p-3 rounded-xl border border-teal-200 bg-teal-50/60">
              <span class="badge-ottoman-2 px-2 py-0.5 rounded text-[10px] font-bold">2: Hâric-Dâhil</span>
              <p class="text-[11px] text-teal-950 mt-1.5 leading-snug">İzhâr, Kâfiye/Câmî; Şemsiyye; Mültekâ, Dürer; Şerhu'l-Akâid; Beykūniyye; Medârik.</p>
            </div>
            <div class="p-3 rounded-xl border border-blue-200 bg-blue-50/60">
              <span class="badge-ottoman-3 px-2 py-0.5 rounded text-[10px] font-bold">3: Sahn-ı Semân</span>
              <p class="text-[11px] text-blue-950 mt-1.5 leading-snug">Muhtasaru'l-Me'ânî; Şerhu'l-Vikāye, Menâr, Tavzîh; Tecrîd, Hidâye; Beyzâvî.</p>
            </div>
            <div class="p-3 rounded-xl border border-purple-200 bg-purple-50/60">
              <span class="badge-ottoman-4 px-2 py-0.5 rounded text-[10px] font-bold">4: Süleymaniye</span>
              <p class="text-[11px] text-purple-950 mt-1.5 leading-snug">el-Hidâye, Telvîh; Şerhu'l-Mevâkıf, Tehâfüt; Sahîh-i Buhârî şerhleri; Keşşâf.</p>
            </div>
          </div>

          <!-- Tevâzün İlkesi Notu -->
          <div class="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <i data-lucide="shield-alert" class="w-4 h-4 text-amber-700 shrink-0"></i>
            <span><strong>Tevâzün İlkesi:</strong> Herhangi bir sınıf düzeyinde tek bir ilim branşı haftalık toplam tedrisat yükünün <strong>%60'ını aşamaz</strong>. Aşarsa sistem atamayı engeller.</span>
          </div>

          <!-- Arama & Branş Filtreleme Çubuğu -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div class="flex items-center gap-2 text-xs">
              <span class="text-slate-500 font-semibold">Branş:</span>
              <select onchange="selectionBranchFilter = this.value; renderCurriculumTab();" class="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white">
                <option value="all" ${selectionBranchFilter === 'all' ? 'selected' : ''}>Tüm Branşlar (${allCourses.length} Ders)</option>
                <option value="Klasik Arapça" ${selectionBranchFilter === 'Klasik Arapça' ? 'selected' : ''}>Klasik Arapça</option>
                <option value="Modern Arapça" ${selectionBranchFilter === 'Modern Arapça' ? 'selected' : ''}>Modern Arapça</option>
                <option value="Fıkıh ve Usul" ${selectionBranchFilter === 'Fıkıh ve Usul' ? 'selected' : ''}>Fıkıh ve Usul</option>
                <option value="Hadis ve Tefsir" ${selectionBranchFilter === 'Hadis ve Tefsir' ? 'selected' : ''}>Hadis ve Tefsir</option>
                <option value="Kelam ve Mantık" ${selectionBranchFilter === 'Kelam ve Mantık' ? 'selected' : ''}>Kelam ve Mantık</option>
                <option value="Sosyal Bilimler" ${selectionBranchFilter === 'Sosyal Bilimler' ? 'selected' : ''}>Sosyal Bilimler</option>
                <option value="Sanat ve Metodoloji" ${selectionBranchFilter === 'Sanat ve Metodoloji' ? 'selected' : ''}>Sanat ve Metodoloji</option>
              </select>
            </div>

            <input 
              type="text" 
              placeholder="Ders adı, kodu veya metin ara..." 
              value="${selectionCourseSearch}" 
              oninput="selectionCourseSearch = this.value; renderCurriculumTab();"
              class="px-3 py-1.5 border border-slate-300 rounded-lg text-xs w-full sm:w-64 focus:outline-none"
            >
          </div>

          <!-- Eser Havuzu Kartları -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            ${allCourses.filter(c => {
              if (selectionBranchFilter !== "all" && c.branch !== selectionBranchFilter) return false;
              if (selectionCourseSearch) {
                const q = selectionCourseSearch.toLowerCase();
                const m = (c.name && c.name.toLowerCase().includes(q)) ||
                          (c.code && c.code.toLowerCase().includes(q)) ||
                          (c.textbook && c.textbook.toLowerCase().includes(q)) ||
                          (c.arabicName && c.arabicName.toLowerCase().includes(q));
                if (!m) return false;
              }
              return true;
            }).map(c => {
              let ottomanBadge = "";
              if (c.ottomanLevel === 1) ottomanBadge = `<span class="badge-ottoman-1 px-1.5 py-0.5 rounded text-[9px] font-bold">1: İbtidâ-i Hâric</span>`;
              else if (c.ottomanLevel === 2) ottomanBadge = `<span class="badge-ottoman-2 px-1.5 py-0.5 rounded text-[9px] font-bold">2: Hâric-Dâhil</span>`;
              else if (c.ottomanLevel === 3) ottomanBadge = `<span class="badge-ottoman-3 px-1.5 py-0.5 rounded text-[9px] font-bold">3: Sahn-ı Semân</span>`;
              else if (c.ottomanLevel === 4) ottomanBadge = `<span class="badge-ottoman-4 px-1.5 py-0.5 rounded text-[9px] font-bold">4: Süleymaniye</span>`;
              else ottomanBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700 border">Özel Seminer</span>`;

              return `
                <div class="p-3.5 bg-white rounded-xl border border-slate-200 text-xs flex flex-col justify-between hover:shadow-sm transition">
                  <div>
                    <div class="flex justify-between items-start gap-1">
                      <span class="text-[10px] font-mono font-bold text-slate-400">${c.code}</span>
                      <div class="flex items-center gap-1">
                        ${ottomanBadge}
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${getBranchBadgeColor(c.branch)}">${c.branch}</span>
                      </div>
                    </div>

                    <h4 class="font-bold text-slate-900 text-sm mt-1.5">${c.name}</h4>
                    <div class="text-[11px] text-emerald-800 font-amiri italic">${c.arabicName || ''}</div>
                    <div class="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span class="text-[10px] text-slate-400 uppercase font-bold block">Okutulan Metin:</span>
                      <strong class="text-slate-800 text-[11px]">${c.textbook || c.name}</strong>
                    </div>

                    <div class="mt-2 text-[10px] text-slate-500">
                      Mevcut Atama: <strong class="text-slate-800">${c.classYear === 0 ? 'Hazırlık' : c.classYear + '. Sınıf'}</strong> • ${c.semester === 'guz' ? 'Güz' : 'Bahar'} • <strong>${c.weeklyHours || 4} saat/hafta</strong>
                    </div>
                  </div>

                  <!-- Müfredata Atama / Güncelleme Formu -->
                  <div class="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                    <div class="flex items-center gap-1.5">
                      <select id="sel_cl_${c.id}" class="text-[10px] p-1 border border-slate-300 rounded bg-white flex-1">
                        <option value="0" ${c.classYear === 0 ? 'selected' : ''}>Hazırlık</option>
                        <option value="1" ${c.classYear === 1 ? 'selected' : ''}>1. Sınıf</option>
                        <option value="2" ${c.classYear === 2 ? 'selected' : ''}>2. Sınıf</option>
                        <option value="3" ${c.classYear === 3 ? 'selected' : ''}>3. Sınıf</option>
                        <option value="4" ${c.classYear === 4 ? 'selected' : ''}>4. Sınıf</option>
                      </select>
                      <select id="sel_sm_${c.id}" class="text-[10px] p-1 border border-slate-300 rounded bg-white">
                        <option value="guz" ${c.semester === 'guz' ? 'selected' : ''}>Güz</option>
                        <option value="bahar" ${c.semester === 'bahar' ? 'selected' : ''}>Bahar</option>
                      </select>
                      <select id="sel_hr_${c.id}" class="text-[10px] p-1 border border-slate-300 rounded bg-white">
                        <option value="2" ${c.weeklyHours === 2 ? 'selected' : ''}>2 Saat</option>
                        <option value="3" ${c.weeklyHours === 3 ? 'selected' : ''}>3 Saat</option>
                        <option value="4" ${(c.weeklyHours === 4 || !c.weeklyHours) ? 'selected' : ''}>4 Saat</option>
                        <option value="6" ${c.weeklyHours === 6 ? 'selected' : ''}>6 Saat</option>
                      </select>
                      <button onclick="updateCourseAssignmentFromSelection('${c.id}')" class="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[10px] font-bold transition whitespace-nowrap shadow-sm">
                        Ata
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : `
        <!-- ==================== 4. ALT SEKME: DERS PROFİLLERİ & ESERLER KÜTÜPHANESİ ==================== -->
        <div class="space-y-6">
          <div class="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <i data-lucide="book" class="inline w-4 h-4 mr-1 text-amber-700"></i>
            <strong>Tedrisat Külliyatı:</strong> Kurumumuzda her ders kadim bir usul metni veya çağdaş bir eser üzerinden yürütülür. Talebelerimiz 5 yıllık süre zarfında Emsile'den el-Muvafakat'a, İsagüci'den Şerhu'l-Mevakıf'a kadar medrese mirasının şaheserlerini bizzat satır satır müzakere ederler.
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${allCourses.map(course => `
              <div class="ottoman-card p-5 rounded-2xl border bg-white flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      ${course.classYear === 0 ? 'Hazırlık Sınıfı' : `${course.classYear}. Sınıf`} • ${course.semesterLabel} Dönemi
                    </span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${getBranchBadgeColor(course.branch)}">
                      ${course.branch}
                    </span>
                  </div>

                  <h4 class="font-bold text-slate-900 text-base mt-1.5 font-amiri">${course.name}</h4>
                  <div class="text-xs text-emerald-800 font-amiri italic mt-0.5">${course.arabicName}</div>

                  <div class="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div class="flex items-center justify-between">
                      <span class="text-slate-500 font-medium">Okunan Metin / Kitap:</span>
                      <span class="font-bold text-slate-800">${course.textbook}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-slate-500 font-medium">Haftalık Tedrisat Yükü:</span>
                      <span class="font-bold text-emerald-700">${course.weeklyHours} Saat / Hafta</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-slate-500 font-medium">Tedrisat Usûlü:</span>
                      ${course.isClassicMethod ? `
                        <span class="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-[10px] border border-amber-300">
                          📜 Klasik Usule Bağlı
                        </span>
                      ` : `
                        <span class="px-2 py-0.5 bg-blue-100 text-blue-900 font-bold rounded text-[10px]">
                          Modern Akademik Usûl
                        </span>
                      `}
                    </div>
                  </div>

                  <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                    ${course.description}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `))}
    </div>
  `;

  container.innerHTML = html;
}

// Kurs Kartı Çizimi (Saat/Hafta ve Kilit Mantığı Dahil)
function renderCourseCard(course, isLocked) {
  const s = game.state;
  const assignedScholarId = s.courseAssignments[course.id];
  const assignedScholar = s.hiredScholars.find(h => h.scholarId === assignedScholarId);

  // Bu branşta kadromuzda derse girebilecek hocalar (bulunamazsa tüm hocalar seçilebilir)
  let eligibleScholars = s.hiredScholars.filter(h => {
    if (course.branch === "Klasik Arapça") {
      return h.specialty === "Klasik Arapça" || h.branch === "klasikArapca";
    }
    if (course.branch === "Modern Arapça") {
      return h.specialty === "Modern Arapça" || h.branch === "modernArapca";
    }
    return h.specialty === course.branch;
  });
  if (eligibleScholars.length === 0) {
    eligibleScholars = s.hiredScholars;
  }

  return `
    <div class="ottoman-card p-4 rounded-xl border flex flex-col justify-between ${!assignedScholar ? 'border-red-300 bg-red-50/20' : 'bg-white'}">
      <div>
        <div class="flex justify-between items-start">
          <span class="text-[10px] font-bold uppercase text-slate-400">
            ${course.code} • ${course.weeklyHours || 4} saat/hafta
          </span>
          <div class="flex items-center gap-1">
            ${course.isClassicMethod ? `
              <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300" title="Geleneksel medrese metin tahlili usulü">
                📜 Klasik Usul
              </span>
            ` : ''}
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${getBranchBadgeColor(course.branch)}">
              ${course.branch}
            </span>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 text-sm mt-1.5">${course.name}</h4>
        <div class="font-amiri text-xs text-emerald-800 italic">${course.arabicName}</div>
        <div class="text-[11px] text-slate-700 font-medium mt-2 bg-slate-50 px-2 py-1 rounded border border-slate-100">
          Metin: <strong>${course.textbook}</strong>
        </div>
        <p class="text-[11px] text-slate-500 mt-2 leading-relaxed">${course.description}</p>
      </div>

      <!-- HOCA EŞLEŞTİRME BÖLGESİ -->
      <div class="mt-4 pt-3 border-t border-slate-100">
        ${assignedScholar ? `
          <div class="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-xs flex justify-between items-center">
            <div>
              <span class="text-[9px] text-emerald-800 uppercase font-bold block">Dersi Veren Müderris:</span>
              <span class="font-bold text-slate-900">${assignedScholar.title} ${assignedScholar.name}</span>
            </div>
            ${!isLocked ? `
              <button onclick="handleUnassignCourse('${course.id}')" class="text-red-500 hover:text-red-700 text-[10px] font-semibold" title="Hocayı dersten ayır">
                Kaldır
              </button>
            ` : `
              <span class="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5">
                <i data-lucide="lock" class="w-3 h-3"></i> Kilitli
              </span>
            `}
          </div>
        ` : `
          <div class="space-y-1.5">
            <div class="px-2 py-1 bg-red-100 text-red-800 text-[10px] font-bold rounded flex items-center gap-1.5">
              <span>⚠️ Acil Hoca İhtiyacı!</span>
            </div>
            ${!isLocked ? `
              ${eligibleScholars.length > 0 ? `
                <div class="flex items-center gap-1">
                  <select id="sel_sch_${course.id}" class="text-[10px] p-1 border border-slate-300 rounded bg-white flex-1">
                    ${eligibleScholars.map(h => `<option value="${h.scholarId}">${h.title} ${h.name}</option>`).join('')}
                  </select>
                  <button onclick="handleAssignCourse('${course.id}')" class="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[10px] font-bold">
                    Ata
                  </button>
                </div>
              ` : `
                <div class="text-[10px] text-slate-500 italic">
                  Kadronuzda bu branşta (${course.branch}) hoca yok. Hoca pazarından transfer ediniz.
                </div>
              `}
            ` : `
              <div class="text-[10px] text-red-600 font-semibold italic">
                Dönem ortasında hoca ataması kilitlidir. Dönem başı beklenmeli.
              </div>
            `}
          </div>
        `}
      </div>
    </div>
  `;
}

function handleAssignCourse(courseId) {
  const sel = document.getElementById(`sel_sch_${courseId}`);
  if (!sel) return;
  const scholarId = parseInt(sel.value);
  const res = game.assignScholarToCourse(courseId, scholarId);
  if (!res.success) alert(res.message);
  renderAll();
}

function handleUnassignCourse(courseId) {
  const res = game.unassignScholarFromCourse(courseId);
  if (!res.success) alert(res.message);
  renderAll();
}

function handleAutoAssignScholars() {
  if (!game.state.hiredScholars || game.state.hiredScholars.length === 0) {
    alert("Kadronuzda henüz hoca bulunmuyor. Önce 'TEDRİSAT > Hoca Kadrosu ve Pazar' menüsünden hoca transfer ediniz.");
    switchTab("scholars");
    return;
  }
  const count = game.autoAssignScholarsToCourses();
  if (typeof showToastNotification === "function") {
    showToastNotification(`✓ ${count} ders kadronuzdaki hocalara otomatik olarak dağıtıldı.`, "success");
  }
  renderAll();
}

// ==================== SEMİNER SEÇİMİ, ESER HAVUZU & İDEAL SENARYO İŞLEMLERİ ====================
function openCustomCourseModal() {
  const modal = document.getElementById("customCourseModal");
  if (modal) modal.classList.remove("hidden");
  if (window.lucide) window.lucide.createIcons();
}

function closeCustomCourseModal() {
  const modal = document.getElementById("customCourseModal");
  if (modal) modal.classList.add("hidden");
}

function saveCustomCourseToPool() {
  const code = document.getElementById("newCourseCode").value.trim();
  const name = document.getElementById("newCourseName").value.trim();
  const textbook = document.getElementById("newCourseTextbook").value.trim();
  const branch = document.getElementById("newCourseBranch").value;
  const level = parseInt(document.getElementById("newCourseLevel").value) || 1;
  const hours = parseInt(document.getElementById("newCourseHours").value) || 3;
  const classYear = parseInt(document.getElementById("newCourseClass").value);

  if (!code || !name) {
    alert("Lütfen ders kodunu ve ders adını eksiksiz giriniz.");
    return;
  }

  const res = game.addCustomCourseToPool({
    code,
    name,
    textbook: textbook || name,
    branch,
    ottomanLevel: level,
    weeklyHours: hours,
    classYear: classYear >= 0 ? classYear : 1
  });

  if (!res.success) {
    alert(res.message);
    return;
  }

  closeCustomCourseModal();
  renderCurriculumTab();
  if (typeof showToastNotification === "function") {
    showToastNotification(res.message, "success");
  } else {
    alert(res.message);
  }
}

function openIdealScenarioModal() {
  const modal = document.getElementById("idealScenarioModal");
  if (modal) modal.classList.remove("hidden");
  if (window.lucide) window.lucide.createIcons();
}

function closeIdealScenarioModal() {
  const modal = document.getElementById("idealScenarioModal");
  if (modal) modal.classList.add("hidden");
}

function handleApplyOttomanScenario(scenarioKey) {
  const res = game.applyOttomanScenario(scenarioKey);
  alert(res.message);
  closeIdealScenarioModal();
  renderAll();
}

function updateCourseAssignmentFromSelection(courseId) {
  const clSel = document.getElementById(`sel_cl_${courseId}`);
  const smSel = document.getElementById(`sel_sm_${courseId}`);
  const hrSel = document.getElementById(`sel_hr_${courseId}`);
  if (!clSel || !smSel || !hrSel) return;

  const targetClass = parseInt(clSel.value);
  const targetSemester = smSel.value;
  const targetHours = parseInt(hrSel.value);

  const allCourses = game.getAllCourses();
  const course = allCourses.find(c => c.id === courseId || String(c.id) === String(courseId));
  if (!course) {
    alert("Ders bulunamadı.");
    return;
  }

  // Tevâzün İlkesi (60% Kuralı) Kontrolü
  const validation = game.validateCurriculumBranchCap(targetClass, course.id, course.branch, targetHours);
  if (!validation.valid) {
    alert(`⚠️ Tevâzün İlkesi İhlali!\n${validation.message}`);
    return;
  }

  // Müfredata güncelle
  if (!game.state.customCurriculum) game.state.customCurriculum = [];
  const existingIdx = game.state.customCurriculum.findIndex(c => c.id === course.id || String(c.id) === String(course.id));
  const updatedCourse = {
    ...course,
    classYear: targetClass,
    semester: targetSemester,
    weeklyHours: targetHours,
    semesterLabel: targetSemester === "guz" ? "Güz" : "Bahar"
  };

  if (existingIdx >= 0) {
    game.state.customCurriculum[existingIdx] = updatedCourse;
  } else {
    game.state.customCurriculum.push(updatedCourse);
  }

  game.saveToStorage();
  renderCurriculumTab();
  if (typeof showToastNotification === "function") {
    showToastNotification(`📚 ${course.name} (${targetHours} saat/hafta) ${targetClass === 0 ? 'Hazırlık' : targetClass + '. Sınıf'} müfredatına atandı.`, "success");
  } else {
    alert(`Ders başarıyla atandı.`);
  }
}

function getBranchBadgeColor(branch) {
  const colors = {
    "Klasik Arapça": "bg-emerald-100 text-emerald-800 border border-emerald-300",
    "Modern Arapça": "bg-teal-100 text-teal-800 border border-teal-300",
    "Fıkıh ve Usul": "bg-amber-100 text-amber-800 border border-amber-300",
    "Hadis ve Tefsir": "bg-blue-100 text-blue-800 border border-blue-300",
    "Kelam ve Mantık": "bg-purple-100 text-purple-800 border border-purple-300",
    "Sosyal Bilimler": "bg-rose-100 text-rose-800 border border-rose-300",
    "Sanat ve Metodoloji": "bg-indigo-100 text-indigo-800 border border-indigo-300"
  };
  return colors[branch] || "bg-slate-100 text-slate-700 border border-slate-300";
}

// ==================== SEKME 3: HOCA KADROSU & PAZAR ====================
function renderScholarsTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;
  const isFemale = s.genderMode === "female";

  const scholarsPool = isFemale ? SCHOLARS_DATA_FEMALE : SCHOLARS_DATA_MALE;
  let allMarketScholars = [...scholarsPool];
  if (s.scholarsMarket && s.scholarsMarket.length > 0) {
    allMarketScholars = [...s.scholarsMarket, ...allMarketScholars];
  }

  const totalMonthlySalary = s.hiredScholars.reduce((acc, h) => acc + h.monthlySalary, 0);
  const sponsoredAmount = s.scholarBudget.sponsoredMonthlyAmount || 0;
  const netScholarCost = Math.max(0, totalMonthlySalary - sponsoredAmount);

  // Filtreleme
  let filtered = allMarketScholars.filter(sch => {
    if (scholarFilterSpecialty !== "all" && sch.specialty !== scholarFilterSpecialty && sch.branch !== scholarFilterSpecialty) return false;
    if (sch.monthlySalary > scholarFilterMaxPrice) return false;
    return true;
  });

  let html = `
    <div class="space-y-6">
      <!-- Kadro Özeti -->
      <div class="ottoman-card p-5 rounded-2xl border bg-gradient-to-r from-emerald-50/40 via-white to-amber-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
            <i data-lucide="award" class="text-emerald-800"></i>
            ${isFemale ? 'Hanım Müderrisler Meclisi' : 'Kıymetli Hocalar Meclisi'} (Kadromuzda: ${s.hiredScholars.length})
          </h2>
          <p class="text-xs text-slate-600 mt-1">
            Arapça dil ve İslam ilimlerinde otoriteler. Hoca maliyetleri %20 indirilmiştir. Kürsü sponsorluklarıyla müderris maaşları vakıf dışı fonlanabilir.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 text-xs">
          <div class="px-3.5 py-2 rounded-xl bg-white border border-slate-200">
            <span class="text-slate-400 block text-[10px]">Brüt Hoca Gideri:</span>
            <span class="font-bold text-slate-900">${totalMonthlySalary.toLocaleString('tr-TR')} ₺/ay</span>
          </div>
          <div class="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
            <span class="text-emerald-800 block text-[10px]">Kürsü Sponsorluğu:</span>
            <span class="font-bold text-emerald-800">-${sponsoredAmount.toLocaleString('tr-TR')} ₺/ay</span>
          </div>
          <div class="px-3.5 py-2 rounded-xl bg-white border border-slate-200">
            <span class="text-slate-400 block text-[10px]">Vakfa Kalan Net Maliyet:</span>
            <div class="text-base font-bold text-emerald-700">${netScholarCost.toLocaleString('tr-TR')} ₺/ay</div>
          </div>
        </div>
      </div>

      <!-- Kadromuzdaki Mevcut Hocalar -->
      <div class="ottoman-card p-5 rounded-2xl border bg-white shadow-sm space-y-3">
        <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
          <i data-lucide="check-circle" class="text-emerald-600"></i>
          Kurumumuzda Vazifeli Müderris Kadrosu (${s.hiredScholars.length} Hoca)
        </h3>

        ${s.hiredScholars.length === 0 ? `
          <div class="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed">
            Henüz kadronuza hoca transfer etmediniz. Aşağıdaki pazardan bütçenize uygun hocaları istihdam ediniz.
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            ${s.hiredScholars.map(h => `
              <div class="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 text-xs flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${getBranchBadgeColor(h.specialty)}">
                      ${h.specialty}
                    </span>
                    <span class="font-bold text-emerald-800">${h.monthlySalary.toLocaleString('tr-TR')} ₺/ay</span>
                  </div>
                  <h4 class="font-bold text-slate-900 text-sm mt-2">${h.title} ${h.name}</h4>
                  <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                    <span>Devam: <strong>%${h.attendanceRate}</strong></span>
                    <span>•</span>
                    <span>Talebe Memnuniyeti: <strong>%${h.studentApprovalRate}</strong></span>
                  </div>
                </div>
                <div class="mt-3 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px]">
                  <span class="text-slate-400">Yetkinlik: ${h.expertiseScore || 70}/100</span>
                  <button onclick="handleFireScholar('${h.scholarId}')" class="text-red-500 hover:text-red-700 font-semibold">
                    Sözleşmeyi Feshet
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- HOCA TRANSFER PAZARI -->
      <div class="ottoman-card p-5 rounded-2xl border bg-white shadow-sm space-y-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h3 class="font-bold text-slate-900 text-sm md:text-base font-amiri flex items-center gap-2">
              <i data-lucide="shopping-bag" class="text-amber-700"></i>
              Müderris Transfer Piyasası & Serbest Kürsüler
            </h3>
            <p class="text-xs text-slate-500">
              Klasik Arapça (6 Hoca), Modern Arapça (4 Hoca) ve diğer branşlarda hocalar. İtibar arttıkça yeni hocalar açılır.
            </p>
          </div>

          <!-- Filtreler ve Hoca Ekle Butonu -->
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <button onclick="openAddScholarModal()" class="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition">
              <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
              Yeni Hoca Davet Et / Pazara Ekle
            </button>

            <select onchange="scholarFilterSpecialty = this.value; renderScholarsTab();" class="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white">
              <option value="all" ${scholarFilterSpecialty === 'all' ? 'selected' : ''}>Tüm Branşlar</option>
              <option value="Klasik Arapça" ${scholarFilterSpecialty === 'Klasik Arapça' ? 'selected' : ''}>Klasik Arapça</option>
              <option value="Modern Arapça" ${scholarFilterSpecialty === 'Modern Arapça' ? 'selected' : ''}>Modern Arapça</option>
              <option value="Fıkıh ve Usul" ${scholarFilterSpecialty === 'Fıkıh ve Usul' ? 'selected' : ''}>Fıkıh ve Usul</option>
              <option value="Hadis ve Tefsir" ${scholarFilterSpecialty === 'Hadis ve Tefsir' ? 'selected' : ''}>Hadis ve Tefsir</option>
              <option value="Kelam ve Mantık" ${scholarFilterSpecialty === 'Kelam ve Mantık' ? 'selected' : ''}>Kelam ve Mantık</option>
              <option value="Sosyal Bilimler" ${scholarFilterSpecialty === 'Sosyal Bilimler' ? 'selected' : ''}>Sosyal Bilimler</option>
              <option value="Sanat ve Metodoloji" ${scholarFilterSpecialty === 'Sanat ve Metodoloji' ? 'selected' : ''}>Sanat ve Metodoloji</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          ${filtered.map(sch => {
            const isHired = s.hiredScholars.some(h => String(h.scholarId) === String(sch.id));
            const reqRep = sch.minReputationRequired !== undefined ? sch.minReputationRequired : (sch.minReputation || 20);
            const isLocked = s.reputation < reqRep;

            return `
              <div class="p-4 rounded-xl border flex flex-col justify-between ${isHired ? 'bg-emerald-50/40 border-emerald-300' : (isLocked ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200')}">
                <div>
                  <div class="flex justify-between items-start">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${getBranchBadgeColor(sch.specialty || sch.branch)}">
                      ${sch.specialty || sch.branch} ${sch.age ? `• ${sch.age} Yaş` : (sch.ageCategoryLabel ? `• ${sch.ageCategoryLabel.split(' ')[0]}` : '')}
                    </span>
                    <span class="font-bold text-slate-800 text-xs">${sch.monthlySalary.toLocaleString('tr-TR')} ₺/ay</span>
                  </div>

                  <h4 class="font-bold text-slate-900 text-sm mt-2">${sch.title} ${sch.name}</h4>
                  <div class="text-[10px] text-slate-400">${sch.institution || sch.proximityLabel || 'İstanbul İçi'}</div>
                  <p class="text-[11px] text-slate-500 mt-2 leading-relaxed">${sch.bio}</p>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span class="text-[10px] text-slate-400">İlim Gücü: <strong>${sch.expertiseScore || sch.academicDepth || 75}</strong></span>

                  ${isHired ? `
                    <span class="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">
                      ✓ Kadroda
                    </span>
                  ` : (isLocked ? `
                    <span class="px-2.5 py-1 bg-slate-200 text-slate-600 font-semibold rounded-lg text-[10px] flex items-center gap-1" title="Kurum itibarı en az ${reqRep} olmalı">
                      <i data-lucide="lock" class="w-3 h-3"></i> İtibar ${reqRep}
                    </span>
                  ` : `
                    <button onclick="handleHireScholar('${sch.id}')" class="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[11px] shadow transition">
                      Kadroya Kat
                    </button>
                  `)}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function handleHireScholar(scholarId) {
  const res = game.hireScholar(scholarId);
  if (!res.success) {
    alert(res.message);
  }
  renderAll();
}

function handleFireScholar(scholarId) {
  if (confirm("Bu hocamız ile yapılan sözleşmeyi feshetmek istediğinize emin misiniz?")) {
    game.terminateScholarContract(scholarId);
    renderAll();
  }
}

// ==================== HOCA PAZARINA ÖZEL HOCA EKLEME KONTROLLERİ ====================
function openAddScholarModal() {
  const modal = document.getElementById("addScholarModal");
  if (modal) modal.classList.remove("hidden");
  previewScholarCalculations();
  if (window.lucide) window.lucide.createIcons();
}

function closeAddScholarModal() {
  const modal = document.getElementById("addScholarModal");
  if (modal) modal.classList.add("hidden");
}

function previewScholarCalculations() {
  const ageCat = document.getElementById("schAge") ? document.getElementById("schAge").value : "olgun";
  const exp = parseInt(document.getElementById("schExp") ? document.getElementById("schExp").value : 3) || 3;
  const prox = parseInt(document.getElementById("schProximity") ? document.getElementById("schProximity").value : 2) || 2;

  const ageBonus = ageCat === "pir" ? 12 : (ageCat === "duayen" ? 8 : (ageCat === "olgun" ? 4 : 0));
  const minRep = Math.min(95, Math.max(20, 25 + (exp * 8) + (prox * 6) + ageBonus));

  const baseSalary = 16000;
  const expMult = [1.0, 1.4, 2.0, 2.8, 4.0][exp - 1] || 2.0;
  const proxMult = [1.0, 1.15, 1.4, 2.0, 3.2][prox - 1] || 1.2;
  const ageSalaryBonus = ageCat === "pir" ? 8000 : (ageCat === "duayen" ? 5000 : 0);
  const monthlySalary = Math.round((baseSalary * expMult * proxMult) + ageSalaryBonus);

  const repEl = document.getElementById("schCalcMinRep");
  if (repEl) repEl.innerText = `${minRep} Puan`;
  const salEl = document.getElementById("schCalcSalary");
  if (salEl) salEl.innerText = `${monthlySalary.toLocaleString('tr-TR')} ₺ / ay`;
}

function saveCustomScholar() {
  const name = document.getElementById("schName").value.trim();
  const branch = document.getElementById("schBranch").value;
  const ageCategory = document.getElementById("schAge").value;
  const experienceLevel = parseInt(document.getElementById("schExp").value);
  const proximityDifficulty = parseInt(document.getElementById("schProximity").value);

  if (!name) {
    alert("Lütfen hocanın adını ve unvanını giriniz.");
    return;
  }

  const sch = game.addCustomScholarToMarket({
    name,
    branch,
    ageCategory,
    experienceLevel,
    proximityDifficulty
  });

  closeAddScholarModal();
  renderScholarsTab();
  if (typeof showToastNotification === "function") {
    showToastNotification(`🎖️ ${sch.title} ${sch.name} hoca pazarına eklendi.`, "success");
  } else {
    alert(`${sch.title} ${sch.name} hoca pazarına eklendi.`);
  }
}

// ==================== SEKME 4: PERSONEL & İDARE ====================
function renderStaffTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;
  const isFemale = s.genderMode === "female";

  const viceList = isFemale ? VICE_DIRECTORS_FEMALE : VICE_DIRECTORS_MALE;
  const dormList = isFemale ? DORM_MANAGERS_FEMALE : DORM_MANAGERS_MALE;
  const accList = isFemale ? ACCOUNTANTS_FEMALE : ACCOUNTANTS_MALE;
  const cookList = COOKS_DATA;
  const cleanList = CLEANING_STAFF_DATA;

  let totalStaffSalary = 0;
  if (s.viceDirector) totalStaffSalary += s.viceDirector.monthlySalary;
  if (s.dormManager) totalStaffSalary += s.dormManager.monthlySalary;
  if (s.accountant) totalStaffSalary += s.accountant.monthlySalary;
  if (s.cook) totalStaffSalary += s.cook.monthlySalary;
  if (s.cleaningStaff) totalStaffSalary += s.cleaningStaff.reduce((a, b) => a + b.monthlySalary, 0);

  let html = `
    <div class="space-y-6">
      <div class="ottoman-card p-5 rounded-2xl border bg-gradient-to-r from-emerald-50/30 via-white to-amber-50/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
            <i data-lucide="users" class="text-emerald-800"></i>
            İdari Personel ve Hizmetli Kadrosu
          </h2>
          <p class="text-xs text-slate-600 mt-1">
            Müdür Yardımcısı, Yurt İdaresi, Bilanço Muhasebecisi, Aşçı ve Temizlikçiler. Personel maaşları her ay vakıf kasasından düzenli ödenir.
          </p>
        </div>
        <div class="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs">
          <span class="text-slate-400 block text-[10px]">Aylık Personel Bütçesi:</span>
          <span class="font-bold text-slate-900 text-sm">${totalStaffSalary.toLocaleString('tr-TR')} ₺/ay</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 1. Müdür Yardımcısı -->
        <div class="ottoman-card p-5 rounded-2xl border space-y-3">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="user-check" class="text-emerald-700"></i>
              Müdür Yardımcısı (Rehberlik & Stres Takibi)
            </h3>
            <span class="text-xs text-emerald-800 font-bold">${s.viceDirector ? 'Atandı' : 'Boş'}</span>
          </div>
          <p class="text-[11px] text-slate-500">Öğrencilerin genel stres durumunu takip eder ve kriz anlarında çiğköfte, maç, ziyafet veya gezi teklif eder.</p>
          <div class="space-y-2">
            ${viceList.map(v => `
              <div class="p-3 rounded-xl border ${s.viceDirector && s.viceDirector.id === v.id ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'} text-xs flex justify-between items-center">
                <div>
                  <div class="font-bold text-slate-800">${v.name}</div>
                  <div class="text-[11px] text-slate-500">${v.bio}</div>
                  <div class="text-[10px] text-emerald-800 font-semibold mt-1">Maaş: ${v.monthlySalary.toLocaleString('tr-TR')} ₺/ay</div>
                </div>
                <button onclick="handleAssignStaff('viceDirector', '${v.id}')" class="px-3 py-1.5 ${s.viceDirector && s.viceDirector.id === v.id ? 'bg-emerald-700 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'} rounded-lg font-bold text-[10px]">
                  ${s.viceDirector && s.viceDirector.id === v.id ? 'Vazifede' : 'Ata'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Yurt Müdürü -->
        <div class="ottoman-card p-5 rounded-2xl border space-y-3">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="home" class="text-amber-700"></i>
              Yurt Müdürü / Müdiresi (Asayiş & Etüt)
            </h3>
            <span class="text-xs text-amber-800 font-bold">${s.dormManager ? 'Atandı' : 'Boş'}</span>
          </div>
          <p class="text-[11px] text-slate-500">Yurt düzenini, etüt disiplinini ve hadiseleri takip eder; takvimde aylık teftiş raporu sunar.</p>
          <div class="space-y-2">
            ${dormList.map(dm => `
              <div class="p-3 rounded-xl border ${s.dormManager && s.dormManager.id === dm.id ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'} text-xs flex justify-between items-center">
                <div>
                  <div class="font-bold text-slate-800">${dm.name}</div>
                  <div class="text-[11px] text-slate-500">${dm.bio}</div>
                  <div class="text-[10px] text-amber-800 font-semibold mt-1">Maaş: ${dm.monthlySalary.toLocaleString('tr-TR')} ₺/ay</div>
                </div>
                <button onclick="handleAssignStaff('dormManager', '${dm.id}')" class="px-3 py-1.5 ${s.dormManager && s.dormManager.id === dm.id ? 'bg-amber-700 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'} rounded-lg font-bold text-[10px]">
                  ${s.dormManager && s.dormManager.id === dm.id ? 'Vazifede' : 'Ata'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Muhasebeci / Mali Müşavir -->
        <div class="ottoman-card p-5 rounded-2xl border space-y-3">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="calculator" class="text-blue-700"></i>
              Mali Müşavir / Muhasebeci (Bilanço)
            </h3>
            <span class="text-xs text-blue-800 font-bold">${s.accountant ? 'Atandı' : 'Boş'}</span>
          </div>
          <p class="text-[11px] text-slate-500">Atandığında <strong>Bilanço & Muhasebe</strong> sekmesini açar; gelir-gider nakit akışını kontrol eder.</p>
          <div class="space-y-2">
            ${accList.map(ac => `
              <div class="p-3 rounded-xl border ${s.accountant && s.accountant.id === ac.id ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200'} text-xs flex justify-between items-center">
                <div>
                  <div class="font-bold text-slate-800">${ac.name}</div>
                  <div class="text-[11px] text-slate-500">${ac.bio}</div>
                  <div class="text-[10px] text-blue-800 font-semibold mt-1">Maaş: ${ac.monthlySalary.toLocaleString('tr-TR')} ₺/ay</div>
                </div>
                <button onclick="handleAssignStaff('accountant', '${ac.id}')" class="px-3 py-1.5 ${s.accountant && s.accountant.id === ac.id ? 'bg-blue-700 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'} rounded-lg font-bold text-[10px]">
                  ${s.accountant && s.accountant.id === ac.id ? 'Vazifede' : 'Ata'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Aşçı -->
        <div class="ottoman-card p-5 rounded-2xl border space-y-3">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="utensils" class="text-purple-700"></i>
              Yurt Baş Aşçısı (Yemekhane)
            </h3>
            <span class="text-xs text-purple-800 font-bold">${s.cook ? 'Atandı' : 'Boş'}</span>
          </div>
          <p class="text-[11px] text-slate-500">Talebelerin beslenme kalitesini artırır, yurt memnuniyetini ve sabah dersi zindeliğini yükseltir.</p>
          <div class="space-y-2">
            ${cookList.map(ck => `
              <div class="p-3 rounded-xl border ${s.cook && s.cook.id === ck.id ? 'bg-purple-50 border-purple-300' : 'bg-slate-50 border-slate-200'} text-xs flex justify-between items-center">
                <div>
                  <div class="font-bold text-slate-800">${ck.name}</div>
                  <div class="text-[11px] text-slate-500">${ck.bio}</div>
                  <div class="text-[10px] text-purple-800 font-semibold mt-1">Maaş: ${ck.monthlySalary.toLocaleString('tr-TR')} ₺/ay</div>
                </div>
                <button onclick="handleAssignStaff('cook', '${ck.id}')" class="px-3 py-1.5 ${s.cook && s.cook.id === ck.id ? 'bg-purple-700 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'} rounded-lg font-bold text-[10px]">
                  ${s.cook && s.cook.id === ck.id ? 'Vazifede' : 'Ata'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 5. Temizlik Görevlileri -->
        <div class="ottoman-card p-5 rounded-2xl border space-y-3 md:col-span-2">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="sparkles" class="text-teal-700"></i>
              Temizlik ve Meydancı Görevlileri
            </h3>
            <span class="text-xs text-teal-800 font-bold">${s.cleaningStaff.length} Görevli</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            ${cleanList.map(cl => {
              const isAssigned = s.cleaningStaff.some(c => c.id === cl.id);
              return `
                <div class="p-3 rounded-xl border ${isAssigned ? 'bg-teal-50/70 border-teal-300' : 'bg-slate-50 border-slate-200'} text-xs flex justify-between items-center">
                  <div>
                    <div class="font-bold text-slate-800">${cl.name}</div>
                    <div class="text-[11px] text-slate-500">${cl.bio}</div>
                    <div class="text-[10px] text-teal-800 font-semibold mt-1">Maaş: ${cl.monthlySalary.toLocaleString('tr-TR')} ₺/ay</div>
                  </div>
                  ${isAssigned ? `
                    <button onclick="handleRemoveCleaningStaff('${cl.id}')" class="px-2 py-1 bg-red-100 text-red-800 rounded font-bold text-[10px]">
                      Çıkar
                    </button>
                  ` : `
                    <button onclick="handleAddCleaningStaff('${cl.id}')" class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded font-semibold text-[10px]">
                      İşe Al
                    </button>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function handleAssignStaff(role, staffId) {
  const isFemale = game.state.genderMode === "female";
  if (role === "viceDirector") {
    const list = isFemale ? VICE_DIRECTORS_FEMALE : VICE_DIRECTORS_MALE;
    game.state.viceDirector = list.find(s => s.id === staffId);
  } else if (role === "dormManager") {
    const list = isFemale ? DORM_MANAGERS_FEMALE : DORM_MANAGERS_MALE;
    game.state.dormManager = list.find(s => s.id === staffId);
  } else if (role === "accountant") {
    const list = isFemale ? ACCOUNTANTS_FEMALE : ACCOUNTANTS_MALE;
    game.state.accountant = list.find(s => s.id === staffId);
  } else if (role === "cook") {
    game.state.cook = COOKS_DATA.find(s => s.id === staffId);
  }
  game.saveToStorage();
  renderAll();
}

function handleAddCleaningStaff(staffId) {
  const staff = CLEANING_STAFF_DATA.find(s => s.id === staffId);
  if (staff && !game.state.cleaningStaff.some(c => c.id === staffId)) {
    game.state.cleaningStaff.push(staff);
    game.saveToStorage();
    renderAll();
  }
}

function handleRemoveCleaningStaff(staffId) {
  game.state.cleaningStaff = game.state.cleaningStaff.filter(c => c.id !== staffId);
  game.saveToStorage();
  renderAll();
}

// ==================== SEKME 5: BİLANÇO & MUHASEBE ====================
function renderAccountingTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;

  if (!s.accountant) {
    container.innerHTML = `
      <div class="ottoman-card p-12 rounded-3xl border text-center space-y-4 max-w-xl mx-auto my-8 bg-white shadow-lg">
        <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <i data-lucide="calculator" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-bold font-amiri text-slate-900">Mali Müşavir / Muhasebeci İstihdam Edilmedi</h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Vakfımızın aylık gelir-gider bilançosunu, yerel esnaf düzenli bağış defterini ve hoca kürsü sponsorluklarını tutabilmek için yetkili bir mali müşavir atanmalıdır.
        </p>
        <button onclick="switchTab('staff')" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition">
          Personel Sekmesine Git ve Muhasebeci Ata
        </button>
      </div>
    `;
    return;
  }

  const f = s.lastMonthlyFinances;
  const activeStudents = s.students.filter(st => st.status === "active");
  const monthlyStipendTotal = activeStudents.length * s.currentYearStipend;
  const scholarsCost = s.hiredScholars.reduce((acc, h) => acc + h.monthlySalary, 0);

  let staffCost = 0;
  if (s.viceDirector) staffCost += s.viceDirector.monthlySalary;
  if (s.dormManager) staffCost += s.dormManager.monthlySalary;
  if (s.accountant) staffCost += s.accountant.monthlySalary;
  if (s.cook) staffCost += s.cook.monthlySalary;
  if (s.cleaningStaff) staffCost += s.cleaningStaff.reduce((a, b) => a + b.monthlySalary, 0);

  const rentCost = s.isBuildingAllocated ? 0 : (s.monthlyRent || 42000);
  const dormCost = s.dormStatus.monthlyMaintenanceCost + (s.upgrades.dormDining * 8000);
  const sponsoredAmount = s.scholarBudget.sponsoredMonthlyAmount || 0;

  const totalMonthlyIncome = s.localMerchantsDonationThisMonth + sponsoredAmount;
  const totalMonthlyExpense = rentCost + monthlyStipendTotal + (scholarsCost - sponsoredAmount) + staffCost + dormCost;
  const netSurplus = totalMonthlyIncome - totalMonthlyExpense;

  let html = `
    <div class="space-y-6">
      <div class="ottoman-card p-5 rounded-2xl border bg-gradient-to-r from-emerald-50/40 via-white to-blue-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
            <i data-lucide="calculator" class="text-emerald-800"></i>
            Vakıf Mali Müşavirlik Bilanço Defteri
          </h2>
          <p class="text-xs text-slate-600 mt-1">
            Mali Müşavir: <strong>${s.accountant.name}</strong> • Esnaf bağışları minimum 400.000 ₺/ay olarak kasaya intikal eder.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1.5 rounded-xl text-xs font-bold ${netSurplus >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
            Aylık Net Akış: ${netSurplus >= 0 ? '+' : ''}${netSurplus.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 1. GELİRLER -->
        <div class="ottoman-card p-5 rounded-2xl border bg-white space-y-3">
          <div class="flex justify-between items-center border-b border-slate-100 pb-2">
            <h3 class="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
              <i data-lucide="arrow-down-left" class="text-emerald-600"></i>
              Aylık Düzenli Gelirler Kalemi
            </h3>
            <span class="font-bold text-emerald-700 text-xs">${totalMonthlyIncome.toLocaleString('tr-TR')} ₺/ay</span>
          </div>

          <div class="space-y-2 text-xs">
            <div class="p-2.5 bg-emerald-50/50 rounded-xl flex justify-between items-center">
              <div>
                <div class="font-bold text-slate-800">Üsküdar & Fatih Esnafı Düzenli Bağış Havuzu</div>
                <div class="text-[10px] text-slate-500">Sabit aylık gelir: Minimum 400.000 ₺</div>
              </div>
              <span class="font-bold text-emerald-800">+${s.localMerchantsDonationThisMonth.toLocaleString('tr-TR')} ₺</span>
            </div>

            <div class="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <div>
                <div class="font-bold text-slate-800">Hayırsever Hoca Kürsü Sponsorlukları</div>
                <div class="text-[10px] text-slate-500">${s.scholarBudget.sponsoredChairsCount} Müderris Kürsüsü fonlanmaktadır</div>
              </div>
              <span class="font-bold text-emerald-800">+${sponsoredAmount.toLocaleString('tr-TR')} ₺</span>
            </div>
          </div>
        </div>

        <!-- 2. GİDERLER -->
        <div class="ottoman-card p-5 rounded-2xl border bg-white space-y-3">
          <div class="flex justify-between items-center border-b border-slate-100 pb-2">
            <h3 class="font-bold text-red-900 text-sm flex items-center gap-1.5">
              <i data-lucide="arrow-up-right" class="text-red-600"></i>
              Aylık Sabit Giderler Kalemi
            </h3>
            <span class="font-bold text-red-700 text-xs">${totalMonthlyExpense.toLocaleString('tr-TR')} ₺/ay</span>
          </div>

          <div class="space-y-1.5 text-xs">
            <div class="p-2 bg-slate-50 rounded-lg flex justify-between items-center">
              <span class="text-slate-600">Bina Kirası (${s.isBuildingAllocated ? 'Tahsisli / 0 ₺' : 'Kiralık'}):</span>
              <span class="font-bold ${rentCost === 0 ? 'text-emerald-700' : 'text-slate-800'}">-${rentCost.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div class="p-2 bg-slate-50 rounded-lg flex justify-between items-center">
              <span class="text-slate-600">Talebe Bursları (${activeStudents.length} Talebe x ${s.currentYearStipend.toLocaleString('tr-TR')} ₺):</span>
              <span class="font-bold text-slate-800">-${monthlyStipendTotal.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div class="p-2 bg-slate-50 rounded-lg flex justify-between items-center">
              <span class="text-slate-600">Hoca Maaşları (Vakfa Kalan Net):</span>
              <span class="font-bold text-slate-800">-${(scholarsCost - sponsoredAmount).toLocaleString('tr-TR')} ₺</span>
            </div>
            <div class="p-2 bg-slate-50 rounded-lg flex justify-between items-center">
              <span class="text-slate-600">Personel Maaşları (İdare, Aşçı, Temizlik):</span>
              <span class="font-bold text-slate-800">-${staffCost.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div class="p-2 bg-slate-50 rounded-lg flex justify-between items-center">
              <span class="text-slate-600">Yurt Bakım, Mutfak ve İaşe:</span>
              <span class="font-bold text-slate-800">-${dormCost.toLocaleString('tr-TR')} ₺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ==================== SEKME 6: BİNALAR & TALEBE YURDU PAZARI ====================
function renderDormTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;

  const buildings = typeof INSTITUTION_BUILDINGS_DATA !== "undefined" ? INSTITUTION_BUILDINGS_DATA : [];
  const dorms = typeof DORM_BUILDINGS_DATA !== "undefined" ? DORM_BUILDINGS_DATA : [];

  const currentBldg = buildings.find(b => b.id === s.currentBuildingId) || buildings[0];
  const currentDorm = dorms.find(d => d.id === s.currentDormId) || dorms[0];

  let html = `
    <div class="space-y-6">
      <!-- Üst Başlık & Mevcut Mülk Özeti -->
      <div class="ottoman-card p-5 rounded-2xl border bg-gradient-to-r from-emerald-50/40 via-white to-amber-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
            <i data-lucide="landmark" class="text-emerald-800"></i>
            Kurum Binaları ve Talebe Yurtları Pazarı
          </h2>
          <p class="text-xs text-slate-600 mt-1">
            5 Seviye Kurum Binası ve 3 Seviye Yurt modeli mevcuttur. Seviyeler ilerledikçe kira 2 katına çıkar. Siyasi nüfuzlu hayırseverlerimizle 3, 4 ve 5. seviye binaları bedelsiz tahsis ettirebilirsiniz.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2 text-xs">
          <div class="p-3 bg-white rounded-xl border border-slate-200">
            <span class="text-slate-400 block text-[10px]">Mevcut Kurum Binası:</span>
            <span class="font-bold text-slate-900">${currentBldg ? currentBldg.name : 'Bina'}</span>
            <div class="text-[10px] ${s.isBuildingAllocated ? 'text-emerald-700 font-bold' : 'text-amber-800 font-bold'}">
              ${s.isBuildingAllocated ? '✓ Bedelsiz Tahsisli (0 ₺ Kira)' : `Kiralık (${s.monthlyRent.toLocaleString('tr-TR')} ₺/ay)`}
            </div>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200">
            <span class="text-slate-400 block text-[10px]">Talebe Yurdu Modeli:</span>
            <span class="font-bold text-slate-900">${currentDorm ? currentDorm.name : 'Yurt'}</span>
            <div class="text-[10px] text-emerald-800 font-semibold">
              ${s.dormStatus.occupancy} / ${currentDorm ? currentDorm.capacity : 35} Yatak Doluluğu
            </div>
          </div>
        </div>
      </div>

      <!-- UHUWVET & SOSYALLİK DÜZEYİ KARTI (YURT MÜDÜRÜ İSTİŞARE MASASI ERİŞİMİ DAHİL) -->
      <div class="ottoman-card p-4 rounded-2xl border bg-gradient-to-r from-teal-50 via-white to-emerald-50 border-teal-200">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xl">🤝</span>
              <h3 class="font-bold text-slate-900 text-sm font-amiri">Talebeler Arası Uhuvvet, Kaynaşma & Sosyallik Düzeyi</h3>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-900 border border-teal-300">
                %${s.socialCohesion || 55}
              </span>
            </div>
            <p class="text-xs text-slate-600">
              Yurdun genişliği, ortak çay ocakları, kütüphane tahlilleri ve düzenlenen sosyal etkinliklerle artar. Yüksek uhuvvet, arızaları ve disiplin hadiselerini belirgin derecede azaltır.
            </p>
          </div>

          <div class="flex items-center gap-2 w-full md:w-auto">
            <button onclick="openDormConsultationModal()" class="px-4 py-2.5 bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2 transition whitespace-nowrap">
              <i data-lucide="messages-square" class="w-4 h-4 text-teal-300"></i>
              🏛️ Yurt Müdürü İstişare & Büyük Tadilat Masası
            </button>
          </div>
        </div>

        <div class="mt-3 w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <div class="bg-gradient-to-r from-teal-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500" style="width: ${s.socialCohesion || 55}%"></div>
        </div>
      </div>

      <!-- AYLIK YURT HADİSELERİ, ARIZALAR & DİSİPLİN RAPORU PANELİ -->
      <div class="ottoman-card p-5 rounded-2xl border bg-white shadow-sm space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2 font-amiri">
              <i data-lucide="wrench" class="text-amber-600"></i>
              Yurt Hadiseleri, Arızalar ve Disiplin Raporu (Bu Ay)
            </h3>
            <p class="text-xs text-slate-500">
              Kazan patlaması, sıhhi aciller ve yüz kızartıcı fiiller. Kural ihlalleri anında öğrencinin şahsi dosyasına işlenir.
            </p>
          </div>
          <span class="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border">
            ${(s.monthlyDormIncidentsLog || []).length} Hadise Kaydedildi
          </span>
        </div>

        ${(!s.monthlyDormIncidentsLog || s.monthlyDormIncidentsLog.length === 0) ? `
          <div class="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed">
            Bu ay henüz kayda değer bir yurt arızası veya disiplin hadisesi yaşanmadı. Yurdun sükûneti devam ediyor.
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            ${s.monthlyDormIncidentsLog.map(inc => `
              <div class="p-3 rounded-xl border text-xs space-y-1 ${inc.isDisciplinary ? 'bg-red-50/50 border-red-200' : 'bg-slate-50 border-slate-200'}">
                <div class="flex justify-between items-start font-bold">
                  <span class="${inc.isDisciplinary ? 'text-red-900' : 'text-slate-800'} flex items-center gap-1">
                    <span>${inc.isDisciplinary ? '🚨' : '🔧'}</span>
                    ${inc.title}
                  </span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded font-mono ${inc.isDisciplinary ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-700'}">
                    ${inc.isDisciplinary ? 'Disiplin' : 'Teknik/Sıhhi'}
                  </span>
                </div>
                <p class="text-[11px] text-slate-600">${inc.desc}</p>
                <div class="text-[10px] text-slate-500 flex justify-between items-center pt-1 border-t border-slate-100">
                  <span>${inc.day} ${MONTH_NAMES[inc.monthIndex] || 'Bu Ay'}</span>
                  <span class="font-semibold ${inc.handled ? 'text-emerald-700' : 'text-amber-700'}">
                    ${inc.handled ? '✓ İdarece Müdahale Edildi' : '⏳ Takipte'}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- YURT GRUP STRES ETKİNLİKLERİ (AYDA EN FAZLA 4 KEZ!) -->
      <div class="ottoman-card p-5 rounded-2xl border bg-white shadow-sm space-y-3">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="smile" class="text-amber-600"></i>
              Yurt İçi Moral ve Stres Azaltma Etkinlikleri (Ayda Maks 4 Kez)
            </h3>
            <p class="text-xs text-slate-500">
              Etkinlikler belediye ve bakanlık bağlantılarımızla desteklenir.
            </p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold ${s.monthlyGroupEventsRemaining > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
            Bu Ay Kalan Etkinlik Hakkı: ${s.monthlyGroupEventsRemaining || 0} / 4
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button onclick="handleTriggerStressEvent('gezi')" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition text-xs flex flex-col justify-between">
            <div>
              <div class="font-bold text-slate-900 flex items-center gap-1.5">
                <i data-lucide="compass" class="text-emerald-700 w-4 h-4"></i> Bolu Narven Doğa Kampı
              </div>
              <p class="text-[11px] text-slate-500 mt-1">Bakanlık Gençlik Spor tahsisiyle ücretsiz kamp. Stres -25 puan azalır.</p>
            </div>
            <span class="mt-2 text-[10px] font-bold text-emerald-800">Ücretsiz (Bakanlık Protokolü)</span>
          </button>

          <button onclick="handleTriggerStressEvent('yemek')" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition text-xs flex flex-col justify-between">
            <div>
              <div class="font-bold text-slate-900 flex items-center gap-1.5">
                <i data-lucide="utensils" class="text-amber-700 w-4 h-4"></i> Boğaz'da Ziyafet Yemeği
              </div>
              <p class="text-[11px] text-slate-500 mt-1">Belediye sosyal tesislerinde balık ve kebap ziyafeti. Stres -18 puan düşer.</p>
            </div>
            <span class="mt-2 text-[10px] font-bold text-emerald-800">Ücretsiz (Belediye Kültür Fonu)</span>
          </button>

          <button onclick="handleTriggerStressEvent('cigkofte')" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition text-xs flex flex-col justify-between">
            <div>
              <div class="font-bold text-slate-900 flex items-center gap-1.5">
                <i data-lucide="coffee" class="text-amber-600 w-4 h-4"></i> Yurtta Çiğköfte & Maç Gecesi
              </div>
              <p class="text-[11px] text-slate-500 mt-1">Yemekhanede samimi çiğköfte ve maç yayını. Stres -12 puan azalır.</p>
            </div>
            <span class="mt-2 text-[10px] font-bold text-slate-800">2.000 ₺ (Vakıf Kasası)</span>
          </button>
        </div>
      </div>

      <!-- ==================== 5 SEVİYE KURUM BİNASI PAZARI ==================== -->
      <div class="ottoman-card p-5 rounded-2xl border bg-white shadow-sm space-y-4">
        <div>
          <h3 class="font-bold text-slate-900 text-sm md:text-base font-amiri flex items-center gap-2">
            <i data-lucide="building-2" class="text-emerald-700"></i>
            5 Seviye Kurum Hizmet Binası Pazarı
          </h3>
          <p class="text-xs text-slate-500">
            Seviye 1: Kiralık Eski Bina | Seviye 2: Kiralık Yeni Bina (Ücret 2 katı) | Seviye 3: Tahsis/Kiralık | Seviye 4: FETÖ Müsadereli Külliye | Seviye 5: Tarihi Medrese (YALNIZCA TAHSİS İLE)
          </p>
        </div>

        <div class="space-y-6">
          ${[1, 2, 3, 4, 5].map(lvl => {
            const lvlBldgs = buildings.filter(b => b.level === lvl);
            let lvlTitle = "";
            let lvlDesc = "";
            if (lvl === 1) { lvlTitle = "1. Seviye: Kiralık Eski Bina (Deprem Riski Olan)"; lvlDesc = "Beyoğlu, Küçükçekmece, Pendik, Fatih (Fatih bi tık daha pahalı)"; }
            else if (lvl === 2) { lvlTitle = "2. Seviye: Kiralık Yeni Bina (Ücret 2 Katına Çıkar)"; lvlDesc = "Ümraniye, Beykoz, Sarıyer, Üsküdar (Üsküdar bi tık daha pahalı)"; }
            else if (lvl === 3) { lvlTitle = "3. Seviye: Tahsis Edilmiş / Kiralık Bina"; lvlDesc = "Şişli, Kartal, Maltepe, Fatih (Siyasi güç 3+ hayırseverden tahsis istenebilir, kira: 0 ₺)"; }
            else if (lvl === 4) { lvlTitle = "4. Seviye: Devletin FETÖ'den Çöktüğü Modern Teçhizatlı Külliye"; lvlDesc = "Başakşehir, Silivri, Bağcılar, Beşiktaş (Siyasi güç 4+ hayırseverden tahsis istenebilir)"; }
            else if (lvl === 5) { lvlTitle = "5. Seviye: Tarihi Medrese ve Külliyesi (Zirve Mekanlar - YALNIZCA TAHSİS)"; lvlDesc = "Fatih Sahn-ı Semân, Süleymaniye, Valide-i Atik, Sultanahmet, Ayasofya (En prestijlisi)"; }

            return `
              <div class="space-y-2">
                <div class="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-800 flex justify-between items-center border border-slate-200">
                  <span>${lvlTitle}</span>
                  <span class="text-[11px] text-slate-500 font-normal">${lvlDesc}</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  ${lvlBldgs.map(bldg => {
                    const isCurrent = s.currentBuildingId === bldg.id;
                    // Bu binayı tahsis ettirebilecek hayırseverler (politicalPower kuralı)
                    const eligibleDonors = s.donors.filter(d => (d.politicalPower || 1) >= (bldg.minDonorPoliticalPower || 3) && s.reputation >= (d.minReputationRequired || 30));

                    return `
                      <div class="p-3.5 rounded-xl border flex flex-col justify-between ${isCurrent ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-300' : 'bg-white border-slate-200'} text-xs">
                        <div>
                          <div class="flex justify-between items-start">
                            <span class="px-2 py-0.5 rounded text-[9px] font-bold ${bldg.level === 5 ? 'bg-purple-100 text-purple-900 border border-purple-300' : (bldg.level >= 3 ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-700')}">
                              Seviye ${bldg.level} • ${bldg.location}
                            </span>
                            ${bldg.reputationBonus ? `<span class="text-[10px] font-bold text-amber-700">+${bldg.reputationBonus} İtibar</span>` : ''}
                          </div>

                          <h4 class="font-bold text-slate-900 text-xs mt-2">${bldg.name}</h4>
                          <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">${bldg.description}</p>
                          <div class="text-[10px] text-slate-400 mt-2 font-mono">${bldg.capacityDescription}</div>
                          ${bldg.earthquakeRisk ? `<div class="text-[10px] text-red-600 mt-1">⚠️ ${bldg.earthquakeRisk}</div>` : ''}
                        </div>

                        <div class="mt-4 pt-2.5 border-t border-slate-100 space-y-2">
                          <div class="flex justify-between items-center text-[11px]">
                            <span class="text-slate-500">Kira Bedeli:</span>
                            <span class="font-bold ${bldg.monthlyRent === 0 ? 'text-emerald-700' : 'text-slate-800'}">
                              ${bldg.monthlyRent === 0 ? '0 ₺ (Yalnızca Tahsis)' : bldg.monthlyRent.toLocaleString('tr-TR') + ' ₺/ay'}
                            </span>
                          </div>

                          ${isCurrent ? `
                            <div class="w-full py-1.5 bg-emerald-700 text-white font-bold text-center rounded-lg text-[10px]">
                              ✓ Mevcut Kurum Binanız ${s.isBuildingAllocated ? '(Tahsisli)' : '(Kiralık)'}
                            </div>
                          ` : `
                            <div class="space-y-1.5">
                              ${bldg.type !== 'yalnizca_tahsis' ? `
                                <button onclick="handleRentBuilding('${bldg.id}')" class="w-full py-1 bg-slate-800 hover:bg-slate-900 text-white rounded font-bold text-[10px] transition">
                                  Kira ile Tut (${bldg.monthlyRent.toLocaleString('tr-TR')} ₺/ay)
                                </button>
                              ` : ''}

                              ${bldg.canBeAllocated ? `
                                <div class="space-y-1 pt-1 border-t border-slate-100">
                                  <label class="block text-[9px] text-slate-500 font-bold uppercase">Tahsis Talep Edilecek Hayırsever:</label>
                                  ${eligibleDonors.length > 0 ? `
                                    <div class="flex items-center gap-1">
                                      <select id="sel_alloc_${bldg.id}" class="text-[10px] p-1 border border-slate-300 rounded bg-white flex-1">
                                        ${eligibleDonors.map(d => `<option value="${d.id}">${d.name} (Güç: ${d.politicalPower}/5, Güven: %${d.trustScore})</option>`).join('')}
                                      </select>
                                      <button onclick="handleAllocateBuilding('${bldg.id}')" class="px-2 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded text-[10px] font-bold" title="Lobi yaparak bedelsiz tahsis çıkart">
                                        Tahsis İste
                                      </button>
                                    </div>
                                  ` : `
                                    <div class="text-[10px] text-amber-800 italic">
                                      Bu binayı tahsis ettirecek güçte (${bldg.minDonorPoliticalPower}+ güç) hayırsever meclisinizde henüz yok.
                                    </div>
                                  `}
                                </div>
                              ` : ''}
                            </div>
                          `}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- ==================== 3 SEVİYE TALEBE YURDU BİNASI PAZARI ==================== -->
      <div class="ottoman-card p-5 rounded-2xl border bg-white shadow-sm space-y-4">
        <div>
          <h3 class="font-bold text-slate-900 text-sm md:text-base font-amiri flex items-center gap-2">
            <i data-lucide="home" class="text-blue-700"></i>
            3 Seviye Talebe Yurdu Kapasite Pazarı
          </h3>
          <p class="text-xs text-slate-500">
            Seviye arttıkça yatak kapasitesi ve bakım/kira gideri 2 katına çıkar.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${dorms.map(dorm => {
            const isCurrent = s.currentDormId === dorm.id;
            return `
              <div class="p-4 rounded-xl border flex flex-col justify-between ${isCurrent ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-300' : 'bg-white border-slate-200'} text-xs">
                <div>
                  <div class="flex justify-between items-start">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                      Seviye ${dorm.level} • ${dorm.capacity} Yatak
                    </span>
                    <span class="font-bold text-slate-800">${dorm.monthlyCost.toLocaleString('tr-TR')} ₺/ay</span>
                  </div>

                  <h4 class="font-bold text-slate-900 text-sm mt-2">${dorm.name}</h4>
                  <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">${dorm.description}</p>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100">
                  ${isCurrent ? `
                    <div class="w-full py-1.5 bg-blue-700 text-white font-bold text-center rounded-lg text-[10px]">
                      ✓ Mevcut Yurdunuz (${dorm.capacity} Yatak)
                    </div>
                  ` : `
                    <button onclick="handleUpgradeDorm('${dorm.id}')" class="w-full py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-[10px] transition">
                      Bu Yurt Modeline Geç (${dorm.capacity} Yatak)
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function handleRentBuilding(buildingId) {
  const res = game.rentBuilding(buildingId);
  alert(res.message);
  renderAll();
}

function handleAllocateBuilding(buildingId) {
  const sel = document.getElementById(`sel_alloc_${buildingId}`);
  if (!sel) return;
  const donorId = parseInt(sel.value);
  const res = game.allocateBuilding(buildingId, donorId);
  alert(res.message);
  renderAll();
}

function handleUpgradeDorm(dormId) {
  const res = game.upgradeDorm(dormId);
  alert(res.message);
  renderAll();
}

function handleTriggerStressEvent(type) {
  const res = game.triggerDirectStressEvent(type);
  alert(res.message);
  renderAll();
}

// ==================== YURT MÜDÜRÜ İSTİŞARE VE BÜYÜK TADİLAT MODALI ====================
function openDormConsultationModal() {
  const modal = document.getElementById("dormConsultationModal");
  if (!modal) return;
  modal.classList.remove("hidden");

  const s = game.state;
  const content = document.getElementById("dormConsultationContent");
  if (!content) return;

  const proposal = s.currentDormMaintenanceProposal;
  const isFemale = s.genderMode === "female";
  const mgr = s.dormManager || { name: (isFemale ? "Zehra Hanım" : "Süleyman Bey"), title: "Yurt Müdürü" };

  content.innerHTML = `
    <div class="space-y-4">
      <div class="border-b border-slate-100 pb-3 flex justify-between items-start">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-teal-800">İdare & Yurt Güvenlik Heyeti</span>
          <h3 class="text-base font-bold text-slate-900 font-amiri flex items-center gap-2">
            <span>🏛️ Yurt Müdürü İstişare & Büyük Tadilat Masası</span>
          </h3>
        </div>
        <button onclick="closeDormConsultationModal()" class="text-slate-400 hover:text-slate-600 p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Yurt Müdürü Kartı & Performansı -->
      <div class="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
        <div>
          <span class="text-[10px] text-teal-800 font-bold uppercase block">Vazifeli İdareci:</span>
          <strong class="text-sm text-slate-900 font-amiri">${mgr.name}</strong>
          <div class="text-[11px] text-slate-600 mt-0.5">Yurt Nizamı, Talebe Teftişi ve Sıhhi İntizam Sorumlusu</div>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="handleEvaluateDormManager('praise')" class="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow transition flex items-center gap-1">
            <i data-lucide="award" class="w-3.5 h-3.5"></i>
            Takdir Belgesi (+Moral)
          </button>
          <button onclick="handleEvaluateDormManager('warn')" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow transition flex items-center gap-1">
            <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
            Uslûp Uyarısı / İhtar
          </button>
        </div>
      </div>

      <!-- Büyük Tadilat Talebi -->
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
        <div class="flex justify-between items-start">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-700">Aylık İstişare & Yatırım Talebi:</span>
            <h4 class="font-bold text-sm text-slate-900 mt-1">${proposal ? proposal.title : 'Kapsamlı Yurt İyileştirme Paketi'}</h4>
          </div>
          <span class="px-2.5 py-1 rounded-xl font-bold bg-amber-100 text-amber-900 border border-amber-300 text-xs">
            Bütçe Talebi: ${(proposal ? proposal.cost : 45000).toLocaleString('tr-TR')} ₺
          </span>
        </div>

        <p class="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
          ${proposal ? proposal.desc : 'Yurdun sıcak su tesisatı, kütüphane etüt salonu yalıtımı ve ortak alan mobilyalarının yenilenmesi talebidir.'}
        </p>

        <div class="grid grid-cols-2 gap-2 text-[11px]">
          <div class="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
            <strong>🤝 Uhuvvet & Sosyallik:</strong> +${proposal ? proposal.cohesionGain : 10} Puan Artar
          </div>
          <div class="p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
            <strong>🛡️ Arıza Riski:</strong> Gelecek 2 ay arıza ve olay ihtimali %50 düşer
          </div>
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button onclick="closeDormConsultationModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition">
            Daha Sonra
          </button>
          <button onclick="handleApproveDormProposal('${proposal ? proposal.id : ''}')" class="px-4 py-2 bg-gradient-to-r from-teal-700 to-emerald-800 hover:from-teal-800 hover:to-emerald-900 text-white rounded-xl font-bold text-xs shadow transition flex items-center gap-1.5">
            <i data-lucide="check-check" class="w-4 h-4"></i>
            Tadilat Bütçesini Onayla (${(proposal ? proposal.cost : 45000).toLocaleString('tr-TR')} ₺)
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function closeDormConsultationModal() {
  const modal = document.getElementById("dormConsultationModal");
  if (modal) modal.classList.add("hidden");
}

function handleApproveDormProposal(proposalId) {
  const res = game.approveDormMaintenanceProposal(proposalId);
  alert(res.message);
  closeDormConsultationModal();
  renderAll();
}

function handleEvaluateDormManager(type) {
  const res = game.evaluateDormManager(type);
  alert(res.message);
  renderAll();
}

// ==================== SEKME 7: 40 HAYIRSEVERLER MECLİSİ ====================
function renderDonorsTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;

  const canAction = game.canPerformDonorAction();
  const totalMonths = (s.academicYear * 12) + s.currentMonthIndex;
  const monthsSinceDinner = totalMonths - s.lastDonationDinnerTotalMonths;
  const dinnerAvailable = monthsSinceDinner >= 5;

  let html = `
    <div class="space-y-6">
      <div class="ottoman-card p-5 rounded-2xl border bg-gradient-to-r from-emerald-50/40 via-white to-amber-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
            <i data-lucide="handshake" class="text-emerald-800"></i>
            Vakıf Meclisi ve 40 Hayırsever Portföyü
          </h2>
          <p class="text-xs text-slate-600 mt-1">
            Büyük sanayiciler, holding sahipleri ve hayırsever tüccarlar. Hoca kürsüsü sponsorlukları, kamu tahsisleri ve yüklü burs bağışları sağlarlar.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <!-- BÜYÜK BAĞIŞ YEMEĞİ BUTONU (5 AYDA BİR, 500k-1.5M ₺ NAKİT) -->
          <button onclick="handleHoldDonationDinner()" class="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2 ${!dinnerAvailable || !canAction ? 'opacity-50 cursor-not-allowed' : ''}">
            <i data-lucide="utensils"></i>
            Büyük Bağış Yemeği Tertiple (${dinnerAvailable ? '500k-1.5M ₺ Getiri' : `${5 - monthsSinceDinner} Ay Beklenmeli`})
          </button>
        </div>
      </div>

      <!-- Aylık Birebir Etkileşim Kısıt Bildirimi -->
      <div class="p-3.5 rounded-xl border ${canAction ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-300 text-slate-600'} text-xs flex justify-between items-center">
        <span>
          ${canAction ? 
            '✓ <strong>Buluşma Hakkı Açık:</strong> Bu ay 1 hayırseverimizle özel akşam yemeği veya kurum ziyareti icra edebilirsiniz.' : 
            '⏳ <strong>Aylık Etkileşim Tamamlandı:</strong> Bu ayki hayırsever etkileşim hakkınızı (ayda 1 kez) kullandınız. Yeni buluşma önümüzdeki ay açılacaktır.'}
        </span>
        <span class="text-[10px] text-slate-500 font-semibold">Kural: Ayda 1 birleşik faaliyet</span>
      </div>

      <!-- Hayırseverler Kartları -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${s.donors.map(donor => {
          const isUnlocked = s.reputation >= (donor.minReputationRequired || 30);
          return `
            <div class="ottoman-card p-4 rounded-xl border flex flex-col justify-between ${isUnlocked ? 'bg-white' : 'bg-slate-50 border-slate-200 opacity-60'}">
              <div>
                <div class="flex justify-between items-start">
                  <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Siyasi Güç: ${donor.politicalPower || 1}/5 • Servet: ${donor.wealth}
                    </span>
                    <h4 class="font-bold text-slate-900 text-sm mt-1">${donor.name}</h4>
                    <div class="text-[11px] text-slate-500">${donor.title}</div>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold ${donor.trustScore >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                    Güven: %${donor.trustScore}
                  </span>
                </div>

                <p class="text-[11px] text-slate-600 mt-2.5 leading-relaxed">${donor.description}</p>
                <div class="text-[10px] text-slate-400 mt-2">İlgi: ${donor.primaryInterest}</div>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 space-y-2">
                ${isUnlocked ? `
                  <div class="grid grid-cols-2 gap-1.5 text-xs">
                    <button onclick="handleInviteDonorToDinner(${donor.id})" class="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-semibold transition" title="Akşam yemeğinde güven tazele (8.000 ₺)">
                      Özel Akşam Yemeği
                    </button>
                    <button onclick="handleShowStudentsToDonor(${donor.id})" class="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-semibold transition" title="Talebelerin sabah müzakeresini izlet">
                      Talebeleri Göster
                    </button>
                  </div>

                  <div class="flex items-center gap-1 text-xs pt-1">
                    <select id="sel_req_${donor.id}" class="text-[10px] p-1 border border-slate-300 rounded bg-white flex-1">
                      <option value="burs">Burs Desteği Talep Et</option>
                      <option value="hocaKursusu">Hoca Kürsüsü Sponsorluğu (28k/ay)</option>
                      <option value="kutuphane">Kütüphane & Eser Hibesi</option>
                      <option value="kamuTahsisi">Bakanlık Proje Desteği</option>
                    </select>
                    <button onclick="handleRequestFromDonor(${donor.id})" class="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[10px] font-bold">
                      İste
                    </button>
                  </div>
                ` : `
                  <div class="text-[10px] text-slate-400 font-semibold italic flex items-center gap-1">
                    <i data-lucide="lock" class="w-3 h-3"></i> Kurum İtibarı Asgari ${donor.minReputationRequired} Olmalı
                  </div>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function handleHoldDonationDinner() {
  const res = game.holdMonthlyDonationDinner();
  alert(res.message);
  renderAll();
}

function handleInviteDonorToDinner(donorId) {
  const res = game.inviteDonorToDinner(donorId);
  alert(res.message);
  renderAll();
}

function handleShowStudentsToDonor(donorId) {
  const res = game.showStudentsToDonor(donorId);
  alert(res.message);
  renderAll();
}

function handleRequestFromDonor(donorId) {
  const sel = document.getElementById(`sel_req_${donorId}`);
  if (!sel) return;
  const res = game.requestFromDonor(donorId, sel.value);
  alert(res.message);
  renderAll();
}

// ==================== SEKME 8: KARDEŞ KURUMLAR REKABETİ ====================
function renderPeersTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;
  const peers = s.peerInstitutions;

  let html = `
    <div class="space-y-6">
      <div class="ottoman-card p-5 rounded-2xl border bg-gradient-to-r from-emerald-50/40 via-white to-amber-50/30">
        <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
          <i data-lucide="scale" class="text-emerald-800"></i>
          Kardeş Kurumlar ve Dinamik Hizmet Rekabeti
        </h2>
        <p class="text-xs text-slate-600 mt-1">
          İSAR ve İSM zirve referans kurumlarımızdır. Yavuz Selim Vakfı, Medrese-i Âliyye ve Dârü'l-Hikme bizim seviyemizde başlamış olup yıllık tatlı bir hizmet rekabeti yürütülmektedir.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Bizim Kurumumuz -->
        <div class="ottoman-card p-5 rounded-2xl border border-emerald-400 bg-emerald-50/20">
          <div class="flex justify-between items-start">
            <div>
              <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-800 text-white">Bizim Kurumumuz</span>
              <h3 class="text-lg font-bold font-amiri text-slate-900 mt-1">${s.institutionName}</h3>
            </div>
            <div class="text-right">
              <span class="text-xs text-slate-400">İtibar Puanı</span>
              <div class="text-xl font-bold text-emerald-800">${s.reputation} / 100</div>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div class="p-2 bg-white rounded border"><span class="text-slate-400 block text-[10px]">Fıkıh:</span> <strong>${s.branchScores.fıkıh}</strong></div>
            <div class="p-2 bg-white rounded border"><span class="text-slate-400 block text-[10px]">Hadis-Tefsir:</span> <strong>${s.branchScores.hadisTefsir}</strong></div>
            <div class="p-2 bg-white rounded border"><span class="text-slate-400 block text-[10px]">Kelam-Mantık:</span> <strong>${s.branchScores.kelamFelsefe}</strong></div>
            <div class="p-2 bg-white rounded border"><span class="text-slate-400 block text-[10px]">Sosyal Bilimler:</span> <strong>${s.branchScores.sosyalBilimler}</strong></div>
            <div class="p-2 bg-white rounded border"><span class="text-slate-400 block text-[10px]">Arapça:</span> <strong>${s.branchScores.arapcaDil}</strong></div>
            <div class="p-2 bg-white rounded border"><span class="text-slate-400 block text-[10px]">Sanat:</span> <strong>${s.branchScores.sanatKultur}</strong></div>
          </div>
        </div>

        <!-- Diğer Kurumlar -->
        ${peers.map(peer => `
          <div class="ottoman-card p-5 rounded-2xl border bg-white flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${peer.location}</span>
                  <h3 class="text-base font-bold font-amiri text-slate-900 mt-0.5">${peer.name}</h3>
                  <div class="text-xs text-slate-500 italic mt-0.5">"${peer.motto}"</div>
                </div>
                <div class="text-right">
                  <span class="text-xs text-slate-400">İtibar</span>
                  <div class="text-lg font-bold ${peer.reputation >= 85 ? 'text-purple-800' : 'text-slate-800'}">${peer.reputation} / 100</div>
                </div>
              </div>

              <div class="mt-3 grid grid-cols-3 gap-1.5 text-xs">
                <div class="p-1.5 bg-slate-50 rounded text-center"><span class="text-slate-400 text-[10px]">Fıkıh:</span> ${peer.branchScores.fıkıh}</div>
                <div class="p-1.5 bg-slate-50 rounded text-center"><span class="text-slate-400 text-[10px]">Hadis:</span> ${peer.branchScores.hadisTefsir}</div>
                <div class="p-1.5 bg-slate-50 rounded text-center"><span class="text-slate-400 text-[10px]">Kelam:</span> ${peer.branchScores.kelamFelsefe}</div>
                <div class="p-1.5 bg-slate-50 rounded text-center"><span class="text-slate-400 text-[10px]">Sosyal:</span> ${peer.branchScores.sosyalBilimler}</div>
                <div class="p-1.5 bg-slate-50 rounded text-center"><span class="text-slate-400 text-[10px]">Arapça:</span> ${peer.branchScores.arapcaDil}</div>
                <div class="p-1.5 bg-slate-50 rounded text-center"><span class="text-slate-400 text-[10px]">Sanat:</span> ${peer.branchScores.sanatKultur}</div>
              </div>
            </div>

            <div class="mt-4 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
              Son Gelişme: <em>${peer.recentAchievement}</em>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ==================== SEKME 9: İSTATİSTİKLER ====================
function renderStatsTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;

  const active = s.students.filter(st => st.status === "active");
  const avgSatisfaction = game.getAverageSatisfaction();
  const avgStress = game.getAverageStress();

  let html = `
    <div class="space-y-6">
      <div class="ottoman-card p-5 rounded-2xl border bg-white">
        <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
          <i data-lucide="bar-chart-3" class="text-emerald-800"></i>
          Kurumsal Performans ve Tedrisat İstatistikleri
        </h2>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div class="p-4 bg-slate-50 rounded-xl border">
            <span class="text-slate-400 block text-[10px]">Genel Talebe Memnuniyeti:</span>
            <div class="text-xl font-bold text-emerald-700 mt-1">%${avgSatisfaction}</div>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border">
            <span class="text-slate-400 block text-[10px]">Ortalama Talebe Stresi:</span>
            <div class="text-xl font-bold ${avgStress > 55 ? 'text-red-600' : 'text-slate-800'} mt-1">%${avgStress}</div>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border">
            <span class="text-slate-400 block text-[10px]">Akademik İtibar:</span>
            <div class="text-xl font-bold text-amber-700 mt-1">${s.reputation} / 100</div>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border">
            <span class="text-slate-400 block text-[10px]">Yıllık Mezun Sayısı:</span>
            <div class="text-xl font-bold text-slate-800 mt-1">${s.graduates.length} Mezun</div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ==================== SEKME 10: MEZUNLAR & RAPORLAR ====================
function renderGraduatesTab() {
  const container = document.getElementById("tabContentContainer");
  const s = game.state;

  let html = `
    <div class="space-y-6">
      <div class="ottoman-card p-5 rounded-2xl border bg-white">
        <h2 class="text-xl font-bold text-slate-800 font-amiri flex items-center gap-2">
          <i data-lucide="scroll" class="text-emerald-800"></i>
          Mezunlar Meclisi ve 10 Yıllık Takip
        </h2>
        <p class="text-xs text-slate-600 mt-1">
          İcazet alan talebelerimizin akademi, Diyanet, düşünce kuruluşları ve bürokrasideki vazifeleri.
        </p>
      </div>

      ${s.graduates.length === 0 ? `
        <div class="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border">
          Kurumumuz henüz mezun vermedi. 5 yıllık tedrisat döngüsü tamamlandığında mezunlarımızın kariyer takibi burada listelenecektir.
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${s.graduates.map(g => `
            <div class="p-4 bg-white rounded-xl border text-xs space-y-2">
              <div class="flex justify-between items-start font-bold text-slate-900">
                <span>${g.fullName}</span>
                <span class="text-emerald-800">${g.graduationYear}. Yıl Mezunu</span>
              </div>
              <div class="text-[11px] text-slate-600">${g.career ? g.career.currentTitle : 'Araştırmacı'}</div>
              <p class="text-slate-500 italic">${g.career ? g.career.roleDescription : ''}</p>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;

  container.innerHTML = html;
}

// ==================== MODALLAR ====================

// Mülakat Odası Modalı
function openInterviewModalForCandidate(candId) {
  const cand = game.state.candidatesPool.find(c => c.id === candId);
  if (!cand) return;

  const modal = document.getElementById("interviewModal");
  modal.classList.remove("hidden");

  document.getElementById("candName").innerText = cand.fullName;
  document.getElementById("candCitySchool").innerText = `${cand.highSchool} (${cand.city})`;
  document.getElementById("candFamily").innerText = `${cand.familyJob} (${cand.familyIncome})`;
  document.getElementById("candYks").innerText = `${cand.yksArea} Alanı — Derece: #${cand.yksRank}`;
  document.getElementById("candGano").innerText = `${cand.faculty} — ${cand.university}`;

  const qList = document.getElementById("interviewQuestionsList");
  qList.innerHTML = cand.interviewAnswers.map(ans => `
    <div class="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
      <div class="font-bold text-slate-800">${ans.question}</div>
      <div class="text-slate-600 italic">Cevap: ${ans.answer}</div>
    </div>
  `).join('');

  window.currentSelectedCandidateId = candId;
}

function closeInterviewModal() {
  document.getElementById("interviewModal").classList.add("hidden");
}

function handleAcceptCandidate(track = "standart") {
  if (!window.currentSelectedCandidateId) return;
  const res = game.admitCandidate(window.currentSelectedCandidateId, track);
  if (!res.success) alert(res.message);
  closeInterviewModal();
  renderAll();
}

function handleRejectCandidate() {
  if (!window.currentSelectedCandidateId) return;
  handleDirectReject(window.currentSelectedCandidateId);
  closeInterviewModal();
}

// Birebir Talebe Hasbihal Modalı (Önerilen Yüksek Stres Rozeti ile)
function showStudentAppointmentModal() {
  const modal = document.getElementById("studentAppointmentModal");
  if (!modal) return;
  modal.classList.remove("hidden");

  const content = document.getElementById("studentAppointmentContent");
  const active = game.state.students.filter(s => s.status === "active");

  content.innerHTML = `
    <div class="space-y-4">
      <div class="border-b border-slate-100 pb-2 flex justify-between items-center">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-blue-800">10 Günlük İstişare Meclisi</span>
          <h3 class="text-lg font-bold text-slate-900 font-amiri">Talebe ile Birebir Hasbihal</h3>
        </div>
        <button onclick="closeStudentAppointmentModal()" class="text-slate-400 hover:text-slate-600">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <p class="text-xs text-slate-600 leading-relaxed">
        Her ayın 10, 20 ve 30. günlerinde talebelerinizle odanızda baş başa görüşerek dertlerini dinleyebilir, manevi ve akademik destek verebilirsiniz.
      </p>

      ${game.state.monthlyStudentAppointmentsRemaining <= 0 ? `
        <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
          Bu ayki birebir görüşme kontenjanınız tamamlandı. Önümüzdeki ayın 10'unda yeni randevular açılacaktır.
        </div>
      ` : `
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Görüşülecek Talebe:</label>
            <select id="sel_hasbihal_student" class="w-full p-2 border border-slate-300 rounded-xl text-xs bg-white">
              ${active.map(st => `
                <option value="${st.id}">
                  ${st.fullName} (${st.currentClassYear === 0 ? 'Hazırlık' : st.currentClassYear + '. Sınıf'}) — Stres: %${st.stressLevel} ${st.stressLevel > 55 ? '⭐ [Önerilen: Yüksek Stres]' : ''} — ${st.weakness || 'Dengeli'}
                </option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Hasbihal ve Rehberlik Konusu:</label>
            <select id="sel_hasbihal_topic" class="w-full p-2 border border-slate-300 rounded-xl text-xs bg-white">
              <option value="manevi">Manevi İrşad ve İhlas Tazelemesi (Stres Azalır, Memnuniyet Artar)</option>
              <option value="akademik">Arapça & Metin Mütalaa Usulü Rehberliği (Yetkinlik +5)</option>
              <option value="izin">Sıla-i Rahim & Hafta Sonu Aile İzni (Stres Ciddi Oranda Düşer)</option>
              <option value="oda">Yurt Odası ve Akran Uyuşmazlığı Arabuluculuğu</option>
            </select>
          </div>

          <button onclick="handleConfirmAppointment()" class="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition">
            Hasbihali Gerçekleştir
          </button>
        </div>
      `}
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function closeStudentAppointmentModal() {
  document.getElementById("studentAppointmentModal").classList.add("hidden");
}

function handleConfirmAppointment() {
  const stSelect = document.getElementById("sel_hasbihal_student");
  const topSelect = document.getElementById("sel_hasbihal_topic");
  if (!stSelect || !topSelect) return;

  const res = game.conductStudentAppointment(stSelect.value, topSelect.value);
  alert(res.message);
  closeStudentAppointmentModal();
  renderAll();
}

// ==================== TALEBE DOSYASI MODALI (5 KATEGORİLİ) ====================
function showStudentDetailModal(studentId) {
  activeDetailStudentId = studentId;
  const st = game.state.students.find(s => s.id === studentId);
  if (!st) return;

  const modal = document.getElementById("studentDetailModal");
  if (!modal) return;
  modal.classList.remove("hidden");

  renderStudentDetailContent(st);
}

function renderStudentDetailContent(st) {
  const content = document.getElementById("studentDetailContent");
  if (!content) return;

  const isIhtisas = st.track === "ihtisas" || st.track === "ihtisas_ileri";
  const tabs = [
    { key: "identity", label: "🏛️ Hüviyet", icon: "user" },
    { key: "grades", label: "📖 Ders & İhtisas", icon: "graduation-cap" },
    { key: "character", label: "👤 Karakter & Zaaf", icon: "heart" },
    { key: "discipline", label: "⚖️ Yurt & Sicil", icon: "shield-alert" },
    { key: "reports", label: "📊 Aylık Raporlar", icon: "clipboard-list" }
  ];

  let bodyHtml = "";

  // 1. KATEGORİ: HÜVİYET & MÜLAKAT ARKA PLANI
  if (studentDetailActiveTab === "identity") {
    bodyHtml = `
      <div class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Adı Soyadı:</span>
            <strong class="text-sm text-slate-900 font-amiri">${st.fullName}</strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Kayıtlı Fakülte:</span>
            <strong class="text-emerald-900 font-semibold">${st.faculty}</strong>
            <div class="text-[10px] text-slate-500">${st.university}</div>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Mezun Olduğu Lise:</span>
            <span class="text-slate-800 font-medium">${st.highSchool || 'İstanbul Anadolu İHL'} (${st.city || 'İstanbul'})</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">YKS Başarısı:</span>
            <span class="px-2 py-0.5 rounded font-bold ${st.yksArea === 'SÖZ' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'}">
              ${st.yksArea || 'SÖZ'}: #${(st.yksRank || 1500).toLocaleString('tr-TR')}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
          <div>
            <span class="text-[10px] text-emerald-800 font-bold uppercase block">İlim İstidadı:</span>
            <strong class="text-base text-emerald-900">${st.talent} / 100</strong>
          </div>
          <div>
            <span class="text-[10px] text-emerald-800 font-bold uppercase block">Kayıt Yılı & Sınıf:</span>
            <strong class="text-slate-800">${st.enrollmentYear}. Yıl • ${st.currentClassYear === 0 ? 'Hazırlık' : st.currentClassYear + '. Sınıf'}</strong>
          </div>
          <div>
            <span class="text-[10px] text-emerald-800 font-bold uppercase block">Tedrisat Halkası:</span>
            <span class="inline-block px-2 py-0.5 rounded font-bold ${isIhtisas ? 'bg-purple-100 text-purple-900' : 'bg-slate-200 text-slate-800'}">
              ${isIhtisas ? '🌟 İhtisas' : '📘 Normal'}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // 2. KATEGORİ: DERS BAŞARISI & 4. SINIF ALAN SEÇİMİ
  else if (studentDetailActiveTab === "grades") {
    bodyHtml = `
      <div class="space-y-4 text-xs">
        <div class="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">
              ${st.currentClassYear === 0 ? 'Hazırlık Sınav Puanı:' : 'Üniversite GANO:'}
            </span>
            <strong class="text-base ${st.currentClassYear === 0 ? 'text-indigo-800' : (st.gano && st.gano < 2.50 ? 'text-red-600' : 'text-emerald-800')}">
              ${st.currentClassYear === 0 ? `${st.internalScore} / 100` : (st.gano ? st.gano.toFixed(2) : '3.15')}
            </strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Tedrisat Not Ortalaması:</span>
            <strong class="text-base text-slate-900">${st.internalScore} / 100</strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Akademik Yetkinlik:</span>
            <strong class="text-base text-emerald-700">${st.academicCompetence} Puan</strong>
          </div>
        </div>

        <!-- 4. SINIF İHTİSAS ALANI VE 2 SAATLİK METİN TAHLİLİ SEÇİMİ -->
        <div class="p-4 rounded-2xl border ${st.currentClassYear >= 4 ? 'bg-purple-50/70 border-purple-300' : 'bg-slate-50 border-slate-200'} space-y-2">
          <div class="flex justify-between items-center">
            <h4 class="font-bold text-slate-900 text-xs flex items-center gap-1.5 font-amiri">
              <i data-lucide="compass" class="text-purple-700 w-4 h-4"></i>
              4. Sınıf İhtisas Alanı & Özel Metin Tahlili (ALAN-501)
            </h4>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${st.currentClassYear >= 4 ? 'bg-purple-200 text-purple-900' : 'bg-slate-200 text-slate-600'}">
              ${st.currentClassYear >= 4 ? '4. Sınıf İhtisas Düzeyi' : 'Henüz 4. Sınıfta Değil'}
            </span>
          </div>

          <p class="text-[11px] text-slate-600 leading-relaxed">
            4. sınıfa geçen talebeler uzmanlaşacakları ilim sahasını belirler. Seçilen alana göre öğrencinin haftalık ders programına <strong>2 saatlik "Alan Okuma & Metin Tahlili" (ALAN-501)</strong> semineri otomatik eklenir.
          </p>

          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <select id="studentFieldChoice" class="flex-1 px-3 py-2 rounded-xl border border-purple-300 text-xs bg-white focus:outline-none">
              <option value="Fıkıh ve Usul" ${(st.specializationField === 'Fıkıh ve Usul' || st.primaryField === 'fıkıh') ? 'selected' : ''}>Fıkıh ve Usûl-i Fıkıh (el-Hidâye & Telvîh)</option>
              <option value="Hadis ve Tefsir" ${(st.specializationField === 'Hadis ve Tefsir' || st.primaryField === 'hadis' || st.primaryField === 'tefsir') ? 'selected' : ''}>Hadis ve Tefsir (Buhârî Şerhleri & Beyzâvî)</option>
              <option value="Kelam ve Mantık" ${(st.specializationField === 'Kelam ve Mantık' || st.primaryField === 'kelam') ? 'selected' : ''}>Kelam ve Hikmet (Mevâkıf & Tehâfüt)</option>
              <option value="Sosyal Bilimler" ${(st.specializationField === 'Sosyal Bilimler' || st.primaryField === 'sosyal') ? 'selected' : ''}>Sosyal Bilimler & Medeniyet (İbn Haldun & Umran)</option>
              <option value="Klasik Arapça" ${(st.specializationField === 'Klasik Arapça' || st.primaryField === 'arapça') ? 'selected' : ''}>Klasik Arap Dili ve Belâgatı (Muhtasaru'l-Me'ânî)</option>
            </select>
            <button onclick="handleSelectStudentField('${st.id}')" class="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow transition whitespace-nowrap">
              Alanı Onayla & Ata
            </button>
          </div>

          ${st.specializationField ? `
            <div class="text-[11px] text-purple-900 font-semibold bg-white p-2 rounded-lg border border-purple-200 flex items-center gap-1.5">
              <span>✓ Belirlenen İhtisas Sahası:</span>
              <strong>${st.specializationField}</strong>
              <span class="text-[10px] text-purple-700 font-normal">(+2 Saat/Hafta Metin Tahlili Aktif)</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // 3. KATEGORİ: KARAKTER & ZAAF TAHLİLİ
  else if (studentDetailActiveTab === "character") {
    bodyHtml = `
      <div class="space-y-3 text-xs">
        <div class="p-4 bg-red-50/60 rounded-2xl border border-red-200 space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-[10px] font-bold uppercase tracking-wider text-red-800">Mülakat Sırasında Tespit Edilen Zaaf:</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-900 border border-red-300">
              ⚠️ ${st.weakness || 'Mutedil / Belirgin Zaaf Yok'}
            </span>
          </div>
          <p class="text-xs text-red-900 font-medium">${st.weaknessDesc || 'Talebenin göze çarpan vahim bir kusuru kaydedilmemiştir.'}</p>
          <div class="text-[11px] text-slate-600 italic bg-white p-2.5 rounded-xl border border-red-100">
            "${st.weaknessStatement || 'İdaremize karşı samimi ve edepli bir duruş sergilemiştir.'}"
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Stres Seviyesi:</span>
            <div class="flex items-center gap-1.5 font-bold ${st.stressLevel > 55 ? 'text-red-600' : 'text-slate-800'}">
              <span class="w-2.5 h-2.5 rounded-full ${st.stressLevel > 55 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}"></span>
              %${st.stressLevel}
            </div>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Ahlak ve İntizam:</span>
            <strong class="text-slate-800">${st.moralStatus}</strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Tedrisat Memnuniyeti:</span>
            <strong class="text-emerald-800">%${st.satisfaction}</strong>
          </div>
        </div>
      </div>
    `;
  }

  // 4. KATEGORİ: YURT & DİSİPLİN SİCİLİ
  else if (studentDetailActiveTab === "discipline") {
    const disciplineList = st.disciplineRecord || [];
    bodyHtml = `
      <div class="space-y-3 text-xs">
        <div class="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">Resmi İhtar Sayısı:</span>
            <strong class="${st.warningCount > 0 ? 'text-red-700' : 'text-emerald-800'} text-sm">${st.warningCount || 0} İhtar</strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold uppercase block">İdari Durum:</span>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${st.warningCount >= 2 ? 'bg-red-100 text-red-900 border border-red-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'}">
              ${st.warningCount >= 2 ? 'Kovulma Eşiğinde (Kritik)' : 'Muntazam'}
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="font-bold text-xs text-slate-800 flex items-center gap-1.5">
            <i data-lucide="file-warning" class="w-4 h-4 text-amber-600"></i>
            Yurt Hadiseleri & Disiplin Tutanakları Kataloğu
          </h4>

          ${disciplineList.length === 0 ? `
            <div class="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs text-emerald-900 space-y-1">
              <div class="text-base font-bold">✓ Temiz Sicil</div>
              <p class="text-[11px] text-emerald-800">
                Bu talebenin dosyasında herhangi bir kural ihlali, yurt hadisesi veya yüz kızartıcı fiil tutanağı bulunmamaktadır.
              </p>
            </div>
          ` : `
            <div class="space-y-2 max-h-56 overflow-y-auto">
              ${disciplineList.map(rec => `
                <div class="p-3 bg-red-50/70 rounded-xl border border-red-200 text-xs space-y-1">
                  <div class="flex justify-between items-start font-bold text-red-950">
                    <span class="flex items-center gap-1.5">
                      <span>🚨</span>
                      ${rec.title}
                    </span>
                    <span class="text-[10px] text-red-700 font-mono bg-red-100 px-1.5 py-0.5 rounded">
                      Şiddet: ${rec.severity || 3}/5 • ${rec.date || 'Tutanak'}
                    </span>
                  </div>
                  <p class="text-[11px] text-red-800 leading-relaxed">${rec.description || rec.desc || ''}</p>
                  <div class="text-[10px] text-red-600 font-semibold pt-1 border-t border-red-100 flex justify-between items-center">
                    <span>Ahlaki Etki: ${rec.moralImpact || '-1 Ahlak Notu'}</span>
                    <span class="italic">Tutanak Şahsi Dosyaya İşlenmiştir</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // 5. KATEGORİ: AYLIK MÜSPET / MENFİ RAPORLAR
  else if (studentDetailActiveTab === "reports") {
    const reports = st.monthlyReports || [];
    bodyHtml = `
      <div class="space-y-2 text-xs">
        <h4 class="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
          <i data-lucide="calendar" class="w-4 h-4 text-emerald-700"></i>
          Aylık Akademik & Seyrüsüluk Gözlem Karnesi (${reports.length} Kayıt)
        </h4>

        ${reports.length === 0 ? `
          <div class="p-6 bg-slate-50 rounded-2xl border border-dashed text-center text-xs text-slate-400">
            Henüz aylık bir teftiş raporu düzenlenmemiştir.
          </div>
        ` : `
          <div class="space-y-2 max-h-56 overflow-y-auto">
            ${reports.map(r => `
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div class="flex justify-between items-center font-bold text-slate-900">
                  <span class="flex items-center gap-1.5 text-emerald-950 font-amiri">
                    <i data-lucide="bookmark" class="w-3.5 h-3.5 text-emerald-700"></i>
                    ${r.month} (${r.year}. Akademik Yıl)
                  </span>
                  <span class="text-emerald-800 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded text-[10px]">
                    ${r.academicStatus || 'Normal Seyir'}
                  </span>
                </div>
                <p class="text-[11px] text-slate-600 leading-relaxed">${r.notes || 'Derslere intizamla devam etti.'}</p>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  content.innerHTML = `
    <div class="space-y-4">
      <!-- Üst Başlık -->
      <div class="border-b border-slate-100 pb-3 flex justify-between items-start">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Talebe Şahsi İlim & Ahlak Sicili</span>
          <h3 class="text-lg font-bold text-slate-900 font-amiri flex items-center gap-2">
            <span>${st.fullName}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-sans font-bold ${isIhtisas ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-700'}">
              ${isIhtisas ? '🌟 İhtisas Programı' : '📘 Normal Tedrisat'}
            </span>
          </h3>
        </div>
        <button onclick="closeStudentDetailModal()" class="text-slate-400 hover:text-slate-600 p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- 5 Kategori Sekme Butonları -->
      <div class="flex flex-wrap gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs">
        ${tabs.map(t => `
          <button onclick="switchStudentDetailTab('${t.key}')" class="flex-1 py-1.5 px-2 rounded-xl font-bold transition text-center whitespace-nowrap ${studentDetailActiveTab === t.key ? 'bg-white text-emerald-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'}">
            ${t.label}
          </button>
        `).join('')}
      </div>

      <!-- Sekme İçeriği -->
      <div class="min-h-[220px]">
        ${bodyHtml}
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function switchStudentDetailTab(tabKey) {
  studentDetailActiveTab = tabKey;
  if (!activeDetailStudentId) return;
  const st = game.state.students.find(s => s.id === activeDetailStudentId);
  if (st) renderStudentDetailContent(st);
}

function handleSelectStudentField(studentId) {
  const sel = document.getElementById("studentFieldChoice");
  if (!sel) return;
  const newField = sel.value;
  const res = game.setStudentSpecializationField(studentId, newField);
  alert(res.message);
  const st = game.state.students.find(s => s.id === studentId);
  if (st) renderStudentDetailContent(st);
  renderAll();
}

function closeStudentDetailModal() {
  const modal = document.getElementById("studentDetailModal");
  if (modal) modal.classList.add("hidden");
}

// Yurt Raporu Modalı
function showDormReportModal() {
  const modal = document.getElementById("dormReportModal");
  if (!modal) return;
  modal.classList.remove("hidden");

  const report = game.generateDetailedDormReport();
  const content = document.getElementById("dormReportContent");

  content.innerHTML = `
    <div class="space-y-4">
      <div class="border-b border-slate-100 pb-2 flex justify-between items-center">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800">Yurt İdaresi Teftiş Zabtı</span>
          <h3 class="text-lg font-bold text-slate-900 font-amiri">${report.managerName} — Aylık Yurt Raporu</h3>
        </div>
        <button onclick="closeDormReportModal()" class="text-slate-400 hover:text-slate-600">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <p class="text-xs text-slate-600 italic bg-amber-50/50 p-3 rounded-xl border border-amber-200">
        "${report.summary}"
      </p>

      <div class="grid grid-cols-2 gap-3 text-xs">
        <div class="p-3 bg-slate-50 rounded-xl border">
          <span class="text-slate-400 block text-[10px]">Kapasite ve Doluluk:</span>
          <strong class="text-slate-800">${report.occupancy} / ${report.capacity} Yatak</strong>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border">
          <span class="text-slate-400 block text-[10px]">Yurt Memnuniyeti:</span>
          <strong class="text-amber-800">%${report.dormSatisfaction}</strong>
        </div>
      </div>

      ${report.beyogluReport ? `
        <div class="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-300 text-xs shadow-sm">
          <div class="flex items-center gap-2 text-amber-900 font-bold mb-1.5">
            <span class="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center text-[11px] font-bold">B</span>
            <span class="text-sm font-amiri font-bold">Beyoğlu Anadolu İHL Mezunlar Ekibi / Klik İncelemesi (${report.beyogluReport.count} Talebe)</span>
          </div>
          <div class="bg-white/80 p-2.5 rounded-lg border border-amber-200 text-slate-800 space-y-1.5 mb-2">
            <div class="text-[11px] font-semibold text-amber-950 flex items-start gap-1.5">
              <span class="text-amber-600">⚠️</span>
              <span><strong>Müdürlük Zabtı & Şikayet:</strong> ${report.beyogluReport.complaint}</span>
            </div>
            <div class="text-[10px] text-slate-600 italic">
              <strong>Ekip Üyeleri:</strong> ${report.beyogluReport.names}
            </div>
          </div>
          <div class="text-[10px] text-amber-900 bg-amber-100/70 px-2.5 py-1.5 rounded-md font-medium">
            <strong>Rehberlik Tavsiyesi:</strong> ${report.beyogluReport.note}
          </div>
        </div>
      ` : ''}

      <div>
        <h4 class="font-bold text-xs text-slate-800 mb-2">Dikkat Çeken / Rehberlik Gerektiren Talebeler</h4>
        <div class="space-y-1.5">
          ${report.problemStudents.length === 0 ? '<div class="text-xs text-slate-400 italic">Bu ay dikkat çeken talebe kaydı bulunmamaktadır.</div>' : report.problemStudents.map(ps => `
            <div class="p-2 bg-red-50/50 rounded-lg border border-red-200 text-xs flex justify-between items-center">
              <div>
                <span class="font-bold text-slate-900">${ps.fullName} (${ps.classYear})</span>
                <div class="text-[10px] text-red-700">⚠️ ${ps.issue}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function closeDormReportModal() {
  document.getElementById("dormReportModal").classList.add("hidden");
}

// Yeni Yıl Burs Belirleme Modalı
function renderAnnualStipendModal() {
  const modal = document.getElementById("annualStipendModal");
  if (!modal) return;

  if (game.state.pendingAnnualStipendModal) {
    modal.classList.remove("hidden");
    document.getElementById("annualStipendCurrent").innerText = `${game.state.currentYearStipend.toLocaleString('tr-TR')} ₺/ay`;
    document.getElementById("annualStipendBudget").innerText = `${game.state.budget.toLocaleString('tr-TR')} ₺`;
    document.getElementById("annualStipendInput").value = game.state.currentYearStipend + 1000;
  } else {
    modal.classList.add("hidden");
  }
}

function handleConfirmAnnualStipend() {
  const input = document.getElementById("annualStipendInput");
  if (!input) return;
  game.setAnnualStipend(input.value);
  renderAll();
}

// Dönem Sonu İdari Toplantı Modalı (Talebe Temsilcisi Hoca Raporu Dahil)
function renderAdminMeetingModal() {
  const modal = document.getElementById("adminMeetingModal");
  if (!modal) return;

  const data = game.state.adminMeetingData;
  if (!data) {
    modal.classList.add("hidden");
    return;
  }

  modal.classList.remove("hidden");
  const content = document.getElementById("adminMeetingContent");

  content.innerHTML = `
    <div class="space-y-4">
      <div class="border-b border-slate-100 pb-2">
        <span class="text-[10px] font-bold uppercase tracking-wider text-purple-900">Resmi Heyet Oturumu</span>
        <h3 class="text-lg font-bold text-slate-900 font-amiri">${data.title}</h3>
      </div>

      <!-- Talebe Temsilcisi Hoca Değerlendirmeleri -->
      <div class="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs space-y-2">
        <h4 class="font-bold text-indigo-950 flex items-center gap-1.5">
          <i data-lucide="message-square" class="w-4 h-4 text-indigo-700"></i>
          Talebe Temsilcileri Hoca & Tedrisat Değerlendirmeleri
        </h4>
        <div class="space-y-1.5 max-h-40 overflow-y-auto">
          ${data.studentRepFeedback ? data.studentRepFeedback.map(rf => `
            <div class="p-2 bg-white rounded border border-indigo-100 text-xs">
              <span class="font-bold text-indigo-900 block">${rf.repName}:</span>
              <p class="text-slate-600 italic mt-0.5">${rf.feedback}</p>
            </div>
          `).join('') : '<p class="text-slate-500 italic">Geri bildirim bulunmuyor.</p>'}
        </div>
      </div>

      <!-- İhraç / Kovulma Gündemi -->
      <div class="p-3 bg-red-50/60 rounded-xl border border-red-200 text-xs space-y-2">
        <h4 class="font-bold text-red-900 flex items-center gap-1.5">
          <i data-lucide="alert-triangle" class="w-4 h-4"></i>
          Disiplin & İhraç Gündemi (${data.expulsionCandidates.length} Talebe)
        </h4>
        ${data.expulsionCandidates.length === 0 ? `
          <p class="text-slate-500 italic">Bu dönem disiplin suçu işleyen veya kritik ihtar sınırına ulaşan talebe bulunmuyor.</p>
        ` : `
          <div class="space-y-2">
            ${data.expulsionCandidates.map(st => `
              <div class="p-2 bg-white rounded border border-red-200 flex justify-between items-center">
                <div>
                  <div class="font-bold text-slate-900">${st.fullName} (${st.warningCount} İhtar)</div>
                  <div class="text-[10px] text-slate-500">Not: ${st.internalScore}/100 • GANO: ${st.gano || 'Yok'}</div>
                </div>
                <button onclick="handleConfirmExpel('${st.id}')" class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-[10px] transition">
                  İlişiğini Kes (Kov)
                </button>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Hoca Değerlendirmeleri & Sözleşme Feshi -->
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
        <h4 class="font-bold text-slate-800">Hoca Tedrisat ve Sözleşme İncelemesi</h4>
        <div class="space-y-1.5 max-h-44 overflow-y-auto">
          ${data.scholarsReview.map(sc => `
            <div class="p-2 bg-white rounded border border-slate-200 flex justify-between items-center text-xs">
              <div>
                <span class="font-bold text-slate-900">${sc.title} ${sc.name}</span>
                <span class="text-slate-500"> (${sc.salary.toLocaleString('tr-TR')} ₺/ay)</span>
                <div class="text-[10px] text-slate-400 mt-0.5">
                  Ders Devamı: <strong class="text-emerald-700">%${sc.attendanceRate}</strong> • Memnuniyet: <strong class="text-amber-700">%${sc.studentApprovalRate}</strong>
                </div>
              </div>
              <button onclick="handleConfirmTerminateScholar(${sc.scholarId})" class="px-2 py-1 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded border border-slate-300 text-[10px]">
                Feshet
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <button onclick="handleCloseAdminMeeting()" class="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition">
        Toplantıyı Tamamla ve Kararları İcra Et
      </button>
    </div>
  `;
}

function handleConfirmExpel(studentId) {
  game.expelStudent(studentId);
  game.state.adminMeetingData.expulsionCandidates = game.state.adminMeetingData.expulsionCandidates.filter(s => s.id !== studentId);
  renderAll();
}

function handleConfirmTerminateScholar(scholarId) {
  game.terminateScholarContract(scholarId);
  game.state.adminMeetingData.scholarsReview = game.state.adminMeetingData.scholarsReview.filter(s => s.scholarId !== scholarId);
  renderAll();
}

function handleCloseAdminMeeting() {
  game.state.adminMeetingData = null;
  renderAll();
}

// Öğrenci Buluşması Modalı
function renderStudentMeetingModal() {
  const modal = document.getElementById("studentMeetingModal");
  if (!modal) return;

  const data = game.state.studentMeetingData;
  if (!data) {
    modal.classList.add("hidden");
    return;
  }

  modal.classList.remove("hidden");
  const content = document.getElementById("studentMeetingContent");

  content.innerHTML = `
    <div class="space-y-4">
      <div class="border-b border-slate-100 pb-2">
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Talebe Meclisi Buluşması</span>
        <h3 class="text-lg font-bold text-slate-900 font-amiri">${data.title}</h3>
      </div>

      <div class="space-y-3">
        ${data.demands.map(dem => `
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div class="flex justify-between items-center font-bold text-slate-900">
              <span>${dem.topic}</span>
              ${dem.status === 'accepted' ? `<span class="text-emerald-700 font-bold">Kabul Edildi</span>` : (dem.status === 'rejected' ? `<span class="text-red-600 font-bold">Reddedildi</span>` : `<span class="text-amber-700 font-bold">Bekliyor</span>`)}
            </div>
            <p class="text-slate-600 italic">"${dem.text}"</p>
            <div class="text-[10px] text-slate-500">Maliyet: ${dem.cost > 0 ? dem.cost.toLocaleString('tr-TR') + ' ₺' : 'Masrafsız'} • Etki: ${dem.acceptEffect}</div>

            ${dem.status === 'pending' ? `
              <div class="flex gap-2 pt-1">
                <button onclick="handleStudentDemand('${dem.id}', 'accepted')" class="flex-1 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-[10px]">
                  Kabul Et & Bütçe Ayır
                </button>
                <button onclick="handleStudentDemand('${dem.id}', 'postponed')" class="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-semibold text-[10px]">
                  Ertele
                </button>
                <button onclick="handleStudentDemand('${dem.id}', 'rejected')" class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded font-semibold text-[10px]">
                  Reddet
                </button>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <button onclick="handleCloseStudentMeeting()" class="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow transition">
        Buluşmayı Kapat
      </button>
    </div>
  `;
}

function handleStudentDemand(demandId, actionType) {
  game.handleStudentDemandAction(demandId, actionType);
  renderAll();
}

function handleCloseStudentMeeting() {
  game.state.studentMeetingData = null;
  renderAll();
}

// Aktif Olay Modalı (Düğün, Stres vb.)
function renderActiveModalEvent() {
  const modal = document.getElementById("eventModal");
  const event = game.state.activeModalEvent;

  if (!event) {
    modal.classList.add("hidden");
    return;
  }

  modal.classList.remove("hidden");
  document.getElementById("eventModalTitle").innerText = event.title;
  document.getElementById("eventModalBody").innerText = event.message;

  const btnContainer = document.getElementById("eventModalButtons");
  btnContainer.innerHTML = event.options.map((opt, idx) => `
    <button onclick="handleEventOptionClick(${idx})" class="w-full py-2 px-3 text-left bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-xs rounded-lg transition font-medium text-slate-800">
      ${opt.label}
    </button>
  `).join('');
}

function handleEventOptionClick(idx) {
  const event = game.state.activeModalEvent;
  if (event && event.options && event.options[idx]) {
    event.options[idx].action();
  }
}

// Kurulum Sihirbazı Formu Gönderimi
function handleSetupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("setupInstName").value;
  const duration = parseInt(document.getElementById("setupDuration").value);
  const difficulty = document.getElementById("setupDifficulty").value;

  const genderInputs = document.getElementsByName("gender");
  let selectedGender = "male";
  for (let i = 0; i < genderInputs.length; i++) {
    if (genderInputs[i].checked) {
      selectedGender = genderInputs[i].value;
      break;
    }
  }

  const criteria = {
    yksPriority: document.getElementById("critYks").checked,
    eliteHighSchoolsPriority: document.getElementById("critSchools").checked,
    visionAlignment: document.getElementById("critVision").checked,
    interviewEmphasis: document.getElementById("critInterview").checked,
    arabicBackground: document.getElementById("critArabic").checked
  };

  game.startInstitution({
    name,
    duration,
    difficulty,
    gender: selectedGender,
    criteria,
    customCurriculum: (setupCoursesState && setupCoursesState.length > 0) ? setupCoursesState : null
  });

  showDashboard();

  // Buluta senkronize et
  if (typeof syncGameToCloud === "function") {
    syncGameToCloud(true);
  }
}

function resetGameAction() {
  if (confirm("Mevcut simülasyonu sıfırlayıp baştan başlamak istediğinize emin misiniz?")) {
    game.resetGame();
    showSetupWizard();
  }
}

// ==================== OYUN BAŞI MÜFREDAT BELİRLEME SİSTEMİ ====================
function initSetupCoursesList() {
  const baseCourses = typeof COURSES_DATA !== "undefined" ? COURSES_DATA : [];
  if (!setupCoursesState || setupCoursesState.length === 0) {
    setupCoursesState = baseCourses.map(c => ({
      id: c.id,
      code: c.code,
      name: c.name,
      arabicName: c.arabicName,
      branch: c.branch,
      category: c.category,
      categoryLabel: c.categoryLabel,
      classYear: c.classYear, // 0..4
      semester: c.semester || "guz",
      semesterLabel: c.semester === "bahar" ? "Bahar" : "Güz",
      weeklyHours: c.weeklyHours || 4,
      textbook: c.textbook || "",
      isClassicMethod: !!c.isClassicMethod,
      description: c.description || "",
      impact: c.impact || {}
    }));
  }
  renderSetupCoursesList();
}

function renderSetupCoursesList() {
  const container = document.getElementById("setupCoursesListContainer");
  if (!container) return;

  const branchFilterEl = document.getElementById("setupCourseBranchFilter");
  const searchEl = document.getElementById("setupCourseSearch");
  const filterBranch = branchFilterEl ? branchFilterEl.value : "all";
  const searchQuery = searchEl ? searchEl.value.trim().toLowerCase() : "";

  let list = setupCoursesState.filter(c => {
    if (filterBranch !== "all" && c.branch !== filterBranch) return false;
    if (searchQuery) {
      const match = (c.name && c.name.toLowerCase().includes(searchQuery)) || 
                    (c.code && c.code.toLowerCase().includes(searchQuery)) ||
                    (c.branch && c.branch.toLowerCase().includes(searchQuery)) ||
                    (c.textbook && c.textbook.toLowerCase().includes(searchQuery));
      if (!match) return false;
    }
    return true;
  });

  if (list.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">Aradığınız kriterlere uygun ders bulunamadı.</div>`;
    return;
  }

  container.innerHTML = list.map(c => `
    <div class="py-2.5 px-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs transition ${c.classYear === -1 ? 'opacity-50 bg-slate-50' : 'bg-white hover:bg-emerald-50/30'}">
      <div class="flex-1 min-w-[200px]">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200 text-[10px]">
            ${c.code}
          </span>
          <span class="font-bold text-slate-900">${c.name}</span>
          <span class="text-[10px] text-slate-400 font-amiri">${c.arabicName || ''}</span>
          ${c.isClassicMethod ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-900 border border-amber-300">📜 Klasik Usul</span>` : ''}
        </div>
        <div class="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
          <span class="font-semibold text-emerald-900">${c.branch}</span>
          <span>•</span>
          <span class="truncate max-w-xs">Eser: ${c.textbook || '-'}</span>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <!-- Sınıf Seviyesi Seçimi -->
        <div>
          <label class="block text-[9px] text-slate-400 font-semibold mb-0.5">Sınıf:</label>
          <select onchange="updateSetupCourseField(${c.id}, 'classYear', parseInt(this.value))" class="px-2 py-1 border border-slate-300 rounded-lg text-xs font-semibold bg-white ${c.classYear === -1 ? 'text-slate-400 bg-slate-100' : 'text-slate-800'}">
            <option value="0" ${c.classYear === 0 ? 'selected' : ''}>Hazırlık Sınıfı</option>
            <option value="1" ${c.classYear === 1 ? 'selected' : ''}>1. Sınıf</option>
            <option value="2" ${c.classYear === 2 ? 'selected' : ''}>2. Sınıf</option>
            <option value="3" ${c.classYear === 3 ? 'selected' : ''}>3. Sınıf</option>
            <option value="4" ${c.classYear === 4 ? 'selected' : ''}>4. Sınıf</option>
            <option value="-1" ${c.classYear === -1 ? 'selected' : ''}>❌ Müfredat Dışı</option>
          </select>
        </div>

        <!-- Dönem Seçimi -->
        <div>
          <label class="block text-[9px] text-slate-400 font-semibold mb-0.5">Dönem:</label>
          <select onchange="updateSetupCourseField(${c.id}, 'semester', this.value)" class="px-2 py-1 border border-slate-300 rounded-lg text-xs font-semibold bg-white text-slate-800" ${c.classYear === -1 ? 'disabled' : ''}>
            <option value="guz" ${c.semester === 'guz' ? 'selected' : ''}>Güz</option>
            <option value="bahar" ${c.semester === 'bahar' ? 'selected' : ''}>Bahar</option>
            <option value="yillik" ${c.semester === 'yillik' ? 'selected' : ''}>Yıllık</option>
          </select>
        </div>

        <!-- Haftalık Saat Seçimi -->
        <div>
          <label class="block text-[9px] text-slate-400 font-semibold mb-0.5">Haftalık Saat:</label>
          <select onchange="updateSetupCourseField(${c.id}, 'weeklyHours', parseInt(this.value))" class="px-2 py-1 border border-slate-300 rounded-lg text-xs font-semibold bg-white text-slate-800" ${c.classYear === -1 ? 'disabled' : ''}>
            <option value="2" ${c.weeklyHours === 2 ? 'selected' : ''}>2 saat/hf</option>
            <option value="3" ${c.weeklyHours === 3 ? 'selected' : ''}>3 saat/hf</option>
            <option value="4" ${c.weeklyHours === 4 ? 'selected' : ''}>4 saat/hf</option>
            <option value="6" ${c.weeklyHours === 6 ? 'selected' : ''}>6 saat/hf</option>
          </select>
        </div>
      </div>
    </div>
  `).join('');
}

function updateSetupCourseField(courseId, field, value) {
  const c = setupCoursesState.find(x => x.id === courseId);
  if (c) {
    c[field] = value;
    if (field === 'semester') {
      c.semesterLabel = value === 'bahar' ? 'Bahar' : (value === 'yillik' ? 'Yıllık' : 'Güz');
    }
  }
}

function loadDefaultCurriculumPreset() {
  const baseCourses = typeof COURSES_DATA !== "undefined" ? COURSES_DATA : [];
  setupCoursesState = baseCourses.map(c => ({
    id: c.id,
    code: c.code,
    name: c.name,
    arabicName: c.arabicName,
    branch: c.branch,
    category: c.category,
    categoryLabel: c.categoryLabel,
    classYear: c.classYear,
    semester: c.semester || "guz",
    semesterLabel: c.semester === "bahar" ? "Bahar" : "Güz",
    weeklyHours: c.weeklyHours || 4,
    textbook: c.textbook || "",
    isClassicMethod: !!c.isClassicMethod,
    description: c.description || "",
    impact: c.impact || {}
  }));
  renderSetupCoursesList();
  if (typeof showToastNotification === "function") {
    showToastNotification("Önerilen kadim müfredat dağılımı yüklendi.", "info");
  }
}

function clearCurriculumAssignments() {
  setupCoursesState.forEach(c => {
    c.classYear = -1;
  });
  renderSetupCoursesList();
  if (typeof showToastNotification === "function") {
    showToastNotification("Tüm dersler sıfırlandı. Dilediğiniz dersleri sıfırdan atayabilirsiniz.", "info");
  }
}

function filterSetupCoursesList() {
  renderSetupCoursesList();
}

// ==================== ATANAN SEMİNERLER TABLOSU & DÜZENLEME ====================
function renderAssignedSeminarsGrid(allCourses) {
  // Sadece atanmış seminerler (classYear !== -1)
  let assignedList = allCourses.filter(c => c.classYear !== -1 && c.classYear !== undefined);

  if (seminarClassFilter !== "all") {
    assignedList = assignedList.filter(c => c.classYear.toString() === seminarClassFilter);
  }
  if (seminarSemesterFilter !== "all") {
    assignedList = assignedList.filter(c => c.semester === seminarSemesterFilter || c.semester === "yillik");
  }
  if (seminarBranchFilter !== "all") {
    assignedList = assignedList.filter(c => c.branch === seminarBranchFilter);
  }

  if (assignedList.length === 0) {
    return `
      <div class="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
        Bu filtreleme kriterlerine uygun atanan seminer bulunmuyor.
      </div>
    `;
  }

  const totalWeeklyHours = assignedList.reduce((acc, c) => acc + (c.weeklyHours || 0), 0);

  return `
    <div class="space-y-4">
      <div class="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs flex flex-wrap justify-between items-center gap-2 text-emerald-950 font-semibold">
        <span>Görüntülenen Seminer Sayısı: <strong>${assignedList.length} Seminer</strong></span>
        <span>Haftalık Toplam Tedrisat: <strong>${totalWeeklyHours} Saat / Hafta</strong></span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${assignedList.map(c => {
          const assignedScholarId = game.state.courseAssignments[c.id];
          const assignedScholar = game.state.hiredScholars.find(h => h.scholarId === assignedScholarId);
          const yrLabel = c.classYear === 0 ? "Hazırlık Sınıfı" : `${c.classYear}. Sınıf`;
          const semLabel = c.semester === "guz" ? "Güz Dönemi" : (c.semester === "bahar" ? "Bahar Dönemi" : "Yıllık (Güz & Bahar)");

          return `
            <div class="ottoman-card p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition flex flex-col justify-between space-y-3">
              <div>
                <div class="flex justify-between items-start gap-2">
                  <span class="px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200 text-[10px]">
                    ${c.code}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold ${getBranchBadgeColor(c.branch)}">
                    ${c.branch}
                  </span>
                </div>

                <h4 class="font-bold text-slate-900 text-sm mt-2">${c.name}</h4>
                <div class="text-[11px] text-slate-400 font-amiri">${c.arabicName || ''}</div>

                <div class="mt-2 pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <div class="flex justify-between">
                    <span class="text-slate-500">Seviye & Dönem:</span>
                    <span class="font-semibold text-slate-800">${yrLabel} • ${semLabel}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Haftalık Yük:</span>
                    <span class="font-bold text-emerald-700">${c.weeklyHours || 4} saat / hafta</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Kaynak Eser:</span>
                    <span class="font-medium text-slate-700 truncate max-w-[170px]" title="${c.textbook}">${c.textbook || '-'}</span>
                  </div>
                  ${c.isClassicMethod ? `
                    <div class="pt-1">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                        📜 Klasik Usule Bağlı
                      </span>
                    </div>
                  ` : ''}
                </div>
              </div>

              <div class="space-y-2 pt-2 border-t border-slate-100">
                ${assignedScholar ? `
                  <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs flex justify-between items-center text-emerald-950 font-semibold">
                    <span>👨‍🏫 ${assignedScholar.title} ${assignedScholar.name}</span>
                    <span class="text-[10px] text-emerald-700 font-bold">Görevde</span>
                  </div>
                ` : `
                  <div class="p-2 rounded-lg bg-amber-50 border border-amber-300 text-xs flex justify-between items-center text-amber-950">
                    <span class="font-bold text-amber-900">⚠️ Hoca Bekleniyor</span>
                    <button onclick="seminarSubTab = 'assignments'; renderCurriculumTab();" class="text-[10px] font-bold text-amber-800 underline hover:text-amber-950">
                      Hoca Ata
                    </button>
                  </div>
                `}

                <button onclick="openEditSeminarModal(${c.id})" class="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs transition flex items-center justify-center gap-1.5">
                  <i data-lucide="settings-2" class="w-3.5 h-3.5"></i>
                  Semineri Düzenle (Saat / Dönem)
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function openEditSeminarModal(courseId) {
  const all = game.getAllCourses();
  const c = all.find(x => x.id === courseId);
  if (!c) return;

  document.getElementById("editSeminarCourseId").value = c.id;
  document.getElementById("editSeminarCode").innerText = c.code;
  document.getElementById("editSeminarName").innerText = c.name;
  document.getElementById("editSeminarClassYear").value = (c.classYear !== undefined) ? c.classYear : 0;
  document.getElementById("editSeminarSemester").value = c.semester || "guz";
  document.getElementById("editSeminarHours").value = c.weeklyHours || 4;

  document.getElementById("editSeminarModal").classList.remove("hidden");
}

function closeEditSeminarModal() {
  document.getElementById("editSeminarModal").classList.add("hidden");
}

function saveEditedSeminar() {
  const courseId = parseInt(document.getElementById("editSeminarCourseId").value);
  const classYear = parseInt(document.getElementById("editSeminarClassYear").value);
  const semester = document.getElementById("editSeminarSemester").value;
  const weeklyHours = parseInt(document.getElementById("editSeminarHours").value);

  const all = game.getAllCourses();
  const c = all.find(x => x.id === courseId);
  if (c) {
    c.classYear = classYear;
    c.semester = semester;
    c.semesterLabel = semester === 'bahar' ? 'Bahar' : (semester === 'yillik' ? 'Yıllık' : 'Güz');
    c.weeklyHours = weeklyHours;
    game.state.customCurriculum = all;
    game.saveToStorage();
    closeEditSeminarModal();
    renderCurriculumTab();
    if (typeof showToastNotification === "function") {
      showToastNotification(`${c.code} semineri güncellendi.`, "success");
    }
  }
}

// İhtisas kısmı kaldırıldı - Tüm öğrenciler standart tedrisat kategorisinde eğitim görür
function openTrackSelectionModal() {}
function closeTrackSelectionModal() {}
function toggleSingleStudentTrack() {}
