import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {createStore, atom} from 'jotai';
import Cookies from 'js-cookie'
import { create } from 'zustand';

export const useAuthStore = create(() => ({
    user: null,
    token: null,
    isAuthenticated: 'Alan',
    role: null,
}))

export const authStore = createStore()
export const authAtom = atom({
    user: null,
    token: null,
    isAuthenticated: false,
    role: null,
})

// Helper function to get cookie value by name
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const apiQueryClient = new QueryClient()

const api = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-App-Secret': import.meta.env.VITE_APP_SECRET,
        'X-App-Version': import.meta.env.VITE_APP_VERSION,
        'X-App-Device': navigator?.userAgentData?.platform || navigator?.platform,
        'X-App-Platform': 'admin',
        'Accept': 'application/json',
    },
})

const errorHandler = (error) => {
    if (error.response) {
        console.log('Response Error', error.response.data);
        return error.response.data;
    } else if (error.request) {
        console.log('Request Error', error.request);
        return {
            error: true,
            status: false,
            data: null,
            ...error.request
        };

    } else {
        console.log('Error', error);
        return {
            error: true,
            status: false,
            message: error.message || 'Request configuration error',
            data: null
        };
    }
}

const mendify = {
    api,
    get: async ({url, params, options}, callback) => {
        try{
            const response = await api.get(url, { 
                params: params,
                withCredentials: true,
                ...options
             });
            callback.onSuccess(response.data);
            return response.data;
        }catch(error){
            const e = errorHandler(error);
            callback.onError(e);
            return e;
        }
    },
    post: async ({url, data, options}, callback) => {
        try{
            const response = await api.post(url, data, options);
            callback.onSuccess(response.data);
            return response.data;
        }catch(error){
            const e = errorHandler(error);
            callback.onError(e);
            return e;
        }
    },
    put: async ({url, data}, callback) => {
        try{
            const response = await api.put(url, data);
            callback.onSuccess(response.data);
            return response.data;
        }catch(error){
            const e = errorHandler(error);
            callback.onError(e);
            return e;
        }
    },
    delete: async ({url}, callback) => {
        try{
            const response = await api.delete(url);
            callback.onSuccess(response.data);
            return response.data;
        }catch(error){
            const e = errorHandler(error);
            callback.onError(e);
            return e;
        }
    },
    upload: {
        single: async ({data}, callback) => {
            try{
                const response = await api.post('/upload/single', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                callback.onSuccess(response.data);
                return response.data;
            }catch(error){
                const e = errorHandler(error);
                callback.onError(e);
                return e;
            }
        },
        large: async (data, callback) => {
            try{
                const response = await api.post('/upload/large', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                callback.onSuccess(response.data);
                return response.data;
            }catch(error){
                const e = errorHandler(error);
                callback.onError(e);
                return e;
            }
        }
    },
    file: (key, callback) => {
        return new Promise((resolve, reject) => {
            api.get('/assets/s3/signed-url/' + key)
                .then(response => {
                    callback.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    const e = errorHandler(error);
                    callback.onError(e);
                    reject(e);
                });
        });
    },
    user: {
        login: async (data, callback) => {
            try{
                const response = await api.post('/login', data);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
                localStorage.setItem('mendifyAuth', response.data.data.token);

                useAuthStore.setState({
                    user: response.data.data.user,
                    token: response.data.data.token,
                    isAuthenticated: true,
                    role: response.data.data.role,
                })
                callback.onSuccess(response.data);
                return response.data;
            }catch(error){
                const e = errorHandler(error);
                callback.onError(e);
                return e;
            }
        },
        update: async ({data}, callback) => {
            try{
                const response = await api.put('/user/update', data);

                const store = useAuthStore.getState()
               
                useAuthStore.setState({
                    ...store,
                    user: response.data.data,
                })

                callback.onSuccess(response.data);
                return response.data;
            }catch(error){
                const e = errorHandler(error);
                callback.onError(e);
                return e;
            }
        },
        logout: async (callback) => {
            try{
                const response = await api.post('/user/logout');
                useAuthStore.setState({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    role: null,
                })
                Cookies.remove('mendifyAuth')
                localStorage.removeItem('mendifyAuth');
                api.defaults.headers.common['Authorization'] = null;
                callback.onSuccess(response.data);
                return response.data;
            }catch(error){
                const e = errorHandler(error);
                callback.onError(e);
                return e;
            }
        }
    },
    initialize: async (callback) => {
        try{
            
            const token = getCookie('mendifyAuth') || localStorage.getItem('mendifyAuth');
            if(token){
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await api.get('/user');

                
                
                const store = {
                    user: res.data.data.user,
                    token: token,
                    isAuthenticated: true,
                    role: res.data.data.role,
                }

                useAuthStore.setState(store)

                await apiQueryClient.setQueryData(['authstore'], store)
                callback.onSuccess(store);
                return store;
            }


            callback.onSuccess(null);
            return null;
        }catch(error){
            const e = errorHandler(error);
            callback.onError(e);
            return e;
        }
    },
    authStore: ()=> useAuthStore.getState(),
}


export default mendify;