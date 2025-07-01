import { Button } from "@/components/button/Button";
import { UserItem } from "@/components/users/userItem/UserItem";
import prisma from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany()

  // const handleAddUser = () => {
  //   console.log('add user')
  // };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Users</h1>
      <p className="text-lg text-gray-600 mb-10">Manage all users</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All users</h2>
        <Button title="Add New User" />
      </div>

      <div className="space-y-4">
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
