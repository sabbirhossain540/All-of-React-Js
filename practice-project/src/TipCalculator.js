import { useState } from "react";

export default function App(){
    const [bill, setBill] = useState("")
    const [totalBill, setTotalBill] = useState(0);
    const [myPersentage, setMyPercentage] = useState(0);
    const [friendPercentage, setFriendPercentage] = useState(0);
    const tips = bill * ((myPersentage + friendPercentage) / 2 / 100);
    const totalPayble = bill + tips;

    function handleReset(){
        setBill(0);
        setMyPercentage(0);
        setFriendPercentage(0);
    }

    
    return (
        <div>
            <BillInput bill={bill} onSetBill = {setBill} setTotalBill ={setTotalBill}/>
            <ServiceRelated myPersentage={myPersentage} setMyPercentage={setMyPercentage}>How did you like the service?</ServiceRelated>
            <ServiceRelated myPersentage={friendPercentage} setMyPercentage={setFriendPercentage}>How did you friend like the service?</ServiceRelated>
            <TotalBill totalBill={totalPayble} tips={tips} bill={bill} />
            <ResetForm handleReset={handleReset} />
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

function ServiceRelated({myPersentage, setMyPercentage, children}){
    return (
        <div>
            <label>{children}</label>
            <select value={myPersentage} onChange={(e)=>setMyPercentage(Number(e.target.value))}>
                <option value="0">Desatisfied (0%)</option>
                <option value="5">It was ok (5%)</option>
                <option value="10">It was good (10%)</option>
                <option value="20">Absoulatly Amazing (20%)</option>
            </select>
        </div>
    );
}

function TotalBill({totalBill, tips, bill}){

    return(
        <div>
            <h4>`Your total payble bill is {totalBill} 
                 -  Actual amount is {bill}
                Tips {tips}`
                </h4>
        </div>
    );
}

function ResetForm({handleReset}){
    return(
        <div>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}



