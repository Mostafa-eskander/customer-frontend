import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import getAuthToken from "../util/auth";
import classes from '../components/TransactionForm.module.css';
import { Button } from "../components/AuthForm";

function EditTransaction() {
    const { transactionId } = useParams();
    const navigate = useNavigate();

    const [transaction, setTransaction] = useState(null);
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("مصروف");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const token = getAuthToken();
        fetch(`https://customer-backend-lzss.onrender.com/api/transactions/${transactionId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setTransaction(data);
                setAmount(data.amount);
                setType(data.type);
                setDescription(data.description);
            })
            .catch(err => console.error(err));
    }, [transactionId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const token = getAuthToken();

        const response = await fetch(`https://customer-backend-lzss.onrender.com/api/transactions/${transactionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ amount, type, description }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("حدث خطأ: " + errorData.message);
            return;
        }

        alert("تم تعديل المعاملة بنجاح!");
        navigate(-1); // ارجع للصفحة السابقة
    };

    if (!transaction) return <p style={{textAlign: 'center'}}>جاري التحميل...</p>;

    return (
        <div className={classes.form}>
            <h2>تعديل المعاملة</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>المبلغ:</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div>
                    <label>النوع:</label>
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value="مصروف">مصروف</option>
                        <option value="دخل">دخل</option>
                    </select>
                </div>
                <div>
                    <label>الوصف:</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className={classes.action}>
                    <Button type="submit">حفظ التعديلات</Button>
                </div>
            </form>
        </div>
    );
}

export default EditTransaction;