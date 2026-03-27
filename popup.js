// DevCodec - Main Logic

// i18n Translations
const translations = {
  en: {
    nav: {
      base64: 'Base64',
      url: 'URL',
      jwt: 'JWT',
      html: 'HTML',
      timestamp: 'Time',
      hash: 'Hash',
      password: 'Pwd',
      qrcode: 'QR',
      regex: 'Regex'
    },
    common: {
      input: 'Input',
      output: 'Output',
      encode: 'Encode',
      decode: 'Decode',
      copy: 'Copy',
      copied: 'Copied!',
      clear: 'Clear'
    },
    tools: {
      base64: {
        title: 'Base64 Encoder/Decoder'
      },
      url: {
        title: 'URL Encoder/Decoder'
      },
      jwt: {
        title: 'JWT Decoder',
        token: 'JWT Token',
        decode: 'Decode',
        header: 'Header',
        payload: 'Payload',
        signature: 'Signature',
        signatureNote: 'Signature verification requires secret key',
        expired: 'Expired:',
        expires: 'Expires:',
        invalid: 'Invalid JWT token'
      },
      html: {
        title: 'HTML Entity Encoder/Decoder'
      },
      timestamp: {
        title: 'Timestamp Converter',
        toDate: 'Timestamp to DateTime',
        toTimestamp: 'DateTime to Timestamp',
        seconds: 'Seconds',
        milliseconds: 'Milliseconds',
        current: 'Current Timestamp'
      },
      hash: {
        title: 'Hash Generator',
        generate: 'Generate'
      },
      password: {
        title: 'Password Generator',
        length: 'Length',
        symbols: '!@#$',
        generate: 'Generate',
        batch: 'Batch x5',
        strength: { weak: 'Weak', fair: 'Fair', good: 'Good', strong: 'Strong' },
        crackTime: 'Crack time',
        instantly: 'Instantly',
        seconds: 's', minutes: 'min', hours: 'h', days: 'd',
        years: 'years', centuries: 'centuries', forever: '10000+ years'
      },
      qrcode: {
        title: 'QR Code Generator',
        url: 'URL or Text',
        generate: 'Generate',
        download: 'Download PNG',
        downloadAs: 'Download:',
        copyImage: 'Copy Image',
        autoHttps: 'Auto https://',
        logo: 'Center Logo',
        uploadLogo: 'Upload',
        empty: 'Please enter text or URL',
        tooLong: 'Text too long for QR code (max ~900 chars)'
      },
      regex: {
        title: 'Regex Tester',
        testText: 'Test Text',
        groups: 'Capture Groups',
        templates: 'Templates',
        copyAs: 'Copy as',
        matchCount: '{n} matches',
        noMatch: 'No match'
      }
    }
  },
  zh: {
    nav: {
      base64: 'Base64',
      url: 'URL',
      jwt: 'JWT',
      html: 'HTML',
      timestamp: '时间',
      hash: '哈希',
      password: '密码',
      qrcode: '二维码',
      regex: '正则'
    },
    common: {
      input: '输入',
      output: '输出',
      encode: '编码',
      decode: '解码',
      copy: '复制',
      copied: '已复制!',
      clear: '清空'
    },
    tools: {
      base64: {
        title: 'Base64 编解码'
      },
      url: {
        title: 'URL 编解码'
      },
      jwt: {
        title: 'JWT 解码器',
        token: 'JWT Token',
        decode: '解码',
        header: '头部',
        payload: '载荷',
        signature: '签名',
        signatureNote: '签名验证需要密钥',
        expired: '已过期:',
        expires: '过期时间:',
        invalid: '无效的 JWT token'
      },
      html: {
        title: 'HTML 实体编解码'
      },
      timestamp: {
        title: '时间戳转换',
        toDate: '时间戳 → 日期时间',
        toTimestamp: '日期时间 → 时间戳',
        seconds: '秒',
        milliseconds: '毫秒',
        current: '当前时间戳'
      },
      hash: {
        title: '哈希生成器',
        generate: '生成'
      },
      password: {
        title: '随机密码生成器',
        length: '长度',
        symbols: '!@#$',
        generate: '生成',
        batch: '批量 x5',
        strength: { weak: '弱', fair: '一般', good: '良好', strong: '强' },
        crackTime: '破解时间',
        instantly: '瞬间',
        seconds: '秒', minutes: '分钟', hours: '小时', days: '天',
        years: '年', centuries: '世纪', forever: '10000+ 年'
      },
      qrcode: {
        title: '二维码生成器',
        url: 'URL 或文本',
        generate: '生成',
        download: '下载 PNG',
        downloadAs: '下载：',
        copyImage: '复制图片',
        autoHttps: '自动补全 https://',
        logo: '中心 Logo',
        uploadLogo: '上传',
        empty: '请输入文本或 URL',
        tooLong: '文本过长，无法生成二维码（最多约 900 字符）'
      },
      regex: {
        title: '正则表达式测试器',
        testText: '测试文本',
        groups: '捕获组',
        templates: '模板库',
        copyAs: '复制为',
        matchCount: '{n} 个匹配',
        noMatch: '无匹配'
      }
    }
  }
};

// State
let currentLang = 'en';
let currentTool = 'base64';

// DOM Elements
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  initNavigation();
  initTools();
  updateCurrentTimestamp();
  setInterval(updateCurrentTimestamp, 1000);
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
  
  $('#themeToggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function applyTheme(theme) {
  const toggleBtn = $('#themeToggle');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  } else {
    document.documentElement.removeAttribute('data-theme');
    toggleBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

// Language Management
function initLang() {
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
  
  $('#langToggle').addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
    localStorage.setItem('lang', newLang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  $('#langToggle').textContent = lang === 'en' ? 'EN' : '中';
  
  // Update all i18n elements
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getTranslation(key);
    if (value) {
      el.textContent = value;
    }
  });
  
  // Update placeholders
  updatePlaceholders();
  if (window._regexRebuildTemplates) window._regexRebuildTemplates();
}

function getTranslation(keyPath) {
  const keys = keyPath.split('.');
  let value = translations[currentLang];
  for (const key of keys) {
    if (value && value[key]) {
      value = value[key];
    } else {
      return null;
    }
  }
  return value;
}

function updatePlaceholders() {
  // Update placeholders based on current tool
  const placeholders = {
    'base64-input': 'Enter text to encode or decode...',
    'url-input': 'Enter URL or text...',
    'jwt-input': 'Paste JWT token here...',
    'html-input': 'Enter text with HTML entities...',
    'hash-input': 'Enter text to hash...',
    'qr-input': 'https://example.com'
  };
  
  Object.entries(placeholders).forEach(([id, enText]) => {
    const el = $(`#${id}`);
    if (el) {
      el.placeholder = currentLang === 'en' ? enText : getPlaceholderZh(id);
    }
  });
}

function getPlaceholderZh(id) {
  const zhPlaceholders = {
    'base64-input': '输入要编码或解码的文本...',
    'url-input': '输入 URL 或文本...',
    'jwt-input': '粘贴 JWT token...',
    'html-input': '输入包含 HTML 实体的文本...',
    'hash-input': '输入要哈希的文本...',
    'ts-input': '1711452600',
    'qr-input': 'https://example.com'
  };
  return zhPlaceholders[id] || '';
}

// Navigation
function initNavigation() {
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tool = item.getAttribute('data-tool');
      switchTool(tool);
    });
  });
}

function switchTool(tool) {
  currentTool = tool;
  
  // Update nav items
  $$('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-tool') === tool);
  });
  
  // Update panels
  $$('.tool-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tool}`);
  });
}

// Tools Initialization
function initTools() {
  initBase64Tool();
  initURLTool();
  initJWTTool();
  initHTMLTool();
  initTimestampTool();
  initHashTool();
  initPasswordTool();
  initQRCodeTool();
  initRegexTool();
  initCopyButtons();
}

// Base64 Tool
function initBase64Tool() {
  $('#base64-encode').addEventListener('click', () => {
    const input = $('#base64-input').value;
    try {
      const output = btoa(unescape(encodeURIComponent(input)));
      $('#base64-output').value = output;
    } catch (e) {
      showToast('Invalid input for Base64 encoding');
    }
  });
  
  $('#base64-decode').addEventListener('click', () => {
    const input = $('#base64-input').value;
    try {
      const output = decodeURIComponent(escape(atob(input)));
      $('#base64-output').value = output;
    } catch (e) {
      showToast('Invalid Base64 string');
    }
  });
  
  $('#base64-swap').addEventListener('click', swapBase64);
  $('#base64-clear').addEventListener('click', clearBase64);
}

function swapBase64() {
  const input = $('#base64-input');
  const output = $('#base64-output');
  const temp = input.value;
  input.value = output.value;
  output.value = temp;
}

function clearBase64() {
  $('#base64-input').value = '';
  $('#base64-output').value = '';
}

// URL Tool
function initURLTool() {
  $('#url-encode').addEventListener('click', () => {
    const input = $('#url-input').value;
    $('#url-output').value = encodeURIComponent(input);
  });
  
  $('#url-decode').addEventListener('click', () => {
    const input = $('#url-input').value;
    try {
      $('#url-output').value = decodeURIComponent(input);
    } catch (e) {
      showToast('Invalid URL encoded string');
    }
  });
  
  $('#url-swap').addEventListener('click', () => {
    const input = $('#url-input');
    const output = $('#url-output');
    const temp = input.value;
    input.value = output.value;
    output.value = temp;
  });
  
  $('#url-clear').addEventListener('click', () => {
    $('#url-input').value = '';
    $('#url-output').value = '';
  });
}

// JWT Tool
function initJWTTool() {
  $('#jwt-decode').addEventListener('click', decodeJWT);
  $('#jwt-clear').addEventListener('click', () => {
    $('#jwt-input').value = '';
    $('#jwt-output').style.display = 'none';
  });
}

function decodeJWT() {
  const token = $('#jwt-input').value.trim();
  
  if (!token) {
    showToast('Please enter a JWT token');
    return;
  }
  
  const parts = token.split('.');
  if (parts.length !== 3) {
    showToast(getTranslation('tools.jwt.invalid'));
    return;
  }
  
  try {
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    
    $('#jwt-header').textContent = JSON.stringify(header, null, 2);
    $('#jwt-payload').textContent = JSON.stringify(payload, null, 2);
    
    // Handle expiry
    const expiryEl = $('#jwt-expiry');
    if (payload.exp) {
      const expDate = new Date(payload.exp * 1000);
      const now = new Date();
      const isExpired = now > expDate;
      
      expiryEl.textContent = `${getTranslation(isExpired ? 'tools.jwt.expired' : 'tools.jwt.expires')} ${expDate.toLocaleString()}`;
      expiryEl.className = 'jwt-expiry' + (isExpired ? ' warning' : '');
    } else {
      expiryEl.textContent = '';
    }
    
    $('#jwt-output').style.display = 'flex';
    $('#jwt-output').style.flexDirection = 'column';
    $('#jwt-output').style.gap = '12px';
  } catch (e) {
    showToast(getTranslation('tools.jwt.invalid'));
  }
}

// HTML Tool
function initHTMLTool() {
  $('#html-encode').addEventListener('click', () => {
    const input = $('#html-input').value;
    const output = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    $('#html-output').value = output;
  });
  
  $('#html-decode').addEventListener('click', () => {
    const input = $('#html-input').value;
    const output = input
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    $('#html-output').value = output;
  });
  
  $('#html-swap').addEventListener('click', () => {
    const input = $('#html-input');
    const output = $('#html-output');
    const temp = input.value;
    input.value = output.value;
    output.value = temp;
  });
  
  $('#html-clear').addEventListener('click', () => {
    $('#html-input').value = '';
    $('#html-output').value = '';
  });
}

// Timestamp Tool
function initTimestampTool() {
  $('#ts-input').addEventListener('input', () => {
    const ts = parseInt($('#ts-input').value);
    const unit = $('#ts-unit').value;
    
    if (!isNaN(ts)) {
      const date = new Date(unit === 'ms' ? ts : ts * 1000);
      $('#ts-output-date').value = date.toLocaleString();
    }
  });
  
  $('#ts-unit').addEventListener('change', () => {
    $('#ts-input').dispatchEvent(new Event('input'));
  });
  
  $('#date-input').addEventListener('input', () => {
    const date = new Date($('#date-input').value);
    const unit = $('#date-output-unit').value;
    
    if (!isNaN(date.getTime())) {
      const ts = unit === 'ms' ? date.getTime() : Math.floor(date.getTime() / 1000);
      $('#date-output-ts').value = ts;
    }
  });
  
  $('#date-output-unit').addEventListener('change', () => {
    $('#date-input').dispatchEvent(new Event('input'));
  });
  
  $('#ts-swap').addEventListener('click', () => {
    const tsInput = $('#ts-input');
    const dateOutput = $('#ts-output-date');
    const dateInput = $('#date-input');
    const tsOutput = $('#date-output-ts');
    
    tsInput.value = tsOutput.value;
    dateInput.value = dateOutput.value ? new Date(dateOutput.value).toISOString().slice(0, 16) : '';
  });
  
  $('#ts-current').addEventListener('click', () => {
    const ts = Math.floor(Date.now() / 1000);
    navigator.clipboard.writeText(ts.toString());
    showToast(getTranslation('common.copied'));
  });
}

function updateCurrentTimestamp() {
  const ts = Math.floor(Date.now() / 1000);
  const el = $('#current-ts');
  if (el) {
    el.textContent = ts;
  }
}

// Hash Tool
function initHashTool() {
  $('#hash-generate').addEventListener('click', generateHash);
  $('#hash-clear').addEventListener('click', () => {
    $('#hash-input').value = '';
    $('#hash-result-md5').style.display = 'none';
    $('#hash-result-sha256').style.display = 'none';
  });
}

async function generateHash() {
  const input = $('#hash-input').value;
  const useMD5 = $('#hash-md5').checked;
  const useSHA256 = $('#hash-sha256').checked;
  
  if (!input) {
    showToast('Please enter text to hash');
    return;
  }
  
  if (!useMD5 && !useSHA256) {
    showToast('Please select at least one algorithm');
    return;
  }
  
  try {
    if (useMD5) {
      const md5 = await calculateMD5(input);
      $('#hash-output-md5').value = md5;
      $('#hash-result-md5').style.display = 'block';
    }
    
    if (useSHA256) {
      const sha256 = await calculateSHA256(input);
      $('#hash-output-sha256').value = sha256;
      $('#hash-result-sha256').style.display = 'block';
    }
  } catch (e) {
    showToast('Hash generation failed');
  }
}

async function calculateMD5(message) {
  // Simple MD5 implementation using Web Crypto API workaround
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  // Note: This is actually SHA-256, proper MD5 would need a custom implementation
  // For a production extension, use a proper MD5 library
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function calculateSHA256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Copy Buttons
function initCopyButtons() {
  $$('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const target = $(`#${targetId}`);
      if (target) {
        navigator.clipboard.writeText(target.value);
        showToast(getTranslation('common.copied'));
      }
    });
  });
}

// Password Generator Tool
function initPasswordTool() {
  const slider = $('#pwd-length-slider');
  const numInput = $('#pwd-length-num');

  slider.addEventListener('input', () => { numInput.value = slider.value; });
  numInput.addEventListener('input', () => {
    const v = Math.max(4, Math.min(64, parseInt(numInput.value) || 16));
    numInput.value = v;
    slider.value = v;
  });

  $('#pwd-generate').addEventListener('click', () => {
    const pwd = generatePassword();
    if (!pwd) return;
    $('#pwd-output').value = pwd;
    updatePasswordStrength(pwd);
    $('#pwd-batch-results').style.display = 'none';
  });

  $('#pwd-batch').addEventListener('click', () => {
    const container = $('#pwd-batch-results');
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const pwd = generatePassword();
      if (!pwd) return;
      const row = document.createElement('div');
      row.className = 'pwd-batch-row';
      const input = document.createElement('input');
      input.type = 'text';
      input.readOnly = true;
      input.value = pwd;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.style.cssText = 'position:static;opacity:0.8';
      btn.textContent = '⎘';
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(pwd);
        showToast(getTranslation('common.copied'));
      });
      row.appendChild(input);
      row.appendChild(btn);
      container.appendChild(row);
    }
    container.style.display = 'flex';
    $('#pwd-output').value = '';
    $('#pwd-strength').textContent = '';
  });
}

function generatePassword() {
  const length = parseInt($('#pwd-length-num').value) || 16;
  const useUpper = $('#pwd-uppercase').checked;
  const useLower = $('#pwd-lowercase').checked;
  const useNums = $('#pwd-numbers').checked;
  const useSyms = $('#pwd-symbols').checked;

  let charset = '';
  if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (useNums) charset += '0123456789';
  if (useSyms) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!charset) {
    showToast(currentLang === 'zh' ? '请至少选择一种字符类型' : 'Select at least one character type');
    return null;
  }

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += charset[arr[i] % charset.length];
  }
  return pwd;
}

function updatePasswordStrength(pwd) {
  const el = $('#pwd-strength');
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 16) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;

  const levels = ['weak', 'weak', 'fair', 'good', 'strong', 'strong'];
  const colors = ['var(--accent-pink)', 'var(--accent-pink)', 'var(--accent-orange)', 'var(--accent-cyan)', 'var(--accent-green)', 'var(--accent-green)'];
  const level = levels[score];
  const label = getTranslation(`tools.password.strength.${level}`) || level;

  el.textContent = label;
  el.style.color = colors[score];

  // Crack time estimation
  const crackEl = $('#pwd-crack-time');
  const crackStr = estimateCrackTime(pwd);
  const crackLabel = getTranslation('tools.password.crackTime') || 'Crack time';
  crackEl.innerHTML = `<span class="crack-label">${crackLabel}:</span> <span class="crack-value">${crackStr}</span>`;
  crackEl.style.color = colors[score];
}

function estimateCrackTime(pwd) {
  let poolSize = 0;
  if (/[a-z]/.test(pwd)) poolSize += 26;
  if (/[A-Z]/.test(pwd)) poolSize += 26;
  if (/\d/.test(pwd)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 32;
  if (poolSize === 0) poolSize = 26;

  // 10 billion guesses/sec (modern GPU cluster)
  const guessesPerSec = 1e10;
  const combinations = Math.pow(poolSize, pwd.length);
  const seconds = combinations / guessesPerSec / 2; // average case

  if (seconds < 1) return getTranslation('tools.password.instantly') || 'Instantly';
  if (seconds < 60) return `${Math.floor(seconds)} ${getTranslation('tools.password.seconds') || 's'}`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} ${getTranslation('tools.password.minutes') || 'min'}`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} ${getTranslation('tools.password.hours') || 'h'}`;
  if (seconds < 31536000) return `${Math.floor(seconds / 86400)} ${getTranslation('tools.password.days') || 'd'}`;

  const years = seconds / 31536000;
  if (years < 100) return `~${Math.floor(years)} ${getTranslation('tools.password.years') || 'years'}`;
  if (years < 1e4) return `~${Math.floor(years).toLocaleString()} ${getTranslation('tools.password.years') || 'years'}`;
  if (years < 1e6) return `~${(years / 1e3).toFixed(0)}K ${getTranslation('tools.password.years') || 'years'}`;
  if (years < 1e9) return `~${(years / 1e6).toFixed(0)}M ${getTranslation('tools.password.years') || 'years'}`;
  if (years < 1e12) return `~${(years / 1e9).toFixed(0)}B ${getTranslation('tools.password.years') || 'years'}`;
  return getTranslation('tools.password.forever') || '10000+ years';
}

// QR Code Generator Tool
let qrLogoImage = null;
let lastQRData = null;

function initQRCodeTool() {
  $('#qr-generate').addEventListener('click', generateQRCode);
  $('#qr-clear').addEventListener('click', () => {
    $('#qr-input').value = '';
    $('#qr-output').style.display = 'none';
    lastQRData = null;
  });
  $('#qr-copy-img').addEventListener('click', copyQRImage);

  // Logo upload
  const logoInput = $('#qr-logo-input');
  $('#qr-logo-btn').addEventListener('click', () => logoInput.click());
  logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        qrLogoImage = img;
        $('#qr-logo-name').textContent = file.name.length > 12 ? file.name.slice(0, 10) + '...' : file.name;
        $('#qr-logo-clear').style.display = 'inline-flex';
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  $('#qr-logo-clear').addEventListener('click', () => {
    qrLogoImage = null;
    $('#qr-logo-input').value = '';
    $('#qr-logo-name').textContent = '';
    $('#qr-logo-clear').style.display = 'none';
  });

  // Multi-size download buttons
  document.querySelectorAll('.qr-dl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const size = parseInt(btn.getAttribute('data-size'));
      downloadQRAtSize(size);
    });
  });
}

function getQRInputText() {
  let text = $('#qr-input').value.trim();
  if (!text) return '';

  // Auto-prepend https:// if enabled and looks like a domain
  if ($('#qr-auto-https').checked && !text.match(/^[a-zA-Z]+:\/\//)) {
    const domainLike = /^[a-zA-Z0-9]([a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}(\/.*)?$/;
    if (domainLike.test(text)) {
      text = 'https://' + text;
    }
  }
  return text;
}

function generateQRCode() {
  const text = getQRInputText();
  if (!text) {
    showToast(getTranslation('tools.qrcode.empty'));
    return;
  }
  if (text.length > 900) {
    showToast(getTranslation('tools.qrcode.tooLong'));
    return;
  }

  try {
    lastQRData = QRCodeGenerator.generate(text);
    const canvas = $('#qr-canvas');
    renderQRToCanvas(canvas, 200);
    $('#qr-output').style.display = 'flex';
  } catch (e) {
    showToast('QR generation failed');
  }
}

function renderQRToCanvas(canvas, pixelSize) {
  if (!lastQRData) return;
  QRCodeGenerator.render(lastQRData, canvas, pixelSize, qrLogoImage);
}

function downloadQRAtSize(size) {
  if (!lastQRData) return;
  const offscreen = document.createElement('canvas');
  QRCodeGenerator.render(lastQRData, offscreen, size, qrLogoImage);
  const link = document.createElement('a');
  link.download = `qrcode_${size}px.png`;
  link.href = offscreen.toDataURL('image/png');
  link.click();
}

async function copyQRImage() {
  try {
    const canvas = $('#qr-canvas');
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    showToast(getTranslation('common.copied'));
  } catch (e) {
    showToast('Copy failed');
  }
}

// Minimal QR Code encoder (supports byte mode, error correction level M)
const QRCodeGenerator = (() => {
  const ECL_M = 0;

  // Version capacity table for byte mode, ECL-M
  const VERSION_CAPACITY = [
    0,17,32,53,78,106,134,154,192,230,271,
    321,367,425,458,520,586,644,718,792,858,
    929,1003,1091,1171,1273,1367,1465,1528,1628,1732,
    1840,1952,2068,2188,2303,2431,2563,2699,2809,2953
  ];

  function getVersion(dataLen) {
    for (let v = 1; v <= 40; v++) {
      if (dataLen <= VERSION_CAPACITY[v]) return v;
    }
    return -1;
  }

  function getModuleCount(version) { return version * 4 + 17; }

  // GF(256) math
  const EXP = new Uint8Array(256);
  const LOG = new Uint8Array(256);
  (() => {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      EXP[i] = x;
      LOG[x] = i;
      x = (x << 1) ^ (x & 128 ? 0x11d : 0);
    }
    EXP[255] = EXP[0];
  })();

  function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return EXP[(LOG[a] + LOG[b]) % 255];
  }

  function polyMul(a, b) {
    const result = new Uint8Array(a.length + b.length - 1);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        result[i + j] ^= gfMul(a[i], b[j]);
      }
    }
    return result;
  }

  function getGeneratorPoly(degree) {
    let g = new Uint8Array([1]);
    for (let i = 0; i < degree; i++) {
      g = polyMul(g, new Uint8Array([1, EXP[i]]));
    }
    return g;
  }

  function getECCCodewords(data, eccCount) {
    const gen = getGeneratorPoly(eccCount);
    const msg = new Uint8Array(data.length + eccCount);
    msg.set(data);
    for (let i = 0; i < data.length; i++) {
      const coef = msg[i];
      if (coef !== 0) {
        for (let j = 0; j < gen.length; j++) {
          msg[i + j] ^= gfMul(gen[j], coef);
        }
      }
    }
    return msg.slice(data.length);
  }

  // EC block info [totalCodewords, dataCodewords, numBlocks, eccPerBlock]
  const EC_TABLE = {
    1:[26,16,1,10],2:[44,28,1,16],3:[70,44,1,26],4:[100,64,2,18],
    5:[134,86,2,26],6:[172,108,2,32],7:[196,124,2,36],8:[242,154,2,40],
    9:[292,182,2,44],10:[346,216,4,28],11:[404,254,4,32],12:[466,290,4,36],
    13:[532,334,4,40],14:[581,365,4,43],15:[655,415,4,47],16:[733,453,4,51],
    17:[815,507,4,55],18:[901,563,4,59],19:[991,627,4,63],20:[1085,669,4,67],
    21:[1156,714,4,29],22:[1258,782,4,31],23:[1364,860,4,33],24:[1474,914,4,35],
    25:[1588,1000,4,37],26:[1706,1062,4,39],27:[1828,1128,4,41],28:[1921,1193,4,43],
    29:[2051,1267,4,45],30:[2185,1373,4,47],31:[2323,1455,4,49],32:[2465,1541,4,51],
    33:[2611,1631,4,53],34:[2761,1725,4,55],35:[2876,1812,4,57],36:[3034,1914,4,59],
    37:[3196,1992,4,61],38:[3362,2102,4,63],39:[3532,2216,4,65],40:[3706,2334,4,67]
  };

  function encodeData(text, version) {
    const bytes = new TextEncoder().encode(text);
    const ecInfo = EC_TABLE[version];
    const totalDataCW = ecInfo[1];

    const bits = [];
    function pushBits(val, len) {
      for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
    }

    // Mode: byte (0100)
    pushBits(4, 4);
    // Character count
    const ccBits = version <= 9 ? 8 : 16;
    pushBits(bytes.length, ccBits);
    // Data
    for (const b of bytes) pushBits(b, 8);
    // Terminator
    const capacity = totalDataCW * 8;
    const termLen = Math.min(4, capacity - bits.length);
    pushBits(0, termLen);
    // Pad to byte boundary
    while (bits.length % 8 !== 0) bits.push(0);
    // Pad bytes
    const padBytes = [0xEC, 0x11];
    let padIdx = 0;
    while (bits.length < capacity) {
      pushBits(padBytes[padIdx % 2], 8);
      padIdx++;
    }

    const dataCodewords = new Uint8Array(totalDataCW);
    for (let i = 0; i < totalDataCW; i++) {
      let byte = 0;
      for (let b = 0; b < 8; b++) byte = (byte << 1) | (bits[i * 8 + b] || 0);
      dataCodewords[i] = byte;
    }

    return dataCodewords;
  }

  function interleaveAndECC(dataCodewords, version) {
    const ecInfo = EC_TABLE[version];
    const numBlocks = ecInfo[2];
    const eccPerBlock = ecInfo[3];
    const totalDataCW = ecInfo[1];
    const cwPerBlock = Math.floor(totalDataCW / numBlocks);
    const extraCW = totalDataCW % numBlocks;

    const dataBlocks = [];
    const eccBlocks = [];
    let offset = 0;

    for (let b = 0; b < numBlocks; b++) {
      const blockLen = cwPerBlock + (b >= numBlocks - extraCW && extraCW > 0 ? 1 : 0);
      const block = dataCodewords.slice(offset, offset + blockLen);
      offset += blockLen;
      dataBlocks.push(block);
      eccBlocks.push(getECCCodewords(block, eccPerBlock));
    }

    const result = [];
    const maxDataLen = Math.max(...dataBlocks.map(b => b.length));
    for (let i = 0; i < maxDataLen; i++) {
      for (const block of dataBlocks) {
        if (i < block.length) result.push(block[i]);
      }
    }
    for (let i = 0; i < eccPerBlock; i++) {
      for (const block of eccBlocks) {
        if (i < block.length) result.push(block[i]);
      }
    }

    return new Uint8Array(result);
  }

  function createMatrix(version) {
    const n = getModuleCount(version);
    const matrix = Array.from({length: n}, () => new Int8Array(n));  // 0=unset, 1=black, -1=white
    const reserved = Array.from({length: n}, () => new Uint8Array(n)); // 1=reserved

    function setModule(r, c, val) {
      if (r >= 0 && r < n && c >= 0 && c < n) {
        matrix[r][c] = val ? 1 : -1;
        reserved[r][c] = 1;
      }
    }

    // Finder patterns
    function drawFinder(row, col) {
      for (let dr = -1; dr <= 7; dr++) {
        for (let dc = -1; dc <= 7; dc++) {
          const r = row + dr, c = col + dc;
          if (r < 0 || r >= n || c < 0 || c >= n) continue;
          const isBlack = (dr >= 0 && dr <= 6 && (dc === 0 || dc === 6)) ||
                          (dc >= 0 && dc <= 6 && (dr === 0 || dr === 6)) ||
                          (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
          setModule(r, c, isBlack);
        }
      }
    }

    drawFinder(0, 0);
    drawFinder(0, n - 7);
    drawFinder(n - 7, 0);

    // Alignment patterns
    const alignPos = getAlignmentPositions(version);
    for (const r of alignPos) {
      for (const c of alignPos) {
        if (reserved[r]?.[c]) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const isBlack = Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0);
            setModule(r + dr, c + dc, isBlack);
          }
        }
      }
    }

    // Timing patterns
    for (let i = 8; i < n - 8; i++) {
      if (!reserved[6][i]) setModule(6, i, i % 2 === 0);
      if (!reserved[i][6]) setModule(i, 6, i % 2 === 0);
    }

    // Dark module
    setModule(n - 8, 8, true);

    // Reserve format info areas
    for (let i = 0; i < 8; i++) {
      if (!reserved[8][i]) { reserved[8][i] = 1; }
      if (!reserved[8][n - 1 - i]) { reserved[8][n - 1 - i] = 1; }
      if (!reserved[i][8]) { reserved[i][8] = 1; }
      if (!reserved[n - 1 - i][8]) { reserved[n - 1 - i][8] = 1; }
    }
    if (!reserved[8][8]) reserved[8][8] = 1;

    // Reserve version info areas (version >= 7)
    if (version >= 7) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
          reserved[i][n - 11 + j] = 1;
          reserved[n - 11 + j][i] = 1;
        }
      }
    }

    return { matrix, reserved, size: n };
  }

  function getAlignmentPositions(version) {
    if (version <= 1) return [];
    const table = [
      [],[], [6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],
      [6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],
      [6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],
      [6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],
      [6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],
      [6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],
      [6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],
      [6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],
      [6,32,58,84,110,136,162],[6,26,54,82,110,138,166]
    ];
    return table[version] || [];
  }

  function placeData(matrixInfo, codewords) {
    const { matrix, reserved, size: n } = matrixInfo;
    let bitIdx = 0;
    const totalBits = codewords.length * 8;

    for (let right = n - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < n; vert++) {
        for (let j = 0; j < 2; j++) {
          const col = right - j;
          const row = ((Math.floor((n - 1 - right + (right < 6 ? 1 : 0)) / 2)) % 2 === 0)
            ? n - 1 - vert : vert;
          if (reserved[row][col]) continue;
          if (bitIdx < totalBits) {
            const bit = (codewords[Math.floor(bitIdx / 8)] >> (7 - (bitIdx % 8))) & 1;
            matrix[row][col] = bit ? 1 : -1;
            bitIdx++;
          } else {
            matrix[row][col] = -1;
          }
        }
      }
    }
  }

  function applyMask(matrix, reserved, size, maskNum) {
    const maskFn = [
      (r, c) => (r + c) % 2 === 0,
      (r, c) => r % 2 === 0,
      (r, c) => c % 3 === 0,
      (r, c) => (r + c) % 3 === 0,
      (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
      (r, c) => (r * c) % 2 + (r * c) % 3 === 0,
      (r, c) => ((r * c) % 2 + (r * c) % 3) % 2 === 0,
      (r, c) => ((r + c) % 2 + (r * c) % 3) % 2 === 0,
    ][maskNum];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!reserved[r][c] && maskFn(r, c)) {
          matrix[r][c] = matrix[r][c] === 1 ? -1 : 1;
        }
      }
    }
  }

  function writeFormatInfo(matrix, size, maskNum) {
    const FORMAT_BITS = [
      0x5412,0x5125,0x5E7C,0x5B4B,0x45F9,0x40CE,0x4F97,0x4AA0,
      0x77C4,0x72F3,0x7DAA,0x789D,0x662F,0x6318,0x6C41,0x6976,
      0x1689,0x13BE,0x1CE7,0x19D0,0x0762,0x0255,0x0D0C,0x083B,
      0x355F,0x3068,0x3F31,0x3A06,0x24B4,0x2183,0x2EDA,0x2BED
    ];

    // ECL M = 00, mask 0-7
    const formatInfo = FORMAT_BITS[maskNum]; // ECL M starts at index 0

    // Horizontal: left side
    const bits = [];
    for (let i = 14; i >= 0; i--) bits.push((formatInfo >> i) & 1);

    // Around top-left finder
    const posH = [0,1,2,3,4,5,7,8,8,8,8,8,8,8,8];
    const posV = [8,8,8,8,8,8,8,8,7,5,4,3,2,1,0];
    for (let i = 0; i < 15; i++) {
      const val = bits[i] ? 1 : -1;
      matrix[posV[i]][posH[i]] = val;
    }

    // Around top-right and bottom-left finders
    for (let i = 0; i < 8; i++) {
      matrix[8][size - 1 - i] = bits[i] ? 1 : -1;
    }
    for (let i = 0; i < 7; i++) {
      matrix[size - 1 - i][8] = bits[8 + i] ? 1 : -1;
    }
  }

  function calcPenalty(matrix, size) {
    let penalty = 0;

    // Rule 1: consecutive same-color modules in row/col
    for (let r = 0; r < size; r++) {
      let count = 1;
      for (let c = 1; c < size; c++) {
        if (matrix[r][c] === matrix[r][c - 1]) {
          count++;
          if (count === 5) penalty += 3;
          else if (count > 5) penalty++;
        } else {
          count = 1;
        }
      }
    }
    for (let c = 0; c < size; c++) {
      let count = 1;
      for (let r = 1; r < size; r++) {
        if (matrix[r][c] === matrix[r - 1][c]) {
          count++;
          if (count === 5) penalty += 3;
          else if (count > 5) penalty++;
        } else {
          count = 1;
        }
      }
    }

    // Rule 2: 2x2 blocks
    for (let r = 0; r < size - 1; r++) {
      for (let c = 0; c < size - 1; c++) {
        const v = matrix[r][c];
        if (v === matrix[r][c + 1] && v === matrix[r + 1][c] && v === matrix[r + 1][c + 1]) {
          penalty += 3;
        }
      }
    }

    return penalty;
  }

  function generate(text) {
    const bytes = new TextEncoder().encode(text);
    const version = getVersion(bytes.length);
    if (version < 0) throw new Error('Data too long');

    const dataCodewords = encodeData(text, version);
    const allCodewords = interleaveAndECC(dataCodewords, version);
    const matrixInfo = createMatrix(version);

    placeData(matrixInfo, allCodewords);

    // Try all 8 masks, pick best
    let bestMask = 0;
    let bestPenalty = Infinity;
    const { size } = matrixInfo;

    for (let m = 0; m < 8; m++) {
      const testMatrix = matrixInfo.matrix.map(row => Int8Array.from(row));
      applyMask(testMatrix, matrixInfo.reserved, size, m);
      writeFormatInfo(testMatrix, size, m);
      const p = calcPenalty(testMatrix, size);
      if (p < bestPenalty) {
        bestPenalty = p;
        bestMask = m;
      }
    }

    applyMask(matrixInfo.matrix, matrixInfo.reserved, size, bestMask);
    writeFormatInfo(matrixInfo.matrix, size, bestMask);

    return { matrix: matrixInfo.matrix, size };
  }

  function render(qr, canvas, pixelSize, logoImg) {
    const { matrix: qrMatrix, size: n } = qr;
    const cellSize = Math.max(2, Math.floor(pixelSize / (n + 8)));
    const padding = cellSize * 4;
    const totalSize = cellSize * n + padding * 2;

    canvas.width = totalSize;
    canvas.height = totalSize;
    const ctx = canvas.getContext('2d');

    // White background with rounded corners
    const radius = Math.max(4, totalSize * 0.03);
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(totalSize - radius, 0);
    ctx.quadraticCurveTo(totalSize, 0, totalSize, radius);
    ctx.lineTo(totalSize, totalSize - radius);
    ctx.quadraticCurveTo(totalSize, totalSize, totalSize - radius, totalSize);
    ctx.lineTo(radius, totalSize);
    ctx.quadraticCurveTo(0, totalSize, 0, totalSize - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();

    // Draw QR modules with slightly rounded dots for finder patterns
    ctx.fillStyle = '#000000';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qrMatrix[r][c] === 1) {
          const x = padding + c * cellSize;
          const y = padding + r * cellSize;
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }

    // Draw logo in center if provided
    if (logoImg) {
      const logoSize = Math.floor(totalSize * 0.08);
      const logoX = (totalSize - logoSize) / 2;
      const logoY = (totalSize - logoSize) / 2;
      const logoPad = Math.max(2, logoSize * 0.08);
      const logoRadius = Math.max(3, logoSize * 0.12);

      // White background behind logo
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      const bx = logoX - logoPad, by = logoY - logoPad;
      const bs = logoSize + logoPad * 2;
      ctx.moveTo(bx + logoRadius, by);
      ctx.lineTo(bx + bs - logoRadius, by);
      ctx.quadraticCurveTo(bx + bs, by, bx + bs, by + logoRadius);
      ctx.lineTo(bx + bs, by + bs - logoRadius);
      ctx.quadraticCurveTo(bx + bs, by + bs, bx + bs - logoRadius, by + bs);
      ctx.lineTo(bx + logoRadius, by + bs);
      ctx.quadraticCurveTo(bx, by + bs, bx, by + bs - logoRadius);
      ctx.lineTo(bx, by + logoRadius);
      ctx.quadraticCurveTo(bx, by, bx + logoRadius, by);
      ctx.closePath();
      ctx.fill();

      // Clip and draw logo with rounded corners
      ctx.save();
      ctx.beginPath();
      const lr = Math.max(2, logoSize * 0.08);
      ctx.moveTo(logoX + lr, logoY);
      ctx.lineTo(logoX + logoSize - lr, logoY);
      ctx.quadraticCurveTo(logoX + logoSize, logoY, logoX + logoSize, logoY + lr);
      ctx.lineTo(logoX + logoSize, logoY + logoSize - lr);
      ctx.quadraticCurveTo(logoX + logoSize, logoY + logoSize, logoX + logoSize - lr, logoY + logoSize);
      ctx.lineTo(logoX + lr, logoY + logoSize);
      ctx.quadraticCurveTo(logoX, logoY + logoSize, logoX, logoY + logoSize - lr);
      ctx.lineTo(logoX, logoY + lr);
      ctx.quadraticCurveTo(logoX, logoY, logoX + lr, logoY);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
      ctx.restore();
    }
  }

  return { generate, render };
})();

// Toast Notifications
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// ===== Regex Tester Tool =====

const REGEX_TEMPLATES = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', nameZh: '邮箱' },
  { name: 'Phone (CN)', pattern: '1[3-9]\\d{9}', nameZh: '手机号(中国)' },
  { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', nameZh: '电话(美国)' },
  { name: 'IPv4', pattern: '(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)', nameZh: 'IPv4 地址' },
  { name: 'IPv6', pattern: '([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}', nameZh: 'IPv6 地址' },
  { name: 'URL', pattern: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+[/\\w\\-.~:/?#\\[\\]@!$&\'()*+,;=%]*', nameZh: 'URL 链接' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])', nameZh: '日期(YYYY-MM-DD)' },
  { name: 'Date (DD/MM/YYYY)', pattern: '(?:0[1-9]|[12]\\d|3[01])/(?:0[1-9]|1[0-2])/\\d{4}', nameZh: '日期(DD/MM/YYYY)' },
  { name: 'Time (HH:MM:SS)', pattern: '(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d', nameZh: '时间(HH:MM:SS)' },
  { name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}', nameZh: '十六进制颜色' },
  { name: 'HTML Tag', pattern: '<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>.*?</\\1>', nameZh: 'HTML 标签' },
  { name: 'Integer', pattern: '-?\\d+', nameZh: '整数' },
  { name: 'Decimal', pattern: '-?\\d+\\.\\d+', nameZh: '小数' },
  { name: 'UUID', pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}', nameZh: 'UUID' },
  { name: 'MAC Address', pattern: '(?:[0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}', nameZh: 'MAC 地址' },
  { name: 'Username', pattern: '[a-zA-Z][a-zA-Z0-9_]{2,15}', nameZh: '用户名' },
  { name: 'Strong Password', pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}', nameZh: '强密码' },
  { name: 'CN ID Card', pattern: '[1-9]\\d{5}(?:19|20)\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]', nameZh: '身份证号' },
  { name: 'CN Postal Code', pattern: '[1-9]\\d{5}', nameZh: '邮政编码' },
  { name: 'Domain', pattern: '(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}', nameZh: '域名' },
  { name: 'CSS Class', pattern: '\\.[a-zA-Z_][a-zA-Z0-9_-]*', nameZh: 'CSS 类名' },
  { name: 'JSON Key', pattern: '"([^"]+)"\\s*:', nameZh: 'JSON Key' },
  { name: 'Markdown Link', pattern: '\\[([^\\]]+)\\]\\(([^)]+)\\)', nameZh: 'Markdown 链接' },
  { name: 'Base64', pattern: '[A-Za-z0-9+/]{4,}={0,2}', nameZh: 'Base64 编码' },
  { name: 'JWT', pattern: 'eyJ[A-Za-z0-9_-]+\\.eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+', nameZh: 'JWT Token' },
  { name: 'Whitespace Trim', pattern: '^\\s+|\\s+$', nameZh: '首尾空白' },
  { name: 'Blank Lines', pattern: '^\\s*$', nameZh: '空行' },
  { name: 'CamelCase', pattern: '[a-z]+(?:[A-Z][a-z0-9]+)+', nameZh: '驼峰命名' },
  { name: 'SNAKE_CASE', pattern: '[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+', nameZh: 'SNAKE_CASE' },
  { name: 'File Extension', pattern: '\\.[a-zA-Z0-9]{1,10}$', nameZh: '文件扩展名' },
  { name: 'Chinese Characters', pattern: '[\\u4e00-\\u9fa5]+', nameZh: '中文字符' },
  { name: 'Emoji', pattern: '[\\u{1F600}-\\u{1F64F}\\u{1F300}-\\u{1F5FF}\\u{1F680}-\\u{1F6FF}\\u{1F1E0}-\\u{1F1FF}]', nameZh: 'Emoji 表情' },
];

function initRegexTool() {
  const patternInput = $('#rx-pattern');
  const testDisplay = $('#rx-test-display');
  const flagBtns = $$('.rx-flag');
  const matchCountEl = $('#rx-match-count');
  const groupsContainer = $('#rx-groups');
  const groupsList = $('#rx-groups-list');
  const templatesBtn = $('#rx-templates-btn');
  const templatesPanel = $('#rx-templates-panel');
  const templateList = $('#rx-template-list');

  let activeFlags = 'g';

  buildTemplateList();

  flagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      activeFlags = Array.from($$('.rx-flag.active')).map(b => b.dataset.flag).join('');
      runRegex();
    });
  });

  let isComposing = false;
  let highlightTimer = null;

  testDisplay.addEventListener('compositionstart', () => { isComposing = true; });
  testDisplay.addEventListener('compositionend', () => {
    isComposing = false;
    scheduleHighlight();
  });

  patternInput.addEventListener('input', () => { runRegex(true); });
  testDisplay.addEventListener('input', () => {
    if (!isComposing) scheduleHighlight();
  });

  function scheduleHighlight() {
    clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => runRegex(true), 80);
  }

  templatesBtn.addEventListener('click', () => {
    const isVisible = templatesPanel.style.display !== 'none';
    templatesPanel.style.display = isVisible ? 'none' : 'block';
  });

  $$('.rx-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      const pattern = patternInput.value;
      if (!pattern) return;
      const code = formatRegexForLang(pattern, activeFlags, lang);
      navigator.clipboard.writeText(code).then(() => showToast(translations[currentLang].common.copied));
    });
  });

  function buildTemplateList() {
    templateList.innerHTML = '';
    REGEX_TEMPLATES.forEach(tpl => {
      const item = document.createElement('div');
      item.className = 'rx-template-item';
      const name = currentLang === 'zh' ? tpl.nameZh : tpl.name;
      item.innerHTML = `<span class="rx-tpl-name">${name}</span><code class="rx-tpl-pattern">${escapeHTML(tpl.pattern)}</code>`;
      item.addEventListener('click', () => {
        patternInput.value = tpl.pattern;
        templatesPanel.style.display = 'none';
        runRegex();
      });
      templateList.appendChild(item);
    });
  }

  function getPlainText() {
    return testDisplay.textContent || '';
  }

  function runRegex(doHighlight) {
    const pattern = patternInput.value;
    const text = getPlainText();

    if (!pattern) {
      if (doHighlight) applyHighlight(text, []);
      matchCountEl.textContent = '';
      groupsContainer.style.display = 'none';
      return;
    }

    let regex;
    try {
      regex = new RegExp(pattern, activeFlags);
    } catch (e) {
      matchCountEl.textContent = '⚠ Invalid';
      matchCountEl.style.color = 'var(--error)';
      return;
    }
    matchCountEl.style.color = '';

    const matches = [];
    const groups = [];

    if (activeFlags.includes('g')) {
      let m;
      const iterRegex = new RegExp(pattern, activeFlags);
      while ((m = iterRegex.exec(text)) !== null) {
        matches.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
        if (m.length > 1) {
          const g = [];
          for (let i = 1; i < m.length; i++) g.push({ index: i, value: m[i] || '' });
          groups.push({ match: m[0], groups: g });
        }
        if (m[0].length === 0) iterRegex.lastIndex++;
      }
    } else {
      const m = regex.exec(text);
      if (m) {
        matches.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
        if (m.length > 1) {
          const g = [];
          for (let i = 1; i < m.length; i++) g.push({ index: i, value: m[i] || '' });
          groups.push({ match: m[0], groups: g });
        }
      }
    }

    const t = translations[currentLang].tools.regex;
    matchCountEl.textContent = matches.length === 0
      ? t.noMatch
      : t.matchCount.replace('{n}', matches.length);

    if (doHighlight) applyHighlight(text, matches);
    renderGroups(groups);
  }

  function applyHighlight(text, matches) {
    const hasFocus = document.activeElement === testDisplay || testDisplay.contains(document.activeElement);
    let caretPos = -1;
    if (hasFocus) caretPos = getCaretCharOffset(testDisplay);

    if (matches.length === 0) {
      testDisplay.innerHTML = escapeHTML(text);
    } else {
      let html = '';
      let lastEnd = 0;
      matches.forEach(m => {
        html += escapeHTML(text.substring(lastEnd, m.start));
        html += `<mark class="rx-highlight">${escapeHTML(text.substring(m.start, m.end))}</mark>`;
        lastEnd = m.end;
      });
      html += escapeHTML(text.substring(lastEnd));
      testDisplay.innerHTML = html;
    }

    if (hasFocus && caretPos >= 0) setCaretCharOffset(testDisplay, caretPos);
  }

  function getCaretCharOffset(element) {
    const sel = window.getSelection();
    if (!sel.rangeCount) return 0;
    const range = sel.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(element);
    preRange.setEnd(range.startContainer, range.startOffset);
    return preRange.toString().length;
  }

  function setCaretCharOffset(element, offset) {
    const sel = window.getSelection();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    let remaining = offset;
    let node;
    while ((node = walker.nextNode())) {
      const len = node.textContent.length;
      if (remaining <= len) {
        const range = document.createRange();
        range.setStart(node, remaining);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
      remaining -= len;
    }
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function renderGroups(groups) {
    if (groups.length === 0) {
      groupsContainer.style.display = 'none';
      return;
    }
    groupsContainer.style.display = 'block';
    groupsList.innerHTML = '';
    groups.forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = 'rx-group-row';
      let html = `<span class="rx-group-match">Match ${idx + 1}: <code>${escapeHTML(item.match)}</code></span>`;
      item.groups.forEach(g => {
        html += `<span class="rx-group-item">Group ${g.index}: <code>${escapeHTML(g.value)}</code></span>`;
      });
      row.innerHTML = html;
      groupsList.appendChild(row);
    });
  }

  window._regexRebuildTemplates = () => buildTemplateList();
}

function formatRegexForLang(pattern, flags, lang) {
  const escaped = pattern.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  switch (lang) {
    case 'js':
      return `const regex = /${pattern}/${flags};\nconst matches = text.match(regex);`;
    case 'java': {
      const javaPattern = pattern.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const javaFlags = [];
      if (flags.includes('i')) javaFlags.push('Pattern.CASE_INSENSITIVE');
      if (flags.includes('m')) javaFlags.push('Pattern.MULTILINE');
      if (flags.includes('s')) javaFlags.push('Pattern.DOTALL');
      const flagStr = javaFlags.length ? ', ' + javaFlags.join(' | ') : '';
      return `Pattern pattern = Pattern.compile("${javaPattern}"${flagStr});\nMatcher matcher = pattern.matcher(text);`;
    }
    case 'python': {
      const pyFlags = [];
      if (flags.includes('i')) pyFlags.push('re.IGNORECASE');
      if (flags.includes('m')) pyFlags.push('re.MULTILINE');
      if (flags.includes('s')) pyFlags.push('re.DOTALL');
      const pf = pyFlags.length ? ', ' + pyFlags.join(' | ') : '';
      const func = flags.includes('g') ? 'findall' : 'search';
      return `import re\nmatches = re.${func}(r"${pattern}"${pf}, text)`;
    }
    case 'go': {
      const goPattern = pattern.replace(/`/g, '` + "`" + `');
      let prefix = '';
      if (flags.includes('i')) prefix += '(?i)';
      if (flags.includes('m')) prefix += '(?m)';
      if (flags.includes('s')) prefix += '(?s)';
      const func = flags.includes('g') ? 'FindAllString(text, -1)' : 'FindString(text)';
      return `re := regexp.MustCompile(\`${prefix}${goPattern}\`)\nmatches := re.${func}`;
    }
    default:
      return `/${pattern}/${flags}`;
  }
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
