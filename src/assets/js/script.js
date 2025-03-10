document.addEventListener("DOMContentLoaded", async () => {
  const projectsList = document.querySelector(".projects__list");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  const itemsPerPage = 4;
  let currentItemIndex = 0;

  const apiGitHub = async () => {
    try {
      const response = await fetch("https://api.github.com/users/loez97/repos");
      if (!response.ok) throw new Error("Erro na requisição");
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderApiResult = async () => {
    const data = await apiGitHub();
    if (!data.length) {
      projectsList.innerHTML =
        "<p class='projects__error'>Nenhum projeto encontrado.</p>";
      return;
    }

    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("projects__item");
      div.style.display = "none"; // Oculta inicialmente
      div.innerHTML = `
          <h4 class="projects__name">${item.name}</h4>
          <a class="projects__repositorie" href="${
            item.html_url
          }" target="_blank">Repositório</a>
          <a class="projects__deploy" href="https://loez97.github.io/${
            item.name
          }/" target="_blank">Deploy</a>
          <time class="projects__date">Criado em: ${formatDate(
            item.created_at
          )}</time>
        `;
      projectsList.appendChild(div);
    });

    showItems();
  };

  function showItems() {
    const items = projectsList.querySelectorAll(".projects__item");

    const nextItems = Array.from(items).slice(
      currentItemIndex,
      currentItemIndex + itemsPerPage
    );
    nextItems.forEach((item) => (item.style.display = "block"));

    currentItemIndex += itemsPerPage;
    if (currentItemIndex >= items.length) loadMoreBtn.style.display = "none";
  }

  loadMoreBtn.addEventListener("click", showItems);

  await renderApiResult();
});