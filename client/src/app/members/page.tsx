import { MemberItem } from "@/components/members/memberItem/MemberItem";
import prisma from "@/lib/prisma";

export default async function MembersPage() {
  const users = await prisma.user.findMany()

  const handleAddMember = () => {
    const newMemberName = prompt('Enter new member name:');
    if (newMemberName) {
      console.log([...users, { id: Date.now(), name: newMemberName, role: 'New Member', email: `${newMemberName.toLowerCase().replace(/\s/g, '.')}@example.com` }]);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Team Members</h1>
      <p className="text-lg text-gray-600 mb-10">Manage your team and their roles.</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Members</h2>
        <button
          onClick={handleAddMember}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add New Member
        </button>
      </div>

      <div className="space-y-4">
        {users.map(user => (
          <MemberItem key={user.id} member={user} />
        ))}
      </div>
    </div>
  );
};
