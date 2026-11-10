# When an AI agent cannot run your tests

How I adapted tooling tests for a restricted environment, and why some checks still needed the real machine\.

By Mustafa Hafeez · 2026-11-10

## The takeaway

Before replacing an external dependency with a fixture, identify the real behaviour each test must still observe\.

![A paper model testing station inside a transparent enclosure and a physical computer feed results towards a shared review notebook\.](https://mustafahafeez.com/assets/images/articles/agent-test-environments-cover.webp)

A conceptual illustration of testing inside a restricted environment and against the real machine\.

## The agent could change the code but could not verify it

While working on the developer tooling around my app, I wanted coding agents to run useful checks before handing changes back for review\. Some tests depended on the real machine’s process list and local sockets, which the agent’s sandbox restricted\. The agent could edit the code but could not run the same checks that worked outside it\.

Running everything outside the sandbox would leave another person or agent responsible for each verification run\. I chose to make the tests that could work inside it do so, while keeping real\-machine checks in a separate host run\.

That adaptation introduced a second problem\. Replacing an operating\-system call with supplied data could make a test pass while removing the very behaviour it used to check\. The work needed to preserve coverage as well as make tests runnable\.

## Separate the decision from the observation

Consider a tool that checks whether a background process is still running\. There are two things to test\. Does it make the right decision from a supplied process list? And can it obtain the right information from the real machine?

For the first question, a fixture works well\. Supply a small, known process list and check the decision\. That test can run without inspecting unrelated processes on the computer\.

The second question needs a real process\. A fixture cannot establish that the operating\-system call works or that the tool observes the process correctly\.

A fixture is supplied test data\. In this case it let the code receive a known process list through a small input boundary, while ordinary execution continued to use the real operating\-system command\. That kept the decision test independent of what happened to be running on the laptop\.

## A passing fixture test leaves a question unanswered

This toy example illustrates the distinction using invented data\. It checks whether a supplied list contains a process identifier\.

```
function isRunning(pid, listProcesses) {
  return listProcesses().includes(pid);
}

isRunning(42, () => [42, 73]); // true
isRunning(42, () => [73]);     // false
```

## Keep a check of the real interaction

Those cases exercise the present and absent decisions\. They would keep passing if the real process\-list command stopped working, because that command never runs in either case\. A separate test needs to start a controlled process and check that the real observation can find it\.

I would also ask how an observation error is handled\. Treating an unavailable process list as an empty list could confuse “could not check” with “process is gone”\. The expected behaviour needs to be explicit in the code’s own contract\. This is a review question, not a claim about a further bug in my project\.

## Review caught checks the fixtures had lost

During review, some replacement tests were found to have lost checks of real process behaviour\. One asserted information constructed by the test itself\. Another replacement could only see processes it had already been told about, so it could miss a stray process\.

Those findings changed the repair\. The original operating\-system checks were preserved in a separately named host\-only set\. Fixture\-based tests covered the decision logic inside the sandbox\. The host checks ran separately with the access they required\.

The important review step was comparing what the old tests observed with what their replacements could observe\. Keeping a similar assertion or a passing test count would have hidden that loss\. The host tests retained the external observation, while fixtures made individual decisions easier to exercise\.

![Use sandbox fixtures to test decisions from known inputs\. Keep host integration checks for real system interactions\. Review both results\.](https://mustafahafeez.com/assets/images/articles/agent-test-environments-flow-v2.svg)

Fixture and host checks answer separate questions about the same implementation\.

## Both environments needed a result

The recorded final checks passed for the targeted sandbox suites and the full host run\. I kept their scopes separate\. A passing sandbox run covered the tests selected for that environment, while the host run supplied the broader integration evidence\.

This split also creates an obligation\. The host\-only checks need an explicit place in the review process, otherwise moving them out of the agent’s run can quietly remove them from everyday verification\.

A useful handover identifies the test set, environment, revision and result together\. If the sandbox run excludes host\-only tests, the review needs the host result alongside it\. Naming the split makes it possible to see which evidence is still missing\.

## Ask what the test actually observes

When adapting tests for an agent, write down what each existing test observes before changing it\. If it checks a real external interaction, preserve a check of that interaction somewhere you will actually run it\.

A useful review question is whether the implementation could break while the fixture\-based test still passed\. If the answer is yes, identify which test would catch that failure and where it runs\.

This distinction applies to other dependencies too\. A fake database can exercise how code handles a returned row\. A separate integration check is needed to establish that the real query and connection work in the intended environment\. Choose the split according to the behaviour being tested\.

## About this note

Based on a recorded investigation in my own development tooling\. Implementation details are generalised\. AI agents helped with research, changes and review\. I chose the approach and the split between sandbox and host checks\. The code example uses invented identifiers and illustrates the testing distinction\.

## Sources

- [Jest documentation on replacing dependencies with mock data](<https://jestjs.io/docs/manual-mocks>)

[Read on the website](https://mustafahafeez.com/blog/tests-inside-agent-sandbox/)
