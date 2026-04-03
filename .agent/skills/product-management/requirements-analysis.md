# Requirements Analysis

> "Building the wrong thing faster is just waste."

## Techniques

### 1. Example Mapping
Collaborative session (Three Amigos) to clarify rules.
- **Yellow Card**: User Story
- **Blue Card**: Rules
- **Green Card**: Examples (Tests)
- **Red Card**: Questions (Unknowns)

**Process**:
1.  Write the Story.
2.  Write a Rule.
3.  Write an Example for that Rule.
4.  Repeat until "Done".

### 2. The 5 Whys
Dig deeper to find the root cause/value.

> "I want a report button."
> *Why?* "To see weekly sales."
> *Why?* "To know if we met the quota."
> *Why?* "To pay commissions."
> *Real Requirement*: "I want to calculate sales commissions." (Maybe a dashboard is better than a PDF report).

### 3. Edge Case Discovery (The "What If")

Always ask:
- **Zero**: No data? No internet? No permissions?
- **One**: Single item? New user?
- **Many**: Pagination? 1000 items?
- **Invalid**: Bad input? SQL injection text?
- **Conflict**: Two users editing same item?

---

## Non-Functional Requirements (NFRs)

Don't forget the "Quality Attributes" (-ilities).

| Attribute | Question |
|---|---|
| **Performance** | Max latency? Throughput? |
| **Scalability** | 1k users or 1M users? |
| **Security** | Auth? Roles? Encryption? |
| **Reliability** | What happens if DB is down? |
| **Accessibility** | Metric (WCAG AA)? |
| **Localization** | Multi-language? Timezones? |

---

## The "Definition of Ready" (DoR)

A story is ready for engineering when:
- [ ] User Persona is clear.
- [ ] Business Value is clear.
- [ ] Acceptance Criteria (Gherkin) is written.
- [ ] Dependencies are identified.
- [ ] UI/UX wireframes (if applicable) are attached.
