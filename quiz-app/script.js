// // !Create instance with constructor function
function Question(question,answers,correctAnswer)
{
    this.question = question;
    this.answers = {
        a: answers[0],
        b: answers[1],
        c: answers[2],
        d: answers[3]
    };
    this.correctAnswer = correctAnswer;
    // this.isCorrect = (answer) => answer === correctAnswer;  
}

Question.prototype.isCorrect = function(answer){
    return this.correctAnswer === answer;
}



const questions = [
    new Question("What is first letter of alphabet?",["b","k","n","a"],"d"),
    new Question("How many legs have a dogs?",["2","6","4","8"],"c"),
    new Question("What is shape of world?",["square","flat","ellipsis","triangle"],"c"),
    new Question("How many proteins have per 100gr of chicken?",["8","17","23","44"],"c"),
];

const starting = document.getElementById("starting");
const questionsEl = document.getElementById("questions");
const results = document.getElementById("results");


const startBtn = document.getElementById("start-button");
const timeoutEl = document.getElementById("timeout-el");
const questionTitleEl= document.getElementById("question-title-el")
const cardTitleEl = document.getElementById("card-title-el");
const questionAnswersEl  = document.getElementById("question-answers");
const nextQuestionBtn = document.getElementById("next-question");


let currentQuestion;
let questionIndex = 0;

let correctAnswerCount = 0;
let wrongAnswerCount   = 0;
let questionTimeLeft = 0;


const appSettings = {
    isStarted :  false,
    isFinished : false,
    questionTime  : 10,
    questionInterval : null,
    canPassable : false,
    canAnswerable : false
};





function startApp()
{
    appSettings.isStarted = true;
    hideAndShow(starting,questionsEl);
    showQuestion(0);
}

function resetApp()
{
    appSettings.isStarted = false;
    appSettings.isFinished = false;
    appSettings.canPassable = false;
    appSettings.canAnswerable = false;

    hideAndShow(results,starting);
    questionIndex = 0;
    correctAnswerCount = 0;
    wrongAnswerCount = 0;
    currentQuestion = {};
}

function showQuestion(number = 0)
{
    startQuestion();
    
    currentQuestion = questions[number];

    cardTitleEl.innerHTML =  ` ${questionIndex+1} of ${questions.length} questions`;
    timeoutEl.innerHTML = appSettings.questionTime.toString();
    questionTitleEl.innerHTML = currentQuestion.question;
    questionAnswersEl.innerHTML =  Object.keys(currentQuestion.answers).map( answerCode => {
            return `<div answer-code="${answerCode}" class="question-answer"><b>${answerCode})</b> ${currentQuestion.answers[answerCode]}</div>`
        }).join("");
    


    appSettings.questionInterval = setInterval(() => {
        if(questionTimeLeft ==  0){
            endQuestion();
            showAnswer();
            clearInterval(appSettings.questionInterval);
        }else{
            questionTimeLeft--;
            timeoutEl.innerHTML = questionTimeLeft.toString();
        }
    }, 1000);


}

function startQuestion()
{
    unblockAnswers();
    blockNavigation();
    questionTimeLeft = appSettings.questionTime;
}

function endQuestion()
{
    blockAnswers();
    unblockNavigation();
}

function blockAnswers()
{
    appSettings.canAnswerable = false;
    questionAnswersEl.classList.add("is-answered");
}

function unblockAnswers()
{
    appSettings.canAnswerable = true;
    questionAnswersEl.classList.remove("is-answered");
}

function blockNavigation()
{
    appSettings.canPassable = false;
    nextQuestionBtn.className = "btn btn-primary inactive-button";
}

function unblockNavigation()
{
    appSettings.canPassable = true;
    nextQuestionBtn.className = "btn btn-primary";
}

function showAnswer()
{
    blockAnswers();
    document.querySelector(`[answer-code=${currentQuestion.correctAnswer}]`).className = "is-valid question-answer";
}

function doAnswer(answerCode)
{
    clearInterval(appSettings.questionInterval);

    if(currentQuestion.isCorrect(answerCode))
    {
        correctAnswerCount++;
    }
    else{
        document.querySelector(`[answer-code=${answerCode}]`).className = "question-answer is-invalid";
        wrongAnswerCount++;
    }
    endQuestion();
    showAnswer();
}

function nextQuestionChecker()
{
    questionIndex++;

    if(questions.length <= questionIndex)
    {
        hideAndShow(questionsEl,results);
        appSettings.isFinished = true;
        setResults();
    }
    
    else if(appSettings.canPassable)
    {
        showQuestion(questionIndex);
    }


    if(questions.length-1 == questionIndex)
    {
        nextQuestionBtn.innerHTML ="Finish!";
    }


}

function setResults()
{
    results.innerHTML = `
    <div class="alert alert-success">
    <p>Congratulations! ${correctAnswerCount} correct answer from ${questions.length} answers!</p>
    <button onclick="resetApp()" class="btn btn-primary">Reset</button>
    </div> 
    `
}

function hideAndShow(hideEl,showEl)
{
    hideEl.classList.add("hidden");

    setTimeout(() => {
        hideEl.style.display = "none";

        showEl.style.display="block";
        showEl.classList.remove("hidden");
    }, 300);
}



// Listen user keydowns
document.onkeydown = (e) => {

    let key = e.code.replace("Key","").toLowerCase();

    if(key == "enter" )
    {
        if(!appSettings.isStarted)
            startApp();
        else if(!appSettings.isFinished && appSettings.canPassable)
            nextQuestionChecker()
    }

    if(appSettings.canAnswerable)
    {
        if(["a","b","c","d"].includes(key)){
            doAnswer(key);
        }
    }
}
// Click the one of answer
document.addEventListener("click",(e) => {

    if([...e.target.classList].includes("question-answer"))
    {   
        if(appSettings.canAnswerable)
        {
            let answer = e.target.getAttribute("answer-code");
            doAnswer(answer);
        }        
    }
})

// Listen Next Question Click
nextQuestionBtn.addEventListener("click",function(){
    nextQuestionChecker();
})

startBtn.addEventListener("click",function()
{
    startApp();
})