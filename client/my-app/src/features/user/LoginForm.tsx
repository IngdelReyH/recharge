import { values } from 'mobx'
import React, { FormEvent, useContext, useState } from 'react'
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react'
import { IUser, IUserFormValues } from '../../app/models/user';
import {Form as FinalForm, Field} from 'react-final-form'
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { FORM_ERROR } from 'final-form';
import {combineValidators, isRequired} from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';



const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

const LoginForm = () => {
    
    
    const rootStore = useContext(RootStoreContext);
    const{login} =rootStore.userStore;
   // const validador=rootStore.userStore.valido;
    


    const handleFinalFormSubmit = (values: IUserFormValues)=>{
        login(values);//.catch(error=>({[FORM_ERROR]:error}));
        console.log("los valores del login son:",values);
        //console.log("los errores del loginForm son:", error);
     }
 // si quiero add un text area veer video 17 seccion 5
     const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
         const {name, value}= event.currentTarget;
         //setRecarga({...recarga, [name]: value})
     }
     //-------------------------esta era la linea del final form
      //<FinalForm onSubmit={handleFinalFormSubmit}
     //------------------
  return (
    
      <Segment clearing>
        <FinalForm onSubmit={(values: IUserFormValues)=>login(values).catch(error => ({
            [FORM_ERROR]: error
        }))}
        validate={validate}
        render={({handleSubmit, submitting, form , submitError, invalid, pristine, dirtySinceLastSubmit})=> (
            <Form onSubmit={handleSubmit} error>
                 <Header
                as='h2'
                content='Login to Recargas'
                color='teal'
                textAlign='center'
                />
            <Field
                name='email' 
                type='email'
                placeholder='Email' 
                component={TextInput}
            />
             <Field
            name='password' 
            type='password'
            placeholder='Password' 
            component={TextInput}
            />
            {submitError && !dirtySinceLastSubmit&& (
            <ErrorMessage error={submitError} 
            text='Invalid email or password'/>)}
            
            <Button 
            disabled={invalid && !dirtySinceLastSubmit || pristine}
            loading={submitting}
            floated='right' 
            positive  
            content='Login'
            />
            {/*<pre>{JSON.stringify(form.getState(),null, 2)}</pre>*/}
        </Form>
        )}
        />
   
</Segment>
    
  )
}

export default LoginForm
