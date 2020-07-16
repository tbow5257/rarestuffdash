import React from "react";
import { useQuery } from "@apollo/client";
import cloneDeep from "lodash/cloneDeep";
import { makeStyles } from "@material-ui/core/styles";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import { parse } from "query-string";

import { ALL_ALBUMS } from "./Queries";
import { decodeURLString } from "./Helpers";
import StyleList from "./StyleList";

interface Edge {
  node: Node;
}

interface Album {
  id: string;
  releaseId: string;
  name: string;
  style: string;
  want: number;
  have: number;
  price: number;
}

const headCells: string[] = [
  "releaseId",
  "name",
  "want",
  "have",
  "price",
  "style",
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: "100%",
    tableLayout: "fixed",
  },
});

const transformToDisplayPrice = (wholeNum: number) =>
  (wholeNum / 100).toFixed(2);

export default function AlbumsTable() {
  const classes = useStyles();

  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState("have");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchField, setSearchField] = React.useState("experimental");

  const { loading, error, data } = useQuery(ALL_ALBUMS);

  if (loading) return <div>Load time</div>;

  console.log("data ", data);

  const albumsCopy = cloneDeep(data.albums);

  albumsCopy.forEach((element: Album) => {
    element.name = decodeURLString(element.name);
    element.style = decodeURLString(element.style);
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property: any) => (
    event: React.MouseEvent<unknown>
  ) => {
    handleRequestSort(event, property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <MaterialTable
        columns={[
          { title: "Release Id", field: "releaseId" },
          { title: "Name", field: "name" },
          { title: "# Want", field: "want" },
          { title: "# Have", field: "have" },
          { title: "Rare Price", field: "price" },
          { title: "Style", field: "style" },
        ]}
        data={albumsCopy}
        options={{ searchText: searchField }}
        title="Albums table"
      />
      {/* <TableContainer component={Paper}>
        <Table className={classes.table} size={"small"}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell>
                  <TableSortLabel
                    active={orderBy === headCell}
                    direction={orderBy === headCell ? order : "asc"}
                    onClick={createSortHandler(headCell)}
                  >
                    {headCell}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(data.albums, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((album: any) => (
                <TableRow>
                  <TableCell>{album.releaseId}</TableCell>
                  <TableCell>{album.name}</TableCell>
                  <TableCell>Want:{album.want}</TableCell>
                  <TableCell>Have:{album.have}</TableCell>
                  <TableCell>
                    price: ${transformToDisplayPrice(album.price)}
                  </TableCell>
                  <TableCell>{album.style}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.albums.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </div>
  );
}
