const sidebar = document.getElementById('adminSidebar');
const openBtn = document.getElementById('sidebarOpen');
const closeBtn = document.getElementById('sidebarClose');

function setSidebar(open) {
  sidebar.dataset.open = open ? 'true' : 'false';
}

openBtn.addEventListener('click', () => setSidebar(true));
closeBtn.addEventListener('click', () => setSidebar(false));


// Active nav item
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.admin_nav_item').forEach(el => {
    if (el.pathname === window.location.pathname) {
      el.classList.add('text-primary', 'font-bold');
    }
  });
});
