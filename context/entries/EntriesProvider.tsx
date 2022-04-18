import { FC , useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4} from 'uuid';
import { entriesApi } from '../../apis';

export interface EntriesState{
  entries: Entry[];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
}


export const EntriesProvider:FC = ({children}) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const addNewEntry = async(description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({type:'[Entry] Add-Entry', payload: data })
  }
  const updatedEntry = async({_id, description, status}: Entry, showSnackbar = false) => {
    try{
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status} );
      dispatch({type: '[Entry] Entry-Updated', payload: data})
      if(showSnackbar){
        enqueueSnackbar('Updated Entry', {
          variant:'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
     }
    }catch(err){
      console.log({err})
    }
    
  }
  const refreshEntries = async()=>{
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({type: '[Entry] Refresh-Data', payload: data});
  }
  useEffect(() => {
  refreshEntries();
  }, [])
  
  const destroyEntry = async({ _id }: Entry, showSnackbar = false) => {
    try{
    const { data } = await entriesApi.delete<Entry>(`/entries/${_id}` );
    dispatch({type: '[Entry] Destroy-Entry'}) ;
      if(showSnackbar){
        enqueueSnackbar('Deleted Entry', {
          variant:'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }
      refreshEntries();

    }catch(err){
      console.log(err);
    }
  }
  return(
    <EntriesContext.Provider value={{ 
      ...state,
      //Metodos,
      addNewEntry,
      updatedEntry,
      destroyEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
