type PropType = {
  total?: number;
  activePage: number;
  onChange: (newPage: number) => void;
};

export default function Pagination({ total, activePage, onChange }: PropType) {
  const TotalPageCount = total ? Math.ceil(total / 20) : 0;
  const pageButtons = Array.from({ length: TotalPageCount }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > TotalPageCount) return;
    onChange(page);
  };

  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => handlePageChange(activePage - 1)}
      >
        «
      </button>
      {pageButtons.map((pg) => (
        <button
          key={pg}
          className={`join-item btn ${pg === activePage && "btn-active"}`}
          onClick={() => handlePageChange(pg)}
        >
          {pg}
        </button>
      ))}
      <button
        className={`join-item btn `}
        onClick={() => handlePageChange(activePage + 1)}
      >
        »
      </button>
    </div>
  );
}
