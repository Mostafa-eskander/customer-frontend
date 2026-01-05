import { useRouteLoaderData } from "react-router-dom"
import CustomerForm from "../components/CustomerForm"

export default function EditCustomer() {
    const data = useRouteLoaderData('customer-detail')

    return (
        <CustomerForm method="put" customer={data.customer}/>
    )
}