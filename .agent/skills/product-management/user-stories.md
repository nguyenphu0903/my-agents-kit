# User Stories & Acceptance Criteria

> "Conversations, not contracts." - Alistair Cockburn

## The INVEST Criteria

A good User Story must be:
- **I**ndependent: Can be developed separately.
- **N**egotiable: Open to discussion.
- **V**aluable: Delivers value to the user/customer.
- **E**stimable: Development team can estimate it.
- **S**mall: Can be completed in one sprint (or less).
- **T**estable: Has clear Acceptance Criteria.

## User Story Template

```markdown
**Title**: [User Role] - [Feature Impact]

**As a** [User Role]
**I want to** [Action/Feature]
**So that** [Benefit/Value]
```

### Example
> **As a** Registered User
> **I want to** reset my password via email
> **So that** I can regain access if I forget my credentials

---

## Gherkin (Acceptance Criteria)

Use **Behavior-Driven Development (BDD)** syntax to define "Done".

### Template
```gherkin
Scenario: [Scenario Name]
  Given [Precondition]
  And [Key state]
  When [Action]
  Then [Expected Result]
  And [Side Effect]
```

### Key Rules
1.  **Given**: Setup state. (e.g., "Given the user is logged out")
2.  **When**: The trigger. (e.g., "When they click 'Forgot Password'")
3.  **Then**: The assertion. (e.g., "Then they see a success message")

### Example (Password Reset)

```gherkin
Scenario: Requesting a password reset with valid email
  Given the user is on the Login Page
  When they enter "valid@example.com" in "Forgot Password"
  And click "Send Reset Link"
  Then the system sends a reset email to "valid@example.com"
  And the UI shows "Check your email" toast message

Scenario: Requesting reset with non-existent email
  Given the user is on the Login page
  When they enter "ghost@example.com"
  And click "Send Reset Link"
  Then the UI shows "Check your email" toast message
  # Security requirement: Don't reveal user existence
  And no email is sent
```

---

## Splitting Stories (Spider)

If a story is too big (Epic), split it by:
1.  **S**pike: Research first.
2.  **P**ath: Happy path vs Error path.
3.  **I**nterface: Web vs Mobile.
4.  **D**ata: Hardcoded data vs Dynamic data.
5.  **E**xperience: Basic UI vs Fancy implementation.
6.  **R**ules: Simple rules vs Complex validation.
