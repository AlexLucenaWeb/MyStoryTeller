import '@babel/polyfill';
import { signup } from './signup';
import { login, logout } from './login';
import { updateSettings, deleteMeAcc } from './updateSettings';

// -----===== DOM ELEMENTS   =====-----
const signupForm = document.querySelector('.signup-container');
const loginForm = document.querySelector('.login-container');
const logOutBtn = document.querySelector('.nav__logoutBtn');
const userDetailsForm = document.querySelector('.form-acc-details');
const userPasswordForm = document.querySelector('.form-acc-password');
const deleteAccBtn = document.querySelector('#deleteAcc');
const creteReviewBtn = document.querySelector('#createReview');

// -----===== DELEGATES =====-----

// -- singup  --

if (signupForm)
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;       
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('confirm-password').value;
        signup(name, email, password, passwordConfirmation);          
    });

// -- login--

if (loginForm)
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });

// -- logout  --

if(logOutBtn) logOutBtn.addEventListener('click', logout);

// -- Update user profile  --

if (userDetailsForm)
    userDetailsForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        updateSettings({ name, email }, 'data');
    });


// -- Update user password  --

if (userPasswordForm)
    userPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        const passwordCurrent = document.getElementById('current-password').value;
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('confirm-password').value;
        await updateSettings({ passwordCurrent, password, passwordConfirmation}, 'password');

        document.getElementById('current-password').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';
    });

//  -- delete account  --
if(deleteAccBtn)
    deleteAccBtn.addEventListener('click', ()=>{
        alert('Do you wanna delete your account?');
        deleteMeAcc();
    });

// // -- Create a review  --
// if(creteReviewBtn)
//     creteReviewBtn

//  -----=====  ANIMATIONS AND VISUAL EFFECTS  =====--------------------------------

//  --  Index page  --
$('#tree-1').mousemove(function(e){
    var moveX = (e.pageX * -1 /60);
    var moveY = (e.pageY * -1 /60);
    $(this).css('background-position', moveX + 'px ' + moveY + 'px ');
    });
    $('#tree-2').mousemove(function(e){
    var moveX = (e.pageX * -1 /75);
    var moveY = (e.pageY * -1 /75);
    $(this).css('background-position', moveX + 'px ' + moveY + 'px ');
    });
    $('#tree-3').mousemove(function(e){
    var moveX = (e.pageX * -1 /90);
    var moveY = (e.pageY * -1 /90);
    $(this).css('background-position', moveX + 'px ' + moveY + 'px ');
    });
    $('#tree-4').mousemove(function(e){
    var moveX = (e.pageX * -1 /100);
    var moveY = (e.pageY * -1 /100);
    $(this).css('background-position', moveX + 'px ' + moveY + 'px ');
    });
    $('#sun-1').mousemove(function(e){
    var moveX = (e.pageX * -1 /100);
    var moveY = (e.pageY * -1 /100);
    $(this).css('background-position', moveX + 'px ' + moveY + 'px ');
    });
    $('#sun-2').mousemove(function(e){
    var moveX = (e.pageX * -1 /100);
    var moveY = (e.pageY * -1 /100);
    $(this).css('background-position', moveX + 'px ' + moveY + 'px ');
    });
  
  