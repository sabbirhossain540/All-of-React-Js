import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList } from "./PackingList";
import { States } from "./States";

function App(){
  const [items, setItems] = useState([]);
  

  const handleAddItems = (item) =>{
    setItems((items)=>[...items, item]);
  }

  const handleDeleteItem = (id) =>{
    setItems(items=>items.filter(item=>item.id !==id))
  }

  const handleToggleItem = (id) =>{
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  const handleItemList = () =>{
    const confirmed = window.confirm("Are you sure to delete all the item from the list!!");
    
    if(confirmed)
      setItems([]);
  }

  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleItemList} />
      <States items={items} />
    </div>
  )
}

export default App;
