import React, { useState, useEffect } from "react";
import { getCountry } from "../../../apis/GeolocationApi"
import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
  CircularProgress,
  Box
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// api
import Api from '../../../apis/Api';

// styles
import useStyles from "./styles";


// components
import Widget from "../../../components/Widget";
import PageTitle from "../../../components/PageTitle";
import { Typography } from "../../../components/Wrappers";
import Dot from "../../../components/Sidebar/components/Dot";
import ListStats from "../../../components/ListStat/ListStat";
import mock from "./mock";

const PieChartData = [
  { name: "", value: 0, color: "success" },
  { name: "", value: 0, color: "warning" },
  { name: "", value: 0, color: "secondary" }, 
];
let newCases
let newRecovered
let newDeath

let rateInfected
let rateRecovered
let rateDeath

const api = new Api();

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");
  var [isLoading, setIsLoading] = useState(true);

  async function fetchLocal() {
    try {
      let iso = localStorage.getItem('tracker_country_Iso')
      if (!iso){
        const {countryIso,countryName} = await getCountry()
        iso = countryIso
        localStorage.setItem('tracker_country', countryName)
        localStorage.setItem('tracker_country_Iso', countryIso)
      }
      setIsLoading(false)

      const countryData = await api.getCountryDataByIsoDate(iso,Date.now(),Date.now())

      PieChartData[0].value = countryData.totals.recovered
      PieChartData[1].value = countryData.totals.confirmed
      PieChartData[2].value = countryData.totals.deaths
      
      newCases = countryData.confirmed
      newRecovered = countryData.recovered
      newDeath = countryData.deaths

      rateInfected = (newCases*100/countryData.totals.confirmed).toFixed(2)
      rateRecovered = (newRecovered*100/countryData.totals.recovered).toFixed(2)
      rateDeath = (newDeath*100/countryData.totals.deaths).toFixed(2)

    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => { //tiene que haber un useEffect por cada variable de estado de chart a modificar
    fetchLocal()
  });

  return (
    <>
    {isLoading 
    ? <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress size={100}/>
        </Grid>   
      </Grid> 
    : <div>
      <PageTitle title= {localStorage.getItem('tracker_country') + " today"} />
      <Grid container spacing={1}>
        <Grid item lg={3} md={4} sm={6} xs={6}>
          <Widget
            upperTitle
            bodyClass={classes.fullHeightBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  New confirmed
                </Typography>
                </div>
            }
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {newCases}
              </Typography>
              <LineChart
                width={55}
                height={30}
                data={[
                  { value: 10 },
                  { value: 15 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 },
                ]}
                margin={{ left: theme.spacing(2) }}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Growth rate
                </Typography>
              <Typography size="md">+{rateInfected}%</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={6}>
        <Widget
            upperTitle
            bodyClass={classes.fullHeightBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  New recovered
                </Typography>
                </div>
            }
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {newRecovered}
              </Typography>
              <LineChart
                width={55}
                height={30}
                data={[
                  { value: 10 },
                  { value: 15 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 },
                ]}
                margin={{ left: theme.spacing(2) }}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Growth rate
                </Typography>
                <Typography size="md">+{rateRecovered}%</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={6}>
        <Widget
            upperTitle
            bodyClass={classes.fullHeightBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  New deceased
                </Typography>
                </div>
            }
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {newDeath}
              </Typography>
              <LineChart
                width={55}
                height={30}
                data={[
                  { value: 10 },
                  { value: 15 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 },
                ]}
                margin={{ left: theme.spacing(2) }}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.error.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Growth rate
                </Typography>
              <Typography size="md">+{rateDeath}%</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={6}>
          <Widget
            upperTitle
            bodyClass={classes.fullHeightBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Overall total
                </Typography>
                </div>
            }
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={82}>
                  <PieChart margin={{ left: theme.spacing(2) }}>
                    <Pie
                      data={PieChartData}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {PieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap" }}>
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <PageTitle title= {"Near you"} />
          <ListStats data={mock}/>
        </Grid>
        </Grid>
      </div>
      }
    </>
  );
}
