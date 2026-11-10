// ========== TELA INICIAL (index.html) ==========

// Clicar na foto de perfil abre a tela de perfil
document.getElementById('profileBtn').addEventListener('click', () => {
  window.location.href = 'perfil.html';
});

// Estrelas de avaliação: lê data-rating="4" e desenha 5 estrelas
document.querySelectorAll('.stars').forEach((el) => {
  const rating = Number(el.dataset.rating) || 0;
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.className = 'star' + (i <= rating ? ' on' : '');
    star.textContent = '\u2605';
    el.appendChild(star);
  }
});