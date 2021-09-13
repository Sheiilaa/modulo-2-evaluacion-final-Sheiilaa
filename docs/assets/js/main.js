"use strict";const searchFilm=document.querySelector(".js_search-films"),button=document.querySelector(".js_button"),reset=document.querySelector(".js_reset"),films=document.querySelector(".js_films"),favoriteFilms=document.querySelector(".js_favorite-films"),defaultImage="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let globalData=[],favorites=[];function getFilms(i){i.preventDefault();let e=searchFilm.value;fetch("//api.tvmaze.com/search/shows?q="+e).then(i=>i.json()).then(i=>{globalData=i,paintFilms(globalData)})}function paintFilms(){films.innerHTML="";for(let i of globalData){let e="";e=void 0===favorites.find(e=>e.show.id===i.show.id)?"":"favorito",null===i.show.image?films.innerHTML+=`<li id="${i.show.id}" class="js-list_item ${e}"><div class="div_list"><h2 class="tittle_name">${i.show.name}</h2><img class= "image" src=${defaultImage} /></div></li>`:films.innerHTML+=`<li id="${i.show.id}" class="js-list_item ${e}"><div class="div_list"><h2 class="tittle_name">${i.show.name}</h2><img class="image" src="${i.show.image.medium}"/></div></li>`,listenCover()}}function listenCover(){const i=document.querySelectorAll(".js-list_item");for(let e of i)e.addEventListener("click",handleClickCover)}function handleClickCover(i){i.preventDefault();const e=parseInt(i.currentTarget.id),t=globalData.find(i=>i.show.id===e);void 0===favorites.find(i=>i.show.id===e)?favorites.push(t):favorites=favorites.filter(i=>i.show.id!==e),printFavorite(),paintFilms(),setLocalStorage()}function printFavorite(){favoriteFilms.innerHTML="";for(const i of favorites)null===i.show.image?favoriteFilms.innerHTML+=`<li id="${i.show.id}" class="list__favoritos"><div class="div_favoritos"><h1 class="title_favoritos">${i.show.name}</h1><img class="img_favoritos" src=${defaultImage}/><i id="${i.show.id}"></i></div></li>`:favoriteFilms.innerHTML+=`<li item-id="${i.show.id}" class="list_favoritos"><div class="div_favoritos"><h1 class="title_favoritos">${i.show.name}</h1><img class="img_favoritos" src="${i.show.image.medium}"/><i id="${i.show.id}"></i></div></li>`}function setLocalStorage(){localStorage.setItem("favorites",JSON.stringify(favorites))}function savedFilms(){const i=JSON.parse(localStorage.getItem("favorites"));null!==i&&(favorites=i),printFavorite()}function resetFav(){favoriteFilms.innerHTML="",localStorage.clear("favorites"),paintFilms()}button.addEventListener("click",getFilms),reset.addEventListener("click",resetFav),savedFilms();