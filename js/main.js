// menu Activator
let menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", openCloseMenu);

function openCloseMenu() {
  document.getElementById("menuBar1").classList.toggle("menuBars1");
  document.getElementById("menuBar2").classList.toggle("menuBarsHide");
  document.getElementById("menuBar3").classList.toggle("menuBars2");
  document.getElementById("mainMenu").classList.toggle("mmShow");
}

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
let sliderContainer = document.getElementById("sliderContainer");

let firstChange = false;
function resizeSlider() {
  let sliderHeight = document
    .getElementById("sliderContainer")
    .getBoundingClientRect().height;

  if (!firstChange) {
    sliderHeight += 64;
    firstChange = true;
  }

  document.documentElement.style.setProperty(
    `--sliderHeight`,
    `${sliderHeight}px`
  );
}

window.addEventListener("resize", resizeSlider);

// create pagintation buttons
let sliders = document.querySelectorAll(".slider");
let paginationContainer = document.getElementById("pagination");
for (let i = 1; i <= sliders.length; i++) {
  let span = document.createElement("span");
  paginationContainer.appendChild(span);
}

// slider moving
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
    document.documentElement.style.setProperty(
      `--sliderMovement`,
      `${-sliderIndex * 100}%`
    );
    clearSliderTimout();
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

sliderNext.addEventListener("click", slideNext);

sliderPrev.addEventListener("click", slidePrev);

function slideNext() {
  clearSliderTimout();
  moveSlider();
}

function slidePrev() {
  if (sliderIndex == 0) {
    sliderIndex = sliders.length - 2;
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
      try {
        sliderIndex = index - 1;
        clearSliderTimout();
        moveSlider();
      } catch (err) {
        console.error(err);
      }
    });
  });
}

changePagination();

// move slider using mouse
let startX;
let moveX;
let isMoving;
sliderContainer.addEventListener("mousedown", function (e) {
  clearSliderTimout();
  startX = e.clientX;
  isMoving = true;
  removeTransition(sliderContainer);

  this.addEventListener("mousemove", function (event) {
    if (isMoving == true) {
      clearSliderTimout();
      moveX = event.clientX - startX;
      this.style.transform = `translateX(calc(${
        -sliderIndex * 100
      }% + ${moveX}px))`;
    }
  });

  window.addEventListener("mouseup", stopMoving);
});

function stopMoving() {
  addTransition(sliderContainer);
  isMoving = false;
  sliderContainer.removeAttribute("style");
  if (Math.abs(moveX) >= 50) {
    if (moveX > 0) {
      slidePrev();
    } else {
      slideNext();
    }
  } else {
    callSliderTimeout();
  }
}

// move slider using touch
sliderContainer.addEventListener("touchstart", function (e) {
  clearSliderTimout();
  startX = e.touches[0].clientX;
  isMoving = true;
  removeTransition(sliderContainer);

  this.addEventListener("touchmove", function (event) {
    if (isMoving == true) {
      clearSliderTimout();
      moveX = event.touches[0].clientX - startX;
      this.style.transform = `translateX(calc(${
        -sliderIndex * 100
      }% + ${moveX}px))`;
    }
  });

  window.addEventListener("touchend", stopMoving);
});

// scrolling animation on elements (fading in after they are visible in the page)

let pageElements = [];
let fadeInLeft = document.querySelectorAll(".fadeLeft");
pageElements.push(fadeInLeft);
let fadeInRight = document.querySelectorAll(".fadeRight");
pageElements.push(fadeInRight);
let fadeInBottom = document.querySelectorAll(".fadeBottom");
pageElements.push(fadeInBottom);

window.addEventListener("scroll", addFadeIn);

function addFadeIn() {
  let pageHeight = this.window.innerHeight;
  pageElements.forEach((elem, index) => {
    elem.forEach((element) => {
      if (element.getBoundingClientRect().top <= pageHeight - 100) {
        switch (index) {
          case 0:
            element.classList.add("fadeInLeft");
            break;
          case 1:
            element.classList.add("fadeInRight");
            break;
          case 2:
            element.classList.add("fadeInBottom");
            break;
        }
      }
    });
  });
}

addFadeIn();

// change transition after dragging
function addTransition(item) {
  item.classList.remove("itemActive");
}

function removeTransition(item) {
  item.classList.add("itemActive");
}

// close menu by swiping
let mainMenu = document.getElementById("mainMenu");
let movingSituation;
let menuChange;
window.addEventListener("resize", moveMenu);

moveMenu();

function moveMenu() {
  removeTransition(mainMenu);
  let pageWidth = window.innerWidth;
  if (pageWidth <= 768) {
    mainMenu.addEventListener("touchstart", function (e) {
      let menuCurrent = e.touches[0].clientX;
      movingSituation = true;

      this.addEventListener("touchmove", function (event) {
        if (movingSituation) {
          menuChange = event.touches[0].clientX - menuCurrent;
          if (menuChange >= 0) {
            document.documentElement.style.setProperty(
              `--menuWidth`,
              `calc(80% - ${menuChange * 2}px)`
            );
          }
        }
      });

      this.addEventListener("touchend", closeMenu);
    });
  }
}

function closeMenu() {
  addTransition(mainMenu);
  movingSituation = false;
  document.documentElement.style.setProperty(`--menuWidth`, `80%`);
  if (menuChange > 100) {
    openCloseMenu();
    menuChange = 0;
  }
}

closeMenu();

// change portfolio hireme size
let hireMeImg = document.getElementById("hireMeImg");

window.addEventListener("resize", resizeHireMe);

resizeHireMe();

function resizeHireMe() {
  document.documentElement.style.setProperty(
    `--hiremeHeight`,
    `${hireMeImg.getBoundingClientRect().height}px`
  );
}

let language = "en-us";

function textsLanguage() {
  const xhttp = new XMLHttpRequest();

  xhttp.onload = function () {
    let data = JSON.parse(this.responseText);
    let allElements = document.querySelectorAll("[lnText]");
    let menuBtns = document.querySelectorAll(".menuItem");

    // menu buttons text
    menuBtns.forEach((elem, index) => {
      elem.innerHTML = data.menuBtn[index];
    });

    // what i do elements
    let widHead = document.querySelectorAll(".widBodyHead");
    let widText = document.querySelectorAll(".widBodyText");
    widHead.forEach((elem, index) => {
      elem.innerHTML = data.widBodyHead[index];
      widText[index].innerHTML = data.widBodyText[index];
    });

    // resume elements (first two are for education and the last three are for experience)
    let resumeHead = document.querySelectorAll(".educationHead");
    resumeHead.forEach((elem, index) => {
      elem.innerHTML = data.educationHead[index];
      document.querySelectorAll(".educationSubhead")[index].innerHTML =
        data.educationsubhead[index];
      document.querySelectorAll(".educationText")[index].innerHTML =
        data.educationText[index];
    });

    // skills and progress bar
    let skills = document.querySelectorAll(".skillTopic");
    let skillsPercent = document.querySelectorAll(".progressPercent");
    let skillProgress = document.querySelectorAll(".skillProgress");
    skills.forEach((elem, index) => {
      elem.innerHTML = data.skillTopic[index];
      skillsPercent[index].innerHTML = data.progressPercent[index];
      skillProgress[index].style.width = data.progressPercent[index] + "%";
    });

    // portfolio items
    let portfolioItems = document.querySelectorAll(".portfolioHead");
    let portfolioItemsText = document.querySelectorAll(".portfolioText");
    let portfolioItemsImg = document.querySelectorAll("li.portfolioItem>img");
    portfolioItems.forEach((elem, index) => {
      elem.innerHTML = data.portfolioItemsHead[index];
      portfolioItemsText[index].innerHTML = data.portfolioItemsText[index];
      portfolioItemsImg[index].src = data.portfolioItemsImg[index];
      portfolioItemsImg[index].alt = data.portfolioItemsText[index];
    });

    // faq items
    let faqItems = document.querySelectorAll(".faqQuestion");
    let faqText = document.querySelectorAll(".faqItemBody");
    faqItems.forEach((elem, index) => {
      elem.innerHTML = data.FAQuestion[index];
      faqText[index].innerHTML = data.FAnswer[index];
    });

    // making slider elements
    let sliderText = document.querySelectorAll(".sliderText");
    let sliderImg = document.querySelectorAll(".sliderImg");
    let sliderName = document.querySelectorAll(".sliderName");
    let sliderAddress = document.querySelectorAll(".sliderAddress");
    sliderText.forEach((elem, index) => {
      elem.innerHTML = data.sliderText[index];
      sliderImg[index].src = data.sliderImg[index];
      sliderName[index].innerHTML = data.sliderName[index];
      sliderAddress[index].innerHTML = data.sliderAddress[index];
    });
    resizeSlider();

    // rest of the page
    allElements.forEach((elem) => {
      let elementName = elem.getAttribute("lnText");
      if (elem.getAttribute("lnText") == elementName && elementName != "") {
        elem.innerHTML = data[elementName];
      }
    });
  };

  xhttp.open("GET", `./ln/${language}.json`);
  xhttp.send();
}

textsLanguage();

let lanBtn = document.getElementById("changeLan");
lanBtn.addEventListener("click", function () {
  if (language == "en-us") {
    language = "fa-ir";
  } else {
    language = "en-us";
  }
  textsLanguage();
  changeLan();
});

let html = document.getElementById("html");
function changeLan() {
  if (language == "en-us") {
    pageElements.push(fadeInRight);
    fixLtrRtl();
    html.dir = "ltr";
    texts = ["Ali Eslamdoust", "A Web Developer", "A Designer"];
  } else {
    pageElements.push(fadeInLeft);
    fixLtrRtl();
    html.dir = "rtl";
    texts = ["علی اسلام دوست هستم", "یک طراح وب هستم", "یک UI/UX کار هستم"];
  }
}
changeLan();

function fixLtrRtl() {
  let faqItems = document.querySelectorAll(".faqItem");
  let resumeItems = document.querySelectorAll(".rBTItems>div");
  faqItems.forEach((elem) => elem.classList.toggle("rtl"));
  resumeItems.forEach((elem) => elem.classList.toggle("rtl"));
}
fixLtrRtl();
