import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');

const toggleSalesPointsBtn = document.querySelector('#toggle-sales-points-btn');
const salesPointsSection = document.querySelector('#sales-points-section');
const salesPointsContainer = document.querySelector('#sales-points-container');
const feedbackSales = document.querySelector('#feedback-sales');

let isSalesPointsLoaded = false;

loadSnacksBtn.addEventListener('click', loadSnacks);
toggleSalesPointsBtn.addEventListener('click', toggleSalesPoints);

async function loadSnacks() {
  feedback.textContent = '';

  try {
    const snacks = await fetchSnacks();
    displaySnacks(snacks);
  } catch (error) {
    console.error(error);
    feedback.textContent = 'Impossible de charger les snacks.';
  }
}

function displaySnacks(snacks) {
  snacksContainer.innerHTML = snacks.map((snack) => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name.toUpperCase()}</h3>
        <p>${snack.description}</p>
        <p class="price">CHF ${snack.price.toFixed(2)}</p>
        <span class="fake-action">Commander</span>
      </div>
    </article>
  `).join('');

}

async function toggleSalesPoints() {
  if (salesPointsSection.classList.contains('hidden')) {
    salesPointsSection.classList.remove('hidden');
    toggleSalesPointsBtn.textContent = 'Masquer les points de vente';

    if (!isSalesPointsLoaded) {
      await loadSalesPoints();
    }
  } else {
    salesPointsSection.classList.add('hidden');
    toggleSalesPointsBtn.textContent = 'Afficher les points de vente';
  }
}

async function loadSalesPoints() {
  feedbackSales.textContent = '';

  try {
    const points = await fetchSalesPoints();
    displaySalesPoints(points);
    isSalesPointsLoaded = true;
  } catch (error) {
    console.error(error);
    feedbackSales.textContent = 'Impossible de charger les points de vente.';
  }
}

function displaySalesPoints(points) {
  salesPointsContainer.innerHTML = points.map((point) => `
    <article class="sales-point-card">
      <h3>${point.building}</h3>
      <p><strong>Salle :</strong> ${point.room}</p>
      <p><strong>Horaires :</strong> ${point.openingHours}</p>
      <p><strong>Email :</strong> <a href="mailto:${point.email}">${point.email}</a></p>
    </article>
  `).join('');
}
