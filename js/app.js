let currentData = [];

document
.getElementById("btnMath")
.addEventListener("click", () => {
    loadQuiz("data/math.json");
});

document
.getElementById("btnQpm")
.addEventListener("click", () => {
    loadQuiz("data/qpm.json");
});

async function loadQuiz(file) {

    const response = await fetch(file);

    currentData = await response.json();

    showQuestion(currentData[0]);
}

function showQuestion(item) {

    document.getElementById("category")
        .textContent = item.category;

    document.getElementById("question")
        .textContent = item.question;

    const optionsDiv =
        document.getElementById("options");

    optionsDiv.innerHTML = "";

    item.options.forEach(option => {

        const button =
            document.createElement("button");

        button.textContent = option;

        button.onclick = () => {

            const result =
                document.getElementById("result");

            if(option === item.answer) {

                result.textContent =
                    "Correcto";

            } else {

                result.textContent =
                    "Incorrecto";
            }
        };

        optionsDiv.appendChild(button);

    });
}