import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TFakeAutoData } from "@/models/TFakeData";

type MyTableProps = {
  autoData: TFakeAutoData;
}


export default function MyTable({autoData}: MyTableProps) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Марка</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Модель</TableCell>
            <TableCell align="right">Тип</TableCell>
            <TableCell align="right">Продано всего</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {autoData.map((auto) => (
            <TableRow
              key={auto.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
