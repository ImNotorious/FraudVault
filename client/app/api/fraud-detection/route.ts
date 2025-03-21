import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

// MongoDB connection
const uri = process.env.MONGODB_URI || ""
const client = new MongoClient(uri)

// Sample rules for fraud detection
const rules = [
  {
    id: "rule-1",
    name: "High Amount Transaction",
    condition: (transaction: any) => transaction.transaction_amount > 10000,
    reason: "Transaction amount exceeds threshold",
    active: true,
    priority: "high",
  },
  {
    id: "rule-2",
    name: "Multiple Transactions",
    condition: (transaction: any) => {
      // This is a simplified check - in a real system, you would query the database
      // to check for multiple transactions from the same user in a short time period
      return false
    },
    reason: "Multiple transactions in short time period",
    active: true,
    priority: "medium",
  },
]

// Simple AI model for fraud detection
// In a real system, this would be a trained ML model
function predictFraud(transaction: any) {
  // Calculate a simple fraud score based on transaction amount and other factors
  let score = 0

  // Higher amounts increase the score
  if (transaction.transaction_amount > 5000) {
    score += 0.3
  } else if (transaction.transaction_amount > 1000) {
    score += 0.1
  }

  // Certain payment modes might be riskier
  if (transaction.transaction_payment_mode === "card") {
    score += 0.1
  }

  // Web transactions might be riskier than mobile
  if (transaction.transaction_channel === "web") {
    score += 0.1
  }

  // Random factor to simulate a real model's variability
  score += Math.random() * 0.2

  // Cap the score at 1.0
  score = Math.min(score, 1.0)

  return {
    is_fraud: score > 0.7,
    fraud_score: score,
    fraud_reason: score > 0.7 ? "AI model detected suspicious pattern" : "",
  }
}

export async function POST(request: NextRequest) {
  try {
    const transaction = await request.json()

    // Validate the transaction data
    if (!transaction.transaction_id) {
      return NextResponse.json({ error: "Missing transaction_id" }, { status: 400 })
    }

    // Start timing for latency measurement
    const startTime = Date.now()

    // Check against rules
    let isFraud = false
    let fraudReason = ""
    let fraudSource = ""

    // Check active rules in order of priority
    for (const rule of rules.filter((r) => r.active)) {
      if (rule.condition(transaction)) {
        isFraud = true
        fraudReason = rule.reason
        fraudSource = "rule"
        break
      }
    }

    // If no rule detected fraud, use the AI model
    let fraudScore = 0
    if (!isFraud) {
      const prediction = predictFraud(transaction)
      isFraud = prediction.is_fraud
      fraudReason = prediction.fraud_reason
      fraudSource = "model"
      fraudScore = prediction.fraud_score
    }

    // Calculate latency
    const latency = Date.now() - startTime

    // Prepare the response
    const result = {
      transaction_id: transaction.transaction_id,
      is_fraud: isFraud,
      fraud_source: isFraud ? fraudSource : "",
      fraud_reason: fraudReason,
      fraud_score: fraudScore,
      latency: latency,
    }

    // Store the result in MongoDB
    try {
      await client.connect()
      const database = client.db("fraud_detection")
      const collection = database.collection("fraud_detection")

      await collection.insertOne({
        ...transaction,
        is_fraud_predicted: isFraud,
        fraud_source: isFraud ? fraudSource : "",
        fraud_reason: fraudReason,
        fraud_score: fraudScore,
        detection_time: new Date(),
        latency: latency,
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue with the response even if DB storage fails
    } finally {
      await client.close()
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing fraud detection:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

