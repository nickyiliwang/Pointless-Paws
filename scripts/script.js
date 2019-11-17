// DOM
const lightSwitch = $(".lightSwitch");
const paws = $(".paws");
const body = $("body");

// global object
const pawApp = {};

pawApp.init = () => {
  pawApp.endOfAnimations =
    "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
  pawApp.timesClicked = 0;
  pawApp.cubicBezier = [
    "all 0.3s linear" // quick 3
  ];
  pawApp.transformTranslate = ["translate(0, 50vw)"];
};

pawApp.activatePaws = () => {
  console.log("activatePaws");

  paws.addClass("active").one(pawApp.endOfAnimations, () => {
    console.log("activatePaws animation end");

    paws.removeClass("active");
    body.removeClass("lightsOut");

    pawApp.deactivatePaws();
  });
};

pawApp.deactivatePaws = () => {
  paws.one(pawApp.endOfAnimations, () => {
    console.log("deactivatePaws animation end");
    pawApp.changePawsCss();
  });
};

pawApp.changePawsCss = () => {
  console.log("changePawsCss");
  paws.css("transition", pawApp.cubicBezier[0]);
};

pawApp.normalEvent = () => {
  pawApp.activatePaws();
  body.addClass("lightsOut");
};

pawApp.buttonMoveEvent = () => {
  console.log("buttonMoveEvent active");
  pawApp.normalEvent();
  setTimeout(() => {
    lightSwitch.css("transform", pawApp.transformTranslate);
    lightSwitch.css("transition", pawApp.cubicBezier);
  }, 500);

  setTimeout(() => {
    lightSwitch.css("transform", "none");
    lightSwitch.css("transition", "none");
  }, 2000);
};

pawApp.quickThreeEvent = () => {
  console.log("quickThreeEvent active");
  for (let i = 0; i < 3000; i += 1000) {
    setTimeout(() => {
      body.addClass("lightsOut");
      paws
        .css("transition", pawApp.cubicBezier[0])
        .addClass("active")
        .one(pawApp.endOfAnimations, () => {
          paws.removeClass("active");
          body.removeClass("lightsOut");
        });
    }, i);
  }
  console.log("quick3done");
};

pawApp.addEventListenerToBtn = eventName => {
  lightSwitch.one("click", () => {
    pawApp.timesClicked++;
    eventName();
    pawApp.eventSwapper();
  });
};

pawApp.eventSwapper = () => {
  console.log("swap event");
  console.log(pawApp.timesClicked);
  switch (pawApp.timesClicked) {
    case 1:
      console.log("buttonMoveEvent selected");
      pawApp.addEventListenerToBtn(pawApp.buttonMoveEvent);
      break;

    case 3:
      console.log("quickThreeEvent run");
      pawApp.quickThreeEvent();
      pawApp.addEventListenerToBtn(pawApp.normalEvent);
      break;

    default:
      pawApp.addEventListenerToBtn(pawApp.normalEvent);
      break;
  }
};

$(function() {
  pawApp.init();
  pawApp.eventSwapper();
});
