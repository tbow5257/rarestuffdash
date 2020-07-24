import React from "react";
import { useQuery } from "@apollo/client";
import cloneDeep from "lodash/cloneDeep";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Popper from '@material-ui/core/Popper';

import { SEARCH_ALBUMS_PAGINATE } from "./Queries";
import { decodeURLString } from "./Helpers";

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


type Order = "asc" | "desc";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: "100%",
    tableLayout: "fixed",
  },
});

interface AlbumsProps {
  searchStyle: string;
}

export default function AlbumsTable({ searchStyle }: AlbumsProps) {
  useStyles();
  const [searchField, setSearchField] = React.useState("Bollywood");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const clicky = () => {
    console.log('WHY');
    setSearchField('folk');
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("event.currentTarget ", event.currentTarget);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;



  const { loading, error, data } = useQuery(SEARCH_ALBUMS_PAGINATE, { variables:
    { "minHaveCount": 20, "maxHaveCount": 130, "first": 100, "skip": 0, "style":"Ambient" }
  });

  console.log('error ', error);
  if (loading) return <div>Load time</div>;


  const albumsCopy = cloneDeep(data.albumsByHave.edges);

  albumsCopy.forEach((element: Album) => {
    element.name = decodeURLString(element.name);
    element.style = decodeURLString(element.style);
  });

  return (
    <div>
      <div>{searchStyle}</div>
      <div onClick={clicky}>{data.albumsByHave.totalCount}</div>
      <MaterialTable
        columns={[
          { title: "Release Id", field: "releaseId" },
          { title: "Name", field: "name", render: rowData => {
            const url = 'https://www.youtube.com/results?search_query=' + rowData.name;
            return (
              <div>
                {/* href={url} */}
              <p  aria-describedby={id}  
                  onClick={handleClick}>{rowData.name}</p>
              <Popper id={id} open={open} anchorEl={anchorEl}>
                <div>
                  <a href={url} rel="noreferrer noopener"  target="_blank">{rowData.name}</a> 
                </div>
                {/* TODO: className={classes.paper} */}
              </Popper>
            </div>
            ) 
          } },
          { title: "# Want", field: "want" },
          { title: "# Have", field: "have" },
          { title: "Rare Price", field: "price", render: rowData => '$' + Math.round(rowData.price/100) },
          { title: "Style", field: "style" },
        ]}
        data={albumsCopy}
        options={{ searchText: searchField, 
                   pageSize: 20,
                   pageSizeOptions: [20, 50, 100] }}
        title="Albums table"
      />
    </div>
  );
}
