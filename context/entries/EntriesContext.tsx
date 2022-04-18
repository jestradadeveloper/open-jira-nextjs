import { createContext } from 'react';
import { Entry } from '../../interfaces';


export interface ContextProps{ 
   entries: Entry[]; // falta el tipo de datos del arreglo
   addNewEntry: (description: string) => void;
   updatedEntry: (entry: Entry, showSnackBar?: boolean ) => void;
   destroyEntry: (entry: Entry, showSnackBar?: boolean ) => void;
}


export const EntriesContext = createContext({} as ContextProps);
