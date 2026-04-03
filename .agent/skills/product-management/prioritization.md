# Prioritization Frameworks

> "Strategy is deciding what NOT to do."

## 1. MoSCoW Method
Best for: Time-boxed releases (Sprints).

- **M - Must Have**: Non-negotiable. Without this, the release fails.
- **S - Should Have**: Important but not vital. Can workaround.
- **C - Could Have**: Desirable. "Nice to have" if time permits.
- **W - Won't Have**: Explicitly out of scope for *this* release.

## 2. RICE Scoring
Best for: Quantitative comparison of features.

$$ Score = \frac{Reach \times Impact \times Confidence}{Effort} $$

| Factor | Definition | Scale |
|---|---|---|
| **R**each | User count / Time period | # of users |
| **I**mpact | Effect on goal | 3 (Massive), 2 (High), 1 (Medium), 0.5 (Low) |
| **C**onfidence | How sure are we? | 100% (High), 80% (Medium), 50% (Low) |
| **E**ffort | Engineer/Design/Product time | Person-Weeks |

## 3. WSJF (Weighted Shortest Job First)
Best for: SAFe / Lean / Continuous Flow.

$$ WSJF = \frac{Cost of Delay}{Job Duration} $$

**Cost of Delay** = User Business Value + Time Criticality + Risk Reduction.

## Decision Matrix (The Eisenhower for Product)

| | High Urgency | Low Urgency |
|---|---|---|
| **High Value** | **DO NOW** (Critical Path) | **PLAN** (Strategic Roadmap) |
| **Low Value** | **DELEGATE** (Or Automation) | **DELETE** (Distraction) |

---

## The Kano Model (Delighters)

Classify features by customer satisfaction:
1.  **Must-Be**: Basic expectations. (e.g., Hotel has a bed). Absence = Dissatisfaction.
2.  **Performance**: Linear. (e.g., Internet speed). More is better.
3.  **Delighters**: Unexpected. (e.g., Warm cookies at check-in). Absence = Neutral, Presence = Delight.

> **Strategy**: Ensure Must-Bes are solid, compete on Performance, sprinkle Delighters.
