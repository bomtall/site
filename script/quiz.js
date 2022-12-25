
// Define arrays to hold quiz data
var questions = [];
var options = [];
var answers = [];
var hints = [];
var responses = [];

// Get elements to put data into
var qLabels = document.getElementsByClassName("questionLabels");
var optionLabels = document.getElementsByClassName("quizRadioLabels");
var radios = document.getElementsByClassName("quizRadios");
var output = document.getElementById("outputbox")
var nickname = document.getElementById("nickname")

var form = document.getElementById("quizForm");

// Get data
const xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "https://raw.githubusercontent.com/bomtall/site/main/json/quiz_data.json");
xmlhttp.send();

// When requesting data send to load quiz function
xmlhttp.onload = function () {

    loadQuiz(JSON.parse(this.responseText));

};


//Load the quiz data into arrays and then into elements
function loadQuiz(data) {


    //Load data
    for (const [key, value] of Object.entries(data)) {

        questions.push(value.question);
        answers.push(value.answer);
        hints.push(value.hint);

        for (i = 0; i < value.options.length; i++) {
            options.push(value.options[i])
        }

    }

    // Create HTML elements needed for quiz form and populate with form data
    for (i = 0; i < questions.length; i++) {

        q = document.createElement("label");
        q.id = "q" + i;
        q.classList.add("questionLabels");
        q.innerHTML = (i + 1) + ". " + questions[i];
        form.append(q);

        br = document.createElement("br");
        form.appendChild(br);


        for (j = 0; j < 4; j++) {

            rad = document.createElement("input");
            rad.type = "radio";
            rad.classList.add("quizRadios");
            rad.name = i;
            rad.value = options[j + (i * 4)];

            lab = document.createElement("label")
            lab.classList.add("quizRadioLabels");
            lab.innerHTML = options[j + (i * 4)]

            // give the label an id like a coordinate using loop variables
            lab.id = String(i) + String(j)

            br = document.createElement("br")

            form.appendChild(rad);
            form.appendChild(lab);
            form.appendChild(br)
        }


        MathJax.typeset();


    }

    loadHints();

}


function loadHints() {
    for (i = 0; i < hints.length; i++) {
        container = document.getElementById("hintContainer");
        btn = document.createElement("input");
        btn.type = "button";
        btn.classList.add("hintBtn");
        btn.id = "btn" + i;
        btn.value = "Show Hints";
        btn.onclick = function () { showHint(this.id) };

        text = document.createElement("p");
        text.classList.add("hintText");
        text.innerHTML = hints[i];
        text.id = "hint" + i;

        container.appendChild(btn);
        container.appendChild(text);


    }
}

function showHint(btn) {

    let index = btn.slice(3);
    let id = "hint" + index;

    $(`#${id}`).toggle();

    MathJax.typeset();
}


// Function to check each selected user option against true answers
function markQuiz() {

    let score = 0


    // create array of responses nb - not all questions may have a response
    for (i = 0; i < options.length; i++) {

        if (radios[i].checked == true) {

            responses.push([radios[i].name, radios[i].value, optionLabels[i].id])

        }

    }

    for (i = 0; i < responses.length; i++) {

        // get question number string and convert to number to use as index
        let q = Number(responses[i][0])


        // check responses against answers
        if (answers[q] == responses[i][1]) {


            // highlight correctly selected option
            $(document.getElementById(responses[i][2])).css({ "border": "3px solid", "border-color": "#30e8bf" });

            // increment user's score
            score += 1;
        } else {
            // highlight incorrectly selected option
            $(document.getElementById(responses[i][2])).css({ "border": "3px solid", "border-color": "#ff8235" });
        }

    }

    $("#nickname").attr("disabled", true);
    console.log(nickname.disabled);

    // show user their total score
    output.innerHTML = nickname.value + ", your score is " + score;



    //---------------------------------------------NEED TO ADD RESET OF GLOBAL ARRAYS AND QUIZ---------------------------------------------//

}

