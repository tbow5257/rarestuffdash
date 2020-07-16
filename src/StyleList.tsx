import React from "react";
import { gql, useQuery } from "@apollo/client";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";

import { ALL_STYLES } from "./Queries";

interface Style {
  name: string;
}

const useStyles = makeStyles({
    row: {
        overflowX: "auto",
    },
  });
  

export default function StyleList() {
  const { loading, error, data } = useQuery(ALL_STYLES);
  const classes = useStyles();

  if (loading) return <div>Loadin</div>;

  return (
    <TableContainer>
    <TableRow >
      {data.styles.map((style: Style, i: number) => (
        <TableCell key={i}>{style.name}</TableCell>
      ))}
    </TableRow>
    </TableContainer>
  );
}
