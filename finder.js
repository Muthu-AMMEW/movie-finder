const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const searchMsg = document.getElementById('searchMsg');
const errorMsg = document.getElementById('errorMsg');
const result = document.getElementById('result');

let searchValue = "";
let dataArray = [];
let movieDetails = "";

//https://www.omdbapi.com/apikey.aspx for api keys   http://www.omdbapi.com/?i=tt3896198&apikey=fe605b0b

search.addEventListener('keyup', () => {
    errorMsg.style.display = 'none';
    // helps to clear error message after wrong search
    searchValue = search.value;
    if (searchValue == "") {
        searchMsg.style.display = 'block';
    }
    else {
        searchMsg.style.display = 'none';
    }
})

searchBtn.addEventListener('click', () =>
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=fe605b0b&s=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            dataArray = [];
            movieDetails = ''; //helps to clear previous search result while next search.
            dataArray.push(data);
            if (dataArray[0].Search) {
                for (let datavalues of dataArray[0].Search) {
                    titleNames(datavalues);
                }
            }
            else {
                result.innerHTML= movieDetails; //help to clear pervious search result while error
                errorMsg.style.display = 'block';
                dataArray = [];
            }
        })
)

function titleNames(data) {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=fe605b0b&t=${data.Title}`)
        .then(res => res.json())
        .then((dataTitle => {
            movieDetails += `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img class="card-img-top" src="${dataTitle.Poster == 'N/A' ? "./pictures/placeholder.png" : dataTitle.Poster}" alt="Movie Poster">
                    <div>${dataTitle.imdbRating}</div>
                    <div class="card-body">
                        <h3 class="card-title">${dataTitle.Title}</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${dataTitle.Runtime}</li>
                            <li class="list-group-item">${dataTitle.Language}</li>
                            <li class="list-group-item">${dataTitle.Genre}</li>
                            <li class="list-group-item">${dataTitle.Released}</li>
                        </ul>
                        <p class="card-text">${dataTitle.Plot}</p>
                    </div>
                </div>
            </div>`
            result.innerHTML = movieDetails;
            // searchMsg.style.display = 'none';
            dataArray = [];
        }))
}

resetBtn.addEventListener('click', () => {
    search.value = '';
    dataArray = [];
    movieDetails = '';
    result.innerHTML = movieDetails;
    search.style.display = 'block';
})