import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './useAuth';

export interface Item {
  id: string;
  content: string;
  quantity: number;
  is_purchased: boolean;
  created_by: string;
  created_at: string;
}

export function useShoppingList() {
  const { session } = useAuth();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!session) return;
    fetchItems();
    const channel = supabase
      .channel('public:shopping_list_items')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shopping_list_items' }, () => {
        fetchItems();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  async function fetchItems() {
    const { data } = await supabase
      .from<Item>('shopping_list_items')
      .select('*')
      .order('created_at');
    if (data) setItems(data);
  }

  async function addItem(content: string, quantity: number) {
    await supabase.from('shopping_list_items').insert({ content, quantity });
  }

  async function updateItem(id: string, fields: Partial<Item>) {
    await supabase.from('shopping_list_items').update(fields).eq('id', id);
  }

  async function deleteItem(id: string) {
    await supabase.from('shopping_list_items').delete().eq('id', id);
  }

  return { items, addItem, updateItem, deleteItem };
}
