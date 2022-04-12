import { Card, CardActions, CardContent, CardHeader, Grid, TextField , Button, FormControl} from '@mui/material';
import React from 'react'
import { Layout } from '../../components/layouts';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
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
       </Grid>
     </Grid>
   </Layout>
  )
}

export default EntryPage;
