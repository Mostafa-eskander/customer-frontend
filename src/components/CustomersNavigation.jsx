import { NavLink } from "react-router-dom";

import classes from './CustomersNavigation.module.css';

function CustomersNavigation() {
    return(
        <>
            <header className={classes.header}>
                <nav>
                    <div className="container">
                        <ul>
                            <li>
                                <NavLink 
                                    to='/customers' 
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                    end
                                >
                                    جميع العملاء
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to='/customers/new' 
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    عميل جديد
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to='/transactions' 
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    جميع المعاملات
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to='/transactions/newTransaction' 
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    اضافة معاملة
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default CustomersNavigation;