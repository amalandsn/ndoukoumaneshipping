
# Content Management - Ready for Supabase Integration

This folder structure is prepared for Phase 2 Supabase CMS integration.

## Current Implementation (Phase 1)
- Blog posts are stored in `src/data/blogPosts.ts`
- Static content with TypeScript interfaces
- Ready for migration to Supabase

## Planned Supabase Integration (Phase 2)
- Replace static data with Supabase database
- Add real-time content management
- Implement automated publishing workflow
- Add email notifications and Slack integration

## File Structure (Future)
```
content/
├── blog/
│   ├── 2024-12-10-expeditions-dakar-europe.md
│   ├── 2024-12-03-pme-couts-consignation.md
│   └── ...
├── images/
│   ├── blog/
│   └── assets/
└── automation/
    ├── quality-assure.ts
    ├── email-notifications.ts
    └── scheduling.ts
```

## Database Schema (Planned)
- `blog_posts` table with bilingual fields
- `blog_categories` for organization  
- `blog_automation_logs` for tracking
- File storage for images and assets
