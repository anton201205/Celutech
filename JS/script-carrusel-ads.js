const carrusel = document.getElementById('carrusel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicadores = document.getElementById('indicadores');

let currentIndex = 0;
const items = document.querySelectorAll('.carrusel-item');
const totalItems = items.length;

// Indicadores
for (let i = 0; i < totalItems; i++) {
    const dot = document.createElement('div');
    dot.classList.add('indicador'); 
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    indicadores.appendChild(dot);
}

// Cambia el slide actual
function goToSlide(index) {
    if (index >= 0 && index < totalItems) {
        currentIndex = index;
        updateCarrusel();
    }
}

function updateCarrusel() {
    carrusel.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicadores();
}

function updateIndicadores() {
    const dots = document.querySelectorAll('.indicador');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarrusel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarrusel();
});
