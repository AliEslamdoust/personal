// menu Activator
let menuBtn = document.getElementById("menuBtn");
let menu = document.getElementById("mainMenu");

menuBtn.addEventListener("click", function () {
  let menuBar0 = document.getElementById("menuBar1");
  let menuBar1 = document.getElementById("menuBar2");
  let menuBar2 = document.getElementById("menuBar3");
  menuBar0.classList.toggle("menuBars1");
  menuBar1.classList.toggle("menuBarsHide");
  menuBar2.classList.toggle("menuBars2");
  menu.classList.toggle("mmHidden");
});

// scroll spy
let containers = document.querySelectorAll(".container");
let menuItems = document.querySelectorAll(".menuItem");
let distanceFromTop;
let menuTop = document.getElementById("menuTop");

window.addEventListener("scroll", () => {
  if (containers[0].getBoundingClientRect().top < 0) {
    menuTop.classList.add("menuTopBlur");
  } else {
    menuTop.classList.remove("menuTopBlur");
  }
  changeActiveItem();
});

function changeActiveItem() {
  containers.forEach((element, index) => {
    distanceFromTop = element.getBoundingClientRect().top;
    if (distanceFromTop <= 70) {
      for (let i = 0; i < containers.length; i++) {
        if (
          containers[i].getBoundingClientRect().top < distanceFromTop ||
          containers[i].getBoundingClientRect().top > distanceFromTop
        ) {
          menuItems[i].classList.remove("menuActive");
        }
      }
      menuItems[index].classList.add("menuActive");
    }
  });
}

changeActiveItem();

// typing Animation
let texts = ["Ali Eslamdoust", "A Web Developer", "A Designer"];
let typeOutput = document.getElementById("TypingAnimation");
let character = 0;
let word = 0;
let typingTime = 100;
let typingDelay = 3000;

setInterval(() => {
  document.getElementById("typePointer").classList.toggle("hiddenTypePointer");
}, 555);

function type() {
  if (character < texts[word].length) {
    typeOutput.innerHTML = texts[word].slice(0, character + 1);
    character++;
    setTimeout(type, typingTime);
  } else {
    setTimeout(erase, typingDelay);
  }
}

function erase() {
  if (character > 0) {
    typeOutput.innerHTML = texts[word].slice(0, character - 1);
    character--;
    setTimeout(erase, typingTime / 2);
  } else {
    if (word < texts.length - 1) {
      word++;
    } else {
      word = 0;
    }
    setTimeout(type, typingDelay / 3);
  }
}

type();