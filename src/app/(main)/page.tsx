import { LoadingWrapper } from "@/components/LoadingWrapper";
import HomePage from "@/components/pages/HomePage";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <LoadingWrapper>
        <HomePage />
      </LoadingWrapper>
    </main>
  );
}
