import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  // se connecter a la base de donnees
  const client = await MongoClient.connect('mongodb+srv://emmataks:qeNHyYIhu3gafjD0@cluster0.n0prgxt.mongodb.net/auth-demo?retryWrites=true&w=majority&appName=Cluster0');
  
  return client;
}