import React, { useState } from "react";
import Calculator from "./components/Calculator";
import "./components/form.scss";

function App() {
  const [loanValue, setLoan] = useState({
    data: 399,
    errors: [],
  });
  const [firstPaymentValue, setFirstPayment] = useState({
    data: 25,
    errors: [],
  });
  const [yearsValue, setYears] = useState(3);
  const declension = ["год", "года", "лет"];

  function handleChangeLoan(e) {
    const data = e.target.value;
    if (!isNaN(data) && data > 0) {
      setLoan({
        data: data,
      });
      setFirstPayment({
        data: firstPaymentValue.data || 0,
        errors: [],
      });
    } else if (!data) {
      setLoan({
        data: "",
        errors: ["Укажите сумму желаемого кредита"],
      });
      setFirstPayment({
        data: "",
      });
      setYears(1);
    } else {
      setLoan({
        data: "",
        errors: ["Используйте только цифры"],
      });
    }
  }

  function handleFirstPayment(e) {
    const data = parseInt(e.target.value, 10);
    if (data >= 0 && data < 100 && loanValue.data) {
      setFirstPayment({
        data: data,
      });
    } else if (data >= 100) {
      const dataVal = data.toString().substr(0, 2);
      setFirstPayment({
        data: parseInt(dataVal, 10),
        errors: ["Первый взнос не может быть больше стоимости покупки"],
        func: setTimeout(() => {
          setFirstPayment({
            data: parseInt(dataVal, 10),
            errors: [],
          });
        }, 3000),
      });
    } else {
      setFirstPayment({
        data: "",
        errors: ["Используйте только цифры"],
        func: setTimeout(() => {
          setFirstPayment({
            data: 0,
            errors: [],
          });
        }, 1000),
      });
    }
  }

  function handleChangeYears(e) {
    setYears(e.target.value);
  }

  function plural(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  return (
    <div className="form">
      <h1 className="form__header">Калькулятор кредита</h1>
      <div className="row">
        <div className="col-25">
          <label className="form__label" for="loanid">
            Цена покупки:
          </label>
        </div>
        <div className="col-75">
          <input
            type="text"
            name="loan"
            id="loanid"
            required="required"
            value={loanValue.data}
            onChange={handleChangeLoan}
            className={
              typeof loanValue.errors !== "undefined" &&
              loanValue.errors.length > 0
                ? "bounce form__input--error form__input"
                : "form__input"
            }
          />
          <small className="form__info">Сумма {loanValue.data || 0} €</small>
          <p className="error">{loanValue.errors}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-25">
          <label className="form__label" for="paymentid">
            Первый взнос (в %):
          </label>
        </div>
        <div className="col-75">
          <input
            type="text"
            name="firstpayment"
            id="paymentid"
            value={firstPaymentValue.data}
            onChange={handleFirstPayment}
            className={
              typeof firstPaymentValue.errors !== "undefined" &&
              firstPaymentValue.errors.length > 0
                ? "bounce form__input--error form__input"
                : "form__input"
            }
          />
          <small className="form__info">
            Первый взнос: {firstPaymentValue.data || 0}%
          </small>
          <p className="error">{firstPaymentValue.errors}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-25">
          <label className="form__label" for="yearid">
            Период:
          </label>
        </div>
        <div className="col-75">
          <input
            type="range"
            name="year"
            id="yearid"
            min="1"
            max="6"
            step="1"
            value={yearsValue}
            onChange={handleChangeYears}
            className="form__input"
          />
          <small className="form__info">
            На {yearsValue} {plural(yearsValue, declension)}
          </small>
        </div>
      </div>

      <Calculator
        loan={loanValue.data}
        firstPayment={firstPaymentValue.data}
        years={yearsValue}
      />
    </div>
  );
}

export default App;
