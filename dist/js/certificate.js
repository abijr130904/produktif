document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cert-container");
  const prevBtn = document.getElementById("prevCert");
  const nextBtn = document.getElementById("nextCert");
  const pageInfo = document.getElementById("pageInfo");

  if (!container || typeof certificates === "undefined") return;

  const itemsPerPage = 6;
  let currentPage = 1;

  function render() {
    container.innerHTML = "";
    pageInfo.textContent = currentPage;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageItems = certificates.slice(start, end);
    

    pageItems.forEach((img) => {
      const card = document.createElement("a");
      card.href = img;
      card.target = "_blank";

      card.className =
        "block bg-white shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition";

      card.innerHTML = `
        <div style="
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #f1f5f9;
          overflow: hidden;
        ">
          <img
            src="${img}"
            style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.5s;
            "
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'"
          />
        </div>
      `;

      container.appendChild(card);
    });

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= certificates.length;

    prevBtn.classList.toggle("opacity-50", prevBtn.disabled);
    nextBtn.classList.toggle("opacity-50", nextBtn.disabled);
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      render();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage * itemsPerPage < certificates.length) {
      currentPage++;
      render();
    }
  });

  render();
});