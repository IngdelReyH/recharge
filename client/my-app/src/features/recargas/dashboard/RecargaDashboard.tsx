import React, { SyntheticEvent } from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { IRecarga } from '../../../app/models/recarga';
import { IUser } from '../../../app/models/user';
import Recargadetails from '../details/RecargaDetails';
import RecargaForm from '../form/RecargaForm';
import RecargaList from './RecargaList';





interface IProps{
    recargas: IRecarga[];
    selectRecarga: (id: string)=> void;
    selectedRecarga: IRecarga | null;
    editMode: boolean;
    setEditMode: (editMode: boolean)=>void;
    setSelectedRecarga: (recarga: IRecarga | null)=>void;
    createRecarga: (recarga: IRecarga) => void;
    editRecarga: (recarga: IRecarga)=> void;
    deleteRecarga: (id: string)=>void;
}

const RecargaDashboard: React.FC<IProps> = ({
    recargas, 
    selectRecarga,
    selectedRecarga,
    editMode,
    setEditMode,
    setSelectedRecarga,
    createRecarga,
    editRecarga,
    deleteRecarga
    }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <RecargaList 
        recargas={recargas} 
        selectRecarga={selectRecarga} 
        deleteRecarga={deleteRecarga}
        />
      </Grid.Column>
     <Grid.Column width={6}>
        {selectedRecarga && !editMode && (
        <Recargadetails 
        recarga={selectedRecarga} 
        setEditMode={setEditMode} 
        setSelectedRecarga={setSelectedRecarga}
        />
        )}
        {editMode &&(
         <RecargaForm 
         key={selectedRecarga && selectedRecarga.id || 0}
         setEditMode={setEditMode}
         recarga={selectedRecarga!}
         createRecarga={createRecarga}
         editRecarga={editRecarga}
         />
         )}
     </Grid.Column>
    </Grid>
  )
}

export default  RecargaDashboard;