// kopplar till header vi skapade i HTML
const header = document.querySelector("header");
// skapar en nav tagg
const headerNav = document.createElement("nav");
// sätter/placerar nav-taggen inuti headern
header.appendChild(headerNav);
// länkarna
const navLinks = [
    {text: "All", category: "All" },
    {text: "Heroes", category: "Hero"},
    {text: "Villains", category: "Villain"}
];

// main and hero section
// kopplar till main vi skapade i HTML
const main = document.querySelector(".main");
// skapar en div tagg
const heroContainer = document.createElement("div");
// Vi namnger div-taggen
heroContainer.classList.add("hero-container");
// // sätter/placerar hero-cont inuti main-taggen
main.appendChild(heroContainer);

// Arrayen
const characters = [
    {charName: "Superman", category: "Hero"},
    {charName: "Wonder-Woman", category: "Hero"},
    {charName: "Batman", category: "Hero"},
    {charName: "Flash", category: "Hero"},
    {charName: "Green-Lantern", category: "Hero"},
    {charName: "Aquaman", category: "Hero"},
    {charName: "Hawkgirl", category: "Hero"},
    {charName: "Darkseid", category: "Villain"},
    {charName: "Cheetah", category: "Villain"},
    {charName: "Joker", category: "Villain"},
    {charName: "Reverse-Flash", category: "Villain"},
    {charName: "Deathstroke", category: "Villain"},
    {charName: "Sinestro", category: "Villain"},
    {charName: "Doomsday", category: "Villain"},
];

// Loopar igenom Character-arrayen och för varje char i 
// loopen så skapar vi ett kort genom att anropa createcard funktionen
characters.forEach(character => {
    createCard(character);
    // blir parametern eftersom vi har loopat igen arrayen och
    // vi använder den som ett argument för att skapa korten
});

function createCard(char) {
    // skapar en div och sen så namnger vi det
    const card = document.createElement("div");
    card.classList.add("card");
    // skapar innehållet för kortet
    card.innerHTML = `
        <div class="character-name">${char.charName}</div>
        <div class="character-category">${char.category}</div>
        <button class="btn1">Click me</button>
        <button class="btn2">Remove</button>`
    ;

    // kopplar click me knappen till en variabel
    // sen skapar vi en eventlistener
    const btn1 = card.querySelector(".btn1");
    btn1.addEventListener("click", () => {
        card.classList.toggle("active"); 
    });
    
    
    // kopplar remove knappen till en variabel
    // sen skapar vi en eventlistener    
    const btn2 = card.querySelector(".btn2");
    btn2.addEventListener("click", () => {
        card.remove(); // tar bort elementet

        const index = characters.findIndex(c => c.charName === char.charName);
        if (index !== -1) {
            characters.splice(index, 1);
        }
        // ser till att när jag tar bort att den inte kommer
        // tillbaka när jag filtrerar igenom länkarna i nav
    });   


    // skapar kortet och sen så sätter vi in det i hero-cont
    heroContainer.appendChild(card);
};

function render(charsToDisplay) {
    // tömmer sidan till att börja med
    heroContainer.innerHTML = "";
    // loopar igenom det som kommer matas in(parameter)
    charsToDisplay.forEach(charToDisplay => {
        createCard(charToDisplay);
        // skapar ett kort för varje "vara som matas in"
    });
}

// links inside the header
navLinks.forEach(navLink => {
    /*vi loopar igenom navlinks-arrayen och skapar en a-tagg
    för varje vara inuti */
    const link = document.createElement("a");
    // namnger länkarna efter värdet i .text nyckeln i navlinks
    link.textContent = navLink.text;
    // gör det till länkar annars är det bara text
    link.href = "#";
    // placerar länkarna inuti nav-taggen
    headerNav.appendChild(link);

    // lägger en klick event på länkarna
    link.addEventListener("click", event => {
        // ser till att sidan inte laddas om eller skickar 
        // bort mig när jag klickar på länken. 
        // tar bort standard beteende som i en submit event.
        event.preventDefault();

        // om länkens kategori som vi klickar matchar "All"
        if (navLink.category === "All") {
            render(characters);
            // rendera karaktärerna i array
            // beroende på vilken punkt man klickar så visar
            // den antingen allt eller det som är kvar
            // ifall man har tagit bort några eller ej.
        } else {
            /* filtrerar igenom arrayen och sen så assign vi
            operation till en variablen som vi sen kan mata in
            inuti render som visar antingen skurkar eller hjältar*/
            const filtered = characters.filter(char => char.category === navLink.category);
            render(filtered);
        }
    });
});

// kopplar till section i HTML
const section = document.querySelector("section");

// skapar en form
const addCharacterForm = document.createElement("form");
// lägger ett id
addCharacterForm.id = "add-character-form";
// skapar HTML för själva formen
addCharacterForm.innerHTML = `
    <input type="text" name="c-name" required>

    <select name="charCategory">
        <option value="Hero">Hero</option>
        <option value="Villain">Villain</option>
    </select>
    <button type="submit">ADD</button>`
;
// lägger in det i section
section.appendChild(addCharacterForm);

// lägger en submit even på formen
addCharacterForm.addEventListener("submit", event => {
    // stoppar standardbeteende
    event.preventDefault();
    // form data är ungefär som en inbyggd funktion
    // som skapar objekt från form informationen
    // som samlas i ett formulär.
    const formData = new FormData(addCharacterForm)
    /*vi skapar ett object som vi trycker intill arrayen 
    med hjälp av .push() och skapar ett nytt kort med 
    createcard*/
    const newChar = {
        charName: formData.get("c-name"),
        category: formData.get("charCategory")
    };
    characters.push(newChar);
    createCard(newChar);
    // rensar formen efter att vi har lagt in karaktären
    addCharacterForm.reset();
});


// kopplar till footer i HTML
const footer = document.querySelector("footer");
// skapar en p-tagg
const footerPara = document.createElement("p");
// skapar/ändrar texten i p-taggen
footerPara.textContent = "SKAPAD AV FADINCI";
// sätter in paragrafen i footern
footer.appendChild(footerPara);