import { currencyFormatter } from "@/lib/utils";

function ExpenceCategoryItem({ color, title, total }) {
  return (
    <button className="expence-card">
    <div className="flex items-center justify-between px-4 py-4 bg-red-300 rounded-3xl">
      <div className="flex items-center gap-2">
        <div
          className="w-[25px] h-[25px] rounded-full"
          style={{ backgroundColor: color }}
        />
        <h4 className="capitalize">{title}</h4>
      </div>
      <p>{currencyFormatter(total)}</p>
    </div>
    </button>
  );
}

export default ExpenceCategoryItem;
