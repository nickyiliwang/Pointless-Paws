// create an app object to store data and functions, its called pawApp, I will be storing 3 things for now:
// 1. endOfAnimation is a variable carrying a string payload for detecting when a transition animation ends, this is to pass into the jQuery function .one() where its used to detect when the light switch transition is triggered,
// I will need an array of strings to store several cubic-bezier values like this: "all 0.7s cubic-bezier(.17,.67,.78,.36)", in order to change my paws transition speed and timing.
// a randomNumber randomizing function that produces a random number no bigger than the length of the cubic bezier array.

// basic mechanics

// for better code organization we will need an init function
// on clicking the switch button in the center screen, it will fun a function that alters the default css transition for the paws div with the class of paws, that also contains an image of an animal paw, this function will reference the cubic-bezier array that utilize the randomize function to access a random cubic-bezier transition values.
// once the paws transition is altered, we can add an class called 'active', which will set the transition to none, because we are playing the transition animation in reverse.
// once the transition animation has ended, we will use a, jquery method called .one(), which would only fire once, and pass in the endOfAnimation string to detect the end of the transition, upon ending, we will select the light switch input with an id of light, and we can use the .prop() method to un-check the radio input, because that's how the css is alternative between on/off for the light switch button. We use an input radio to determine it.

// once the paws transition ends, we will use removeClass to remove the class of 'active' from the 

// finally we initiate the init function upon document ready function.


// Selecting DOM Elements
const lightSwitch = $(".lightSwitch");
const paws = $(".paws");
const paw2 = $(".paw2");
const paw3 = $(".paw3");
const kitty = $(".kitty");
const body = $("body");
const soundIcon = $(".sound");
const infoIcon = $(".info");
const infoContent = $(".infoContent");
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
    transition: "all 0.4s linear"
  };

  pawApp.buttonMoveTrans = {
    translate: "translate(0, 100vh)",
    transition: "all 0.5s linear"
  };
  pawApp.pawsArr = [paws, paw2, paw3];
};

pawApp.soundControl = () => {
  soundIcon.on("click", () => {
    console.log("muted");
  });
};
pawApp.infoControl = () => {
  infoIcon.on("click", () => {
    console.log("clicked");
    infoContent.toggleClass("active");
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
      pawApp.pawsArr[i / 1000]
        .addClass("active")
        .one(pawApp.endOfAnimations, () => {
          pawApp.pawsArr[i / 1000].removeClass("active");
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
      console.log("fullPawsEvent run");
      pawApp.startRandom = true;
      pawApp.addEventListenerToBtn(pawApp.randomEvent);
      break;

    case 6:
      console.log("startRandomEvent run");
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
  //   pawApp.quickThreeEvent();
  // });
  // // dev

  pawApp.soundControl();
  pawApp.infoControl();
});
