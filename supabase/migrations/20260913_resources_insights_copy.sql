-- Resources & Insights copy: weekly cadence, new hero, shorter publish FAQ.
-- Paste into Supabase SQL Editor if this environment does not auto-apply migrations.

update public.resources_page_copy
set
  hero_title = $q$Explore guides, expert insights, and FAQs.$q$,
  hero_subtitle = $q$Comparative and educational content on sensor-agnostic architecture, contextual AI intelligence, and compliance for government, care, enterprise environments.$q$,
  hero_note = ''
where id = 1;

update public.resource_faqs
set answer = $q$Resources & Insights publishes one new piece per week.$q$
where question = 'How often is new content published?';
