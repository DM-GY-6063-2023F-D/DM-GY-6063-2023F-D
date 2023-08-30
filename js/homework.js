document.addEventListener("DOMContentLoaded", () => {
  const act = document.getElementsByClassName("assignment-content-title");
  Array.from(act).forEach((a) => {
    a.addEventListener("click", (ev) => {
      ev.target.classList.toggle("show");
      ev.target.nextElementSibling.classList.toggle("show");
    });
  });
});
