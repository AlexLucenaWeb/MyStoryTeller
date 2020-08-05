import axios from 'axios';
import { showAlert } from './alert';

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
                location.assign('/main');
            }, 2000);
            showAlert('success', 'Welcome to My Story Teller family');
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};