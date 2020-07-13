import React from "react";
import { formatMoney } from "../helpers/formatHelpers"

export default function Summary({data}) {
    
    //Definindo as variáveis para estilização dos cards via materialize
    const classCredit = 'green-text lighten-2';
    const classDebit = 'red-text lighten-2';

    //const valueFormatter
    
    const classValue = data.balance > 0 ? classCredit : classDebit;    
  
  
  return (
    <div>
      <div className="padd">
        <div>
          <strong>Lançamentos: {data.countTransactions}</strong>
        </div>
        <div className={classCredit}>
          <strong>Receitas: {formatMoney(data.totalEarnings)}</strong>
        </div>
        <div className={classDebit}>
          <strong>Despesas: {formatMoney(data.totalExpenses)}</strong>
        </div>
        <div className={classValue}>
          <strong>Saldo: {formatMoney(data.balance)}</strong>
        </div>
      </div>
    </div>
  );
}
