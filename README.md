# Daniel B. Christensen
## Senior Data Engineer | Pipeline Architect | Data Platform Builder

> 📍 **Currently viewable at: [christensendaniel.github.io](https://christensendaniel.github.io)**  
> *christensendaniel.com coming soon*

---

## About Me

I'm Daniel B. Christensen, a senior data engineer with over 7 years of experience designing and implementing mission-critical data pipelines and real-time data platforms. Currently working full-time with **The Walt Disney Company**, where I've improved event-based data query performance by 30% and significantly reduced Snowflake compute costs.

My expertise spans the entire data lifecycle—from ingestion and transformation to modeling and visualization. I've built sub-2-minute latency streaming infrastructures, managed ETL/ELT pipelines processing millions of records monthly, and architected FastAPI platforms handling 2M+ requests per month. I specialize in creating scalable, reliable systems using Python, Apache Airflow, Snowflake, FastAPI, and cloud platforms like AWS and Azure.

Beyond technical implementation, I bring leadership and mentorship to teams, optimizing workflows and delivering data solutions that drive measurable business value. My approach combines robust engineering practices with a focus on cost optimization, performance, and maintainability.

---

## Summary
I specialize in designing robust data pipelines, real-time streaming architectures, and full-stack analytics solutions. My work spans data ingestion, modeling, orchestration, cloud deployment, and visualization—delivering end-to-end systems that power business intelligence and ML workflows.

---

## Skills & Technologies

### Core Competencies
Full-Stack Data Engineering | Batch & Streaming Pipelines | Data Integration | Data Modeling | Real-Time Analytics | API Development | BI Dashboards  

### Languages & Frameworks
Python, SQL, Java, Bash, R | FastAPI, Flask, Django | dbt  

### Data Pipelines & Orchestration
Apache Airflow | Apache Flink (real-time streaming) | Custom ETL/ELT pipelines in Python  

### Data Formats
Parquet, Avro, ORC, JSON  

### Streaming & Messaging
Kafka, AWS SQS, Azure Event Hubs, AWS Kinesis  

### APIs & Integrations
Built custom connectors for Facebook Ads, Google Ads, HubSpot, Keap, ClickFunnels, AdRoll, Wicked Reports, LiveIntent. Implemented OAuth 2.0 flows for secure integrations.

### Visualization & BI Tools
Metabase, Tableau, Looker, Power BI, Domo | Matplotlib, Plotly, Dash | Built custom dashboards for analytics & monitoring.

### Cloud Platforms
AWS (Lambda, S3, ECS, Fargate, ECR, EC2, Kinesis), Azure (App Service, AKS, Event Hubs, Azure ML), Kubernetes, Docker.

### CI/CD & DevOps
GitHub Actions, Azure DevOps | Automated deployments for microservices & pipelines.

### Monitoring & Observability
DataDog, CloudWatch | Custom alerting and observability dashboards.

---

## Professional Experience

### The Walt Disney Company | Senior Data Engineer
*July 2024 – Present (Converted to Full-Time May 2025)*
- Improved event-based data query performance by 30% and reduced Snowflake compute costs
- Built and maintained data models for ML workflows, ensuring SLA adherence
- Orchestrated data ingestion workflows using Apache Airflow with enhanced visibility

### SAVVBI | Senior Data Engineer
*June 2023 – July 2024*
- Architected full-stack data solutions: ingestion, modeling, visualization
- Built real-time event-driven reporting with <2-minute latency
- Scaled batch/streaming pipelines handling thousands of daily events
- Created comprehensive data-validation alerts and dashboards
- Mentored engineers in scalable pipeline design and monitoring

### VIVBI | Senior Data Engineer
*January 2018 – June 2023*
- Built FastAPI ingestion platform on Azure handling 2M+ requests/month
- Integrated with FB, Google Ads, AdRoll APIs—saving 200+ hrs/month
- Deployed services via Docker, GitHub Actions, AWS/Azure
- Built MS Dynamics & POS integration pipelines syncing 5M+ rows/month
- Developed client-facing iOS app using Retool, AWS, Postgres, Lambda
- Managed SQL transformations across multiple platforms

---

## Projects & Open Source

### [paged-list](https://pypi.org/project/paged-list/)
Open-source Python package for static pagination and listing functionality. Available on PyPI.

### [C101 Script](projects/c101_script.html)
[TODO: Add description of this project]

### Data Pipeline Templates
[TODO: Add link to GitHub repo with pipeline examples]

### [Blog](blog/)
Technical insights and data engineering best practices - [Latest: Hello World](blog/2024-12-20-hello-world.md)

### Medium
[My Medium Page](https://medium.com/@christensen-danielb)

---

## Blog System

The blog uses a static site generator that converts Markdown files to styled HTML.

### Writing Blog Posts

1. Create a new Markdown file in `blog/posts/` with the format `YYYY-MM-DD-title.md`
2. Add frontmatter at the top of the file:

```yaml
---
title: "Your Post Title"
date: 2024-12-20
description: "Brief description of your post"
tags: ["tag1", "tag2"]
author: "Daniel B. Christensen"
---
```

3. Write your content in Markdown below the frontmatter

### Building the Blog

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the build script:
```bash
python build-blog.py
```

This will:
- Convert all Markdown files in `blog/posts/` to HTML
- Generate individual blog post pages
- Update the blog index page
- Apply consistent styling matching the main site

### Features

- **Markdown Support**: Write posts in Markdown with full syntax support
- **Code Highlighting**: Automatic syntax highlighting for code blocks
- **Responsive Design**: Matches the professional styling of the main site
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Fast Loading**: Static HTML pages with minimal JavaScript

### Directory Structure

```
blog/
├── posts/           # Markdown source files
├── template.html    # Blog post template
├── index-template.html  # Blog index template
├── index.html      # Generated blog index (don't edit)
└── *.html          # Generated blog posts (don't edit)
```

## Development

To preview the site locally:
```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`

## Deployment

The site is hosted on GitHub Pages. Simply push to the main branch to deploy.

---

## Education

**B.S. in Economics**  
University of Utah, May 2017

---

## Connect With Me

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/dbchristensen)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/christensendaniel)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/christensendaniel)
[![PyPI](https://img.shields.io/badge/PyPI-3775A9?style=for-the-badge&logo=pypi&logoColor=white)](https://pypi.org/project/paged-list/)
[![Medium](https://img.shields.io/badge/Medium-00AB6C?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@christensen-danielb)

</div>

---

## Get In Touch

I'm available for consulting engagements through [SAVVBI](https://savvbi.com) or direct contract opportunities. Whether you need help with:
- Building scalable data pipelines
- Optimizing existing data infrastructure
- Implementing real-time data processing
- Reducing cloud compute costs
- Setting up data orchestration

**Connect with me on [LinkedIn](https://linkedin.com/in/dbchristensen)** for professional inquiries and opportunities.

---

<footer align="center">
<small>© 2024 Daniel B. Christensen | Built with ❤️ for data</small>
</footer>
