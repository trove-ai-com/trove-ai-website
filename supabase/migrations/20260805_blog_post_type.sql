-- Adds a post_type classification (insight / guide / faq) to blog_posts.
-- Paste into Supabase SQL Editor and run.

alter table public.blog_posts
  add column if not exists post_type text not null default 'insight';

alter table public.blog_posts
  drop constraint if exists blog_posts_post_type_check;

alter table public.blog_posts
  add constraint blog_posts_post_type_check
  check (post_type in ('insight', 'guide', 'faq'));
