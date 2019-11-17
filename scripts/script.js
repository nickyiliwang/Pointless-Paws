// Selecting DOM Elements
const lightSwitch = $(".lightSwitch");
const paws = $(".paws");
const kitty = $(".kitty");
const body = $("body");
const soundIcon = $(".sound");
const clickSound = $("#click");

// global object
const pawApp = {};

pawApp.init = () => {
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
    transition: "all 0.5s linear"
  };

  pawApp.buttonMoveTrans = {
    translate: "translate(0, 100vh)",
    transition: "all 0.5s linear"
  };
};

pawApp.soundControl = () => {
  soundIcon.on("click", () => {
    console.log("muted");
  });
};

pawApp.activateItems = (item, transitions) => {
  console.log("activateItems");
  item.addClass("active").one(pawApp.endOfAnimations, () => {
    console.log("activateItems animation end");
    item.removeClass("active");
    body.removeClass("lightsOut");
  });

  item.one(pawApp.endOfAnimations, () => {
    console.log("change item transition");
    item.css("transition", transitions);
  });
};

pawApp.normalEvent = () => {
  pawApp.activateItems(paws, pawApp.normalTrans.transition);
  body.addClass("lightsOut");
};

pawApp.randomEvent = () => {
  console.log(pawApp.randomTrans.transition);
  pawApp.activateItems(paws, pawApp.randomTrans.transition);
  body.addClass("lightsOut");
};

pawApp.buttonMoveEvent = () => {
  console.log("buttonMoveEvent active");
  pawApp.normalEvent();
  setTimeout(() => {
    lightSwitch.css("transform", pawApp.buttonMoveTrans.translate);
    lightSwitch.css("transition", pawApp.buttonMoveTrans.transition);
  }, 800);

  setTimeout(() => {
    lightSwitch.css("transform", "none");
    lightSwitch.css("transition", "none");
  }, 4000);
};

pawApp.quickThreeEvent = () => {
  console.log("quickThreeEvent active");
  for (let i = 0; i < 3300; i += 1300) {
    setTimeout(() => {
      body.addClass("lightsOut");
      paws.addClass("active").one(pawApp.endOfAnimations, () => {
        paws.removeClass("active");
        body.removeClass("lightsOut");
      });
    }, i);
  }
};

pawApp.topKittyEvent = () => {
  console.log("topKittyEvent active");
  pawApp.activateItems(kitty, pawApp.normalTrans.transition);
  body.addClass("lightsOut");
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
      console.log("topKittyEvent run");
      pawApp.addEventListenerToBtn(pawApp.topKittyEvent);
      break;

    case 5:
      console.log("randomEvent run");
      pawApp.addEventListenerToBtn(pawApp.randomEvent);
      break;

    default:
      pawApp.addEventListenerToBtn(pawApp.normalEvent);
      break;
  }
};

$(function() {
  pawApp.init();
  pawApp.eventSwapper();

  //dev
  // lightSwitch.on("click", () => {
  //   pawApp.topKittyEvent();
  // });
  //dev

  pawApp.soundControl();
});
