// credit: https://codepen.io/RAN3000/pen/ogxwQK for basic logic

const pawApp = {
  endOfAnimations:
    "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
  cubics: [
    "all 0.7s cubic-bezier(.17,.67,.78,.36)",
    "all 0.3s cubic-bezier(1,.02,0,.99)",
    "all 1s cubic-bezier(.49,.51,1,-0.83)",
    "all 0.1s linear"
  ],
  randomNumber: max => {
    return Math.floor(Math.random() * Math.floor(max));
  }
};

pawApp.init = function() {
  $(".switch").on("click", function() {
    $(".paws").css("transition", pawApp.cubics[pawApp.randomNumber(3)]);
    $(".paws")
      .addClass("active")
      .one(pawApp.endOfAnimations, function() {
        $("#lights").prop("checked", false);

        // paws will no long have the class of active
        $(".paws")
          .removeClass("active")
          .one(pawApp.endOfAnimations);
      });
  });
};

$(function() {
  pawApp.init();
});
