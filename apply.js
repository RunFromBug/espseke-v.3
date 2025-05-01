document
  .querySelector(".submit-button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const hra = document.querySelector('input[name="radio"]:checked')?.id;

    const data = {
      meno: document.querySelector("#meno").value.trim(),
      priezvisko: document.querySelector("#priezvisko").value.trim(),
      email: document.querySelector("#email").value.trim(),
      skola: document
        .querySelector('input[placeholder="tvoja škola"]')
        .value.trim(),
      rocnik: document
        .querySelector('input[placeholder="ktorý ročník navštevuješ"]')
        .value.trim(),
      hra: hra,
      rank: document.querySelector('input[placeholder^="SoloQ"]').value.trim(),
      link: document.querySelector('input[placeholder^="OP.GG"]').value.trim(),
      o_sebe: document.querySelector("textarea").value.trim(),
    };

    // Validation: Check if any field is empty
    if (
      !data.meno ||
      !data.priezvisko ||
      !data.email ||
      !data.skola ||
      !data.rocnik ||
      !data.hra ||
      !data.rank ||
      !data.link ||
      !data.o_sebe
    ) {
      alert("Prosím, vyplňte všetky polia.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Zadajte platnú emailovú adresu.");
      return;
    }

    // Link validation
    if (!data.link.startsWith("https://")) {
      alert("Zadajte platný odkaz");
      return;
    }

    fetch("https://sheetdb.io/api/v1/67kd5sfcubfrs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    })
      .then((res) => res.json())
      .then((res) => alert("Úspešne odoslané!"))
      .catch((err) => alert("Chyba pri odoslaní formulára."));
  });
