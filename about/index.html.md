Mustafa Hafeez · Software engineer

# Building useful software *since 2007.*

I’m a senior software engineer at Visokio, working with the team across Java, React, AI authentication, automation and infrastructure. Outside work, I design and build Travel Document Vault, my independent iOS and Android app.

[Explore my work](<https://mustafahafeez.com/about/#work>) [Career & education](<https://mustafahafeez.com/about/#journey>) [Contact](<https://mustafahafeez.com/about/#contact>)

![Mustafa Hafeez](<https://mustafahafeez.com/assets/images/mustafa-hafeez-800.webp>)

Mustafa Hafeez Senior software engineer at Visokio

01 / Selected work

## Selected engineering and product work.

Long-term engineering and independent product work.

Professional work

### Visokio

2007 to present

From Omniscope Classic to Evo.

I began at Visokio on Omniscope Classic, the earlier desktop application, before moving on to its successor, Omniscope Evo. I work with the team across Evo’s Java backend and JavaScript, CSS and React frontend. Much of my work focuses on automation and the shared features that help people build and run reports.

#### Product & reporting

I develop reporting, filtering and shared application features, including saved explorations, working copies, branding and persistence.

#### AI, security & automation

I built OAuth 2.1 sign-in for Omniscope’s MCP server and work on permissions and application hardening. I also develop scheduled execution, project automations and APIs, including retries and notifications.

#### DevOps & releases

I work on Docker deployments, Terraform, cloud marketplace images and release pipelines. I also help plan infrastructure changes with colleagues, using runbooks and recovery steps.

**More about my engineering responsibilities**

**AI authentication**

I implemented OAuth 2.1 authentication for Omniscope’s MCP server, covering sign-in, endpoints and Admin screens. AI assistants operate within the person’s existing permissions and authorised folders.

**Cloud & SaaS**

For Omniscope Cloud, I implemented sign-up, sign-in, trial and subscription flows using Auth0 and Stripe. I also help set up Omniscope’s public SaaS services.

**Reporting & frameworks**

I work on filtering, reporting and shared application frameworks, including persistence, saved explorations and working copies.

**Security & access**

My Admin work covers sign-in, permissions, single sign-on and API-key configuration. I also work on application hardening and activation.

**DevOps & infrastructure**

I set up Docker containers and use Terraform to help manage infrastructure at Visokio. My work also includes cloud marketplace releases and operational runbooks.

**Automation & APIs**

I develop Scheduler functionality across server and client, including automated execution and retries, alongside project automations, parameters and REST APIs. I also work on schedule validation and project-level notifications.

**Product experience**

My work also covers data visualisation, filtering, customer branding and licensing.

**Release engineering**

I maintain the build pipeline and work with the team on code signing and release packaging for Windows, macOS, Linux, Docker and cloud releases. My work also includes Windows app-store packaging and user-data persistence.

**Customer troubleshooting**

When customers encounter server problems, I investigate the cause and work with the team to resolve them.

[Explore Omniscope at Visokio](<https://visokio.com/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=work_visokio>)

Independent product · iOS & Android

### Travel Document Vault

A little less worry. A better start to the trip.

Passports, visas and IDs, organised on your phone with expiry reminders.

[App Store](<https://apps.apple.com/app/apple-store/id6757014877?pt=128401792&ct=personal_website&mt=8>) [Google Play](<https://play.google.com/store/apps/details?id=com.mustafahafeez.traveldocumentvault&utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=work_tdv_google_play&referrer=utm_source%3Dmustafa_hafeez%26utm_medium%3Dreferral%26utm_campaign%3Dpersonal_website%26utm_content%3Dwork_tdv_google_play>)

My role

I lead the product, design and engineering, supported by AI agents I configure and coordinate. I optimise their context and token use, review their output and make the final decisions.

Inside the app Product demo

![Travel Document Vault Documents screen showing document categories, family grouping and expiry reminders](<https://mustafahafeez.com/assets/images/tdv-documents.webp>)

Documents, at a glance

![Travel Document Vault Family screen with sample profiles, grouped documents and trips](<https://mustafahafeez.com/assets/images/tdv-03-family.webp>)

A place for every traveller

![Travel Document Vault Reminders screen with upcoming document expiry notices](<https://mustafahafeez.com/assets/images/tdv-04-reminders.webp>)

Know what needs attention

![Travel Document Vault Trips screen with upcoming sample trips and readiness indicators](<https://mustafahafeez.com/assets/images/tdv-05-trips.webp>)

See the next trip clearly

**Why it started**

I built TDV after running into document-validity worries while travelling with my family.

**Technical choices**

No account required. Documents stay on your device by default, with optional encrypted backup to your own cloud.

**Ready offline**

Access saved documents without relying on airport Wi-Fi.

**Time to renew**

Passport reminders start eight months before expiry.

**Room for the family**

Pro adds family profiles and document checks against trip dates.

[Explore the product](<https://traveldocumentvault.com/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=work_tdv_product>) [Why I built it](<https://traveldocumentvault.com/blog/why-i-built-travel-document-vault/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=work_tdv_origin>) [How privacy works](<https://traveldocumentvault.com/privacy-verification/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=work_tdv_privacy>) [Privacy policy](<https://traveldocumentvault.com/privacy-policy/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=work_tdv_policy>)

Digital copies do not replace original travel documents or official entry requirements.

Engineering judgement

## A release boundary I can check.

Source files and working drafts stay private, while a separate output directory contains the material allowed to go live. I used agents to help develop and check that boundary.

- 01 / Constraint

### Keep private work private.

Source files and working drafts must stay outside the release directory.

- 02 / Choice

### List what can go live.

I use an explicit allowlist to check the complete output file list. An unexpected file makes the check fail.

- 03 / Check

### Try the rejection case.

A test deliberately adds an unapproved file to the generated directory and expects the check to fail.

**See what was checked**

A static example from the release described in my article. The full record retains the revision and individual checks.

**Output allowlist**

passed

**Private-file exclusion**

passed

**Draft exclusion**

passed

**Live text comparison**

matched

**Browser coverage**

recorded separately

These checks establish the behaviour of the tested output. Access control and the state of an already deployed host need their own checks.

[Read “Before I accept an AI agent’s changes”](<https://mustafahafeez.com/blog/reviewing-ai-agent-work/>)

02 / Career

## Career & education.

The foundations, the first placement, and the work that followed.

- Since 2007 Visokio

### Graduate engineer to senior software engineer

My work spans product development, reporting automation, security, releases and infrastructure, working with the Visokio team.

- Industry placement BusinessObjects

### Putting the foundations to work

My placement brought university learning into contact with professional software development.

- Education Kingston University

### First Class honours in software engineering

I received the best software engineering student award. Alongside my studies, I worked as a Java assistant, helping other students learn to program.

Keep in touch

## Let’s compare notes.

[Connect on LinkedIn](<https://www.linkedin.com/in/mustafahafeez-dev>)

[Read the HTML page](<https://mustafahafeez.com/about/>)
