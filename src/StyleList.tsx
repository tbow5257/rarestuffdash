import React, { Dispatch, DOMAttributes, useState } from "react";
import { useQuery } from "@apollo/client";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import cloneDeep from "lodash/cloneDeep";

import { ALL_STYLES } from "./Queries";
import { decodeURLString } from "./Helpers";
import AlbumsTable from './AlbumsTable';

interface Style {
  name: string;
}

type SetStyle = string;

const useStyles = makeStyles({
  row: {
    overflowX: "auto",
  },
});

interface StyleProps {
  setstyle: Dispatch<SetStyle>;
}

export default function StyleList<
  P extends DOMAttributes<T>,
  T extends Element
>() {
  const { loading, data } = useQuery(ALL_STYLES);
  const [style, setstyle] = useState<SetStyle>('Bollywood');

  useStyles();

  if (loading) return <div>Loadin</div>;

  const stylesCopy = cloneDeep(data.styles);

  stylesCopy.forEach((style: Style) => {
    style.name = decodeURLString(style.name);
  });

  const clickStyle = (e: React.MouseEvent<HTMLElement>) => {
    const styleName = e.currentTarget.dataset.id || '';
    console.log(styleName)
    setstyle(styleName);
  }
    

  return (
    <>
      <TableContainer>
        <TableRow>
          {stylesCopy.map((style: Style, i: number) => (
            <TableCell onClick={clickStyle} data-id={style.name} key={i}>
              {style.name}
            </TableCell>
          ))}
        </TableRow>
      </TableContainer>
      {style && <AlbumsTable style={style} /> }
    </>
  );
}
