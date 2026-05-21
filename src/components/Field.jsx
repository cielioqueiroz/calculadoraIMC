const inputClass =
  "w-full bg-base/90 border border-gray-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 hover:border-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300";
const labelClass =
  "block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2";

function Field({ label, id, ...props }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={inputClass} {...props} />
    </div>
  );
}

export default Field;
