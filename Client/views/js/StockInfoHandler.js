
/**
 * Each time that the stock search dialog has a key input into it, check for a valid matching stock
 */

$(document).ready(function() {
    $("#stockSearch").change(function () {

        // Get the submitted ticker
        let ticker = $("#stockSearch").val();

        // Add the loading circle to the text DOM element
        //TODO: Icon does not appear like it should for some reason
        $("#stockSearchContainer").addClass("right icon loading");

        // Make the ajax query for the ticker in question

        $.post("http://localhost:3000/requestStockDaily/" + ticker,
            function(data, textStatus, xhr) {

            // Remove the loading class
                $('#stockSearchContainer').removeClass('right icon loading');

                // If the status is '204' - There was no ticker matching the supplied value.
                if(xhr.status == 204) {

                    $('#stockSearchContainer').transition('shake');
                    $('#stockSearchContainer').addClass('error');

                    setTimeout(function() {
                        // After 1 second, remove the error class
                        $('#stockSearchContainer').removeClass('error');
                    }, 1000);


                }


            });
    });
});
