import { Sidebar } from "@/components/sidebar/Sidebar";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
