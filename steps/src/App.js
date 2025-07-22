import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App(){
  return(
    <>
      {/* <Steps/> */}
      <Counter/>
    </>
  )
}

function Counter(){
  const [count, setCount] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date());
  const date = new Date("july 22 2025");
  date.setDate(date.getDate()+count);


  const addDays = () =>{
    setCount((e) => e+1);
  }

  const subDay =()=>{
    setCount((e) => e-1);
  }

  return (
    <>
      <div>
        <button onClick={subDay}>-</button>
        <p>Today is: {date.toDateString()}</p>

        <button onClick={addDays}>+</button>
      </div>
      <p>
        {count}
      </p>
    </>
  )
}

function Steps(){
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  //const [test, setTest] = useState({"name" : "Hello"})

  const handlePrevious = () =>{
    //if(step > 1) setStep(step - 1);
    if((step > 1) )
      setStep((s) => s-1);
  }


  const handleNext = () =>{
    if(step < 3) setStep(step + 1);
    //setTest({"name" : "World"});
  }

  return (
    <>
      <button className="close" onClick={() =>{
        setIsOpen(!isOpen);
      }}>&times;</button>
      {isOpen && (
        <div className="steps">
        <div className="numbers">
          <div className={step >=1 ? "active" : ""}>1</div>
          <div className={step >=2 ? "active" : ""}>2</div>
          <div className={step >=3 ? "active" : ""}>3</div>
        </div>

        <p className="message">Step {step}: {messages[step-1]}</p>
        <div className="buttons">
          <button style={{backgroundColor: '#7950f2', color:"#fff"}} onClick={handlePrevious}>Previous</button>
          <button style={{backgroundColor: '#7950f2', color:"#fff"}} onClick={handleNext}>Next</button>
        </div>
      </div> 
      )}

    </>
  )
}

export default App;