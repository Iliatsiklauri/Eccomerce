import { useRouter } from "next/navigation";
type PropType = {
  mode: string | null;
};

export default function ProductSectionHeader({ mode }: PropType) {
  const router = useRouter();
  return (
    <div
      role="tablist"
      className="tabs tabs-boxed  bg-white rounded-xl flex-shrink-0"
    >
      <button
        className={`tab text-black text-lg ${
          mode === "read" && "bg-lightBrown text-white"
        } font-semibold font-sans `}
        onClick={() => {
          router.push(`/admin/Products?mode=read`, {
            scroll: false,
          });
        }}
      >
        List
      </button>
      <button
        role="tab"
        className={`tab  text-black text-lg font-medium font-sans ${
          (mode === "add" || mode === "edit") && "bg-lightBrown text-white"
        } `}
        onClick={() => {
          router.push(`/admin/Products?mode=add`, {
            scroll: false,
          });
        }}
      >
        {mode === "edit" ? "Edit" : "Add"}
      </button>
    </div>
  );
}
