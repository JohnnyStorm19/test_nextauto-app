"use client";

import MyFilter from "@/components/Filter/MyFilter";
import MyTable from "@/components/MyTable/MyTable";
import { Container } from "@mui/material";
import fakeAutoData from "../../data/data.json";
import { useEffect, useRef, useState } from "react";
import { TFilterState } from "@/models/TFilterState";
import { TFakeAutoData } from "@/models/TFakeData";

const AutoPage = () => {
  const prevFilterValuesRef = useRef<TFilterState>();

  const [filterValues, setFilterValues] = useState<TFilterState>({
    name: "",
    model: null,
    type: [],
    shop: [],
  });
  const [filtered, setFiltered] = useState<TFakeAutoData>([...fakeAutoData]);

  const updateFilterValues = (obj: TFilterState) => {
    setFilterValues(obj);
  };

  useEffect(() => {
    console.log(filterValues);
  }, [filterValues]);

  useEffect(() => {
    const filteredData = fakeAutoData.filter((item) => {
      return (
        (filterValues.name === "" ||
          item.name.toLowerCase().includes(filterValues.name.toLowerCase())) &&
        (filterValues.model === null || item.model === filterValues.model) &&
        (filterValues.type.length === 0 ||
          filterValues.type.includes(item.type)) &&
        (filterValues.shop.length === 0 ||
          item.sales.some((s) => filterValues.shop.includes(s.reseller)))
      );
    });

    if (
      JSON.stringify(filterValues) !==
      JSON.stringify(prevFilterValuesRef.current)
    ) {
      setFiltered(filteredData);
    }

    prevFilterValuesRef.current = filterValues;
  }, [filtered, filterValues]);

  return (
    <Container maxWidth="xl">
      <MyFilter
        filterValues={filterValues}
        changeFilterValues={updateFilterValues}
      />
      <MyTable autoData={filtered} />
    </Container>
  );
};

export default AutoPage;
