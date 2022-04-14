import React, { useState, ChangeEvent, useMemo, FC } from 'react'
import { GetServerSideProps } from 'next'
import { capitalize, Card, CardActions, CardContent, CardHeader, Grid, TextField , Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton} from '@mui/material';
import { Layout } from '../../components/layouts';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EntryStatus } from '../../interfaces';
import { isValidObjectId } from 'mongoose';

const validStatus: EntryStatus[] =  ['pending', 'in-progress', 'finished'];

interface Props{

}
export const EntryPage:FC = (props) => {
  console.log({props})
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<EntryStatus>('pending');
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(()=> inputValue.length <= 0 && touched,[inputValue, touched])

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () =>{
  
  }


  return (
   <Layout title='...'>
     <Grid
      container
      justifyContent='center'
      sx={{ marginTop:2 }}
     >
       <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader 
              title={`Entrada: ${inputValue}`}
              subheader={`Creada hace: ... minutos`}
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
  
  if (!isValidObjectId(id)){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      id
    }
  }
}

export default EntryPage;
