import { GrFormPrevious } from "react-icons/gr";
import * as P from "./styled";
import { MdNavigateNext } from "react-icons/md";

const pagination = () => {
  return (
    <P.Pagination>
      <P.Icon>
        <GrFormPrevious size={25} />
      </P.Icon>
      <P.Page>
        <P.BtnOne>1</P.BtnOne>
        <P.Btn>2</P.Btn>
        <P.Btn>3</P.Btn>
        <P.Btn>4</P.Btn>
        <P.Btn>5</P.Btn>
        <P.Btn>...</P.Btn>
        <P.BtnEnd>10</P.BtnEnd>
      </P.Page>
      <P.Icon>
        <MdNavigateNext size={25} />
      </P.Icon>
    </P.Pagination>
  );
};

export default pagination;
