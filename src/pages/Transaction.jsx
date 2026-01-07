import {useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import getAuthToken from "../util/auth";
import { useState } from "react";
import { Button } from "../components/AuthForm";
import classes from '../components/CustomerList.module.css'

function Transaction() {
    const [total,setTotal] = useState(0)
    const data = useRouteLoaderData('customer-detail');
    const customerData = data.customer;
    const transaction = useLoaderData();
    const navigate = useNavigate();
    const Alltransaction = transaction.transactions || [];

    function calcTotal () {
        let sum = 0;

        for (let i = 0; i < Alltransaction.length; i++) {
            if (Alltransaction[i].type === "مصروف") {
                sum -= +Alltransaction[i].total;
            } else {
                sum += +Alltransaction[i].total;
            }
        }
        setTotal(sum);
    }

    function backHandler() {
        navigate(-1);
    }

    return (
        <div className={`container ${classes.list}`}>
            <h1>اسم العميل : {customerData.name}</h1>
            <div>
                <h3>الرصيد : {total} <span></span></h3>
                <Button type="button" onClick={calcTotal}>احسب الرصيد</Button>
                <Button type="button" onClick={backHandler}>الرجوع للخلف</Button>
            </div>

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>اسم العميل</th>
                            <th>سعر الواحدة</th>
                            <th>العدد</th>
                            <th>الاجمالي</th>
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
                                    <td>{x.price}</td>
                                    <td>{x.quantity}</td>
                                    <td>{x.total}</td>
                                    <td>{x.type === "مصروف" ? 'دفعة' : 'بضاعة'}</td>
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

    const response = await fetch('https://customer-backend-lzss.onrender.com/api/transactions/client/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if(!response.ok) {
        throw json(JSON.stringify({ message: 'لم نتمكن من جلب المعاملات.' }),{status: 500});
    }else { 
        const resData = await response.json();
        return resData;
    }
}

export async function loader({request,params}) {
    const id = params.customerId;

    return ({
        transactions: await loaderTransaction(id),
    });
}