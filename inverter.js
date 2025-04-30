document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".nav");
  const newsColumn = document.querySelector(".news-column");

  window.addEventListener("scroll", () => {
    const newsColumnTop = newsColumn.getBoundingClientRect().top;
    const navbarBottom = navbar.getBoundingClientRect().bottom;

    if (navbarBottom > newsColumnTop) {
      navbar.classList.add("inverted");
    } else {
      navbar.classList.remove("inverted");
    }
  });
});
