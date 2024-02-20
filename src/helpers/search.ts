// Taken straight from https://github.com/peripleo/peripleo/blob/main/packages/core-data/src/components/SearchFilterSettings/facetUtils.ts

import { jwtDecode } from "jwt-decode";
import type { Field } from "./types";
import axios from "axios";

export const getFacets = async () => {
  const baseUrl = `${import.meta.env.PUBLIC_TYPESENSE_PROTOCOL}://${import.meta.env.PUBLIC_TYPESENSE_HOST}/collections`;
  const key = import.meta.env.PUBLIC_TYPESENSE_SEARCH_KEY;
  const url = `${baseUrl}/${import.meta.env[`PUBLIC_TYPESENSE_INDEX_NAME`]}`;

  const res = await axios.get(url, {
    headers: {
      "X-TYPESENSE-API-KEY": key,
    },
  });

  if (res.data.fields) {
    return res.data.fields.map((f: any) => parseFacet(f.name));
  }

  return [];
};

/**
 * Facet label formatting utility: replaces underscores with whitespace
 * and capitalizes the resulting string. Turns e.g. 'related_places' to
 * 'Related Places'.
 */
const splitAndCapitalize = (str: string) =>
  str
    .trim()
    .replace("_", " ")
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const parseFacet = (value: string): Field => {
  const normalized = value.endsWith("_facet")
    ? value.substring(0, value.lastIndexOf("_facet"))
    : value;

  if (normalized.startsWith("ey")) {
    // JWT token facets like this one:
    // eyJhbGciOiJub25lIn0.eyJ1dWlkIjoiMDkwMjdkNTMtNmNjYy00MTEwLWE1MDct...
    const { label, facet, uuid } = jwtDecode<{
      label: string;
      facet: boolean;
      uuid: string;
    }>(normalized);
    return {
      value,
      displayLabel: label,
      show: facet,
      uuid,
      isUserDefined: true,
    };
  } else if (normalized.includes(".ey")) {
    // JWT token facets for related items, like this one:
    // related_places.eyJhbGciOiJub25lIn0.eyJ1dWlkIjoiMDkwMjdkNTMtNmNjYy00MTEw...
    const { label, facet, uuid } = jwtDecode<{
      label: string;
      facet: boolean;
      uuid: string;
    }>(normalized.substring(value.indexOf(".ey") + 1));

    const prefix = splitAndCapitalize(
      normalized.substring(0, normalized.indexOf("."))
    );

    return {
      value,
      displayLabel: `${prefix}: ${label}`,
      show: facet,
      uuid,
      isUserDefined: true,
    };
  } else {
    const prefix = splitAndCapitalize(
      normalized.substring(0, value.indexOf("."))
    );
    const suffix = splitAndCapitalize(
      normalized.substring(value.indexOf(".") + 1)
    );

    // Not a user-defined JWT facet
    return {
      value,
      displayLabel: prefix ? `${prefix}: ${suffix}` : suffix,
      show: true,
      isUserDefined: false,
    };
  }
};
