const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get("id"));

const project = projects.find(p => p.id === projectId);

if (!project) {
  document.body.innerHTML = `
    <div class="flex items-center justify-center h-screen">
      <h1 class="text-3xl font-bold text-red-500">
        Project tidak ditemukan
      </h1>
    </div>
  `;
  throw new Error("Project tidak ditemukan");
}

// =====================
// BASIC DATA
// =====================
document.getElementById("projectTitle").textContent =
  project.title || "-";

document.getElementById("projectDesc").textContent =
  project.description || "-";

document.getElementById("projectDate").textContent =
  project.date || "-";

document.getElementById("projectCategory").textContent =
  project.category || "-";

document.getElementById("projectStatus").textContent =
  project.status || "-";

// =====================
// TAGS
// =====================
const tagContainer = document.getElementById("projectTags");

if (project.tags && project.tags.length > 0) {
  project.tags.forEach(tag => {
    tagContainer.innerHTML += `
      <span class="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
        ${tag}
      </span>
    `;
  });
}

// =====================
// FITUR
// =====================
const featureContainer =
  document.getElementById("projectFeatures");

if (project.features && project.features.length > 0) {
  project.features.forEach(feature => {
    featureContainer.innerHTML += `
      <li class="flex items-start gap-2">
        <span class="text-primary font-bold">✓</span>
        <span>${feature}</span>
      </li>
    `;
  });
}

// =====================
// TOOLS
// =====================
const toolsContainer =
  document.getElementById("projectTools");

if (project.tools && project.tools.length > 0) {
  project.tools.forEach(tool => {
    toolsContainer.innerHTML += `
      <span class="px-4 py-2 rounded-full bg-slate-100 text-dark text-sm">
        ${tool}
      </span>
    `;
  });
}

// =====================
// LINK
// =====================
const githubLink =
  document.getElementById("githubLink");

const demoLink =
  document.getElementById("demoLink");

const reportLink =
  document.getElementById("reportLink");

githubLink.href = project.github || "#";
demoLink.href = project.demo || "#";
reportLink.href = project.report || "#";

// =====================
// SLIDER
// =====================
let currentIndex = 0;

const mainImage =
  document.getElementById("mainImage");

const thumbnailContainer =
  document.getElementById("thumbnailContainer");

// Debug
console.log(project.images);

// =====================
// UPDATE IMAGE
// =====================
function updateImage(index) {

  if (!project.images || project.images.length === 0) {
    return;
  }

  currentIndex = index;

  mainImage.classList.add("opacity-0");

  setTimeout(() => {

    mainImage.src =
      project.images[index];

    mainImage.alt =
      `${project.title} - Dokumentasi ${index + 1}`;

    mainImage.classList.remove("opacity-0");

  }, 200);

  document
    .querySelectorAll(".thumbnail-item")
    .forEach((thumb, i) => {

      thumb.classList.remove(
        "border-primary",
        "scale-105"
      );

      if (i === index) {
        thumb.classList.add(
          "border-primary",
          "scale-105"
        );
      }
    });
}

// =====================
// INIT IMAGE
// =====================
mainImage.classList.add(
  "transition-all",
  "duration-300"
);

if (
  project.images &&
  project.images.length > 0
) {

  updateImage(0);

  // Thumbnail
  project.images.forEach((img, index) => {

    const thumb =
      document.createElement("img");

    thumb.src = img;

    thumb.alt =
      `${project.title} Thumbnail ${index + 1}`;

    thumb.className = `
      thumbnail-item
      w-28
      h-20
      object-cover
      rounded-xl
      border-2
      border-transparent
      cursor-pointer
      shadow
      hover:border-primary
      hover:scale-105
      transition-all
      duration-300
    `;

    thumb.addEventListener(
      "click",
      () => updateImage(index)
    );

    thumbnailContainer.appendChild(
      thumb
    );
  });

} else {

  mainImage.src =
    "https://placehold.co/1200x700";

  mainImage.alt =
    "Gambar tidak tersedia";
}

// =====================
// BUTTON PREV
// =====================
document
  .getElementById("prevBtn")
  .addEventListener("click", () => {

    if (!project.images) return;

    let newIndex =
      currentIndex - 1;

    if (newIndex < 0) {
      newIndex =
        project.images.length - 1;
    }

    updateImage(newIndex);
  });

// =====================
// BUTTON NEXT
// =====================
document
  .getElementById("nextBtn")
  .addEventListener("click", () => {

    if (!project.images) return;

    let newIndex =
      currentIndex + 1;

    if (
      newIndex >=
      project.images.length
    ) {
      newIndex = 0;
    }

    updateImage(newIndex);
  });

// =====================
// AUTO SLIDE
// =====================
if (
  project.images &&
  project.images.length > 1
) {
  setInterval(() => {

    let next =
      currentIndex + 1;

    if (
      next >=
      project.images.length
    ) {
      next = 0;
    }

    updateImage(next);

  }, 5000);
}