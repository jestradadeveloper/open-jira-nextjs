import { Paper, List } from '@mui/material'
import React, { FC, useContext, useMemo , DragEvent} from 'react'
import { EntryCard } from './EntryCard'
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';
import styles from './EntryList.module.css';
interface Props{
  status: EntryStatus;
}
export const EntryList:FC<Props> = ({ status }) => {
  const { entries, updatedEntry } = useContext(EntriesContext);
  const { startDragging, endDragging , isDragging } = useContext(UIContext);

  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ] );
  const allowDrop = (event:DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  const onDropEntry = (event:DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    console.log({id})
    const entry = entries.find( e =>  e._id === id)!;
    entry.status = status;
    updatedEntry(entry);
    endDragging();
  }
  return (
    <div 
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : ''}
    >
      <Paper sx={{
        height: 'calc(100vh - 250px)',
        overflowY: 'scroll',
        backgroundColor: 'transparent',
        padding: '3px 5px'
      }}>
        {/**TODO: Cambiara si hago drag o no */}
        <List sx={{ opacity: isDragging ? 0.4 : 1, transition: 'all 0.3s' }}>
            {
              entriesByStatus.map(entry => (
                <EntryCard key={entry._id} entry={entry}/>
              ))
            }
           
            
        </List>
      </Paper>
    </div>
  )
}
