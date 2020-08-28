import React from "react";
import {
  FormControlLabel,
  Checkbox,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { FieldRenderProps } from "react-final-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(1),
    },
  })
);

interface IProps extends FieldRenderProps<string, HTMLElement> {}

const CheckBox: React.FC<IProps> = ({
  input: { value, checked, ...restInput },
  meta,
  ...rest
}) => {
  const classes = useStyles();
  console.log(rest);
  return (
    <FormControlLabel
      className={classes.formControl}
      control={
        <Checkbox
          {...rest}
          inputProps={restInput}
          checked={checked}
          style={{
            color: rest.color || "primary",
          }}
        />
      }
      label={value}
    />
  );
};

export default CheckBox;
