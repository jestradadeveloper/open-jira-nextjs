import { ChangeEvent, useContext, useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  //const [ isAdding , setIsAdding ] = useState(false);
  const [ inputValue  , setInputValue ] = useState('');
  const [ touched, setTouched ] = useState(false);

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const onSave = () =>{
    if (inputValue.length === 0 ) return;
    addNewEntry(inputValue);
    setTouched(false);
    setInputValue('');
  }

  return (
    <Box sx={{padding:1, marginBottom: 2}}>
      {
        isAddingEntry ? (
          <>
            <TextField  
              fullWidth 
              sx={{ marginTop: 2, marginBottom: 1}} 
              placeholder='Nueva Entrada'
              autoFocus
              multiline
              label='Nueva Entrada'
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor' }
              error={inputValue.length <= 0 && touched }
              value={ inputValue }
              onChange={ onTextFieldChanged }
              onBlur={ ()=> setTouched(true)}
            />
            <Box display='flex' justifyContent='space-between'>
              <Button variant='outlined' endIcon={<CancelOutlinedIcon />}  onClick={ () => setIsAddingEntry(false) }>
                Cancelar
              </Button>
              <Button 
                variant='outlined' 
                color='secondary' 
                endIcon={<SaveOutlinedIcon />}
                onClick={ onSave }
              >
                Guardar
              </Button>
            </Box>
          </>
        ) :
        (
          <Button 
            startIcon={<AddCircleOutlinedIcon />}
            fullWidth
            variant='outlined'
            onClick={ () => setIsAddingEntry(true) }
          >
            Agregar tarea
          </Button>
        )
      }
     
    </Box>
  )
}
