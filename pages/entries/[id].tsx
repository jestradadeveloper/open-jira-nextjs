import { capitalize, Card, CardActions, CardContent, CardHeader, Grid, TextField , Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton} from '@mui/material';
import React from 'react'
import { Layout } from '../../components/layouts';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] =  ['pending', 'in-progress', 'finished'];
export const EntryPage = () => {
  return (
   <Layout title='...'>
     <Grid
      container
      justifyContent='center'
      sx={{ marginTop:2 }}
     >
       <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title='Entrada' subheader={`Creada hace: ... minutos`}/>
            <CardContent>
              <TextField  
                sx={{ marginTop: 2, marginBottom: 1}}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label= 'Nueva Entrada'
              />
              <FormControl>
                <FormLabel> Estado:</FormLabel>
                <RadioGroup
                row
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

export default EntryPage;
