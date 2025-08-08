import { useState } from "react";
import { Button } from "../ui/button";
import { PlayerModal } from "../PlayerModal";
import { PlayerCard } from "../PlayerCard";

export interface Player {
  name: string;
  apple: number;
  bread: number;
  cheese: number;
  chicken: number;
  contraband: number;
  coin: number;
}

export const MatchManager = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerModalOpen, setNewPlayerModalOpen] = useState(false);
  const [showMaxPlayersMessage, setShowMaxPlayersMessage] = useState(false);

  const openNewPlayerModal = () => {
    setNewPlayerModalOpen(true);
  };

  const closeNewPlayerModal = () => {
    setNewPlayerModalOpen(false);
  };

  const addPlayer = (player: Player) => {
    console.log("player ", player);
    if (players.length < 5) {
      setPlayers((prevPlayers) => [...prevPlayers, { ...player }]);
      closeNewPlayerModal();
    }
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
          {players.map((player, index) => (
            <PlayerCard key={index} player={player} />
          ))}
        </div>
      )}
      {showMaxPlayersMessage && (
        <p className="text-red-600">Cannot add more than 5 players</p>
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
