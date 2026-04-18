// ==========================================
// UI 交互逻辑 (侧边栏)
// ==========================================
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
  sidebarToggle.classList.toggle('active');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

if(sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
if(overlay) overlay.addEventListener('click', toggleSidebar);

// ==========================================
// 路由切换逻辑 (单页应用核心 SPA)
// ==========================================
function switchSection(hash) {
  let sectionId = hash.replace('#', '') || 'home'; 

  document.querySelectorAll('.content-section').forEach(section => {
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

  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${sectionId}` || (sectionId === 'home' && href === '#home')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if (sidebar && sidebar.classList.contains('open')) {
    toggleSidebar();
  }
}

window.addEventListener('hashchange', () => {
  switchSection(window.location.hash);
});

// ==========================================
// 国际化 (i18n) 语言切换字典
// ==========================================
const i18n = {
  "zh": {
    "name": "黑篙 Heigao",
    "title": "黑篙 Heigao | 个人导航站",
    "bio": "数字创作者 / UTAU / 视觉艺术",
    "nav_home": "主页",
    "nav_about": "关于 黑篙🌌",
    "link_utau": "「熵尾音 クロ」 UTAU 展示页",
    "link_blog": "创作日志 Blog",
    "badge_wip": "未创建",
    "about_title": "关于我",
    "card1_title": "✦ 个人简介",
    "card2_title": "✦ 技能树",
    "card3_title": "✦ 约稿与合作 (Commission)",
    "about_p1": "你好，我是黑篙 (Heigao)。无形无意。",
    "about_p2": "目前专注于「熵尾音 クロ」的音源开发与完善，同时偶尔掉落一些视觉艺术与设计相关的随笔创作。",
    "about_tools": "常用装备",
    "tools_list": "CSP / Adobe系列 / Logic Pro / 微软大战代码 / OpenCode",
    "about_lang": "沟通语言",
    "lang_list": "中文 / English / 日本語(少し)",
    "about_status": "当前状态",
    "status_text": "缓慢填坑中",
    "about_c1": "1. 我菜的抠脚，还没有接稿的想法。",
    "about_c2": "2. 我菜的抠脚，还没有接稿的想法。",
    "about_c3": "3. 我菜的抠脚，还没有合作的想法。",
    "back_home": "← 返回主页"
  },
  "en": {
    "name": "Heigao (黑篙)",
    "title": "Heigao Hub | Portfolio & Links",
    "bio": "Digital Creator / UTAU / Art",
    "nav_home": "Home",
    "nav_about": "About Heigao🌌",
    "link_utau": "Shouo Kuro UTAU Voicebank",
    "link_blog": "Devlog & Blog",
    "badge_wip": "Coming Soon",
    "about_title": "About Me",
    "card1_title": "✦ Profile",
    "card2_title": "✦ Skill Tree",
    "card3_title": "✦ Commission & Contact",
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
    "back_home": "← Back to Home"
  },
  "ja": {
    "name": "黒篙 Heigao",
    "title": "黒篙 Heigao | ポートフォリオ",
    "bio": "デジタルクリエイター / UTAU / アート",
    "nav_home": "ホーム",
    "nav_about": "プロフィール🌌",
    "link_utau": "「熵尾音 クロ」 UTAU 配布所",
    "link_blog": "創作ブログ",
    "badge_wip": "準備中",
    "about_title": "私について", 
    "card1_title": "✦ プロフィール",
    "card2_title": "✦ スキルツリー",
    "card3_title": "✦ ご依頼・お問い合わせ (Commission)",
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
    "back_home": "← ホームに戻る"
  }
};

let currentLang = 'zh';

function setLanguage(lang) {
  if (!i18n[lang]) lang = 'zh';
  currentLang = lang;
  if (i18n[currentLang]["title"]) document.title = i18n[currentLang]["title"];
  document.documentElement.lang = currentLang;

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang][key]) {
      el.innerText = i18n[currentLang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  localStorage.setItem('preferredLang', currentLang);
}

function initLanguage() {
  let targetLang = localStorage.getItem('preferredLang');
  if (!targetLang) {
     const sysLang = navigator.language.toLowerCase();
     if (sysLang.startsWith('zh')) targetLang = 'zh';
     else if (sysLang.startsWith('en')) targetLang = 'en';
     else if (sysLang.startsWith('ja')) targetLang = 'ja';
     else targetLang = 'zh'; 
  }
  setLanguage(targetLang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const selectedLang = e.target.getAttribute('data-lang');
    setLanguage(selectedLang);
  });
});

// ==========================================
// 网页初始化及动态年份注入
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initLanguage(); 
  switchSection(window.location.hash); 
  
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.innerText = new Date().getFullYear();
  }
});
