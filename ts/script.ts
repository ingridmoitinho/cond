const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");

import 'dotenv/config';  
const apiToken = process.env.API_TOKEN;

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;
 
  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter pelo menos 3 letras");
    return;
  }

    try {
      // Faz uma requisição para a API do OpenWeatherMap usando a localização fornecida
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=${apiToken}&lang=pt_br&units=metric`
      );

    // Converte a resposta da API para JSON
    const dados = await resposta.json();

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
  } catch (error) {
    // Alerta de erro e loga o erro no console caso a requisição falhe
    alert("Localização não encontrada");
    console.log("Deu um erro na obtenção dos dados da API: ", error);
  }
});


//Tema escuro
const themeButton = document.querySelector<HTMLButtonElement>(
  "#dark-mode-button"
);
const body = document.querySelector<HTMLBodyElement>("body");
const icon = themeButton?.querySelector<HTMLElement>("i");

let darkTheme: boolean;

window.onload = () => {
  const isDarkThemeStorage = localStorage.getItem("isDarkTheme");
  darkTheme = isDarkThemeStorage === "true";

  if (darkTheme) {
    body?.classList.add("dark-mode");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }
};

themeButton?.addEventListener("click", () => {
  darkTheme = !darkTheme;
  localStorage.setItem("isDarkTheme", darkTheme.toString());
  body?.classList.toggle("dark-mode");
  if (icon) {
    icon.classList.remove(darkTheme ? "fa-moon" : "fa-sun");
    icon.classList.add(darkTheme ? "fa-sun" : "fa-moon");
  }
});
