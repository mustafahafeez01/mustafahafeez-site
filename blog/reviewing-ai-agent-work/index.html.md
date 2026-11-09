# Before I accept an AI agent’s changes

What I ask agents to show before accepting a change, using build and release checks as a concrete example\.

By Mustafa Hafeez · 2026-11-09

## The takeaway

Ask for the version that was checked, evidence for a specific failure case and a clear account of what remains untested\.

![Conceptual paper models of an app and websites bring work towards a human review desk and release gate\.](https://mustafahafeez.com/assets/images/articles/ai-agent-review-cover.webp)

A conceptual illustration of preparing work across an app and its websites\.

## Decide what the task needs to prove

I use AI coding agents for implementation, code review, testing and release verification\. I set the direction, inspect the work and make the final decisions\. Part of that work is deciding what evidence an agent needs to bring back\.

One practical use has been a static publishing workflow\. Source files and working drafts stay private, while a separate output directory contains the material allowed to go live\. I used agents to help develop and check that boundary\.

The useful question was whether the files being released matched the rules and the version that had been reviewed\. A successful build was one piece of evidence\. The output itself still needed checking\.

## Inspect the files the build actually produces

The publishing check compares the complete output file list with an explicit allowlist\. An unexpected file makes the check fail\. That gives the release process a concrete condition to enforce\.

The tests also place a recognisable marker in private fixture files, generate the site and inspect the output for that marker\. This checks the result of the build\. It can expose a copy step that includes material the release should exclude\.

A separate check deliberately adds an unapproved file to the generated directory and expects rejection\. That negative case matters\. A check that only accepts a clean output has not yet demonstrated that it catches an unwanted file\.

These checks establish the behaviour of the tested output\. The record includes the test conditions and results\.

## Test the change between public and private output

The generator was tested in both public and non\-indexable configurations\. In public mode, discovery files and article routes had to include only approved material\. In the non\-indexable mode, generated feeds and readable discovery files had to be absent\.

That transition is worth testing explicitly\. A file created by an earlier build can remain on disk if a later build simply stops writing it\. The checks cover rebuilding and removing generated discovery output when the mode changes\.

This establishes behaviour in the tested build directories\. Access control and the state of an already deployed host need their own checks\. A local cleanup cannot remove a file from a remote server\.

## Match the reviewed version to the release

My workflow records the revision being checked\. If files change after review, the earlier result leaves a question about the later edits\. With agents or several working copies involved, the directory used for a check is part of the evidence too\.

After a manual release, a verification step compared hashes of the local public text files with the responses served by the website\. The comparison matched\. Its scope was file delivery; interaction and visual checks were recorded separately\.

A sanitised summary of that release evidence looks like this\. The full record retains the revision and individual checks\.

```
Output allowlist: passed
Private-file exclusion: passed
Draft exclusion: passed
Live text comparison: matched
Browser coverage: recorded separately
```

![Tests and review match revision A\. A later edit creates revision B, which needs its own review before release\.](https://mustafahafeez.com/assets/images/articles/ai-agent-revision-evidence-v4.webp)

A simplified illustration\. Evidence recorded for revision A does not establish that revision B has been checked\.

## Give the reviewer a boundary to challenge

For this kind of change, I want the reviewer to investigate whether an unapproved file can reach the release directory\. That is a specific question with a rejection case to examine\. The reviewer can inspect the file\-list comparison and the test that deliberately supplies an unexpected file\.

A second agent can still repeat the first agent’s assumptions\. Written results need their scope and unperformed checks alongside them, especially when a report uses a broad word such as “verified”\.

GitHub offers an optional protected\-branch setting that dismisses stale approvals when commits change the reviewed diff\. It applies the same idea of attaching approval to the work that was inspected\.

The tools available to an agent also deserve review\. Instructions alone do not reduce the permissions held by a credential\. OWASP’s excessive\-agency guidance recommends limiting functionality and permissions, with human approval for high\-impact actions\.

For a recent agent\-assisted change, identify one condition the release must reject\. Check whether the evidence demonstrates that rejection, and whether it belongs to the files about to be released\. That gives you a concrete next step when a completion summary is too broad\.

## About this note

This article draws on checks I’ve used in my own AI\-assisted development and static\-site publishing work\. It explains the technical approach and what the checks establish, with project\-specific details generalised\. Adapt the checks to your own build, permissions and release process\.

## Sources

- [GitHub Docs, protected branches and stale review approvals](<https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches>)

- [OWASP Gen AI Security Project, Excessive Agency \(2025\)](<https://genai.owasp.org/llmrisk/llm062025-excessive-agency/>)

[Read on the website](https://mustafahafeez.com/blog/reviewing-ai-agent-work/)
