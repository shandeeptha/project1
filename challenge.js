let timerStarted = false;
let totalTime = 20 * 60;
let timer = null;
let timeExpired = false;

function startTimer() {
    if (timerStarted || timeExpired) return;

    timerStarted = true;

    document.getElementById("timer").style.display = "block";
    document.getElementById("tools").style.display = "block";

    timer = setInterval(function () {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;

        document.getElementById("timer").textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        totalTime--;

        if (totalTime < 0) {
            clearInterval(timer);
            timeExpired = true;

            document.getElementById("timer").textContent = "TIME OVER";

            document.querySelectorAll('input[name="task"]')
                .forEach(task => task.disabled = true);

            document.querySelector(".submit").disabled = true;

            alert("20 Minutes Completed! Submission Closed.");
        }
    }, 1000);
}

async function submitChallenge() {
    if (timeExpired) {
        alert("Submission time has expired.");
        return;
    }

    const selected = document.querySelector(
        'input[name="task"]:checked'
    );

    const prompt = document.getElementById("prompt").value.trim();
    const output = document.getElementById("output").value.trim();
    const projectlink = document.getElementById("link").value.trim();

    const playerid = sessionStorage.getItem("playerid");
    const playername = sessionStorage.getItem("playername");
    const category = sessionStorage.getItem("category");

    if (!playerid || !playername || !category) {
        alert("Student details not found. Please login again.");
        return;
    }

    if (!selected || !prompt || !output || !projectlink) {
        alert("Please complete all submission fields.");
        return;
    }

    if (!/^https?:\/\//i.test(projectlink)) {
        alert("Please enter a valid HTTP or HTTPS project link.");
        return;
    }

    const formData = new FormData();

    formData.append("playerid", playerid);
    formData.append("playername", playername);
    formData.append("category", category);
    formData.append("task", selected.value);
    formData.append("prompt", prompt);
    formData.append("output", output);
    formData.append("projectlink", projectlink);

    const button = document.querySelector(".submit");
    button.disabled = true;
    button.textContent = "Submitting...";

    try {
        const response = await fetch("submit.php", {
            method: "POST",
            body: formData
        });

        const result = await response.text();

        if (!response.ok) {
            throw new Error(result);
        }

        alert("Submission saved successfully!");

        if (timer) clearInterval(timer);

        sessionStorage.clear();
        window.location.href = "index.html";

    } catch (error) {
        alert("Submission failed: " + error.message);
        button.disabled = false;
        button.textContent = "Submit Project";
    }
}
