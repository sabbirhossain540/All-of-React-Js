const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "tickets", quantity: 1, packed: true },
];

function App(){
  return (
    <div className="app">
      <Logo/>
      <Form/>
      <PackingList/>
      <States/>
    </div>
  )
}


function Logo(){
  return (
    <h1>🌿Far Away</h1>
  )

}

function Form(){
  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
    </div>
  );
}

function PackingList(){

  return (
    <div className="list">
      <ul>
        {initialItems.map(item=>
          <Item item={item} key={item.id} />
        )}
      </ul>
    </div>
    
  );
}

function Item({ item }){
  return (
    <li style={{overflow:"hidden"}}>
      <span style={item.packed ? {textDecoration:"line-through"} : {}}>{item.quantity} {item.description}</span>
      <button>❌</button>
    </li>
  );
}



function States(){
  return (
    <footer className="stats">
      <em>You have X item in your list, Already packed X (X%)</em>
    </footer>
  );
}








export default App;
