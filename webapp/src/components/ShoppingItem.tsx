import { Item } from '../hooks/useShoppingList';
import { useAuth } from '../hooks/useAuth';

interface Props {
  item: Item;
  onToggle: (id: string, is_purchased: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string, quantity: number) => void;
}

export default function ShoppingItem({ item, onToggle, onDelete, onEdit }: Props) {
  const { session } = useAuth();
  const isOwner = item.created_by === session?.user.id;
  return (
    <li style={{ background: isOwner ? '#e6ffe6' : undefined }}>
      <input
        type="checkbox"
        checked={item.is_purchased}
        onChange={(e) => onToggle(item.id, e.target.checked)}
      />
      {item.content} x{item.quantity}
      <button onClick={() => onEdit(item.id, item.content, item.quantity)}>Edit</button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
}
