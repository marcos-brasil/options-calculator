import * as yup from "yup";

// 2022-02-12
// https://regexland.com/regex-dates/
var dateReg = new RegExp(
  /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/,
  "g"
);

export let option = yup.object().shape({
  // expiration: yup
  //   .date()
  //   // .nullable()
  //   .required()
  //   .min(new Date())

  //   .transform((value, originalValue) => {
  //     console.log("++++", [value], [originalValue]);

  //     return value;
  //   }),
  expiration: yup.string().transform((value, oriValue) => {
    console.log('*******lll', [value], [oriValue])
    return value
  }).matches(dateReg, 'Not Valid Date'),
  assetPrice: yup.number().required().positive(),
  optionsPrice: yup.number().required().positive(),
  strikePrice: yup.number().required().positive(),
  numberContracts: yup.number().required().positive().integer(),
});
