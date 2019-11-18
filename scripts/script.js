// Selecting DOM Elements
const lightSwitch = $(".lightSwitch");
const paws = $(".paws");
const pawsImage = $(".pawsImage");
const kitty = $(".kitty");
const body = $("body");
const soundIcon = $(".sound");
const infoIcon = $(".info");
const clickSound = $("#click");
const toy = $(".toy");
const catJump = $(".catJump");

// global object
const pawApp = {};

pawApp.init = () => {
  pawApp.startRandom = false;
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
    transition: () =>
      `all 1s cubic-bezier(${pawApp.randomDecimals()},${pawApp.randomDecimals()},${pawApp.randomDecimals()},${pawApp.randomDecimals()})`
  };

  pawApp.normalTrans = {
    transition: "all 0.3s linear"
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
pawApp.infoControl = () => {
  infoIcon.on("click", () => {
    console.log("Info");
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
  console.log(pawApp.randomTrans.transition());
  pawApp.activateItems(paws, pawApp.randomTrans.transition());
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
  }, 2500);
};

pawApp.quickThreeEvent = () => {
  console.log("quickThreeEvent active");
  for (let i = 0; i < 3000; i += 1000) {
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

pawApp.leftToyActivateItem = item => {
  item.addClass("active").one(pawApp.endOfAnimations, () => {
    item.css("display", "none");
    item.removeClass("active");
  });
};

pawApp.leftToyEvent = () => {
  console.log("leftToyEvent active");
  body.addClass("lightsOut");

  toy.css("transition", "all 1s linear");
  catJump.css("transition", "all 0.8s linear");
  paws.css("transition", "all 0.5s linear");

  pawApp.leftToyActivateItem(toy);

  setTimeout(() => {
    pawApp.leftToyActivateItem(catJump);
  }, 1000);

  setTimeout(() => {
    paws.addClass("active").one(pawApp.endOfAnimations, () => {
      paws.removeClass("active");
      body.removeClass("lightsOut");
      toy.css("display", "block");
      catJump.css("display", "block");
    });
  }, 2000);
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
      console.log("quickThreeEvent run, preloading topKittyEvent");
      pawApp.quickThreeEvent();
      pawApp.addEventListenerToBtn(pawApp.topKittyEvent);
      break;

    case 4:
      console.log("leftToyEvent run");
      pawApp.addEventListenerToBtn(pawApp.leftToyEvent);
      break;

    case 5:
      console.log("startRandom run");
      pawApp.startRandom = true;
      pawApp.addEventListenerToBtn(pawApp.randomEvent);
      break;

    case 6:
      console.log("startRandom run");
      pawApp.startRandom = true;
      pawApp.addEventListenerToBtn(pawApp.randomEvent);
      break;

    default:
      // todo, make random event generator
      pawApp.startRandom
        ? pawApp.addEventListenerToBtn(pawApp.randomEvent)
        : pawApp.addEventListenerToBtn(pawApp.normalEvent);
      break;
  }
};

$(function() {
  pawApp.init();
  pawApp.eventSwapper();

  // // dev
  // lightSwitch.on("click", () => {
  //   pawApp.leftToyEvent();
  // });
  // // dev

  pawApp.soundControl();
  pawApp.infoControl();
});
