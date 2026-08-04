let timerStarted = false;
let totalTime = 20 * 60; // 20 Minutes
let timer;

function startTimer() {

    // Timer should start only once
    if (timerStarted) return;

    timerStarted = true;

    // Show Timer
    document.getElementById("timer").style.display = "block";

    // Show AI Tools
    document.getElementById("tools").style.display = "block";

    timer = setInterval(function () {

        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        document.getElementById("timer").innerHTML =
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds;

        totalTime--;

        if (totalTime < 0) {

            clearInterval(timer);

            document.getElementById("timer").innerHTML = "TIME OVER";

            // Disable all challenge options
            let tasks = document.getElementsByName("task");

            for (let i = 0; i < tasks.length; i++) {
                tasks[i].disabled = true;
            }

            document.querySelector(".submit").disabled = true;

            alert("20 Minutes Completed!\nSubmission Closed.");

        }

    }, 1000);

}

function submitChallenge() {

    let selected = document.querySelector('input[name="task"]:checked');

    if (selected == null) {

        alert("Please select one challenge.");

        return;

    }

    alert("Project Submitted Successfully!");

    // Later we will connect this to PHP + MySQL
    // submit.php

}