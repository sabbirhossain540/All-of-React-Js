import { useState } from "react";

export default function App(){
    const [bill, setBill] = useState("")
    const [totalBill, setTotalBill] = useState(0);
    
    return (
        <div>
            <BillInput bill={bill} onSetBill = {setBill} setTotalBill ={setTotalBill}/>
            <TotalBill totalBill={totalBill} />
        </div>
    );
}

function BillInput({bill, onSetBill, setTotalBill}){
    return(
        <div>
            <label>How Much Was the Bill?</label>
            <input
                type="text"
                placeholder="bill value"
                value={bill}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    onSetBill(value);
                    setTotalBill(value);
                }}
                />

        </div>
    );
}

function TotalBill({totalBill}){
    return(
        <div>
            <h4>You total Bill is {totalBill}</h4>
        </div>
    );
}



