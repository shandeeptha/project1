function startChallenge() {

    let id = document.getElementById("playerid").value;
    let name = document.getElementById("playername").value;
    let category = document.getElementById("category").value;

    if (id == "" || name == "" || category == "") {
        alert("Please fill all the details.");
        return;
    }

    window.location.href = "challenge.html";

}