import dynamic from "next/dynamic";


const HomePage = dynamic(() => import("./home/page")); // ✅ Use PascalCase

export default function Home() {
  return (
    <div>
      <HomePage /> {/* ✅ Use PascalCase here too */}
    </div>
  );
}
