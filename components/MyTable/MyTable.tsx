import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TFakeAutoData } from "@/models/TFakeData";
import { useRouter } from "next/navigation";

type MyTableProps = {
  autoData: TFakeAutoData;
};

const tableRowTitles = ["Марка", "ID", "Модель", "Тип", "Продано всего"];

export default function MyTable({ autoData }: MyTableProps) {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    const href = `/auto/${id}`;
    router.push(href);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableRowTitles.map((title, index) => {
              if (index === 0) {
                return <TableCell key={index}>{title}</TableCell>;
              }
              return (
                <TableCell key={index} align="right">
                  {title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {autoData.map((auto) => (
            <TableRow
              onClick={(() => handleRowClick(auto.id))}
              key={auto.id}
              sx={{ 
                "&:last-child td, &:last-child th": { border: 0 }, 
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "ivory"
                }
              }}
            >
              <TableCell component="th" scope="row">
                {auto.name}
              </TableCell>
              <TableCell align="right">{auto.id}</TableCell>
              <TableCell align="right">{auto.model}</TableCell>
              <TableCell align="right">{auto.type}</TableCell>
              <TableCell align="right">{auto.sales.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
