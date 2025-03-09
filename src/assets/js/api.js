const apiGitHub = async () => {
  try {
    const response = await fetch("https://api.github.com/users/loez97/repos");
    if (!response.ok) throw new Error("Erro na requisição");
    const data = await response.json();
    return data.length ? data : null; // Verifica se há repositórios
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null; // Retorna null em caso de erro
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const renderApiResult = async () => {
  const data = await apiGitHub();

  if (!data) {
    ul.innerHTML =
      "<p class='projects__error'>Nenhum projeto encontrado ou erro na API.</p>";
    return;
  }

  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("projects__item");
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
    document.querySelector(".projects__list").appendChild(div);
  });
};

renderApiResult();
