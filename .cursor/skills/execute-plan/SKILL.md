---
name: execute-plan
description: >-
  Executes structured implementation plans end-to-end: reads the plan file, follows
  steps in order, tracks todos, and finishes without scope creep. Use when the user
  references a plan file, asks to carry out, implement, or continue "the plan",
  mentions .plan.md or Cursor plan frontmatter todos, or wants work delegated in
  plan-sized chunks instead of ad-hoc exploration.
---

# Execute the plan

## When this skill applies

The user has (or should have) an explicit plan—often a markdown file under `.cursor/plans/` or linked with `file:///…plan.md`—with optional YAML todos in the frontmatter. Treat that document as the single source of truth for **what** to do and **in what order**.

## Workflow

1. **Resolve the plan path**
   - If the user pasted a `file://` or workspace path, open and read that file first.
   - If they say "the plan" without a path, search `.cursor/plans/*.md` for the most recently modified file matching the topic, or ask once for the exact path.

2. **Read completely before coding**
   - Read the full plan body and any frontmatter `todos` list.
   - Note dependencies called out in the plan (e.g. Redis, base assets, env vars).

3. **Execute in plan order**
   - Work through sections and todo items **sequentially** unless the plan explicitly allows parallel work.
   - Prefer completing one todo item fully before starting the next, unless blocked.

4. **Track progress**
   - If the environment supports todo lists, mirror the plan’s todos and mark items completed as you finish them.
   - If a step fails (missing dependency, build error), fix what the plan allows, or record the blocker and the minimal follow-up needed—do not silently skip a step.

5. **Stay within scope**
   - Do not refactor unrelated code, add docs the plan did not ask for, or expand features beyond the plan.
   - Match existing project patterns (imports, layout, naming) when implementing.

6. **Finish**
   - Summarize what was implemented vs. the plan, list any remaining todos or external prerequisites (e.g. "add `void-world-bedrock.mcworld` to `server/assets/`"), and note how to verify (build command, manual test).

## Anti-patterns

- Starting implementation without reading the plan file.
- Marking plan todos done when only part of the step is finished.
- Replacing the plan with a different approach without user confirmation when the plan is explicit.
