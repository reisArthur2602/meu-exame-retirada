export type StatCardColor = "slate" | "blue" | "amber" | "red" | "green";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: StatCardColor;
}

const COLOR_MAP: Record<StatCardColor, string> = {
  slate: "bg-slate-100 text-slate-500",
  blue:  "bg-blue-100  text-blue-600",
  amber: "bg-amber-100 text-amber-600",
  red:   "bg-red-100   text-red-600",
  green: "bg-green-100 text-green-600",
};

export default function StatCard({ label, value, icon, color = "slate" }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${COLOR_MAP[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xl font-extrabold text-slate-900 leading-tight">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}
