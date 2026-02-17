import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SEO, { StructuredData } from '../components/SEO'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Mail, Linkedin, Github, Package, FileText } from 'lucide-react'

function Home() {
  // Structured data for the person schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Daniel Christensen",
    "url": "https://christensendaniel.com",
    "jobTitle": "Full Stack Data Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "The Walt Disney Company"
    },
    "knowsAbout": [
      "Data Engineering", "LLM Integration", "AI Agents",
      "Python", "Snowflake", "AWS", "Apache Kafka", "dbt",
      "Apache Flink", "Real-time Analytics", "ETL", "Streaming Data"
    ],
    "sameAs": [
      "https://github.com/christensendaniel"
    ]
  }

  return (
    <Layout>
      <SEO
        title="Full Stack Data Engineer"
        description="Daniel Christensen - Full Stack Data Engineer specializing in data pipelines, LLM integration, AI agents, and cloud architecture. 7+ years Python, Snowflake, AWS, Azure."
        canonical="/"
        keywords="data engineer, LLM integration, AI agents, Python, Snowflake, AWS, Azure, data pipelines, ETL, Apache Flink, real-time analytics"
      />
      <StructuredData data={personSchema} />
      <header className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Daniel B. Christensen
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Full Stack Data Engineer specializing in scalable data pipelines, real-time analytics, and cloud-native solutions
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Full stack data engineer with 7+ years of expertise in batch and streaming pipelines, real-time analytics, and building cloud-native solutions on AWS and Azure. Experienced in Python, Java, SQL, and modern data tools including Apache Flink, Snowflake, and Kubernetes. Currently optimizing enterprise-scale data infrastructure at The Walt Disney Company, achieving 30% performance improvements and significant cost reductions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base text-muted-foreground">
              <span className="flex items-center gap-2">
                🏢 The Walt Disney Company
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                📍 Senior Data Engineer
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button asChild size="lg">
                <a href="mailto:contact@christensendaniel.com">Get In Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground">
              I'm Daniel B. Christensen, a senior data engineer with over 7 years of experience designing and implementing mission-critical data pipelines and real-time data platforms. Currently working full-time with <strong className="text-foreground">The Walt Disney Company</strong>, where I've improved event-based data query performance by 30% and significantly reduced Snowflake compute costs through advanced performance tuning and optimization strategies.
            </p>
            
            <p className="text-muted-foreground">
              My expertise spans the entire data lifecycle—from ingestion and transformation to modeling and visualization. I've built sub-2-minute latency streaming infrastructures using Apache Flink, managed ETL/ELT pipelines processing millions of records monthly, and architected FastAPI platforms handling 2M+ requests per month. I specialize in creating scalable, reliable systems using Python, Apache Airflow, Apache Flink, Snowflake, FastAPI, and cloud platforms like AWS and Azure.
            </p>
            
            <p className="text-muted-foreground">
              Beyond technical implementation, I bring leadership and mentorship to teams, optimizing workflows and delivering data solutions that drive measurable business value. My approach combines robust engineering practices with a focus on cost optimization, performance tuning, and maintainability.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">7+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2M+</div>
                  <div className="text-sm text-muted-foreground">Requests/Month</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30%</div>
                  <div className="text-sm text-muted-foreground">Cost Reduction</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">&lt;2min</div>
                  <div className="text-sm text-muted-foreground">Pipeline Latency</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="expertise" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Expertise</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🔧</div>
                <CardTitle>Data Pipeline Engineering</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong className="text-foreground">Real-time & Batch Processing</strong>
                  <p className="text-sm text-muted-foreground">Built event-driven pipelines with &lt;2-minute latency using Apache Flink</p>
                </div>
                <div>
                  <strong className="text-foreground">Scale</strong>
                  <p className="text-sm text-muted-foreground">Architected systems handling 2M+ requests/month and 5M+ row syncs</p>
                </div>
                <div>
                  <strong className="text-foreground">Orchestration</strong>
                  <p className="text-sm text-muted-foreground">Expert in Apache Airflow, Cron, and workflow automation</p>
                </div>
                <div>
                  <strong className="text-foreground">Cost Optimization</strong>
                  <p className="text-sm text-muted-foreground">Reduced Snowflake compute costs by 30% through query optimization and warehouse management</p>
                </div>
                <div>
                  <strong className="text-foreground">Performance Tuning</strong>
                  <p className="text-sm text-muted-foreground">Expert in Snowflake performance optimization, clustering strategies, and cost management</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">💻</div>
                <CardTitle>Technical Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">Python</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">SQL</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">JavaScript</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">Bash</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">R</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Data Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20">Snowflake</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20">BigQuery</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20">PostgreSQL</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20">SQL Server</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">Apache Flink</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">Apache Airflow</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">FastAPI</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">Django</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">dbt</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">Docker</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">Kubernetes</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Cloud Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border">AWS</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border">Azure</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border">GitHub Actions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="experience" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Professional Experience</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">The Walt Disney Company</CardTitle>
                    <CardDescription className="text-base font-medium text-foreground mt-1">Senior Data Engineer</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">July 2024 – Present</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Improve event-based data query performance by <strong className="text-foreground">30%</strong> through advanced Snowflake optimization techniques</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Implement comprehensive Snowflake cost management strategies, reducing compute costs while maintaining performance SLAs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Design and deploy real-time data pipelines using <strong className="text-foreground">Apache Flink</strong> for streaming analytics</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Execute performance tuning initiatives including clustering strategies, query optimization, and warehouse sizing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Build and maintain data models for ML workflows, ensuring SLA adherence</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Orchestrate data ingestion workflows using Apache Airflow with enhanced monitoring and visibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">SAVVBI</CardTitle>
                    <CardDescription className="text-base font-medium text-foreground mt-1">Senior Data Engineer</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">June 2023 – July 2024</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Architected full-stack data solutions: ingestion, modeling, visualization</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Built real-time event-driven reporting with <strong className="text-foreground">&lt;2-minute latency</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Scaled batch/streaming pipelines handling thousands of daily events</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Created comprehensive data-validation alerts and dashboards</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Mentored engineers in scalable pipeline design and monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">VIVBI</CardTitle>
                    <CardDescription className="text-base font-medium text-foreground mt-1">Senior Data Engineer</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">January 2018 – June 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Built FastAPI ingestion platform on Azure handling <strong className="text-foreground">2M+ requests/month</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Integrated with FB, Google Ads, AdRoll APIs—saving <strong className="text-foreground">200+ hrs/month</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Deployed services via Docker, GitHub Actions, AWS/Azure</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Built MS Dynamics & POS integration pipelines syncing <strong className="text-foreground">5M+ rows/month</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Developed client-facing iOS app using Retool, AWS, Postgres, Lambda</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Managed SQL transformations across multiple platforms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Data Projects & Open Source</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-3">📦</div>
                <CardTitle className="text-lg">paged-list</CardTitle>
                <CardDescription className="text-sm">
                  Developed and published an open-source Python package for efficient pagination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Streamlined static list pagination for large datasets</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Published on PyPI with comprehensive documentation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Actively maintained with regular updates</span>
                  </li>
                </ul>
                <Button asChild variant="link" className="p-0 h-auto">
                  <a href="https://pypi.org/project/paged-list/">View on PyPI →</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-3">🚀</div>
                <CardTitle className="text-lg">Real-Time Analytics Pipeline</CardTitle>
                <CardDescription className="text-sm">
                  Designed and deployed enterprise streaming architecture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Reduced event processing latency to under 2 minutes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Built custom Apache Flink operators for Snowflake integration</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Achieved 30% query performance improvement</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Processed millions of events daily with 99.9% uptime</span>
                  </li>
                </ul>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link to="/portfolio/data-engineering">View Public Projects →</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-3">🔄</div>
                <CardTitle className="text-lg">Multi-Source Data Platform</CardTitle>
                <CardDescription className="text-sm">
                  Architected and built FastAPI-based integration platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Handles 2M+ API requests per month</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Integrated Facebook, Google Ads, and AdRoll APIs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Saved 200+ manual hours monthly through automation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Deployed on Azure with auto-scaling capabilities</span>
                  </li>
                </ul>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link to="/portfolio/data-engineering">View Case Study →</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-3">📝</div>
                <CardTitle className="text-lg">Technical Blog</CardTitle>
                <CardDescription className="text-sm">
                  Share insights on data engineering best practices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Real-world implementation guides</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Performance optimization techniques</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Cloud cost reduction strategies</span>
                  </li>
                </ul>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link to="/blog">Read Blog →</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-3">💼</div>
                <CardTitle className="text-lg">Enterprise Data Sync</CardTitle>
                <CardDescription className="text-sm">
                  Implemented robust ETL pipeline for retail systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Syncs 5M+ rows monthly between MS Dynamics and POS</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Achieved 99.9% reliability with error handling</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Built comprehensive monitoring and alerting</span>
                  </li>
                </ul>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link to="/portfolio/data-engineering">View Portfolio →</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-3">🛠️</div>
                <CardTitle className="text-lg">Technical Skills</CardTitle>
                <CardDescription className="text-sm">
                  Comprehensive overview of my technical expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>40+ technologies and platforms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Cloud, streaming, and orchestration tools</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Detailed proficiency levels and use cases</span>
                  </li>
                </ul>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link to="/skills">View Skills →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="education" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Education</h2>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-5xl">🎓</div>
                <div className="flex-1">
                  <CardTitle className="text-2xl">Bachelor of Science in Economics</CardTitle>
                  <CardDescription className="text-base mt-2 space-y-1">
                    <div className="text-foreground font-medium">University of Utah</div>
                    <div>Graduated May 2017</div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground border border-secondary/30 mt-2">
                      Minor in Business
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <h4 className="font-semibold text-lg mb-4">Relevant Coursework</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h5 className="font-medium text-sm text-primary">Core Economics & Statistics</h5>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Econometrics and statistical analysis of economic data</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Bayesian statistics and probability modeling</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Linear and predictive modeling techniques</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-sm text-primary">Applied Data Analysis</h5>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Statistical programming and data visualization in R</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Multivariate regression analysis and time series modeling</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Economic research methodology and data collection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Let's Connect</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            While I'm currently fully engaged at The Walt Disney Company and not available for hire, I highly recommend <a href="https://savvbi.com" className="text-primary hover:underline">SAVVBI</a> for your AI and data engineering needs. They excel at:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">🤖</span>
              <span className="text-sm text-muted-foreground">AI & Machine Learning Solutions</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">⚡</span>
              <span className="text-sm text-muted-foreground">Scalable Data Pipelines</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">📊</span>
              <span className="text-sm text-muted-foreground">Real-time Data Processing</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">🔧</span>
              <span className="text-sm text-muted-foreground">Data Infrastructure Optimization</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">💰</span>
              <span className="text-sm text-muted-foreground">Cloud Cost Optimization</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">📈</span>
              <span className="text-sm text-muted-foreground">Advanced Analytics</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">🔒</span>
              <span className="text-sm text-muted-foreground">Data Security & Compliance</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2">🎯</span>
              <span className="text-sm text-muted-foreground">MLOps & Model Deployment</span>
            </div>
          </div>
          
          <Card className="max-w-2xl mx-auto mb-12">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                <strong className="text-foreground">Looking for expert data engineering services?</strong><br />
                I recommend reaching out to <a href="https://savvbi.com" className="text-primary hover:underline">SAVVBI</a> - they have an exceptional team capable of delivering enterprise-grade AI and data engineering solutions.
              </p>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button variant="outline" asChild>
              <a href="mailto:contact@christensendaniel.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://linkedin.com/in/dbchristensen" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/christensendaniel" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://pypi.org/project/paged-list/" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>PyPI</span>
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://medium.com/@christensen-danielb" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Medium</span>
              </a>
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Feel free to connect with me on <a href="https://linkedin.com/in/dbchristensen" className="text-primary hover:underline font-medium">LinkedIn</a> to discuss data engineering, technology trends, or potential open-source collaborations.
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Home
