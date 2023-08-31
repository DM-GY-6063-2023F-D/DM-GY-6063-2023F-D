document.addEventListener("DOMContentLoaded", () => {
  const wt = document.getElementsByClassName("week-title");
  Array.from(wt).forEach((a) => {
    a.addEventListener("click", (_) => {
      a.classList.toggle("show");
      a.nextElementSibling.classList.toggle("show");
    });
  });
});
