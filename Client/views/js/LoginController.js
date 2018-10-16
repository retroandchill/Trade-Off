var $ = require('jQuery');

function displaySignup() {
    $("#register").modal('show');
}

function processLogin() {
    let postData = $("#loginForm").serializeArray();

    console.log(postData);

    let loginData = {'Email': postData.email, 'Password': postData.password};

    $.ajax({
        type: 'POST',
        data: loginData,
        url: 'http://localhost:3000/loginhandler',

        error: (xhr, status, error) => {
            console.log(error);
        }
    });
}

function processSignup() {
    let postData = $("#registerForm").serializeArray();

    console.log(postData);


    let loginData = {'Username': postData.username, 'Email': postData.email, 'Password': postData.password};


    $.ajax({
        type: 'POST',
        data: loginData,
        url: 'http://localhost:3000/registrationhandler',

        error: (xhr, status, error) => {
            console.log(error);
        }
    });
}

/*
$('#registerForm')
    .form({
        fields: {
            email: {
                identifier  : 'email',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your e-mail'
                    },
                    {
                        type   : 'email',
                        prompt : 'Please enter a valid e-mail'
                    }
                ]
            },
            password: {
                identifier  : 'password',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your password'
                    },
                    {
                        type   : 'length[6]',
                        prompt : 'Your password must be at least 6 characters'
                    }
                ]
            }
        }
    })
;*/