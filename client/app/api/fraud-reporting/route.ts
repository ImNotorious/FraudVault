export const dynamic = 'force-dynamic';
import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

// MongoDB connection
const uri = process.env.MONGODB_URI || ""
const client = new MongoClient(uri)

export async function POST(request: NextRequest) {
  try {
    const { transaction_id, reporting_entity_id, fraud_details } = await request.json()

    // Validate the input
    if (!transaction_id) {
      return NextResponse.json({ error: "Missing transaction_id" }, { status: 400 })
    }

    if (!reporting_entity_id) {
      return NextResponse.json({ error: "Missing reporting_entity_id" }, { status: 400 })
    }

    // Store the fraud report in MongoDB
    try {
      await client.connect()
      const database = client.db("fraud_detection")
      const collection = database.collection("fraud_reporting")

      // Check if the transaction exists in the fraud_detection collection
      const detectionCollection = database.collection("fraud_detection")
      const transaction = await detectionCollection.findOne({ transaction_id })

      if (!transaction) {
        return NextResponse.json(
          {
            transaction_id,
            reporting_acknowledged: false,
            failure_code: 404,
            message: "Transaction not found",
          },
          { status: 404 },
        )
      }

      // Insert the fraud report
      await collection.insertOne({
        transaction_id,
        reporting_entity_id,
        fraud_details: fraud_details || "",
        is_fraud_reported: true,
        reporting_time: new Date(),
      })

      // Update the transaction in the fraud_detection collection
      await detectionCollection.updateOne({ transaction_id }, { $set: { is_fraud_reported: true } })

      return NextResponse.json({
        transaction_id,
        reporting_acknowledged: true,
        failure_code: 0,
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        {
          transaction_id,
          reporting_acknowledged: false,
          failure_code: 500,
          message: "Database error",
        },
        { status: 500 },
      )
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error("Error processing fraud report:", error)
    return NextResponse.json(
      {
        transaction_id: "unknown",
        reporting_acknowledged: false,
        failure_code: 500,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

