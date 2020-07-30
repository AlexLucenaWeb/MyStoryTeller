import axios from 'axios';
import { showAlert } from './alert';

export const createReview = async (rating, review, bookId) => { 
    console.log(bookId);
    try{
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:3000/api/v1/books/${bookId}/reviews`, 
            data: {
                rating,
                review
            }
        });
        console.log('after funciton')

        if (res.data.status === 'success'){
            showAlert('Review created! Thank you for your opinion!');
        }
    } catch (err) {
        showAlert('error');
    }
};


// export const createReview = async (rating, review, bookId) => { 
//     console.log('llamamos la func')
//     console.log(bookId)
//     try{
//         const res = await axios({
//             method: 'POST',
//             url: `http://127.0.0.1:3000/api/v1/books/${bookId}/reviews`, 
//             data: {
//                 rating,
//                 review
//             }
//         });
//         console.log('Pasamos la func')

//         if (res.data.status === 'success'){
//             showAlert('Review created! Thank you for your opinion!');
//         }
//     } catch (err) {
//         showAlert('error');
//     }
// };