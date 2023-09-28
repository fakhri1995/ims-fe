const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <div className={"flex flex-row justify-center"}>
        {pagesCount > 1 && (
          <a
            className={"cursor-pointer "}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <img
              src="/image/landingpage/before-pagination.png"
              className={"h-[15.82px] w-[9.33px] self-center"}
            />
          </a>
        )}
        <ul
          className={""}
          style={{
            display: "flex",
            listStyle: "none",
          }}
        >
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage
                  ? "text-primarygreen text-base font-gilroysemibold mx-2"
                  : "text-blackmig text-base font-gilroyregular mx-2"
              }
            >
              <a
                className={"cursor-pointer "}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
        {pagesCount > 1 && (
          <a
            className={"cursor-pointer "}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <img
              src="/image/landingpage/after-pagination.png"
              className={"h-[15.82px] w-[9.33px] self-center"}
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default Pagination;
