(() => {
  const svgCode = `$SVGSPRITE`;
  if (document.body) {
    document.body.insertAdjacentHTML("afterbegin", svgCode);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.insertAdjacentHTML("afterbegin", svgCode);
    });
  }
})();
