import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO, { StructuredData } from '../components/SEO';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Linkedin, Mail, MessageSquare } from 'lucide-react';

function Contact() {
  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://christensendaniel.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://christensendaniel.com/contact/" }
    ]
  }

  return (
    <Layout>
      <SEO
        title="Contact - Get In Touch"
        description="Connect with Daniel Christensen for professional inquiries, collaboration opportunities, or data engineering consulting. Reach out via LinkedIn or email."
        canonical="/contact/"
        keywords="contact, data engineer, professional inquiries, consulting, collaboration"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Get In Touch</h1>
          <p className="text-xl text-muted-foreground text-center">Let's discuss opportunities and collaborations</p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground text-center mb-12">
              I'm always interested in connecting with fellow data engineers, being a guest on podcasts, or discussing general data engineering design and architecture.
              Feel free to reach out through any of the channels below.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* LinkedIn - Preferred Method */}
              <Card className="border-primary/50 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Linkedin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>LinkedIn</CardTitle>
                      <CardDescription className="text-primary font-medium">Preferred Method</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Connect with me on LinkedIn for professional networking, podcast invitations, discussing data engineering design, or just to say hello.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <a 
                      href="https://linkedin.com/in/dbchristensen" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-5 w-5" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <Mail className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <CardTitle>Email</CardTitle>
                      <CardDescription>Direct Communication</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Send me an email for podcast invitations, discussing data engineering topics, or general inquiries.
                  </p>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <a 
                      href="mailto:contact@christensendaniel.com"
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-5 w-5" />
                      Send an Email
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Information */}
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <MessageSquare className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle>What I Can Help With</CardTitle>
                    <CardDescription>Areas of expertise and collaboration</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Being a guest on podcasts about data engineering and technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Discussing data engineering architecture and design patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Real-time streaming data solutions with Apache Flink and Kafka</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Cloud infrastructure optimization (AWS, Azure, Snowflake)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>LLM integration and AI agent development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Professional networking and collaboration opportunities</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-muted">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">For consulting services:</strong> If you need consulting beyond general conversation, 
                    I recommend reaching out to{' '}
                    <a 
                      href="https://savvbi.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      SAVVBI
                    </a>
                    {' '}for professional AI and data engineering services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                I typically respond within 1-2 business days. For urgent matters, please indicate so in your message.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Contact;
