

var adChars = ["Michael Bluth", "George Michael Bluth", "Lindsay Bluth", "George Bluth", "Gob Bluth", "Tobias Funke", "Lucille Bluth", "Bob Loblaw", "Maeby Funke", "Barry Zuckerkorn", "Ann Veal"];

function displayCharacterGif() {

  var character = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/random?" + "api_key=uAfM6T7jR2i2ukyt8qoJLkqCGQUDQvVq" + "&tag=" + character;

  // AJAX reference
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Variables to store images, then append them

    var characterDiv = $("<div class='character'>");
    var imgURL = response.data.images.original.url;

    var image = $("<img class='charactergif'>").attr("src", imgURL);
    image.attr("otherURL", response.data.images.original_still.url);

    characterDiv.append(image);

    // Prepend new character
    $("#character-display").prepend(characterDiv);
  });

}

// Display new buttons
function renderButtons() {

  // Remove old buttons
  $("#buttons-view").empty();

  // Looping through array of characters
  for (var i = 0; i < adChars.length; i++) {

    // Make and display buttons for each character
    var a = $("<button>");
    a.addClass("char-btn");
    a.attr("data-name", adChars[i]);
    a.text(adChars[i]);
    $("#buttons-display").append(a);
  }
}

// Event handler for when buttons are clicked
$("#add-character").on("click", function (event) {
  event.preventDefault();

  var character = $("#character-input").val().trim();

  // Push new character from input to array of characters
  adChars.push(character);
  console.log(character);

  renderButtons();
});

$(document).on("click", ".char-btn", displayCharacterGif);

renderButtons();

$(document).on("click", ".charactergif", function () {
  console.log("click");
  var src = $(this).attr("src");
  var otherURL = $(this).attr("otherURL");
  $(this).attr("src", otherURL);
  $(this).attr("otherURL", src);
});