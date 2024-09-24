import UsersSectionHeader from "./UsersSectionHeader";
import UsersList from "./UsersList";

export default function UsersSection() {
  return (
    <div className="w-full h-full bg-white rounded-xl p-4 flex flex-col items-center justify-start gap-8 shadow-md shadow-stone-500 overflow-y-auto">
      <UsersSectionHeader />
      <UsersList />
    </div>
  );
}
