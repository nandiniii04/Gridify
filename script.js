const projects = [
  {id:1, name:"Portfolio Website", category:"web", img:"https://picsum.photos/400/300?random=1", desc:"Personal portfolio website with modern design."},
  {id:2, name:"E-commerce App", category:"app", img:"https://picsum.photos/400/300?random=2", desc:"Shopping app demo with cart functionality."},
  {id:3, name:"Logo Design", category:"design", img:"https://picsum.photos/400/300?random=3", desc:"Custom logo design for branding."},
  {id:4, name:"Blog Website", category:"web", img:"https://picsum.photos/400/300?random=4", desc:"Blog platform demo."},
  {id:5, name:"Mobile App UI", category:"app", img:"https://picsum.photos/400/300?random=5", desc:"Modern mobile app UI."},
  {id:6, name:"Brand Identity", category:"design", img:"https://picsum.photos/400/300?random=6", desc:"Complete brand identity project."}
];

const grid = document.getElementById("grid");
const category = document.getElementById("category");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = document.getElementById("close");

function renderGrid(list){
  grid.innerHTML = "";
  list.forEach(p=>{
    const div = document.createElement("div");
    div.className = "grid-item";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="overlay"><button data-id="${p.id}">View</button></div>
      <div class="info"><h4>${p.name}</h4><p>${p.desc}</p></div>
    `;
    grid.appendChild(div);
  });

  document.querySelectorAll(".overlay button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const proj = projects.find(p=>p.id==btn.dataset.id);
      modal.classList.add("show");
      modalImg.src = proj.img;
      modalTitle.textContent = proj.name;
      modalDesc.textContent = proj.desc;
    });
  });
}

function filterGrid(){
  const cat = category.value;                 
  const search = searchInput.value.toLowerCase();

  const filtered = projects.filter(p=>{
    const catCheck = cat === "all" || p.category === cat;  
    const searchCheck = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search);
    return catCheck && searchCheck;
  });

  renderGrid(filtered);
}

// Event listeners
category.addEventListener("change", filterGrid);
searchInput.addEventListener("input", filterGrid);
closeBtn.addEventListener("click", ()=> modal.classList.remove("show"));
window.addEventListener("click", e=> { if(e.target==modal) modal.classList.remove("show"); });

// Initial render
renderGrid(projects);
// 3D tilt effect for grid items
document.querySelectorAll(".grid-item").forEach(item => {
  item.addEventListener("mousemove", e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * 10; 
    const tiltY = ((x - centerX) / centerX) * 10;
    item.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
});

/* 🌙 DARK / LIGHT */
const toggle = document.getElementById("modeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};


