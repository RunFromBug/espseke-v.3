document
  .querySelector(".submit-button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Check if the user has recently submitted
    const lastSubmission = getCookie("lastSubmission");
    const now = Date.now();
    const throttleTime = 60 * 1000; // 1 minute in milliseconds

    if (lastSubmission && now - lastSubmission < throttleTime) {
      alert("Formulár môžete odoslať iba raz za minútu.");
      return;
    }

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
      .then((res) => {
        alert("Úspešne odoslané!");
        setCookie("lastSubmission", now, 1); // Set cookie for 1 day
      })
      .catch((err) => alert("Chyba pri odoslaní formulára."));
  });

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    if (key === name) {
      return parseInt(value, 10);
    }
  }
  return null;
}
