import { Link } from "react-router-dom";

import classes from './CustomerList.module.css';

function CustomerList({customers = []}) {
    return(
        <div className={`container ${classes.list}`}>
            <h1>جميع العملاء</h1>
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
                            const isData = customer.createdAt;
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