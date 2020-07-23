import React from "react";
import { useQuery } from "@apollo/client";
import cloneDeep from "lodash/cloneDeep";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";

import { ALL_ALBUMS } from "./Queries";
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

  React.useEffect(() => {
    setSearchField(searchStyle)
  }, [searchStyle])
  const { loading, data } = useQuery(ALL_ALBUMS);

  if (loading) return <div>Load time</div>;

  const albumsCopy = cloneDeep(data.albums);

  albumsCopy.forEach((element: Album) => {
    element.name = decodeURLString(element.name);
    element.style = decodeURLString(element.style);
  });

  return (
    <div>
      <div>{searchStyle}</div>
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
