import { Sweeper } from "./Sweeper";

export default async function Page() {
  return (
    <div className="min-w-full min-h-full bg-fixed bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-300 to-rose-300">
      <Sweeper />
    </div>
  );
}
