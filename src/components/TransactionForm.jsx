import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";

import classes from './TransactionForm.module.css';
import { Button } from "./AuthForm";
import getAuthToken from "../util/auth";

function TransactionForm({method ,clients = []}) {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const data = useActionData();
    
    function cancelHandler() {
        navigate('..');
    }
    return(
        <Form method={method} className={classes.form}>
            <h2>اضافة معاملة</h2>
            {data && data.errors && (
                <ul>
                {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            )}
            <p>
                <label htmlFor="client">ادخل id العميل</label>
                <select name="client" id="client">
                    {clients.map((client) => (
                        <option key={client._id} value={client._id}>
                            {client.name}
                        </option>
                    ))}
                </select>
            </p>
            <p>
                <label htmlFor="price">ادخل مبلخ الواحدة</label>
                <input type="number" name="price" id="price" required placeholder="ادخل مبلخ الواحدة" />
            </p>
            <p>
                <label htmlFor="quantity">ادخل العدد</label>
                <input type="number" name="quantity" id="quantity" required placeholder="ادخل العدد" />
            </p>
            <p>
                <label htmlFor="type">اختر نوع العملية</label>
                <select name="type" id="type" required>
                    <option value='مصروف'>دفعة</option>
                    <option value='دخل'>بضاعة</option>
                </select>
            </p>
            <p>
                <label htmlFor="description">ادخل الوصف</label>
                <textarea id="description" name="description" required placeholder="ادخل الوصف"></textarea>                
            </p>
            <div className={classes.action}>
                <button type="button" onClick={cancelHandler}>
                    الغاء
                </button>
                <Button disabled={isSubmitting}>
                    {isSubmitting ? 'جاري الحفظ...' : "حفظ"}
                </Button>
            </div>
        </Form>
    )
}

export default TransactionForm;

export async function action({request,params}) {
    const token = getAuthToken();
    const method = request.method
    const data = await request.formData();

    const customerData = {
        client: data.get('client'),
        price: data.get('price'),
        quantity: data.get('quantity'),
        type: data.get('type'),
        description: data.get('description')
    } 

    let url = 'https://customer-backend-lzss.onrender.com/api/transactions/';

    if(method === 'PUT') {
        const transactionId = params.transactionId;
        url = 'https://customer-backend-lzss.onrender.com/api/transactions/' + transactionId;
    }

    const response = await fetch(url , {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(customerData),
    })

    if (response.status === 422) {
        return response;
    }
    
    if (!response.ok) {
        return new Response(JSON.stringify({ message: "لم نتمكن من حفظ البيانات" }), { status: 500 });
    }

    alert(`${method === "PUT" ? 'تم التعديل علي المعاملة' : 'تم انشاء معاملة جديد'}`)

    return redirect('/transactions');
};


export async function loader() {
    const token = getAuthToken();
    const response = await fetch('https://customer-backend-lzss.onrender.com/api/clients/', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();

    return data;
}