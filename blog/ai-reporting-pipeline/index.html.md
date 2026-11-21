# How I’m using Omniscope and AI for daily app analytics

Two charts in my Omniscope app analytics briefing read the same data\. Here’s how we traced the mistake, fixed both bindings and checked the saved report\.

By Mustafa Hafeez · 2026-11-20

These are my personal views and experiences\. They do not represent the views of Visokio or any other organisation\.

## The takeaway

Before acting on a trend, check the measure, source and dates against the original rows\. Keep a missing reporting day pending\.

![Five small source cards beside larger Omniscope workflow and dashboard printouts on a walnut table with coffee and greenery\.](https://mustafahafeez.com/assets/images/articles/ai-reporting-pipeline/omniscope-tabletop-editorial.webp)

## Two charts were reading the same data

The first layout for my app analytics briefing had one chart for Google search clicks and another for taps on app\-store links\. [Report Ninja](<https://help.visokio.com/support/solutions/articles/42000114724-thinking-in-style-a-report-ninja-update>) generated the layout from a prompt\. When we checked the charts, both were reading the same combined input\. The labels described two different measures, but the lines couldn’t tell me how those measures moved\.

I wanted one briefing for Travel Document Vault and my websites\. Search Console tells me when someone clicks a Google result\. GA4 records website activity, including taps on links to the stores\. The counts come from different sources and reporting periods\. My question was practical: if search traffic changes, which landing pages are worth a closer look, and do I have enough coverage to compare them?

I work at Visokio, the team behind Omniscope, and develop Travel Document Vault independently\.

## We traced each chart back to its source

I worked with Codex through Omniscope’s [MCP connection](<https://help.visokio.com/support/solutions/articles/42000118534-connect-ai-agents-to-omniscope-with-the-mcp-server>) to load aggregate CSV snapshots\. The agent set up editable workflow blocks to append compatible rows, set types for dates and counts, and filter the data into outputs for individual views\. I could open the workflow and inspect what each step produced\.

We held off comparing the lines\. We gave search clicks and store\-link taps separate filtered outputs and selected the corresponding source for each chart in the report editor\. We checked each plotted series against its snapshot, including the dates it covered\.

We corrected both affected chart bindings\. We then reopened the saved report in a fresh browser tab and checked all five report tabs\. The Trends tab still showed the two distinct series\. That was the result I needed before using the briefing to compare them\.

![Omniscope’s workflow canvas with data inputs, field organisation, filtering and a join leading to a dashboard and a database output\.](https://mustafahafeez.com/assets/images/articles/ai-reporting-pipeline/omniscope-workflow-user.jpg)

Omniscope workflow example from Visokio, showing how inputs connect to transformation blocks and then to a dashboard or database output\.

## How I’m bringing the five feeds into Omniscope

The daily briefing is meant to bring together Search Console, GA4, Cloudflare, App Store Connect and Google Play\. I’ve tested the initial BigQuery imports\. The Omniscope report we checked still reads dated CSV snapshots\.

In the setup I’m building, [Cloud Scheduler](<https://docs.cloud.google.com/run/docs/triggering/using-scheduler>) would trigger a Cloud Function each day\. The function would use its own identity to read the credentials it needs from [Google Secret Manager](<https://mustafahafeez.com/blog/reporting-credentials-google-secret-manager/>), fetch the five feeds and write them to separate BigQuery tables with their reporting dates intact\.

Omniscope would [read those tables](<https://help.visokio.com/support/solutions/articles/42000090716-google-bigquery-connectivity?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=ai_reporting_bigquery>) after the import\. I’d use the same workflow to standardise dates and field names and give each chart its own source\. Before relying on the daily refresh, I want to run it unattended, reopen the report and trace a changed point back to the right source and day\.

![Four stages of the proposed daily report\. A Cloud Function uses Secret Manager to collect source reports\. BigQuery keeps the history\. Omniscope cleans and combines the data, then presents the results for review\.](https://mustafahafeez.com/assets/images/articles/ai-reporting-pipeline/omniscope-daily-flow-editorial.webp)

The planned daily flow, from collection to an answer I can check\.

## What I check before acting on a trend

My rule now is to check the measure, source and reporting dates, then compare the plotted values with the source rows\. I’d apply that rule in any reporting tool\. Omniscope gives me a place to inspect the preparation and charts together\.

My next test is to ask [Insight Explorer](<https://visokio.com/omniscope-insight-explorer/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=ai_reporting_insight_explorer>) which measure changed and how much of the period each feed covers\. I’d open [Explain query](<https://help.visokio.com/support/solutions/articles/42000116042-explore-data-with-natural-language-the-data-q-a-view-in-omniscope?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=ai_reporting_qa#Inspecting-the-query-behind-a-result>) to inspect the source, filters and returned rows, then compare the answer with the data\.

If search clicks rise and store\-link taps fall, I’d check which landing pages gained traffic\. If a page attracted relevant searches and few readers tapped through, I’d test a clearer route to the app from that page\. I’d keep any unreported store day pending\.

I’d try Omniscope’s [AI Decision block](<https://help.visokio.com/support/solutions/articles/42000119202-an-introduction-to-the-ai-decision-block>) with Jev from TypeSafe AI to flag what to investigate now, review later or leave pending for more evidence\.

![Omniscope Insight Explorer Explain query dialog showing source\-to\-result lineage, details of a join and the table of rows returned by the selected step\.](https://mustafahafeez.com/assets/images/articles/ai-reporting-pipeline/omniscope-explain-query.png)

Visokio’s Explain query example uses demo data to show query lineage, transformation details and the rows returned by the selected step\.

[Try Omniscope for free](<https://omniscope.visokio.com/>)

[Explore Visokio](<https://visokio.com/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=ai_reporting_visokio_homepage>)

## Sources

- [Connect an AI agent to Omniscope with MCP](<https://help.visokio.com/support/solutions/articles/42000118534-connect-ai-agents-to-omniscope-with-the-mcp-server>)

- [Build and edit visualisations with Report Ninja](<https://help.visokio.com/support/solutions/articles/42000114724-thinking-in-style-a-report-ninja-update>)

- [Visokio’s Insight Explorer overview](<https://visokio.com/omniscope-insight-explorer/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=ai_reporting_insight_explorer>)

- [Verify answers with Omniscope Insight Explorer](<https://help.visokio.com/support/solutions/articles/42000116042-explore-data-with-natural-language-the-data-q-a-view-in-omniscope?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=ai_reporting_qa#Inspecting-the-query-behind-a-result>)

- [Run Google Cloud services on a schedule](<https://docs.cloud.google.com/run/docs/triggering/using-scheduler>)

- [Omniscope BigQuery connectivity](<https://help.visokio.com/support/solutions/articles/42000090716-google-bigquery-connectivity?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=ai_reporting_bigquery>)

[Read on the website](https://mustafahafeez.com/blog/ai-reporting-pipeline/)
