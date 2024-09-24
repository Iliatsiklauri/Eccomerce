type propType = {
  setUserInfo: React.Dispatch<React.SetStateAction<number | null>>;
  UserModalRef: React.RefObject<HTMLDialogElement>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
};
export default function UserInfoAction({
  UserModalRef,
  setUserInfo,
  setModalType,
}: propType) {
  return (
    <div className="absolute w-[120px] h-[80px] rounded-xl bg-slate-100 shadow-lg top-[-88px] right-0 overflow-hidden border-darkBrown border-[1px] border-opacity-30">
      <div
        className="h-1/2 w-full hover:bg-slate-200 text-center p-2 border-b-[1px] border-darkBrown border-opacity-30"
        onClick={() => {
          setUserInfo(null);
          setModalType("EDIT");
          UserModalRef.current?.showModal();
        }}
      >
        Edit
      </div>
      <div
        className="h-1/2 w-full hover:bg-slate-200 text-center p-2"
        onClick={() => {
          setUserInfo(null);
          setModalType("DELETE");
          UserModalRef.current?.showModal();
        }}
      >
        Delete
      </div>
    </div>
  );
}
