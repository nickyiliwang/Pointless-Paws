const pawApp = {
  endOfAnimations: "strings", // detecting transition end
  timesClicked: 0, //for special function events
  // Assets
  scenarioAssets: [
    {
      name: "string", // which transition it is for
      cubicBezier: "strings", // cubic-bezier values
      pawsSrc: "./././" // pictures src for paws
    }
  ],

  // Functions
  eventsHandlerFunctions: {
    normalEvent: function() {
      $(".switch").on("click", function() {
        $(".paws").css("transition", pawApp.cubics[pawApp.randomNumber(3)]);
        $(".paws")
          .addClass("active")
          .one(pawApp.endOfAnimations, function() {
            $("#lights").prop("checked", false);
            $(".paws")
              .removeClass("active")
              .one(pawApp.endOfAnimations);
          });
      });
    }
  }
};
