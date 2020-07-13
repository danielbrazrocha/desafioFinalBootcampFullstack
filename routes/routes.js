const express = require('express');
const transactionRouter = express.Router();
const TransactionModel = require('../models/TransactionModel.js');
//import { TransactionModel } from "../models/TransactionModel.js";



//Rota geral, filtrando por mês/ano
//Ex.: http://localhost:3001/api/transaction?period=2019-03
transactionRouter.get ("/", async (req, res) => {    
    try {
        console.log(`GET Route / Mês: ${req.query.period}`);        
        const transactionData = await TransactionModel.find({yearMonth: req.query.period}, {});   
        if (req.query.period === undefined || transactionData.length == 0) { throw new Error(`É necessário informar o parâmetro 'period', cujo valor deve estar no formato yyyy-mm. Ex.: /api/transaction?period=2019-03"`) };
        res.send(transactionData);
    } catch (error) {
        res.status(400).send({ error: error.message }); 
    }
});

//Rota que busca por descrição
//Ex.: http://localhost:3001/api/transaction/search?q=padaria
transactionRouter.get ("/search", async (req, res) => {    
    try {
        console.log(`GET Busca Descrição. Termo: ${req.query.q}`);    
        var condition = req.query.q 
        ? { description: {$regex: new RegExp(req.query.q), $options: 'i' } }
        : {};    
        const transactionData = await TransactionModel.find(condition);   
        if (req.query.q === undefined || transactionData.length == 0) { throw new Error(`A busca por "${req.query.q}" não retornou nenhum resultado.`) };
        res.send(transactionData);
    } catch (error) {
        res.status(400).send({ error: error.message }); 
    }
});

//db.student.distinct("subject")
//Rota para buscar meses
//http://localhost:3001/api/transaction/monthlist
transactionRouter.get ("/monthlist", async (req, res) => {    
    try {
        console.log(`GET Lista Meses`);    
        const monthList = await TransactionModel.distinct("yearMonth");   
        //if (req.query.q === undefined || transactionData.length == 0) { throw new Error(`A busca por "${req.query.q}" não retornou nenhum resultado.`) };
        res.send(monthList);
    } catch (error) {
        res.status(400).send({ error: error.message }); 
    }
});

transactionRouter.delete ("/delete", async (req, res) => {    
    try {
        console.log(`DELETE Route: ID nº  ${req.query.q}`);    
        const deleteByIdmonthList = await TransactionModel.deleteOne({_id: req.query.q});   
        //if (req.query.q === undefined || transactionData.length == 0) { throw new Error(`A busca por "${req.query.q}" não retornou nenhum resultado.`) };
        res.send(deleteByIdmonthList);
    } catch (error) {
        res.status(400).send({ error: error.message }); 
    }
});














module.exports = transactionRouter;
