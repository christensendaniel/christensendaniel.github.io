import Layout from '../components/Layout'

function Home() {
  return (
    <Layout>
      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Daniel B. Christensen</h1>
            <p className="hero-tagline">Full Stack Data Engineer specializing in scalable data pipelines, real-time analytics, and cloud-native solutions</p>
            <div className="hero-summary">
              <p>Full stack data engineer with 7+ years of expertise in batch and streaming pipelines, real-time analytics, and building cloud-native solutions on AWS and Azure. Experienced in Python, Java, SQL, and modern data tools including Apache Flink, Snowflake, and Kubernetes. Currently optimizing enterprise-scale data infrastructure at The Walt Disney Company, achieving 30% performance improvements and significant cost reductions.</p>
            </div>
            <div className="hero-meta">
              <span className="hero-company">🏢 The Walt Disney Company</span>
              <span className="hero-location">📍 Senior Data Engineer</span>
            </div>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">Get In Touch</a>
              <a href="#projects" className="btn btn-secondary">View Projects</a>
            </div>
          </div>
        </div>
      </header>

      <nav className="side-nav">
        <a href="#about" className="side-nav-link" data-section="About"></a>
        <a href="#expertise" className="side-nav-link" data-section="Expertise"></a>
        <a href="#experience" className="side-nav-link" data-section="Experience"></a>
        <a href="#projects" className="side-nav-link" data-section="Projects"></a>
        <a href="#education" className="side-nav-link" data-section="Education"></a>
        <a href="#contact" className="side-nav-link" data-section="Contact"></a>
      </nav>

      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-section-content">
            <div className="about-content">
              <p className="lead">I'm Daniel B. Christensen, a senior data engineer with over 7 years of experience designing and implementing mission-critical data pipelines and real-time data platforms. Currently working full-time with <strong>The Walt Disney Company</strong>, where I've improved event-based data query performance by 30% and significantly reduced Snowflake compute costs through advanced performance tuning and optimization strategies.</p>
              
              <p>My expertise spans the entire data lifecycle—from ingestion and transformation to modeling and visualization. I've built sub-2-minute latency streaming infrastructures using Apache Flink, managed ETL/ELT pipelines processing millions of records monthly, and architected FastAPI platforms handling 2M+ requests per month. I specialize in creating scalable, reliable systems using Python, Apache Airflow, Apache Flink, Snowflake, FastAPI, and cloud platforms like AWS and Azure.</p>
              
              <p>Beyond technical implementation, I bring leadership and mentorship to teams, optimizing workflows and delivering data solutions that drive measurable business value. My approach combines robust engineering practices with a focus on cost optimization, performance tuning, and maintainability.</p>
              
              <div className="about-stats-grid">
                <div className="about-stat-card">
                  <span className="about-stat-number">7+</span>
                  <span className="about-stat-label">Years Experience</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-number">2M+</span>
                  <span className="about-stat-label">Requests/Month</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-number">30%</span>
                  <span className="about-stat-label">Cost Reduction</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-number">&lt;2min</span>
                  <span className="about-stat-label">Pipeline Latency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="expertise" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Core Expertise</h2>
          
          <div className="expertise-grid">
            <div className="expertise-card">
              <div className="card-icon">🔧</div>
              <h3>Data Pipeline Engineering</h3>
              <ul className="expertise-list">
                <li><strong>Real-time & Batch Processing</strong>: Built event-driven pipelines with &lt;2-minute latency using Apache Flink</li>
                <li><strong>Scale</strong>: Architected systems handling 2M+ requests/month and 5M+ row syncs</li>
                <li><strong>Orchestration</strong>: Expert in Apache Airflow, Cron, and workflow automation</li>
                <li><strong>Cost Optimization</strong>: Reduced Snowflake compute costs by 30% through query optimization and warehouse management</li>
                <li><strong>Performance Tuning</strong>: Expert in Snowflake performance optimization, clustering strategies, and cost management</li>
              </ul>
            </div>
            
            <div className="expertise-card">
              <div className="card-icon">💻</div>
              <h3>Technical Stack</h3>
              <div className="tech-stack">
                <div className="tech-category">
                  <h4>Languages</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">SQL</span>
                    <span className="tech-tag">JavaScript</span>
                    <span className="tech-tag">Bash</span>
                    <span className="tech-tag">R</span>
                  </div>
                </div>
                <div className="tech-category">
                  <h4>Data Platforms</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">Snowflake</span>
                    <span className="tech-tag">BigQuery</span>
                    <span className="tech-tag">PostgreSQL</span>
                    <span className="tech-tag">SQL Server</span>
                  </div>
                </div>
                <div className="tech-category">
                  <h4>Frameworks & Tools</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">Apache Flink</span>
                    <span className="tech-tag">Apache Airflow</span>
                    <span className="tech-tag">FastAPI</span>
                    <span className="tech-tag">Django</span>
                    <span className="tech-tag">dbt</span>
                    <span className="tech-tag">Docker</span>
                    <span className="tech-tag">Kubernetes</span>
                  </div>
                </div>
                <div className="tech-category">
                  <h4>Cloud Platforms</h4>
                  <div className="tech-tags">
                    <span className="tech-tag">AWS</span>
                    <span className="tech-tag">Azure</span>
                    <span className="tech-tag">GitHub Actions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="job-header">
                  <h3>The Walt Disney Company</h3>
                  <span className="job-title">Senior Data Engineer</span>
                </div>
                <p className="job-date">July 2024 – Present (Full-Time from May 2025)</p>
                <ul className="job-achievements">
                  <li>Improve event-based data query performance by <strong>30%</strong> through advanced Snowflake optimization techniques</li>
                  <li>Implement comprehensive Snowflake cost management strategies, reducing compute costs while maintaining performance SLAs</li>
                  <li>Design and deploy real-time data pipelines using <strong>Apache Flink</strong> for streaming analytics</li>
                  <li>Execute performance tuning initiatives including clustering strategies, query optimization, and warehouse sizing</li>
                  <li>Build and maintain data models for ML workflows, ensuring SLA adherence</li>
                  <li>Orchestrate data ingestion workflows using Apache Airflow with enhanced monitoring and visibility</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="job-header">
                  <h3>SAVVBI</h3>
                  <span className="job-title">Senior Data Engineer</span>
                </div>
                <p className="job-date">June 2023 – July 2024</p>
                <ul className="job-achievements">
                  <li>Architected full-stack data solutions: ingestion, modeling, visualization</li>
                  <li>Built real-time event-driven reporting with <strong>&lt;2-minute latency</strong></li>
                  <li>Scaled batch/streaming pipelines handling thousands of daily events</li>
                  <li>Created comprehensive data-validation alerts and dashboards</li>
                  <li>Mentored engineers in scalable pipeline design and monitoring</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="job-header">
                  <h3>VIVBI</h3>
                  <span className="job-title">Senior Data Engineer</span>
                </div>
                <p className="job-date">January 2018 – June 2023</p>
                <ul className="job-achievements">
                  <li>Built FastAPI ingestion platform on Azure handling <strong>2M+ requests/month</strong></li>
                  <li>Integrated with FB, Google Ads, AdRoll APIs—saving <strong>200+ hrs/month</strong></li>
                  <li>Deployed services via Docker, GitHub Actions, AWS/Azure</li>
                  <li>Built MS Dynamics & POS integration pipelines syncing <strong>5M+ rows/month</strong></li>
                  <li>Developed client-facing iOS app using Retool, AWS, Postgres, Lambda</li>
                  <li>Managed SQL transformations across multiple platforms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Data Projects & Open Source</h2>
          
          <div className="project-grid">
            <div className="project-card">
              <div className="project-icon">📦</div>
              <h3>paged-list</h3>
              <p><strong>Developed and published</strong> an open-source Python package for efficient pagination:</p>
              <ul className="project-features">
                <li>Streamlined static list pagination for large datasets</li>
                <li>Published on PyPI with comprehensive documentation</li>
                <li>Actively maintained with regular updates</li>
              </ul>
              <a href="https://pypi.org/project/paged-list/" className="project-link">View on PyPI →</a>
            </div>
            
            <div className="project-card">
              <div className="project-icon">🚀</div>
              <h3>Real-Time Analytics Pipeline</h3>
              <p><strong>Designed and deployed</strong> enterprise streaming architecture:</p>
              <ul className="project-features">
                <li>Reduced event processing latency to under 2 minutes</li>
                <li>Built custom Apache Flink operators for Snowflake integration</li>
                <li>Achieved 30% query performance improvement</li>
                <li>Processed millions of events daily with 99.9% uptime</li>
              </ul>
              <a href="portfolio/data-engineering-portfolio.html" className="project-link">View Public Projects →</a>
            </div>
            
            <div className="project-card">
              <div className="project-icon">🔄</div>
              <h3>Multi-Source Data Platform</h3>
              <p><strong>Architected and built</strong> FastAPI-based integration platform:</p>
              <ul className="project-features">
                <li>Handles 2M+ API requests per month</li>
                <li>Integrated Facebook, Google Ads, and AdRoll APIs</li>
                <li>Saved 200+ manual hours monthly through automation</li>
                <li>Deployed on Azure with auto-scaling capabilities</li>
              </ul>
              <a href="portfolio/data-engineering-portfolio.html" className="project-link">View Case Study →</a>
            </div>
            
            <div className="project-card">
              <div className="project-icon">📝</div>
              <h3>Technical Blog</h3>
              <p><strong>Share insights</strong> on data engineering best practices:</p>
              <ul className="project-features">
                <li>Real-world implementation guides</li>
                <li>Performance optimization techniques</li>
                <li>Cloud cost reduction strategies</li>
              </ul>
              <a href="blog/index.html" className="project-link">Read Blog →</a>
            </div>
            
            <div className="project-card">
              <div className="project-icon">💼</div>
              <h3>Enterprise Data Sync</h3>
              <p><strong>Implemented robust</strong> ETL pipeline for retail systems:</p>
              <ul className="project-features">
                <li>Syncs 5M+ rows monthly between MS Dynamics and POS</li>
                <li>Achieved 99.9% reliability with error handling</li>
                <li>Built comprehensive monitoring and alerting</li>
              </ul>
              <a href="portfolio/data-engineering-portfolio.html" className="project-link">View Portfolio →</a>
            </div>
            
            <div className="project-card">
              <div className="project-icon">🛠️</div>
              <h3>Technical Skills</h3>
              <p><strong>Comprehensive overview</strong> of my technical expertise:</p>
              <ul className="project-features">
                <li>40+ technologies and platforms</li>
                <li>Cloud, streaming, and orchestration tools</li>
                <li>Detailed proficiency levels and use cases</li>
              </ul>
              <a href="skills.html" className="project-link">View Skills →</a>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="section">
        <div className="container">
          <h2 className="section-title">Education</h2>
          
          <div className="education-full-width">
            <div className="education-main-card">
              <div className="education-header">
                <div className="education-icon">🎓</div>
                <div className="education-details">
                  <h3>Bachelor of Science in Economics</h3>
                  <p className="education-institution">University of Utah</p>
                  <p className="education-date">Graduated May 2017</p>
                  <span className="education-minor">Minor in Business</span>
                </div>
              </div>
              
              <div className="education-coursework">
                <h4>Relevant Coursework</h4>
                <div className="coursework-grid">
                  <div className="coursework-category">
                    <h5>Core Economics & Statistics</h5>
                    <ul>
                      <li>Econometrics and statistical analysis of economic data</li>
                      <li>Bayesian statistics and probability modeling</li>
                      <li>Linear and predictive modeling techniques</li>
                    </ul>
                  </div>
                  <div className="coursework-category">
                    <h5>Applied Data Analysis</h5>
                    <ul>
                      <li>Statistical programming and data visualization in R</li>
                      <li>Multivariate regression analysis and time series modeling</li>
                      <li>Economic research methodology and data collection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-cta">
        <div className="container">
          <h2 className="section-title">Let's Connect</h2>
          <p className="contact-intro">While I'm currently fully engaged at The Walt Disney Company and not available for hire, I highly recommend <a href="https://savvbi.com" className="inline-link">SAVVBI</a> for your AI and data engineering needs. They excel at:</p>
          
          <div className="services-grid">
            <div className="service-item">
              <span className="service-icon">🤖</span>
              <span>AI & Machine Learning Solutions</span>
            </div>
            <div className="service-item">
              <span className="service-icon">⚡</span>
              <span>Scalable Data Pipelines</span>
            </div>
            <div className="service-item">
              <span className="service-icon">📊</span>
              <span>Real-time Data Processing</span>
            </div>
            <div className="service-item">
              <span className="service-icon">🔧</span>
              <span>Data Infrastructure Optimization</span>
            </div>
            <div className="service-item">
              <span className="service-icon">💰</span>
              <span>Cloud Cost Optimization</span>
            </div>
            <div className="service-item">
              <span className="service-icon">📈</span>
              <span>Advanced Analytics</span>
            </div>
            <div className="service-item">
              <span className="service-icon">🔒</span>
              <span>Data Security & Compliance</span>
            </div>
            <div className="service-item">
              <span className="service-icon">🎯</span>
              <span>MLOps & Model Deployment</span>
            </div>
          </div>
          
          <div className="recommendation-box">
            <p className="recommendation-text">
              <strong>Looking for expert data engineering services?</strong><br />
              I recommend reaching out to <a href="https://savvbi.com" className="inline-link">SAVVBI</a> - they have an exceptional team capable of delivering enterprise-grade AI and data engineering solutions.
            </p>
          </div>
          
          <div className="contact-icons">
            <a href="mailto:contact@christensendaniel.com" className="contact-icon-link" aria-label="Email">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
              </svg>
              <span>Email</span>
            </a>
            <a href="https://linkedin.com/in/dbchristensen" className="contact-icon-link" aria-label="LinkedIn">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/christensendaniel" className="contact-icon-link" aria-label="GitHub">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.865 20.17 8.839 21.5C9.339 21.592 9.521 21.282 9.521 21.012C9.521 20.772 9.513 20.144 9.508 19.316C6.726 19.92 6.139 17.992 6.139 17.992C5.685 16.834 5.029 16.526 5.029 16.526C4.122 15.906 5.098 15.918 5.098 15.918C6.101 15.988 6.629 16.95 6.629 16.95C7.521 18.48 8.97 18.04 9.539 17.782C9.631 17.135 9.889 16.694 10.175 16.422C7.955 16.147 5.62 15.286 5.62 11.443C5.62 10.351 6.01 9.463 6.649 8.773C6.546 8.498 6.203 7.483 6.747 6.108C6.747 6.108 7.587 5.818 9.497 7.132C10.31 6.909 11.175 6.798 12.037 6.794C12.899 6.798 13.765 6.909 14.579 7.132C16.487 5.818 17.326 6.108 17.326 6.108C17.871 7.483 17.528 8.498 17.425 8.773C18.065 9.463 18.453 10.351 18.453 11.443C18.453 15.296 16.113 16.145 13.887 16.414C14.243 16.741 14.565 17.388 14.565 18.377C14.565 19.765 14.553 20.887 14.553 21.012C14.553 21.284 14.733 21.597 15.242 21.499C19.213 20.167 22.077 16.418 22.077 12C22.077 6.477 17.523 2 12 2Z" fill="currentColor"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a href="https://pypi.org/project/paged-list/" className="contact-icon-link" aria-label="PyPI">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V12C2 16.55 4.84 20.74 9 22C9.35 21.91 9.72 21.8 10.08 21.66L12 13.5L13.92 21.66C14.28 21.8 14.65 21.91 15 22C19.16 20.74 22 16.55 22 12V7L12 2ZM12 4.18L19.5 7.86V12C19.5 13.91 18.98 15.67 18.1 17.15L12 11.5L5.9 17.15C5.02 15.67 4.5 13.91 4.5 12V7.86L12 4.18Z" fill="currentColor"/>
              </svg>
              <span>PyPI</span>
            </a>
            <a href="https://medium.com/@christensen-danielb" className="contact-icon-link" aria-label="Medium">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.54 12C13.54 14.78 11.08 17.04 8 17.04C4.92 17.04 2.46 14.78 2.46 12C2.46 9.22 4.92 6.96 8 6.96C11.08 6.96 13.54 9.22 13.54 12ZM20.96 12C20.96 14.62 19.74 16.75 18.23 16.75C16.72 16.75 15.5 14.62 15.5 12C15.5 9.38 16.72 7.25 18.23 7.25C19.74 7.25 20.96 9.38 20.96 12ZM24 12C24 14.33 23.61 16.22 23.12 16.22C22.63 16.22 22.24 14.33 22.24 12C22.24 9.67 22.63 7.78 23.12 7.78C23.61 7.78 24 9.67 24 12Z" fill="currentColor"/>
              </svg>
              <span>Medium</span>
            </a>
          </div>
          
          <p className="contact-cta">Feel free to connect with me on <strong><a href="https://linkedin.com/in/dbchristensen" className="cta-link">LinkedIn</a></strong> to discuss data engineering, technology trends, or potential open-source collaborations.</p>
        </div>
      </section>
    </Layout>
  )
}

export default Home
