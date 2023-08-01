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


const timeoutEl = document.getElementById("timeout-el");
const questionTitleEl= document.getElementById("question-title-el")
const cardTitleEl = document.getElementById("card-title-el");
const questionAnswersEl  = document.getElementById("question-answers");
const nextQuestionBtn = document.getElementById("next-question");


let currentQuestion;
let questionNumber = 0;

let correctAnswerCount = 0;
let wrongAnswerCount   = 0;

const appSettings = {
    isStarted :  false,
    questionTime  : 4,
    questionInterval : null
};

document.onkeydown = (e) => {
    if(!appSettings.isStarted)
    {
        if(e.code == "Enter" )
        {
            startApp();
        }
    }
}


function startApp()
{
    appSettings.isStarted = true;
 
    starting.classList.add("hidden");

    setTimeout(() => {
        questionsEl.classList.remove("hidden");        
        showQuestion(0);
    }, 300);

}

function showQuestion(number = 0)
{
    currentQuestion = questions[number];

    cardTitleEl.innerHTML =  ` ${questionNumber+1} of ${questions.length +1} questions`;
    timeoutEl.innerHTML = appSettings.questionTime.toString();
    questionTitleEl.innerHTML = currentQuestion.question;
    questionAnswersEl.innerHTML =  Object.keys(currentQuestion.answers).map( answerCode => {
            return `<div answer-code="${answerCode}" class="question-answer"><b>${answerCode})</b> ${currentQuestion.answers[answerCode]}</div>`
        }).join("");
    


    appSettings.questionInterval = setInterval(() => {
        if(appSettings.questionTime ==  0){
            console.log("SÜRE BİTTİ!");
            blockAnswers();
            showAnswer();
            clearInterval(appSettings.questionInterval);
        }else{
            appSettings.questionTime--;
            timeoutEl.innerHTML = appSettings.questionTime.toString();
        }
    }, 1000);
}


function blockAnswers()
{
    questionAnswersEl.classList.add("is-answered");
}

function unblockAnswers()
{
    questionAnswersEl.classList.remove("is-answered");
}

function showAnswer()
{
    blockAnswers();
    document.querySelector(`[answer-code=${currentQuestion.correctAnswer}]`).className = "is-valid question-answer";
}

document.addEventListener("click",(e) => {
    if([...e.target.classList].includes("question-answer"))
    {
        let answer = e.target.getAttribute("answer-code");
        
        clearInterval(appSettings.questionInterval);

        if(currentQuestion.isCorrect(answer))
        {
            correctAnswerCount++;
            showAnswer();
        }
        else{
            e.target.className = "question-answer is-invalid";
            wrongAnswerCount++;
            showAnswer();
        }
    }
})

