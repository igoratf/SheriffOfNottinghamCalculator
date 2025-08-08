import { useState } from "react";
import { Button } from "../ui/button";
import { PlayerModal } from "../PlayerModal";
import { PlayerCard } from "../PlayerCard";
import type { Player } from "@/utils/types";

export const MatchManager = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerModalOpen, setNewPlayerModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
            />
          ))}
        </div>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}
      <AddPlayerButton onClick={openNewPlayerModal} />
    </div>
  );
};

interface AddPlayerButtonProps {
  onClick: () => void;
}

const AddPlayerButton = ({ onClick }: AddPlayerButtonProps) => {
  return (
    <Button className="cursor-pointer" onClick={onClick}>
      Add player
    </Button>
  );
};
