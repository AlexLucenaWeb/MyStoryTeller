import axios from 'axios';
import { showAlert } from './alert';


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
            url: 'http://127.0.0.1:3000/api/v1/books/`${book.id}`/addFavorites'
        });
        if (res.data.status === 'success') {
            console.log("siiiii funciona")
            showAlert('success', `The book is added to your list`);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
} 