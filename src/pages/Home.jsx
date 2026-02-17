import { Link } from "react-router-dom";
import styled from 'styled-components';

import ContentPage from "../components/Content";
import getAuthToken from "../util/auth";

export const StyledLink = styled(Link)`
    position: relative;
    display: inline-block;
    overflow: hidden;    
    background: var(--background-color);
    color: var(--white-color);
    overflow: hidden;

    &::after {
    position: absolute;
    content: '';
    top: -50%;
    right: -200%;
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

function HomePage() {
    const token = getAuthToken();
    return(
        <ContentPage title="مرحبا بكم !">
            <h3>جروب لي أدارة حسابات العملاء</h3>
            {!token && <StyledLink to='/auth'>تسجيل دخول / انشاء حساب</StyledLink>}
        </ContentPage>
    )
}

export default HomePage;
