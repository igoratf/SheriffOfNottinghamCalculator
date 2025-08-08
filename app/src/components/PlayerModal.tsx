import type { Player } from "./MatchManager/MatchManager";
import { PlayerForm } from "./PlayerForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface PlayerModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm: (player: Player) => void;
}

export const PlayerModal = ({
  isOpen,
  onClose,
  onConfirm,
}: PlayerModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add new player</DialogTitle>
        </DialogHeader>
        <PlayerForm onSubmit={onConfirm} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="player-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
