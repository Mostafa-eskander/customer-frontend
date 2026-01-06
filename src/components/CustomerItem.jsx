import { Link, useNavigate, useSubmit } from "react-router-dom";

import classes from './CustomerItem.module.css';
import { Button } from "./AuthForm";

function CustomerItem({customer}) {
    const submit = useSubmit();
    const navigate = useNavigate();

    function startDeleteHandler() {
        const proceed = window.confirm('هل انت مأكد ؟');

        if(proceed) {
            submit(null, {method: 'delete'});
        }
    }

    function backHandler() {
        navigate(-1)
    }

    const isData = customer.updatedAt;
    const data1 = (new Date(isData)).toLocaleDateString();
    const data = (new Date(isData)).toLocaleTimeString();
    return(
        <div className="container">
            <h2>الاسم : <span>{customer.name}</span></h2>
            <h4>الكود : <span>{customer._id}</span></h4>
            <h3>رقم الهاتف : <span>{customer.phone}</span></h3>
            <h3>ملاحظه  : <span>{customer.notes}</span></h3>
            <h5>تاريخ المعاملة : {data1 + ' ' + data}</h5>

            <menu className={classes.menu}>
                <Link to='Edit'>تعديل</Link>
                <Button onClick={startDeleteHandler}>حذف</Button>
                <Link to='transaction'>معاملات</Link>
                <Button onClick={backHandler}>الغاء</Button>
            </menu>
        </div>
    )
}

export default CustomerItem;

