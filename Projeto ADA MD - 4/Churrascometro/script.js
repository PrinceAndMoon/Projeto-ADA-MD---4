// JavaScript para o Churrascômetro

document.addEventListener("DOMContentLoaded", function () {
    loadUserData();
});

function loadUserData() {
    // Carrega dados do usuário armazenados localmente
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedCep = localStorage.getItem("cep");

    if (storedName) {
        document.getElementById("name").value = storedName;
    }

    if (storedEmail) {
        document.getElementById("email").value = storedEmail;
    }

    if (storedCep) {
        document.getElementById("cep").value = storedCep;
    }
}

function validateStep1() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const consent = document.getElementById("consent").checked;

    const isValidName = /^[a-zA-Z\s]+$/.test(name);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidCep = /^[0-9]{8}$/.test(cep);

    if (isValidName && isValidEmail && isValidCep && consent) {
        // Armazena os dados do usuário localmente
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("cep", cep);

        // Oculta mensagens de erro
        document.getElementById("invalid-name").style.visibility = "hidden";
        document.getElementById("invalid-email").style.visibility = "hidden";
        document.getElementById("error-postal-code").style.visibility = "hidden";
        document.getElementById("no-input").style.visibility = "hidden";
        document.getElementById("invalid-input").style.visibility = "hidden";

        // Avança para o próximo passo
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
    } else {
        // Exibe mensagens de erro
        document.getElementById("invalid-name").style.visibility = isValidName ? "hidden" : "visible";
        document.getElementById("invalid-email").style.visibility = isValidEmail ? "hidden" : "visible";
        document.getElementById("error-postal-code").style.visibility = isValidCep ? "hidden" : "visible";
        document.getElementById("no-input").style.visibility = "visible";
        document.getElementById("invalid-input").style.visibility = "visible";
    }
}

function calculateStep2() {
    const qtyMen = parseInt(document.getElementById("qtyMen").value);
    const qtyWomen = parseInt(document.getElementById("qtyWomen").value);
    const qtyChildren = parseInt(document.getElementById("qtyChildren").value);
    const qtyAlcoholDrinkers = parseInt(document.getElementById("qtyAlcoholDrinkers").value);

    const resultCarne = calculateCarne(qtyMen, qtyWomen, qtyChildren);
    const resultPaoDeAlho = calculatePaoDeAlho(qtyMen, qtyWomen, qtyChildren);
    const resultCarvao = calculateCarvao(qtyMen + qtyWomen + qtyChildren);
    const resultSal = calculateSal(qtyMen + qtyWomen + qtyChildren);
    const resultGelo = calculateGelo(qtyMen + qtyWomen + qtyChildren);
    const resultRefrigerante = calculateRefrigerante(qtyMen + qtyWomen + qtyChildren);
    const resultAgua = calculateAgua(qtyMen + qtyWomen + qtyChildren);
    const resultCerveja = calculateCerveja(qtyAlcoholDrinkers);

    const totalGuests = qtyMen + qtyWomen + qtyChildren;

    displayResults(resultCarne, resultPaoDeAlho, resultCarvao, resultSal, resultGelo, resultRefrigerante, resultAgua, resultCerveja, totalGuests);

    // Armazena os resultados localmente
    localStorage.setItem("resultCarne", resultCarne);
    localStorage.setItem("resultPaoDeAlho", resultPaoDeAlho);
    localStorage.setItem("resultCarvao", resultCarvao);
    localStorage.setItem("resultSal", resultSal);
    localStorage.setItem("resultGelo", resultGelo);
    localStorage.setItem("resultRefrigerante", resultRefrigerante);
    localStorage.setItem("resultAgua", resultAgua);
    localStorage.setItem("resultCerveja", resultCerveja);
    localStorage.setItem("totalGuests", totalGuests);

    // Avança para o próximo passo
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
}

function calculateCarne(qtyMen, qtyWomen, qtyChildren) {
    return (0.4 * qtyMen) + (0.32 * qtyWomen) + (0.2 * qtyChildren);
}

function calculatePaoDeAlho(qtyMen, qtyWomen, qtyChildren) {
    return (2 * (qtyMen + qtyWomen)) + qtyChildren;
}

function calculateCarvao(totalGuests) {
    return totalGuests;
}

function calculateSal(totalGuests) {
    return 0.04 * totalGuests;
}

function calculateGelo(totalGuests) {
    return Math.ceil(totalGuests / 10) * 5;
}

function calculateRefrigerante(totalGuests) {
    return Math.ceil(totalGuests / 5);
}

function calculateAgua(totalGuests) {
    return Math.ceil(totalGuests / 5);
}

function calculateCerveja(qtyAlcoholDrinkers) {
    return 3 * qtyAlcoholDrinkers;
}

function displayResults(resultCarne, resultPaoDeAlho, resultCarvao, resultSal, resultGelo, resultRefrigerante, resultAgua, resultCerveja, totalGuests) {
    document.getElementById("resultCarne").innerText = resultCarne.toFixed(2);
    document.getElementById("resultPaoDeAlho").innerText = resultPaoDeAlho;
    document.getElementById("resultCarvao").innerText = resultCarvao.toFixed(2);
    document.getElementById("resultSal").innerText = resultSal.toFixed(2);
    document.getElementById("resultGelo").innerText = resultGelo;
    document.getElementById("resultRefrigerante").innerText = resultRefrigerante;
    document.getElementById("resultAgua").innerText = resultAgua;
    document.getElementById("resultCerveja").innerText = resultCerveja;

    document.getElementById("resultTotalGuest").innerText = totalGuests;

    const guestListContainer = document.getElementById("guestList");
    guestListContainer.innerHTML = "";

    for (let i = 1; i <= totalGuests; i++) {
        const guestItem = document.createElement("div");
        guestItem.innerText = "Convidado " + i;
        guestListContainer.appendChild(guestItem);
    }
}

function recalculate() {
    // Volta para o primeiro passo
    document.getElementById("step3").style.display = "none";
    document.getElementById("step1").style.display = "block";
}

// Funções relacionadas ao tema escuro/claro
const themeButton = document.getElementById("theme-button");
const body = document.body;

themeButton.onclick = function () {
    body.classList.toggle("light-theme");

    // Armazena a preferência do tema localmente
    const isLightTheme = body.classList.contains("light-theme");
    localStorage.setItem("isLightTheme", isLightTheme);
};

document.addEventListener("DOMContentLoaded", function () {
    // Carrega a preferência do tema armazenada localmente
    const isLightTheme = localStorage.getItem("isLightTheme") === "true";
    if (isLightTheme) {
        body.classList.add("light-theme");
    }
});
