import '@babel/polyfill';
import { login, logout } from './login';

// -----===== DOM ELEMENTS   =====-----
const loginForm = document.querySelector('.login-container');
const logOutBtn = document.querySelector('.nav__logoutBtn');

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