export default function LogForm() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Log HCP Interaction</h1>

      <h2 className="text-md font-medium text-gray-700">Interaction Details</h2>

      {/* HCP Name + Interaction Type */}
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="HCP Name" />
        <FormSelect label="Interaction Type" options={["Meeting","Call","Email"]} />
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Date" type="date" />
        <FormInput label="Time" type="time" />
      </div>

      {/* Attendees */}
      <FormInput label="Attendees" placeholder="Enter names or search..." />

      {/* Topics */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Topics Discussed</label>
        <textarea 
          rows={4} 
          className="mt-1 w-full rounded-md bg-gray-100 p-3 outline-none border border-gray-200"
          placeholder="Enter key discussion points..."
        />
      </div>

      {/* Voice Note Link */}
      <a className="text-blue-600 text-sm cursor-pointer underline">
        Summarize from Voice Note (Requires Consent)
      </a>

      {/* Materials Shared */}
      <div>
        <h3 className="font-medium text-gray-700 mt-6">Materials Shared</h3>
        <p className="text-sm text-gray-500">No materials added.</p>
      </div>

    </div>
  );
}

function FormInput({ label, type="text", placeholder="" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="mt-1 w-full rounded-md bg-gray-100 p-3 outline-none border border-gray-200"
      />
    </div>
  );
}

function FormSelect({ label, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select className="mt-1 w-full rounded-md bg-gray-100 p-3 outline-none border border-gray-200">
        {options.map((o) => (<option key={o}>{o}</option>))}
      </select>
    </div>
  );
}
