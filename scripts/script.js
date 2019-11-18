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
  pawApp.startRandom = false; // bool check for determines if the randomEvent fu will start generating random transitions
  pawApp.endOfTransition =
    "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"; // string to pass in to check if the transition has ended
  pawApp.timesClicked = 0; // this incrementor is for switch statement to determine which scripted event should run

  // produces random number fixed to 2 decimal places
  pawApp.randomDecimals = () => {
    return Math.random().toFixed(2);
  };
  // generates random cubic-bezier values after all scripted events ran
  pawApp.randomTrans = {
    transition: () =>
      `all 1s cubic-bezier(${pawApp.randomDecimals()},${pawApp.randomDecimals()},${pawApp.randomDecimals()},${pawApp.randomDecimals()})`
  };
  // transition values for normal event transitions
  pawApp.normalTrans = {
    transition: "all 0.4s linear"
  };
  // transition and translate values for the lightSwitch to move transitions
  pawApp.buttonMoveTrans = {
    translate: "translate(0, 100vh)",
    transition: "all 0.5s linear"
  };
  // an array carring the 3 different paw picture DOM elements for the quick 3 paws switch event.
  pawApp.pawsArr = [paws, paw2, paw3];
};

// show and hides the event bubble
pawApp.infoControl = () => {
  infoIcon.on("click", () => {
    infoContent.toggleClass("active");
  });
};
// this fn template is used to do a normal paw animation loop
pawApp.activateItems = (item, transitions) => {
  // adds the class of active to an item so it come up from outside of frame
  // .one() ensures when the transition ends, a function runs
  item.addClass("active").one(pawApp.endOfTransition, () => {
    // removes the class of active so the item is no longer in the frame
    item.removeClass("active");
    // removes the transparent dark element covering the screen
    body.removeClass("lightsOut");
  });
  // when the retracting transition end run ...
  item.one(pawApp.endOfTransition, () => {
    // change the css speed for the next event
    item.css("transition", transitions);
  });
};
// normal default event for the switch statement, initial and default event
pawApp.normalEvent = () => {
  pawApp.activateItems(paws, pawApp.normalTrans.transition);
  // start with dimming the lights/ adding a dark transparent div element to cover the body element
  body.addClass("lightsOut");
};
// after all scripted events exhaust, this event will be the default event, and runs randomTrans to generate random cubic-bezier values
pawApp.randomEvent = () => {
  pawApp.activateItems(paws, pawApp.randomTrans.transition());
  body.addClass("lightsOut");
};
// this is the second scripted event, uniquely moves the button after a normal event runs
pawApp.buttonMoveEvent = () => {
  pawApp.normalEvent();

  // targets the lightSwitch transform and transition css and change it in .8 seconds after triggering buttonMoveEvent
  setTimeout(() => {
    lightSwitch.css("transform", pawApp.buttonMoveTrans.translate);
    lightSwitch.css("transition", pawApp.buttonMoveTrans.transition);
  }, 800);

  // targets the lightSwitch transform and transition css and bring it back to original position in 2.5 seconds after triggering buttonMoveEvent
  setTimeout(() => {
    lightSwitch.css("transform", "none");
    lightSwitch.css("transition", "none");
  }, 2500);
};

// third scripted event to run without the addEventListener function, this will run immediately, uniquely loops 3 paws of different style.
pawApp.quickThreeEvent = () => {
  // this fur loop starts at 0, which fires the first paw loop immediately, and the rest at 1 second interval
  for (let i = 0; i < 3000; i += 1000) {
    setTimeout(() => {
      // dims lights
      body.addClass("lightsOut");
      // utilizes the array of paws(contains paws, paw2, paw3), looping it with the initial value / 1000 to get single digits
      pawApp.pawsArr[i / 1000]
        // just like a normal event loop, adding and removing the class of active
        .addClass("active")
        .one(pawApp.endOfTransition, () => {
          pawApp.pawsArr[i / 1000].removeClass("active");
          body.removeClass("lightsOut");
        });
    }, i);
  }
};
// like an normal event, uniquely calls down the kitten hiding in the top frame, uses activateItems fn and passes in kitty, and uses normal transition values
pawApp.topKittyEvent = () => {
  pawApp.activateItems(kitty, pawApp.normalTrans.transition);
  body.addClass("lightsOut");
};
// this is a refactoring function only for the cat chasing toy ball event, where the items only needs to appear once, and using display none, will prevent the assets from retracting back to original position
pawApp.leftToyActivateItem = item => {
  item.addClass("active").one(pawApp.endOfTransition, () => {
    item.css("display", "none");
    item.removeClass("active");
  });
};

pawApp.leftToyEvent = () => {
  body.addClass("lightsOut");

  // applying transition to the cat toy, and kitty jumping image both on the left, and the paws
  toy.css("transition", "all 1s linear");
  catJump.css("transition", "all 0.8s linear");
  paws.css("transition", "all 0.5s linear");

  // starts the toy animating loop
  pawApp.leftToyActivateItem(toy);

  // starts the cat jumping image after 1 second
  setTimeout(() => {
    pawApp.leftToyActivateItem(catJump);
  }, 1000);

  // start the normal cat paw event after 2 seconds
  setTimeout(() => {
    // when the animation finishes, run ...
    paws.addClass("active").one(pawApp.endOfTransition, () => {
      // remove active, and relit the frame
      paws.removeClass("active");
      body.removeClass("lightsOut");
      // un-hide the cat toy, and cat jumping image hidden previously
      toy.css("display", "block");
      catJump.css("display", "block");
    });
  }, 2000);
};

// this function is ran at the beginning of each loop to apply a single onClick event listener to prevent the user from spam clicking, and starting the next loop before the previous loop finishes running
pawApp.addEventListenerToBtn = eventName => {
  lightSwitch.one("click", () => {
    // this is to increment and tell the switch statement to listen and switch for the next event
    pawApp.timesClicked++;
    // run this next event passed in
    eventName();
    // call the switch statement again to restart the next event loop
    pawApp.eventSwapper();
  });
};

// this function is like the tv remote that runs itself, it uses timesClicked number value to determine which scripted event to run.
pawApp.eventSwapper = () => {
  switch (pawApp.timesClicked) {
    case 1:
      // second event, lightSwitch the moves and disappears after normal event runs
      pawApp.addEventListenerToBtn(pawApp.buttonMoveEvent);
      break;

    case 3:
      // paws quickly switches
      pawApp.quickThreeEvent();
      // preps for the next event which is the top kitten coming down
      pawApp.addEventListenerToBtn(pawApp.topKittyEvent);
      break;

    case 4:
      // cat chase sequence
      pawApp.addEventListenerToBtn(pawApp.leftToyEvent);
      break;

    case 5:
      // end of scripted event, and start a new random unscripted event
      pawApp.startRandom = true;
      pawApp.addEventListenerToBtn(pawApp.randomEvent);
      break;

    default:
      // default normal and goes through the startRandom bool check to determine which event to run
      pawApp.startRandom
        ? pawApp.addEventListenerToBtn(pawApp.randomEvent)
        : pawApp.addEventListenerToBtn(pawApp.normalEvent);
      break;
  }
};

$(function() {
  pawApp.init();
  pawApp.eventSwapper();
  pawApp.infoControl();
});
