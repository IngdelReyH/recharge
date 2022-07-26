import React,{FormEvent, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import {v4 as uuid} from 'uuid';
import { IRecarga } from '../../../app/models/recarga';
import {Form as FinalForm, Field} from 'react-final-form'

interface IProps{
    setEditMode: (editMode: boolean)=> void;
    recarga: IRecarga;
    createRecarga: (user: IRecarga) => void;
    editRecarga: (user: IRecarga)=> void;
}

const RecargaForm: React.FC<IProps> = ({setEditMode, recarga: initialFormState, createRecarga, editRecarga}) => {

    const initializeForm =() =>{
        if(initialFormState){
            return initialFormState;
        }else{
            return{
                id:'',
                title:'',
                price:'',
                description:'',
                category:'',
                attendees:[]
            };
        }  
    };

    const [recarga,setRecarga] = useState<IRecarga>(initializeForm);

    const handleSubmit = ()=>{
        if (recarga.id.length === 0) {
            let newRecarga = {
                ...recarga,
                id: uuid()
            }
            createRecarga(newRecarga);
        }else{
            editRecarga(recarga)
        }//console.log("aqui es donde esta la maricona",recarga);
    }
// si quiero add un text area veer video 17 seccion 5
    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const {name, value}= event.currentTarget;
        setRecarga({...recarga, [name]: value})
    }

  return (
    <Segment clearing>
    <Form onSubmit={handleSubmit}>
        <Form.Input 
        onChange={handleInputChange} 
        name='title' 
        placeholder='Title' 
        value={recarga.title}
        />
        <Form.Input 
         onChange={handleInputChange} 
         name='price'
        placeholder='Price' 
        value={recarga.price}
        />
        <Form.Input 
         onChange={handleInputChange} 
         name='description'
        placeholder='Description' 
        value={recarga.description}
        />
        <Form.Input 
         onChange={handleInputChange} 
         name='category'
        placeholder='Category' 
        value={recarga.category}
        />
        <Button floated='right' positive type='submit' content='Submit'/>
        <Button onClick={()=>setEditMode(false)}  floated='right'  type='button' content='Cancel'/>
    </Form>
</Segment>
  )
}

export default RecargaForm