import { useLoaderData } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";

function NewTransaction() {
    const clients = useLoaderData();
    
    return (
        <TransactionForm method="post" clients={clients} />
    )
}

export default NewTransaction;