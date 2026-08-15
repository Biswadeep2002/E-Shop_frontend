import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({numberOfPage}) => {
    
    const [searchParams] = useSearchParams();
    const pathName = useLocation().pathname;
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();

    const paramValue = searchParams.get("page") 
                    ? Number(searchParams.get("page"))
                    : 1;

    const onChangeHanler = (event, value) => {
        params.set("page", value.toString());
        navigate(`${pathName}?${params}`);
    }

    return(
        <Pagination
        count={numberOfPage}
        page={paramValue}
        defaultPage={1}
        siblingCount={1}
        boundaryCount={2}
        shape="rounded"
        onChange={onChangeHanler}
        />
    )
};

export default Paginations;