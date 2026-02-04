const form = document.getElementById('reservation-form');
const fullNameField = document.getElementById('fullName');
const phoneField = document.getElementById('phoneNumber');
const messageField = document.getElementById('message');
const errorBox = document.getElementById('errorBox');

form.addEventListener('submit', (e) => {
  clearError();

  const fullName = normalizeText(fullNameField.value);
  const phone = normalizePhone(phoneField.value);

  if (!isValidFullName(fullName)) {
    return blockSubmit(
      e,
      'لطفا نام و نام خانوادگی خود را به‌درستی وارد کنید.'
    );
  }

  if (!isValidPhone(phone)) {
    return blockSubmit(
      e,
      'لطفا شماره تلفن خود را مانند نمونه صحیح وارد نمایید.'
    );
  }

  fullNameField.value = fullName;
  phoneField.value = phone;
});


function isValidFullName(name) {
  const parts = name.split(/\s+/);
  return parts.length >= 2 && parts.every(p => p.length >= 2);
}

function isValidPhone(phone) {
  return /^09\d{9}$/.test(phone);
}

function normalizeText(str) {
  return str.trim().replace(/\s+/g, ' ');
}

function normalizePhone(str) {
  return toEnglishDigits(str.trim());
}

function toEnglishDigits(str) {
  const map = {
    '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4',
    '۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'
  };
  return str.replace(/[۰-۹]/g, d => map[d]);
}

function blockSubmit(e, message) {
  showError(message);
  e.preventDefault();
  return false;
}

function showError(text) {
  errorBox.innerText = text;
  errorBox.classList.remove('hidden');
}

function clearError() {
  errorBox.classList.add('hidden');
  errorBox.innerText = '';
}

[fullNameField, phoneField].forEach(input => {
  input.addEventListener('input', clearError);
});

