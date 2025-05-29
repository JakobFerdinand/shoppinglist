-- Supabase schema for shopping list application
-- Create table
create table if not exists public.shopping_list_items (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  quantity integer not null default 1,
  is_purchased boolean not null default false,
  created_by uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable Row Level Security
alter table public.shopping_list_items enable row level security;

-- Policies so users can manipulate only their own items
create policy "Individuals can manage their own items" on public.shopping_list_items
  for all
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);
