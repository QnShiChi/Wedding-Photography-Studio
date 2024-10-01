// Animation header
document.onscroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const header = document.querySelector("#header");

  if (scrollTop >= 45) {
    console.log(scrollTop);
    header.style.animationName = "slideHeader";
    header.style.animationDuration = "0.75s";
    header.style.animationTimingFunction = "ease";
  }
};
