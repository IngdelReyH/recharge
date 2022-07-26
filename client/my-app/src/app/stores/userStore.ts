import { action, computed, observable, runInAction } from "mobx";
import { useNavigate } from 'react-router-dom';
import agentR from "../api/agentR";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";
import React, { Component } from "react";
import { withRouter } from "../layout/Navigator";
import { history } from "../..";



export default class UserStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;
    
    @observable userList: IUser[] | null= null;

    @observable isAdmin: boolean= false;

    @observable estaLogeao: boolean=false;

    @observable userId: string| null=null;

    @observable registerBox: boolean = false;

    @computed get isLoggedIn() {return !!this.user}

    @action login = async (values : IUserFormValues) =>{

        
       
        try{
            const user = await agentR.User.login(values);
            this.user = user;
            console.log("el usuario q devuelve la api es:",user);
            this.rootStore.commonStore.setToken(user.token);
            if(user.username == "andyy")
            {
                this.isAdmin=true;
                console.log("el valor de isAdmin en userStore es:",this.isAdmin);
            }
            else
            {
                this.isAdmin=false;
                console.log("el valor de isAdmin en userStore es:",this.isAdmin);
            }
            this.estaLogeao=true;
            history.push('/recargas')
           
        }catch(error){
            console.log(error,"error del userstore login");
            throw error;
        }
    }


    @action register = async (values: IUserFormValues) =>{
        try{
            const user = await agentR.User.register(values);
            //this.rootStore.commonStore.setToken(user.token);
            //aqui el agrego algo para cerrar el modal que yo no lo tengo 
            this.registerBox=false;
            console.log("el register box es:",this.registerBox);
            history.push('/trash')// solucion burda pero funciona
            this.listar();//pra refrescar y aparezca la lista actualizada
            //history.push('/users')
        }catch(error){
            console.log("error del userstore register:",error);
            throw error;
        }
    }

    @action getUser = async () => {
        try{
            const user = await agentR.User.current();
            runInAction (()=>{
                this.user = user;
                this.userId=this.user.id;
                console.log("el current user  es:",this.user)
                console.log("el user id es:",this.userId)
                //history.push('/trash')
            })
        }catch(error)
        {
            console.log(error);
        }
        //return this.user;
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        this.estaLogeao=false;
        history.push('/')
    }

    @action listar = async ()=> {
        const userList = await agentR.User.lista();
        runInAction (()=>{
            this.userList=userList;
            console.log("lista de usuarios:",userList)
        })
        console.log("estory en listar")
        history.push('/users')
    }
    
    @action deleteUser = async (id: string)=>{
       await agentR.User.delete(id).then(() =>{
        history.push('/trash')// solucion burda pero funciona
           this.listar();
          // history.push('/users')
        })
        console.log("estoy en delete user")
    }

    @action registerBox_mod = () =>{
        this.registerBox=true;
        console.log("el register box es:",this.registerBox);
        history.push('/trash')// solucion burda pero funciona
        this.listar();
    }
    @action registerBox_modFalse = () =>{
        this.registerBox=false;
        console.log("el register box es:",this.registerBox);
        history.push('/trash')// solucion burda pero funciona
        this.listar();
    }
    @action isAdminFunction =() =>{
        if(this.user?.username == "andyy")
        {
            this.isAdmin=true;
            console.log("el valor de isAdmin en userStore es:",this.isAdmin);
        }
        else
        {
            this.isAdmin=false;
            console.log("el valor de isAdmin en userStore es:",this.isAdmin);
        }
    }
    @action getSpecificUser = async (id: string)=>{
        try{
            const user = await agentR.User.userxId(id);
            runInAction (()=>{
                this.user = user;
                console.log("el nombre del user especifico es:",this.user?.displayName);
            })
        }catch(error)
        {
            console.log(error);
        }
        const nombre = this.user!.displayName;
        if(nombre)
        return nombre;
    }
}




