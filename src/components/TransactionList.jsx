import classes from './CustomerList.module.css';
import { Button } from './AuthForm';
import getAuthToken, { deleteTransaction } from '../util/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TransactionList({transaction = []}) {
    const [transactions,setTransactions] = useState(transaction);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = getAuthToken();

    async function deleteHandler(id) {
        if(!window.confirm("هل انت تريذ الحذف ؟")) return;

        try{
            setLoading(true);
            await deleteTransaction(id)
            setTransactions((prev) => prev.filter((t) => t._id !== id))
        }catch(err) {
            alert(err.message);
        }finally{
            setLoading(false);
        }
    }

    async function deleteAllHandler() {
            const proceed = window.confirm('هل أنت متأكد من حذف وجميع المعاملات؟');
            if (!proceed) return;
    
            try {
    
            // نعمل طلب DELETE للباك إند
            const response = await fetch('https://customer-backend-lzss.onrender.com/api/transactions/all', {
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
        navigate('/')
    }


    return(
        <div className={`conatiner ${classes.list}`}>
            <h1>جميع المعاملات</h1>
            <Button className={classes.delete} onClick={deleteAllHandler}>حذف جميع المعاملات</Button>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>رقم التعريفي للعمليه</th>
                            <th>اسم العميل</th>
                            <th>نوع العملية</th>
                            <th>سعر الواحدة</th>
                            <th>العدد</th>
                            <th>الاجمالي</th>
                            <th>الوصف</th>
                            <th>التاريخ</th>
                            <th>حذف \ تعديل</th>
                        </tr>
                    </thead>
                    <tbody>
                            {transactions.map((tran) => {
                                const isData = tran.updatedAt;
                                const data1 = (new Date(isData)).toLocaleDateString();
                                const data = (new Date(isData)).toLocaleTimeString()
                                return(
                                    <tr key={tran._id}>
                                        <td className={classes.transacationId}>{tran._id}</td>
                                        <td>{tran.client?.name || 'غير محدد'}</td>
                                        <td>{tran.type === "مصروف" ? 'دفعة' : 'بضاعة'}</td>
                                        <td>{tran.price}</td>
                                        <td>{tran.quantity}</td>
                                        <td>{tran.total}</td>
                                        <td>{tran.description}</td>
                                        <td>
                                            {data}
                                            <br />
                                            {data1}
                                        </td>
                                        <td>
                                            <div className={classes.action}>
                                                <Button onClick={() => deleteHandler(tran._id)}>{loading ? "جاري الحذف ..." : "حذف"}</Button>
                                                <Button onClick={() => navigate(`/transactions/${tran._id}/edit`)}>تعديل</Button>
                                            </div>
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