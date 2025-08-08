import { MatchManager } from "@/components/MatchManager/MatchManager";

export const HomePage = () => {
  return (
    <main className="flex items-center p-12 justify-start mt-auto min-h-screen flex-col">
      <h1 className="text-2xl ">
        Welcome to Sheriff of Nottingham Score Calculator
      </h1>

      <MatchManager />
    </main>
  );
};
