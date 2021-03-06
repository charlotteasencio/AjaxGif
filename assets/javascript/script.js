$(document).ready(function() {

var tvArray = ["How I Met Your Mother", "Fresh Prince of Bel Aire", "Boy Meets World", "Parks and Recreation", "The Office", "The Big Bang Theory", "Modern Family", "30 Rock", "New Girl", "Queer Eye", "Full House"];
var gifArray = [];
var colorArray = ["hotpink", "yellow", "purple"]

$(document).on("click", ".show", showTvGifs); 
  
//create buttons at top of page from array
      function renderButtons() {

        $("#buttons").empty();
    
    for (var i = 0; i < tvArray.length; i++) {
        var tvButton = $("<button>");
        tvButton.addClass("show");
        tvButton.addClass("styledButton")
        tvButton.attr("button-data", tvArray[i]);
        tvButton.text(tvArray[i]);
        $("#buttons").append(tvButton);
        }
    }


    function addBackground() {
      $(".show").on('click', function (event) {
        if($("button").hasClass('active')) {
          $("button").each(function() {
            console.log(this)
            $("button").removeClass('active')
          });
        }
        $target = $(event.target);   
           $target.addClass('active');
           console.log($target)
       });
    }

    //add new buttons from the tv show input
    $("#add-tv").on("click", function(event) {
        event.preventDefault();
       
        var tv = $("#tv-input").val().trim();
        if(tv !== null && tv !== "") {
        tvArray.push(tv);
        renderButtons();
        addBackground();
        $("#tv-input").val("");
        } 
      });

      //get gifs from giphy api and append 
      function showTvGifs(){

        $("#gifs").empty();
        var tvShow = $(this).attr("button-data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=XPiB25nCUJRXzHP0Mlre0qO6sXxIP6dl&rating=pg&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
    
            var results = response.data;


            for (var j = 0; j < results.length; j++) {
    
            var gifDiv = $("<div class='gif'>");
            var rating = results[j].rating;
            var showRating = $("<p>").text("Rating: " + rating);
            gifDiv.append(showRating);
    
    
            var gifImageUrl = results[j].images.fixed_height_still.url;
            var gifMoveUrl = results[j].images.fixed_height.url;
            var gifImage = $("<img>").attr("src", gifImageUrl).attr("data-state", "still").attr("data-still", gifImageUrl).attr("data-animate", gifMoveUrl);
            gifDiv.append(gifImage);
            $("#gifs").append(gifDiv);
            }

            //animate or pause gifs on click
    
            $("img").on("click", function() {
      
                var state = $(this).attr("data-state");

                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
    
            });
            
          }

      renderButtons(); 
      addBackground();
});