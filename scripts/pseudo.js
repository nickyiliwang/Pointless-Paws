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