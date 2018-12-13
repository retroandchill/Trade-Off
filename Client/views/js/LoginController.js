function displaySignup() {
    $("#register").modal('show');
}

// Send the login request to the server containing the form data
function processLogin() {
    let postData = $("#loginForm").serializeArray();


    let loginData = {'Email': postData[0].value, 'Password': postData[1].value};

    $.ajax({
        type: 'POST',
        data: loginData,
        url: 'http://localhost:3000/loginhandler',

        error: (xhr, status, error) => {
            console.log(error);
        }
    });
}

// Send the signup request to the server containing the form data.
function processSignup() {

    // Conrad got pissed off and hardcoded the array positions
    let postData = $("#registerForm").serializeArray();
    let loginData = {'username': postData[0].value, 'email': postData[1].value, 'password': postData[3].value};

    console.log(loginData);

    $.ajax({
        type: 'POST',
        data: loginData,
        url: 'http://localhost:3000/registrationhandler',

        // TODO: Create the loading wheel here

        error: (xhr, status, error) => {
            console.log(error);
        },

        success: function(response, status, xhr) {
            // TODO: Remove the loading wheel
            //TODO: Add content to login page that the account has been created correctly
            console.log(response);
            $("#register").modal('hide');
        }
    });
}