import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import getAuthToken from "../util/auth";
import classes from '../components/TransactionForm.module.css';
import { Button } from "../components/AuthForm";

function EditTransaction() {
    const { transactionId } = useParams();
    const navigate = useNavigate();

    const [transaction, setTransaction] = useState(null);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [type, setType] = useState("مصروف");
    const [description, setDescription] = useState("");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const token = getAuthToken();
        fetch(`https://customer-backend-lzss.onrender.com/api/transactions/${transactionId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setTransaction(data);
                setPrice(data.price);
                setQuantity(data.quantity);
                setType(data.type);
                setDescription(data.description);
                setTotal(data.total);
            })
            .catch(err => console.error(err));
    }, [transactionId]);
    useEffect(() => {
        setTotal(price * quantity); // تحديث كل مرة يتغير السعر أو العدد
    }, [price, quantity]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const token = getAuthToken();

        const response = await fetch(`https://customer-backend-lzss.onrender.com/api/transactions/${transactionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ price , quantity, type, description }),
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
                    <label>مبلغ الواحدة</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>العدد</label>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                </div>
                <div>
                    <label>الإجمالي:</label>
                    <input type="number" value={total} disabled />
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
                    <button type="button" onClick={() => navigate(-1)}>الغاء</button>
                </div>
            </form>
        </div>
    );
}

export default EditTransaction;