'use client';

// src/hooks/use-job-filters.ts
import { useQueryStates, parseAsArrayOf, parseAsStringLiteral, parseAsString } from "nuqs";
import { useCallback, useMemo } from "react";
var CATEGORY_VALUES = ["gp-permanent", "gp-locum", "consultant", "registrar-sho", "other"];
var DURATION_VALUES = ["permanent", "temporal"];
var SORT_VALUES = ["newest", "closing"];
function useJobFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      categories: parseAsArrayOf(parseAsStringLiteral(CATEGORY_VALUES)).withDefault([]),
      specialties: parseAsArrayOf(parseAsString).withDefault([]),
      counties: parseAsArrayOf(parseAsString).withDefault([]),
      duration: parseAsArrayOf(parseAsStringLiteral(DURATION_VALUES)).withDefault([]),
      sort: parseAsStringLiteral(SORT_VALUES).withDefault("newest")
    },
    {
      shallow: false,
      scroll: false,
      throttleMs: 100
    }
  );
  const activeFilterCount = useMemo(() => {
    return filters.categories.length + filters.specialties.length + filters.counties.length + filters.duration.length;
  }, [filters.categories, filters.specialties, filters.counties, filters.duration]);
  const toggleFilter = useCallback(
    (key, value) => {
      const currentValues = filters[key];
      const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];
      setFilters({ [key]: newValues });
    },
    [filters, setFilters]
  );
  const setFilter = useCallback(
    (key, values) => {
      setFilters({ [key]: values });
    },
    [setFilters]
  );
  const setSort = useCallback(
    (value) => {
      setFilters({ sort: value });
    },
    [setFilters]
  );
  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      specialties: [],
      counties: [],
      duration: [],
      sort: "newest"
    });
  }, [setFilters]);
  const clearFilterType = useCallback(
    (key) => {
      setFilters({ [key]: [] });
    },
    [setFilters]
  );
  const hasActiveFilters = activeFilterCount > 0;
  return {
    filters,
    activeFilterCount,
    hasActiveFilters,
    toggleFilter,
    setFilter,
    setSort,
    clearFilters,
    clearFilterType
  };
}

export {
  useJobFilters
};
//# sourceMappingURL=chunk-DN3ITOAD.js.map