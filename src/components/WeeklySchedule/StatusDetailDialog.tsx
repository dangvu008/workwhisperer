
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DayStatus } from "@/types/attendance";
import { getStatusText } from "@/utils/attendanceUtils";
import { getStatusIcon } from "@/components/WeeklySchedule/StatusIcons";
import { useLanguage } from "../../contexts/LanguageContext";

interface StatusDetailDialogProps {
  selectedDay: Date | null;
  selectedStatus: DayStatus | null;
  onClose: () => void;
}

export const StatusDetailDialog = ({
  selectedDay,
  selectedStatus,
  onClose,
}: StatusDetailDialogProps) => {
  const { currentLanguage, t } = useLanguage();

  return (
    <Dialog open={selectedDay !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[90%] max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {selectedDay && format(selectedDay, "dd/MM/yyyy")} {currentLanguage === "vi" ? "Trạng thái" : "Status"}
          </DialogTitle>
        </DialogHeader>
        
        {selectedDay && selectedStatus && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              {getStatusIcon(selectedStatus.status)}
              <span className="font-medium">{getStatusText(selectedStatus.status, currentLanguage)}</span>
            </div>
            
            {(selectedStatus.checkIn || selectedStatus.checkOut) && (
              <div className="grid grid-cols-2 gap-4">
                {selectedStatus.checkIn && (
                  <div>
                    <Label className="text-muted-foreground">
                      {t('checkin')}
                    </Label>
                    <div className="font-medium">{selectedStatus.checkIn}</div>
                  </div>
                )}
                {selectedStatus.checkOut && (
                  <div>
                    <Label className="text-muted-foreground">
                      {t('checkout')}
                    </Label>
                    <div className="font-medium">{selectedStatus.checkOut}</div>
                  </div>
                )}
              </div>
            )}
            
            {selectedStatus.reason && (
              <div>
                <Label className="text-muted-foreground">
                  {t('reason')}
                </Label>
                <div className="font-medium">{selectedStatus.reason}</div>
              </div>
            )}
            
            <div className="pt-2">
              <Button variant="outline" onClick={onClose} className="w-full">
                {t('close')}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
