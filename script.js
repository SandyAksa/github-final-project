let startButton = document.getElementById('start-btn')
startButton.addEventListener('click', startGame)

let nextButton = document.getElementById('next-btn')
nextButton.addEventListener('click', function(){
    currentQuestionIndex++
    setNextQuestion()
})

let questionContainerElement = document.getElementById('question-container')
let currentQuestionIndex = 0
let shuffledQuestions
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

let questionElement = document.getElementById('question')
let answerButtonsElement = document.getElementById('answer-buttons')
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach (answer => {           // looping array pake forEach ('answer' ditulis singular) utk masukin function ke setiap elemen array
        let button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct  // kasih data atribut jika correct, krn ini string bukan boolean
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)  // tambahin new element 'button' jadi child
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {           //selama masih punya child diremove
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(event) {
    let selectedButton = event.target
    let correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from (answerButtonsElement.children).forEach (button => {  //ubah ke array
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {  // jika question masih ada maka lanjut
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

let questions = [
  {
    question: 'What is 5 + 3?',
    answers: [
        { text: '8', correct: true },
        { text: '53', correct: false }
      ]
    },
    {
      question: 'What is 34 - 4 + 5?',
      answers: [
        { text: '0', correct: false },
        { text: '34', correct: false },
        { text: '35', correct: true },
        { text: '36', correct: false}
      ]
    },
    {
      question: 'What is 4 + 4 + 4?',
      answers: [
        { text: '8', correct: false },
        { text: '12', correct: true },
        { text: '24', correct: false },
        { text: '44', correct: false }
      ]
    },
    {
      question: 'What is 5 * 2 * 0?',
      answers: [
        { text: '10', correct: false },
        { text: '0', correct: true }
      ]
    }
]