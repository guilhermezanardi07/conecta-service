// ========== MENU LATERAL (compartilhado: index.html e perfil.html) ==========
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('menuOverlay');

function openMenu() {
  sideMenu.classList.add('open');
  overlay.classList.add('open');
  sideMenu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  sideMenu.classList.remove('open');
  overlay.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
}

// Todos os botões hambúrguer abrem o menu
document.querySelectorAll('[data-menu-open]').forEach((btn) => {
  btn.addEventListener('click', openMenu);
});

document.getElementById('menuClose').addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Links do menu ainda não navegam (apenas fecham o menu)
document.querySelectorAll('.menu-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    closeMenu();
  });
});