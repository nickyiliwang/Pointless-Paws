const pawApp = {};
pawApp.endOfAnimations =
  "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
pawApp.timesClicked = 0;
pawApp.cubicBezierArr = [
  "all 0.1s linear" // quick 3
];

pawApp.activatePaws = () => {
  console.log("activatePaws");
  $(".paws")
    .addClass("active")
    .one(pawApp.endOfAnimations, () => {
      console.log("activatePaws animation end");

      $(".paws").removeClass("active");
      $("body").removeClass("lightsOut");

      pawApp.deactivatePaws();
    });
};

pawApp.deactivatePaws = () => {
  $(".paws").one(pawApp.endOfAnimations, () => {
    console.log("deactivatePaws animation end");
    pawApp.changePawsCss();


    pawApp.normalEvent();
    // pawApp.eventSwapper();
  });
};

pawApp.changePawsCss = () => {
  console.log("changePawsCss");
  $(".paws").css("transition", pawApp.cubicBezierArr[0]);
};

// Functions
pawApp.eventSwapper = () => {
  console.log("swap event");
  console.log(pawApp.timesClicked);
  switch (pawApp.timesClicked) {
    case 1:
      pawApp.normalEvent();
      break;
    case 2:
      pawApp.normalEvent();
      break;

    case 3:
      console.log("quickThreeEvent selected 1");
      pawApp.quickThreeEvent();
      break;

    default:
      pawApp.normalEvent();
  }
};

pawApp.normalEvent = () => {
  console.log("normalEvent run");
  pawApp.timesClicked++;

  $(".lightSwitch").one("click", () => {
    pawApp.activatePaws();
    $("body").addClass("lightsOut");
  });
};

pawApp.quickThreeEvent = () => {
  console.log("quickThreeEvent run 2");
  pawApp.timesClicked++;
  $(".lightSwitch").one("click", () => {
    for (let i = 0; i < 3000; i += 1000) {
      setTimeout(() => {
        $(".paws")
          .css("transition", pawApp.cubicBezierArr[0])
          .addClass("active")
          .one(pawApp.endOfAnimations, () => {
            $(".paws").removeClass("active");
            $("body").removeClass("lightsOut");
          });

        $("body").addClass("lightsOut");
      }, i);
    }
  });
};

pawApp.init = () => {
  pawApp.eventSwapper();
  // pawApp.normalEvent();
  // pawApp.quickThreeEvent();
};

$(function() {
  pawApp.init();
});
