const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
const baseURL = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${searchQuery}&pageSize=6&rapidapi-key=7db7f346d7msh9c264b713524a7cp1e858cjsnbc6999a2774a`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.value);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
    <div class="item">
      <img src="${result.image.url}" alt="img">
      <div class="flex-container">
        <h1 class="title">${result.title}</h1>
        <a class="view-btn" target="_blank" href="${
          result.url
        }">View News</a>
      </div>
      <p class="item-data"><font color="red">Date: ${result.datePublished}</font></p><br><br>
      <p class="item-data">${result.body}</p>
    </div>
  `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}


