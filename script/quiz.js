
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

    //Put data into HTML elements

    for (let i = 0; i < qLabels.length; i++) {
        qLabels[i].innerHTML = questions[i]
    }

    for (let i = 0; i < optionLabels.length; i++) {
        optionLabels[i].innerHTML = options[i]
        radios[i].value = options[i]
    }


    MathJax.typeset();

}

// Function to check each user option against answers
function markQuiz(data) {

    let score = 0

    for (i = 0; i < options.length; i++) {

        if (radios[i].checked == true) {
            console.log("true");
            responses.push([radios[i].name, radios[i].value])
        }



    }

    for (i = 0; i < responses.length; i++) {

        let q = Number(responses[i][0])

        console.log(responses[i][0])
        console.log[answers[q]]

        if (answers[q] == responses[i][1]) {
            score += 1
        }



        //look up which answer is checked for each question
        //compare to real answer in answers list above

    }

    console.log(responses);
    console.log(score);
    output.innerHTML = nickname.value + ", your score is " + score;

}

