import { IContext, ContextFormValues } from "../../../app/models/receipt";
import { Grid, makeStyles, createStyles, Theme } from "@material-ui/core";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import ReceiptContexts from "./ReceiptContexts";
import ReceiptContextsFilters from "./ReceiptContextsFilters";
import { toObj } from "../../../app/util/utils";
import arrayMutators from "final-form-arrays";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2),
    },
  })
);

interface IProps {
  filename: string;
  formContexts: ContextFormValues;
}
const colors = ["#4bcffa", "#05c46b", "#ff5e57"];
const contextTypes = ["cod fiscal", "numar bon", "total"];

const ReceiptContextsForm: React.FC<IProps> = ({ filename, formContexts }) => {
  const rootStore = useContext(RootStoreContext);
  const { saveContexts } = rootStore.receiptStore;

  const [contextType, setContextType] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setContextType(event.target.value as number);
  };

  const handleFinalFormSubmit = (values: { contexts: string[] }) => {
    let contexts: IContext[] = [];
    for (let i = 0; i < formContexts.contexts!.length; i++) {
      let context: IContext = {
        content: formContexts.contexts![i].content,
        isGood: false,
      };
      if (
        values.contexts.filter(
          (el: string) => el === formContexts.contexts![i].content
        ).length > 0
      ) {
        context.isGood = true;
      }
      contexts.push(context);
    }
    saveContexts(filename, new ContextFormValues(contexts));
  };

  return (
    <Grid container spacing={1} direction="column">
      {/* <Grid item xs={12}>
      </Grid> */}
      <Grid item xs={12}>
        <FinalForm
          initialValues={{ contexts: formContexts.contexts }}
          onSubmit={handleFinalFormSubmit}
          mutators={{
            ...arrayMutators,
          }}
          render={({
            handleSubmit,
            values,
            form: {
              mutators: { push, removeBatch },
            },
          }) => (
            <form onSubmit={handleSubmit}>
              <ReceiptContextsFilters
                contexts={formContexts.contexts}
                push={push}
                color={colors[contextType]}
                handleChange={handleChange}
                removeBatch={removeBatch}
                contextType={contextType}
              />

              <ReceiptContexts color={colors[contextType]} />
            </form>
          )}
        />
      </Grid>
    </Grid>
  );
};

{
  /* <ReceiptContexts formContexts={formContexts} /> */
}
export default observer(ReceiptContextsForm);
