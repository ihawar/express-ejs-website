const inputs = document.querySelectorAll(
  'input[name="q"], select[name="time"], select[name="status"]'
);

function applyFilters() {
  const params = new URLSearchParams(window.location.search);

  inputs.forEach(el => {
    params.set(el.name, el.value);
  });

  params.set('page', '1');
  window.location.search = params.toString();
}

inputs.forEach(el => {
  if (el.tagName === 'SELECT') {
    el.addEventListener('change', applyFilters);
  }
});

document.querySelector('input[name="q"]')
  .addEventListener('keydown', e => {
    if (e.key === 'Enter') applyFilters();
  });