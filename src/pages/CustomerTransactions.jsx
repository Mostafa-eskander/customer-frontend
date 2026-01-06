import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import TransactionList from "../components/TransactionList";
import getAuthToken from "../util/auth";

function CustomerTransaction() {
    const { transaction } = useLoaderData();

    return (
        <section>
            <div className="container">
                <Suspense fallback={<p style={{textAlign:"center",color:"white"}}>جاري التحميل ...</p>}>
                    <Await resolve={transaction}>
                        {(loaderTransaction) => <TransactionList transaction={loaderTransaction}/>}
                    </Await>
                </Suspense>
            </div>
        </section>
    )
}

export default CustomerTransaction;

export async function loaderTransaction() {
    const token = getAuthToken();
    
    const response = await fetch('https://customer-backend-lzss.onrender.com/api/transactions/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    
    if(!response.ok) {
        throw json(JSON.stringify({ message: 'لم نتمكن من جلب المعاملات.' }),{status: 500});
    }else { 
        const resData = await response.json();
        return resData;
    }
}

export async function loader() {
    return {
        transaction: loaderTransaction(),
    }
}