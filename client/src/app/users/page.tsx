import { Suspense } from "react";
import { Loading } from "@/components/loading/Loading";
import { UserItem } from "@/components/users/userItem/UserItem";
import prisma from "@/lib/prisma";
import { CreateNewUser } from "@/components/users/createNewUser/CreateNewUser";

export default async function UsersPage() {
  const users = await prisma.user.findMany()

  return (
    <div className="flex flex-col h-full">
      <h1 className="heading-primary mb-6">Users</h1>
      <p className="text-description mb-4">Manage all users</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-secondary">All users</h2>
        <CreateNewUser />
      </div>

      <Suspense fallback={<Loading />}>
        <div className="space-y-4 overflow-scroll p-1">
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};
