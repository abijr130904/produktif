document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("project-container");

  if (!container || typeof projects === "undefined") return;

  container.innerHTML = "";

  projects.forEach((p) => {
    const img =
      p.images && p.images.length > 0
        ? p.images[0]
        : "https://placehold.co/600x400";

    const card = document.createElement("div");
    card.className = "w-full sm:w-1/2 lg:w-1/3 p-4";

    card.innerHTML = `
      <a href="project-detail.html?id=${p.id}" class="block group">

        <!-- CARD (NO ROUNDED) -->
        <div class="bg-white shadow-md overflow-hidden h-full border border-slate-200">

          <!-- IMAGE -->
          <div class="w-full h-72 overflow-hidden">
            <img 
              src="${img}" 
              alt="${p.title}"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          <!-- TITLE -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-dark group-hover:text-primary transition">
              ${p.title}
            </h3>
          </div>

        </div>
      </a>
    `;

    container.appendChild(card);
  });
});