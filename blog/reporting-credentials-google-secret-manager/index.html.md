# Why I use Google Secret Manager for reporting

Credential access tells you a job can connect\. It does not tell you the numbers in the report are right\.

By Mustafa Hafeez · 2026-11-21

## Keeping credentials in one place does not set what a job can do

To put together a daily briefing for Travel Document Vault and my websites, I pull figures from services that require a credential before they answer\. A job reading daily metrics has a narrow purpose, so I want its access just as narrow\.

I use Google Secret Manager for reporting credentials\. It gives me a managed place to store sensitive values and review who can retrieve them\. I still have to decide what each job is allowed to do once it holds a credential\.

![A closed wooden cupboard with a brass lock and four blank cards behind the glass\.](https://mustafahafeez.com/assets/images/articles/reporting-credentials-google-secret-manager/locked-cupboard.webp)

A locked walnut cupboard with blank cards\. Each card represents one credential, separating who can retrieve it from what a service allows it to do\.

![A hand places a sealed envelope in a walnut lockbox\.](https://mustafahafeez.com/assets/images/articles/reporting-credentials-google-secret-manager/sealed-envelope.webp)

## Storage access and service actions are two separate permission checks

Think of two jobs: one reads daily metrics, the other publishes an app release\. Secret Manager checks whether a job can retrieve a credential\. The receiving service checks what that credential is authorised to do, so a reporting credential should allow only the read operations the report needs\.

**Fictional example: Two permission checks**

1. A job identifies itself\. The reporting and release jobs request credentials separately\.
2. Secret Manager checks retrieval access and returns the credential only if permitted\.
3. The receiving service checks action access and allows only authorised operations\.

If either check fails, stop the job and record which check refused it, keeping credential values out of the logs\.

Because storage access and service access fail independently, I'd test both with dummy credentials in a test environment\. The reporting job should fetch its own credential while another job's request is refused\. At the service, that credential should read the expected figures and be refused a write\.

## A successful refresh still cannot prove the reported figure is right

In one supervised reporting run, we checked that the refresh returned data for the expected period and verified the saved result\. That was evidence for a single run with someone present, nothing more\.

A separate Omniscope investigation showed how a clean refresh can still mislead\. Two charts appeared to show different series, yet both read from the same combined input\. We traced each chart to its input, corrected both bindings, and reopened the saved report to confirm the series stayed distinct\. A working credential and a clean refresh would have missed that\.

Before I trust a figure in a briefing, I want to know its source, which period it covers, and where to find the rows behind it\.

## Takeaways

That single supervised run and the Omniscope chart fix taught me the same lesson: checking access and checking the reported numbers are separate jobs\.

Start with a period where you know the numbers and write down the expected result\. Check that the job reads the right period, saves the expected rows, and lets you trace them\. Then test two failures: a refused credential should record a failed run, while a service answering before the period's figures arrive should leave it pending\. Both can produce an empty report, so give them distinct outcomes\.

Pick one figure in your latest report and trace it to its source, reporting period, and underlying rows\. Can you get there directly from the report, or are you only trusting that the refresh ran?

[See how we traced and checked both charts in Omniscope\.](<https://mustafahafeez.com/blog/ai-reporting-pipeline/>)

## Sources

- [Google Cloud's Secret Manager overview](<https://docs.cloud.google.com/secret-manager/docs/overview>)

- [Google Cloud's Secret Manager best practices](<https://docs.cloud.google.com/secret-manager/docs/best-practices>)

These are my personal views and experiences\. They do not represent the views of Visokio or any other organisation\.

[Read on the website](https://mustafahafeez.com/blog/reporting-credentials-google-secret-manager/)
