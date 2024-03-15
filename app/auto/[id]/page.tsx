import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import fakeAutoData from "../../../data/data.json";
import { useMemo } from "react";
import { Metadata } from "next";
import { getAutoById } from "@/services/helpers";

type AutoProps = {
  params: {
    id: string;
  };
};
type PostProps = {
  params: {
    id: string;
  };
};


// const getAutoById = (id: string) => {
//   return fakeAutoData.find((auto) => auto.id === Number(id));
// };

const tableRowTitles = ["Реселлеры", "Дата продажи"];

export function generateMetadata({
  params: { id },
}: PostProps): Metadata {
  const auto = getAutoById(fakeAutoData, id);
  return {
    title: `${auto?.name} ${auto?.model}`,
    description: `Страница с продажами автомобиля: ${auto?.name} ${auto?.model} за 2023-2024 гг.`,
  };
}

const Auto = ({ params: { id } }: AutoProps) => {
  const autoData = getAutoById(fakeAutoData, id);
  const sortedSellingDates = useMemo(() => {
    return autoData?.sales.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
    });
  }, [autoData]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" align="center">
        {autoData?.name} {autoData?.model}
      </Typography>

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
            {sortedSellingDates?.map((sale, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {sale.reseller}
                </TableCell>
                <TableCell align="right">{sale.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Auto;
