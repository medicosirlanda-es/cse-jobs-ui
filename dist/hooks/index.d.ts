import { a as ContractDuration, S as SortOption } from '../types-LSLj__Vv.js';

declare function useJobFilters(): {
    filters: {
        categories: string[];
        specialties: string[];
        counties: string[];
        duration: ContractDuration[];
        sort: SortOption;
    };
    activeFilterCount: number;
    hasActiveFilters: boolean;
    toggleFilter: <T extends string>(key: "categories" | "specialties" | "counties" | "duration", value: T) => void;
    setFilter: <T extends string>(key: "categories" | "specialties" | "counties" | "duration", values: T[]) => void;
    setSort: (value: SortOption) => void;
    clearFilters: () => void;
    clearFilterType: (key: "categories" | "specialties" | "counties" | "duration") => void;
};
type UseJobFiltersReturn = ReturnType<typeof useJobFilters>;

export { type UseJobFiltersReturn, useJobFilters };
