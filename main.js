const yearLabel = document.getElementById('year');
if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

const tabButtons = Array.from(document.querySelectorAll('.tab-link'));
const panels = Array.from(document.querySelectorAll('.panel'));

// Variable para rastrear si el gráfico de habilidades ya se ha animado
let skillsAnimated = false; 

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
  
  // LÓGICA PARA LA ANIMACIÓN DEL GRÁFICO 
  // Animar el Ranking Personal la primera vez que se visita TRAYECTORIA.
  if (target === 'trayectoria' && !skillsAnimated) {
      animateSkills();
      skillsAnimated = true;
  }
};

// FUNCIÓN PARA ANIMAR LAS BARRAS DEL GRÁFICO
const animateSkills = () => {
    setTimeout(() => {
        // Selecciona todas las barras de skill-level en la página
        const skills = document.querySelectorAll('.skill-level');
        skills.forEach(skill => {
            const targetWidth = skill.style.width; 
            // Reinicia el ancho a 0% para iniciar la animación
            skill.style.width = '0%'; 
            void skill.offsetWidth; // Fuerza el reflow
            // Aplica el ancho final para la transición
            skill.style.width = targetWidth; 
        });
    }, 100); 
};


// INICIO: LÓGICA DE RECOMENDACIÓN DE NOVELAS (CLICS MÚLTIPLES)
const revealButton = document.getElementById('reveal-book');
const bookContainer = document.getElementById('book-title-container');

// Lista de NOVELAS recomendadas
const recommendedBooks = [
    "El Amor en los Tiempos del Cólera (Gabriel García Márquez)",
    "Como Agua para Chocolate (Laura Esquivel)",
    "Pedro Páramo (Juan Rulfo)",
    "La Insoportable Levedad del Ser (Milan Kundera)",
    "La Casa de los Espiritus (Isabel Allende)",
    "El perfume (Patrick Süskind)",
    "1984 (George Orwell)",
    "Fahrenheit 451 (Ray Bradbury)",
    "Las Malas (Camila Sosa)",
    "La Vegetariana (Han Kang)", 
    "Cadáver Exquisito (Agustina Bazterrica)", 
    "Delirio (Laura Restrepo)",
    "La Naranja Mecánica (ANthony Burgess)"
];

const revealBookTitle = () => {
    // Escoge un libro al azar
    const randomIndex = Math.floor(Math.random() * recommendedBooks.length);
    const bookTitle = recommendedBooks[randomIndex];
    
    // Quita la clase 'revealed' momentáneamente 
    bookContainer.classList.remove('revealed');
    bookContainer.textContent = "Cargando..."; // Mensaje temporal
    
    setTimeout(() => {
        bookContainer.textContent = bookTitle;
        bookContainer.classList.add('revealed');
        
        // El texto del botón se actualiza
        revealButton.textContent = "¡Revelar otra Novela!"; 
        
    }, 100); 
};

if (revealButton) {
    revealButton.addEventListener('click', revealBookTitle);
    
    // Inicializar el espacio en blanco
    bookContainer.textContent = "Haz clic en el botón para ver la recomendación.";
}
// FIN: LÓGICA DE RECOMENDACIÓN DE NOVELAS


// INICIO: LÓGICA DE CÁPSULAS DE OPINIÓN
const revealOpinionButton = document.getElementById('reveal-opinion');
const opinionContainer = document.getElementById('opinion-container');

const hotTakes = [
    "¿Te comerías a tu perro? por qué a una vaca sí? y a un perro que no es tuyo?",
    "Salir de Starbucks debería ser funable",
    "¿Darle cuerpo a la IA?",
    "¿Matarías a bebé Hitler?",
    "Lo divertido de una montaña rusa, es la posibilidad de morir?",
    "¿Cuándo es que el humanos e interesó en secreciones de otros animales?",
    "Si pinocho dice que le va a crecer la nariz, le crece?"
];

const revealNewOpinion = () => {
    const randomIndex = Math.floor(Math.random() * hotTakes.length);
    const opinion = hotTakes[randomIndex];
    
    opinionContainer.style.opacity = 0; // Oculta para hacer transición
    
    setTimeout(() => {
        opinionContainer.innerHTML = opinion;
        opinionContainer.style.opacity = 1; // Muestra con transición
        revealOpinionButton.textContent = "Revelar Otra Opinión";
    }, 300); // 300ms para el efecto de fade
};

if (revealOpinionButton) {
    revealOpinionButton.addEventListener('click', revealNewOpinion);
    
    // Inicializar la primera opinión al cargar el script o la sección
    revealNewOpinion(); // Carga la primera opinión automáticamente
}
// FIN: LÓGICA DE CÁPSULAS DE OPINIÓN


// INICIO: LÓGICA LIGHTBOX (MODAL DE IMAGEN)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryLinks = document.querySelectorAll('.gallery-link');
const closeButton = document.querySelector('.close-button');

galleryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita que el enlace salte a la imagen
        const image = this.querySelector('.gallery-image');
        
        lightbox.style.display = "block";
        lightboxImg.src = this.href; // Usa la URL del <a> para la imagen grande
        lightboxCaption.innerHTML = image.alt || ""; // Usa el alt como descripción
    });
});

// Cierra el lightbox al hacer clic en la X
if (closeButton) {
    closeButton.addEventListener('click', function() {
        lightbox.style.display = "none";
    });
}

// Cierra el lightbox al hacer clic fuera de la imagen (en el fondo oscuro)
window.addEventListener('click', function(event) {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});
// FIN: LÓGICA LIGHTBOX (MODAL DE IMAGEN)


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