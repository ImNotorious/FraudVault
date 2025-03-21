import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { transactions } = await request.json()

    // Validate the input
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
      return NextResponse.json({ error: "Invalid or empty transactions array" }, { status: 400 })
    }

    // Process transactions in parallel
    const results = await Promise.all(
      transactions.map(async (transaction) => {
        try {
          // Call the real-time fraud detection API for each transaction
          const response = await fetch(new URL("/api/fraud-detection", request.url).toString(), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction),
          })

          if (!response.ok) {
            throw new Error(`Error processing transaction ${transaction.transaction_id}`)
          }

          const result = await response.json()
          return result
        } catch (error) {
          console.error(`Error processing transaction ${transaction.transaction_id}:`, error)
          return {
            transaction_id: transaction.transaction_id,
            error: "Failed to process transaction",
          }
        }
      }),
    )

    // Format the response as a map of transaction_id to results
    const formattedResults: Record<string, any> = {}
    results.forEach((result) => {
      if (result.transaction_id) {
        formattedResults[result.transaction_id] = {
          is_fraud: result.is_fraud,
          fraud_reason: result.fraud_reason,
          fraud_score: result.fraud_score,
        }
      }
    })

    return NextResponse.json(formattedResults)
  } catch (error) {
    console.error("Error processing batch fraud detection:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

