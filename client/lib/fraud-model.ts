// This is a simplified AI model for fraud detection
// In a real application, this would be a trained machine learning model
// or would call an external API for ML predictions

interface Transaction {
  transaction_id: string
  transaction_date: string
  transaction_amount: number
  transaction_channel: string
  transaction_payment_mode: string
  payment_gateway_bank: string
  payer_email: string
  payer_mobile: string
  payer_card_brand?: string
  payer_device: string
  payer_browser: string
  payee_id: string
  [key: string]: any
}

interface FraudPrediction {
  is_fraud: boolean
  fraud_score: number
  fraud_reason: string
}

// Feature extraction
function extractFeatures(transaction: Transaction): number[] {
  const features = []

  // Amount feature (normalized)
  features.push(Math.min(transaction.transaction_amount / 10000, 1))

  // Channel feature (one-hot encoding)
  const channelFeature = {
    web: 0,
    mobile: 0,
    api: 0,
    pos: 0,
  }
  channelFeature[transaction.transaction_channel] = 1
  features.push(...Object.values(channelFeature))

  // Payment mode feature (one-hot encoding)
  const paymentModeFeature = {
    card: 0,
    upi: 0,
    neft: 0,
    imps: 0,
  }
  paymentModeFeature[transaction.transaction_payment_mode] = 1
  features.push(...Object.values(paymentModeFeature))

  // Time of day feature (0-1 scale)
  const hour = new Date(transaction.transaction_date).getHours()
  features.push(hour / 24)

  // Add more features as needed...

  return features
}

// Simple logistic regression model
function logisticRegression(features: number[], weights: number[]): number {
  // Calculate weighted sum
  let z = 0
  for (let i = 0; i < features.length; i++) {
    z += features[i] * weights[i]
  }

  // Apply sigmoid function
  return 1 / (1 + Math.exp(-z))
}

// Pretrained weights (in a real system, these would come from model training)
const weights = [
  0.8, // Amount weight
  0.3, // Web channel
  0.1, // Mobile channel
  0.5, // API channel
  0.2, // POS channel
  0.4, // Card payment
  0.1, // UPI payment
  0.2, // NEFT payment
  0.3, // IMPS payment
  0.2, // Time of day
]

// Main prediction function
export function predictFraud(transaction: Transaction): FraudPrediction {
  // Extract features
  const features = extractFeatures(transaction)

  // Get prediction score
  const score = logisticRegression(features, weights)

  // Determine fraud reason based on features
  let reason = ""
  if (score > 0.7) {
    if (transaction.transaction_amount > 5000) {
      reason += "High transaction amount. "
    }

    if (transaction.transaction_channel === "web") {
      reason += "Web channel has higher risk. "
    }

    if (transaction.transaction_payment_mode === "card") {
      reason += "Card payment has higher risk. "
    }

    // Add more reasons based on other features

    if (!reason) {
      reason = "Multiple risk factors combined."
    }
  }

  return {
    is_fraud: score > 0.7,
    fraud_score: score,
    fraud_reason: reason.trim(),
  }
}

