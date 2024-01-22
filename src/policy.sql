-- create policy "Individuals can view their own exports."
-- on export_duplicate for select
-- using ( auth.uid() = user_id );
-- See https://supabase.com/docs/guides/auth/row-level-security#policies

-- create policy "Enable insert for authenticated users only"
-- on "public"."export_duplicate" as permissive for insert
-- to authenticated with check(true)