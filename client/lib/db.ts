import { MongoClient, type MongoClientOptions } from "mongodb"

// Type definitions
interface GlobalWithMongo extends NodeJS.Global {
  _mongoClientPromise?: Promise<MongoClient>
}

// Configuration
const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
}

// Validate environment variable
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables")
}

// Connection handling
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as GlobalWithMongo
  
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
      .then(connectedClient => {
        console.log("MongoDB connected successfully")
        return connectedClient
      })
      .catch(error => {
        console.error("MongoDB connection failed:", error)
        throw error
      })
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
    .then(connectedClient => {
      console.log("MongoDB connected successfully")
      return connectedClient
    })
    .catch(error => {
      console.error("MongoDB connection failed:", error)
      throw error
    })
}

// Utility function with connection caching
export async function connectToDatabase() {
  try {
    const client = await clientPromise
    // Verify connection
    await client.db().admin().ping()
    return client
  } catch (error) {
    console.error("Database connection verification failed:", error)
    throw error
  }
}

// Export the promise directly for raw access
export default clientPromise
