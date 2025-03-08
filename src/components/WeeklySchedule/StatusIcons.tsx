
import React from "react";
import { AttendanceStatus } from "@/types/attendance";
import { 
  AlertCircle, 
  CheckCircle, 
  HelpCircle,
  FileText,
  Bed,
  Flag,
  XCircle,
  Clock
} from "lucide-react";

export const getStatusIcon = (status: AttendanceStatus) => {
  const iconProps = {
    className: "w-5 h-5",
    strokeWidth: 1.5
  };

  switch (status) {
    case "warning":
      return <AlertCircle {...iconProps} className="text-yellow-500" />;
    case "complete":
      return <CheckCircle {...iconProps} className="text-green-500" />;
    case "pending":
      return <HelpCircle {...iconProps} className="text-gray-400" />;
    case "leave":
      return <FileText {...iconProps} className="text-blue-500" />;
    case "sick":
      return <Bed {...iconProps} className="text-purple-500" />;
    case "holiday":
      return <Flag {...iconProps} className="text-red-500" />;
    case "absent":
      return <XCircle {...iconProps} className="text-red-500" />;
    case "late":
      return <Clock {...iconProps} className="text-orange-500" />;
    default:
      return <HelpCircle {...iconProps} className="text-gray-400" />;
  }
};
