import { Await, useLoaderData } from "react-router-dom";
import getAuthToken from "../util/auth";
import { Suspense } from "react";
import CustomerList from "../components/CustomerList";

function CustomersPage() {
    const { customers } = useLoaderData();

    return(
        <Suspense fallback={<p style={{textAlign: 'center',color: "#fff"}}>يتم التحميل...</p>}>
            <Await resolve={customers}>
                {(loaderCustomers) => <CustomerList customers={loaderCustomers} />}
            </Await>
        </Suspense>
    )
}

export default CustomersPage;

export async function loaderCustomers() {
    const token = getAuthToken();

    const response = await fetch('https://customer-backend-lzss.onrender.com/api/clients', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    

    if(!response.ok) {
        throw json(JSON.stringify({ message: 'لم نتمكن من جلب العملاء.' }),{status: 500});
    }else { 
        const resData = await response.json();
        return resData
    }
};

export async function loader() {
    return {
        customers: loaderCustomers(),
    };
}