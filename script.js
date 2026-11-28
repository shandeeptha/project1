function startChallenge() {
    const id = document.getElementById("playerid").value.trim();
    const name = document.getElementById("playername").value.trim();
    const category = document.getElementById("category").value;

    if (!id || !name || !category) {
        alert("Please fill all the details.");
        return;
    }

    // Preserve participant details for the challenge page
    sessionStorage.setItem("playerid", id);
    sessionStorage.setItem("playername", name);
    sessionStorage.setItem("category", category);

    window.location.href = "challenge.html";
}
