const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0;
    document.getElementById('right-answer').innerText = quizScore; // ✅ Reset score
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    if (correct) {
        quizScore++; // ✅ Only increment when answer is correct
        document.getElementById('right-answer').innerText = quizScore;
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = {
    "questions": [
        {
            "question": "What is the capital of France?",
            "answers": [
                { "text": "Berlin", "correct": false },
                { "text": "Madrid", "correct": false },
                { "text": "Paris", "correct": true },
                { "text": "Rome", "correct": false }
            ]
        },
        {
            "question": "What is 2 + 2?",
            "answers": [
                { "text": "3", "correct": false },
                { "text": "4", "correct": true },
                { "text": "5", "correct": false },
                { "text": "6", "correct": false }
            ]
        },
        {
            "question": "What is the largest planet in our solar system?",
            "answers": [
                { "text": "Earth", "correct": false },
                { "text": "Jupiter", "correct": true },
                { "text": "Mars", "correct": false },
                { "text": "Saturn", "correct": false }
            ]
        },
        {
            "question": "What is the chemical symbol for water?",
            "answers": [
                { "text": "H2O", "correct": true },
                { "text": "O2", "correct": false },
                { "text": "CO2", "correct": false },
                { "text": "NaCl", "correct": false }
            ]
        },
        {
            "question": "Who wrote 'Romeo and Juliet'?",
            "answers": [
                { "text": "Charles Dickens", "correct": false },
                { "text": "William Shakespeare", "correct": true },
                { "text": "Mark Twain", "correct": false },
                { "text": "Jane Austen", "correct": false }
            ]
        }
    ]
};
