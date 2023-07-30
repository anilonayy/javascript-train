const imgEl = document.getElementById("slider-img");
const titleEl = document.getElementById("slider-title");
const linkEl = document.getElementById("slider-link");



const buttonGroup = document.getElementById("buttons");
const nextSlideEl = document.getElementById("nextSlideEl");
const prevSlideEl = document.getElementById("prevSlideEl");

const settings  = {
    interval : 2000,
    random : true
};

let index = 0 ;
let interval;



const sliders = [
    {name : "Slider 1" , src : "./img/1.jpg" ,link : "https://www.example.com" },
    {name : "Slider 2" , src : "./img/2.jpg", link : "https://www.example.com"  },
    {name : "Slider 3" , src : "./img/3.jpg", link : "https://www.example.com"  },
    {name : "Slider 4" , src : "./img/4.jpg", link : "https://www.example.com"  },
    {name : "Slider 5" , src : "./img/5.jpg", link : "https://www.example.com"  }
];

let sliderCount = sliders.length;



function init()
{
    ShowSlide();
    interval = setInterval(intervalAction, settings.interval);
} 

function ShowSlide()
{
    imgEl.src = sliders[index].src;
    titleEl.innerText = sliders[index].name;
    linkEl.href = sliders[index].link;
}

function intervalAction()
{
    
    if(settings.random)
    {
        let randomIndex;
        let prevIndex = index;

        do{
            randomIndex = Math.floor( Math.random() * sliderCount);
        }
        while(prevIndex == randomIndex);

        index =  randomIndex;
    }
    else{

        index++;
        if(index == sliderCount )
        {
            index = 0;
        }
    }
    
    ShowSlide();
}




buttonGroup.addEventListener("mouseenter",() => {
    clearInterval(interval);

});

buttonGroup.addEventListener("mouseleave",() => {
    
    interval = setInterval(intervalAction, settings.interval);
});



nextSlideEl.addEventListener("click",() => {    
    if(index+1 == sliderCount)
    {
        alert("There is no more slide.");
    }
    else{
        index ++;
    }
    ShowSlide();
});

prevSlideEl.addEventListener("click",() => {
    if(index-1 >= 0 )
    {
         index--;
    }
    else{
        alert("Daha geride slider yok.");
    }
    ShowSlide();
})


init();

