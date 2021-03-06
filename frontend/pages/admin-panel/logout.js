import React, { useEffect, useState } from 'react'
import {adminLogout} from "../../lib/auth/adminAuth";
import useSWR from "swr";
import {LOGOUT_API, SWR_POST_FETCH} from "../../constants";
import cookie from "js-cookie";
import Router from "next/router";
import {ADMIN_LOGIN_URL} from "../../constants/URLs";

const AdminLogout = (props) => {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    useEffect(() => setIsComponentMounted(true), []);

    useSWR(
        isComponentMounted? LOGOUT_API : null,
        SWR_POST_FETCH,
        {
            errorRetryCount: 1,
            onSuccess: () => {
                cookie.remove('token');
                // to support logging out from all windows
                window.localStorage.setItem('logout', Date.now());
                Router.push(ADMIN_LOGIN_URL)
            },
            onError: (error) => {
                cookie.remove('token');
                // to support logging out from all windows
                window.localStorage.setItem('logout', Date.now());
                Router.push(ADMIN_LOGIN_URL)
            }
        });

    return (
        <div> </div>
    );
};

export default AdminLogout