"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos 3 letras");
        return;
    }
    try {
        // Faz uma requisição para a API do OpenWeatherMap usando a localização fornecida
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=2cb04009b202b19d588db53eca99952a&lang=pt_br&units=metric`);
        // Converte a resposta da API para JSON
        const dados = yield resposta.json();
        // Extrai as informações principais da resposta da API
        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
        };
        // Atualiza a interface do usuário com as informações do clima
        sectionTempoInfo.innerHTML = `
    <div class="tempo-dados">
    <h2>${infos.local}</h2>
    <span>${infos.temperatura}°C</span>
    </div>
    <img src="${infos.icone}" alt="Ícone do tempo">
  `;
    }
    catch (error) {
        // Alerta de erro e loga o erro no console caso a requisição falhe
        alert("Localização não encontrada");
        console.log("Deu um erro na obtenção dos dados da API: ", error);
    }
}));
//Tema escuro
const themeButton = document.querySelector("#dark-mode-button");
const body = document.querySelector("body");
const icon = themeButton === null || themeButton === void 0 ? void 0 : themeButton.querySelector("i");
let darkTheme;
window.onload = () => {
    const isDarkThemeStorage = localStorage.getItem("isDarkTheme");
    darkTheme = isDarkThemeStorage === "true";
    if (darkTheme) {
        body === null || body === void 0 ? void 0 : body.classList.add("dark-mode");
        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }
};
themeButton === null || themeButton === void 0 ? void 0 : themeButton.addEventListener("click", () => {
    darkTheme = !darkTheme;
    localStorage.setItem("isDarkTheme", darkTheme.toString());
    body === null || body === void 0 ? void 0 : body.classList.toggle("dark-mode");
    if (icon) {
        icon.classList.remove(darkTheme ? "fa-moon" : "fa-sun");
        icon.classList.add(darkTheme ? "fa-sun" : "fa-moon");
    }
});
