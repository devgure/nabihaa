// admin/src/pages/Users.tsx
import { useEffect, useState } from 'react';
import axios from '../services/adminApi';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/admin/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Location</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.displayName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.location?.latitude}</td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded">Ban</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}