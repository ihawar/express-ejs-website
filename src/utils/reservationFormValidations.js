// Checks if the fullname is valid or no
// by checking it has at least to parts(split by ' ')
export function isValidFullName(name) {
  const parts = name.split(/\s+/);
  return parts.length >= 2 && parts.every(p => p.length >= 2);
}

// Checks if it's a valid iranian phone number with regex
export function isValidPhone(phone) {
  return /^09\d{9}$/.test(phone);
}

export function normalizeText(str) {
  return str.trim().replace(/\s+/g, ' ');
}

export function normalizePhone(str) {
  return toEnglishDigits(str.trim());
}
// Converts persian UTF-8 numbers to ASCCI numbers
export function toEnglishDigits(str) {
  const map = {
    '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4',
    '۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'
  };
  return str.replace(/[۰-۹]/g, d => map[d]);
}