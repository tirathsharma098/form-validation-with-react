import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DataTable from "datatables.net";
const columns = [
    { data: "name", title: "Name" },
    { data: "age", title: "Age" },
    { data: "sex", title: "Sex" },
    { data: "mobile", title: "Mobile" },
    { data: "id_type", title: "Id Type" },
    { data: "id_number", title: "Id Number" },
    { data: "address", title: "Address" },
    { data: "state", title: "State" },
    { data: "city", title: "City" },
    { data: "country", title: "Country" },
    { data: "pincode", title: "Pincode" },
];

export default function AllUser() {
    const data = useSelector((state: any) => state.users);
    const tableRef = useRef<HTMLTableElement>(null);
    useEffect(() => {
        const dt = new DataTable(tableRef.current!, {
            data,
            columns,
            autoWidth: true,
            scrollCollapse: true,
            scrollX: true,
        });
        return () => {
            dt.destroy();
        };
    }, [data]);
    return (
        <Box sx={{ flexGrow: 1, marginTop: "3rem" }}>
                <table className="display" ref={tableRef} width="100%"></table>
        </Box>
    );
}
