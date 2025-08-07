// admin/src/pages/Users.tsx
import { useEffect, useState } from 'react';
import axios from '../services/adminApi';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/admin/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <table className="min-w-full mt-4 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Location</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.displayName}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.location?.latitude.toFixed(4)}</td>
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