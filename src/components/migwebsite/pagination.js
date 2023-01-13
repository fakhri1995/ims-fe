const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <ul
        className={""}
        style={{
          display: flex,
          justifyContent: space - between,
          alignItems: center,
          listStyle: none,
        }}
      >
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage
                ? "flex justify-items-center items-center w-8 h-8 border border-pageActive rounded-lg bg-redmig "
                : "flex justify-items-center items-center w-8 h-8 border border-pageActive rounded-lg"
            }
          >
            <a className={"cursor-pointer"} onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
