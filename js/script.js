var inputs=Array.from(document.querySelectorAll('.screen .card input'));
var theName=document.getElementById('name');
var mail=document.getElementById('mail');
var pass=document.getElementById('pass');
var para=document.querySelector('#signupScreen .para');
var signinLink=document.querySelector('#signupScreen p .signinLink');
var signupBtn=document.getElementById('signupBtn');
var signupScreen=document.getElementById('signupScreen');
var remail=document.getElementById('remail');
var repass=document.getElementById('repass');
var paraTwo=document.querySelector('#signinScreen .paraTwo');
var signupLink=document.querySelector('#signinScreen p .signupLink');
var loginBtn=document.querySelector('#signinScreen .loginBtn');
var signinScreen=document.getElementById('signinScreen');
var heading=document.getElementById('heading');
var logout=document.querySelector('#homeScreen .logout');
var homeScreen=document.getElementById('homeScreen');
var emails;
var emailslist;

if(localStorage.getItem('users')==null){
    emailslist=[];
}else{
    emailslist=JSON.parse(localStorage.getItem('users'));
}

function validationSignup(){
    var emailValidation=/[A-Za-z0-9](@gmail.com)$/;
    if(theName.value!="" && emailValidation.test(mail.value) && pass.value!="" ){
    return true;
    }else{
        return false;
}
}

function signinWork(){
    signupScreen.classList.replace('d-block','d-none');
    signinScreen.classList.replace('d-none','d-block');
}

function signupWork(){
    signupScreen.classList.replace('d-none','d-block');
    signinScreen.classList.replace('d-block','d-none');
}

function homeWork(thename){
signinScreen.classList.replace('d-block','d-none');
homeScreen.classList.replace('d-none','d-block');
heading.innerHTML=`welcome ${thename}`;
}

signupBtn.addEventListener('click',function(){
    create();
})

function noRepeat(){
    for(var i=0;i<emailslist.length;i++){
        if(emailslist[i].email==mail.value){
            return false
        }else{
            return true
        }
    }
}

function create(){
    emails={
        name:theName.value,
        email:mail.value,
        password:pass.value
    };
    if(validationSignup()==false){
        if(theName.value==""){
            para.innerHTML='The name is required';
        }else if(mail.value==""){
            para.innerHTML='The mail is required';
        }else if(pass.value==""){
            para.innerHTML='The password is required';
        }else{
            para.innerHTML=' The Email not valid';
        }
    }else if(noRepeat()==false){
        para.innerHTML='email already exists';
    }else{
    emailslist.push(emails);
    localStorage.setItem('users', JSON.stringify(emailslist));
    para.innerHTML='Success';
    para.style.color='green';
    signinWork();
    }
}

signinLink.addEventListener('click',function(){
    signinWork();
})

signupLink.addEventListener('click',function(){
    signupWork();
})

loginBtn.addEventListener('click',function(){
    for(var i=0;i<emailslist.length;i++){
        if(emailslist[i].email==remail.value&&emailslist[i].password!=repass.value){
                paraTwo.innerHTML='The Password is not correct'
            }else if(emailslist[i].email!=remail.value&&emailslist[i].password==repass.value){
                paraTwo.innerHTML='The Email is not correct'
            }else if(emailslist[i].email!=remail.value&&emailslist[i].password!=repass.value){
                paraTwo.innerHTML='Incorrect email and password'
        }else{
            homeWork(emailslist[i].name);
        }
    }
})

logout.addEventListener('click',function(){
    homeScreen.classList.replace('d-block','d-none');
    signinScreen.classList.replace('d-none','d-block');
})

function inputsStyle(place){
    place.style.color='black';
    place.style.backgroundColor='white';
}

for(var i=0;i<inputs.length;i++){
    inputs[i].addEventListener('keydown',function(e){
        inputsStyle(e.target);
    })
}