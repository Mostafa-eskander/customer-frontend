import { Form, Link, useActionData, useNavigation, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import classes from './AuthForm.module.css';

export const Button = styled.button`
    border: none;
    cursor: pointer;
    position: relative;
    display: inline-block;
    overflow: hidden;    
    background: var(--background-color);
    color: var(--white-color);

    &::after {
    position: absolute;
    content: '';
    top: -50%;
    right: -100%;
    height: 200%;
    width: 30px;
    background-color: #ffffff3d;
    transform: rotate(30deg);
    z-index: 100;
    transition: .5s ease-in-out;
}
    &:hover::after {
    right: 200%;
}
`

function AuthForm() {
    const [searchParams] = useSearchParams();
    const navigation = useNavigation();
    const mode = searchParams.get('mode') || 'login';;
    const isLogin = mode === 'login';

    const data = useActionData();
    const isSubmitting = navigation.state === 'submitting';

    return(
        <Form method="post" action={`?mode=${isLogin ? 'login' : 'register'}`} className={classes.form}>
            <h1>{isLogin ? 'تسجيل الدخول' : 'انشاء حساب جديد'}</h1>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            {data && data.message && <p>{data.message}</p>}
            <p>
                <label htmlFor="email">ايميل</label>
                <input type="email" name="email" id="email" placeholder="ادخل الايميل" required/>
            </p>
            <p>
                <label htmlFor="password">رقم السري</label>
                <input type="password" name="password" id="password" placeholder="ادخل الرقم السري" required/>
            </p>
            <div>
                <Button disabled={isSubmitting}>{isSubmitting ? 'ارسال...' : "حفظ"}</Button>
                <Link to={`?mode=${isLogin ? 'register' : 'login'}`}>
                    {isLogin ? 'انشاء حساب جديد' : 'تسجيل دخول'}
                </Link>
            </div>
        </Form>
    )
}

export default AuthForm;
