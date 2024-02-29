const Questions = [
    {
        Question: "What is the capital city of France?",
        answers:[
            {text:"Rome",correct:false},
            {text:"Madrid",correct:false},
            {text:"Paris",correct:true},
            {text:"Berlin",correct:false}
        ]
    },
    {
        Question: "Which planet is known as the 'Red Planet'?",
        answers:[
            {text:"Venus",correct:false},
            {text:"Jupiter",correct:false},
            {text:"Saturn",correct:false},
            {text:"Mars ",correct:true}
        ]
    },
    {
        Question: "Who wrote the play 'Romeo and Juliet'?",
        answers:[
            {text:"Charles Dickens",correct:false},
            {text:"William Shakespeare",correct:true},
            {text:"Jane Austen",correct:false},
            {text:"Mark Twain",correct:false}
        ]
    },
    {
        Question: "In which year did the Titanic sink?",
        answers:[
            {text:"Atlantic Ocean",correct:false},
            {text:"Indian Ocean",correct:false},
            {text:"Pacific Ocean",correct:true},
            {text:"Arctic Ocean",correct:false}
        ]
    },
    {
        Question: "Who is known as the 'Father of Computer Science'?",
        answers:[
            {text:"Alan Turing",correct:true},
            {text:"Bill Gates",correct:false},
            {text:"Steve Jobs",correct:false},
            {text:"Tim Berners-Lee",correct:false}
        ]
    },
    {
        Question: "Which country is known as the 'Land of the Rising Sun'?",
        answers:[
            {text:"China",correct:false},
            {text:"Japan ",correct:true},
            {text:" South Korea",correct:false},
            {text:"Vietnam",correct:false}
        ]
    },
]
const questionEle = document.getElementById('question');
const answerEle = document.getElementById('answer');
const nextEle = document.getElementById('next');

let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextEle.innerHTML="Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQuestion= Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionEle.innerHTML = questionNo+". "+currentQuestion.Question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerEle.append(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
 

function resetState()
{
    nextEle.style.display='none';
    while(answerEle.firstChild){
        answerEle.removeChild(answerEle.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct=="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerEle.children).forEach(button=>{
        if(button.dataset.correct == "true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextEle.style.display="block";
}
nextEle.addEventListener("click",()=>{
    if(currentQuestionIndex<Questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex<Questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}

function showScore()
{
    resetState();
    questionEle.innerHTML = `Your Score is ${score} out of ${Questions.length}`;
    nextEle.innerHTML="Play Again";
    nextEle.style.display="block";
}


startQuiz();