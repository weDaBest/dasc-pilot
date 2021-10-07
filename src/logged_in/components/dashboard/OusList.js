import React from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbar />
    </GridToolbarContainer>
  );
};

const OusList = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "orgCode",
      headerName: "Organization Code",
      description:
        "The organization code. Combination of the Organization Name, Unit, and Subunit",
      width: 150,
      flex: 100,
      editable: true,
    },
    {
      field: "orgName",
      headerName: "Organization",
      description: "Organization Name",
      flex: 150,
      editable: true,
    },
    {
      field: "unitName",
      headerName: "Unit",
      description: "Unit Name",
      flex: 110,
      editable: true,
    },
    {
      field: "subUnitName",
      headerName: "Subunit",
      description: "Subunit Name",
      flex: 160,
    },
    {
      field: "fullOrgName",
      headerName: "Full Organization Name",
      description: "Concatinated string of organization/unit/subunit",
      flex: 200,
      valueGetter: (params) =>
        `${params.getValue(params.id, "orgName") || ""} /${
          params.getValue(params.id, "unitName") || ""
        }/${params.getValue(params.id, "subUnitName") || ""}`,
    },
  ];

  const rows = [
    {
      id: 1,
      orgCode: "DHS01",
      orgName: "DHS",
      unitName: "CBP",
      subUnitName: "Entry",
    },
    {
      id: 2,
      orgCode: "DHS02",
      orgName: "DHS",
      unitName: "CBP",
      subUnitName: "AirEntry",
    },
    {
      id: 3,
      orgCode: "DHS03",
      orgName: "DHS",
      unitName: "CBP",
      subUnitName: "LandEntry",
    },
    {
      id: 4,
      orgCode: "DHS04",
      orgName: "DHS",
      unitName: "CBP",
      subUnitName: "SeaEntry",
    },
    {
      id: 5,
      orgCode: "DHS05",
      orgName: "DHS",
      unitName: "CBP",
      subUnitName: "SpaceEntry",
    },
    {
      id: 6,
      orgCode: "test",
      orgName: "test",
      unitName: "test",
      subUnitName: "test",
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={rows}
            rowHeight={25}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OusList;
