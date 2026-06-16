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

    pageItems.forEach((file) => {
      const isPdf = file.toLowerCase().includes(".pdf");

      const el = document.createElement("a");
      el.href = file;
      el.target = "_blank";

      // 🔥 NO CARD STYLE, FULL FLEX AUTO SIZE
      el.className = "block w-full h-auto overflow-hidden";

      el.innerHTML = `
        ${
          isPdf
            ? `
              <iframe
                src="${file}#view=FitH"
                class="w-full border-0 block"
                style="height: 500px;"
              ></iframe>
            `
            : `
              <img
                src="${file}"
                class="w-full h-auto block"
                alt="sertifikat"
              />
            `
        }
      `;

      container.appendChild(el);
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