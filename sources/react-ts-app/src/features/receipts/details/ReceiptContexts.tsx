import React, { Fragment } from "react";
import {
  Paper,
  List,
  Button,
  makeStyles,
  Theme,
  createStyles,
  FormGroup,
} from "@material-ui/core";
import { Field } from "react-final-form";
import CheckBox from "../../../app/common/CheckBox";
import { ContextFormValues } from "../../../app/models/receipt";
import SaveIcon from "@material-ui/icons/Save";
import { observer } from "mobx-react-lite";
import { FieldArray } from "react-final-form-arrays";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(3),
    },
  })
);

interface IProps {
  color: string;
}
const ReceiptContexts: React.FC<IProps> = ({ color }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Paper style={{ maxHeight: 555, overflow: "auto" }}>
        <List>
          <FormGroup>
            <FieldArray name="contexts">
              {({ fields }) =>
                fields.map((name, index) => {
                  return (
                    <Field
                      key={index}
                      component={CheckBox}
                      color={color}
                      name={`context[${index}]`}
                      checked={fields.value[index].isGood}
                      value={fields.value[index].content}
                      type="checkbox"
                    />
                  );
                })
              }
            </FieldArray>
          </FormGroup>
        </List>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        type="submit"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </Fragment>
  );
};

export default observer(ReceiptContexts);

// OLD FORM LIST
// <FormGroup>
//   {formContexts.contexts &&
//     formContexts.contexts.map((context, index) => (
//       <Field
//         key={index}
//         component={CheckBox}
//         name="contexts"
//         checked={context.isGood}
//         value={context.content}
//         type="checkbox"
//       />
//     ))}
// </FormGroup>
