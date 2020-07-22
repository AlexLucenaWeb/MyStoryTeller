import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// -----===== DOM ELEMENTS   =====-----
const loginForm = document.querySelector('.login-container');
const logOutBtn = document.querySelector('.nav__logoutBtn');
const userDetailsForm = document.querySelector('.form-acc-details');
const userPasswordForm = document.querySelector('.form-acc-password');

// -----===== DELEGATES =====-----


if (loginForm){
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}

if(logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDetailsForm)
    userDetailsForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        updateSettings({ name, email }, 'data');
    });

if (userPasswordForm)
    userPasswordForm.addEventListener('submit', e => {
        e.preventDefault();
        const passwordCurrent = document.getElementById('current-password').value;
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('confirm-password').value;
        updateSettings({ passwordCurrent, password, passwordConfirmation}, 'password');
    });