Hooks.once('init', () => {
  game.settings.register('exalted-month-display', 'currentMonthIndex', {
    name: 'Current Exalted Month',
    scope: 'world',
    config: false,
    type: Number,
    default: 0
  });
});


const exaltedMonths = [
  { name: "Ascending Air", season: "Air" },
  { name: "Resplendent Air", season: "Air" },
  { name: "Descending Air", season: "Air" },

  { name: "Ascending Water", season: "Water" },
  { name: "Resplendent Water", season: "Water" },
  { name: "Descending Water", season: "Water" },

  { name: "Ascending Earth", season: "Earth" },
  { name: "Resplendent Earth", season: "Earth" },
  { name: "Descending Earth", season: "Earth" },

  { name: "Ascending Fire", season: "Fire" },
  { name: "Resplendent Fire", season: "Fire" },
  { name: "Descending Fire", season: "Fire" },

  { name: "Ascending Wood", season: "Wood" },
  { name: "Resplendent Wood", season: "Wood" },
  { name: "Descending Wood", season: "Wood" },
];

// Image path for each season
const seasonImages = {
  Air: "modules/exalted-month-display/assets/seasons/Air.webp",
  Water: "modules/exalted-month-display/assets/seasons/Water.webp",
  Earth: "modules/exalted-month-display/assets/seasons/Earth.webp",
  Fire: "modules/exalted-month-display/assets/seasons/Fire.webp",
  Wood: "modules/exalted-month-display/assets/seasons/Wood.webp"
};

let currentMonthIndex = 0;

Hooks.once('ready', async () => {
  currentMonthIndex = game.settings.get('exalted-month-display', 'currentMonthIndex') || 0;
  renderMonthDisplay();
});

function renderMonthDisplay() {
  const month = exaltedMonths[currentMonthIndex];
  const image = seasonImages[month.season];

  const html = `
    <div id="exalted-month-display">
      <img src="${image}" alt="${month.season}">
      <div class="month-name">${month.name}</div>
      <div class="buttons">
        <button id="prev-month">◀</button>
        <button id="next-month">▶</button>
      </div>
    </div>
  `;
  $('body').append(html);

$('#next-month').click(() => {
  currentMonthIndex = (currentMonthIndex + 1) % exaltedMonths.length;
  updateMonthDisplay();
  game.settings.set('exalted-month-display', 'currentMonthIndex', currentMonthIndex);
});

$('#prev-month').click(() => {
  currentMonthIndex = (currentMonthIndex - 1 + exaltedMonths.length) % exaltedMonths.length;
  updateMonthDisplay();
  game.settings.set('exalted-month-display', 'currentMonthIndex', currentMonthIndex);
});

function updateMonthDisplay() {
  const month = exaltedMonths[currentMonthIndex];
  const image = seasonImages[month.season];

  $('#exalted-month-display img').attr('src', image).attr('alt', month.season);
  $('#exalted-month-display .month-name').text(month.name);
}
