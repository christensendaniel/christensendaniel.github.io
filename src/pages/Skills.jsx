import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Skills() {
  return (
    <Layout>
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">Technical Skills & Expertise</h1>
          <p className="page-subtitle">Full-stack data engineering capabilities across modern technologies and platforms</p>
        </div>
      </header>

      <nav className="main-nav">
        <div className="container">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">← Back to Home</Link></li>
            <li><a href="#programming" className="nav-link">Programming</a></li>
            <li><a href="#data-platforms" className="nav-link">Data Platforms</a></li>
            <li><a href="#cloud" className="nav-link">Cloud & DevOps</a></li>
            <li><a href="#tools" className="nav-link">Tools & Frameworks</a></li>
          </ul>
          <button className="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
            <span className="theme-toggle-icon">🌙</span>
          </button>
        </div>
      </nav>

      <main>
        <section id="programming" className="section">
          <div className="container">
            <h2 className="section-title">Programming & Development</h2>
            <div className="skills-grid">
              <div className="skill-card">
                <h3 className="skill-category">Core Languages</h3>
                <div className="skill-technologies">Python, SQL, JavaScript, Java, Bash, R</div>
                <p className="skill-notes">7+ years Python expertise with focus on data engineering, ETL/ELT pipelines, and API development. Advanced SQL optimization for complex analytical queries.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Web Frameworks</h3>
                <div className="skill-technologies">FastAPI, Flask, Django, Express.js</div>
                <p className="skill-notes">Built production APIs handling 2M+ requests/month. REST API design, OAuth 2.0 implementation, and microservices architecture.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Data Processing</h3>
                <div className="skill-technologies">Pandas, NumPy, PySpark, Dask, Polars</div>
                <p className="skill-notes">Large-scale data manipulation and transformation. Optimized processing for datasets with billions of records.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="data-platforms" className="section section-alt">
          <div className="container">
            <h2 className="section-title">Data Platforms & Warehouses</h2>
            <div className="skills-grid">
              <div className="skill-card highlight">
                <h3 className="skill-category">Cloud Data Warehouses</h3>
                <div className="skill-technologies">Snowflake, BigQuery, Redshift, Azure Synapse</div>
                <p className="skill-notes">Expert in Snowflake optimization - achieved 30% performance improvements. Clustering strategies, warehouse sizing, and cost management.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Databases</h3>
                <div className="skill-technologies">PostgreSQL, MySQL, SQL Server, MongoDB, DynamoDB, Redis</div>
                <p className="skill-notes">Relational and NoSQL database design. Query optimization, indexing strategies, and performance tuning.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Streaming Platforms</h3>
                <div className="skill-technologies">Apache Kafka, AWS Kinesis, Azure Event Hubs, Apache Pulsar</div>
                <p className="skill-notes">Real-time data streaming architectures with sub-2-minute latency. Event-driven systems and stream processing.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Processing Engines</h3>
                <div className="skill-technologies">Apache Flink, Apache Spark, Apache Beam, Databricks</div>
                <p className="skill-notes">Distributed computing for batch and stream processing. Built production Flink pipelines for real-time analytics.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="cloud" className="section">
          <div className="container">
            <h2 className="section-title">Cloud Platforms & DevOps</h2>
            <div className="skills-grid">
              <div className="skill-card">
                <h3 className="skill-category">AWS Services</h3>
                <div className="skill-technologies">Lambda, S3, ECS, Fargate, ECR, EC2, Kinesis, Glue, Athena, RDS</div>
                <p className="skill-notes">Serverless architectures, container orchestration, and data lake solutions. Cost-optimized cloud deployments.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Azure Services</h3>
                <div className="skill-technologies">App Service, AKS, Event Hubs, Azure ML, Data Factory, Functions</div>
                <p className="skill-notes">Enterprise Azure deployments. Built production FastAPI platforms on Azure handling millions of requests.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Containerization & Orchestration</h3>
                <div className="skill-technologies">Docker, Kubernetes, Helm, Docker Compose</div>
                <p className="skill-notes">Containerized microservices deployment. Multi-stage Docker builds and K8s cluster management.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">CI/CD & IaC</h3>
                <div className="skill-technologies">GitHub Actions, Azure DevOps, Terraform, CloudFormation, Ansible</div>
                <p className="skill-notes">Automated deployment pipelines. Infrastructure as Code for reproducible environments.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="section section-alt">
          <div className="container">
            <h2 className="section-title">Tools & Frameworks</h2>
            <div className="skills-grid">
              <div className="skill-card">
                <h3 className="skill-category">Orchestration & Workflow</h3>
                <div className="skill-technologies">Apache Airflow, Prefect, Dagster, Luigi, Argo Workflows</div>
                <p className="skill-notes">Complex DAG design and workflow orchestration. Production Airflow deployments with custom operators.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Data Transformation</h3>
                <div className="skill-technologies">dbt, Apache NiFi, Talend, Apache Hop</div>
                <p className="skill-notes">ELT/ETL pipeline development. Data modeling and transformation at scale.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">API Integrations</h3>
                <div className="skill-technologies">Facebook Ads, Google Ads, HubSpot, Salesforce, Stripe, Twilio</div>
                <p className="skill-notes">Built custom connectors and OAuth flows. Saved 200+ hours/month through API automation.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Visualization & BI</h3>
                <div className="skill-technologies">Metabase, Tableau, Looker, Power BI, Grafana, Plotly, D3.js</div>
                <p className="skill-notes">End-to-end dashboard development. Real-time monitoring and business intelligence solutions.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Monitoring & Observability</h3>
                <div className="skill-technologies">DataDog, CloudWatch, Prometheus, ELK Stack, New Relic</div>
                <p className="skill-notes">Production monitoring and alerting. Custom metrics and observability dashboards.</p>
              </div>
              
              <div className="skill-card">
                <h3 className="skill-category">Data Formats & Protocols</h3>
                <div className="skill-technologies">Parquet, Avro, ORC, Protocol Buffers, JSON, CSV, XML</div>
                <p className="skill-notes">Optimized data serialization for storage and transmission. Schema evolution and compatibility.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="container">
            <h2 className="section-title">Professional Development</h2>
            <div className="skills-grid">
              <div className="skill-card cert-card">
                <h3 className="skill-category">Focus Areas</h3>
                <div className="skill-technologies">Real-time Analytics, Cost Optimization, Performance Tuning</div>
                <p className="skill-notes">Continuous learning in emerging data technologies, cloud-native architectures, and ML engineering practices.</p>
              </div>
              
              <div className="skill-card cert-card">
                <h3 className="skill-category">Industry Expertise</h3>
                <div className="skill-technologies">Entertainment, E-commerce, Marketing Analytics, SaaS</div>
                <p className="skill-notes">Cross-industry experience delivering data solutions for Fortune 500 companies and startups.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Skills;
