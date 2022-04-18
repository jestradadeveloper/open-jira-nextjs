import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose';
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = 
  | { message: string }
  | IEntry

export default function handler(req: NextApiRequest, res:NextApiResponse<Data>){
  
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)){
    return res.status(400).json({message: 'El id no es valido'+id});
  }
  switch(req.method){
    case 'GET':
      return getEntryById(req, res);
    case 'PUT':
      return updateEntry(req, res);
    case 'DELETE':
      return destroyEntry(req, res);
    default:
      return res.status(400).json({message: 'Metodo no existe'});
  }
}
const getEntryById = async(req: NextApiRequest, res: NextApiResponse<Data>) =>{
  const { id } = req.query;
  await db.connect();
  const entryToGet = await Entry.findById(id);
  if (!entryToGet){
    await db.disconnect();
    return res.status(400).json({ message: 'No hay entrada con ese id '+id})
  }
  await db.disconnect();
  res.status(200).json(entryToGet)
}
const destroyEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try{
    await db.connect();
    const entryToDestroy = await Entry.findByIdAndDelete(id);
    if (!entryToDestroy){
      await db.disconnect();
      return res.status(400).json({message: 'No hay entrada con ese id ' + id})
    }
    return res.status(200).json({message: 'Se elimino entrada con ese id ' + id})
  }catch(err: any){
    await db.disconnect();
    console.log({err})
    res.status(400).json({message: err.errors.status.message })
  }
}
const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) =>{
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  
  if (!entryToUpdate){
    await db.disconnect();
    return res.status(400).json({message: 'No hay entrada con ese id ' + id})
  }
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;
  try{
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status}, { runValidators: true, new: true})
   
    await db.disconnect();
    res.status(200).json(updatedEntry!)
  }catch(err: any){
    await db.disconnect();
    console.log({err})
    res.status(400).json({message: err.errors.status.message })
  }
}
