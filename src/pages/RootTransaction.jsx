import { Outlet } from "react-router-dom";
import CustomersNavigation from "../components/CustomersNavigation";

function RootTransactions() {
    return(
        <>
            <CustomersNavigation />
            <Outlet />
        </>
    )
}
export default RootTransactions;