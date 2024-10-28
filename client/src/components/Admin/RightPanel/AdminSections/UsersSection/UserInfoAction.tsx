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
    <div className="absolute w-[120px] h-[40px] rounded-xl bg-red-500 shadow-lg top-[-40px] right-0 overflow-hidden border-darkBrown border-[1px] border-opacity-30">
      <div
        className="h-full w-full hover:bg-red-600 text-center p-2"
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
