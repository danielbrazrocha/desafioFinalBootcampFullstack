import React from 'react'

export default function SearchBar({data}) {
    const { onFilter } = data;

    const handleNewTransaction = () => {
        window.alert("Cadastrando nova Transação!")
    };
    const handleNewFilter = (e) => {        
        onFilter(e.target.value);
    };


    return (
        <div className="container search valign-wrapper">

            <div>
                <button id="newTransaction"  className="btn" onClick={handleNewTransaction}>
                    <span> + Novo Lançamento </span>
                </button>
            </div>

            <div className="textInput" >
                <input id="filter" placeholder="Filtrar lançamentos por descrição" onChange={handleNewFilter}></input>
            </div>
            </div>
    )
}
