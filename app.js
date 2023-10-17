//HEADLESS CMS BASIS-URL:

const baseURL = "https://eksamensprojekt.louiselyck.dk/wp-json";

//ID-NUMRE PÅ KATEGORIER I CMS

const reviewsId = 6;
const openingHoursId = 9;
const painsId = 7;
const treatmentMethodsId = 5;
const frontpageTopId = 3;
const therapistsId = 4;
const priceListId = 10;
const headacheId = 11;
const kneePainId = 12;
const shoulderPainId = 13;
const acupunctureIc = 16;
const sportsPhysioId = 14;
const physioId = 15;

//PLACERINGER I HTML
const treatmentAreasEl = document.querySelector(".treatmentareas-grid");
const singlePostGridEl = document.querySelector(".treatmentareas-index");
const methodsEl = document.querySelector(".methods-grid");
const allTherapistsEl = document.querySelector(".therapist-flex");
const heroEl = document.querySelector(".index-hero");
const singleArticleEL = document.querySelector(".single-article");
const singleTherapistEl = document.querySelector(".single-therapist");
const reviewsEl = document.querySelector(".reviews-content");
const starsAndNumberEl = document.querySelector(".social-proof");
const allTherapistExcludingEl = document.querySelector(
  ".all-therapists-excluding-current-slug"
);

// GET TOKEN
//Informationer vi skal bruge for at hente token, der tilføjer et lag af sikkerhed med authentication:

const tokenURL = "/jwt-auth/v1/token";

const tokenLogin = {
  username: "Indsæt username her",
  password: "Indsæt password her",
};

// Funktion, der henter en token fra vores API.

function getToken() {
  //Test om token allerede ligger i session storage, så vi ikke kalder den flere gange og dermed får mindre netværkstrafik:
  if (sessionStorage.getItem("myToken")) {
    //Vi er nødt til at returnere et promise, som er tomt, da .then ellers ikke længere kan kaldes, når vi kalder getToken:
    return new Promise((resolve, reject) => resolve());
  }

  //En fetch-request sendes til vores konkatenerede URL med POST-metoden.
  //'return' skrives for at kunne lave en asynkron kæde, der sikrer, at getPosts først kører, når token er hentet.
  return (
    fetch(baseURL + tokenURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenLogin),
    })
      //Vores fetch returnerer et promise, og .then-metoden bruges til at håndtere svaret, som laves om til json-format.
      .then((res) => res.json())
      //Når data er modtaget, bliver følgende funktion kørt:
      .then((data) => {
        console.log(data);
        //Vores token findes i det returnerede data og gemmes i en variabel:
        const token = data.data.token;
        console.log(token);
        // Token gemmes i session storage med en key, der hedder myToken. Session storage tillader webbrowseren at gemme et key/value-par under en enkelt brugers session.
        sessionStorage.setItem("myToken", token);
      })
      // Hvis funktionen fejler ses en fejlbesked i konsollen:
      .catch((err) => console.log(err))
  );
}

//GET POSTS

//Funktion, der henter vores private posts med API:

function getPosts(categoryId, numberOfPosts) {
  return fetch(
    baseURL +
      `/wp/v2/posts?status=private&per_page=${numberOfPosts}&categories=${categoryId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("myToken"),
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

//FINDER SLUG i URL I NUVÆRENDE BROWSERVINDUE

const queryString = window.location.search;
//Splitter vores slug op i to, hvor lighedstegnet står, så vi har to dele i et array: teksten 'slug' og selve sluggen, der kommer efter = .
const queryStringArray = queryString.split("=");
// Erklærer variablen slug, som indeholder selve sluggen, der står på index 1 i vores array:
const slug = queryStringArray[1];

console.log(queryStringArray);

// GET SINGLE POST BY SLUG

function getSinglePostBySlug(slug) {
  return fetch(baseURL + `/wp/v2/posts?status=private&slug=${slug}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("myToken"),
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

// GET CATEGORY BY SLUG

function getCategoryBySlug(slug) {
  return fetch(baseURL + `/wp/v2/categories?slug=${slug}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("myToken"),
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

// RENDER

//Render frontPageHero

function renderHero(data, targetEl) {
  // Tjekker om der er indhold i grid
  if (data.length == 0) {
    targetEl.textContent = "Fejl: Kan ikke finde indhold";
    return;
  }

  data.forEach((data) => {
    targetEl.innerHTML = `<article index-hero-content>

    <div class="fade-animation-top">
        <h2 id="hero-badge">Fysioterapi der virker</h2>
        <h1 class="index-hero-heading">
          <span>${data.acf.overskrift}</span><br />
          <span><strong>${data.acf.overskrift2}</strong></span>
        </h1> 
        </div>
        <div class="fade-animation-top">
        <p>${data.acf.brodtekst}</p>
        </div>
        <div class="index-hero-cta">
          <button class="booking-button">Book tid nu</button>
          <div class = "stars-box">
            <p class="small-p">${data.acf.kundetal}+ smertebehandlede kunder</p>
            <p class="small-p">
            ${data.acf.stjerner} <img src="./assets/images/Stjerne.png" /> på
              <a href="https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TKkozs1KMzUzYLRSNagwMTOxNDY2tEw2MbNITDJNszKoMDVKTU0xMEwyMzQ3NExNTfSSS0zMScovSlcozk0tKklVyAeyCvKLSoqzczLzMrMBNHEbEA&q=aalborg+smerte+og+sportsklinik&oq=aalborg+smerte+og+sporskli&aqs=chrome.1.69i57j46i13i175i199i512j0i13i30.7219j0j7&sourceid=chrome&ie=UTF-8#lrd=0x46493319c468ab5f:0x52eed01b61711eea,1,,,,"
              target="_blank">Google</a>
            </p>
          </div>
        </div>
        <div class="index-hero-img">
          <img src="${data.acf.billede.sizes.large}" alt="" />
        </div>
      </article>`;
  });
}

//Render artikler:

// Funktion, der bruges til at rendere alle smerter og behandlingsmetoder til artikler

//Har to parametre, der kan passes til funktionen: data og placering i html

function renderGrid(data, targetEl) {
  // Tjekker om der er indhold i grid
  if (data.length == 0) {
    targetEl.textContent = "Fejl: Kan ikke finde indhold";
    return;
  }

  //Kører forEach-loop på alle objekter i vores returnerede array

  data.forEach((data) => {
    //Laver html-elementer med classes og indhold
    const div = document.createElement("div");
    div.className = "card-flex";

    const a = document.createElement("a");

    //Tjek om der er indhold i artiklen. Hvis ikke, linkes til #, og hvis indhold findes, linkes med slug.
    if (data.acf.tekst == "") {
      a.href = "#";
    } else {
      a.href = "single-artikel.html?slug=" + data.slug;
    }

    const img = document.createElement("img");
    img.className = "card-flex-img";
    img.src = data.acf.foto1.sizes.thumbnail;
    img.alt = data.acf.foto1.alt;

    const h3 = document.createElement("h3");
    h3.textContent = data.title.rendered.replace("Private: ", ""); // Fjerner 'Private: ' I titlen, da alle titles som udgangspunkt har 'Private: ' foran sig

    //Elementer appendes i den angivne placering i html:

    targetEl.append(a);
    a.append(div);
    div.append(img);
    div.append(h3);
  });
}

// Funktion, der renderer oversigt over terapeuterne med forEach-loop

function renderAllTherapists(data) {
  data.forEach((therapist) => {
    const therapistInfo = document.createElement("div");
    therapistInfo.className = "therapist-info";

    const img = document.createElement("img");
    img.src = therapist.acf.foto.sizes.medium;
    img.className = "therapist-img";
    img.alt = therapist.acf.foto.alt;

    const h3 = document.createElement("h3");
    h3.className = "therapist-name";
    h3.textContent = `${therapist.acf.fornavn} ${therapist.acf.mellemnavn} ${therapist.acf.efternavn}`;

    const p = document.createElement("p");
    p.className = "therapist-description";
    p.textContent = therapist.acf.uddannelse_kort;

    const button = document.createElement("button");
    button.className = "booking-button";
    button.textContent = `Om ${therapist.acf.fornavn}`;
    button.onclick = function () {
      window.location.href = `single-terapeut.html?slug=${therapist.slug}`;
    };

    therapistInfo.append(img);
    therapistInfo.append(h3);
    therapistInfo.append(p);
    therapistInfo.append(button);

    allTherapistsEl.append(therapistInfo);
  });
}

// RENDER SINGLE-POST

function renderSinglePost(post) {
  const singleArticle = document.querySelector("main");
  // Tjekker om der er indhold i grid
  if (singleArticle.length === 0) {
    singleArticle.textContent = "Fejl: Kan ikke finde indhold";
    return;
  }
  //Laver indhold
  post.forEach((post) => {
    document.title = `${post.acf.overskrift}`;
    singleArticle.innerHTML += `
            
        <section class="article-top">
        <section class ="wrapper">
            <article class="single-artikel-hero fade-animation-top">
            <div class="single-artikel-hero-content">
              <h1 class="single-artikel-hero-heading">${
                post.acf.overskrift
              }</h1>
              <p class="single-artikel-hero-p-bold">
                ${post.acf.tekst}
              </p>
              <div class="single-artikel-author">
                <img
                  class="single-artikel-author-img"
                  src="${post.acf.forfatter_foto.sizes.thumbnail}"
                  alt="${post.acf.billedtekstforfatterfoto}"
                />
                <div class="single-artikel-author-text">
                  <p class="single-artikel-author-name"><a href = "${
                    post.acf.website
                  }">Af ${post.acf.navn}</p></a>
                  <p class="single-artikel-author-info">
                  ${post.acf.uddannelse_1_saetning}
                  </p>
                </div>
              </div>
              <div>
                <p class="single-artikel-hero-p">
                ${post.acf.tekst1}
                </p>
              </div>
            </div>
            <div class="single-artikel-hero-image-box">
              <img
                class="single-artikel-hero-image"
                src="${post.acf.foto1.sizes.large}"
                alt="${post.acf.billedtekst}"
              />
            </div>
          </article>
          </section>
          <section class = "divider"></section>
          <article class="wrapper single-artikel-content">
              <img
                class="single-artikel-image"
                src="${post.acf.foto2.sizes.large}"
                alt="${post.acf.billedtekst2}"
              />
            </div>
            <div class="single-artikel-text-right">
              <h1 class="single-artikel-heading">${post.acf.overskrift2}</h1>
              
              ${post.content.rendered}
            
              <button class="booking-button">Book tid</button>
            </div>
          </article>
          <section class = "divider"></section>
          <article class="wrapper single-artikel-content">
            <div class="single-artikel-text">
              <h1 class="single-artikel-heading">${post.acf.overskrift3}</h1>
              <p class="single-artikel-paragraph">
              ${post.acf.tekst3}
              </p>
            </div>
            <div class="single-artikel-image-box">
              <img
                class="single-artikel-image"
                src="${post.acf.foto3.sizes.large}"
                alt="${post.acf.billedtekst3}"
              />
            </div>
          </article>
          <section class = "divider"></section>
                    
        <article class="wrapper single-artikel-content mobile-reverse">
            <div class="single-artikel-image-box">
              <img
                class="single-artikel-image"
                src="${post.acf.foto4.sizes.large}"
                alt="${post.acf.billedtekst4}"
              />
            </div>
            <div class="single-artikel-text-right">
              <h1 class="single-artikel-heading">${post.acf.overskrift4}</h1>
              <p class="single-artikel-paragraph">
              ${post.acf.tekst4}
              </p>
            </div>
          </article>
          <section class = "divider"></section>
          <article class="wrapper single-artikel-content">
            <div class="single-artikel-text">
              <h1 class="single-artikel-heading">${post.acf.overskrift5}</h1>
              <p class="single-artikel-paragraph">
              ${post.acf.tekst5}
              </p>
            </div>
            <div class="single-artikel-image-box">
              <img
                class="single-artikel-image"
                src="${post.acf.foto5.sizes.large}"
                alt="${post.acf.billedtekst5}"
              />
            </div>
          </article>
          <section class = "divider"></section>
          <article class="wrapper single-artikel-content mobile-reverse">
            <div class="single-artikel-image-box">
              <img
                class="single-artikel-image"
                src="${post.acf.foto6.sizes.large}"
                alt="${post.acf.billedtekst6}"
              />
            </div>
            <div class="single-artikel-text-right">
              <h1 class="single-artikel-heading">${post.acf.overskrift6}</h1>
              <p class="single-artikel-paragraph">
              ${post.acf.tekst6}
              </p>
            </div>
          </article>
          <section class = "divider"></section>
          <article class="wrapper single-artikel-content">
            <div class="single-artikel-text">
              <h1 class="single-artikel-heading">${post.acf.overskrift7}</h1>
              <p class="single-artikel-paragraph">
              ${post.acf.tekst7}
              </p>
            </div>
            <div class="single-artikel-image-box">
              <img
                class="single-artikel-image"
                src="${post.acf.foto7.sizes.large}"
                alt="${post.acf.billedtekst7}"
              />
            </div>
            
          </article>
          <section class="treatmentareas-index">
          <section class="treatment-wrapper">
  <h2>Relevante ${
    post.categories.includes(5)
      ? "behandlingsområder for"
      : "behandlingsmetoder til"
  } ${post.acf.emne.toLowerCase()}</h2>
  <p>${post.acf.emne} ${
      post.categories.includes(5)
        ? "kan være gavnligt i behandlingen af følgende smertetyper:"
        : "kan behandles med følgende metoder, som alle tilbydes hos Aalborg Smerte- og Sportsklinik:"
    }</p>
  <div class="treatmentareas-grid"></div>
  </section>
</section>  
          
        </section>`;
  });
}

// Render enkelt terapeut til CV-sider

function renderSingleTherapist(therapist) {
  const therapistCv = document.querySelector(".cv");
  // Tjekker om der er indhold i grid
  if (therapistCv.length == 0) {
    therapistCv.textContent = "Fejl: Kan ikke finde indhold";
    return;
  }

  therapist.forEach((therapist) => {
    document.title = `Fysioterapeut ${therapist.acf.fornavn} ${therapist.acf.mellemnavn} ${therapist.acf.efternavn} - Aalborg Smerte- og Sportsklinik`;
    therapistCv.innerHTML += `<article class = "single-therapist-flex">

          <div class="cv-text">

          <h1>${therapist.acf.fornavn} ${therapist.acf.mellemnavn} ${therapist.acf.efternavn}</h1>

          <p>${therapist.acf.introtekst}</p>

          <p>${therapist.acf.introtekst_afsnit_2}</p>

          <p>${therapist.acf.introtekst_afsnit_3}</p>
          </div>
          <div class="cv-img-quote">
              <div class="cv-img">
                  <img src="${therapist.acf.foto.sizes.large}" alt="${therapist.acf.foto.alt}">
              </div>
                      <blockquote>
                      <div class="cv-quote-logo"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z"/></svg></div>
                      <div class="cv-quote-text">${therapist.acf.citat}</div>
                      </blockquote>
              </div>
          </div>
          
              
      </article>
      
      <div class="cv-tab-wrapper">
      <article>
      <h2>Mit CV: Læs mere om mig her</h2>
      <div class="tabs">
            <input type="radio" name="tabs" id="erfaring" checked="checked">
            <label for="erfaring">Erfaring</label>
            <div class="tab">
              <p>${therapist.acf.erfaring}</p>
              <p>${therapist.acf.erfaring_afsnit_2}</p>
              <p>${therapist.acf.erfaring_afsnit_3}</p>
              <p>${therapist.acf.erfaring_afsnit_4}</p> 
              <p>${therapist.acf.erfaring_afsnit_5}</p>
            </div>
            
            <input type="radio" name="tabs" id="uddannelse">
            <label for="uddannelse">Uddannelse</label>
            <div class="tab">
              <p>${therapist.acf.uddannelse}</p>  
              <p>${therapist.acf.uddannelse_afsnit_2}</p>
              
              <p>${therapist.acf.uddannelse_afsnit_3}</p>

              <p>${therapist.acf.uddannelse_afsnit_4}</p>
              
              <p>${therapist.acf.uddannelse_afsnit_5}</p>
              
              <p>${therapist.acf.uddannelse_afsnit_6}</p>
          </div>
          
          <input type="radio" name="tabs" id="certificeringer">
            <label for="certificeringer">Certificeringer</label>
            <div class="tab">
              <p>${therapist.acf.certificeringer}</p>
              <p>${therapist.acf.certificeringer_afsnit_2}</p>
              <p>${therapist.acf.certificeringer_afsnit_3}</p>
              <p>${therapist.acf.certificeringer_afsnit_4}</p>
            </div>
            <input type="radio" name="tabs" id="personligt">
            <label for="personligt">Personligt</label>
            <div class="tab">
              <p>${therapist.acf.personligt}</p>
              <p>${therapist.acf.personligt_afsnit_2}</p>
              <p>${therapist.acf.personligt_afsnit_3}</p>
            </div>    
          
        </div>`;
  });
}

//Laver burgermenu om til x på mobil
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".logo-container .burger-menu");
  const navbarLinks = document.querySelector(".navbar-links");
  const xMark = document.querySelector(".logo-container .x-mark");

  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
    toggleButton.style.visibility = "hidden";
    xMark.style.visibility = "visible";
  });

  xMark.addEventListener("click", () => {
    navbarLinks.classList.remove("active");
    toggleButton.style.visibility = "visible";
    xMark.style.visibility = "hidden";
  });
});

//Funktion, der renderer alle terapeuter på nær den terapeuts CV-side, man er på

function renderAllTherapistsExcludingCurrentSlug(data) {
  const queryString = window.location.search;
  //Splitter vores slug op i to, hvor lighedstegnet står, så vi har to dele i et array: teksten 'slug' og selve sluggen, der kommer efter = .
  const queryStringArray = queryString.split("=");
  // Erklærer variablen slug, som indeholder selve sluggen, der står på index 1 i vores array:
  const currentSlug = queryStringArray[1];
  console.log(queryStringArray);

  //Sorterer terapeut fra, som matcher nuværende slug:

  const filteredData = data.filter(
    (therapist) => therapist.slug != currentSlug
  );

  //Laver indhold for de terapeuter, der ikke er sorteret fra
  filteredData.forEach((therapist) => {
    const therapistInfo = document.createElement("div");
    therapistInfo.className = "therapist-info";

    const img = document.createElement("img");
    img.src = therapist.acf.foto.sizes.medium;
    img.className = "therapist-img";
    img.alt = therapist.acf.foto.alt;

    const h3 = document.createElement("h3");
    h3.className = "therapist-name";
    h3.textContent = `${therapist.acf.fornavn} ${therapist.acf.mellemnavn} ${therapist.acf.efternavn}`;

    const p = document.createElement("p");
    p.className = "therapist-description";
    p.textContent = therapist.acf.uddannelse_kort;

    const button = document.createElement("button");
    button.className = "booking-button";
    button.textContent = `Om ${therapist.acf.fornavn}`;
    button.onclick = function () {
      window.location.href = `single-terapeut.html?slug=${therapist.slug}`;
    };

    therapistInfo.append(img);
    therapistInfo.append(h3);
    therapistInfo.append(p);
    therapistInfo.append(button);
    allTherapistExcludingEl.append(therapistInfo);
  });
}

// Animation med fade-up på scroll

const fadeElements = document.querySelectorAll(".fade-in-animation");

// Funktion der tjekker, om et element er inde i viewport:

// Kilde: https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  const offset = 500; // tal i px, der justerer, hvor tidligt scroll skal animere
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight + offset ||
        document.documentElement.clientHeight + offset) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Funktion, der tilføjer classen 'active' til elementer i viewport:
function fade() {
  if (window.matchMedia("(min-width: 391px)").matches) {
    fadeElements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.classList.add("active");
      }
    });
  }
}

// Eventlistener som bliver trigget, når der scrolles:
window.addEventListener("scroll", fade);
