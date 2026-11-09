# Before I accept an AI agent’s changes

What I ask agents to show before accepting their work on Travel Document Vault, from existing\-data checks to the version being released\.

By Mustafa Hafeez · 2026-11-09

## The takeaway

Ask for the version that was checked, evidence for a specific failure case and a clear account of what remains untested\.

![Conceptual paper models of an app and websites bring work towards a human review desk and release gate\.](https://mustafahafeez.com/assets/images/articles/ai-agent-review-cover.webp)

A conceptual illustration of preparing work across an app and its websites\.

## A change needs something I can inspect

I use AI coding agents while building Travel Document Vault and maintaining its support site\. I set the direction, review their work and make the final decisions\. Part of that work has been shaping the development process around the agents themselves\.

The process asks for small changes, a separate review and evidence tied to the version being checked\. Publishing remains an explicit decision\. Those requirements matter when an agent reports that a task is done, because a convincing summary can leave important questions unanswered\.

Which files changed? What behaviour was checked? Did the checks run against those files? What is still unknown? I want enough detail to inspect the work without having to reconstruct the session\.

## Check what happens to something already saved

In a mobile app, an update has to work with data people already have\. A fresh installation can miss problems that only appear when an older record is loaded, changed and saved again\.

Consider a fictional app where the task is to let someone rename a saved item\. The label changes on screen and the save action succeeds\. That still leaves a useful test: close the app, reopen the item and check both the new label and the fields that the edit should have left alone\.

The implementation might replace the stored object with a smaller object containing only the edited fields\. A test that checks the label immediately after editing could pass while missing that loss\. Starting with a representative older record makes the test more demanding\.

For this example, I would ask the review to follow the value through editing, saving and loading again\. If an upgrade path exists, include an older\-format fixture\. The useful evidence is the resulting record, including the fields expected to remain unchanged\.

## Keep the evidence attached to the files

My workflow asks for the exact revision when work is handed over for review\. A test result from an earlier version leaves the later edits unchecked\. With several agents or working copies involved, the working directory matters too\.

A short handover can make that visible\. The following is a fictional review note showing the kind of information to record\. Its check descriptions are examples, not results from TDV\.

```
Change: rename a saved item
Version: example-revision-A
Checked: save and reopen an existing record
Checked: unrelated fields remain unchanged
Unchecked: upgrade on a physical device
```

![Tests and review match revision A\. A later edit creates revision B, which needs its own review before release\.](https://mustafahafeez.com/assets/images/articles/ai-agent-revision-evidence-v4.webp)

A fictional illustration\. Evidence recorded for revision A does not establish that revision B has been checked\.

## Give the review a failure to look for

I ask for a separate review of the change\. That gives the reviewer a chance to inspect the work without inheriting the whole conversation that produced it\. It still needs a concrete question to investigate\.

For the rename example, ask whether saving can discard an unrelated field\. The reviewer can inspect how the stored object is updated and check whether the test would fail if a field disappeared\. That is a more useful task than asking whether the code looks good\.

A second agent can share the first agent’s mistaken assumption\. Passing tests and a favourable review leave uncertainty, so the handover should state gaps plainly\. A device check that has not run belongs in that record\.

## Approval belongs to a particular version

My development workflow requires my approval before a release\. If the files change after review, I need to understand what changed and which checks need repeating before approving that version\.

GitHub has an optional protected\-branch setting that dismisses stale pull\-request approvals when commits change the reviewed diff\. It is a familiar example of attaching approval to the work that was actually inspected\.

There is also a permissions question underneath the process\. An instruction to prepare a change can be carried out through a tool with much broader powers\. Check which operations the integration can perform and where those permissions are enforced\. OWASP’s excessive\-agency guidance recommends limiting functionality and permissions, with human approval for high\-impact actions\.

For one recent agent\-assisted change, try matching the final files to the review and test evidence\. Then pick a failure case involving existing data\. If the evidence cannot answer it, that gives you a specific next check before accepting the work\.

## About this note

This article describes my development workflow at a general level\. The rename example and review note are fictional teaching examples\. The checks suit the example; each project needs its own review, testing and release controls\.

## Sources

- [GitHub Docs, protected branches and stale review approvals](<https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches>)

- [OWASP Gen AI Security Project, Excessive Agency \(2025\)](<https://genai.owasp.org/llmrisk/llm062025-excessive-agency/>)

[Read on the website](https://mustafahafeez.com/blog/reviewing-ai-agent-work/)
