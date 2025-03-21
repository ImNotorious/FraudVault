import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/login-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BarChart3, AlertTriangle, Database, Sliders, Layers } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">FraudVault</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/features">
                <Button variant="ghost">Features</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <LoginButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Comprehensive Fraud Detection Features
              </h1>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Our Fraud Detection, Alert, and Monitoring (FDAM) system offers a complete suite of tools to protect your payment gateway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>Real-time Fraud Detection</CardTitle>
                </div>
                <CardDescription>
                  Detect fraudulent transactions in real-time with high accuracy and low latency.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Average response time under 300ms</li>
                  <li>Combines rule-based and AI-powered detection</li>
                  <li>Stores all transaction data for analysis</li>
                  <li>Provides detailed fraud reasons and scores</li>
                </ul>
              </CardContent>
              <CardFooter>
                <LoginButton className="w-full">Try It Now</LoginButton>
              </CardFooter>
            </Card>

            {/* Feature 2 */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Layers className="h-6 w-6 text-primary" />
                  <CardTitle>Batch Processing</CardTitle>
                </div>
                <CardDescription>
                  Process multiple transactions in parallel for efficient fraud detection.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Parallel processing for high throughput</li>
                  <li>Utilizes the same detection engine as real-time API</li>
                  <li>Scales based on server resources</li>
                  <li>Structured response format for easy integration</li>
                </ul>
              </CardContent>
              <CardFooter>
                <LoginButton className="w-full">Try It Now</LoginButton>
              </CardFooter>
            </Card>

            {/* Feature 3 */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  <CardTitle>Fraud Reporting</CardTitle>
                </div>
                <CardDescription>
                  Report fraudulent transactions and track their status.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Simple API for reporting fraud</li>
                  <li>Acknowledgment system for reports</li>
                  <li>Detailed reporting with entity tracking</li>
                  <li>Integration with detection system for feedback</li>
                </ul>
              </CardContent>
              <CardFooter>
                <LoginButton className="w-full">Try It Now</LoginButton>
              </CardFooter>
            </Card>

            {/* Feature 4 */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sliders className="h-6 w-6 text-primary" />
                  <CardTitle>Rule Engine</CardTitle>
                </div>
                <CardDescription>
                  Configure custom rules for fraud detection with an intuitive interface.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Visual rule configuration</li>
                  <li>Priority-based rule evaluation</li>
                  <li>Enable/disable rules on demand</li>
                  <li>Detailed rule conditions and actions</li>
                </ul>
              </CardContent>
              <CardFooter>
                <LoginButton className="w-full">Try It Now</LoginButton>
              </CardFooter>
            </Card>

            {/* Feature 5 */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-6 w-6 text-primary" />
                  <CardTitle>Transaction Monitoring</CardTitle>
                </div>
                <CardDescription>
                  View and analyze all transactions with powerful filtering capabilities.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Comprehensive transaction table</li>
                  <li>Advanced filtering by multiple parameters</li>
                  <li>Search by transaction ID or user</li>
                  <li>Fraud status indicators and scores</li>
                </ul>
              </CardContent>
              <CardFooter>
                <LoginButton className="w-full">Try It Now</LoginButton>
              </CardFooter>
            </Card>

            {/* Feature 6 */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <CardTitle>Advanced Analytics</CardTitle>
                </div>
                <CardDescription>
                  Visualize fraud patterns and trends with interactive charts and graphs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Time series analysis of fraud trends</li>
                  <li>Dimension-based fraud analysis</li>
                  <li>Comparison of predicted vs reported frauds</li>
                  <li>Model evaluation metrics and confusion matrix</li>
                </ul>
              </CardContent>
              <CardFooter>
                <LoginButton className="w-full">Try It Now</LoginButton>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Technical Specifications
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Our system is built with performance, scalability, and security in mind.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>API Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">\
                  <li>Real-time API latency 300ms</li>
                  <li>Batch processing with parallel execution</li>
                  <li>Optimized database queries</li>
                  <li>Caching for frequently accessed data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Model</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Machine learning-based fraud detection</li>
                  <li>Feature extraction from transaction data</li>
                  <li>Continuous model improvement</li>
                  <li>Explainable AI for fraud reasons</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>MongoDB for flexible schema</li>
                  <li>Efficient storage of transaction data</li>
                  <li>Indexing for fast queries</li>
                  <li>Secure connection with authentication</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Firebase authentication</li>
                  <li>Role-based access control</li>
                  <li>Encrypted data transmission</li>
                  <li>Secure API endpoints</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Responsive Material theme design</li>
                  <li>Interactive dashboards and charts</li>
                  <li>Real-time data updates</li>
                  <li>Optimized for desktop and mobile</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>RESTful API endpoints</li>
                  <li>JSON request/response format</li>
                  <li>Webhook support for notifications</li>
                  <li>Comprehensive API documentation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Secure Your Payment Gateway?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with our fraud detection system today and protect your business from fraudulent transactions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <LoginButton size="lg" className="px-8">
                Get Started Now
              </LoginButton>
              <Link href="/about">
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <span className="font-bold">FraudVault</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact Us
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FraudVault. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

