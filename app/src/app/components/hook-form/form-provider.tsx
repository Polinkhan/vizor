import { ReactNode } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

// -----------------------------------------------------------------------------
// Component: FormProvider
// Purpose: A custom FormProvider component for managing forms using react-hook-form.
// Parameters:
// - children: The child components to be wrapped by the FormProvider.
// - methods: The useForm methods and configuration.
// - onSubmit: The callback function to be executed when the form is submitted.
// -----------------------------------------------------------------------------
interface Props {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}

const FormProvider = ({ children, onSubmit, methods }: Props) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        {children}
      </form>
    </Form>
  );
};

export default FormProvider;
