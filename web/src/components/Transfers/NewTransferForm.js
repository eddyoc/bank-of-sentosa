import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import accounting from "accounting";
import { Form, Field, withFormik } from 'formik';
import { chunker } from 'utils';
import { Button } from 'components';
import validations from './formValidations';

const getAccountCurrency = account => {
  return account && account.currency;
};

class InnerForm extends Component {
  state = {
    userAccountsList: <Fragment/>,
    currencyOptions: <Fragment/>,
  };

  static getAccountsList(accounts, selectedAccountId, antiAccountId) {
    const accountList = accounts
      .filter(x => x._id !== antiAccountId)
      .map(account => {
        const { _id, sortcode, number, balance, currency: symbol } = account;
        const accountBalance = accounting.formatMoney(balance, { symbol,  format: "%v %s" });
        return (
          <option key={ _id } value={ _id }>
            { `${ chunker(sortcode, 2, '-') }, ${number}, ${ accountBalance }` }
          </option>
        )
      });
    const selected = _.isEmpty(selectedAccountId);
    const emptyOption = <option disabled selected={selected} value=""> -- select an option -- </option>;
    return [emptyOption, ...accountList];
  }

  static getCurrencyOptions(accounts, { sourceAccountId, recipientAccountId, currency }) {
    const currencies = [
      getAccountCurrency(accounts.find(x => x._id === sourceAccountId)),
      getAccountCurrency(accounts.find(x => x._id === recipientAccountId)),
    ].filter(x => (typeof x === 'string'));
    console.log(`currencies options = ${ JSON.stringify(currencies) }`);
    const currencyList = currencies.map(currency => {
      return <option key={ currency } value={ currency }>{ currency }</option>;
    });
    const selected = _.isEmpty(currency);
    const emptyOption = <option disabled selected={selected} value=""> -- select an option -- </option>;
    return [emptyOption, ...currencyList];
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { accounts, values } = nextProps;
    const { sourceAccountId, recipientAccountId } = values;
    console.log('touched = ' + JSON.stringify(nextProps));
    const sourceAccountsList = InnerForm.getAccountsList(accounts, sourceAccountId, recipientAccountId);
    const recipientAccountsList = InnerForm.getAccountsList(accounts, recipientAccountId, sourceAccountId);
    const currencyOptions = InnerForm.getCurrencyOptions(accounts, values);

    return {
      ...prevState,
      sourceAccountsList,
      recipientAccountsList,
      currencyOptions,
    }
  }

  render() {
    const { errors, touched, status } = this.props;
    const {
      sourceAccountsList,
      recipientAccountsList,
      currencyOptions,
      sourceAccountId,
      recipientAccountId,
    } = this.state;

    return (
      <Form>
        <div>
          <div className="form-group">
            <label htmlFor="source-account">Source account</label>
            <Field
              component="select"
              className="form-control"
              id="source-account"
              name="sourceAccountId"
              value={sourceAccountId}
            >
              { sourceAccountsList }
            </Field>
            { touched.sourceAccountId && errors.sourceAccountId && (
              <p>{ errors.sourceAccountId }</p>
            ) }
          </div>

          <div className="form-group">
            <label htmlFor="recipient-account">Recipient account</label>

            <Field
              component="select"
              className="form-control"
              id="recipient-account"
              name="recipientAccountId"
              value={recipientAccountId}
            >
              { recipientAccountsList }
            </Field>
            { touched.recipientAccountId && errors.recipientAccountId && (
              <p className="field-invalid">{ errors.recipientAccountId }</p>
            ) }
          </div>

          <div className="form-group">
            <label htmlFor="reference">Reference</label>

            <Field
              type="text"
              className="form-control"
              id="reference"
              name="reference"
              maxLength="50"
              placeholder="Reference..."
            />
            { touched.reference && errors.reference && (
              <p className="field-invalid">{ errors.reference }</p>
            ) }
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>

            <Field
              type="text"
              className="form-control"
              id="amount"
              name="amount"
              placeholder="Amount..."
            />
            { touched.amount && errors.amount && <p className="field-invalid">{ errors.amount }</p> }
          </div>

          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <Field
              component="select"
              className="form-control"
              id="currency"
              name="currency"
            >
              { currencyOptions }
            </Field>
            { touched.currency && errors.currency && (
              <p className="field-invalid">{ errors.currency }</p>
            ) }
          </div>
          <p className="validation-info">{ status }</p>
        </div>
        <Button
          id="confirm-transfer-button"
          text="Confirm transfer"
          type="submit"
        />
      </Form>
    );
  }
}

// Wrap our form with the using withFormik HoC
const NewTransferForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    sourceAccountId: undefined,
    recipientAccountId: undefined,
    reference: '',
    amount: '',
    currency: undefined,
  }),
  validationSchema: validations,
  handleSubmit: (values, { props, setStatus }) => {
    const { addTransfer, refreshData, history } = props;
    const data = {
      ...values,
      sender: props.userId,
      recipient: props.userId
    };

    setStatus('Sending...');

    addTransfer(data)
      .then(() => {
        refreshData(history);
      })
      .then(() => {
        setStatus('Transfer done!');
      })
      .catch(error => {
        setStatus('Failure, try again...');
      });
  }
})(InnerForm);

export default NewTransferForm;
