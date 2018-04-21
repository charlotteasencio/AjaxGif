$(document).ready(function() {

var tvArray = ["Friends", "How I Met Your Mother", "Fresh Prince of Bel Aire", "Boy Meets World", "Parks and Recreation", "The Office", "The Big Bang Theory", "Modern Family", "30 Rock", "New Girl", "Queer Eye"];

$(document).on("click", ".show", showTvGifs);

function showTvGifs(){
    var tvShow = $(this).attr("button-data");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=XPiB25nCUJRXzHP0Mlre0qO6sXxIP6dl&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {


        var gifDiv = $("<div class='gif'>");
        var rating = response.data.rating;
        var showRating = $("<p>").text("Rating: " + rating);
        gifDiv.append(rating);
        var gifImageUrl = response.data.url;
        var gifImage = $("<div>").attr("src", gifImageUrl);
        gifDiv.append(gifImage);
        $("#gifs").prepend(gifDiv);
        console.log(response);
      });  
    }

//create buttons at top of page from my array

function renderButtons() {

    $("#buttons").empty();

for (var i = 0; i < tvArray.length; i++) {
    var tvButton = $("<button>");
    tvButton.addClass("show");
    tvButton.attr("button-data", tvArray[i]);
    tvButton.text(tvArray[i]);
    $("#buttons").append(tvButton);
}

}

$("#add-tv").on("click", function(event) {
    event.preventDefault();
    var tv = $("#tv-input").val().trim();
    tvArray.push(tv);
    renderButtons();

  });

  

  renderButtons();

});