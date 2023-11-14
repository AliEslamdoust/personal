// menu Activator
let menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", function () {
  document.getElementById("menuBar1").classList.toggle("menuBars1");
  document.getElementById("menuBar2").classList.toggle("menuBarsHide");
  document.getElementById("menuBar3").classList.toggle("menuBars2");
  document.getElementById("mainMenu").classList.toggle("mmHidden");
});

// scroll spy
let containers = document.querySelectorAll(".container");
let menuItems = document.querySelectorAll(".menuItem");
let distanceFromTop;
let menuTop = document.getElementById("menuTop");

window.addEventListener("scroll", () => {
  changeMenuBlur();
  changeActiveItem();
});
function changeMenuBlur() {
  if (containers[0].getBoundingClientRect().top < 0) {
    menuTop.classList.add("menuTopBlur");
  } else {
    menuTop.classList.remove("menuTopBlur");
  }
}
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
  }, 0);
}
changeMenuBlur();
changeActiveItem();

// containers link to menuitems
menuItems.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    if ($(containers[index]).offset().top != 0) {
      window.scroll({
        top: $(containers[index]).offset().top - 65,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scroll({
        top: $(containers[index]).offset().top,
        left: 0,
        behavior: "smooth",
      });
    }
  });
});

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

// portfolio items

let portItems = document.querySelectorAll(".portfolioItem");
let portBtns = document.querySelectorAll(".portfolioTopics");
let currentPortfolio = "All";

// All Btn is active by default
portBtns[0].classList.add("portActive");

portBtns.forEach((element) => {
  element.addEventListener("click", function () {
    switch (this.getAttribute("portfolioActivator")) {
      case "All":
        portItems.forEach((elem) => {
          elem.classList.remove("portfolioHide");
        });
        deActivePortfolioBtn();
        this.classList.add("portActive");
        break;

      case "Detailed":
        changePortfolio("Detailed");
        this.classList.add("portActive");
        break;

      case "Designs":
        changePortfolio("Designs");
        this.classList.add("portActive");
        break;

      case "Mockups":
        changePortfolio("Mockups");
        this.classList.add("portActive");
        break;
    }
  });
});

function changePortfolio(attribute) {
  hidePortfolioItems();
  showPortfolioItems(attribute);
  deActivePortfolioBtn();
}

function hidePortfolioItems() {
  portItems.forEach((element) => {
    element.classList.add("portfolioHide");
  });
}

function showPortfolioItems(currentElement) {
  portItems.forEach((element, index) => {
    if (element.getAttribute("portfolioItem") == currentElement) {
      portItems[index].classList.remove("portfolioHide");
      currentPortfolio = `${currentElement}`;
    }
  });
}

function deActivePortfolioBtn() {
  portBtns.forEach((element) => element.classList.remove("portActive"));
}

// setting the portfolio containers min height  to one of it's childerens default height so it doesn't close after each time a button is clicked (smoother animation)

function portfolioMainHeight() {
  let samplePortfolio = document.getElementById("portfolioItem");
  let sampleHeight = samplePortfolio.offsetHeight;
  let portfolioContainer = document.getElementById("portfolioContainer");
  portfolioContainer.style.minHeight = sampleHeight + 30 + "px";
}
portfolioMainHeight();

// scroll to hire section
document.getElementById("hireMe").addEventListener("click", function () {
  console.log(containers[containers.length - 1].getBoundingClientRect());
  window.scroll({
    top: $(containers[containers.length - 1]).offset().top - 65,
    left: 0,
    behavior: "smooth",
  });
});
// FAQ Items
let faqItems = document.querySelectorAll(".faqItem");
let currentFaq = -1;

faqItems.forEach((elem, index) => {
  elem.addEventListener("click", function () {
    removeActiveFAQ();
    if (currentFaq != index) {
      currentFaq = index;
      this.classList.add("faqActive");
    } else {
      currentFaq = -1;
    }
  });
});
let currentHeight = 0;
function addHeight(order) {
  if (currentHeight < faqHeight[order]) {
    currentHeight++;
    faqText[order].style.height = currentHeight + "px";
    setTimeout(addHeight, 1);
  } else if (currentHeight == faqHeight[order]) {
    faqText[order].removeAttribute("style");
    faqText[order].classList.add("faqTextActive");
  }
}

function removeActiveFAQ() {
  faqItems.forEach((elem) => elem.classList.remove("faqActive"));
}

// slider

// slider fixed height
let swiperContainer = document.getElementById("swiperContainer");
let sliderContainer = document.getElementById("sliderContainer");
let swiperHeight = sliderContainer.getBoundingClientRect().height;
swiperContainer.style.height = swiperHeight + "px";

// create pagintation buttons
let sliders = document.querySelectorAll(".slider");
let paginationContainer = document.getElementById("pagination");
for (let i = 1; i <= sliders.length; i++) {
  let span = document.createElement("span");
  paginationContainer.appendChild(span);
}
let sliderDelay = 2500;
let sliderIndex = 0;
let slidertimeout;

function callSliderTimeout() {
  slidertimeout = setTimeout(moveSlider, sliderDelay);
}
function clearSliderTimout() {
  clearTimeout(slidertimeout);
}
function moveSlider() {
  if (sliderIndex < sliders.length - 1) {
    sliderIndex++;
    changePagination();
    sliderContainer.className = `slidersContainer translateX-${sliderIndex}`;
    callSliderTimeout();
  } else {
    sliderIndex = -1;
    moveSlider();
  }
}
callSliderTimeout();

// slider next and prev buttons
let sliderNext = document.getElementById("sliderNext");
let sliderPrev = document.getElementById("sliderPrev");

sliderNext.addEventListener("click", () => {
  slideNext();
});

sliderPrev.addEventListener("click", () => {
  slidePrev();
});

function slideNext() {
  clearSliderTimout();
  moveSlider();
}

function slidePrev() {
  if (sliderIndex == 0) {
    sliderIndex = sliders.length - 2;
    console.log(sliderIndex);
  } else {
    sliderIndex -= 2;
  }
  clearSliderTimout();
  moveSlider();
}

// pagination
let paginationBtn = document.querySelectorAll("#pagination>span");
function changePagination() {
  paginationBtn.forEach((elem, index) => {
    elem.classList.remove("activePg");
    if (sliderIndex == index) {
      elem.classList.add("activePg");
    }
    elem.addEventListener("click", function () {
      sliderIndex = index - 1;
      clearSliderTimout();
      moveSlider();
    });
  });
}
changePagination();

// slider using mouse

let sliderWidth = sliderContainer.getBoundingClientRect().width;
let sliderIsMovingWithMouse = false;
sliderContainer.addEventListener("mousedown", function (e) {
  let sliderStartPosition = e.offsetX;
  sliderIsMovingWithMouse = true;
  console.log(e.offsetX);

  this.addEventListener("mousemove", function (evenet) {
    if (sliderIsMovingWithMouse) {
      let sliderMovement = evenet.offsetX - sliderStartPosition;
      if (Math.abs(sliderMovement) >= sliderWidth / 2) {
        sliderContainer.style.transform = `translateX(${sliderMovement}px)`;
        if (sliderMovement < 0) {
          sliderIsMovingWithMouse = false;
          slideNext();
        } else {
          sliderIsMovingWithMouse = false;
          slidePrev();
        }
      }
    }
  });
});
sliderContainer.addEventListener("mouseup", clearMovingWithMouse);

function clearMovingWithMouse() {
  sliderIsMovingWithMouse = false;
  sliderContainer.removeAttribute("style");
}
