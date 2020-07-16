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
