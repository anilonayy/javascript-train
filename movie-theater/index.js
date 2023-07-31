const MOVIES_KEY  = "Movies";

const checkAllButton = document.getElementById("checkAll");
const movieSelectList = document.getElementById("movieSelectList");
const priceInfoBar = document.getElementById("price-info-bar");


let movies;
let currentMovie;
let selectedSeats = [];
let ignoredSeats = [];

let price = 0;
let ticketCount = 0;

function initApp(movieId=1)
{
    let movieList= [
        {id  : 1 , name :"Movie 1", price:50 , selectedSeats : [1,2]},
        {id  : 2 , name :"Movie 2", price:25 , selectedSeats : [2,3]}, 
        {id  : 3 , name :"Movie 3", price:15 , selectedSeats : [7,15]},
        {id  : 4 , name :"Movie 4", price:40 , selectedSeats : [24,26]}
    ];

    movies = localStorage.getItem(MOVIES_KEY);
    // If movies are null  then add default movies
    if(movies == null)
    {
        localStorage.setItem(MOVIES_KEY,JSON.stringify(movieList));
        movies = localStorage.getItem(MOVIES_KEY);
    }
    movies = JSON.parse(movies);
    currentMovie = movies.find(movie=> movie.id == movieId);

    // add movies to select box
    movieSelectList.innerHTML = ``;
    movies.map(movie => {
        movieSelectList.innerHTML += `<option value="${movie.id}">${movie.name}</option>`;
    });
    // Clear if has old class names
    [...document.querySelectorAll("label")].map(label => {
        label.className = ""
    })
   // Set ignored seats and styles
    ignoredSeats = currentMovie.selectedSeats ||[];
    ignoredSeats.length ? ignoredSeats.map(seatId => {
        document.querySelector(`label[for=seat-${seatId}]`).classList.add("full-seat");
    }) : "";
}

function updateApp(movieId=1)
{
    currentMovie = movies.find(movie=> movie.id == movieId);


    // Clear if has old class names
    [...document.querySelectorAll("label")].map(label => {
        label.className = ""
    })
   // Set ignored seats and styles
    ignoredSeats = currentMovie.selectedSeats ||[];
    ignoredSeats.length ? ignoredSeats.map(seatId => {
        document.querySelector(`label[for=seat-${seatId}]`).classList.add("full-seat");
    }) : "";

    selectedSeats = [];
    updatePrice();
}



function updatePrice()
{
    let length = selectedSeats.length;
    if(length > 0 )
    {
        price = length * currentMovie.price ;
        ticketCount = length;
        
        priceInfoBar.classList.remove("hidden");
        priceInfoBar.innerHTML = `Price is<span class="gold-color">${price}</span> TL for <span class="gold-color">${ticketCount}</span> seats.`
    }
    else{
        priceInfoBar.classList.add("hidden");
    }
}

[...document.querySelectorAll("input[type=checkbox]")].map(checkbox => {
    checkbox.addEventListener("change",function(e)
    {
        let label = e.target.previousElementSibling;
        let id = label.getAttribute("for").split("-")[1];
        let checked = e.target.checked;

        // If the seat is empty ? 
        if( ! ignoredSeats.find( ignoredId => ignoredId ==id ) ){

            checked ? label.classList.add("selected-seat") : label.classList.remove("selected-seat");
            checked ? selectedSeats.push(id)  :  selectedSeats = selectedSeats.filter(seatId  => seatId !== id );
            updatePrice();
        }
    })
})

movieSelectList.addEventListener("change",(e)=> {
    updateApp(e.target.value);
})


document.getElementById("buyIt").addEventListener("click",() => {

    if(ticketCount)
    {
        // Add selected seats to current movie
        selectedSeats.map(seat => {
            currentMovie.selectedSeats.push(seat);
        });

        alert(`${price} as ${ticketCount} person. Order successfully received.`);

        // Update all movies
        movies.map(movie => {
            if(movie.id === currentMovie.id){
                movie.selectedSeats = currentMovie.selectedSeats;
            }
        });

        localStorage.setItem(MOVIES_KEY,JSON.stringify(movies));

        

    }
    else{
        alert("Please select a seats.");
    }
    updateApp();
});


initApp();