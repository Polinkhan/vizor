import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

interface UseFormSchemeProps {
  scheme: Yup.ObjectSchema<any, Yup.AnyObject, any, "">;
  defaultValues: any;
}

const useFormScheme = ({ scheme, defaultValues }: UseFormSchemeProps) => {

    const methods = useForm({
        resolver: yupResolver(scheme),
        defaultValues,
      });

  return methods;
};

export default useFormScheme;
