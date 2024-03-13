"use client";

import fakeAutoData from "../../data/data.json";
import { SelectChangeEvent } from "@mui/material/Select";
import { useMemo } from "react";
import {
  Chip,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Autocomplete,
} from "@mui/material";
import { TFilterState } from "@/models/TFilterState";
import { getAllMarks, getAllModels, getAllTypes, getResellers } from "@/services/helpers";

type TMyFilterProps = {
  filterValues: TFilterState
  changeFilterValues: (obj: TFilterState) => void
}

const MyFilter = ({filterValues, changeFilterValues}: TMyFilterProps) => {

  const marks = useMemo(() => {
    return getAllMarks(fakeAutoData);
  }, []);
  const models = useMemo(() => {
    return getAllModels(fakeAutoData);
  }, []);
  const types = useMemo(() => {
    return getAllTypes(fakeAutoData);
  }, []);
  const resellers = useMemo(() => {
    return getResellers(fakeAutoData);
  }, []);

  const handleChangeMark = (event: SelectChangeEvent) => {
    const currentMark = { name: event.target.value as string };
    changeFilterValues({ ...filterValues, ...currentMark })
  };
  const handleTypeChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string[]
  ) => {
    changeFilterValues({ ...filterValues, type: value })
  };

  const handleShopChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string[]
  ) => {
    changeFilterValues({ ...filterValues, shop: value })
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <FormControl
        sx={{
          minWidth: "200px",
        }}
      >
        <InputLabel id="demo-simple-select-label">Марки автомобилей</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterValues.name as string}
          label="Марки автомобилей"
          onChange={handleChangeMark}
        >
          <MenuItem
            value={""}
            onClick={() => {
              // setFilterValues({ ...filterValues, name: "" })
              changeFilterValues({ ...filterValues, name: "" });
            }
          }
          >
            <em>None</em>
          </MenuItem>
          {marks.map((name, index) => {
            return (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
        <Autocomplete
          disablePortal
          isOptionEqualToValue={(option, value) => {
            // console.log("option: ", option, "value: ", value);
            return option === value;
          }}
          value={filterValues.model}
          onChange={(event: any, newValue: string | null) => {
            const model = typeof newValue === "string" && newValue.length === 0 ? null : newValue;
            // setFilterValues({
            //   ...filterValues,
            //   model:
            //     typeof newValue === "string" && newValue.length === 0
            //       ? null
            //       : newValue,
            // });
            changeFilterValues({
              ...filterValues,
              model
            });
          }}
          id="combo-box-demo"
          options={models}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Модели автомобилей" />
          )}
        />
      </FormControl>

      <FormControl>
        <Autocomplete
          multiple
          sx={{
            minWidth: 300
          }}
          id="tags-filled"
          options={types || []}
          value={filterValues.type || null}
          freeSolo
          onChange={handleTypeChange}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Тип автомобиля"
              placeholder="Выберите тип/типы автомобиля..."
              color="info"
            />
          )}
        />
      </FormControl>

      <FormControl>
        <Autocomplete
          multiple
          sx={{
            minWidth: 300
          }}
          id="tags-filled"
          options={resellers || []}
          value={filterValues.shop || null}
          freeSolo
          onChange={handleShopChange}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Реселлер"
              placeholder="Выберите реселлера..."
              color="info"
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default MyFilter;
