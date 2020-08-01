import axios from 'axios';
import { showAlert } from './alert';

export const createReview = async (rating, review, bookId) => { 
    try{
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:3000/api/v1/books/${bookId}/reviews`, 
            data: {
                rating,
                review
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Review saved successfully');
            // location.reload()
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};