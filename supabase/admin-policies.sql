-- Admin policies — run AFTER schema.sql
-- Allows authenticated users (admins) full access to all tables

-- Blog posts: full CRUD for authenticated users
create policy "Admins can manage blog posts"
  on blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- Projects: full CRUD for authenticated users
create policy "Admins can manage projects"
  on projects for all
  to authenticated
  using (true)
  with check (true);

-- Messages: authenticated users can read and delete
create policy "Admins can manage messages"
  on contact_messages for all
  to authenticated
  using (true)
  with check (true);
