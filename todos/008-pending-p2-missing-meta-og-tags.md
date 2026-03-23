---
status: pending
priority: p2
issue_id: "008"
tags: [code-review, seo, sharing]
---

# Add Meta Description and OG/Social Preview Tags to All Pages

## Problem Statement
None of the four pages have `<meta name="description">`, Open Graph tags, or Twitter card tags. When a recruiter shares the portfolio URL in Slack, LinkedIn DM, or email, the link preview will be a blank card — no image, no description, just the bare title text. Google will auto-generate a description from whatever text it first encounters (likely the animated greeting "Hi!"). This directly hurts the portfolio's effectiveness as a job search tool.

## Findings
Confirmed on all 4 HTML files: the only `<meta>` tags present are `charset` and `viewport`.

## Proposed Solution
Add to each page's `<head>`. For `index.html`:
```html
<meta name="description" content="Brandon Petersen — Product Manager II at Sam's Club building AI-powered tools and omni-commerce experiences at Fortune 1 scale.">

<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="Brandon Petersen — Product Manager">
<meta property="og:description" content="Product Manager II building AI-driven products at Fortune 1 scale. Explore case studies and work.">
<meta property="og:image" content="https://yourdomain.com/images/og-preview.jpg">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Brandon Petersen — Product Manager">
<meta name="twitter:description" content="Product Manager II building AI-driven products at Fortune 1 scale.">
<meta name="twitter:image" content="https://yourdomain.com/images/og-preview.jpg">

<link rel="canonical" href="https://yourdomain.com/">
```

Create a 1200×630px OG preview image (a simple branded card with name + title works well).

Write page-specific descriptions for `work.html`, `IBG_Case_Study.html`, and `curbside_case_study.html`.

## Acceptance Criteria
- [ ] Pasting the portfolio URL into Slack shows a rich link preview with image and description
- [ ] Google Search Console shows a meta description for the homepage
- [ ] All 4 pages have unique, accurate meta descriptions
- [ ] OG image exists and renders correctly in link preview tools

## Effort: Medium (1–2 hrs including OG image creation)
