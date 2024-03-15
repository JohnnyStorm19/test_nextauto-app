"use client";

import MyFilter from "@/components/Filter/MyFilter";
import MyTable from "@/components/MyTable/MyTable";
import { Container } from "@mui/material";
import fakeAutoData from "../../data/data.json";
import { useEffect, useState } from "react";
import { TFilterState } from "@/models/TFilterState";
import { TFakeAutoData } from "@/models/TFakeData";
import MyChart from "@/components/MyChart/MyChart";
import { registerCharts } from "@/components/MyChart/registerChart";

const AutoPage = () => {
  const [filterValues, setFilterValues] = useState<TFilterState>({
    name: "",
    model: null,
    type: [],
    shop: [],
  });
  const [filtered, setFiltered] = useState<TFakeAutoData>([...fakeAutoData]);
  const [updateFiltered, setUpdateFiltered] = useState(false);

  const updateFilterValues = (obj: TFilterState) => {
    setFilterValues(obj);
  };

  // useEffect(() => {
  //   console.log(filterValues);
  //   console.log(updateFiltered)
  // }, [filterValues, updateFiltered]);

  registerCharts();

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

    if (updateFiltered) {
      setFiltered(filteredData);
      setUpdateFiltered(false);
    }

  }, [filtered, filterValues, updateFiltered]);

  return (
    <Container maxWidth="xl">
      <MyFilter
        filterValues={filterValues}
        changeFilterValues={updateFilterValues}
        updateFiltered={setUpdateFiltered}
      />
      <MyTable autoData={filtered} />
      <MyChart />
    </Container>
  );
};

export default AutoPage;
