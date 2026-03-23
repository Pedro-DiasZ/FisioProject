const body = document.body;
const nav = document.querySelector('nav');
const THEME_KEY = 'theme';

// Cria o botão de tema dinamicamente se ele não existir no HTML
let toggleBtn = document.querySelector('.theme-toggle');
if (!toggleBtn && nav) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Alternar tema');

  const icon = document.createElement('span');
  icon.className = 'icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '☀️';

  btn.appendChild(icon);

  const cta = nav.querySelector('.nav-cta');
  if (cta) {
    nav.insertBefore(btn, cta);
  } else {
    nav.appendChild(btn);
  }

  toggleBtn = btn;
}

const themeIcon = toggleBtn?.querySelector('.icon');

function setTheme(theme, persist = true) {
  body.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  if (persist) localStorage.setItem(THEME_KEY, theme);
}

if (toggleBtn) {
  const saved = localStorage.getItem(THEME_KEY);
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  // Usa o tema do sistema se não houver escolha salva
  setTheme(saved || (media.matches ? 'dark' : 'light'), Boolean(saved));

  // Segue mudanças do sistema enquanto o usuário não tiver escolhido manualmente
  if (!saved) {
    media.addEventListener('change', (event) => {
      setTheme(event.matches ? 'dark' : 'light', false);
    });
  }

  toggleBtn.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
}

// Safeguard for forms: show an alert if a form with id exists (optional)
const leadForm = document.getElementById('agendamento-form');
if (leadForm) {
  leadForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    alert('Pedido enviado! Entraremos em contato para confirmar seu horário.');
  });
}
