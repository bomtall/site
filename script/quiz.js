

const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
    // var myObj = JSON.parse(this.responseText);

    loadQuiz(JSON.parse(this.responseText));

    // console.log(myObj);
    // console.log(myObj.q1.question);
    // document.getElementById("q1_label").innerHTML = myObj.q1.question;

};

xmlhttp.open("GET", "https://raw.githubusercontent.com/bomtall/site/main/json/quiz_data.json");
xmlhttp.send();


function loadQuiz(data) {

    console.log(data.q2.answer);
    document.getElementById("q1_label").innerHTML = data.q1.question;
    document.getElementById("q2_label").innerHTML = data.q2.question;

}



