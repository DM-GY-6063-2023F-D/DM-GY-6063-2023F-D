document.addEventListener("DOMContentLoaded", () => {
  const act = document.getElementsByClassName("assignment-content-title");
  Array.from(act).forEach((a) => {
    a.addEventListener("click", (_) => {
      a.classList.toggle("show");
      a.nextElementSibling.classList.toggle("show");
    });
  });

  const hash = window.location.hash.substring(1).replaceAll("/", "");
  const hashEls = document.getElementsByClassName(`${hash}-title`);
  if (hashEls.length > 0) {
    hashEls[0].click();
  }
});
