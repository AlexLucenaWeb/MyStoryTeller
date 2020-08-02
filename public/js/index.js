import '@babel/polyfill';
import { signup } from './signup';
import { login, logout } from './login';
import { updateSettings, deleteMeAcc, addFavorite } from './updateSettings';
import { createReview } from './review';

// -----===== DOM ELEMENTS   =====-----
// --  fomrs  --
const signupForm = document.querySelector('#signup__form');
const loginForm = document.querySelector('#login__form');
const logOutBtn = document.querySelector('#logout__btn');
const userDetailsForm = document.querySelector('.form-acc-details');
const userPasswordForm = document.querySelector('.form-acc-password');
const deleteAccBtn = document.querySelector('#deleteAcc');
const favoriteBtn = document.querySelector('.book__addFavorite');
const reviewFrom = document.querySelector('#review_form');

//  --  Header  --
const header = document.querySelector('.header');

// -----===== DELEGATES =====-----

// -- singup  --

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('confirm-password')
      .value;
    signup(name, email, password, passwordConfirmation);
  });

// -- login--

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
  // different way to log:
  $('#indexButton').click( (e)=> {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

// -- logout  --

if (logOutBtn) logOutBtn.addEventListener('click', logout);

// -- Update user profile  --

if (userDetailsForm)
  userDetailsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

// -- Update user password  --

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('current-password').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('confirm-password')
      .value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirmation },
      'password'
    );

    document.getElementById('current-password').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
  });

//  -- delete account  --
if (deleteAccBtn)
  deleteAccBtn.addEventListener('click', () => {
    alert('Do you wanna delete your account?');
    deleteMeAcc();
  });

// -- Add to favorites  --
if (favoriteBtn)
  favoriteBtn.addEventListener('click', () => {
    // getting the slug of the book and passing to the funciton:
    const bookSlug = document.getElementById('slug').innerHTML;
    addFavorite(bookSlug);
  });

// -- Create a review  --
if (reviewFrom)
  reviewFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const review = $('#review').val();
    const rating = $('input:radio[name=rating]:checked').val();
    const bookId = $('#bookId').html();

    createReview(rating, review, bookId);
});


//  -----=====  ANIMATIONS AND VISUAL EFFECTS  =====-----

// -- Nav  --
if(header)
  $(window).scroll(()=> {
    if ($(header).offset().top > 56) {
        $(header).addClass('header-scroll');
        $('.nav__btn').css({"background-color": "white", "color": "#ff486f"});
        $('#logo').hide();
        $('#favi').show();
    } else {
        $(header).removeClass('header-scroll');
        $('.nav__btn').css({"background-color": "#ff486f", "color": "white"});
        $('#logo').show();
        $('#favi').hide();
    }
  });

//  --  Index page  --
$('.index').mousemove(function (e) {
  let moveX1 = (e.pageX * -1) / 60;
  let moveY1 = (e.pageY * -1) / 60;
  let moveX2 = (e.pageX * -1) / 75;
  let moveY2 = (e.pageY * -1) / 75;
  let moveX3 = (e.pageX * -1) / 90;
  let moveY3 = (e.pageY * -1) / 90;
  let moveX4 = (e.pageX * -1) / 100;
  let moveY4 = (e.pageY * -1) / 100;

  $('#tree-1').css('background-position', moveX1 + 'px ' + moveY1 + 'px ');
  $('#tree-2').css('background-position', moveX2 + 'px ' + moveY2 + 'px ');
  $('#tree-3').css('background-position', moveX3 + 'px ' + moveY3 + 'px ');
  $('#tree-4, #sun-1, #sun-2').css(
    'background-position',
    moveX4 + 'px ' + moveY4 + 'px '
  );
});

$(".index__logo").fadeIn(1000);
$("#indexEmail").delay(700).fadeIn(1000);
$("#indexPass").delay(1300).fadeIn(1000);
$("#indexButton").delay(1600).fadeIn(1000);
$("#indexLinks").delay(1900).fadeIn(1000);

// -- Read a Book page  --
// Show and hide burger in read book
var timedelay = 1;
var _delay = setInterval(delayCheck, 500);

$('html').on('mousemove', showBurger);

function delayCheck() {
  if (timedelay == 3) {
    $('#book__burger').fadeOut('slow');
    timedelay = 1;
  }
  timedelay = timedelay + 1;
}

function showBurger() {
  $('#book__burger').fadeIn('fast');
  timedelay = 1;
  clearInterval(_delay);
  _delay = setInterval(delayCheck, 500);
}

// Texts and links
$('#pageOne').click( ()=> {
  $('#textOne').fadeIn('slow');
  $('#blank').fadeIn('fast').css('display', 'inline-block');
  $('#nextOne').fadeIn('fast').css('display', 'inline-block');
});
$('#pageTwo').click(()=> {
  $('#textTwo').fadeIn('slow');
  $('#nextTwo').fadeIn('fast').css('display', 'inline-block');
  $('#prevTwo').fadeIn('fast').css('display', 'inline-block');
});
$('#pageThree').click(()=> {
  $('#textThree').fadeIn('slow');
  $('#nextThree').fadeIn('fast').css('display', 'inline-block');
  $('#prevThree').fadeIn('fast').css('display', 'inline-block');
});
$('#pageFour').click(()=>{
  $('#textFour').fadeIn('slow');
  $('#nextFour').fadeIn('fast').css('display', 'inline-block');
  $('#prevFour').fadeIn('fast').css('display', 'inline-block');
});
$('#nextFour').click(()=> {
  $('.pageFive__title').fadeIn(2000);
});
// $('#pageFive').click(function () {
//   // $('#prevFive').fadeIn('fast').css('display', 'inline-block');
// });
