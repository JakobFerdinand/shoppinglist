import Login from './components/Login';
import ShoppingList from './components/ShoppingList';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { session, signOut } = useAuth();
  return (
    <div>
      <h1>Shared Shopping List</h1>
      {session ? (
        <>
          <button onClick={signOut}>Logout</button>
          <ShoppingList />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
