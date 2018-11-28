
//TODO: Remove these values when the modal closes
var currentSearchedStockMaxData;

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

        $.post("http://localhost:3000/requestStockMax/" + ticker,
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

                    return;
                }

                // Set up the stock modal with the data we recieved
                setupStockSegment(data, ticker);


            });
    });
});

/**
 * Function which sets up the stock modal with valid MAX data from the server
 */
function setupStockSegment(tickerMaxData, tickerName) {

    // Parse out just the relevent end of day values from the response
    let data = [];

    // Variable containing the max value which the stock has reached
    let maxVal = 0;

    for(let i = 0; i < tickerMaxData.records.length; i++) {
        data.push(tickerMaxData.records[i].close.toFixed(2));

        // If the value is bigger than the maximum value, update the max
        if(tickerMaxData.records[i].close.toFixed(2) > maxVal) {
            maxVal = tickerMaxData.records[i].close.toFixed(2);
        }
    }

    console.log(data);

    // Define the ChartJS options to be used for this chart
    let options = {
        responsive: true,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMax: maxVal,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                display: true,
                ticks: {
                    suggestedMin: data.length
                }
            }]
        }
    };

    let chartData = {
        datasets: [{
            label: 'Ticker Value',
            data: data,
            showLine: true,
            borderColor: '#00FF00'
        }]
    };

    // Create the MAX chart for the stock
    var tickerChart = new Chart($("#tickerChart"), {
        type: 'line',
        data: chartData,
        options: options
    });

    // Set the ticker name in the modal
    $("#tickerName").text(tickerName);

    $("#tickerModal").modal('show');


}

function closeTickerModal() {
    $("#tickerModal").modal('hide');
}

/**
 * Function returning standard ticker data
 * @param ticker
 */
function getCurrentStockData(ticker) {

    $.post("http://localhost:3000/requestStockDaily/" + ticker,
        function(data, textStatus, xhr) {

            // If the status is '204' - There was no ticker matching the supplied value.
            if(xhr.status == 204) {
                //TODO: Give some sort of error
                return;
            }
            return data;
        });
}

// Theoretically this should work with session data, so we don't need to give it more data than just the ticker
function getUserStockOwned(ticker) {


}
