import { PlayerForm } from "./PlayerForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import type { PlayerFormData } from "@/utils/schemas";

interface PlayerModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm: (player: PlayerFormData) => void;
}

export const PlayerModal = ({
  isOpen,
  onClose,
  onConfirm,
}: PlayerModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false} className="overflow-auto">
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
            Save player
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
