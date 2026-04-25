// ==========================================
// Heigao Hub - 核心交互逻辑与多语言脚本
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. 集中缓存 DOM 元素 (提升性能与可维护性)
  // ==========================================
  const DOM = {
    sidebarToggle: document.getElementById('sidebarToggle'),
    sidebar: document.getElementById('sidebar'),
    overlay: document.getElementById('sidebarOverlay'),
    sections: document.querySelectorAll('.content-section'),
    sidebarLinks: document.querySelectorAll('.sidebar-link'),
    i18nElements: document.querySelectorAll('[data-i18n]'),
    langBtns: document.querySelectorAll('.lang-btn'),
    yearElement: document.getElementById('current-year')
  };

  // ==========================================
  // 2. 国际化 (i18n) 数据字典
  // ==========================================
  const i18nData = {
    "zh": {
      "name": "黑篙 Heigao",
      "title": "黑篙 Heigao | 个人导航站",
      "bio": "数字创作者 / UTAU / 视觉艺术",
      "nav_home": "主页",
      "nav_about": "关于 黑篙🌌",
      "nav_gallery": "部分作品展示",
      "nav_history": "站点日志",
      "link_utau": "「熵尾音 クロ」 UTAU 展示页",
      "link_blog": "黑篙的博客",
      "badge_wip": "未创建",
      "about_title": "关于我",
      "card1_title": "✦ 个人简介",
      "card2_title": "✦ 技能树",
      "card3_title": "✦ 约稿与合作",
      "card4_title": "✦ 联系与关注",
      "about_p1": "你好，我是黑篙 (Heigao)。无形无意。",
      "about_p2": "目前专注于「熵尾音 クロ」的音源开发与完善，同时偶尔掉落一些视觉艺术与设计相关的随笔创作。",
      "about_tools": "常用装备",
      "tools_list": "CSP / Adobe系列 / Logic Pro / 微软大战代码 / OpenCode",
      "about_lang": "沟通语言",
      "lang_list": "中文 / English / 日本語(稍微)",
      "about_status": "当前状态",
      "status_text": "缓慢填坑中",
      "about_c1": "1. 我菜的抠脚，还没有接稿的想法。",
      "about_c2": "2. 我菜的抠脚，还没有接稿的想法。",
      "about_c3": "3. 我菜的抠脚，还没有合作的想法。",
      "about_contact_desc": "可以通过以下平台找到我，或者查看我的更多动态：",
      "back_home": "← 返回主页",
      "utau_version": "当前版本：2026.4-Beta",
      "gallery_title": "部分作品展示"
    },
    "en": {
      "name": "Heigao (黑篙)",
      "title": "Heigao Hub | Portfolio & Links",
      "bio": "Digital Creator / UTAU / Art",
      "nav_home": "Home",
      "nav_about": "About Heigao🌌",
      "nav_gallery": "Selected Works",
      "nav_history": "Site Log",
      "link_utau": "Shouo Kuro UTAU Voicebank",
      "link_blog": "Heigao's Blog",
      "badge_wip": "Coming Soon",
      "about_title": "About Me",
      "card1_title": "✦ Profile",
      "card2_title": "✦ Skill Tree",
      "card3_title": "✦ Commission",
      "card4_title": "✦ Contact",
      "about_p1": "Hi, I'm Heigao. Formless and intentionless.",
      "about_p2": "Currently focusing on the development of the UTAU voicebank 'Kuro', alongside occasional visual art and design projects.",
      "about_tools": "Tools",
      "tools_list": "CSP / Adobe CC / Logic Pro / Microsoft vs Code / OpenCode",
      "about_lang": "Languages",
      "lang_list": "Chinese / English / Japanese (A little)",
      "about_status": "Status",
      "status_text": "Slowly chipping away at WIPs",
      "about_c1": "1. I'm still a massive noob, so I'm not taking commissions right now.",
      "about_c2": "2. I'm still a massive noob, so I'm not taking commissions right now.",
      "about_c3": "3. I'm still a massive noob, so I don't have any collaboration plans.",
      "about_contact_desc": "You can find me or check out my latest updates on these platforms:",
      "back_home": "← Back to Home",
      "utau_version": "Current version: 2026.4-Beta",
      "gallery_title": "Selected Works"
    },
    "ja": {
      "name": "黒篙 Heigao",
      "title": "黒篙 Heigao | ポートフォリオ",
      "bio": "デジタルクリエイター / UTAU / アート",
      "nav_home": "ホーム",
      "nav_about": "プロフィール🌌",
      "nav_gallery": "作品ピックアップ",
      "nav_history": "更新履歴",
      "link_utau": "「熵尾音 クロ」 UTAU 配布所",
      "link_blog": "黒篙のブログ",
      "badge_wip": "準備中",
      "about_title": "私について",
      "card1_title": "✦ プロフィール",
      "card2_title": "✦ スキルツリー",
      "card3_title": "✦ ご依頼・お問い合わせ",
      "card4_title": "✦ 連絡先・フォロー",
      "about_p1": "こんにちは、黒篙（Heigao）です。無形無意。",
      "about_p2": "現在はUTAU音源「熵尾音 クロ」の開発を中心に、ビジュアルアートやデザインの創作も時々行っています。",
      "about_tools": "使用ツール",
      "tools_list": "CSP / Adobe CC / Logic Pro / マイクロソフト大戦コード / OpenCode",
      "about_lang": "対応言語",
      "lang_list": "中国語 / 英語 / 日本語(少し)",
      "about_status": "現在の状況",
      "status_text": "ちまちま進捗中",
      "about_c1": "1. まだまだへっぽこなので、ご依頼はお受けしていません。",
      "about_c2": "2. まだまだへっぽこなので、ご依頼はお受けしていません。",
      "about_c3": "3. まだまだへっぽこなので、コラボの予定もありません。",
      "about_contact_desc": "以下のプラットフォームで私を見つけるか、最新の活動を確認できます：",
      "back_home": "← ホームに戻る",
      "utau_version": "現在のバージョン：2026.4-Beta",
      "gallery_title": "作品ピックアップ"
    }
  };

  // 当前语言状态
  let currentLang = 'zh';

  // ==========================================
  // 3. 核心功能与逻辑
  // ==========================================

  function toggleSidebar() {
    if (!DOM.sidebarToggle || !DOM.sidebar || !DOM.overlay) return;
    DOM.sidebarToggle.classList.toggle('active');
    DOM.sidebar.classList.toggle('open');
    DOM.overlay.classList.toggle('active');
  }

  function switchSection(hash) {
    let sectionId = (hash.replace('#', '') || 'home').trim();

    DOM.sections.forEach(section => {
      section.style.display = 'none';
    });

    const target = document.getElementById(`section-${sectionId}`);
    if (target) {
      target.style.display = 'block';
    } else {
      const defaultHome = document.getElementById('section-home');
      if (defaultHome) defaultHome.style.display = 'block';
      sectionId = 'home';
    }
    window.scrollTo(0, 0);

    DOM.sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}` || (sectionId === 'home' && href === '#home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (DOM.sidebar && DOM.sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  }

  function setLanguage(lang) {
    if (!i18nData[lang]) lang = 'zh';
    currentLang = lang;

    document.title = i18nData[currentLang]["title"] || document.title;
    document.documentElement.lang = currentLang;
    localStorage.setItem('preferredLang', currentLang);

    DOM.i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18nData[currentLang][key]) {
        el.textContent = i18nData[currentLang][key];
      }
    });

    DOM.langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
  }

  function initLanguage() {
    let targetLang = localStorage.getItem('preferredLang');
    if (!i18nData[targetLang]) {
      const sysLang = navigator.language.toLowerCase();
      if (sysLang.startsWith('ja')) targetLang = 'ja';
      else if (sysLang.startsWith('en')) targetLang = 'en';
      else targetLang = 'zh';
    }
    setLanguage(targetLang);
  }

  // ==========================================
  // 4. 事件监听器绑定
  // ==========================================
  
  if (DOM.sidebarToggle) DOM.sidebarToggle.addEventListener('click', toggleSidebar);
  if (DOM.overlay) DOM.overlay.addEventListener('click', toggleSidebar);

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
  const lightboxClose = document.querySelector('.lightbox-close');

  const viewport = document.querySelector('meta[name="viewport"]');
  const defaultViewport = viewport ? viewport.content : '';

  function lockViewport() {
    if (viewport) viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  }

  function unlockViewport() {
    if (viewport) viewport.content = defaultViewport || 'width=device-width, initial-scale=1.0';
  }

  let lbScale = 1, lbTx = 0, lbTy = 0;
  let dragStartTx, dragStartTy, lbDragging = false;
  const zoomSlider = document.getElementById('zoomSlider');

  function lbApply() {
    lightboxImg.style.transform =
      'translate3d(' + lbTx + 'px,' + lbTy + 'px,0) scale(' + lbScale + ')';
  }

  function lbReset() {
    lbScale = 1; lbTx = 0; lbTy = 0;
    lightboxImg.style.transform = '';
    if (zoomSlider) zoomSlider.value = 100;
  }

  function lbSetScale(s) {
    lbScale = Math.min(5, Math.max(1, s));
    if (lbScale <= 1) { lbTx = 0; lbTy = 0; }
    lbApply();
    if (zoomSlider) zoomSlider.value = Math.round(lbScale * 100);
  }

  function openLightbox(item) {
    const img = item.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    const name = item.querySelector('.gallery-name');
    const date = item.querySelector('.gallery-date');
    if (lightboxTitle && name) lightboxTitle.textContent = name.textContent;
    if (lightboxDate && date) lightboxDate.textContent = date.textContent;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lockViewport();
    lbReset();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    unlockViewport();
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  // 滑块缩放
  if (zoomSlider) {
    zoomSlider.addEventListener('input', function() {
      lbSetScale(parseInt(this.value) / 100);
    });
  }

  // +/- 按钮
  document.querySelectorAll('.zoom-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const delta = this.getAttribute('data-action') === 'in' ? 0.25 : -0.25;
      lbSetScale(lbScale + delta);
    });
  });

  // 单指拖拽（放大后）
  lightbox.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1 && lbScale > 1) {
      const t = e.target;
      if (t.closest('.lightbox-zoom') || t.closest('.lightbox-close')) return;
      lbDragging = true;
      dragStartTx = lbTx - e.touches[0].clientX;
      dragStartTy = lbTy - e.touches[0].clientY;
    }
  }, { passive: true });

  lightbox.addEventListener('touchmove', function(e) {
    if (lbDragging && e.touches.length === 1 && !e.target.closest('.lightbox-zoom')) {
      lbTx = e.touches[0].clientX + dragStartTx;
      lbTy = e.touches[0].clientY + dragStartTy;
      lbApply();
    }
  }, { passive: true });

  lightbox.addEventListener('touchend', function() {
    lbDragging = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  window.addEventListener('hashchange', () => {
    switchSection(window.location.hash);
  });

  DOM.langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.target.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // ==========================================
  // 5. 亮暗模式切换
  // ==========================================

  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const darkBgColor = '#252C3A';
  const lightBgColor = '#CBD3DC';

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
      themeIcon.setAttribute('href', theme === 'dark' ? '#icon-sun' : '#icon-moon');
    }
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? darkBgColor : lightBgColor);
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式');
    }
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (themeIcon) {
    themeIcon.setAttribute('href', getTheme() === 'dark' ? '#icon-sun' : '#icon-moon');
  }
  if (themeMeta) {
    themeMeta.setAttribute('content', getTheme() === 'dark' ? darkBgColor : lightBgColor);
  }
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', getTheme() === 'dark' ? '切换到亮色模式' : '切换到暗色模式');
  }

  const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemDarkQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==========================================
  // 6. 执行初始渲染
  // ==========================================
  
  if (DOM.yearElement) {
    const year = new Date().getFullYear();
    DOM.yearElement.textContent = year === 2026 ? '2026' : '2026–' + year;
  }

  initLanguage();
  switchSection(window.location.hash);

});