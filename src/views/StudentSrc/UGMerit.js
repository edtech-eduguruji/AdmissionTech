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

class UGMerit extends React.Component {
  constructor() {
    super()
    this.state = {
      nationalCompetition: '',
      nationalCertificate: '',
      ncc: '',
      nccCertificate: '',
      freedomFighter: false,
      // ffDocument: '',
      nationalSevaScheme: false,
      nssDocument: '',
      bcom: false,
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
      ncc,
      nccCertificate,
      freedomFighter,
      ffDocument,
      nationalSevaScheme,
      nssDocument,
      bcom,
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
            name="ncc"
            label="NCC/Cadet"
            value={ncc}
            onChange={this.handleChangeFields}
          >
            <MenuItem value="c">NCC(C)/G-2</MenuItem>
            <MenuItem value="b">NCC(B)/G-1</MenuItem>
            <MenuItem value="240">NCC(240 Hours)</MenuItem>
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={freedomFighter}
                onChange={this.handleFieldChecked}
                name="freedomFighter"
                color="primary"
              />
            }
            label="Freedom Fighter ?"
          />
        </Grid>
        {/* <Grid item md={2} xs={6}>
          {freedomFighter && (
            <FileUploader
              buttonLabel="Upload Document"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
              maxSize={2}
              handleChange={this.handleUpload}
              id={'ffDoc'}
              name="ffDocument"
            />
          )}
        </Grid>
        <Grid item md={6} xs={6}>
          {ffDocument !== '' && <Typography>{ffDocument.name}</Typography>}
        </Grid> */}
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={bcom}
                onChange={this.handleFieldChecked}
                name="bcom"
                color="primary"
              />
            }
            label="Inter 10+2 with Commerce ?"
          />
        </Grid>
      </Grid>
    )
  }
}

export default UGMerit
