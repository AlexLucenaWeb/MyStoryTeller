import '@babel/polyfill';
import { signup } from './signup';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// -----===== DOM ELEMENTS   =====-----
const signupForm = document.querySelector('.signup-container');
const loginForm = document.querySelector('.login-container');
const logOutBtn = document.querySelector('.nav__logoutBtn');
const userDetailsForm = document.querySelector('.form-acc-details');
const userPasswordForm = document.querySelector('.form-acc-password');

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