const API_KEY = "f0a03ab9220b4ad6bfcdf1eaa2179218";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {   //this function reloads the page when the logo is clicked
    window.location.reload()
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);   //fetch all the data articles from newsapi.org using unique API_KEY
    const data = await res.json();   //convert the fetched data into json file
    bindData(data.articles); 
}  //each article in data is a object in js with some fixed properties

function bindData(articles) {   //binding is done by - whatever articles are there they are made into a template and gets appended to the card-container 
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;  //if there is no property named "urlToImage" is present in any article then simply return
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }); //converting the property "publishedAt" date value from railway formant to human readable format 

    newsSource.innerHTML = `${article.source.name} . ${date}`;   //the name property is present inside the source property of article

    cardClone.firstElementChild.addEventListener("click",() => {
        window.open(article.url, "_blank")
    });  //when clicked on the article it must direct to the original url of article within new tab(so given blank)

}

let curSelectedNav = null;
function onNavItemClick(id) {    //this function helps in rendering the selected nav item news say ipl or finance or politics 
    fetchNews(id);     //fetch the selected id news
    const navItem =document.getElementById(id);
    curSelectedNav?.classList.remove('active');   //active class refers to the particular id we selected //this line removes active class from the classList
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", () => {
    const query =searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");   //when we select ipl and search something on search bar then ipl must be automatically deselected so remove
    curSelectedNav = null;   ///once it is removed make the current selected value null for next iteration of selecting among ipl,finance,politics
})




   
 
 
