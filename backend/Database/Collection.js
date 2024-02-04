import {MongoClient} from 'mongodb'

const uri="mongodb://127.0.0.1/"
const client=new MongoClient(uri)
const collection=client.db("Registrar").collection("StudentsInfo")

export {collection}