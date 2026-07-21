import { useState } from "react";
import { Button } from "../ui/button";
import { PlayerModal } from "../PlayerModal";
import { PlayerCard } from "../PlayerCard";
import type { PlayerScore } from "@/utils/types.d";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import type { PlayerFormData } from "@/utils/schemas";
import { calculateMatchScore } from "@/api/api";
import { useNavigate } from "@tanstack/react-router";

export const MatchManager = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<PlayerFormData[]>([]);
  const [newPlayerModalOpen, setNewPlayerModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const openNewPlayerModal = () => {
    setNewPlayerModalOpen(true);
  };

  const closeNewPlayerModal = () => {
    setNewPlayerModalOpen(false);
  };

  const addPlayer = (player: PlayerFormData) => {
    if (players.length < 5) {
      const alreadyExists = players.find(
        (p) => player.name.toLowerCase() === p.name.toLowerCase(),
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

  const removePlayer = (player: PlayerFormData) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((p) => p.name !== player.name),
    );
    setErrorMessage("");
  };

  const onCalculateScore = async () => {
    const response = await calculateMatchScore(players);
    if (response) {
      navigate({
        to: "/match/$matchId",
        params: { matchId: response.match.id },
      });
    }
  };

  const onResetMatch = () => {
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
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Add players to start calculating your Sheriff of Nottingham match
            score
          </p>
          <p className="text-sm text-gray-500">
            Supports 2-5 players • Track legal goods and contraband • Instant
            scoring
          </p>
        </div>
      ) : (
        <div
          className="flex flex-wrap justify-center gap-4 max-w-5xl mb-8"
          role="region"
          aria-label="Player Cards"
        >
          {players.map((player) => (
            <PlayerCard
              key={player.name}
              player={player as PlayerScore}
              onDelete={removePlayer}
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
            <AddPlayerButton onClick={openNewPlayerModal} />
          )}
        </Tooltip>
        <Button
          onClick={onCalculateScore}
          className="bg-green-700 hover:bg-green-700/90 text-white"
          disabled={players.length === 0}
        >
          Calculate score
        </Button>
        {players.length > 0 && (
          <Button onClick={onResetMatch} variant="outline">
            New match
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
