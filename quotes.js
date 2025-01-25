let colors = [
    "#0d5d39",
    "#107347",
    "#138a54",
    "#16a062",
    "#19b670",
    "#1ccd7d",
    "#22e18b"
  ],
  randomQuote = "",
  currentQuote = "",
  currentAuthor = "";

/* Establish mood subarrays of hard-coded categorical quotes for Inspiration, Wisdom, Comfort, Humor; update random generator to the onclick buttons accordingly */

const quotes = [
  [
    [
      "The bravest are surely those who have the clearest vision of what is before them, glory and danger alike, and yet notwithstanding, go out to meet it.",
      "Thucydides"
    ],
    [
      "Small opportunities are often the beginning of great enterprises.",
      "Demosthenes"
    ],
    ["The beginning is the most important part of the work.", "Plato"],
    ["To see things in the seed, that is genius.", "Lao Tzu"],
    ["Nature does not hurry, yet everything is accomplished.", "Lao Tzu"]
  ],
  [
    ["He who is not a good servant will not be a good master.", "Plato"],
    ["A good decision is based on knowledge and not numbers.", "Plato"],
    [
      "Mastering others is strength. Mastering yourself is true power.",
      "Lao Tzu"
    ],
    ["When I let go of what I am, I become what I might be.", "Lao Tzu"],
    ["Beware the barrenness of a busy life.", "Socrates"]
  ],
  [
    ["The only true wisdom is in knowing you know nothing.", "Socrates"],
    [
      "Wealth consists not in having great possessions, but in having few wants.",
      "Epictetus"
    ],
    [
      "Better a little which is well done, than a great deal imperfectly.",
      "Plato"
    ],
    ["Anticipate the difficult by managing the easy.", "Lao Tzu"],
    [
      "When you are inspired by some great purpose, some extraordinary project, all your thoughts break their bonds.",
      "Patanjali"
    ]
  ],
  /* Granny interjection */
  [
    ["Eat your peas and carrots.", "Granny"],
    ["Don't lie to me.", "Granny"],
    ["Wear your clean underwear.", "Granny"],
    ["Eat ice cream everyday.", "Granny"],
    ["Soda hasn't killed me yet!", "Granny"]
  ]
];

/* Functions to select from subarrays according to click event, then  within nested array, for randomized return text and author by designated index within generated index within designated index */

// For Inspiration button - the function logic was all tucked inside the biggest name. Look at doing that differently next up, &or building the click events into a delegating conditional function.

function getRandomInspo() {
  return quotes[0][Math.floor(Math.random() * quotes[0].length)];
}
/*Inspiration set is operational.
    getInsp() function "owns" all the jQuery animation code for filling the fields. See where that brace opens and closes - the closing brace is found after animation features for text and author both */

function getInspo() {
  randomQuote = getRandomInspo();
  currentQuote = randomQuote[0];
  currentAuthor = randomQuote[1];

  // tweet function embedded simply as stated //
  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $(".quote-text").animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $("#text").text(currentQuote);
  });

  $(".quote-author").animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $("#author").text(currentAuthor);
  });
  // Closing Inspo section
}

// For Wisdom button - FULL function logic to pull into click event.
function getRandomWise() {
  return quotes[1][Math.floor(Math.random() * quotes[1].length)];
}

function getWise() {
  randomQuote = getRandomWise();
  currentQuote = randomQuote[0];
  currentAuthor = randomQuote[1];

  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $(".quote-text").animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $("#text").text(currentQuote);
  });

  $(".quote-author").animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $("#author").text(currentAuthor);
  });
  // Closing Wisdom section.
}

// for Comfort button - FULL function logic to pull into its onclick event.
function getRandomComfort() {
  return quotes[2][Math.floor(Math.random() * quotes[2].length)];
}

function getComfort() {
  randomQuote = getRandomComfort();
  currentQuote = randomQuote[0];
  currentAuthor = randomQuote[1];

  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $(".quote-text").animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $("#text").text(currentQuote);
  });

  $(".quote-author").animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $("#author").text(currentAuthor);
  });
  // Closing Comfort section
}

// For Humor button
function getRandomHumor() {
  return quotes[3][Math.floor(Math.random() * quotes[3].length)];
}

function getHumor() {
  randomQuote = getRandomHumor();
  currentQuote = randomQuote[0];
  currentAuthor = randomQuote[1];

  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $(".quote-text").animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $("#text").text(currentQuote);
  });

  $(".quote-author").animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $("#author").text(currentAuthor);
  });
  // Close Humor section
}
/* This is load and onclick with jQuery. Working. Going for subsequent button click events below. Maintaining this onload event. */
$(document).ready(function () {
  getInspo();
  $("#new-quote").on("click", getInspo);
});
$("#wise").on("click", getWise);
$("#comfort").on("click", getComfort);
$("#humor").on("click", getHumor);