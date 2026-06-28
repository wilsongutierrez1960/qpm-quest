let totalQuestions = 0;
let autoAdvance = false;
let transitioning = false;
let currentData = [];
let score = 0;
let currentQuestion = 0;
let answered = false;
let mistakes = [];
let examMode = false;

document
.getElementById("btnMath")
.addEventListener("click", () => {

    examMode = false;

    loadQuiz("data/math.json");

});

document
.getElementById("btnExam")
.addEventListener("click", () => {

    examMode = !examMode;

    const btn = document.getElementById("btnExam");

    btn.textContent = examMode
        ? "Exam Mode: ON"
        : "Exam Mode";

});document
.getElementById("btnQpm")
.addEventListener("click", () => {
    loadQuiz("data/qpm.json");
});

document
.getElementById("btnImf")
.addEventListener("click", () => {
    loadQuiz("data/imf_exam.json");
});

document
.getElementById("nextBtn")
.addEventListener("click", nextQuestion);

async function loadQuiz(file) {

    score = 0;
    currentQuestion = 0;
    mistakes = [];
    const response = await fetch(file);

    currentData = await response.json();

    totalQuestions = currentData.length;

    showQuestion(currentData[currentQuestion]);
}

function updateProgress() {
    const progressText = document.getElementById("progress");
    const progressBar = document.getElementById("progressBar");

    const current = currentQuestion + 1;
    const total = totalQuestions;

    const percent = (current / total) * 100;

    progressText.textContent = `Pregunta ${current}/${total}`;

    progressBar.style.width = `${percent}%`;
}

function showQuestion(item) {


console.log(document.body.innerHTML);

updateProgress();
    answered = false;

   const container = document.getElementById("quiz");

    container.innerHTML = "";

document.getElementById("explanation")
    .textContent = "";

    const question = document.createElement("h3");
    question.textContent = item.question;

    container.appendChild(question);

    const buttons = [];

   item.options.forEach(opt => {
  const btn = document.createElement("button");
  btn.textContent = opt;
  btn.dataset.value = opt;

  btn.addEventListener("click", () => {
    checkAnswer(opt, item.answer, item, buttons);
  });

  buttons.push(btn);
  container.appendChild(btn);
});
    

    document.getElementById("result")
        .textContent = "";

    document.getElementById("score")
        .textContent = `Puntaje: ${score}`;
}


function checkAnswer(selected) {

    if (answered) return;

    answered = true;

    const item = currentData[currentQuestion];
    const correct = item.answer;

    if (selected === correct) {

        score++;

    } else {

        mistakes.push({
            index: currentQuestion,
            question: item.question,
            selected: selected,
            correct: correct
        });

    }

    document.getElementById("score").textContent =
        `Puntaje: ${score}`;

    if (!examMode) {

        buttons.forEach(btn => {

            const value = btn.dataset.value;

            if (value === correct) {
                btn.classList.add("correct");
            }

            if (value === selected && selected !== correct) {
                btn.classList.add("incorrect");
            }

        });

        if (item.explanation) {

            document.getElementById("explanation").innerHTML =
                `<strong>Explicación:</strong><br>${item.explanation}`;

        }

    }

    enableNextOrAuto();

}
function nextQuestion() {

    transitioning = false;
    answered = false;

    currentQuestion++;

    const nextBtn =
        document.getElementById("nextBtn");

    nextBtn.disabled = true;
    nextBtn.style.opacity = 0.5;

    if (currentQuestion < currentData.length) {

        showQuestion(
            currentData[currentQuestion]
        );

    } else {

        showFinalScore();

    }


   }    
function showFinalScore() {

    const container =
        document.getElementById("quiz");

    const percentage =
        Math.round(score / totalQuestions * 100);

    let mistakesHtml = "";
    mistakes.forEach(m => {

    mistakesHtml += `
        <div class="mistake">

            <p>
                <strong>Pregunta:</strong>
                ${m.question}
            </p>

            <p>
                <strong>Tu respuesta:</strong>
                ${m.selected}
            </p>

            <p>
                <strong>Respuesta correcta:</strong>
                ${m.correct}
            </p>

            <hr>

        </div>
    `;
});




    container.innerHTML = `
    <h2>Quiz finalizado</h2>

    <p>Puntaje final:
        ${score}/${totalQuestions}
    </p>

    <p>Porcentaje:
        ${percentage}%
    </p>

    <p>Errores:
        ${mistakes.length}
    </p>

    <h3>Errores cometidos</h3>

    ${mistakesHtml}
`;

    document
        .getElementById("nextBtn")
        .style.display = "none";
}