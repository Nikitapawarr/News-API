const APIKEY = "176adfc63dd74a74a161f045c7d11030";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));
async function fetchNews(query) {
  const res = await fetch(`${URL}${query}&apiKey=${APIKEY}`);
  const data = await res.json();
  BindData(data.articles);
}

function BindData(articles) {
  const cardsContainer = document.getElementById("card-container");
  const cardsTemplate = document.getElementById("card-template");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) 
        return;

    const cardsClone = cardsTemplate.content.cloneNode(true);
    fillDataInCard(cardsClone, article);
    cardsContainer.appendChild(cardsClone);
  });
}
function fillDataInCard(cardsClone, article) {
  const newsImg = cardsClone.querySelector('#news-photo');
  const newsTitle = cardsClone.querySelector('#news-title');
  const newsSource = cardsClone.querySelector('#news-source');
  const newsDescription = cardsClone.querySelector('#news-description');

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDescription.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name}-${date}`;

  cardsClone.firstElementChild.addEventListener("click",() =>{
    window.open(article.url , "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    let navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

}
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click',() =>{
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    navItem = null;
})
function reload(){
    window.location.reload();
}