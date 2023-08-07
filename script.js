const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

    const main = document.getElementById('main');
    const form = document.getElementById('form');
    const search = document.getElementById('search');


    // Initial Fav Movie List
    getMovies(APIURL);

    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();

        showMovies(respData.results);

        console.log(respData);

        return respData;
        // Bu kısımda eğer datanın kaydedilmesini bekletmezsem sadece promise  bastırıyor. await gerekli
       
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }

}

function showMovies(movies) {
    // clear main
    main.innerHTML = '';
    movies.forEach(movie => {
        const {poster_path, title, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img 
            src="${IMGPATH + movie.poster_path}" 
            alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${Math.round((vote_average + Number.EPSILON)*100)/100}</span>
        </div>
        <div class="overview">
        <h4> Overview: </h4>
        ${overview};
        </div>
        `
        main.appendChild(movieEl);
        // Yukarıda kullandığım Math.round methodu decimale yuvarlıyor vote oranını
         // elementleri sayfanın bodysine ekliyor
         // Yukarda da örnek bir class ekleme kullanımı var functionla birlikte
    });

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    
    if(searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
});