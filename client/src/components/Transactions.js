import React from 'react'
import Transaction from './Transaction';

export default function Transactions( {data} ) {
    const { actualTransactions, onDeleteTransaction } = data;    
    
    return (
        <div className="row">
            {actualTransactions.map((item) => {
                return <Transaction key={item._id} data={item} onDeleteTransaction={onDeleteTransaction} />;
            })}
        </div>
    )
}