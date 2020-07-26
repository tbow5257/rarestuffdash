import React from "react";
import { useQuery } from "@apollo/client";
import cloneDeep from "lodash/cloneDeep";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaterialTable from "material-table";
import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover'
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks'

import { SEARCH_ALBUMS_PAGINATE } from "./Queries";
import { decodeURLString } from "./Helpers";
import NamePopper from './NamePopper';

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
  style: string;
}

export default function AlbumsTable({ style }: AlbumsProps) {
  useStyles();
  const [searchField, setSearchField] = React.useState("");

  const clicky = () => {
    console.log('WHY');
    setSearchField('folk');
  }

  const { loading, error, data } = useQuery(SEARCH_ALBUMS_PAGINATE, { variables:
    { "minHaveCount": 5, "maxHaveCount": 1550, "first": 100, "skip": 0, "style": style }
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
      <div>{style}</div>
      <div onClick={clicky}>{data.albumsByHave.totalCount}</div>
      <MaterialTable
        columns={[
          { title: "Release Id", field: "releaseId" },
          { title: "Name", field: "name", render: rowData => {
            const youtubeURL = 'https://www.youtube.com/results?search_query=' + rowData.name;
            const discogsURL = 'https://www.discogs.com/' + rowData.name + '/release/' + rowData.releaseId;
            return <NamePopper name={rowData.name} 
                      discogsURL={discogsURL} 
                      youtubeURL={youtubeURL} />
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
