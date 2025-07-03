import { Suspense } from "react";
import { Button } from "@/components/button/Button";
import { Loading } from "@/components/loading/Loading";
import { UserItem } from "@/components/users/userItem/UserItem";
import prisma from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany()

  return (
    <div>
      <h1 className="heading-primary">Users</h1>
      <p className="text-description">Manage all users</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-secondary">All users</h2>
        <Button title="Add New User" />
      </div>

      <Suspense fallback={<Loading />}>
        <div className="space-y-4">
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};
