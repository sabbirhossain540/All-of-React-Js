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
    id: 546661,
    name: "Nuts",
    max_limit: 2000,
    image: "https://i.pravatar.cc/48?u=118836",
    total_expense: 1500,
    current_amount: 500,
    status: "disable",
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
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [catrgoriesList, setCategoriesList] = useState(initialExpenseCategory);

  function handleModule(cardtype){
    //console.log(cardtype);
    if (cardtype.modalFor === "category") {
      setCatModuleControl(false);
    }

    if (cardtype.modalFor === "categoryDetails") {
      setCatDetModuleControl(false);
    }
  }

  function handleButton(actionFrom, id){
    setCatDetModuleControl(false);
    setCatModuleControl((show)=> !show);
    setExpDetModule(false);
    setSelectedCatId(null)
  }

  function handleCategoryDetails(categoryId){
    setCatDetModuleControl(true);
    setCatModuleControl(false);
    setExpDetModule(false);
    setSelectedCatId(categoryId);
  }

  function handleExpenseForm(categoryId){
    setExpDetModule((show)=> !show);
    setCatDetModuleControl(false);
    setCatModuleControl(false);
    setSelectedCatId(categoryId);
  }

  function handleCategories(category) {
    setCategoriesList(catrgoriesList=>[...catrgoriesList, category]);
  }

  function handleTotalExpanse(value) {
  setCategoriesList(prevList =>
    prevList.map(category =>
      category.id === selectedCatId
        ? {
            ...category,
            total_expense: value.total_expense,
            current_amount: value.rem_amount,
          }
        : category
    )
  );

  setExpDetModule(false);

  //setSelectedCatId(null);
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
          originalCategoryList = {catrgoriesList}
          selectedCatId = {selectedCatId}
        />


        {catModuleControl && <FormAddCategory handleModule={handleModule} categoryAddHandle={handleCategories}/>}
        {catDetModuleControl && <CategoryDetails 
          handleModule={handleModule} 
          categoryDetailsId={selectedCatId} 
          catrgoriesList = {catrgoriesList}
        />}
      </div>
      {expDetModule && <ExDetailsForm selectedCatId={selectedCatId} catrgoriesList = {catrgoriesList} handleTotalExpanse={handleTotalExpanse} />}
    </div>
  );
}

function ExCategoryList({handleButton, catModuleControl, handleCategoryDetails, handleExpenseForm, expDetModule, originalCategoryList, selectedCatId}){
  const categoryList = originalCategoryList;
  return(
    <>
    <h3>Expense Category List</h3>
    <ul>
      {categoryList.map((category)=>(
        <ExCategory 
          category={category} 
          handleCategoryDetails={handleCategoryDetails} 
          selectedCatId={selectedCatId} 
          handleExpenseForm={handleExpenseForm} 
          expDetModule={expDetModule} 
          key={category.id}
        />
      ))}
      
    </ul>
    {catModuleControl === false && <Button handleButton={handleButton}> Add Category</Button>}
    </>
  );
}


function Button({children, handleButton, categoryId}){
  return(
    <button className="button" onClick={handleButton}>{children}</button>
  );
}

function ExCategory({category, handleCategoryDetails, handleExpenseForm, expDetModule, selectedCatId}){
  const isSelected = selectedCatId === category.id;
 // console.log(isSelected);
  return(
    <>
    <li className={isSelected? "selected":""}>
      <img src="https://ui-avatars.com/api/?name=Meat/Fish&size=48"  alt="name" />
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


      <Button handleButton={()=>handleCategoryDetails(category.id)}>Details</Button>
      <Button handleButton={()=>handleExpenseForm(category.id)}>{isSelected? "Cancel " : "Add "}Expense</Button>
    </li>

    </>
  );
}

function FormAddCategory({handleModule, categoryAddHandle}){
  const modalFor = "category";
  const [catName, setCatName] = useState("");
  const [maximum, setMaximum] = useState("");
  const [imgUrl, setImgUrl] = useState("https://ui-avatars.com/api/?name=");
  const [status, setStatus] = useState("active");


  function handleSubmit(e){
    e.preventDefault();
    if(!catName || !maximum || !imgUrl || !status) return;

    const id = crypto.randomUUID();
    const newCategory = {
      id: id,
      name: catName,
      max_limit: maximum,
      image: `${imgUrl}${catName}&size=48`,
      total_expense: 0,
      current_amount: 0,
      status: status,
    }

    categoryAddHandle(newCategory);

    setCatName("");
    setMaximum("")
    setImgUrl("https://ui-avatars.com/api/?name=");
    setStatus("active");
  }



  return(
    <>
      <ModalHeaderControl handleModule={handleModule} modalFor={modalFor}>Add Category</ModalHeaderControl>

      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>Category Name</label>
        <input type="text" value={catName} onChange={(e)=>setCatName(e.target.value)} />

        <label>Maximum Limit</label>
        <input type="text" value={maximum} onChange={(e)=>setMaximum(Number(e.target.value))}/>

        <label>Image Url</label>
        <input type="text" value={imgUrl} alt={catName} onChange={(e)=>setImgUrl(e.target.value)}/>

        <label>Status</label>
        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="active">Activated</option>
          <option value="deactivate">Deactivate</option>
        </select>
        
        <Button>Add</Button>

      </form>

    </>
  );
}




function CategoryDetails({handleModule, categoryDetailsId, catrgoriesList}){
  const categoryDetail = catrgoriesList.find(
    (data) => data.id === categoryDetailsId
  );

  const modalFor = "categoryDetails";
  return(
    <>
      <ModalHeaderControl handleModule={handleModule} modalFor={modalFor} >Category Name Details</ModalHeaderControl>
      <div className="catDetails">
        <table>
          <tbody>
            <tr>
              <td>Image</td>
              <td><img alt={categoryDetail.image} src={categoryDetail.image}/></td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{categoryDetail.name}</td>
            </tr>
            <tr>
              <td>Maximum Limit</td>
              <td>{categoryDetail.max_limit}</td>
            </tr>
            
            <tr>
              <td>Total Expense</td>
              <td>{categoryDetail.total_expense}</td>
            </tr>
            <tr>

              <td>Current Amount</td>
              <td className= {categoryDetail.current_amount >= 0 ? "" : "red" }>{categoryDetail.current_amount}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td className= {categoryDetail.status === 'active' ? "" : "red" }>{categoryDetail.status}</td>
            </tr>

          </tbody>
          
        </table>
      </div>
    </>
  );
}


function ExDetailsForm({selectedCatId, catrgoriesList, handleTotalExpanse}){
  
  const categoryDetail = catrgoriesList.find(
    (data) => data.id === selectedCatId
  );
  const [selectedCategory, setSelectedCategory] = useState(categoryDetail.name);
  const [remAmount, setRemAmount] = useState(Number(categoryDetail.current_amount));
  const [expAmount, setExpAmount] = useState("");
  const orgAmount = Number(categoryDetail.current_amount);
  
  let orgExpense = Number(categoryDetail.total_expense);

  function handleCalculation(e) {
    let newExp = Number(e.target.value); 
    setExpAmount(newExp);
    setRemAmount(orgAmount - newExp);
    
    if(newExp > orgAmount){
      setExpAmount(orgAmount);
      setRemAmount(0);
      newExp = orgAmount;
    }
    orgExpense = orgExpense + newExp;

  }



  function handleSubmit(e){
    e.preventDefault();
    if(!expAmount) return;
    const newItem = {
      'total_expense' : expAmount+orgExpense,
      'rem_amount' : remAmount
    };

    handleTotalExpanse(newItem);
    //console.log(newItem);
  }

  return (
    <div>
      <form className="form-split-bill" onSubmit={handleSubmit} >
        <h2>Add expense details</h2>

        <label>Selected Category</label>
        <input type="text" value={selectedCategory} disabled />

        <label>Amount</label>
        <input
          type="number"
          value={expAmount}
          onChange={handleCalculation} 
        />

        <label>Remaining Amount</label>
        <input type="text" value={remAmount} disabled />

        <Button>Submit</Button>
      </form>
    </div>
  );
  
}
