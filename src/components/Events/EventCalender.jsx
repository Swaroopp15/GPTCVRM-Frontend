import { CalendarIcon } from "lucide-react";
import React from "react";

function EventCalender({event}) {
  return (
    <div className="flex items-center text-gray-700 mb-2">
      <CalendarIcon className="h-5 w-5 mr-2 text-red-600 flex-shrink-0" />
      <span className="font-medium truncate">
        {new Date(event?.event_date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}

export default EventCalender;
