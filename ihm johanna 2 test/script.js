const temaknapp = document.querySelector("#tema");
temaknapp.hidden = false;

function bytTema() {
    document.body.classList.toggle("morkt");
    if (document.body.classList.contains("morkt")) {
        temaknapp.textContent = "Byt till ljust läge";
    } else {
        temaknapp.textContent = "Byt till mörkt läge";
    }
}

temaknapp.addEventListener("click", bytTema);

const kontaktFormular = document.querySelector(".kontakt-formular");
if (kontaktFormular && kontaktFormular.dataset.endpoint) {
    const formStatus = kontaktFormular.querySelector(".form-status");

    kontaktFormular.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!kontaktFormular.reportValidity()) return;

        const endpoint = kontaktFormular.dataset.endpoint.trim();
        if (!endpoint) {
            formStatus.textContent = "Formuläret är förberett men inte anslutet för att ta emot meddelanden.";
            return;
        }

        formStatus.textContent = "Meddelandet skickas…";
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: new FormData(kontaktFormular),
                headers: { Accept: "application/json" }
            });
            if (!response.ok) throw new Error("Submission failed");
            formStatus.textContent = "Tack! Ditt meddelande har skickats.";
            kontaktFormular.reset();
        } catch {
            formStatus.textContent = "Meddelandet kunde inte skickas. Försök igen senare eller kontakta mig via e-post.";
        }
    });
}
