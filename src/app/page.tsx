// src/app/page.tsx
export default function Home() {
  return (
    // 1. CONTAINER CHÍNH (Desktop)
    // min-h-screen: Đảm bảo web luôn cao ít nhất bằng màn hình
    // p-8: Padding xung quanh (khoảng hở lề)
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        <section className="lg:col-span-4 flex flex-col gap-6">
          <div className="border-2 border-green-500 bg-gray-900 h-64 p-4 text-green-500">WINDOW: PROFILE</div>
          <div className="border-2 border-green-500 bg-gray-900 h-40 p-4 text-green-500">WINDOW: CONTACT</div>
        </section>
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="border-2 border-purple-500 bg-gray-900 h-48 p-4 text-purple-500">WINDOW: TECH STACK</div>
          <div className="border-2 border-purple-500 bg-gray-900 h-96 p-4 text-purple-500">WINDOW: PROJECTS</div>
        </section>

      </div>
    </main>
  );
}