var data = [];
var actualData = [];

// Generate some static data following a negative expodental curve
for(let i = 0; i < 5; i += 0.1) {

    //  data.push(((Math.atan(i) * -1)).toFixed(2));

    data.push({x: i, y: (20 * Math.sqrt(i) * Math.sin(i + 1.5 * Math.random()) + 50 * Math.sqrt(i) + 50)});
}

let randval;
for(let x = 0; x < 15; x = x + 0.1) {
    randval = (Math.random() * (.02)) - .01;

    actualData.push({x: x, y: 1.50 + randval});
}


$(function() {
    console.log(data);

    let ctx = $("#chart");
    var AILineChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'User Worth',
                    data: data,
                    showLine: true,
                    borderColor: '#00FF00'
                }
            ]
        }
    });
});