export const projects = [
  {
    slug: "crop-yield-ml",
    title: "Predictive Crop Yield Machine Learning Pipeline",
    impact: "Produced yield estimates competitive with official USDA in-season forecasts",
    image: "/images/feature-crop-yield-ml.png",
    github: null,
    techStack: ["Python", "SQL", "AWS RDS", "AWS S3", "REST APIs", "scikit-learn", "XGBoost", "matplotlib", "pandas", "NumPy", "cron", "boto3"],
    problem: `Agricultural market participants need to anticipate harvest outcomes before official USDA estimates move the market. A crop yield model with daily and weekly forecasts helps meet that need.`,
    summary: `I built an MLOps pipeline with a machine learning regression model that predicts agricultural crop yields based on relationships with crop condition index, soil moisture, and observed temperature and precipitation patterns throughout the growing season.

Sources include agricultural and soil moisture data publicly available from the National Agricultural Statistics Service (NASS) under the U.S. Department of Agriculture (USDA), and meteorological observation data from the Automated Surface/Weather Observing Systems (ASOS/AWOS) under the National Oceanic and Atmospheric Administration (NOAA).

Source data were ingested, cleaned, transformed, and feature-engineered into datasets accepted by the XGBoost and Random Forest models. Used a time-based 80/20 train-test split across a 40-year dataset, with the most recent five years set aside as the validation set. Opted not to randomly shuffle due to leakage risk on a chronological set. Performed a limited grid search to find the best hyperparameters, such as learning rate and number of estimators. A Neural Network model was also tested, but the former two performed better in terms of both MAE and RMSE.

Initially, I attempted to use one model for multiple crops using one-hot encoding, but this added too much noise that "confused" the model, so I decided to create separate models for one crop each. In doing so, both training and testing errors were greatly reduced for each crop-specific model. Blending complementary agronomic and meteorological features also materially improved accuracy.`,
    results: `The crop yield models achieved strong predictive accuracy, materially outperforming the initial baseline in both MAE and RMSE. Feature importance plots showed corn and soybean yields are driven by different predictors, supporting the decision to train separate crop-specific models.

If seasonal RMSE rises above a certain threshold, data drift may be indicated, warranting further investigation and potentially manual retraining of the crop models.`,
  },
  {
    slug: "weather-email-pipeline",
    title: "Event-Driven Weather Email Delivery Pipeline",
    impact: "Reduced delivery time of weather maps by over an order of magnitude",
    image: "/images/feature-weather-email-pipeline.png",
    github: null,
    techStack: ["Python", "boto3", "BeautifulSoup", "SQL", "AWS Lambda", "AWS SNS", "AWS S3", "AWS RDS", "AWS CloudWatch", "cron", "REST APIs"],
    problem: `Operational decision-makers need timely weather data and model forecasts so they can make time-sensitive decisions. This project outlines how I met that need.`,
    summary: `I engineered a new event-driven pipeline that delivered customized emails containing selected weather forecast maps to clients the moment the underlying model data became available. This was critical in an environment where speed is essential for operational decision-making. Source data came from scheduled model runs by NOAA, ECMWF, and emerging AI weather models.

Clients were given the ability to build their own email templates and choose which forecast maps each email contained, with their preferences stored as metadata in a database. A dedicated compute process assembled each custom email once the required data was available, and a serverless delivery layer then rendered it as an HTML message and sent it through a third-party mailer's API.

I built it for reliability as well as speed. Every send was tracked with a success/failure status. Failed deliveries were routed to a dead-letter queue, and alerts were logged for investigation.

The pipeline actually outpaced the downstream mailer's API rate limits, so I implemented throttling (backpressure) to regulate the send rate and stay within the provider's constraints without compromising on delivery speed.`,
    results: `This pipeline reduced source-to-inbox delivery time by at least an order of magnitude (from minutes to seconds) compared to the legacy baseline. Clients received customized forecast maps almost immediately after each model run completion.

The system reliably handled a high daily volume of customized emails across a large client base. Production-grade observability, per-message success/failure tracking, a dead-letter queue for failed sends, and logged alerts ensured reliable delivery with failures being extremely rare.`,
  },
  {
    slug: "job-hunter",
    title: "Agentic AI Job Hunter With Email Report",
    impact: "Saved 3 hours per day in job search with an AI agent doing the heavy lifting",
    image: "/images/feature-job-hunter.png",
    github: "https://github.com/nkeblawi/job-hunter",
    intraImages: [
      { src: "/images/job-hunter/image-0.png", caption: "", section: "summary", afterParagraph: 2 },
      { src: "/images/job-hunter/image-1.png", caption: "", section: "results", afterParagraph: 0 },
    ],
    techStack: ["Python", "Anthropic Python SDK", "Claude Sonnet 4.6", "Claude Haiku 4.5", "REST APIs", "HTML", "BeautifulSoup", "JSON", "SMTP", "PyYAML"],
    problem: `Reading and evaluting job postings across dozens of employer pages, job boards, and federal listings can be tedious and repetitive. To free up time focusing on the application process, networking, and preparing for interviews, I built an autonomous AI agent to find best-fit roles for me to apply to.

Note: This is NOT an auto-apply tool. I read every job description and manually apply ONLY if it's a great fit.

Here is how it works:`,
    summary: `Using Anthropic's API, this autonomous AI agent makes my job search more efficient by deciding where to look, evaluating every opening against my profile, and emailing me a ranked shortlist, replacing the daily grind of manually checking dozens of career pages at various companies.

Rather than following a fixed script, the agent lists all configured employer sources, strategically decides which to check first, fetches and scores listings in real time, and stops the moment it has found enough high-priority matches. It pulls from three complementary channels: 1) Greenhouse API for structured job-board data, 2) static HTML careers pages, and 3) the official USAJobs API for federal roles.

Every listing it returns gets a fit score of 0 to 100, a HIGH/MEDIUM/LOW priority, a tailored two-sentence rationale, a skills-gap callout, disqualifier flags (on-call, relocation, salary mismatch), and a direct application link.

A key design decision was keeping all the intelligence in configuration files, not within code. The candidate profile, scoring criteria, and evaluation prompts live entirely in config.yaml, so the agent can be re-pointed at a completely different candidate or job market without modifying a single line of Python. All sensitive information, such as API keys, is stored in a keys.yaml file.

Another design decision to save on costs was to implement a tiered model routing to reduce token usage. I used Claude Haiku for high-volume HTML extraction and Claude Sonnet for orchestration and fit-scoring judgment. This cut token usage and costs while keeping scoring quality uniform across all sources.

Also wanted to note that this isn't a RAG pipeline using embeddings. Instead, I let the model read and score each listing directly against the profile. The only pre-filter is keyword matching. I chose LLM judgment over embedding similarity because nuanced fit (disqualifiers, skills gaps, etc.) needs reasoning, not just vector similarity.`,
    results: `The results are assembled into a clean, color-coded HTML email and delivered automatically via Gmail SMTP. A small CLI exposes dry-run scoring, a configurable result count, and history reset to resurface previously seen roles. Turns about 3 hours per day of manual checking career sites and reading job descriptions into a hands-off, pre-scored shortlist for about $0.40 per run.

For future improvement: Since JavaScript-heavy platforms (Workday, iCIMS, Taleo) could not be scraped well due to rendering issues, they were flagged for manual review in order to prevent the workflow from outright crashing. Need to explore better ways to pull job listings from JavaScript-rendered pages.`,
  },
  {
    slug: "ai-support-chatbot",
    title: "Customer Support AI Chatbot Using Azure OpenAI",
    impact: "Slashed support ticket volume 90%, eliminated a year's backlog",
    image: "/images/feature-ai-support-chatbot.png",
    github: null,
    techStack: ["Python", "Azure Functions", "Azure OpenAI", "REST API", "JavaScript", "token-based auth"],
    problem: `Customer support teams are often drowning in support tickets, most of which ask the same questions. The fix isn't more headcount. It's making sure users get answers to routine questions before escalating to a human customer support rep. What alleviated the support volume was a chatbot grounded in FAQs based on support history.`,
    summary: `I built and deployed a customer-support AI chatbot on Azure OpenAI that answered common customer questions directly on the company website, deflecting routine inquiries away from the customer support team. Starting from exports of real customer-service chats, support tickets, and the existing knowledge base, I distilled the 20-25 most common questions into a curated FAQ with vetted answers, then grounded an Azure OpenAI model by embedding that FAQ in its system prompt with answers drawn from the historical chats and support tickets.

The goal was to ensure its responses matched how the team actually answered customer questions. Over a few passes, I refined it iteratively, reviewing where it answered incorrectly and making corrections each pass until the quality was reliable. A key part of that tuning was making the bot robust to how customers worded the same question differently, ensuring they got the same correct answer.

For deployment, I exposed the model as an Azure OpenAI endpoint and connected it to the website through a serverless backend (Azure Functions) that brokered requests between the two. Access was restricted to paying members: the Function validated each user's membership token before calling the model, which kept the endpoint secure and bounded usage costs.

I also built a custom JavaScript chat widget for the site. When a member sent a message, the widget posted it to the backend, which forwarded it to the Azure OpenAI endpoint, fetched the answer, and returned it to the widget in real time. Routing calls through the backend rather than calling Azure directly from the browser kept the API key and model server-side, so credentials were never exposed to end users.`,
    results: `The chatbot automatically handled the vast majority of routine and repetitive questions, and that helped cut support-ticket volume by roughly 90% and clear a year's backlog of tickets. This freed the customer support team to focus on higher-value business priorities instead of answering the same questions over and over.

However, if I were to build this today, I would use a vector database and a RAG pipeline instead of embedding the FAQ directly in the system prompt. That way the model would be better grounded, with natural guardrails against hallucinating answers to questions outside the scope of the business.`,
  },
  {
    slug: "customer-segmentation",
    title: "Automated Customer Segmentation Model",
    impact: "Directly contributed to an instant 29% increase in membership sales",
    image: "/images/feature-customer-segmentation.png",
    github: "https://github.com/nkeblawi/nk-cust-segmentation",
    intraImages: [
      { src: "/images/customer-segmentation/image-0.png", caption: "", section: "results", afterParagraph: 1 },
    ],
    techStack: ["Python", "Flask", "scikit-learn", "KMeans", "GMM", "PCA", "pandas", "NumPy", "matplotlib", "mpld3", "joblib", "gunicorn", "Docker"],
    problem: `Marketing teams know their customers fall into distinct groups but lack an easy way to identify them. Assigning customers into groups via manual segmentation is tedious and doesn't scale, plus insights go stale quickly as customer behaviors change daily. I built a self-serve tool that helps marketers automatically segment their customer lists on an on-demand basis.`,
    summary: `This is an end-to-end machine learning web application that segments customers into meaningful groups for targeted marketing. A user uploads a raw customer-purchase CSV, selects a clustering algorithm (KMeans or a Gaussian Mixture Model), and receives a labeled dataset plus an interactive 3D visualization of the resulting segments. Users do not need a data science background to use this app.

Under the hood, the app runs a full pipeline of custom transformers I wrote for data pruning, cleaning, and feature engineering. Product purchase histories and preferences were one-hot encoded, and the features were compressed to three components with PCA so segments could be visualized in 3D.

To make the tool fast and reproducible, the entire pipeline was pre-trained once and persisted with joblib, so each upload is scored instantly rather than retraining from scratch. All PII was stripped from the dataset before processing, keeping the workflow privacy-safe. The app was containerized with Docker and served in production via gunicorn, and the interactive plots were rendered using client-side JavaScript.`,
    results: `Using a dataset of several thousand users, the model partitioned the customer base into 6 distinct clusters, with fit quality evaluated automatically using silhouette scores and surfaced to the user with plain-English feedback (from "poor fit" through "strong segmentation").

The following plot shows how the customers are distributed in 3D space, with each point colored according to its cluster label. Customers that are closest together are those who have similar product preferences and purchase patterns, and those far apart have very different preferences and purchase patterns.

Because the model is unsupervised, it produced the groupings without classifications. The marketing team interpreted and labeled each cluster as a post-processing step, then applied the labeled segments to a live marketing campaign. With each group's characteristics defined, the team could then match product recommendations to customer preferences and target outreach accordingly.

This directly contributed to a 29% increase in membership sales. Plus, due to the fact that the trained pipeline is persisted and reused, marketers can self-serve fresh segmentations in seconds, turning a one-off data-science task into a reusable internal tool.`,
  },
  {
    slug: "fitness-tracker-ml",
    title: "Fitness Activity Classification ML Model",
    impact: "Correctly identifies gym exercises and number of reps 99.5% of the time",
    image: "/images/feature-fitness-tracker-ml.png",
    github: "https://github.com/nkeblawi/nk-fitness-tracker",
    intraImages: [
      { src: "/images/fitness-tracker-ml/image-0.png", caption: "", section: "results", afterParagraph: 1 },
      { src: "/images/fitness-tracker-ml/image-1.png", caption: "", section: "results", afterParagraph: 4 },
    ],
    techStack: ["Python", "pandas", "NumPy", "SciPy", "scikit-learn", "XGBoost", "matplotlib", "seaborn", "Jupyter Notebooks"],
    problem: `Gym-goers often dislike having to log their exercises, sets, and reps in a notepad or on their phone because doing so takes away from workout time, and it's also tedious. So I developed a machine learning model that tracks the exercises and reps, so they don't have to.`,
    summary: `This is an in-depth data science project that classifies barbell exercises and counts repetitions from raw wearable-sensor data. The input data is from a 12.5 Hz accelerometer and a 25 Hz gyroscope recorded with a MetaMotion wrist sensor while five participants performed five strength movements: 1) bench presses, 2) squats, 3) rows, 4) overhead presses, and 5) deadlifts. They also performed heavy sets of 5 reps and medium sets of 10 reps.

The raw sensor data was chaotic from both macro- and micro-movements during exercise sets. The data was then time-indexed, merged, and resampled to 200 ms epochs.

I proceeded with cleaning and shaping the chaotic data to increase the signal-to-noise ratio so that a model can learn from it. Specifically, I smoothed out sensor glitches, filtered out high-frequency noise, and engineered features to capture how a movement oscillates over time rather than just its raw values.

To test the model, I benchmarked six classifiers and validated them not just on a random split, but on a held-out participant (i.e., training on four people and testing on a fifth person) to ensure that the model generalizes to someone it had never seen.`,
    results: `Both the Random Forest and neural network models reached 99.5% accuracy on the held-out participant, with XGBoost close behind at 99.1%. I chose Random Forest as the practical model because the neural network was far more computationally intensive for the same accuracy. 

The following confusion matrix showed that the Random Forest model only misclassified a small percentage of overhead presses as bench presses, and vice versa. The model correctly identified the other four exercises 100% of the time.

The most interesting part of the results was catching subtle target leakage. On a random 75/25 split, a decision tree model scored 99.7%, which was suspiciously high and I suspected leakage. When I split the dataset by participant, trained the model on four participants and tested on a fifth, the accuracy dropped to 96.9% and exposed a specific failure mode: overhead presses misclassified as bench presses.

Engineering frequency features using Fourier transformation and PCA brought accuracy back up to 99.5%, however. Plus, forward selection confirmed the most predictive signals were frequency-domain components, set duration, gyroscope readings, and the K-Means cluster label, with accuracy approaching 100% using only a handful of them.

The repetition counter, using per-exercise tuned Butterworth low-pass filters and peak detection, predicted rep counts to within about one repetition of ground truth across every exercise (as shown below).`,
  },
  {
    slug: "weather-farming-pipeline",
    title: "Weather Data Pipeline for Precision Farming",
    impact: "Unified disparate weather data sources into a single dashboard for small-business farmer/winery",
    image: "/images/feature-weather-farming-pipeline.png",
    github: null,
    intraImages: [
      { src: "/images/weather-farming-pipeline/image-0.png", caption: "", section: "summary", afterParagraph: 3 },
    ],
    techStack: ["Python", "Azure Functions", "Snowflake", "dbt Cloud", "Power BI", "REST APIs", "SQL", "Medallion architecture"],
    problem: `A local farmer and winery was frustrated with having to piece together disparate sources of weather and crop information before making planting and harvest decisions. This led to analysis paralysis and delayed action, ultimately hurting their yields and business outcomes. The solution was to unify all of these data sources into a single analytics-ready view to help them make decisions quicker.`,
    summary: `I built an end-to-end weather data pipeline to help a farming client time planting and harvest decisions around local conditions. Data ingest runs on scheduled Azure Functions (timer triggers) that execute Python scripts on a set cadence.

A daily function pulls daily observations from multiple Virginia airport stations via NOAA's NOWData/ACIS API, along with 5-day temperature and precipitation forecasts from the National Weather Service API. A weekly function pulls both Virginia state-level crop condition data from the USDA NASS Quick Stats API and Virginia drought severity data from the U.S. Drought Monitor data service.

Each feed lands in its own raw table in Snowflake, appended idempotently with a MERGE key (e.g. station, date) so any re-pulled or revised records update cleanly instead of duplicating. From there, I used dbt Cloud to transform the data inside Snowflake through a medallion architecture where bronze is for append-only raw immutable data; silver for cleaned, typed, deduplicated data; and gold for analytics-ready data marts. Power BI connects directly to the Snowflake gold layer in Import mode and refreshes the dashboards daily.

I deliberately kept the orchestration lightweight with serverless timer-triggered functions because the workload involves small and infrequent API pulls, where a full orchestration platform would add cost and operational overhead without real benefit.`,
    results: `The pipeline unified four public data sources - weather observations, 5-day forecasts, crop conditions, and drought severity - into a single analytics-ready source of truth that informs farming decisions to maximize yields. The medallion design kept the raw history intact and auditable while serving clean data downstream.

Instead of manually checking multiple weather sites or fragmented sources of information, the client could see trends and metrics in one place to inform planting and harvest timing and protect seasonal yield.`,
  },
  {
    slug: "seo-analysis",
    title: "SEO Data Analysis for Organic Search Traffic",
    impact: "Turned five separate marketing data sources into a prioritized action plan that increased traffic 86% in 4 months",
    image: "/images/feature-seo-analysis.png",
    github: null,
    intraImages: [
      { src: "/images/seo-analysis/image-0.png", caption: "", section: "results", afterParagraph: 1 },
    ],
    techStack: ["Python", "SQL", "PostgreSQL", "Excel", "Screaming Frog", "Google Search Console", "Google Analytics", "Ahrefs", "SEMrush"],
    problem: `B2B SaaS businesses rely mainly on search visibility to acquire customers. As they grow and scale, their content also grows. At some point, it becomes difficult for marketing teams to track the performance of content pieces and web pages in terms of capturing new customers. This results in an increasing need for a thorough data analysis on search engine optimization (SEO) to quantify web traffic and inform decision-making for marketing teams.`,
    summary: `I ran a comprehensive SEO data analysis for a B2B SaaS client to quantify their search-driven traffic and pinpoint where to focus content and optimization efforts. I consolidated data from across the client's entire search ecosystem including Google Search Console, Google Analytics, third-party SEO tools like Ahrefs and SEMrush, a Screaming Frog crawl of the site, and the client's own sales data from their CRM to attribute traffic to actual customers.

Using Python, I pulled and scraped data from these sources into a local PostgreSQL database, then queried and joined these tables with SQL and surfaced the findings through Excel pivot tables for the marketing team.

The analysis covered four areas: 1) keyword gap and opportunity analysis to surface high-value terms competitors ranked for but the client was missing; 2) content and page performance to see which pages actually drove traffic and conversions; 3) competitor intelligence; and 4) technical SEO and funnel analysis to flag site issues and where visitors dropped off before converting.`,
    results: `The analysis replaced guesswork with a single, data-driven view of content and page performance, so the team could prioritize the content and keywords most likely to capture new customers.

The results surfaced clear and concrete opportunities for the marketing team to prioritize. These included high-opportunity keywords and content gaps to target, underperforming pages to improve, and technical website issues to fix. Once the marketing team acted on those, organic search traffic increased by 86% within 4 months.

Summary of findings after 4 months:

✅ Overall aggregate traffic increased by 86% in 4 months

✅ Overall clicks increased by 75%

✅ Got content to rank in the top 3 on page 1 for thousands of keywords

✅ Tripled the CTR for several keywords (3% to 10.2%, page rank to #1)`,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
