import axios, { AxiosResponse } from 'axios';
import { request } from 'http';
import { toNamespacedPath } from 'path';
import { IAttendee, IRecarga } from '../models/recarga';
import { IUser, IUserFormValues } from '../models/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { history } from '../..';
import { ICompra } from '../models/compra';


//axios.defaults.baseURL= 'https://localhost:7268/api';
axios.defaults.baseURL= process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if(token) config.headers!.Authorization= `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, (error)=> {
   // let navigate = useNavigate();
    console.log(error,"error del AgentR:",error.data);
    if(error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
        console.log("deberia ser el toast")
    }
    const {status, data, config} = error.response;
    if(status === 401)
    {
        error.response.statusText='Unauthorized';
        console.log("lo desautorizo plp");
        console.log(error.response);
    }

    if(status === 404)
    {
        history.push('/notfound')
       // navigate('/notfoud');
        console.log("not found 404");
    }
    if(status === 400 && config.method === 'get' && data.errors.hasOnwProperty('id'))
    {
        history.push('/notfound')
        //navigate('/notfoud');
         console.log("not found 400");
    }
    if(status === 500)
    {
        toast.error('Server error - check the terminal for more info!');
        console.log("Server error 500");
    }
    throw error.response;
})

const responseBody =(response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
}

const Recargas ={
    list: (): Promise<IRecarga[]>=> requests.get('/recargas'),
    details: (id: string) => requests.get(`/recargas/${id}`),
    create: (recarga: IRecarga) => requests.post('/recargas',recarga),
    update: (recarga: IRecarga) => requests.put(`/recargas/${recarga.id}`,recarga),
    delete: (id: string)  => requests.del(`/recargas/${id}`)
};

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user),
    lista: (): Promise<IUser[]> => requests.get('/user/lista'),
    delete: (id: string) => requests.del(`/user/${id}`),
    userxId:(id: string) => requests.get(`/user/${id}`)
};

const Compras = {
   // listaC: (): Promise<IAttendee[]> => requests.get('/compras'),
   listaC: (): Promise<ICompra[]> => requests.get('/compras'),
   createC: (compra: ICompra) => requests.post('/compras/createcompra2',compra),
    //createC: (compra: IRecarga) => requests.post('/compras/createcompra',compra),
    update: (compra: ICompra) => requests.put(`/compras/${compra.id}`,compra),
    infoC: (date: Date) => requests.get(`/compras/${date}`)
};

export default{Recargas, User, Compras}