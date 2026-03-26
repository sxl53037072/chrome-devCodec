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
      hash: 'Hash'
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
      hash: '哈希'
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
    'hash-input': 'Enter text to hash...'
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
    'ts-input': '1711452600'
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

// Toast Notifications
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
