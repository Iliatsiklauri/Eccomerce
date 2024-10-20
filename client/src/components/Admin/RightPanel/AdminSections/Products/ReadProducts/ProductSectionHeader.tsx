import { useRouter, useSearchParams } from "next/navigation";
type PropType = {
  mode: string | null;
};

export default function ProductSectionHeader({ mode }: PropType) {
  const params = useSearchParams();
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
          const currentParams = new URLSearchParams(params.toString());
          currentParams.set("mode", "read");
          router.push(`/admin/Products?${currentParams.toString()}`, {
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
          if (mode !== "edit") {
            const currentParams = new URLSearchParams(params.toString());
            currentParams.set("mode", "add");
            router.push(`/admin/Products?${currentParams.toString()}`, {
              scroll: false,
            });
          }
        }}
      >
        {mode === "edit" ? "Edit" : "Add"}
      </button>
    </div>
  );
}
