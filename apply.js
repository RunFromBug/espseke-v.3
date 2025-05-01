document
  .querySelector(".submit-button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const hra = document.querySelector('input[name="radio"]:checked')?.id;

    const data = {
      meno: document.querySelector("#meno").value,
      priezvisko: document.querySelector("#priezvisko").value,
      email: document.querySelector("#email").value,
      skola: document.querySelector('input[placeholder="tvoja škola"]').value,
      rocnik: document.querySelector(
        'input[placeholder="ktorý ročník navštevuješ"]'
      ).value,
      hra: hra,
      rank: document.querySelector('input[placeholder^="SoloQ"]').value,
      link: document.querySelector('input[placeholder^="OP.GG"]').value,
      o_sebe: document.querySelector("textarea").value,
    };

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
