import React, { useState, useEffect } from "react";
import Transactions from "./components/Transactions";
import TransactionService from "./services/TransactionService";
import "./index.css";
import Summary from "./components/Summary";
import Spinner from "./components/Spinner";
import SearchBar from "./components/SearchBar";

const actualDate = new Date();
const options = { year: "numeric", month: "numeric" };
const actualMonthPreFormat = new Intl.DateTimeFormat("pt-BR", options)
  .format(actualDate)
  .replace("/", "-");
const actualMonth = `${actualMonthPreFormat.substring(
  3,
  7
)}-${actualMonthPreFormat.substring(0, 2)}`;

//var lista = ["2019-01", "2019-02", "2019-03", "2019-04", "2019-05", "2019-06", "2019-07", "2019-08", "2019-09", "2019-10", "2019-11", "2019-12", "2020-01", "2020-02", "2020-03", "2020-04", "2020-05", "2020-06", "2020-07", "2020-08", "2020-09", "2020-10", "2020-11", "2020-12", "2021-01", "2021-02", "2021-03", "2021-04", "2021-05", "2021-06", "2021-07", "2021-08", "2021-09", "2021-10", "2021-11", "2021-12"];

export default function App() {
  const [month, setMonth] = useState(actualMonth);
  const [actualTransactions, setActualTransactions] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [summary, setSummary] = useState([]);

  const onFilter = (newFilter) => {
    
    const newFilterLowerCase = newFilter.toLowerCase();
    try {
      if (!newFilter) {
        retrieveTransactions();
      }

      const filteredTransactions = actualTransactions.filter((item) => {
        return item.descriptionLowerCase.includes(newFilterLowerCase);
      });
      if (filteredTransactions.length == 0) {
        window.alert("Transação não encontrada!. Busca reiniciada");
        retrieveTransactions();
      }

      loadInitialTransactions(filteredTransactions);
      setActualTransactions(filteredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveTransactions = () => {
    TransactionService.get(month)
      .then((response) => {
        console.log(`Buscando transacoes do mes ${month}`);
        loadInitialTransactions(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveMonthList = () => {
    TransactionService.getMonthList()
      .then((response) => {
        setMonthList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDeleteTransaction = (_id) => {
    console.log(`Solicitando para deletar ${_id}`);
    TransactionService.remove(_id)
      .then((response) => {
        console.log(`ID ${_id} deletada com sucesso do DB  `);
        retrieveTransactions();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleMonthChange = (e) => {
    if (e.target.id === "plus") {
      console.log("mes+1");
    }
    if (e.target.id === "minus") {
      console.log("mes-1");
    }
    if (e.target.id === "selectMonth") {
      console.log(`Troquei o mês no combo para ${e.target.value}`);
      setMonth(e.target.value);
    }
    console.log(`o mês definido foi ${month}`);
  };

  function _prepareTransaction(transaction) {
    const { _id, description, category, month, ...otherFields } = transaction;

    return {
      _id,
      description,
      category,
      month,
      descriptionLowerCase: description.toLowerCase(),
      categoryLowerCase: category.toLowerCase(),
      ...otherFields,
    };
  };



  const loadInitialTransactions = (data) => {

    let countTransactions = data.length;
    let totalEarnings = 0;
    let totalExpenses = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "+") {
        totalEarnings = totalEarnings + data[i].value;
      }
      if (data[i].type === "-") {
        totalExpenses = totalExpenses + data[i].value;
      }
    }
    let balance = totalEarnings - totalExpenses;

    setSummary({
      countTransactions,
      totalEarnings,
      totalExpenses,
      balance,
    });



    const dataLowerCase = data.map((transaction) => {
      return _prepareTransaction(transaction);
    });
    debugger
    setActualTransactions(dataLowerCase);
  };

  useEffect(() => {
    retrieveMonthList();
    retrieveTransactions();
  }, [month]);

  return (
    <div className="container">
      <h2 className="center">Desafio Final do Bootcamp Full Stack</h2>
      <h3 className="center"> Controle Financeiro Pessoal</h3>

      <div
        className="container center valign-wrapper"
        style={{ width: "200px" }}
      >
        <div>
          <button id="minus" className="btn" onClick={handleMonthChange}>
            {" "}
            ←{" "}
          </button>
        </div>

        <div style={{ width: "200px" }}>
          <select
            id="selectMonth"
            onChange={handleMonthChange}
            defaultValue={month}
            className="center browser-default custom-select"
          >
            {monthList.map((item, key) => (
              <option key={key} value={item}>{`${item.substring(5, 7)}-${item.substring(0, 4)}`}</option>
            ))}
          </select>
        </div>

        <div>
          <button id="plus" className="btn" onClick={handleMonthChange}>
            <span> → </span>
          </button>
        </div>
      </div>




      {actualTransactions.length === 0 && <Spinner>Aguarde...</Spinner>}
      {actualTransactions.length > 0 && <Summary data={summary} />}
      {actualTransactions.length > 0 && <SearchBar data={{ onFilter }} />}
      <Transactions data={{ actualTransactions, onDeleteTransaction }} />
    </div>
  );
}

