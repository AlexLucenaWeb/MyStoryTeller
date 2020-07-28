import axios from 'axios';

// -----===== DOM ELEMENTS   =====-----
const signupForm = document.querySelector('#signup__form');
const loginForm = document.querySelector('#login__form');
const logOutBtn = document.querySelector('#logout__btn');
const logOutBtnTwo = document.querySelector('#logout__btnTwo');
const userDetailsForm = document.querySelector('.form-acc-details');
const userPasswordForm = document.querySelector('.form-acc-password');
const deleteAccBtn = document.querySelector('#deleteAcc');
const favoriteBtn = document.querySelector('#addFavorites')


// -----===== GENERAL FUNCTIONS =====-----

// -- Alerts  --
export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};




// -- singup  --
export const signup = async (name, email, password, passwordConfirmation) => { 
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/signup', 
            data: {
                name,
                email,
                password,
                passwordConfirmation
            }
        });

        if (res.data.status === 'success'){
            window.setTimeout(()=>{
                location.assign('/allbooks');
            }, 10);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};
// END singup

// -- Login  --
export const login = async (email, password) => { 
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login', 
            data: {
                email,
                password
            }
        });

        if (res.data.status === 'success'){
            window.setTimeout(()=>{
                location.assign('/allbooks');
            }, 10);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout'
        });
        if ((res.data.status = 'success')) location.assign('/');
    } catch (err) {
        console.log(res.data.status);
        showAlert('error', 'An error occurred logout, try again');
    }
};
// END login 

// -- Update Settings --

// -- Update Password and data -- 
// type = 'password' or 'data'
export const updateSettings = async (data, type) => {
    try{
        const url = type === 'password' 
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe'

        const res = await axios({
            method: 'patch',
            url, 
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', `Your ${type} is updated`);
        }

    }catch(err){
        showAlert('error');
    }
}

//  -- delete (active: false) account  --
export const deleteMeAcc = async () =>{
    try{
        const res = await axios({
            method: 'DELETE',
            url: 'http://127.0.0.1:3000/api/v1/users/deleteMe', 
        });

        location.assign('/');
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const addFavourite = async () => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/books/:bookId/addFavorites'
        });
        if (res.data.status === 'success') {
            showAlert('success', `The book is added to your list`);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};
// END Update


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

if(logOutBtn || logoutBtnTwo) 
    logOutBtn.addEventListener('click', logout);
    logOutBtnTwo.addEventListener('click', logout);

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

// -- Add to favorites  --
favoriteBtn.addEventListener('click', () =>{
    console.log('funciona');
    favoriteBtn();
});


//  -----=====  ANIMATIONS AND VISUAL EFFECTS  =====-----

//  --  Index page  --
$('.index').mousemove(function(e){
    let moveX1 = (e.pageX * -1 /60);
    let moveY1 = (e.pageY * -1 /60);
    let moveX2 = (e.pageX * -1 /75);
    let moveY2 = (e.pageY * -1 /75);
    let moveX3 = (e.pageX * -1 /90);
    let moveY3 = (e.pageY * -1 /90);
    let moveX4 = (e.pageX * -1 /100);
    let moveY4 = (e.pageY * -1 /100);

    $('#tree-1').css('background-position', moveX1 + 'px ' + moveY1 + 'px ');
    $('#tree-2').css('background-position', moveX2 + 'px ' + moveY2 + 'px ');
    $('#tree-3').css('background-position', moveX3 + 'px ' + moveY3 + 'px ');
    $('#tree-4, #sun-1, #sun-2').css('background-position', moveX4 + 'px ' + moveY4 + 'px ');
});
