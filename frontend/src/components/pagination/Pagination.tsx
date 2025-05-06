import { GrFormPrevious } from "react-icons/gr";
import * as P from "./styled";
import { MdNavigateNext } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { PaginationResponse } from "../../tdos/pagination.dto";

type PaginationProps = Omit<PaginationResponse<any>, "items">;

const Pagination = ({
  total,
  current_page,
  per_page,
  last_page,
}: PaginationProps) => {
  const [, setPageParams] = useSearchParams();

  function previousPage() {
    if (current_page > 1) {
      setPageParams((params) => {
        params.set("page", String(current_page - 1));
        return params;
      });
    }
  }

  function nextPage() {
    if (current_page < last_page) {
      setPageParams((params) => {
        params.set("page", String(current_page + 1));
        return params;
      });
    }
  }

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= last_page; i++) {
      pages.push(
        <P.Btn
          key={i}
          onClick={() =>
            setPageParams((params) => {
              params.set("page", String(i));
              return params;
            })
          }
          style={{ fontWeight: current_page === i ? "bold" : "normal" }}
        >
          {i}
        </P.Btn>
      );
    }
    return pages;
  };

  return (
    <P.Pagination>
      <P.Icon>
        <GrFormPrevious
          size={25}
          onClick={previousPage}
          aria-label="Página anterior"
        />
      </P.Icon>
      <P.Page>{renderPages()}</P.Page>
      <P.Icon>
        <MdNavigateNext
          size={25}
          onClick={nextPage}
          aria-label="Próxima página"
        />
      </P.Icon>
    </P.Pagination>
  );
};

export default Pagination;
