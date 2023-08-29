document.addEventListener("DOMContentLoaded", () => {
  const wt = document.getElementsByClassName("week-title");
  Array.from(wt).forEach((a) => {
    a.addEventListener("click", (ev) => {
      ev.target.classList.toggle("show");
      ev.target.nextElementSibling.classList.toggle("show");
    });
  });
});
