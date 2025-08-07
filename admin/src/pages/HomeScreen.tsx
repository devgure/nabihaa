// pages/Dashboard.tsx
const Dashboard = () => {
  const { data: stats } = useQuery(['stats'], () => adminApi.get('/admin/analytics').then(r => r.data));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card title="Daily Users" value={stats?.dau} />
        <Card title="Matches" value={stats?.matches} />
        <Card title="Revenue" value={`$${stats?.revenue}`} />
      </div>
    </div>
  );
};