import "./style.css";
import { get } from "./fetcher";

const feed = document.querySelector('[data-js="feed"]');

const baseURL =
  "https://us-central1-squid-apis.cloudfunctions.net/test-front-basic";

const disableLoading = () => {
  const loader = document.querySelector('[data-js="loader"]');
  loader.setAttribute("class", "hide");
};

const createFeedPhotos = (data) => {
  const div = document.createElement("div");
  div.setAttribute(
    "class",
    "col-12 col-md-8 col-lg-6 col-xxl-4 card-container"
  );

  div.innerHTML = `

  <div class="my-card ">
      <a href="${data.link}" target="__blank">
        <img class="img-fluid" src="${data.imagens.resolucaoMedia.url}" alt="${
    data.legenda
  }" />
      </a>

      <div class="card-hover">

        <div class="card-hover--icons">
          <i class="fas fa-at pink"></i>
          <span class="text-white">${data.usuario.username}</span>
        </div>

        <div class="card-hover--icons">
          <i class="fas fa-heart pink"></i>
          <span class="text-white">${data.upvotes}</span>
        </div>

        <div class="card-hover--icons">
          <i class="fas fa-comment pink"></i>
          <span class="text-white">${data.comentarios}</span>
        </div>

        <div class="card-hover--icons">
          <i class="fas fa-calendar-alt pink"></i>
          <span class="text-white">${formatDate(data.criadoEm)}</span>
        </div>
      </div>
    </div>

    `;
  feed.appendChild(div);
  disableLoading();
};

const formatDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });

  return formattedDate;
};

const createNoPhoto = () => {
  const div = document.createElement("div");
  div.setAttribute("class", "box background-white black text-center");

  div.textContent = "Nenhuma imagem encontrada";
  feed.appendChild(div);
};

const showError = (errorMessage) => {
  const error = document.querySelector('[data-js="error"]');
  disableLoading();
  error.classList.remove("hide");
  error.textContent = errorMessage;
};

const main = async () => {
  const result = await get(baseURL);
  const hasError = result.error;

  if (hasError) {
    showError(result.message);
    return;
  }

  const noPhoto = result.length === 0;

  if (noPhoto) {
    createNoPhoto();
    return;
  }

  result.forEach(createFeedPhotos);
};

main();
