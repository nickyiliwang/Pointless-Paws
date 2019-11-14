// credit: https://codepen.io/RAN3000/pen/ogxwQK for basic logic
const pawApp = {
  endOfAnimations:
    "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", // detecting transition end
  timesClicked: 0, //for special function events
  // picture of paws
  pawsSrc: ["./"],
  // cubic-bezier values
  cubicBezierArr: [
    "all 3s cubic-bezier(.36,1.48,1,.71)", // Slow windup and bop
    "all 2s cubic-bezier(.17,.67,.78,.36)",
    "all 1s cubic-bezier(0,.98,.7,.7)",
    "all 0.8s linear"
  ],
  // transform
  transformArr: [
    "translate(0, 50vw)",
    "translate(0, 50vw)",
    "translate(0, 50vw)"
  ],
  // positions
  positionsArr: [
    "right:5vw"
  ],
  randomNumber: max => {
    return Math.floor(Math.random() * Math.floor(max));
  }
};

// Functions
pawApp.normalEvent = function() {
  $(".switch").on("click", function() {
    // $(".paws").css("transition", pawApp.cubicBezier[pawApp.randomNumber(3)]);

    $(".paws").css(
      "transition",
      pawApp.cubicBezierArr[pawApp.timesClicked],
      "transform",
      pawApp.transformArr[pawApp.timesClicked],
      "position",
      pawApp.positionsArr[pawApp.timesClicked]
    );
    // pawApp.timesClicked++;

    // $(".paws").css("transform", pawApp.transformArr[0]);
    $(".paws")
      .addClass("active")
      .one(pawApp.endOfAnimations, function() {
        $("#lights").prop("checked", false);
        $(".paws")
          .removeClass("active")
          .one(pawApp.endOfAnimations);
      });
  });
};

pawApp.init = function() {
  pawApp.normalEvent();
};

$(function() {
  pawApp.init();
});
