// import axios from 'axios';
// import { showAlert } from './alert';

// export const search = async (book) => { 
//     console.log(book);
//     try{
//         const res = await axios({
//             method: 'GET',
//             url: 'http://127.0.0.1:3000/search', 
//             data: {
//                 book
//             }
//         });
//         console.log(res)
//         if (res.data.status === 'success'){
//             window.setTimeout(()=>{
//                 location.assign('/search');
//             }, 10);
//         }
//     } catch (err) {
//         showAlert('error', err.response.data.message);
//     }
// };