const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfrim = document.getElementById("passwordConfrim");


function success(element)
{
    element.className = "form-control is-valid";
}

function error(element,message)
{
    element.className = "form-control is-invalid";
    const div = element.nextElementSibling;
    div.innerText = message;
    div.className = "invalid-feedback";
}

const hasError = (input) => input.className.includes("is-invalid");



const checkEmail = (input) => {

    // Pass the before tests ?
    if( !input.className.includes("is-invalid"))
    {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let result =  regex.test(input.value);

        if(!result)
        {
            error(input,input.id+" field is must be valid email format.");
        }
        else{
            success(input);
        }
    }
};


function checkRequired(inputs){

    inputs.map(input => {
        if(input.value == "" ){
            error(input, input.id+ " this field is required!");
        }
        else{
            success(input);
    
        }
    })    
}


function checkLength(input,min=0,max=10000)
{   
    if(!hasError(input))
    {
        let inputLength = input.value.length;

        if(inputLength < min)
        {
            error(input, `${input.id} is must be minimum ${min} length.`);
        }
        else if(inputLength > max)
        {
            error(input, `${input.id} is must be maximum ${max} length.`);
        }
        else{
            success(input);
        }
    }
    
}

function checkMatchPasswords(password,rePassword)
{
    if(!hasError(rePassword))
    {
        if(password.value !== rePassword.value )
        {
            error(rePassword,"Passwords must be matched!");
        }
        else{
            success(rePassword);
        }
    }
    
}

form.addEventListener("submit",(e) => {
    e.preventDefault();

    checkRequired([username,email,password,passwordConfrim]);
    checkEmail(email);
    checkLength(password);
    checkLength(passwordConfrim);
    checkMatchPasswords(password,passwordConfrim);

})