var omdbApi;
var ShowFilms;

window.onload = () =>{
    // OMDb API Model creation
    moviesList = new moviesList; 

    // ShowFilms View creation
    ShowFilms = new ShowFilmsView;

    
    searchInput = document.getElementById("search-input");

    let debounceTimer;
    // Set Enter Input event to the search input
    searchInput.addEventListener("input", async ()=>{

        // Clean TimeOut if exists
        clearTimeout(debounceTimer);

        // Set TimeOut
        debounceTimer = setTimeout(async () => {
            // Request Method on OMDb model
            await moviesList.loadDoc(searchInput.value.trim(), true);

            // LLAMADA VISTA CAMBIAR
            ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);

            asignDetailsEvent();
        }, 300);
    });

    // Asign scroll loader
    window.addEventListener('scroll', async ()=> {

        const {scrollHeight, clientHeight, scrollTop} = document.documentElement
    
        // console.log(`scrollTop + clientHeight = ${scrollTop + clientHeight}  | Altura personalizada = ${scrollHeight - 3}`)
        if(scrollTop + clientHeight > scrollHeight - 3 && moviesList.actualPage<=moviesList.pages && !moviesList.executingRequest){
            await moviesList.loadDoc(searchInput.value.trim(), false);
            ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
            asignDetailsEvent();
        }
    });

    // Change view depending the Order Selected
    document.getElementById("order").addEventListener("change", (e)=>{
        let opt = e.target.value;
        let movies;
        switch(opt){
            case 'opt1': // Order None
                movies = moviesList.movies
                break;
            case 'opt2': // Order By Idbm Rating
                movies = orderByRating(moviesList.movies);
                break;
            case 'opt3': // Order by fundraising
                break;
            case 'opt4': // Order by Votes
                break;
        }
        ShowFilms.showFilms(movies, moviesList.totalResults, moviesList.response);
    });

}

// Asign click event to show details of the Film
function asignDetailsEvent(){
    films = document.getElementById("films").querySelectorAll("div");
    films.forEach(film => {
        film.addEventListener("click", async ()=> {
            filmDetails = await moviesList.loadDocFilm(film.imdbID);
            console.log(filmDetails)

            ShowFilms.showFilm(filmDetails);
        });
    });
}

// Order an array by Rating
function orderByRating(movies){

}