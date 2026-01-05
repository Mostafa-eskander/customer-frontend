import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import getAuthToken from "../util/auth";
import { Suspense } from "react";
import CustomerItem from "../components/CustomerItem";
import CustomerList from "../components/CustomerList";

export default function CustomerDetail() {
    const {customer,customers} = useRouteLoaderData('customer-detail');
    return(
        <>
            <Suspense fallback={<p style={{textAlign: 'center', color: 'white'}}>تحميل ...</p>}>
                <Await resolve={customer}>
                    {(loaderCustomer) => <CustomerItem customer={loaderCustomer}/>}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center', color: 'white'}}>تحميل ...</p>}>
                <Await resolve={customers}>
                    {(loaderCustomers) => <CustomerList customers={loaderCustomers}/>}
                </Await>
            </Suspense>
        </>
    )

}

export async function loaderCustomer(id) {
    const token = getAuthToken();

    const response = await fetch('https://customer-backend-lzss.onrender.com/api/clients/' + id,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok) {
        throw new Response(JSON.stringify({ message: 'تعذر جلب تفاصيل الحدث المحدد.' }),{status: 500});
    }else {
        const resData = await response.json();
        return resData
    }
}

async function loaderCustomers() {
    const token = getAuthToken();

    const response = await fetch('https://customer-backend-lzss.onrender.com/api/clients', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if(!response.ok) {
        throw new Response(JSON.stringify({ message: 'لم نتمكن من جلب العملاء.' }),{status: 500});
    }else {
        const resData = await response.json();
        return resData
    }
}

export async function loader({request,params}) {
    const id = params.customerId;

    return ({
        customer: await loaderCustomer(id),
        customers: loaderCustomers(),
    });
}

export async function action({params,request}) {
    const customerId = params.customerId;

    const token = getAuthToken();
    const response = await fetch('https://customer-backend-lzss.onrender.com/api/clients/' + customerId,{
        method: request.method,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "تعذر حذف العميل."}),{status: 500});
    }

    return redirect('/customers');
}