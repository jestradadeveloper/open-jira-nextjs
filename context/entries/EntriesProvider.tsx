import { FC , useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4} from 'uuid';

export interface EntriesState{
  entries: Entry[];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [{
      _id: uuidv4(),
      description: 'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, accusamus veritatis veniam asperiores non eum harum dolorem quae similique, necessitatibus quidem suscipit ullam commodi laboriosam. Illo inventore nihil quidem harum!',
      status: 'pending',
      createdAt: Date.now()
  },
  {
    _id: uuidv4(),
    description: 'En progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, accusamus veritatis veniam asperiores non eum harum dolorem quae similique, necessitatibus quidem suscipit ullam commodi laboriosam. Illo inventore nihil quidem harum!',
    status: 'in-progress',
    createdAt: Date.now() - 1000000,
  },
  {
    _id: uuidv4(),
    description: 'Terminado: Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, accusamus veritatis veniam asperiores non eum harum dolorem quae similique, necessitatibus quidem suscipit ullam commodi laboriosam. Illo inventore nihil quidem harum!',
    status: 'finished',
    createdAt: Date.now() - 100000,
  }
],
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
