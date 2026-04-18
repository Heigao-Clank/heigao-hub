// ==========================================
// Heigao Hub - 核心交互逻辑与多语言脚本
// ==========================================

// 将所有逻辑包裹在 DOMContentLoaded 中，避免污染全局命名空间，并确保 DOM 节点已完全加载
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
      "nav_history": "站点日志",
      "link_utau": "「熵尾音 クロ」 UTAU 展示页",
      "link_blog": "黑篙的博客",
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
      "lang_list": "中文 / English / 日本語(稍微)",
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
      "nav_history": "Site Log",
      "link_utau": "Shouo Kuro UTAU Voicebank",
      "link_blog": "Heigao's Blog",
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
      "nav_history": "更新履歴",
      "link_utau": "「熵尾音 クロ」 UTAU 配布所",
      "link_blog": "黒篙のブログ",
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

  // 当前语言状态
  let currentLang = 'zh';

  // ==========================================
  // 3. 核心功能与逻辑
  // ==========================================

  // --- 切换侧边栏状态 ---
  function toggleSidebar() {
    if (!DOM.sidebarToggle || !DOM.sidebar || !DOM.overlay) return;
    DOM.sidebarToggle.classList.toggle('active');
    DOM.sidebar.classList.toggle('open');
    DOM.overlay.classList.toggle('active');
  }

  // --- 路由切换逻辑 (单页应用核心 SPA) ---
  function switchSection(hash) {
    // 安全处理与过滤非法字符
    let sectionId = (hash.replace('#', '') || 'home').trim();

    // 隐藏所有区块
    DOM.sections.forEach(section => {
      section.style.display = 'none';
    });

    // 查找并显示目标区块，若找不到则回退到 home
    const target = document.getElementById(`section-${sectionId}`);
    if (target) {
      target.style.display = 'block';
    } else {
      const defaultHome = document.getElementById('section-home');
      if (defaultHome) defaultHome.style.display = 'block';
      sectionId = 'home';
    }

    // 更新侧边栏导航链接的激活状态
    DOM.sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}` || (sectionId === 'home' && href === '#home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 移动端体验优化：切换区块后自动收起侧边栏
    if (DOM.sidebar && DOM.sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  }

  // --- 设置并渲染语言 ---
  function setLanguage(lang) {
    // 防错：如果目标语言不存在于字典中，则降级为中文
    if (!i18nData[lang]) lang = 'zh';
    currentLang = lang;

    // 更新网页基础信息
    if (i18nData[currentLang]["title"]) {
      document.title = i18nData[currentLang]["title"];
    }
    document.documentElement.lang = currentLang;

    // 根据缓存的 DOM 节点批量更新文本
    DOM.i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18nData[currentLang][key]) {
        el.innerText = i18nData[currentLang][key];
      }
    });

    // 更新语言切换按钮样式
    DOM.langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 将用户偏好存储到浏览器缓存
    localStorage.setItem('preferredLang', currentLang);
  }

  // --- 初始化系统偏好语言 ---
  function initLanguage() {
    let targetLang = localStorage.getItem('preferredLang');
    if (!targetLang) {
      // 智能回退机制：根据操作系统语言选择匹配配置
      const sysLang = navigator.language.toLowerCase();
      if (sysLang.startsWith('zh')) targetLang = 'zh';
      else if (sysLang.startsWith('en')) targetLang = 'en';
      else if (sysLang.startsWith('ja')) targetLang = 'ja';
      else targetLang = 'zh';
    }
    setLanguage(targetLang);
  }

  // ==========================================
  // 4. 事件监听器绑定
  // ==========================================
  
  if (DOM.sidebarToggle) DOM.sidebarToggle.addEventListener('click', toggleSidebar);
  if (DOM.overlay) DOM.overlay.addEventListener('click', toggleSidebar);

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
  // 5. 执行初始渲染
  // ==========================================
  
  // 注入动态版权年份
  if (DOM.yearElement) {
    DOM.yearElement.innerText = new Date().getFullYear();
  }

  // 初始化语言配置和 URL 路由
  initLanguage();
  switchSection(window.location.hash);

});