// Selecting DOM Elements
const lightSwitch = $(".lightSwitch");
const paws = $(".paws");
const body = $("body");
const soundIcon = $(".sound");
const clickSound = $("#click");

// global object
const pawApp = {};

pawApp.init = () => {
  pawApp.randomTransCheck = false;
  pawApp.endOfAnimations =
    "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
  pawApp.timesClicked = 0;

  pawApp.randomNumber = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  pawApp.randomDecimals = () => {
    return Math.random().toFixed(2);
  };

  pawApp.randomTrans = {
    transition: `all 1s cubic-bezier(${pawApp.randomDecimals()},${pawApp.randomDecimals()},${pawApp.randomDecimals()},${pawApp.randomDecimals()})`
  };

  pawApp.normalTrans = {
    transition: "all 0.8s linear"
  };

  pawApp.buttonMoveTrans = {
    translate: "translate(0, 50vw)",
    transition: "all 0.3s linear"
  };

  pawApp.quickThreeTrans = {
    transition: "all 0.3s linear"
  };
};

pawApp.soundControl = () => {
  console.log("sound");
  console.log(pawApp.normalTrans.transition);
  soundIcon.on("click", () => {
    console.log("muted");
  });
};

pawApp.activatePaws = () => {
  console.log("activatePaws");
  paws.addClass("active").one(pawApp.endOfAnimations, () => {
    console.log("activatePaws animation end");
    paws.removeClass("active");
    body.removeClass("lightsOut");
  });

  paws.one(pawApp.endOfAnimations, () => {
    console.log("change paws transition");

    pawApp.randomTransCheck
      ? paws.css("transition", pawApp.randomTrans.transition)
      : paws.css("transition", pawApp.normalTrans.transition);
  });
};

pawApp.initialEvent = () => {
  pawApp.activatePaws();
  body.addClass("lightsOut");
};

pawApp.normalEvent = () => {
  pawApp.activatePaws();
  body.addClass("lightsOut");
};

pawApp.buttonMoveEvent = () => {
  console.log("buttonMoveEvent active");
  pawApp.normalEvent();
  setTimeout(() => {
    lightSwitch.css("transform", pawApp.buttonMoveTrans.translate);
    lightSwitch.css("transition", pawApp.buttonMoveTrans.transition);
  }, 2000);

  setTimeout(() => {
    lightSwitch.css("transform", "none");
    lightSwitch.css("transition", "none");
  }, 4000);
};

pawApp.quickThreeEvent = () => {
  console.log("quickThreeEvent active");
  for (let i = 0; i < 3000; i += 1000) {
    setTimeout(() => {
      body.addClass("lightsOut");
      paws
        .css("transition", pawApp.quickThreeTrans.transition)
        .addClass("active")
        .one(pawApp.endOfAnimations, () => {
          paws.removeClass("active");
          body.removeClass("lightsOut");
        });
    }, i);
  }
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

    case 4:
      console.log("quickThreeEvent run");
      pawApp.initialApp = false;
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
  pawApp.soundControl();
});
