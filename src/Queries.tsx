import { gql } from "@apollo/client";

export const ALL_ALBUMS = gql`
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

export const ALL_STYLES = gql`
  query {
    styles {
      name
    }
  }
`;



export const SEARCH_ALBUMS_PAGINATE = gql`
query SearchAlbumsAndPaginate($minHaveCount: Int!, $maxHaveCount: Int!, $first: Int!, $skip: Int!, $style: String!) {
    albumsByHave(minHaveCount: $minHaveCount, maxHaveCount: $maxHaveCount, first: $first, skip: $skip, style: $style) 
    {
      totalCount,
      edges {
        releaseId
        name
        want
        have
        price
        style
      }
    }
  }
`