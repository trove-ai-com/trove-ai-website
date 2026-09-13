-- Ensure the public photo library bucket exists.
-- Run in Supabase SQL Editor if uploads fail with a missing-bucket error.

insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read content images" on storage.objects;
create policy "Public read content images"
  on storage.objects for select
  using (bucket_id = 'content-images');

drop policy if exists "Auth upload content images" on storage.objects;
create policy "Auth upload content images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'content-images');

drop policy if exists "Auth update content images" on storage.objects;
create policy "Auth update content images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'content-images');

drop policy if exists "Auth delete content images" on storage.objects;
create policy "Auth delete content images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'content-images');
