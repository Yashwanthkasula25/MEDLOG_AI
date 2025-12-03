import { useState } from "react";
import LogInteractionForm from "./LogInteractionForm";
import ChatPanel from "./ChatPanel";

export default function SplitLayout() {
  const [formData, setFormData] = useState({
    hcp_name: "",
    date: "",
    time: "",
    attendees: "",
    topics: "",
    sentiment: "",
    materials_shared: [],
  });

  const handleUpdateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  return (
    <div className="flex h-screen bg-white">

      {/* LEFT FORM SECTION */}
      <div className="w-1/2 p-6 border-r overflow-y-auto">
        <LogInteractionForm formData={formData} />
      </div>

      {/* RIGHT CHAT SECTION */}
      <div className="w-1/2 flex flex-col p-6">
        <ChatPanel onUpdateFields={handleUpdateFields} />
      </div>

    </div>
  );
}
