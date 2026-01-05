import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom"

import getAuthToken from "../util/auth";
import classes from './CustomerForm.module.css';
import { Button } from "./AuthForm";

export default function CustomerForm({method,customer}) {
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    function cancleHandler() {
        navigate('..')
    }

    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && (
                <ul>
                {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            )}
            <p>
                <label htmlFor="name">الاسم</label>
                <input type="text" name="name" id="name" placeholder="ادخل الاسم" required defaultValue={customer ? customer.name : ''}/>
            </p>
            <p>
                <label htmlFor="phone">رقم الهاتف</label>
                <input type="text" name="phone" id="phone" placeholder="ادخل رقم الهاتف" required defaultValue={customer ? customer.phone : ''}/>
            </p>
            <p>
                <label htmlFor="notes">ملاحظه علي العميل</label>
                <input type="text" name="notes" id="notes" placeholder="ملاحظة علي العميل" required defaultValue={customer ? customer.notes : ''}/>
            </p>
            <div className={classes.action}>
                <button type="button" onClick={cancleHandler}>الغاء</button>
                <Button disabled={isSubmitting}>{isSubmitting ? "جاري الحفظ..." : "حفظ"}</Button>            
            </div>
        </Form>
    )
}

export async function action({request, params}) {
    const method = request.method;
    const data = await request.formData();

    console.log(params)
    const eventData = {
        name: data.get('name'),
        phone: data.get('phone'),
        notes: data.get('notes'),
    }

    let url = 'https://customer-backend-lzss.onrender.com/api/clients';

    if(method === 'PUT') {
        const customerId = params.customerId;
        url = 'https://customer-backend-lzss.onrender.com/api/clients/' + customerId; 
    }
    const token = getAuthToken();
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(eventData)
    })

    if(response.status === 442) {
        return response;
    }

    if(!response.ok) {
        return new Response(JSON.stringify({ message: 'لم نتمكن من إنقاذ العميل.' }),{status: 500})
    }

    return redirect('/customers')
}