import {useLoaderData, useRouteLoaderData } from "react-router-dom";
import getAuthToken from "../util/auth";
import { useState } from "react";
import { Button } from "../components/AuthForm";
import classes from '../components/CustomerList.module.css'

function Transaction() {
    const [total,setTotal] = useState(0)
    const data = useRouteLoaderData('customer-detail');
    const customerData = data.customer;
    const transaction = useLoaderData();
    const Alltransaction = transaction.transactions || [];

    function calcTotal () {
        let sum = 0;

        for (let i = 0; i < Alltransaction.length; i++) {
            if (Alltransaction[i].type === "مصروف") {
                sum += +Alltransaction[i].amount;
            } else {
                sum -= +Alltransaction[i].amount;
            }
        }
        setTotal(sum);
    }

    return (
        <div className={`container ${classes.list}`}>
            <h1>اسم العميل : {customerData.name}</h1>
            <div>
                <h3>الرصيد : {total} <span></span></h3>
                <Button type="button" onClick={calcTotal}>احسب الرصيد</Button>
            </div>

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>اسم العميل</th>
                            <th>الفلوس</th>
                            <th>نوع العملية</th>
                            <th>وصف المعاملة</th>
                            <th>تاريخ المعاملة</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Alltransaction.map((x) => {
                            const isData = x.createdAt;
                            const data1 = (new Date(isData)).toLocaleDateString();
                            const data = (new Date(isData)).toLocaleTimeString()
                            return (
                                <tr key={x._id}>
                                    <td className={classes.id}>{x._id}</td>
                                    <td>{x.amount}</td>
                                    <td>{x.type}</td>
                                    <td>{x.description}</td>
                                    <td>
                                        {data}
                                        <br />
                                        {data1}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Transaction;

export async function loaderTransaction (id) {
    const token = getAuthToken();

    const response = await fetch('https://customer-backend-lzss.onrender.com/api/transactions/', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if(!response.ok) {
        console.log('one')
        throw new Response(JSON.stringify({ message: 'لم نتمكن من جلب المعاملات.' }),{status: 500});
    }else { 
        const resData = await response.json();
        const data = resData.filter((res) => {
            return (
                res.client._id === id
            )
        })
        return data;
    }
}

export async function loader({request,params}) {
    const id = params.customerId;

    return ({
        transactions: await loaderTransaction(id),
    });
}