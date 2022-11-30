import { MongoClient, Db } from 'mongodb'

export let db: Db | null = null

export const initMongoDB = () => {

  console.log('Initializing MongoDB')

  const client = new MongoClient( process.env.DBURL , { useUnifiedTopology: true } );

  client.connect( function (err, client) {
    if (err) throw err
  
    db = client.db('Comfeey')
  
    db.collection('products').find().toArray(function (err, result) {
      if (err) throw err
			
      console.log('MongoDB Client Initialized Successfuly')
    })
  })

}
