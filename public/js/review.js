import axios from 'axios';
import { showAlert } from './alert';

export const createReview = async (rating, review, bookId) => { 
    try{
        const res = await axios({
            method: 'POST',
            url: `/api/v1/books/${bookId}/reviews`, 
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