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

### Real-Time Analytics Pipeline

Enterprise streaming architecture built at Disney with sub-2-minute latency using Apache Flink and Snowflake integration. Achieved 30% query performance improvement processing millions of events daily.

### Multi-Source Data Platform

FastAPI-based integration platform handling 2M+ API requests per month. Integrates Facebook, Google Ads, and AdRoll APIs, saving 200+ manual hours monthly through automation.

### Enterprise Data Sync

Robust ETL pipeline for retail systems syncing 5M+ rows monthly between MS Dynamics and POS systems with 99.9% reliability.

### [Technical Blog](blog/)

Insights on data engineering best practices, performance optimization techniques, and cloud cost reduction strategies.

### Medium

[My Medium Page](https://medium.com/@christensen-danielb)

---

## Website Features

This portfolio website showcases:

- **React Architecture**: Built with React 18 for modern, component-based development
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Professional Layout**: Clean, modern design with dark/light theme support
- **Interactive Navigation**: Hash-based routing for seamless client-side navigation
- **Project Showcase**: Detailed portfolio sections highlighting real-world data engineering projects
- **Technical Skills**: Comprehensive overview of technologies, frameworks, and platforms
- **Blog Integration**: Technical blog with data engineering insights and best practices
- **SEO Optimized**: Proper meta tags, semantic HTML, and search engine optimization
- **Comprehensive Testing**: Full test coverage with Jest and React Testing Library
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions

### Technology Stack

- **Frontend**: React 18.3.x with Vite build tool
- **Routing**: React Router DOM 6.x with hash-based routing for GitHub Pages
- **Styling**: CSS Grid, Flexbox, CSS Variables for theming
- **Testing**: Jest 29.x + React Testing Library for comprehensive test coverage
- **Responsive**: Mobile-first responsive design
- **Performance**: Optimized production builds with code splitting
- **Hosting**: GitHub Pages with custom domain support
- **CI/CD**: GitHub Actions for automated testing and deployment

## Development

To preview the site locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then visit the URL shown in the terminal (typically `http://localhost:5173`)

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch:

1. GitHub Actions runs all tests
2. If tests pass, the app is built with `npm run build` (creates `dist/` directory)
3. The build output (`dist/` folder) is uploaded as a Pages artifact
4. GitHub Pages deploys directly from the GitHub Actions workflow

The deployment workflow is defined in `.github/workflows/ci-cd.yml`.

### ✅ GitHub Pages Configuration (Automatic)

This repository uses **GitHub Actions** for deployment. The workflow automatically configures GitHub Pages to deploy from GitHub Actions.

**No manual configuration required!** The deployment happens directly from the CI/CD workflow using the official `actions/deploy-pages` action.

#### How it works:
- The workflow builds the site into the `dist/` directory
- Uploads the `dist/` directory as a GitHub Pages artifact
- Deploys the artifact directly to GitHub Pages
- Site is served at https://christensendaniel.com

See [GITHUB_PAGES_FIX.md](./GITHUB_PAGES_FIX.md) for detailed troubleshooting if the site shows a blank screen.

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
