import { 
  FilterQuery, FindOneOptions, InsertWriteOpResult,
	InsertOneWriteOpResult, CollectionInsertOneOptions, UpdateOneOptions, 
	UpdateManyOptions, UpdateWriteOpResult,
	DeleteWriteOpResultObject
  }
from 'mongodb'

import { db } from './init'

export const findOne = async ( collection: string, findFilter: FilterQuery<any>, opt?: FindOneOptions<any> ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

  try {
  
    // Insert some documents
    const results = await db.collection(collection).findOne( findFilter, opt );

    return results

  } catch(err) {
    console.log(err);
  }

}

export const findMany = async ( collection: string, findFilter: FilterQuery<any>, opt?: FindOneOptions<any>, skip: number = 0, limit: number = 0, sortField?: string, ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

  try {
    // Insert some documents
    return sortField ? 
			await db.collection(collection).find( findFilter, opt ).sort({ [sortField]: -1 }).skip(skip*limit).limit(limit).toArray() 
		:
			await db.collection(collection).find( findFilter, opt ).skip(skip*limit).limit(limit).toArray()

  } catch(err) {
    console.log(err);
  }

}

export const insertOne = async ( collection: string, data: {}, opt?: CollectionInsertOneOptions ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

	const dataWithDate = { ...data, created_at: Date.now() }

  try {
  
    // Insert some documents
    const results: InsertOneWriteOpResult<any> = await db.collection(collection).insertOne( dataWithDate, opt );

    return results

  } catch(err) {
    console.log(err);
  }

}

export const insertMany = async ( collection: string, data: {}[] ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

	const dataWithDate = { ...data, created_at: Date.now() }

  try {
  
    // Insert some documents
    const results: InsertWriteOpResult<any> = await db.collection(collection).insertMany( dataWithDate );

    return results

  } catch(err) {
    console.log(err);
  }

}

export const updateOne = async ( collection: string, search: FilterQuery<any>, data: {}, opt?: UpdateOneOptions ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

  try {
  
    // Insert some documents
    const results: UpdateWriteOpResult = await db.collection(collection).updateOne( search, data, opt );

    return results

  } catch(err) {
    console.log(err);
  }

}

export const updateMany = async ( collection: string, search: UpdateManyOptions, data: {}[] ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

  try {
  
    // Insert some documents
    const results: UpdateWriteOpResult = await db.collection(collection).updateMany( search, data );

    return results

  } catch(err) {
    console.log(err);
  }

}

export const deleteOne = async ( collection: string, search: FilterQuery<any> ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

  try {
  
    // Insert some documents
    const results: DeleteWriteOpResultObject = await db.collection(collection).deleteOne( search );

    return results

  } catch(err) {
    console.log(err);
  }

}

export const deleteMany = async ( collection: string, search: FilterQuery<any> ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

  try {
  
    // Insert some documents
    const results: DeleteWriteOpResultObject = await db.collection(collection).deleteMany( search );

    return results

  } catch(err) {
    console.log(err);
  }

}

export const CountDocs = async ( collection: string, countFilter: FilterQuery<any>, opt?: any ) => {

  if( !db || !collection.length ) throw new Error('Database Not Been initialized')

  try {
  
    // Insert some documents
    const results = await db.collection(collection).countDocuments( countFilter, opt );

    return results

  } catch(err) {
    console.log(err);
  }

}