const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $progressBar = document.querySelector(".progress-bar");
let currentQuestionIndex = 0;
let totalCorrect = 0;

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

const questions = [
  {
    question: "Qual dessas NÃO é uma cor da bandeira brasileira?",
    answers: [
      { text: "Azul.", correct: false },
      { text: "Amarelo.", correct: false },
      { text: "Verde.", correct: false },
      { text: "Cinza.", correct: true },
    ],
  },
  {
    question: "Quem foi o Ayrton Senna?",
    answers: [
      { text: "Piloto de F1.", correct: true },
      { text: "Político.", correct: false },
      { text: "Advogado.", correct: false },
      { text: "Presidente da república.", correct: false },
    ],
  },
  {
    question: 'Onde foi a primeira capital do Brasil?',
    answers: [
      { text: 'Amapá.', correct: false },
      { text: 'Brasília.', correct: false },
      { text: 'Bahia.', correct: true },
      { text: "Rio Grande do Sul.", correct: false },
    ],
  },
  {
    question: 'Onde se localiza o Cristo Redentor?',
    answers: [
      { text: "São Paulo.", correct: false },
      { text: "Rio de Janeiro.", correct: true },
      { text: "Acre.", correct: false },
      { text: "Amapá.", correct: false },
    ],
  },
  {
    question: 'Quem foi o primeiro navegador europeu a chegar no Brasil?',
    answers: [
      { text: 'Getúlio Vargas', correct: false },
      { text: 'Machado de Assis', correct: false },
      { text: 'Juscelino Kubitschek ', correct: false },
      { text: "Pedro Álvares Cabral", correct: true },
    ],
  },
  {
    question: 'Em que ano nasceu Santos Dumont?',
    answers: [
      { text: '1873.', correct: true },
      { text: '1876.', correct: false },
      { text: '1900.', correct: false },
      { text: "1873.", correct: false },
    ],
  },
  {
    question: 'O Brasil é o?',
    answers: [
      { text: 'País com o maior terrítorio do mundo.', correct: false },
      { text: 'Maior produtor de café no mundo.', correct: true },
      { text: 'País mais populoso do mundo.', correct: false },
      { text: "Maior Produtor de arroz do mundo.", correct: false },
    ],
  },
  {
    question: 'Qual é o estado mais recente do Brasil?',
    answers: [
      { text: 'Tocantis.', correct: true },
      { text: 'Sergipe.', correct: false },
      { text: 'Rio Grande do Norte.', correct: false },
      { text: "Chile.", correct: false },
    ],
  },
  {
    question: 'Quem foi o primeiro presidente do Brasil?',
    answers: [
      { text: 'Getúlio Vargas.', correct: false },
      { text: 'Juscelino Kubitschek.', correct: false },
      { text: 'Deodoro da Fonseca.', correct: true },
      { text: "Floriano Peixoto.", correct: false },
    ],
  },
  {
    question: 'Juscelino Kubitschek foi?',
    answers: [
      { text: "O vigésimo primeiro presidente.", correct: true },
      { text: "O vigésimo presidente.", correct: false },
      { text: "O vigésimo segundo presidente.", correct: false },
      { text: "O décimo nono presidente.", correct: false },
    ],
  },
];

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();

  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  $questionText.textContent = questions[currentQuestionIndex].question;

  questions[currentQuestionIndex].answers.forEach((answer) => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;

    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }

    $answersContainer.appendChild(newAnswer);
    newAnswer.addEventListener("click", selectAnswer);
  });

  updateProgressBar();
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  document.querySelectorAll(".answer").forEach((button) => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
  updateProgressBar();
}

function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor((totalCorrect / totalQuestions) * 100);
  let message = "";

  switch (true) {
    case performance >= 90:
      message = "Você é um ótimo cidadão!";
      break;
    case performance >= 70:
      message = "Você definitivamente é um brasileiro.";
      break;
    case performance >= 50:
      message = "Você é gringo?";
      break;
    default:
      message = "Foi mal hein!";
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">Refazer teste</button>
    <p id="integrantes" class="hide">Integrantes do grupo: Cauã Guadagnin, Emanuel, Pedro Leonardo e Rian Garcia</p>
    <p id="credits">Créditos:<br>Pedro Leonardo = Back end,<br>Rian Garcia = Front end,<br>Emanuel Julio e Cauã Guadagnin = Pesquisa e formulação das perguntas.</p>
  `;
}

function updateProgressBar() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  $progressBar.style.width = `${progress}%`;
  const progressText = document.querySelector(".progress-text");
  progressText.textContent = `Barra de progresso - ${Math.round(progress)}% concluído`;
}

updateProgressBar();
