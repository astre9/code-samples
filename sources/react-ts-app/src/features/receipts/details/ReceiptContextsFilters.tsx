import React, { Fragment } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Theme,
  createStyles,
  FormLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@material-ui/core";
import { IContext } from "../../../app/models/receipt";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    select: {
      input: {
        backgroundColor: "#4bcffa",
      },
    },
    formGroup: {
      margin: theme.spacing(1),
    },
    formControlLabel: {
      marginLeft: theme.spacing(2),
    },
  })
);

interface IProps {
  contexts: IContext[] | null;
  removeBatch(name: string, indexes: Array<number>): void;
  push(name: string, value: any): void;
  color: string;
  contextType: number;
  handleChange(event: React.ChangeEvent<{ value: unknown }>): any;
}

const colors = ["#4bcffa", "#05c46b", "#ff5e57"];

const ReceiptContextsFilters: React.FC<IProps> = ({
  contexts,
  removeBatch,
  push,
  color,
  contextType,
  handleChange,
}) => {
  const classes = useStyles();

  const handleFilterTermChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (contexts) {
      removeBatch("contexts", Array.from(Array(contexts.length).keys()));
      let filterTerm = event.target.value as string;
      let filteredContexts = contexts.filter((el) => {
        return el.content.toLowerCase().includes(filterTerm.toLowerCase());
      });
      filteredContexts.forEach((el) => {
        push("contexts", el);
      });
    }
  };

  return (
    <Fragment>
      <FormLabel className={classes.formControl} component="legend">
        Filters
      </FormLabel>
      <FormGroup row>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Context type
          </InputLabel>
          <Select
            autoWidth={true}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={contextType}
            onChange={handleChange}
            label="Context type"
          >
            <MenuItem
              value={0}
              style={{ backgroundColor: colors[0], color: "white" }}
            >
              Cod fiscal
            </MenuItem>
            <MenuItem
              value={1}
              style={{ backgroundColor: colors[1], color: "white" }}
            >
              Numar bon
            </MenuItem>
            <MenuItem
              value={2}
              style={{ backgroundColor: colors[2], color: "white" }}
            >
              Total
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={handleFilterTermChange}
          className={classes.formControl}
        />
        <FormControl component="fieldset">
          <RadioGroup aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              value="top"
              control={
                <Radio
                  color="primary"
                  style={{
                    color: color,
                  }}
                />
              }
              label="Bon"
              style={{
                color: color,
              }}
              labelPlacement="start"
            />
            <FormControlLabel
              value="start"
              control={
                <Radio
                  color="primary"
                  style={{
                    color: color,
                  }}
                />
              }
              label="Factura"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={true}
              onChange={handleChange}
              name="combustibil"
              style={{
                color: color,
              }}
            />
          }
          className={classes.formControlLabel}
          label="Combustibil?"
        />
      </FormGroup>
    </Fragment>
  );
};

export default ReceiptContextsFilters;
