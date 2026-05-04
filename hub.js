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
      "link_utau": "「熵尾音 咬青」 UTAU 展示页",
      "card2_title": "✦ 工具 & 工作流",
      "about_p1": "你好，我是黑篙 (Heigao)。",
      "about_p2": "目前专注于「熵尾音 咬青」的音源开发与完善，同时也在学习更多你所能想到的各种事物。",
      "about_p3": "我认为即便是在算法推荐的时代，能在网络上拥有一个独立于社交媒体、属于自己的空间，依然是一件很酷且浪漫、令人感到安心的事。",
      "about_lang": "沟通语言",
      "lang_list": "中文 / English / 日本語(稍微)",
      "about_status": "当前状态",
      "local_time": "本地时间",
      "back_home": "← 返回主页",
      "tooltip_utau": "经典与开源的歌声合成引擎",
      "tooltip_csp": "专业的数字插画与漫画绘制软件",
      "tooltip_adobe": "行业标准的图形处理与视频后期套件",
      "tooltip_logic": "专业的数字音频工作站 (DAW)",
      "tooltip_vscode": "跨平台的轻量级开源代码编辑器",
      "tooltip_opencode": "终端驱动的开源 AI 代码助手"
    },
    "en": {
      "name": "Heigao (黑篙)",
      "title": "Heigao Hub | Portfolio & Links",
      "bio": "Digital Creator / UTAU / Art",
      "nav_home": "Home",
      "nav_about": "About Heigao🌌",
      "nav_gallery": "Selected Works",
      "nav_history": "Site Log",
      "link_utau": "Kousei UTAU Voicebank",
      "card2_title": "✦ Tools & Workflow",
      "about_p1": "Hi, I'm Heigao.",
      "about_p2": "Currently developing the UTAU voicebank 'Kousei' while learning as many things as you can imagine.",
      "about_p3": "I think that even in the age of algorithms, having a space on the web independent of social media and truly your own is still something cool, romantic, and reassuring.",
      "about_lang": "Languages",
      "lang_list": "Chinese / English / Japanese (A little)",
      "about_status": "Status",
      "local_time": "Local Time",
      "back_home": "← Back to Home",
      "tooltip_utau": "Classic open-source vocal synthesis engine",
      "tooltip_csp": "Professional digital illustration & comic software",
      "tooltip_adobe": "Industry-standard graphic & video post-production suite",
      "tooltip_logic": "Professional digital audio workstation (DAW)",
      "tooltip_vscode": "Cross-platform lightweight open-source code editor",
      "tooltip_opencode": "Terminal-driven open-source AI coding assistant"
    },
    "ja": {
      "name": "黒篙 Heigao",
      "title": "黒篙 Heigao | ポートフォリオ",
      "bio": "デジタルクリエイター / UTAU / アート",
      "nav_home": "ホーム",
      "nav_about": "プロフィール🌌",
      "nav_gallery": "作品ピックアップ",
      "nav_history": "更新履歴",
      "link_utau": "「熵尾音 こうせい」 UTAU 配布所",
      "card2_title": "✦ ツール & ワークフロー",
      "about_p1": "こんにちは、黒篙（Heigao）です。",
      "about_p2": "現在はUTAU音源「熵尾音 こうせい」の開発を中心に、思いつく限りのさまざまなことを学んでいます。",
      "about_p3": "アルゴリズムの時代であっても、ソーシャルメディアから独立した、自分だけのウェブ上の空間を持つことは、今でもクールでロマンチックで、そして安心できることだと思います。",
      "about_lang": "対応言語",
      "lang_list": "中国語 / 英語 / 日本語(少し)",
      "about_status": "現在の状況",
      "local_time": "現地時間",
      "back_home": "← ホームに戻る",
      "tooltip_utau": "クラシックなオープンソース歌声合成エンジン",
      "tooltip_csp": "プロ向けデジタルイラスト・漫画制作ソフト",
      "tooltip_adobe": "業界標準のグラフィック・映像ポストプロダクションスイート",
      "tooltip_logic": "プロ仕様のデジタルオーディオワークステーション (DAW)",
      "tooltip_vscode": "クロスプラットフォームの軽量オープンソースコードエディタ",
      "tooltip_opencode": "端末駆動のオープンソースAIコーディングアシスタント"
    }
  };

  // ==========================================
  // 3. 基础功能: 动态年份、侧边栏控制、单页路由
  // ==========================================
  
  if (DOM.yearElement) {
    const START_YEAR = 2026;
    const year = new Date().getFullYear();
    DOM.yearElement.textContent = year === START_YEAR ? String(START_YEAR) : START_YEAR + '\u2013' + year;
  }

  function toggleSidebar() {
    if (DOM.sidebarToggle) DOM.sidebarToggle.classList.toggle('active');
    DOM.sidebar.classList.toggle('open');
    DOM.overlay.classList.toggle('active');
    const isOpen = DOM.sidebar.classList.contains('open');
    if (DOM.sidebarToggle) DOM.sidebarToggle.setAttribute('aria-expanded', isOpen);
  }

  if (DOM.sidebarToggle) DOM.sidebarToggle.addEventListener('click', toggleSidebar);
  if (DOM.overlay) DOM.overlay.addEventListener('click', toggleSidebar);

  function switchSection(targetId) {
    DOM.sections.forEach(sec => sec.classList.remove('active'));
    DOM.sidebarLinks.forEach(link => link.classList.remove('active'));
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      const activeLink = document.querySelector(`.sidebar-link[data-target="${targetId}"]`);
      if (activeLink) activeLink.classList.add('active');
      const contentArea = document.querySelector('.content-area');
      if (contentArea) contentArea.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }

  // 监听 Hash 变化实现纯前端路由
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'home';
    switchSection(`section-${hash}`);
    if (window.innerWidth <= 768 && DOM.sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  });

  // 初始化路由状态
  if (window.location.hash) {
    const initHash = window.location.hash.substring(1) || 'home';
    switchSection(`section-${initHash}`);
  }

  // ==========================================
  // 4. 多语言切换引擎
  // ==========================================
  function setLanguage(lang) {
    const dict = i18nData[lang] || i18nData['zh'];
    
    DOM.i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
      const key = el.getAttribute('data-i18n-tooltip');
      if (dict[key]) {
        el.setAttribute('data-tooltip', dict[key]);
      }
    });

    document.title = dict['title'];
    document.documentElement.lang = lang === 'en' ? 'en' : (lang === 'ja' ? 'ja' : 'zh-CN');

    DOM.langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    try { localStorage.setItem('preferredLang', lang); } catch(e) {}
    if (typeof window.restartTypewriter === 'function') window.restartTypewriter();
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

  DOM.langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      setLanguage(e.target.getAttribute('data-lang'));
    });
  });

  initLanguage();

  // ==========================================
  // 5. 亮暗模式 (Theme Toggle) & 粒子颜色桥接
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
    if (themeIcon) {
      themeIcon.setAttribute('href', theme === 'dark' ? '#icon-sun' : '#icon-moon');
    }
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? darkBgColor : lightBgColor);
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式');
    }

    // 触发粒子背景引擎的颜色切换逻辑
    if (typeof window.updateParticleTheme === 'function') {
      window.updateParticleTheme(theme);
    }
  }

  function toggleTheme() {
    var theme = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('theme', theme); } catch(e) {}
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // 初始化时同步系统偏好及粒子颜色
  setTheme(getTheme());

  const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemDarkQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==========================================
  // 6. 极简版 Lightbox 画廊逻辑 (带缩放与拖拽)
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');
  const lbDate = document.getElementById('lightbox-date');
  const lbCloseBtn = document.querySelector('.lightbox-close');
  const zoomBtns = document.querySelectorAll('.zoom-btn');
  
  let scale = 1;
  let isDragging = false;
  let startX, startY, lbTx = 0, lbTy = 0;

  function updateTransform() {
    lightboxImg.style.transform = `translate(${lbTx}px, ${lbTy}px) scale(${scale})`;
  }

  function resetLightbox() {
    scale = 1; lbTx = 0; lbTy = 0;
    updateTransform();
  }

  function openLightbox(item) {
    const img = item.querySelector('img');
    if(!img) return;
    
    lightboxImg.src = img.dataset.full || img.src;
    
    const nameEl = item.querySelector('.gallery-name');
    const dateEl = item.querySelector('.gallery-date');
    lbTitle.textContent = nameEl ? nameEl.textContent : '';
    lbDate.textContent = dateEl ? dateEl.textContent : '';

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; 
    resetLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') openLightbox(item);
    });
  });

  if(lbCloseBtn) lbCloseBtn.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
  
  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 缩放控制
  zoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.getAttribute('data-zoom');
      if (action === 'in' && scale < 4) scale += 0.5;
      if (action === 'out' && scale > 0.5) scale -= 0.5;
      updateTransform();
    });
  });

  // 拖拽逻辑 (鼠标与触摸通用)
  function handleDragStart(e) {
    if (scale <= 1) return;
    isDragging = true;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    startX = clientX - lbTx;
    startY = clientY - lbTy;
    lightboxImg.style.cursor = 'grabbing';
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    lbTx = clientX - startX;
    lbTy = clientY - startY;
    updateTransform();
  }

  function handleDragEnd() {
    isDragging = false;
    lightboxImg.style.cursor = 'default';
  }

  lightboxImg.addEventListener('mousedown', handleDragStart);
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleDragEnd);

  // 触摸事件
  lightboxImg.addEventListener('touchstart', handleDragStart, { passive: true });
  window.addEventListener('touchmove', handleDragMove, { passive: true });
  window.addEventListener('touchend', handleDragEnd);

  // 双指缩放简单支持 (Pinch)
  let initialDistance = 0;
  lightboxImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      initialDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
    }
  }, { passive: true });

  lightboxImg.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      if (currentDistance > initialDistance + 10 && scale < 4) {
        scale += 0.05; initialDistance = currentDistance;
      } else if (currentDistance < initialDistance - 10 && scale > 0.5) {
        scale -= 0.05; initialDistance = currentDistance;
      }
      updateTransform();
    }
  }, { passive: true });

  // ==========================================
  // 7. UTAU 试听播放器 + 音频可视化联动
  // ==========================================
  const utauAudio = document.getElementById('utau-demo');
  const utauPlayBtn = document.getElementById('utauPlayBtn');
  const playIconEl = document.getElementById('playIcon');

  if (utauAudio && utauPlayBtn) {
    utauPlayBtn.addEventListener('click', () => {
      if (utauAudio.paused) {
        utauAudio.play().then(() => {
          utauPlayBtn.classList.add('playing');
          playIconEl.setAttribute('href', '#icon-pause');
        }).catch(err => console.warn('Audio play failed:', err));
      } else {
        utauAudio.pause();
        utauPlayBtn.classList.remove('playing');
        playIconEl.setAttribute('href', '#icon-play');
      }
    });

    utauAudio.addEventListener('ended', () => {
      utauPlayBtn.classList.remove('playing');
      playIconEl.setAttribute('href', '#icon-play');
    });
  }

  // ==========================================
  // 8. 互动粒子背景引擎 (完美复刻原版镂空与阴影特征)
  // 【史诗级修复】：采用真实“无限跑步机”与“屏幕中心对齐”引擎，彻底解决重叠溶解及手机端错位问题。
  // ==========================================
  const bgCanvas = document.getElementById('bg-canvas');
  const isMobile = window.innerWidth < 768;
  if (bgCanvas && !isMobile) {
    const ctx = bgCanvas.getContext('2d', { alpha: true });
    let width, height;
    let particleArray = [];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // 【核心性能修复】：动态分辨率

    const fontSizePx = window.innerWidth * 0.08;

    const engineConfig = {
      font: `900 ${fontSizePx}px "Jost", "HarmonyOS Sans", sans-serif`,
      color: 'rgba(255, 255, 255, 0.15)', 
      step: 6,
      particleSize: 2,    
      mouseRadius: prefersReducedMotion ? 0 : 160, 
      spring: 0.08,
      friction: 0.85,
      rows: [
        { pattern: "HEIGAO HUB ✦   ", speed: prefersReducedMotion ? 0 : 0.6, yOffset: -0.16 },
        { pattern: "PORTFOLIO & WORKS ✦   ", speed: prefersReducedMotion ? 0 : -0.6, yOffset: 0 },
        { pattern: "UTAU / CREATOR / ART ✦   ", speed: prefersReducedMotion ? 0 : 0.6, yOffset: 0.16 }
      ]
    };

    window.updateParticleTheme = function(theme) {
      if (theme === 'dark') {
        engineConfig.color = 'rgba(255, 255, 255, 0.15)'; 
      } else {
        engineConfig.color = 'rgba(44, 53, 69, 0.15)';       
      }
    };
    
    window.updateParticleTheme(getTheme());

    let mouse = { x: -1000, y: -1000 };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', (e) => {
        const dx = e.clientX - window.innerWidth / 2;
        const dy = e.clientY - window.innerHeight / 2;
        const angle = 12 * Math.PI / 180; 
        mouse.x = (dx * Math.cos(angle) - dy * Math.sin(angle)) + width / 2;
        mouse.y = (dx * Math.sin(angle) + dy * Math.cos(angle)) + height / 2;
      });
      
      window.addEventListener('touchmove', (e) => {
        if(e.touches.length > 0) {
            const dx = e.touches[0].clientX - window.innerWidth / 2;
            const dy = e.touches[0].clientY - window.innerHeight / 2;
            const angle = 12 * Math.PI / 180; 
            mouse.x = (dx * Math.cos(angle) - dy * Math.sin(angle)) + width / 2;
            mouse.y = (dx * Math.sin(angle) + dy * Math.cos(angle)) + height / 2;
        }
      }, { passive: true });
    }

    class ParticleText {
      constructor(x, y, speed, wrapWidth, rowIndex) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = 0; 
        this.vy = 0; 
        this.speed = speed;
        this.wrapWidth = wrapWidth; 
        this.originalX = x;
        this.rowIndex = rowIndex;
        this.density = (Math.random() * 20) + 5;
      }

      draw() {
        ctx.fillStyle = engineConfig.color;
        ctx.fillRect(this.x, this.y, engineConfig.particleSize, engineConfig.particleSize);
      }

      update() {
        if (this.speed !== 0) {
          this.baseX -= this.speed;
        }

        const leftBound = -this.wrapWidth;
        const rightBound = width + this.wrapWidth;

        if (this.speed > 0 && this.baseX < leftBound) {
          const shift = Math.ceil((rightBound - this.baseX) / this.wrapWidth) * this.wrapWidth;
          this.baseX += shift;
          this.x += shift;
        } else if (this.speed < 0 && this.baseX > rightBound) {
          const shift = Math.ceil((this.baseX - leftBound) / this.wrapWidth) * this.wrapWidth;
          this.baseX -= shift;
          this.x -= shift;
        }

        if (engineConfig.mouseRadius > 0 && mouse.x > -500) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          // 一个微小的碰撞优化：先用粗略的正方形边界判定过滤，再进行精准开方运算
          if (Math.abs(dx) < engineConfig.mouseRadius && Math.abs(dy) < engineConfig.mouseRadius) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < engineConfig.mouseRadius) {
              let force = (engineConfig.mouseRadius - distance) / engineConfig.mouseRadius;
              let forceDirectionX = dx / distance;
              let forceDirectionY = dy / distance;
              this.vx -= forceDirectionX * force * this.density;
              this.vy -= forceDirectionY * force * this.density;
            }
          }
        }

        this.vx += (this.baseX - this.x) * engineConfig.spring;
        this.vy += (this.baseY - this.y) * engineConfig.spring;
        this.vx *= engineConfig.friction;
        this.vy *= engineConfig.friction;
        
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    function initParticleEngine() {
      particleArray = [];
      width = bgCanvas.width = window.innerWidth * 2;
      height = bgCanvas.height = window.innerHeight * 2;

      ctx.font = engineConfig.font;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      const centerY = height / 2;

      engineConfig.rows.forEach(row => {
        row.wrapWidth = 0;
        row.y = 0;
        row.rowScroll = 0;
      });

      engineConfig.rows.forEach(row => {
        // 计算每一段精准的重复宽度
        let exactWidth = ctx.measureText(row.pattern).width;
        row.wrapWidth = Math.ceil(exactWidth / engineConfig.step) * engineConfig.step;
        // 计算动态竖向位置，保证居中
        row.y = centerY + (height * row.yOffset);

        // 【核心修复】：直接把这个句子在整张加长画布上从左到右像贴墙纸一样画满
        // 起始点往前退一格，防止鼠标划动时左侧产生穿帮
        for (let startX = -row.wrapWidth; startX < width + row.wrapWidth; startX += row.wrapWidth) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; 
          ctx.fillText(row.pattern, startX + 12, row.y + 12);
        }
      });

      const textData = ctx.getImageData(0, 0, width, height);
      ctx.clearRect(0, 0, width, height);

      for (let y = 0; y < height; y += engineConfig.step) {
        for (let x = 0; x < width; x += engineConfig.step) {
          if (textData.data[(y * 4 * width) + (x * 4) + 3] > 80) {
            let assignedSpeed = 0;
            let wrapWidth = 0;
            let rowIndex = 0;
            
            if (y < engineConfig.rows[0].y + (height * 0.04)) {
              assignedSpeed = engineConfig.rows[0].speed;
              wrapWidth = engineConfig.rows[0].wrapWidth;
              rowIndex = 0;
            } else if (y < engineConfig.rows[1].y + (height * 0.04)) {
              assignedSpeed = engineConfig.rows[1].speed;
              wrapWidth = engineConfig.rows[1].wrapWidth;
              rowIndex = 1;
            } else {
              assignedSpeed = engineConfig.rows[2].speed;
              wrapWidth = engineConfig.rows[2].wrapWidth;
              rowIndex = 2;
            }

            if (x < wrapWidth) {
              const minK = -1; 
              const maxK = Math.ceil(width / wrapWidth) + 1;
              
              for (let k = minK; k <= maxK; k++) {
                let cloneX = x + k * wrapWidth;
                particleArray.push(new ParticleText(cloneX, y, assignedSpeed, wrapWidth, rowIndex));
              }
            }
          }
        }
      }
    }

    function animateParticleEngine() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      requestAnimationFrame(animateParticleEngine);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initParticleEngine();
        animateParticleEngine();
      });
    } else {
      initParticleEngine();
      animateParticleEngine();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initParticleEngine, 300);
    });
  }

  // ==========================================
  // 9. GitHub 活动看板 (About 页)
  // ==========================================
  (function loadGithubActivity() {
    const cardText = document.querySelector('.github-activity-text');
    if (!cardText) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    fetch('https://api.github.com/users/Heigao-Clank/events/public', { signal: controller.signal })
      .then(res => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(events => {
        const push = events.find(e => e.type === 'PushEvent');
        if (!push) {
          cardText.textContent = '最近活动：暂无推送记录';
          return;
        }
        const date = new Date(push.created_at);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const repo = push.repo.name;
        cardText.textContent = '最近活动：' + y + '.' + m + '.' + d + ' 推送至 ' + repo;
      })
      .catch(() => {
        cardText.textContent = 'GitHub 信号休眠中';
      });
  })();

  (function startLocalClock() {
    const clockEl = document.getElementById('heigao-clock');
    if (!clockEl) return;
    function tick() {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      clockEl.textContent = formatter.format(now).replace(/\//g, ':') + ' (UTC+8)';
    }
    tick();
    setInterval(tick, 1000);
  })();

  (function initTypewriter() {
    const el = document.getElementById('dynamic-status');
    if (!el) return;

    const phrases = {
      'zh-CN': ["缓慢填坑中...", "正在构思新作品...", "有了新灵感，正在脑暴", "沉迷于梦境中"],
      'en': ["Slowly chipping away at WIPs...", "Brainstorming new ideas...", "Drinking bubble tea", "Lost in code"],
      'ja': ["ちまちま進捗中...", "新作を構想中...", "タピオカミルクティーを飲んだ", "コードに夢中"]
    };

    let timer = null;
    let running = false;
    let phraseIndex = 0;

    function stop() {
      running = false;
      clearTimeout(timer);
    }

    function type(text, i, resolve) {
      if (!running) return;
      el.textContent = text.slice(0, i + 1);
      if (i < text.length - 1) {
        timer = setTimeout(() => type(text, i + 1, resolve), 80 + Math.random() * 40);
      } else {
        resolve();
      }
    }

    function erase(text, i, resolve) {
      if (!running) return;
      el.textContent = text.slice(0, i);
      if (i > 0) {
        timer = setTimeout(() => erase(text, i - 1, resolve), 40 + Math.random() * 20);
      } else {
        resolve();
      }
    }

    function cycle() {
      if (!running) return;
      const lang = document.documentElement.lang || 'zh-CN';
      const list = phrases[lang] || phrases['zh-CN'];
      const text = list[phraseIndex % list.length];
      phraseIndex++;

      new Promise(resolve => type(text, 0, resolve))
        .then(() => new Promise(resolve => { timer = setTimeout(resolve, 60000); }))
        .then(() => new Promise(resolve => erase(text, text.length - 1, resolve)))
        .then(cycle);
    }

    function start() {
      stop();
      running = true;
      phraseIndex = 0;
      cycle();
    }

    start();
    window.restartTypewriter = function () { start(); };
  })();

});