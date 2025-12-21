const projects = [
  {id:1, name:"Portfolio Website", category:"web", desc:"Personal portfolio website with modern design and smooth animations."},
  {id:2, name:"E-commerce App", category:"app", desc:"Full-featured shopping app with cart functionality and payment integration."},
  {id:3, name:"Logo Design", category:"design", desc:"Custom logo design for modern tech startup branding."},
  {id:4, name:"Blog Platform", category:"web", desc:"Responsive blog platform with CMS integration and SEO optimization."},
  {id:5, name:"Mobile App UI", category:"app", desc:"Modern mobile app UI with intuitive navigation and micro-interactions."},
  {id:6, name:"Brand Identity", category:"design", desc:"Complete brand identity package including guidelines and assets."},
  {id:7, name:"Dashboard UI", category:"web", desc:"Analytics dashboard with real-time data visualization."},
  {id:8, name:"Social Media App", category:"app", desc:"Social networking app with messaging and content sharing."},
  {id:9, name:"Illustration Set", category:"design", desc:"Custom illustration set for digital products and marketing."}
];

const grid = document.getElementById("grid");
const category = document.getElementById("category");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalCategory = document.getElementById("modal-category");
const closeBtn = document.getElementById("close");
const noResults = document.getElementById("noResults");

// Theme and Mode
const modeToggle = document.getElementById("modeToggle");
const themeSwitcher = document.getElementById("themeSwitcher");
const moonIcon = document.querySelector(".moon-icon");
const sunIcon = document.querySelector(".sun-icon");

// Get emoji for category
function getEmoji(cat) {
  if (cat === 'web') return '🌐';
  if (cat === 'app') return '📱';
  if (cat === 'design') return '🎨';
  return '💼';
}

// Render grid
function renderGrid(list) {
  grid.innerHTML = "";
  
  if (list.length === 0) {
    noResults.style.display = "block";
    return;
  } else {
    noResults.style.display = "none";
  }

  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "grid-item";
    
    // Split name into words for animation
    const nameWords = p.name.split(' ');
    const nameHTML = nameWords.map(word => `<span>${word} </span>`).join('');
    
    div.innerHTML = `
      <div class="img-container ${p.category}">
        <div class="emoji">${getEmoji(p.category)}</div>
        <div class="overlay">
          <button data-id="${p.id}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View Project
          </button>
        </div>
      </div>
      <div class="info">
        <h4>${nameHTML}</h4>
        <p>${p.desc}</p>
        <div class="category-badge">${p.category}</div>
      </div>
    `;
    grid.appendChild(div);
  });

  // Add click listeners to view buttons
  document.querySelectorAll(".overlay button").forEach(btn => {
    btn.addEventListener("click", () => {
      const proj = projects.find(p => p.id == btn.dataset.id);
      openModal(proj);
    });
  });
}

// Open modal
function openModal(proj) {
  modal.classList.add("show");
  modalImg.className = `modal-img ${proj.category}`;
  modalImg.textContent = getEmoji(proj.category);
  modalTitle.textContent = proj.name;
  modalDesc.textContent = proj.desc;
  modalCategory.textContent = proj.category;
  modalCategory.className = 'category-badge';
}

// Filter grid
function filterGrid() {
  const cat = category.value;
  const search = searchInput.value.toLowerCase();

  const filtered = projects.filter(p => {
    const catCheck = cat === "all" || p.category === cat;
    const searchCheck = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search);
    return catCheck && searchCheck;
  });

  renderGrid(filtered);
}

// Event listeners for filtering
category.addEventListener("change", filterGrid);
searchInput.addEventListener("input", filterGrid);

// Modal controls
closeBtn.addEventListener("click", () => modal.classList.remove("show"));
window.addEventListener("click", e => { 
  if (e.target == modal) modal.classList.remove("show"); 
});

// Dark/Light Mode Toggle
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  
  if (isDark) {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
  }
});

// Theme Switcher
themeSwitcher.addEventListener("change", (e) => {
  const selectedTheme = e.target.value;
  
  // Remove all theme classes
  document.body.classList.remove("theme-pink", "theme-blue", "theme-lavender");
  
  // Add selected theme class
  if (selectedTheme !== "pink") {
    document.body.classList.add(`theme-${selectedTheme}`);
  }
});

// Initial render
renderGrid(projects);
