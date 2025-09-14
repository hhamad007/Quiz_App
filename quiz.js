const questions = [
  {
    question: "What is the capital of France?",
    answer: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: [
      { text: "Earth", correct: false },
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
    ]
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answer: [
      { text: "William Shakespeare", correct: true },
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
    ]
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answer: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ]
  },
  {
    question: "What is the boiling point of water at sea level?",
    answer: [
      { text: "90°C", correct: false },
      { text: "100°C", correct: true },
      { text: "80°C", correct: false },
      { text: "120°C", correct: false },
    ]
  },
];


// Get elements from the page
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  // Clear old answers
  answerButtons.innerHTML = "";
  nextButton.style.display = "none";

  let q = questions[currentQuestion];
  questionElement.innerText = (currentQuestion + 1) + ". " + q.question;

  // Create buttons for each answer
  q.answer.forEach(ans => {
    let btn = document.createElement("button");
    btn.innerText = ans.text;
    btn.classList.add("btn");

    if (ans.correct) {
      btn.dataset.correct = "true";
    }

    btn.addEventListener("click", () => selectAnswer(btn));
    answerButtons.appendChild(btn);
  });
}

function selectAnswer(button) {
  let correct = button.dataset.correct === "true";

  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
  }

  // Show correct answer for all
  Array.from(answerButtons.children).forEach(btn => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });

  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionElement.innerText = `You scored ${score} out of ${questions.length}`;
  answerButtons.innerHTML = "";
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestion < questions.length) {
    nextQuestion();
  } else {
    // Reset quiz
    currentQuestion = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
  }
});

// Start the quiz
showQuestion();





