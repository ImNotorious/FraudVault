import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/login-button"


const Index = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">FDAM</span>
            </Link>
          </div>
          <div className="flex items-center justify-end space-x-4">
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 items-center lg:items-start">
              <div className="space-y-2 text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Fraud Detection, Alert, and Monitoring
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Protect your payment gateway with our advanced AI-powered fraud detection system. Combine expert rules
                  with machine learning for better fraud prevention.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row items-center lg:items-start">
                <LoginButton size="lg" className="px-8">
                  Get Started
                </LoginButton>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background p-8 rounded-xl shadow-lg w-[80%] h-[80%] flex flex-col justify-center items-center">
                    <div className="space-y-2 text-center">
                      <h3 className="text-2xl font-bold">Real-time Detection</h3>
                      <p className="text-muted-foreground">
                        Our system detects fraudulent transactions in real-time with high accuracy.
                      </p>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <LoginButton>Try Now</LoginButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive fraud detection system offers a range of powerful features to protect your payment
                gateway.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Real-time Detection</h3>
              <p className="text-center text-muted-foreground">
                Detect fraudulent transactions in real-time with an average latency of less than 300ms.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M20 17a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2" />
                  <path d="M14 13V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6" />
                  <path d="M12 19a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2" />
                  <path d="M14 21V7" />
                  <path d="M20 21V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI + Rule Engine</h3>
              <p className="text-center text-muted-foreground">
                Combine the power of AI models with expert rules for better fraud detection.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Advanced Analytics</h3>
              <p className="text-center text-muted-foreground">
                Comprehensive dashboard with real-time analytics and visualization of fraud patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Secure Your Payment Gateway?
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with our fraud detection system today and protect your business from fraudulent
                transactions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row items-center">
              <LoginButton size="lg" className="px-8">
                Get Started Now
              </LoginButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <span className="font-bold">FDAM</span>
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
            <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} FDAM. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;