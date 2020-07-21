import React, { Component } from "react";

class Display extends Component {
  state = {
    interest: 0.015,
  };

  calculateMonthlyPayment = () => {
    const { loan, firstPayment, years } = this.props;
    const price = loan - (loan * firstPayment) / 100;
    const period = years * 12;
    const interest = this.state.interest;
    const monthlyPayment =
      (price * interest) / (1 - Math.pow(1 / (1 + interest), period));

    if (loan) {
      return (
        <div className="output__wrapper">
          <h2 className="output__header">Расчет:</h2>
          <p className="output__data">
            Заём:
            <span className="output__data__span">{price.toFixed(2)} €</span>
          </p>
          <p className="output__data">
            Процентная ставка:
            <span className="output__data__span">{interest * 100} %</span>
          </p>
          <p className="output__data">
            Количество месяцев:
            <span className="output__data__span">{period}</span>
          </p>
          <p className="output__data">
            Месячный платеж:
            <span className="output__data__span">
              {Math.round(monthlyPayment)} €
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="error">Для расчета нужно указать стоимость покупки</div>
      );
    }
  };

  render() {
    return <div className="output">{this.calculateMonthlyPayment()}</div>;
  }
}

export default Display;
