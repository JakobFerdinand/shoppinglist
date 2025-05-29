import { useState } from 'react';
import ShoppingItem from './ShoppingItem';
import { useShoppingList } from '../hooks/useShoppingList';

export default function ShoppingList() {
  const { items, addItem, updateItem, deleteItem } = useShoppingList();
  const [content, setContent] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    await addItem(content, quantity);
    setContent('');
    setQuantity(1);
  };

  const handleToggle = (id: string, is_purchased: boolean) => {
    updateItem(id, { is_purchased });
  };

  const handleEdit = (id: string, c: string, q: number) => {
    const newContent = prompt('Item', c);
    const newQuantity = Number(prompt('Quantity', q.toString()));
    if (newContent) updateItem(id, { content: newContent, quantity: newQuantity });
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Item"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onToggle={handleToggle}
            onDelete={deleteItem}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}
