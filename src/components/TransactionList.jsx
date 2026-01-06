import classes from './CustomerList.module.css';
import { Button } from './AuthForm';
import { deleteTransaction } from '../util/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TransactionList({transaction = []}) {
    const [transactions,setTransactions] = useState(transaction);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    return(
        <div className={`conatiner ${classes.list}`}>
            <h1>جميع المعاملات</h1>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>رقم التعريفي للعمليه</th>
                            <th>اسم العميل</th>
                            <th>نوع العملية</th>
                            <th>الفلوس</th>
                            <th>الوصف</th>
                            <th>التاريخ</th>
                            <th>حذف</th>
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
                                        <td>{tran.type}</td>
                                        <td>{tran.amount}</td>
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