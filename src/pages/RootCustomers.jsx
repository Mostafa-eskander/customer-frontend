import { Outlet } from "react-router-dom";
import CustomersNavigation from "../components/CustomersNavigation";

export default function RootCustomer() {
    return(
        <>
            <CustomersNavigation />
            <Outlet />
        </>
    )
}