import axios from 'axios';
import { showAlert } from './alert';


// -- Update Password and data -- 
// type = 'password' or 'data'
export const updateSettings = async (data, type) => {
    try{
        const url = type === 'password' 
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe'

        const res = await axios({
            method: 'patch',
            url, 
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', `Your ${type} is updated`);
            window.setTimeout(()=>{
                location.reload();
            }, 1000);
        }

    }catch(err){
        showAlert('error', err.response.data.message);
    }
}

//  -- Delete (active: false) account  --
export const deleteMeAcc = async () =>{
    try{
        const res = await axios({
            method: 'DELETE',
            url: '/api/v1/users/deleteMe', 
        });

        location.assign('/');
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

// -- Add book to favorites  -- 
export const addFavorite = async (book) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/books/${book}/addFavorites`
        });
        if (res.data.status === 'success') {
            showAlert('success', `The book has been added to your list.`);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

// -- Reset password  --
export const forgotPass = async (email) => { 
    try{
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/forgotPassword', 
            data: {
                email
            }
        });

        if (res.data.status === 'success'){
            showAlert('success','If there is a user with this email, a reset password link has been sent.');
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};