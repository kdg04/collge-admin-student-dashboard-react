import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Grid } from '@mui/material';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState('');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const fetchStaffList = async () => {
      let data;
      try {
        console.log("dept from fetchList : " + value);
        const response = await fetch(`http://localhost:8187/College/deptStaff?dept=${value}`);
        data = await response.json();
        console.log("data : " + data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
      return data;
    };

  useEffect( () => {
    const populate = () => {
      fetchStaffList().then((data) => {
        setRows(data);
        console.log(" data from populate" + data);
      }).catch((error) => {
        console.error('Error fetching staff list:', error);
      });
    }
    console.log("b4 call to populate 'value' is " + value);
    populate();
    }, [value]);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field: "mob",
      headerName: "Mobile Number",
      flex: 1
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
    },
    {
      field: "grade",
      headerName: "Grade",
      flex: 1
    }
  ];

  return (
    <Box m="20px">
      <Header title="STAFF LIST" />
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="departments"
          name="options"
          value={value}
          onChange={handleChange}
        >
          <Grid container spacing={2}>
            <Grid item>
              <FormControlLabel
                value="IT" label="IT" control={<Radio sx={{ '& .MuiSvgIcon-root': { color: 'green' }}} />}               
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="Mech" label="Mech" control={<Radio sx={{ '& .MuiSvgIcon-root': { color: 'green' }}} />}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="CS" label="CS" control={<Radio sx={{ '& .MuiSvgIcon-root': { color: 'green' }}} />}               
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="Civil" label="Civil" control={<Radio sx={{ '& .MuiSvgIcon-root': { color: 'green' }}} />}
              />
            </Grid>
          </Grid>
           </RadioGroup>
      </FormControl>
      
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300]
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400]
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700]
          },
          "& .MuiCheckbox-root": {
            color: `Rs{colors.greenAccent[200]} !important`
          }
        }}
      >
        {rows && rows.map(row => {console.log(row)})}
        {rows && <DataGrid checkboxSelection rows={rows} columns={columns} />}
      </Box>
    </Box>
  );
};

export default Team;
