import * as Yup from 'yup';
import 'tools/validations/YupCustomValidations';

// New transfer validations
export default Yup.object().shape({
   sourceAccountId: Yup.string().required('Please select the source account'),
   recipientAccountId: Yup.string().required('Please select the recipient account'),
   currency: Yup.string().required('Please select a currency'),
   reference: Yup.string()
      .required('Please enter the reference')
      .min(2, 'Reference must be at least 2 characters')
      .max(50, 'Reference must be a maximum of 50 characters'),
   amount: Yup.number()
      .required('Please enter the amount')
      .typeError('Amount must be a number')
      .positive('Amount must be a positive number')
});
