
// Define arrays to hold quiz data
var questions = [];
var options = [];
var answers = [];
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
            lab.id = String(i) + String(j)

            console.log(toString(i) + toString(j));

            br = document.createElement("br")

            form.appendChild(rad);
            form.appendChild(lab);
            form.appendChild(br)
        }

        MathJax.typeset();
    }

}


// Function to check each selected user option against true answers
function markQuiz() {

    let score = 0

    for (i = 0; i < options.length; i++) {

        if (radios[i].checked == true) {



            responses.push([radios[i].name, radios[i].value, optionLabels[i].id])

        }



    }

    for (i = 0; i < responses.length; i++) {

        let q = Number(responses[i][0])

        console.log(responses[i][0])


        if (answers[q] == responses[i][1]) {


            // highlight correctly selected option
            $(document.getElementById(responses[i][2])).css({ "border": "3px solid", "border-color": "lightgreen" });

            // increment user's score
            score += 1;
        } else {
            $(document.getElementById(responses[i][2])).css({ "border": "3px solid", "border-color": "red" });
        }

    }

    output.innerHTML = nickname.value + ", your score is " + score;

}

