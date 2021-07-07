import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import React from 'react'
import FileUploader from '../../common/FileUploader/FileUploader'

class PGMerit extends React.Component {
  constructor() {
    super()
    this.state = {
      nationalCompetition: '',
      nationalCertificate: '',
      otherCompetition: '',
      otherCertificate: '',
      ncc: '',
      nccCertificate: '',
      nationalSevaScheme: false,
      nssDocument: '',
      roverRanger: '',
      otherRoverRaanger: false,
      rrDocument: '',
    }
  }

  handleUpload = (file, index, name) => {
    this.setState({
      [name]: file,
    })
  }

  handleChangeFields = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleFieldChecked = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  render() {
    const {
      nationalCompetition,
      nationalCertificate,
      otherCompetition,
      otherCertificate,
      ncc,
      nccCertificate,
      nationalSevaScheme,
      nssDocument,
      roverRanger,
      otherRoverRaanger,
      rrDocument,
    } = this.state
    return (
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextField
            select
            fullWidth
            variant="outlined"
            name="nationalCompetition"
            label="Participation in Zone / State Level National Competition"
            value={nationalCompetition}
            onChange={this.handleChangeFields}
          >
            <MenuItem value="Ist">Ist</MenuItem>
            <MenuItem value="IInd">IInd</MenuItem>
            <MenuItem value="IIIrd">IIIrd</MenuItem>
            <MenuItem value="Participant">Participant</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={2} xs={6}>
          <FileUploader
            buttonLabel="Upload Document"
            accept="image/jpg,image/jpeg,image/png,application/pdf"
            maxSize={2}
            handleChange={this.handleUpload}
            id={'nationalCompetition'}
            name="nationalCertificate"
          />
        </Grid>
        <Grid item md={4} xs={6}>
          {nationalCertificate !== '' && (
            <Typography>{nationalCertificate.name}</Typography>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            select
            fullWidth
            variant="outlined"
            name="otherCompetition"
            label="Participation in Competition from University"
            value={otherCompetition}
            onChange={this.handleChangeFields}
          >
            <MenuItem value="1">Ist</MenuItem>
            <MenuItem value="2">IInd</MenuItem>
            <MenuItem value="3">IIIrd</MenuItem>
            <MenuItem value="participant">Participant</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={2} xs={6}>
          <FileUploader
            buttonLabel="Upload Document"
            accept="image/jpg,image/jpeg,image/png,application/pdf"
            maxSize={2}
            handleChange={this.handleUpload}
            id={'otherCompetition'}
            name="otherCertificate"
          />
        </Grid>
        <Grid item md={4} xs={6}>
          {otherCertificate !== '' && (
            <Typography>{otherCertificate.name}</Typography>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            select
            fullWidth
            variant="outlined"
            name="ncc"
            label="NCC/Cadet"
            value={ncc}
            onChange={this.handleChangeFields}
          >
            <MenuItem value="NCC(B)/G-1">NCC(C)/G-2</MenuItem>
            <MenuItem value="NCC(B)/G-1">NCC(B)/G-1</MenuItem>
            <MenuItem value="NCC(240 Hours)">NCC(240 Hours)</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={2} xs={6}>
          <FileUploader
            buttonLabel="Upload Document"
            accept="image/jpg,image/jpeg,image/png,application/pdf"
            maxSize={2}
            handleChange={this.handleUpload}
            id={'nccDoc'}
            name="nccCertificate"
          />
        </Grid>
        <Grid item md={4} xs={6}>
          {nccCertificate !== '' && (
            <Typography>{nccCertificate.name}</Typography>
          )}
        </Grid>
        <Grid item md={4} xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={nationalSevaScheme}
                onChange={this.handleFieldChecked}
                name="nationalSevaScheme"
                color="primary"
              />
            }
            label="(NSS) National Seva Scheme ?"
          />
        </Grid>
        <Grid item md={2} xs={6}>
          {nationalSevaScheme && (
            <FileUploader
              buttonLabel="Upload Document"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
              maxSize={2}
              handleChange={this.handleUpload}
              id={'nssDoc'}
              name="nssDocument"
            />
          )}
        </Grid>
        <Grid item md={6} xs={6}>
          {nssDocument !== '' && <Typography>{nssDocument.name}</Typography>}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            select
            fullWidth
            variant="outlined"
            name="roverRanger"
            label="Team Members of Rover Rangers to Participate in Rally from University"
            value={roverRanger}
            onChange={this.handleChangeFields}
          >
            <MenuItem value="1">Ist</MenuItem>
            <MenuItem value="2">IInd</MenuItem>
            <MenuItem value="3">IIIrd</MenuItem>
            <MenuItem value="participant">Participant</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={2} xs={6}>
          <FileUploader
            buttonLabel="Upload Document"
            accept="image/jpg,image/jpeg,image/png,application/pdf"
            maxSize={2}
            handleChange={this.handleUpload}
            id={'roverRanger'}
            name="rrDocument"
          />
        </Grid>
        <Grid item md={4} xs={6}>
          {rrDocument !== '' && <Typography>{rrDocument.name}</Typography>}
        </Grid>
        <Grid container item xs={12} justify="center">
          <Typography>OR</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={otherRoverRaanger}
                onChange={this.handleFieldChecked}
                name="otherRoverRaanger"
                color="primary"
              />
            }
            label="Team Members of Rover Rangers to Participate in Rally from Other University"
          />
        </Grid>
      </Grid>
    )
  }
}

export default PGMerit
