# Contemporary Fusion Reviews

## Current State
The Reviews section is a single grid of 6 review cards with minimal interactivity — no filtering, no sorting, no featured highlight, and no way to engage beyond a static "Read More" link. The homepage sections (Hero, Curated) are significantly denser and more interactive by comparison.

## Requested Changes (Diff)

### Add
- Genre filter tabs bar (All, New Release, World Fusion, Live Review) that filters the visible cards with smooth transitions
- A featured/spotlight review hero card above the grid — larger format, horizontal layout on desktop, with a rating score and a prominent CTA
- Star rating display (out of 5) on each review card
- A stats strip between the heading and the grid (e.g. "12 Reviews", "6 Artists", "3 Genres") with animated counters
- Sort dropdown (Newest, Oldest, Highest Rated) that re-orders cards
- Search input to filter reviews by title or author
- Animated card entrance with stagger when filter changes
- "Load More" button below the grid (simulated — toggles between showing 3 and 6 cards)
- Quick-detail hover overlay on card image showing rating + genre tag more prominently

### Modify
- Review data: add `rating` (number 1–5), `genre` field to each review object for filtering
- ReviewsSection heading area: add the stats strip and search/sort controls below the heading
- Review cards: integrate rating stars, improve spacing and hierarchy

### Remove
- Nothing removed

## Implementation Plan
1. Extend review data objects with `rating` (float) and `genre` string fields
2. Add genre filter state, search state, sort state, and visibleCount state to ReviewsSection
3. Build the featured review hero card component (first/highest-rated review, large horizontal card)
4. Build the stats strip with 3 stat bubbles
5. Build the filter/search/sort toolbar (genre tabs + search input + sort select)
6. Implement filtered + sorted + searched derived list
7. Add star rating display to each card
8. Add stagger animation on filter change
9. Add Load More / Show Less toggle button
10. Validate and deploy
