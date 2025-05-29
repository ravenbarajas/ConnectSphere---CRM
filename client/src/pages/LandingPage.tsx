import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Clock, Send, BarChart3, Tag, Star, Zap } from 'lucide-react';

export default function LandingPage() {
  const { login } = useAuth();

  const features = [
    {
      icon: Clock,
      title: "Interaction Timeline",
      description: "Track every client touchpoint with a comprehensive timeline view of emails, calls, and meetings.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Send,
      title: "Smart Follow-ups",
      description: "Automate and schedule personalized follow-up messages via email and SMS with intelligent reminders.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: BarChart3,
      title: "Lead Scoring",
      description: "AI-powered lead scoring based on interaction frequency, recency, and client responsiveness patterns.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Tag,
      title: "Notes & Tagging",
      description: "Organize clients with custom tags and quick notes for instant context and smart segmentation.",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Owner, Luxe Beauty Salon",
      content: "ClientPulse transformed how we manage our salon clients. Follow-up automation alone increased our rebooking rate by 40%.",
      avatar: "https://pixabay.com/get/gfe37d93d94f59fabce69581c91257f6db3671ae1aabf0331d6aa27718fe7cb6f6a5c083a1feb4a0a80c0295dea6d80045274ae07373394cba0b77ef854495a05_1280.jpg"
    },
    {
      name: "Michael Chen",
      title: "Partner, Chen & Associates Law",
      content: "The lead scoring feature helped us prioritize high-value prospects. Our conversion rate improved by 60% in just 3 months.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Emma Rodriguez",
      title: "Founder, Strategic Consulting Group",
      content: "Simple, intuitive interface that our entire team adopted immediately. Client notes and tagging keep everyone on the same page.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="ml-3 text-xl font-bold text-slate-900">ClientPulse</h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#features" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#testimonials" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">Testimonials</a>
                <Button variant="ghost" onClick={login} className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">
                  Sign In
                </Button>
                <Button onClick={login} className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Smart Customer <span className="text-primary">Engagement</span> Made Simple
              </h1>
              <p className="mt-6 text-xl text-slate-600 leading-relaxed">
                Empower your small business with intelligent client relationship tools. Track interactions, automate follow-ups, and score leads—all in one intuitive dashboard.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button onClick={login} size="lg" className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold">
                  Try ClientPulse Free
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-slate-300 text-slate-700 hover:border-slate-400 px-8 py-4 rounded-xl text-lg font-semibold">
                  Watch Demo
                </Button>
              </div>
              
              <div className="mt-8 flex items-center text-sm text-slate-500">
                <div className="w-5 h-5 text-green-500 mr-2">✓</div>
                Free 14-day trial • No credit card required • Setup in 5 minutes
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="ClientPulse Dashboard Preview" 
                className="rounded-2xl shadow-2xl w-full" 
              />
              
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-slate-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-slate-700">94% Client Retention</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-slate-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-slate-700">3x Faster Follow-ups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything you need to manage client relationships</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Powerful features designed specifically for small to mid-sized service businesses</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Trusted by growing businesses</h2>
            <p className="text-xl text-slate-600">See how ClientPulse is transforming client relationships</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to transform your client relationships?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of businesses already using ClientPulse to grow smarter.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={login} size="lg" className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-xl text-lg font-semibold">
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-blue-100 text-sm mt-6">✓ 14-day free trial ✓ No setup fees ✓ Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-bold">ClientPulse</h3>
              </div>
              <p className="text-slate-400 max-w-md">Empowering small businesses with smart customer engagement tools that drive growth and build lasting relationships.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ClientPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
