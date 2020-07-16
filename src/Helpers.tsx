import { parse } from "query-string";

export function decodeURLString(stringWithURLEncode: string): string {
  return Object.keys(parse(stringWithURLEncode))[0];
}
