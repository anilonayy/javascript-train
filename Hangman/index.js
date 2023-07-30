const oldWordsEl = document.getElementById("old-words");
const wordEl = document.getElementById("word");

const words = [
    "ability","access","comedy","depression","competitive","commit","computer"
];

const wordCount = words.length;
let currentWord = "";
let wrongWords = [];
let correctWords = [];


function initApp(){
    
    let randomKey;
    let newWord;


    do{
         randomKey = Math.floor(Math.random() * wordCount);
         newWord = words[randomKey];
    }
    while(currentWord == newWord)
    currentWord = newWord;

    wordEl.innerHTML= "";
    currentWord.split("").map(char => {
        wordEl.innerHTML += `<span class="secret-word"></span>`;
    });

   
}
function resetApp()
{


    for(let i=1;i<= wrongWords.length;i++)
    {
        document.querySelector(`[wrong-level='${i}']`).classList.add("hidden-field");
    }

    wrongWords = [];
    correctWords= [];
    oldWordsEl.innerHTML="";
}
function updateApp()
{
    // Set Current Word
    wordEl.innerHTML = "";
    currentWord.split("").map(char => {
        let writeChar = ' ';
        if(correctWords.includes(char)){
            writeChar = char;
        }
        wordEl.innerHTML += `<span class="secret-word">${writeChar}</span>`;
    });

    // Show Wrong Words if exists
    if(wrongWords.length > 0){
        oldWordsEl.innerHTML = wrongWords.join(",");
    }

    // Set Skeleton level
    for(let i =1; i <= 6 ;i++)
    {
        if(i <= wrongWords.length )
        {
            document.querySelector(`[wrong-level='${i}']`).classList.remove("hidden-field");
        }
    }
}

function checkGameStatus()
{
    // if lose
    if(wrongWords.length == 6)
    {
        alert("Lose ! your man is die..");
        resetApp();
        initApp();
    }
    let targetLength  = [...new Set(currentWord.split(""))].length;
    let currentLength = [...new Set(correctWords)].length;

    if(targetLength == currentLength)
    {
        alert("YOU WİN !");
        resetApp();
        initApp()
    }
    
}

document.addEventListener("keydown",(e) => {
    var letters = /^[A-Za-z]+$/;

    let key = e.key;

    // If key is valid alphabetics
    if(letters.test(key) && key.length ==1)
    {
        // If it is a correct word
        if(currentWord.includes(key))
        {
            correctWords.push(key);
        }
        else if(!wrongWords.includes(key)){
            wrongWords.push(key);
        }
    }


    updateApp();
    checkGameStatus();
})



resetApp();
initApp();
updateApp();
