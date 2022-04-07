import { FC , useEffect, useReducer } from 'react';
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
  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt:  Date.now(),
      status: 'pending'
    }
    dispatch({type:'[Entry] Add-Entry', payload: newEntry })
  }
  const updatedEntry = (entry: Entry) => {
    dispatch({type: '[Entry] Entry-Updated', payload: entry})
  }
  const refreshEntries = async()=>{
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({type: '[Entry] Refresh-Data', payload: data});
  }
  useEffect(() => {
  refreshEntries();
  }, [])

  return(
    <EntriesContext.Provider value={{ 
      ...state,
      //Metodos,
      addNewEntry,
      updatedEntry,
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
