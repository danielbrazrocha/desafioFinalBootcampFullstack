import React from 'react'


function formatMoney(value) {
    const newFormatMoney = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}
    )
    return newFormatMoney.format(value);
};

export default function Transaction( {data, onDeleteTransaction}) {    
    //Definindo as variáveis para estilização dos cards via materialize
    const classCredit = 'teal lighten-2';
    const classDebit = 'red lighten-2';

    //const valueFormatter    
    const classValue = data.type === "+" ? classCredit : classDebit;

    const handleEdit = () => {
        console.log("Edit!");
        window.alert("Edit!");
    };

    const handleDelete = () => {        
        console.log(`Deletando ID nº ${data._id}`);
        onDeleteTransaction(data._id);
        
    };

    return (
        <div className="row">
            <div className={classValue} style={styles.flexRow}>
                <div style={{marginRight: '20px'}}>
                    <div><strong>{data.day}</strong></div>
                </div>
                <div style={{width: '350px'}} >
                    <div><strong>{data.category}</strong></div>
                    <div>{data.description}</div>                    
                </div>
                <div style={{width: '100px'}}>
                    <div>{formatMoney(data.value)}</div>
                </div>
                <div style={{width: '10px'}}>
                    <div><i onClick={handleEdit} className="small material-icons">edit</i></div>
                </div>
                <div style={{width: '10px'}}>
                    <div><i onClick={handleDelete} className="small material-icons">delete</i></div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    flexRow: {
        fontSize: '1.8em',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        border: '1px solid lightgrey',
        borderRadius: '4px',
        padding: '4px',
        margin: '4px'
    }
}