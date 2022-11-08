export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-screen">
      <div className="flex w-col">
        <aside className="flex flex-col bg-gray-500 h-screen w-72">
          
        </aside>
        <main className="bg-red-500 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}