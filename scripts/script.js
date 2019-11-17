const pawApp = {};

pawApp.init = () => {
  pawApp.endOfAnimations =
    "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
  pawApp.timesClicked = 0;
  pawApp.cubicBezierArr = [
    "all 0.5s linear" // quick 3
  ];
};

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
    case 3:
      console.log("quickThreeEvent selected 1");
      pawApp.quickThreeEvent();
      break;

    default:
      pawApp.normalEvent();
      break;
  }
};

pawApp.normalEvent = () => {
  console.log("normalEvent run");
  pawApp.activatePaws();
  $("body").addClass("lightsOut");
};

pawApp.quickThreeEvent = () => {
  console.log("quickThreeEvent run 2");
  for (let i = 0; i < 3000; i += 1000) {
    setTimeout(() => {
      $(".paws")
        .css("transition", pawApp.cubicBezierArr[0])
        .addClass("active")
        .one(pawApp.endOfAnimations, () => {
          $(".paws").removeClass("active");
          $("body").removeClass("lightsOut");
        });
    }, i);
  }
};

$(function() {
  pawApp.init();

  $(".lightSwitch").on("click", () => {
    pawApp.timesClicked++;
    pawApp.eventSwapper();
  });

  // pawApp.normalEvent();
  // pawApp.quickThreeEvent();
});
