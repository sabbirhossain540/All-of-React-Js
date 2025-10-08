import { useReducer, useState } from "react";
const initialState = {count:0, step:1};
function reducerHandler(state, action){

  console.log(state, action);

  switch(action.type){
    case 'dec':
      return {...state, count: state.count-state.step}
    case 'inc':
      return {...state, count: state.count+state.step}
    case 'setCount':
      return {...state, count: action.payload}
    case 'setStep':
      return {...state, step: action.payload}
    case 'reset':
      return initialState;
    default:
      return "something went wrong";

  }
  // if(action.type === 'inc') return state + 1;
  // if(action.type === 'dec') return state - 1;
  // if(action.type === 'setCount') return action.payload;
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  
  //const [step, setStep] = useState(1);
  const [state, manageState] = useReducer(reducerHandler, initialState);
  //const [state, dispatch] = useReducer(reducer, initialState);
  const {count, step} = state

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    manageState({type: "dec"});
    
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
  };

  const inc = function () {
    manageState({type: "inc"});
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
  };

  const defineCount = function (e) {
    manageState({type: "setCount", payload: Number(e.target.value)});
    //setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    manageState({type: "setStep", payload: Number(e.target.value)});
    //setStep(Number(e.target.value));
  };

  const reset = function () {
    manageState({type: "reset"});
    //setCount(0);
    //setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="25"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
