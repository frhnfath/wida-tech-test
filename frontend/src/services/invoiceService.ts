import axios from 'axios';

export const getAllInvoice = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/invoices/all');
        return response.data;
    } catch (error) {
        console.log('Error fetching data', error);
        return [];
    }
}