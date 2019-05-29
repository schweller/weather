import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import './App.css';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}))

const Weather = () => {
  const classes = useStyles()
  const inputLabel = React.useRef(null)

  const [values, setValues] = React.useState({
    country: ''
  });

  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleChange = (event) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline/>
      <Typography variant="h1" align="center">Weather</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="country">
              Country
            </InputLabel>
            <Select
              value={values.country}
              onChange={handleChange}
              input={<OutlinedInput labelWidth={labelWidth} name="country" id="country" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'US'}>USA</MenuItem>
              <MenuItem value={'IN'}>India</MenuItem>
              <MenuItem value={'BR'}>Brazil</MenuItem>
              <MenuItem value={'UK'}>United Kingdom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

    </Container>
  )
}

function App() {
  return (
    <div className="App">
      <Weather/>
    </div>
  );
}

export default App;
