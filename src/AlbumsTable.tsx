import React from "react";
import { useQuery } from "@apollo/client";
import cloneDeep from "lodash/cloneDeep";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";

import { ALL_ALBUMS, SEARCH_ALBUMS_PAGINATE } from "./Queries";
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
  const [searchField, setSearchField] = React.useState("experimental");

  const clicky = () => {
    console.log('WHY');
    setSearchField('folk');
  }

  // const { loading, data } = useQuery(ALL_ALBUMS);

  const { loading, error, data } = useQuery(SEARCH_ALBUMS_PAGINATE, { variables:
    { "minHaveCount": 30, "maxHaveCount": 50, "first": 100, "skip": 0, "style":"Folk" }
  });

  console.log('error ', error);
  if (loading) return <div>Load time</div>;


  console.log("huh ", data)

  // const albumsCopy = cloneDeep(data.albums);

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
    </div>
  );
}
