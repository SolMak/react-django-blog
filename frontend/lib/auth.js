import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'
import {CONFIRM_TOKEN_API, LOGIN_API, LOGOUT_API} from "../constants";
import {isEmpty} from "./utils";

const loginURL = '/users/login';
const defaultHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const login = ({ token }) => {
    cookie.set('token', token, { expires: 1 });
    Router.push('/users/dashboard')
};

export const auth = ctx => {
    const { token } = nextCookie(ctx);

    // If there's no token, it means the user is not logged in.
    if (!token) {
        if (typeof window === 'undefined') {
            ctx.res.writeHead(302, { Location: loginURL });
            ctx.res.end()
        } else {
            Router.push(loginURL)
        }
    }

    return token
};

export const logout = async () => {
    const headers = defaultHeader;
    const token = cookie.get('token');
    const csrf_token = cookie.get('csrf_token');
    if (csrf_token!== 'undefined') {
        headers['X-CSRFToken'] = csrf_token
    }
    const response = await fetch(LOGOUT_API, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({token: token}),
    });

    cookie.remove('token');
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now());
    Router.push(loginURL)
};

export const withAuthSync = WrappedComponent => {
    const Wrapper = props => {
        const syncLogout = event => {
            if (event.key === 'logout') {
                console.log('logged out from storage!');
                Router.push(loginURL)
            }
        };

        useEffect(() => {
            window.addEventListener('storage', syncLogout);

            return () => {
                window.removeEventListener('storage', syncLogout);
                window.localStorage.removeItem('logout')
            }
        }, []);

        return <WrappedComponent {...props} />
    };

    Wrapper.getInitialProps = async ctx => {
        const token = auth(ctx);

        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx));

        return { ...componentProps, token }
    };

    return Wrapper
};

export const loginFetch = async (data) => {
    const headers = defaultHeader;
    if (data['csrf_token'] !== 'undefined') {
        headers['X-CSRFToken'] = data['csrf_token']
    }

    try {
        const response = await fetch(LOGIN_API, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
        if (response.status === 200) {
            const responseData = await response.json();
            const token = responseData.key;
            await login({ token });
            return {token: token, response: response};
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }

    } catch (error) {
        return error;
    }
};

let includeConfirmedCookie = (cookie) => {
    if(typeof cookie === 'undefined'){
        return false;
    }
    if(cookie.includes("have confirmed")){
        return true;
    }
    return false;
};

export const confirmEmailFetch = async (confirmToken) => {
    let alreadyConfirmed = !isEmpty(cookie.get("confirm-email-successful"));
    let confirmURL = CONFIRM_TOKEN_API + confirmToken + "/";
    const headers = defaultHeader;
    const csrf_token = cookie.get('csrf_token');
    if (csrf_token!== 'undefined') {
        headers['X-CSRFToken'] = csrf_token
    }
    if(alreadyConfirmed){
        return true;
    }
    const response = await fetch(confirmURL, {headers: headers});

    if([302,200].includes(response.status) || includeConfirmedCookie(cookie.get("messages"))){
        cookie.set("confirm-email-successful", true);
        //Router.push('/users/login');
        return true;
    } else {
        Router.push('/users/confirm-email?badRequest=true');
    }
};