import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SEO, { StructuredData } from '../components/SEO'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

function Portfolio() {
  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://christensendaniel.com/" },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://christensendaniel.com/portfolio/" }
    ]
  }

  return (
    <Layout>
      <SEO
        title="Portfolio - Data Engineering Projects"
        description="Showcase of data engineering projects, case studies, and technical achievements. Enterprise-scale solutions with proven results."
        canonical="/portfolio/"
        keywords="data engineering portfolio, case studies, technical projects, enterprise solutions, data pipelines, cloud architecture"
      />
      <StructuredData data={breadcrumbSchema} />
      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Engineering Portfolio</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">Case Studies & Technical Achievements</p>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground">
              <span>7+ Years Experience</span>
              <span>•</span>
              <span>Enterprise Scale Solutions</span>
              <span>•</span>
              <span>Proven Results</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Summary Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Summary</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I specialize in designing robust data pipelines, real-time streaming architectures, and full-stack analytics solutions. My work spans data ingestion, modeling, orchestration, cloud deployment, and visualization—delivering end-to-end systems that power business intelligence and ML workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Case Studies & Technical Achievements</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {/* Highlighted Case Study */}
              <Card className="border-primary border-2 md:col-span-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🚀</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl md:text-2xl mb-2">High-Performance Event Processing at Disney</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong className="text-sm font-semibold text-primary">CHALLENGE:</strong>
                    <p className="text-muted-foreground">Slow query performance on event-based data impacting downstream analytics</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">SOLUTION:</strong>
                    <p className="text-muted-foreground">Redesigning data models and optimizing Snowflake queries</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">IMPACT:</strong>
                    <p className="text-muted-foreground">30% performance improvement, significant cost reduction</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">TECHNOLOGIES:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Snowflake</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">Apache Airflow</Badge>
                      <Badge variant="secondary">SQL</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case Study 2 */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">📊</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">Real-Time Reporting Infrastructure</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong className="text-sm font-semibold text-primary">CHALLENGE:</strong>
                    <p className="text-muted-foreground">Business needed near real-time visibility into operational metrics</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">SOLUTION:</strong>
                    <p className="text-muted-foreground">Built event-driven pipeline with streaming architecture</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">IMPACT:</strong>
                    <p className="text-muted-foreground">Sub-2-minute data latency from source to dashboard</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">TECHNOLOGIES:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Apache Kafka</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">PostgreSQL</Badge>
                      <Badge variant="secondary">Metabase</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case Study 3 */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🔄</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">Multi-Source Data Integration Platform</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong className="text-sm font-semibold text-primary">CHALLENGE:</strong>
                    <p className="text-muted-foreground">Manual reporting consuming 200+ hours monthly across marketing channels</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">SOLUTION:</strong>
                    <p className="text-muted-foreground">Built FastAPI platform integrating FB, Google Ads, AdRoll APIs</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">IMPACT:</strong>
                    <p className="text-muted-foreground">Fully automated reporting, 2M+ requests/month capacity</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">TECHNOLOGIES:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">FastAPI</Badge>
                      <Badge variant="secondary">Azure</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">REST APIs</Badge>
                      <Badge variant="secondary">Docker</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case Study 4 */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">💼</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">Enterprise Data Synchronization</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong className="text-sm font-semibold text-primary">CHALLENGE:</strong>
                    <p className="text-muted-foreground">Sync millions of rows between MS Dynamics and POS systems</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">SOLUTION:</strong>
                    <p className="text-muted-foreground">Designed robust ETL pipeline with error handling and monitoring</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">IMPACT:</strong>
                    <p className="text-muted-foreground">5M+ rows synced monthly with 99.9% reliability</p>
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-primary">TECHNOLOGIES:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">SQL Server</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">Airflow</Badge>
                      <Badge variant="secondary">Azure</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Deep Dives Section */}
        <section id="technical" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Technical Deep Dives</h2>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-baseline gap-2">
                      <strong className="text-foreground">Pipeline Architecture Patterns:</strong>
                      <em>Coming soon</em>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <strong className="text-foreground">Cost Optimization Strategies:</strong>
                      <em>Coming soon</em>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <strong className="text-foreground">Data Quality Framework:</strong>
                      <em>Coming soon</em>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Open Source Section */}
        <section id="open-source" className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Open Source Contributions</h2>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      📦 paged-list
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge>PyPI Package</Badge>
                      <Badge variant="secondary">Python 3.6+</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <strong className="text-foreground">Description:</strong>
                    <p className="text-muted-foreground">Python package for efficient static pagination and listing functionality</p>
                  </div>
                  <div>
                    <strong className="text-foreground">Usage:</strong>
                    <code className="block mt-2 bg-muted px-4 py-2 rounded text-sm">pip install paged-list</code>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button asChild>
                      <a 
                        href="https://pypi.org/project/paged-list/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on PyPI
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a 
                        href="https://github.com/christensendaniel/paged-list" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills & Technologies Section */}
        <section id="skills" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Core Competencies</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Full-Stack Data Engineering | Batch & Streaming Pipelines | Data Integration | Data Modeling | Real-Time Analytics | API Development | BI Dashboards
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Languages & Frameworks</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Python, SQL, Java, Bash, R | FastAPI, Flask, Django | dbt
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Pipelines & Orchestration</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Apache Airflow | Apache Flink (real-time streaming) | Custom ETL/ELT pipelines in Python
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Formats</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Parquet, Avro, ORC, JSON
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Streaming & Messaging</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Kafka, AWS SQS, Azure Event Hubs, AWS Kinesis
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">APIs & Integrations</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Built custom connectors for Facebook Ads, Google Ads, HubSpot, Keap, ClickFunnels, AdRoll, Wicked Reports, LiveIntent | Implemented OAuth 2.0 flows for secure integrations
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visualization & BI Tools</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Metabase, Tableau, Looker, Power BI, Domo | Matplotlib, Plotly, Dash | Built custom dashboards for analytics & monitoring
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cloud Platforms</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  AWS (Lambda, S3, ECS, Fargate, ECR, EC2, Kinesis) | Azure (App Service, AKS, Event Hubs, Azure ML) | Kubernetes, Docker
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">CI/CD & DevOps</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  GitHub Actions, Azure DevOps | Automated deployments for microservices & pipelines
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monitoring & Observability</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  DataDog, CloudWatch | Custom alerting and observability dashboards
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Portfolio
