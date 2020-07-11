import React from "react";
import { gql, useQuery } from "@apollo/client";
import orderBy from "lodash/orderBy";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";

const ALL_ALBUMS = gql`
  query {
    albums {
      id
      name
      releaseId
      price
      style
      have
      want
      style
    }
  }
`;

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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: "100%",
    tableLayout: "fixed",
  },
});

const transformToDisplayPrice = (wholeNum: number) =>
  (wholeNum / 100).toFixed(2);

export default function Wut() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(ALL_ALBUMS);

  if (loading) return <div>Load time</div>;

  const meOrdered = orderBy(
    data.albums,
    (album) => album.want,
    "desc"
  );
  console.log("mo", meOrdered);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell>{headCell}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {meOrdered.map((album: Album) => (
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
    </div>
  );
}
