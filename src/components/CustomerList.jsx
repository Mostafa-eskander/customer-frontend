import { Link, useNavigate, useSubmit } from "react-router-dom";

import classes from './CustomerList.module.css';
import { Button } from "./AuthForm";
import getAuthToken from '../util/auth'

function CustomerList({customers = []}) {
    const navigate = useNavigate();
    async function deleteAllHandler() {
        const proceed = window.confirm('هل أنت متأكد من حذف جميع العملاء وجميع المعاملات؟');
        if (!proceed) return;

        try {
        const token = getAuthToken();

        // نعمل طلب DELETE للباك إند
        const response = await fetch('https://customer-backend-lzss.onrender.com/api/clients/all', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert('حدث خطأ: ' + errorData.message);
            return;
        }

        alert('تم حذف جميع العملاء وجميع المعاملات بنجاح!');

        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء الحذف!');
        }

        navigate("/");
    }
    return(
        <div className={`container ${classes.list}`}>
            <h1>جميع العملاء</h1>
            <Button className={classes.delete} onClick={deleteAllHandler}>حذف جميع العملاء والمعاملات</Button>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>رقم التعريفي للعميل</th>
                            <th>اسم العميل</th>
                            <th>رقم الهاتف</th>
                            <th>ملاحظه علي العميل</th>
                            <th>تاريخ الدخول</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => {
                            const isData = customer.updatedAt;
                            const data1 = (new Date(isData)).toLocaleDateString();
                            const data = (new Date(isData)).toLocaleTimeString()
                            return(
                                <tr key={customer._id}>
                                    <td className={classes.id}>{customer._id}</td>
                                    <td>
                                        <Link to={`/customers/${customer._id}`} className={classes.name}>{customer.name}</Link>
                                    </td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.notes}</td>
                                    <td>
                                        {data}
                                        <br />
                                        {data1}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )  
} 

export default CustomerList;