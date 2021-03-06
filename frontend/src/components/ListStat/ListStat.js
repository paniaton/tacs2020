import React, {useState, useEffect} from 'react'
import {
  Grid,
  LinearProgress,
  CircularProgress,
  Select,
  OutlinedInput,
  MenuItem,
  TextField,
  InputLabel,
  Button
} from "@material-ui/core";
import ApexCharts from "react-apexcharts";
import { useTheme } from "@material-ui/styles";
import Widget from "../Widget/Widget";
import { Typography } from "../Wrappers/Wrappers";
import Dot from "../Sidebar/components/Dot";

import ColapsableTable from "../Table/ColapsableTable"

// styles
import useStyles from "../../views/user/dashboard/styles";

import Api from "../../apis/Api"
const api = new Api()

const ListStat = ({ isoList })=>{
  var theme = useTheme();
  var classes = useStyles();

    // local
  const [mainChartState, setMainChartState] = useState("Infected");
  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState([])
  const [rows,setRows] = useState([])
  const [numDaysArray,setNumDays] = useState([])
  const [dayFinal,setOffDayFinal] = useState(1)
  const [dayInicial,setOffDayInicial] = useState(1)

  async function handleFetchOffset(offinicial,offfinal){
    setIsLoading(true);
    
    const res = await api.getCountriesDataByDays(isoList,offinicial,offfinal)

      if(res.ok) {
        const data = await res.json()
        setRows(data)
        setNumDays(await createDays(data))
        setMainChartState("");
        setMainChartState("Infected");
      } else {
        
      }
      setIsLoading(false);
      
    }

    async function createDays(data){
      let dayArray = []
      const final = await data.filter( r => r.offset===0 )[0].timeserieDate.length
      for(let i=1;i<=final;i++){
        dayArray.push(`Day ${i}`)
      }
      return dayArray
    }
    
    async function alterChartData(newChartState){
      let promArr = []
      switch (newChartState){
        case "Infected" : 
              promArr = await rows.map(row => {return {name: row.countryRegion, data: row.timeseriesInfected}})
              break;
        case "Recovered" :
              promArr = await rows.map(row => {return {name: row.countryRegion, data: row.timeseriesReconvered}})
              break;
        case "Death" : 
              promArr = await rows.map(row => {return {name: row.countryRegion, data: row.timeseriesDeath}})
              break;
        default: 
              break; 
      }
      setSeries(await Promise.all(promArr))
    }

    useEffect(() => {
      alterChartData(mainChartState);
    }, [mainChartState]); 

return(
    <>
  <Grid container spacing={1}>
  <Grid item lg={12} md={12} sm={12} xs={12}>
  <Widget 
      bodyClass={classes.mainChartBody}
      header={
        isLoading ? (
          <Grid 
            container
            spacing={0}
            alignItems="center"
            justify="center">
              <div className={classes.root}>
                <LinearProgress />
              </div>
            </Grid>
        ) : (
          <div className={classes.mainChartHeader}>
          <Grid
            container
            justify="space-between"
            spacing={1}             
            > 
            <Grid   
              item lg={8} md={9} sm={10} xs={9}        
              container
              spacing={1}
              alignItems="center"
            >
            <Grid item xs={2} md={2} >
              <TextField
                id="filled-number"
                label="Start day"
                type="number"
                margin='dense'
                size='small'
                fullWidth={false}
                inputProps={
                  {step: 1,}
                }
                value={dayInicial}
                onChange={(event) => { 
                 setOffDayInicial(event.target.value)
                } }
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2} md={2} >
              <TextField
                id="filled-number"
                label="End day"
                type="number"
                margin='dense'
                size='small'
                fullWidth={false}
                inputProps={
                  {step: 1,}
                }
                value={dayFinal}
                onChange={(event) => { 
                  setOffDayFinal(event.target.value)
                } }
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
          <Grid item>
            <Button 
              xs={2} 
              md={2} 
              variant="outlined" 
              color="primary" 
              disabled={
                dayFinal === undefined || dayInicial < 1 || dayInicial === undefined || dayFinal<=dayInicial
              }
              onClick={() =>{
                handleFetchOffset(dayInicial,dayFinal)
            }
            }>
              Submit
            </Button>
          </Grid> 
        </Grid>
          <Grid > 
          <Select
              value={mainChartState}
              onChange={e => setMainChartState(e.target.value)}
              input={
                <OutlinedInput
                  labelWidth={0}
                  classes={{
                    notchedOutline: classes.mainChartSelectRoot,
                    input: classes.mainChartSelect,
                  }}
                />
              }
              autoWidth
            >
              <MenuItem value="Infected">Infected</MenuItem>
              <MenuItem value="Recovered">Recovered</MenuItem>
              <MenuItem value="Death">Death</MenuItem>
            </Select>
          </Grid>
        </Grid>          
      </div>
        )        
        }>
            <ApexCharts
            options={themeOptions(numDaysArray,theme)}
            series={series}
            type="area"
            height="auto"
            />
    </Widget>
  </Grid>
  <Grid item lg={12} md={12} sm={12} xs={12}>
    <Widget 
      upperTitle
      noBodyPadding
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}/> }
    >
        { rows.length ? <ColapsableTable rows={rows}/> : <Grid></Grid> }
    </Widget>
  </Grid>
  </Grid>
            </>
)
}

export default ListStat

  function themeOptions(numDaysArray,theme) {
    return {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "string",
        categories: numDaysArray
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: [theme.palette.primary.main, theme.palette.success.main],
      chart: {
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
    };
  }