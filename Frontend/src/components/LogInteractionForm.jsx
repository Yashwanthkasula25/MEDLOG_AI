import React from "react";

/**
 * Props:
 *  - formData: { hcp_name, interaction_type, date, time, attendees, topics, materials_shared, sentiment }
 *  - onChange: (fields: Partial<formData>) => void
 *
 * This component is controlled: it reads from formData and emits changes via onChange.
 */

export default function LogInteractionForm({ formData = {}, onChange = () => {} }) {
  // safe defaults
  const {
    hcp_name = "",
    interaction_type = "",
    date = "",
    time = "",
    attendees = [],
    topics = "",
    materials_shared = [],
    sentiment = "",
  } = formData;

  // helpers to write back
  const set = (patch) => onChange({ ...formData, ...patch });

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-semibold mb-6">Log HCP Interaction</h1>

      {/* Row: HCP Name / Interaction Type */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">HCP Name</label>
          <input
            value={hcp_name}
            onChange={(e) => set({ hcp_name: e.target.value })}
            placeholder="Search or type HCP name..."
            className="mt-1 w-full rounded-md bg-gray-100 p-3 border border-gray-200 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interaction Type</label>
          <select
            value={interaction_type}
            onChange={(e) => set({ interaction_type: e.target.value })}
            className="mt-1 w-full rounded-md bg-gray-100 p-3 border border-gray-200"
          >
            <option value="">Select interaction type</option>
            <option>Meeting</option>
            <option>Call</option>
            <option>Email</option>
            <option>Visit</option>
          </select>
        </div>
      </div>

      {/* Row: Date / Time */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date || ""}
            onChange={(e) => set({ date: e.target.value })}
            className="mt-1 w-full rounded-md bg-gray-100 p-3 border border-gray-200 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            value={time || ""}
            onChange={(e) => set({ time: e.target.value })}
            className="mt-1 w-full rounded-md bg-gray-100 p-3 border border-gray-200 outline-none"
          />
        </div>
      </div>

      {/* Attendees */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Attendees</label>
        <input
          value={Array.isArray(attendees) ? attendees.join(", ") : attendees}
          onChange={(e) => {
            // store as array of trimmed names
            const arr = e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            set({ attendees: arr });
          }}
          placeholder="Enter names separated by commas..."
          className="mt-1 w-full rounded-md bg-gray-100 p-3 border border-gray-200 outline-none"
        />
      </div>

      {/* Topics */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Topics Discussed</label>
        <textarea
          rows={5}
          value={topics}
          onChange={(e) => set({ topics: e.target.value })}
          placeholder="Enter key discussion points..."
          className="mt-1 w-full rounded-md bg-gray-100 p-3 border border-gray-200 outline-none"
        />
      </div>

      {/* Voice note link (visual) */}
      <div className="mt-3">
        <a className="text-blue-600 text-sm underline cursor-pointer">
          Summarize from Voice Note (Requires Consent)
        </a>
      </div>

      {/* Materials shared */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-700">Materials Shared</h3>
        <p className="text-sm text-gray-500 mt-1">
          {Array.isArray(materials_shared) && materials_shared.length > 0
            ? materials_shared.join(", ")
            : "No materials added."}
        </p>
      </div>

      {/* Samples (placeholder area like the reference) */}
      <div className="mt-4">
        <label className="font-medium text-gray-700">Samples Distributed</label>
        <p className="text-sm text-gray-500 mt-1">No samples added.</p>
      </div>

      {/* Sentiment radios */}
      <div className="mt-6">
        <label className="font-medium block mb-2 text-gray-700">Observed/Inferred HCP Sentiment</label>
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="sentiment"
              value="positive"
              checked={sentiment === "positive"}
              onChange={() => set({ sentiment: "positive" })}
            />
            <span className="ml-1">😀 Positive</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="sentiment"
              value="neutral"
              checked={sentiment === "neutral"}
              onChange={() => set({ sentiment: "neutral" })}
            />
            <span className="ml-1">🙂 Neutral</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="sentiment"
              value="negative"
              checked={sentiment === "negative"}
              onChange={() => set({ sentiment: "negative" })}
            />
            <span className="ml-1">😟 Negative</span>
          </label>
        </div>
      </div>

      {/* Footer spacing */}
      <div className="h-8" />
    </div>
  );
}
