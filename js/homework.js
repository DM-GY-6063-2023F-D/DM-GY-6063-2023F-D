document.addEventListener("DOMContentLoaded", () => {
  const act = document.getElementsByClassName("assignment-content-title");
  Array.from(act).forEach((a) => {
    a.addEventListener("click", (_) => {
      a.classList.toggle("show");
      a.nextElementSibling.classList.toggle("show");
    });
  });
});
