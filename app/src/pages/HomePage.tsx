import { MatchManager } from "@/components/MatchManager/MatchManager";

export const HomePage = () => {
  return (
    <main className="flex items-center p-6 justify-start mt-auto min-h-screen flex-col">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Sheriff of Nottingham Score Calculator
        </h1>
      </header>
      <div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Calculate scores for your Sheriff of Nottingham board game matches
          instantly. Track player scores, contraband goods, and determine the
          winner with this independent free online tool.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            How to use
          </h2>
          <ol className="text-sm text-blue-800 text-left space-y-1">
            <li>1. Add players (2-5 players supported)</li>
            <li>2. Enter each player's legal goods and contraband</li>
            <li>3. Click "Calculate Score" to see final results</li>
            <li>4. Start a new match anytime</li>
          </ol>
        </div>
      </div>

      <section aria-label="Score Calculator">
        <MatchManager />
      </section>

      <footer className="mt-16 text-center text-sm text-gray-500 max-w-2xl">
        <p>
          This tool helps you calculate scores for the Sheriff of Nottingham
          board game, a medieval trading and bluffing game by Arcane Wonders.
          Perfect for game nights and tournaments!
        </p>
      </footer>
    </main>
  );
};
