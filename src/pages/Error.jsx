import { useRouteError } from "react-router-dom";
import ContentPage from "../components/Content";

function ErrorPage() {
    const error = useRouteError();

    let title = 'حدث خطأ!';
    let message = 'حدث خطأ ما!'

    if (error.status) {
        try {
            // parse الرسالة من الـ Response
            message = JSON.parse(error.data)?.message || message;
        } catch {}
    }
    
    if(error.status === 500) {
        message = JSON.parse(error.data)?.message || message;
    }

    if(error.status === 404) {
        title = 'غير موجود!';
        message = 'لم يتم العثور على المورد أو الصفحة.'
    }
    return (
        <ContentPage title={title}>
            <p>{message}</p>
        </ContentPage>
    )
}

export default ErrorPage;
