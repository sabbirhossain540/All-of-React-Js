import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion faqs={faqs} />
    </div>
  );
}

function Accordion({faqs}) {
  const [curOpen, setIsOpen] = useState(null);
  return <div>
    {faqs.map((el, i) =>(
      <AccorditionItem curOpen={curOpen} onOpen={setIsOpen} title={el.title}  num={i} >{el.text}</AccorditionItem>
    ))}

    <AccorditionItem curOpen={curOpen} onOpen={setIsOpen} title= "Test"  num="9" >This is test text</AccorditionItem>
  </div>;
}

const AccorditionItem = ({curOpen, onOpen, title, num, children}) =>{
  const isOpen = num === curOpen;
  
  function handleToggle(){
    onOpen(num);
  }
  

  return (<div className={`item ${isOpen ? "open":""}`} onClick={handleToggle}>
    <p className="number">{num+1}</p>
    <p className="title">{title}</p>
    <p className="icon">{isOpen?"-":"+"}</p>
    {isOpen && <div className="content-box">{children}</div>}
  </div>);
}
