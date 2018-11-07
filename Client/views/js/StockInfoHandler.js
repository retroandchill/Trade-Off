
/**
 * Each time that the stock search dialog has a key input into it, check for a valid matching stock
 */

$(document).ready(function() {
    $("#stockSearch").change(function () {

        // Get the submitted ticker
        let ticker = $("#stockSearch").val();

        // Add the loading circle to the text DOM element
        //TODO: Fix this
        $("#stockSearchContainer").addClass("right icon loading");

        // Make the ajax query for the ticker in question

        $.post("http://localhost:3000/requestStockDaily/" + ticker,
            function(data, textStatus, xhr) {

            // If the status is '204' - There was no ticker matching the supplied value.
                if(xhr.status == 204) {
                    //TODO: Do something proper here
                    console.log("Sheeeeettt");
                    return;
                }

                // Data is filled out correctly


            });
    });
});
