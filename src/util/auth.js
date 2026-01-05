export default function getAuthToken() {
    const token = localStorage.getItem('token');

    if(!token) {
        return null;
    }

    return token
}

export function loader() {
    const token = getAuthToken();
    return token;
}

export async  function deleteTransaction(id) {
    const token = getAuthToken();

    const res = await fetch(
        `https://customer-backend-lzss.onrender.com/api/transactions/${id}`,
        {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
        }
    );

    if (!res.ok) {
        throw new Error('فشل حذف المعاملة');
    }

    return res.json();
}