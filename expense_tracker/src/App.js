import { useState } from "react";

const initialExpenseCategory = [
  {
    id: 646465,
    name: "Meat/Fish",
    max_limit: 5000,
    image: "https://ui-avatars.com/api/?name=Meat/Fish&size=48",
    total_expense: 3000,
    current_amount: 2000,
    status: "active",
  },
  {
    id: 9965665,
    name: "Vegetable",
    max_limit: 3000,
    image: "https://ui-avatars.com/api/?name=Vegetable&size=48",
    total_expense: 500,
    current_amount: 2500,
    status: "active",
  },
  {
    id: 546661,
    name: "Nuts",
    max_limit: 2000,
    image: "https://i.pravatar.cc/48?u=118836",
    total_expense: 1500,
    current_amount: 500,
    status: "disable",
  },
  {
    id: 5645641,
    name: "Spices",
    max_limit: 5000,
    image: "https://i.pravatar.cc/48?u=118836",
    total_expense: 5500,
    current_amount: -500,
    status: "active",
  },
  {
    id: 9855445,
    name: "Cosmatics",
    max_limit: 1500,
    image: "https://i.pravatar.cc/48?u=118836",
    total_expense: 1200,
    current_amount: 300,
    status: "active",
  },	
];

function Button({children, handleButton}){
  return(
    <button className="button" onClick={handleButton}>{children}</button>
  );
}

function ModalHeaderControl({children, handleModule, modalFor}){
  return(
    <div className="modal-design">
        <h2>{children}</h2>
        <button className="modal-button" onClick={()=>handleModule({modalFor})}>
          <p>X</p>
        </button>
      </div>
  );
}



export default function App(){
  const [catModuleControl, setCatModuleControl] = useState(false);
  const [catDetModuleControl, setCatDetModuleControl] = useState(false);
  const [expDetModule, setExpDetModule] = useState(false);

  function handleModule(cardtype){
    //console.log(cardtype);
    if (cardtype.modalFor === "category") {
      setCatModuleControl(false);
    }

    if (cardtype.modalFor === "categoryDetails") {
      setCatDetModuleControl(false);
    }
  }

  function handleButton(actionFrom){
    setCatDetModuleControl(false);
    setCatModuleControl((show)=> !show);
    setExpDetModule(false);
  }

  function handleCategoryDetails(){
    setCatDetModuleControl(true);
    setCatModuleControl(false);
    setExpDetModule(false);
  }

  function handleExpenseForm(){
    setExpDetModule((show)=> !show);
    setCatDetModuleControl(false);
    setCatModuleControl(false);
  }

  return(
    <div className="app">
      <div className="sidebar">
        <ExCategoryList
          handleButton         = {handleButton}
          handleCategoryDetails = {handleCategoryDetails}
          catModuleControl     = {catModuleControl}
          handleExpenseForm    = {handleExpenseForm}
          expDetModule         = {expDetModule}
        />


        {catModuleControl && <FormAddCategory handleModule={handleModule}/>}
        {catDetModuleControl && <CategoryDetails handleModule={handleModule}/>}
      </div>
      {expDetModule && <ExDetailsForm/>}
    </div>
  );
}

function ExCategoryList({handleButton, catModuleControl, handleCategoryDetails, handleExpenseForm, expDetModule}){
  const categoryList = initialExpenseCategory;
  return(
    <>
    <h3>Expense Category List</h3>
    <ul>
      {categoryList.map((category)=>(
        <ExCategory category={category} handleCategoryDetails={handleCategoryDetails} handleExpenseForm={handleExpenseForm} expDetModule={expDetModule}/>
      ))}
      
    </ul>
    {catModuleControl === false && <Button handleButton={handleButton}> Add Category</Button>}
    </>
  );
}

function ExCategory({category, handleCategoryDetails, handleExpenseForm, expDetModule}){
  return(
    <>
    <li>
      <img src="https://ui-avatars.com/api/?name=Meat/Fish&size=48" alt="name" />
      <h3>{category.name}</h3>

    {category.current_amount > 0 && (
        <p className="green">
          Available Balance: {category.current_amount} yen
        </p>
      )}
      {category.current_amount < 0 && (
        <p className="red">
          Available Balance: {category.current_amount} yen
        </p>
      )}


      <Button handleButton={handleCategoryDetails}>Details</Button>
      <Button handleButton={handleExpenseForm}>{expDetModule? "Cancel " : "Add "}Expense</Button>
    </li>

    </>
  );
}

function FormAddCategory({handleModule}){
  const modalFor = "category";
  return(
    <>
      <ModalHeaderControl handleModule={handleModule} modalFor={modalFor}>Add Category</ModalHeaderControl>

      <form className="form-add-friend">
        <label>Category Name</label>
        <input type="text"/>

        <label>Maximum Limit</label>
        <input type="text"/>

        <label>Image Url</label>
        <input type="text"/>

        <label>Status</label>
        <select>
          <option value="active">Activated</option>
          <option value="deactivate">Deactivate</option>
        </select>
        
        <Button>Add</Button>

      </form>

    </>
  );
}




function CategoryDetails({handleModule}){
  const modalFor = "categoryDetails";
  return(
    <>
      <ModalHeaderControl handleModule={handleModule} modalFor={modalFor} >Category Name Details</ModalHeaderControl>
      <div className="catDetails">
        <table>
          <tbody>
            <tr>
              <td>Image</td>
              <td><img src="https://ui-avatars.com/api/?name=Vegetable&size=48"/></td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Vegitable</td>
            </tr>
            <tr>
              <td>Maximum Limit</td>
              <td>5000</td>
            </tr>
            
            <tr>
              <td>Total Expense</td>
              <td>3500</td>
            </tr>
            <tr>
              <td>Current Amount</td>
              <td>1500</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>Active</td>
            </tr>

          </tbody>
          
        </table>
      </div>
    </>
  );
}


function ExDetailsForm(){
  return <>
    <div>
      <form className="form-split-bill">
        <h2>Add expense details</h2>
        <label>Select Category</label>
        <select>
          <option>1</option>
          <option>2</option>
        </select>

        <label>Amount</label>
        <input type="text" />

        <label>Remaining Amount</label>
        <input type="text" />

        <Button>Submit</Button>

      </form>;

    </div>
    
  
    </>
  
}
