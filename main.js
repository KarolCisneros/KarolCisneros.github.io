const yearLabel = document.getElementById('year');
if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

const tabButtons = Array.from(document.querySelectorAll('.tab-link'));
const panels = Array.from(document.querySelectorAll('.panel'));

const activateSection = (target, { focus = false } = {}) => {
  const nextPanel = panels.find((panel) => panel.dataset.section === target);
  if (!nextPanel) return;

  panels.forEach((panel) => {
    const isActive = panel === nextPanel;
    panel.classList.toggle('active', isActive);
    panel.setAttribute('aria-hidden', (!isActive).toString());
  });

  tabButtons.forEach((button) => {
    const isActive = button.dataset.sectionTarget === target;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', isActive.toString());
    if (isActive && focus) button.focus();
  });

  const panelTitle = nextPanel.querySelector('h2')?.textContent ?? 'Perfil';
  document.title = `Karol Cisneros | ${panelTitle}`;
};

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    activateSection(button.dataset.sectionTarget, { focus: true });
  });

  button.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextButton = tabButtons[(index + offset + tabButtons.length) % tabButtons.length];
    nextButton.focus();
  });
});

// activa sección inicial al cargar
activateSection('perfil');