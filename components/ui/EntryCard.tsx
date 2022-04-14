import { Card,  CardActionArea, CardContent, Typography, CardActions } from '@mui/material'
import React, { DragEvent, FC, useContext } from 'react'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
interface Props{
  entry: Entry;
}
export const EntryCard:FC<Props> = ({ entry }) => {
  const { startDragging, endDragging , isDragging } = useContext(UIContext);

  const router = useRouter();

  const onDragStart = ( event:DragEvent ) => {
    event.dataTransfer.setData('text',entry._id)
    startDragging()
  }
  const onDragEnd = () => {
    //todo cancelar drag
    endDragging()
  }
  const onClick = () =>{
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card sx={{
        marginBottom: 1
      }}
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
      onClick={ onClick }
    >
      <CardActionArea>
        <CardContent>
            <Typography sx={{ whiteSpace: 'pre-line'}}> {entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display:'flex', justifyContent:'end', paddingRight:2 }}>
          <Typography variant='body2'> Hace 30 min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
