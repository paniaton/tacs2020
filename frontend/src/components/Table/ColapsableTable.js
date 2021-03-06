import React, {useState} from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  IconButton,
  Collapse,
  Box
} from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// components
import useStyles from "../../views/user/dashboard/styles";
import { Typography } from "../Wrappers";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor:theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function ColapsableTable({rows}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5
  const rowAlign = "center"
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align={rowAlign}>Country</StyledTableCell>
              <StyledTableCell align={rowAlign}>Infected</StyledTableCell>
              <StyledTableCell align={rowAlign}>Recovered</StyledTableCell>
              <StyledTableCell align={rowAlign}>Deceased</StyledTableCell>
              <StyledTableCell align={rowAlign}>Offset</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <Row key={row.iso2} row={row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
      </TableContainer>
    </React.Fragment>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.countryRegion}
        </TableCell>
        <TableCell align="center">{row.confirmed}</TableCell>
        <TableCell align="center">{row.recovered}</TableCell>
        <TableCell align="center">{row.deaths}</TableCell>
        <TableCell align="center">{row.offset}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h3" gutterBottom component="div">
                Timeline
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Infected</TableCell>
                    <TableCell align="center">Recovered</TableCell>
                    <TableCell align="center">Deceased</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { row.timeserieDate.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {value}
                      </TableCell >
                      <TableCell align="center">{row.timeseriesInfected[index]}</TableCell>
                      <TableCell align="center">{row.timeseriesReconvered[index]}</TableCell>
                      <TableCell align="center">{row.timeseriesDeath[index]}</TableCell>
                    </TableRow>
                    ))
                  }

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}