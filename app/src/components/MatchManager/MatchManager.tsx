import { useState } from "react";
import { Button } from "../ui/button";
import { PlayerModal } from "../PlayerModal";
import { PlayerCard } from "../PlayerCard";
import type { Player } from "@/utils/types";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { calculateKingsAndQueens, calculateScore } from "@/utils/helpers";

export const MatchManager = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerModalOpen, setNewPlayerModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [matchScore, setMatchScore] = useState();
  const [kingsAndQueens, setKingsAndQueens] = useState();

  const openNewPlayerModal = () => {
    setNewPlayerModalOpen(true);
  };

  const closeNewPlayerModal = () => {
    setNewPlayerModalOpen(false);
  };

  const addPlayer = (player: Player) => {
    if (players.length < 5) {
      const alreadyExists = players.find(
        (p) => player.name.toLowerCase() === p.name.toLowerCase()
      );
      if (alreadyExists) {
        // Move this to player form or toast
        setErrorMessage("Player already exists");
      } else {
        setPlayers((prevPlayers) => [...prevPlayers, { ...player }]);
        setErrorMessage("");
      }
      closeNewPlayerModal();
    } else {
      setErrorMessage("Cannot add more than 5 players");
    }
  };

  const removePlayer = (player: Player) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((p) => p.name !== player.name)
    );
    setErrorMessage("");
  };

  // TODO: Extract this to provider
  const onCalculateScore = () => {
    const score = calculateScore(players);
    const kingsAndQueens = calculateKingsAndQueens(players);
    console.log("kingsAndQueens", kingsAndQueens);

    setMatchScore(score);
    setKingsAndQueens(kingsAndQueens);

    const sortedPlayers = [...players].sort((a, b) => {
      return score[b.name].total - score[a.name].total;
    });
    setPlayers(sortedPlayers);
  };

  const onResetMatch = () => {
    setMatchScore(undefined);
    setKingsAndQueens(undefined);
    setPlayers([]);
  };

  return (
    <div className="mt-8 flex flex-col space-y-2">
      <PlayerModal
        isOpen={newPlayerModalOpen}
        onClose={closeNewPlayerModal}
        onConfirm={addPlayer}
      />
      {players.length === 0 ? (
        <span>Insert a new player to calculate a match score</span>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mb-8">
          {players.map((player) => (
            <PlayerCard
              key={player.name}
              player={player}
              onDelete={removePlayer}
              matchScore={matchScore}
              kingsAndQueens={kingsAndQueens}
            />
          ))}
        </div>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}
      <div className="flex justify-center items-center gap-4">
        <Tooltip>
          {players.length >= 5 ? (
            <TooltipTrigger>
              <TooltipContent>
                <p>Maximum number of players reached</p>
              </TooltipContent>
              <AddPlayerButton onClick={openNewPlayerModal} disabled={true} />
            </TooltipTrigger>
          ) : (
            <AddPlayerButton
              onClick={openNewPlayerModal}
              disabled={!!matchScore}
            />
          )}
        </Tooltip>
        {matchScore ? (
          <Button onClick={onResetMatch} variant="default">
            New match
          </Button>
        ) : (
          <Button
            onClick={onCalculateScore}
            className="bg-green-700 hover:bg-green-700/90 text-white"
            disabled={players.length === 0}
          >
            Calculate score
          </Button>
        )}
      </div>
    </div>
  );
};

interface AddPlayerButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AddPlayerButton = ({ onClick, disabled }: AddPlayerButtonProps) => {
  return (
    <Button className="cursor-pointer" onClick={onClick} disabled={disabled}>
      Add player
    </Button>
  );
};
