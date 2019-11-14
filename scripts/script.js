const pawApp = {};
// detecting transition end
pawApp.endOfAnimations =
  "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
// Tracking times user clicked
pawApp.timesClicked = 0;
// picture source of paws pictures
pawApp.pawsSrc = ["./image/paws/Olives.png"];
// cubic-bezier values for transitions variations
pawApp.cubicBezierArr = [
  "all 0.5s linear",
  "all 2s cubic-bezier(.36,1.48,1,.71)", // Slow windup and bop
  "all 2s cubic-bezier(.17,.67,.78,.36)",
  "all 1s cubic-bezier(0,.98,.7,.7)"
];
// transform
pawApp.transformArr = ["translate(0, 50vw)", "translate(0, 50vw)"];
// positions
pawApp.positionsArr = ["-70vw"];

// functions
pawApp.randomNumber = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

pawApp.animatePaws = () => {
  $(".paws").css("transition", pawApp.cubicBezierArr[0]);
};

pawApp.activatePaws = () => {
  $(".paws")
    .addClass("active")
    .one(pawApp.endOfAnimations, function() {
      $("#lights").prop("checked", false);
      $(".paws").removeClass("active");
    });
};

// Functions
pawApp.normalEvent = function() {
  $(".switch").one("click", () => {
    $(".paws.active").css("bottom", "-50vw");
    pawApp.animatePaws();
    pawApp.activatePaws();
  });
};

pawApp.init = () => {
  pawApp.normalEvent();
};

$(function() {
  pawApp.init();
});
