import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

function Portfolio() {
  return (
    <Layout showNavigation={false}>
      <header className="portfolio-header">
        <div className="container">
          <h1 className="portfolio-title">Data Engineering Portfolio</h1>
          <p className="portfolio-subtitle">Case Studies & Technical Achievements</p>
          <div className="portfolio-meta">
            <span>7+ Years Experience</span>
            <span>•</span>
            <span>Enterprise Scale Solutions</span>
            <span>•</span>
            <span>Proven Results</span>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <div className="container">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">← Back to Home</Link></li>
            <li><a href="#case-studies" className="nav-link">Case Studies</a></li>
            <li><a href="#technical" className="nav-link">Technical Deep Dives</a></li>
            <li><a href="#open-source" className="nav-link">Open Source</a></li>
            <li><a href="#skills" className="nav-link">Skills & Tech</a></li>
          </ul>
          <button className="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
            <span className="theme-toggle-icon">🌙</span>
          </button>
        </div>
      </nav>

      <section id="summary" className="section">
        <div className="container">
          <h2 className="section-title">Summary</h2>
          <p>I specialize in designing robust data pipelines, real-time streaming architectures, and full-stack analytics solutions. My work spans data ingestion, modeling, orchestration, cloud deployment, and visualization—delivering end-to-end systems that power business intelligence and ML workflows.</p>
        </div>
      </section>

      <section id="case-studies" className="section">
        <div className="container">
          <h2 className="section-title">Case Studies & Technical Achievements</h2>
          <div className="case-studies-grid">
            <div className="case-study-card highlight">
              <div className="case-study-icon">🚀</div>
              <h3>High-Performance Event Processing at Disney</h3>
              <ul>
                <li><strong>Challenge:</strong> Slow query performance on event-based data impacting downstream analytics</li>
                <li><strong>Solution:</strong> Redesigning data models and optimizing Snowflake queries</li>
                <li><strong>Impact:</strong> 30% performance improvement, significant cost reduction</li>
                <li><strong>Technologies:</strong> Snowflake, Python, Apache Airflow, SQL</li>
              </ul>
            </div>
            <div className="case-study-card">
              <div className="case-study-icon">📊</div>
              <h3>Real-Time Reporting Infrastructure</h3>
              <ul>
                <li><strong>Challenge:</strong> Business needed near real-time visibility into operational metrics</li>
                <li><strong>Solution:</strong> Built event-driven pipeline with streaming architecture</li>
                <li><strong>Impact:</strong> Sub-2-minute data latency from source to dashboard</li>
                <li><strong>Technologies:</strong> Apache Kafka, Python, PostgreSQL, Metabase</li>
              </ul>
            </div>
            <div className="case-study-card">
              <div className="case-study-icon">🔄</div>
              <h3>Multi-Source Data Integration Platform</h3>
              <ul>
                <li><strong>Challenge:</strong> Manual reporting consuming 200+ hours monthly across marketing channels</li>
                <li><strong>Solution:</strong> Built FastAPI platform integrating FB, Google Ads, AdRoll APIs</li>
                <li><strong>Impact:</strong> Fully automated reporting, 2M+ requests/month capacity</li>
                <li><strong>Technologies:</strong> FastAPI, Azure, Python, REST APIs, Docker</li>
              </ul>
            </div>
            <div className="case-study-card">
              <div className="case-study-icon">💼</div>
              <h3>Enterprise Data Synchronization</h3>
              <ul>
                <li><strong>Challenge:</strong> Sync millions of rows between MS Dynamics and POS systems</li>
                <li><strong>Solution:</strong> Designed robust ETL pipeline with error handling and monitoring</li>
                <li><strong>Impact:</strong> 5M+ rows synced monthly with 99.9% reliability</li>
                <li><strong>Technologies:</strong> SQL Server, Python, Airflow, Azure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="technical" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Technical Deep Dives</h2>
          <ul>
            <li><strong>Pipeline Architecture Patterns:</strong> <em>Coming soon</em></li>
            <li><strong>Cost Optimization Strategies:</strong> <em>Coming soon</em></li>
            <li><strong>Data Quality Framework:</strong> <em>Coming soon</em></li>
          </ul>
        </div>
      </section>

      <section id="open-source" className="section">
        <div className="container">
          <h2 className="section-title">Open Source Contributions</h2>
          <div className="open-source-card">
            <div className="os-header">
              <h3>📦 paged-list</h3>
              <div className="os-badges">
                <span className="badge badge-pypi">PyPI Package</span>
                <span className="badge badge-python">Python 3.6+</span>
              </div>
            </div>
            <div className="os-content">
              <p><strong>Description:</strong> Python package for efficient static pagination and listing functionality</p>
              <p><strong>Usage:</strong> <code>pip install paged-list</code></p>
              <div className="os-links">
                <a href="https://pypi.org/project/paged-list/" className="btn btn-primary">View on PyPI</a>
                <a href="https://github.com/christensendaniel/paged-list" className="btn btn-secondary">GitHub Repository</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-matrix">
            <div className="skill-category">
              <h3>Core Competencies</h3>
              <p>Full-Stack Data Engineering | Batch & Streaming Pipelines | Data Integration | Data Modeling | Real-Time Analytics | API Development | BI Dashboards</p>
            </div>
            <div className="skill-category">
              <h3>Languages & Frameworks</h3>
              <p>Python, SQL, Java, Bash, R | FastAPI, Flask, Django | dbt</p>
            </div>
            <div className="skill-category">
              <h3>Data Pipelines & Orchestration</h3>
              <p>Apache Airflow | Apache Flink (real-time streaming) | Custom ETL/ELT pipelines in Python</p>
            </div>
            <div className="skill-category">
              <h3>Data Formats</h3>
              <p>Parquet, Avro, ORC, JSON</p>
            </div>
            <div className="skill-category">
              <h3>Streaming & Messaging</h3>
              <p>Kafka, AWS SQS, Azure Event Hubs, AWS Kinesis</p>
            </div>
            <div className="skill-category">
              <h3>APIs & Integrations</h3>
              <p>Built custom connectors for Facebook Ads, Google Ads, HubSpot, Keap, ClickFunnels, AdRoll, Wicked Reports, LiveIntent | Implemented OAuth 2.0 flows for secure integrations</p>
            </div>
            <div className="skill-category">
              <h3>Visualization & BI Tools</h3>
              <p>Metabase, Tableau, Looker, Power BI, Domo | Matplotlib, Plotly, Dash | Built custom dashboards for analytics & monitoring</p>
            </div>
            <div className="skill-category">
              <h3>Cloud Platforms</h3>
              <p>AWS (Lambda, S3, ECS, Fargate, ECR, EC2, Kinesis) | Azure (App Service, AKS, Event Hubs, Azure ML) | Kubernetes, Docker</p>
            </div>
            <div className="skill-category">
              <h3>CI/CD & DevOps</h3>
              <p>GitHub Actions, Azure DevOps | Automated deployments for microservices & pipelines</p>
            </div>
            <div className="skill-category">
              <h3>Monitoring & Observability</h3>
              <p>DataDog, CloudWatch | Custom alerting and observability dashboards</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Portfolio
