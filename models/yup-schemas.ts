import * as yup from "yup";

// 2022-02-12
// https://regexland.com/regex-dates/
var dateReg = new RegExp(
  /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/,
  "g"
);

export let option = yup.object().shape({
  kind: yup.string().required("Must specify options kind"),
  expiration: yup.string().matches(dateReg, "Not Valid Date"),
  assetPrice: yup.number().required("Not a valid positive number").positive(),
  optionPrice: yup.number().required("Not a valid positive number").positive(),
  strikePrice: yup.number().required("Not a valid positive number").positive(),
  // numberContracts: yup
  //   .number()
  //   .required("Not a valid integer positive number")
  //   .positive()
  //   .integer(),
  interestRate: yup.number().required("Not a Valid Number"),
});
