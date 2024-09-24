const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const searchMsg = document.getElementById('searchMsg');
const errorMsg = document.getElementById('errorMsg');
const result = document.getElementById('result');

let searchValue = "";
let dataArray = [];
let movieDetails = "";

//https://www.omdbapi.com/apikey.aspx for api keys http://www.omdbapi.com/?i=tt3896198&apikey=fe605b0b

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

searchBtn.addEventListener('click', async() =>
    await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=fe605b0b&s=${searchValue}`)
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
                result.innerHTML = movieDetails; //help to clear pervious search result while error
                errorMsg.style.display = 'block';
                dataArray = [];
            }
        })
)

function titleNames(data) {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=fe605b0b&t=${data.Title}`)
        .then(res => res.json())
        .then((dataTitle => {
            movieDetails += `<div class="col-md-6 col-lg-4 mb-3">
                                <div class="card">
                                    <img class="card-img-top" src="${dataTitle.Poster == 'N/A' ? " ./pictures/placeholder.jpg" : dataTitle.Poster}"
                                        alt="Movie Poster">
                                    <div><i class="bi bi-star-fill"></i>&nbsp; ${dataTitle.imdbRating}</div>
                                    <div class="card-body">
                                        <h4 class="card-title"><i class="bi bi-card-heading"></i>&nbsp; ${dataTitle.Title}</h4>
                                        <ul class="list-group">
                                            <li class="list-group-item"><i class="bi bi-hourglass-split"></i>&nbsp; ${dataTitle.Runtime}</li>
                                            <li class="list-group-item"><i class="bi bi-translate"></i>&nbsp; ${dataTitle.Language}</li>
                                            <li class="list-group-item"><i class="bi bi-backpack4"></i>&nbsp; ${dataTitle.Genre}</li>
                                            <li class="list-group-item"><i class="bi bi-calendar3"></i>&nbsp; ${dataTitle.Released}</li>
                                            <li class="list-group-item">
                                                <p class="card-text">${dataTitle.Plot}</p>
                                            </li>
                                        </ul>
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