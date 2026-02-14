import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { ArrowLeft } from 'lucide-react';

function Skills() {
  return (
    <Layout>
      <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills & Expertise</h1>
          <p className="text-xl text-muted-foreground">Full-stack data engineering capabilities across modern technologies and platforms</p>
        </div>
      </header>

      <main>
        <section id="programming" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Programming & Development</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Core Languages</CardTitle>
                  <CardDescription>Python, SQL, JavaScript, Java, Bash, R</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  7+ years Python expertise with focus on data engineering, ETL/ELT pipelines, and API development. Advanced SQL optimization for complex analytical queries.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Web Frameworks</CardTitle>
                  <CardDescription>FastAPI, Flask, Django, Express.js</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Built production APIs handling 2M+ requests/month. REST API design, OAuth 2.0 implementation, and microservices architecture.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Processing</CardTitle>
                  <CardDescription>Pandas, NumPy, PySpark, Dask, Polars</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Large-scale data manipulation and transformation. Optimized processing for datasets with billions of records.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="data-platforms" className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Data Platforms & Warehouses</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Cloud Data Warehouses</CardTitle>
                  <CardDescription>Snowflake, BigQuery, Redshift, Azure Synapse</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Expert in Snowflake optimization - achieved 30% performance improvements. Clustering strategies, warehouse sizing, and cost management.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Databases</CardTitle>
                  <CardDescription>PostgreSQL, MySQL, SQL Server, MongoDB, DynamoDB, Redis</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Relational and NoSQL database design. Query optimization, indexing strategies, and performance tuning.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Streaming Platforms</CardTitle>
                  <CardDescription>Apache Kafka, AWS Kinesis, Azure Event Hubs, Apache Pulsar</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Real-time data streaming architectures with sub-2-minute latency. Event-driven systems and stream processing.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Processing Engines</CardTitle>
                  <CardDescription>Apache Flink, Apache Spark, Apache Beam, Databricks</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Distributed computing for batch and stream processing. Built production Flink pipelines for real-time analytics.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="cloud" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Cloud Platforms & DevOps</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AWS Services</CardTitle>
                  <CardDescription>Lambda, S3, ECS, Fargate, ECR, EC2, Kinesis, Glue, Athena, RDS</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Serverless architectures, container orchestration, and data lake solutions. Cost-optimized cloud deployments.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Azure Services</CardTitle>
                  <CardDescription>App Service, AKS, Event Hubs, Azure ML, Data Factory, Functions</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Enterprise Azure deployments. Built production FastAPI platforms on Azure handling millions of requests.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Containerization</CardTitle>
                  <CardDescription>Docker, Kubernetes, Helm, Docker Compose</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Containerized microservices deployment. Multi-stage Docker builds and K8s cluster management.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">CI/CD & IaC</CardTitle>
                  <CardDescription>GitHub Actions, Azure DevOps, Terraform, CloudFormation, Ansible</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Automated deployment pipelines. Infrastructure as Code for reproducible environments.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="tools" className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Tools & Frameworks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Orchestration & Workflow</CardTitle>
                  <CardDescription>Apache Airflow, Prefect, Dagster, Luigi, Argo Workflows</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Complex DAG design and workflow orchestration. Production Airflow deployments with custom operators.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Transformation</CardTitle>
                  <CardDescription>dbt, Apache NiFi, Talend, Apache Hop</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  ELT/ETL pipeline development. Data modeling and transformation at scale.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Integrations</CardTitle>
                  <CardDescription>Facebook Ads, Google Ads, HubSpot, Salesforce, Stripe, Twilio</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Built custom connectors and OAuth flows. Saved 200+ hours/month through API automation.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visualization & BI</CardTitle>
                  <CardDescription>Metabase, Tableau, Looker, Power BI, Grafana, Plotly, D3.js</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  End-to-end dashboard development. Real-time monitoring and business intelligence solutions.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monitoring & Observability</CardTitle>
                  <CardDescription>DataDog, CloudWatch, Prometheus, ELK Stack, New Relic</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Production monitoring and alerting. Custom metrics and observability dashboards.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Formats</CardTitle>
                  <CardDescription>Parquet, Avro, ORC, Protocol Buffers, JSON, CSV, XML</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Optimized data serialization for storage and transmission. Schema evolution and compatibility.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="certifications" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Professional Development</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Focus Areas</CardTitle>
                  <CardDescription>Real-time Analytics, Cost Optimization, Performance Tuning</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Continuous learning in emerging data technologies, cloud-native architectures, and ML engineering practices.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Industry Expertise</CardTitle>
                  <CardDescription>Entertainment, E-commerce, Marketing Analytics, SaaS</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Cross-industry experience delivering data solutions for Fortune 500 companies and startups.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Skills;
