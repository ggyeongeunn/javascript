window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const dots = document.querySelectorAll(".dot");

  sections.forEach((section, index) => {
    // getBoundingClientRect() : 영역이 브라우저 화면의 맨 위에서 얼마나 떨어져있는지 알려주는 메서드
    const top = section.getBoundingClientRect().top;
    // 화면 위쪽에서 가까워지면 해당 메뉴 활성화
    if (top < window.innerHeight / 2) {
      dots.forEach((dot) => {
        dot.classList.remove("on");
      });
      dots[index].classList.add("on");
    }
  });

  // go top
  const gotopBtn = document.querySelector("#goTop");
  let positionY = document.documentElement.scrollTop;

  if (positionY > 500) {
    gotopBtn.classList.add("on");
  } else {
    gotopBtn.classList.remove("on");
  }
  gotopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
    });
  });
});
