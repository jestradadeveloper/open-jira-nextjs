import React, { useState, ChangeEvent, useMemo, FC, useContext } from 'react'
import { GetServerSideProps } from 'next'
import { capitalize, Card, CardActions, CardContent, CardHeader, Grid, TextField , Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton} from '@mui/material';

import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';


const validStatus: EntryStatus[] =  ['pending', 'in-progress', 'finished'];


interface Props{
  entry: Entry
}
export const EntryPage:FC<Props> = ({ entry }) => {
  const { updatedEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(()=> inputValue.length <= 0 && touched,[inputValue, touched])

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () =>{
    if(inputValue.trim().length === 0 ) return;
    const updateEntry: Entry  = {
      ...entry,
      status,
      description: inputValue
    }
    updatedEntry(updateEntry);
  }


  return (
   <Layout title={inputValue.substring(0,8)+ '...'} >
     <Grid
      container
      justifyContent='center'
      sx={{ marginTop:2 }}
     >
       <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader 
              title={`Entrada:`}
              subheader={`Creada hace: ${entry.createdAt} minutos`}
            />
            <CardContent>
              <TextField  
                sx={{ marginTop: 2, marginBottom: 1}}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label= 'Nueva Entrada'
                value={ inputValue }
                onBlur={ ()=> setTouched(true)}
                onChange={ onTextFieldChanged }
                helperText={ isNotValid && 'Ingrese un Valor'}
                error={ isNotValid }
              />
              <FormControl>
                <FormLabel> Estado:</FormLabel>
                <RadioGroup
                row
                value={status}
                onChange={onStatusChange}
                >
                  {
                    validStatus.map(option=>(
                      <FormControlLabel 
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<AddCardOutlinedIcon/>}
                variant='contained'
                fullWidth
                onClick={ onSave }
                disabled={ inputValue.length <= 0 }
              >
                  Save
              </Button>
            </CardActions>
          </Card>
          <IconButton
            sx={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              backgroundColor: 'error.dark' 
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
       </Grid>
     </Grid>
   </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as {id: string};
  const entry = await dbEntries.getEntryById(id);

  if ( !entry ){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
