import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from '../components/MainNavigation.module.css';
import { Button } from "./AuthForm";

function MainNavigation() {
    const token = useRouteLoaderData('root');
    return(
        <header className={classes.header}>
            <div className={`container ` + classes.container}>
                <h1>الشاذلي جروب</h1>
                <ul>
                    <li>
                        <NavLink 
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            >
                                الصفحه الرسمية
                        </NavLink>
                    </li>
                    {token && (<li>
                        <NavLink 
                            to="/customers"
                            className={({isActive}) => 
                                isActive ? classes.active : undefined
                            }
                            >
                                العملاء
                        </NavLink>  
                    </li>)}
                    {!token && (<li>
                        <NavLink 
                            to="/auth"
                            className={({isActive}) => 
                                isActive ? classes.active : undefined
                            }
                            >
                                تسجيل دخول / انشاء حساب
                        </NavLink>
                    </li>)
                    }
                    {token && 
                    (
                        <li>
                            <Form action="/logout" method="post">
                                <Button>تسجيل الخروج</Button>
                            </Form>
                        </li>
                    )
                    }
                </ul>
            </div>
        </header>
    )
}

export default MainNavigation;