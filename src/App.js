import { useState } from "react";

const items = [
  { id: 1, itemName: "Apples", itemPrice: 56.81, purchased: false },
  { id: 2, itemName: "Bananas", itemPrice: 28.31, purchased: false },
  { id: 3, itemName: "Milk", itemPrice: 66.31, purchased: false },
  { id: 4, itemName: "Eggs", itemPrice: 43.51, purchased: false },
  { id: 5, itemName: "Bread", itemPrice: 56.81, purchased: false },
  { id: 6, itemName: "Chicken Breast", itemPrice: 113.81, purchased: false },
  { id: 7, itemName: "Pasta", itemPrice: 34.01, purchased: false },
  { id: 8, itemName: "Rice", itemPrice: 47.31, purchased: false },
  { id: 9, itemName: "Tomatoes", itemPrice: 37.81, purchased: false },
  { id: 10, itemName: "Spinach", itemPrice: 43.51, purchased: false },
];

export default function App() {
  return (
    <div className="App">
      <MainContainer />
    </div>
  );
}

function MainContainer() {
  const [itemList, setItemList] = useState(items);
  const [budget, setBudget] = useState("");
  const [currentCost, setCurrentCost] = useState(0);
  function handleAddItem(item) {
    setItemList((items) => [...items, item]);
  }

  const totalPrice = itemList.reduce((accumulator, item) => {
    return accumulator + Number(item.itemPrice);
  }, 0);

  console.log(totalPrice);
  return (
    <div className="main-container">
      <AddToListForm onAddItem={handleAddItem} />
      <Totals
        budget={budget}
        setBudget={setBudget}
        totalPrice={totalPrice}
        currentCost={currentCost}
      />
      <Lists
        itemList={itemList}
        setItemList={setItemList}
        currentCost={currentCost}
        setCurrentCost={setCurrentCost}
      />
    </div>
  );
}

function AddToListForm({ onAddItem }) {
  const id = crypto.randomUUID();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  function handleSubmit(e) {
    if (!itemName || !itemPrice) return;
    e.preventDefault();
    const newItem = {
      id,
      itemName,
      itemPrice,
      purchased: false,
    };
    onAddItem(newItem);
  }

  return (
    <form className="add-to-list" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name..."
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Item price..."
        value={itemPrice}
        onChange={(e) => setItemPrice(Number(e.target.value))}
      />

      <button>Add to list🛒</button>
    </form>
  );
}

function Totals({ budget, setBudget, totalPrice, currentCost }) {
  function handleBudget(e) {
    e.preventDefault();
  }

  return (
    <div className="totals">
      <form action="" onSubmit={handleBudget}>
        <div className="form-group">
          <label>Budget: </label>
          <input
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
        <button>Set budget💵</button>
      </form>
      <div className="form-group">
        <label>Total cost: </label>
        <input type="text" value={`R${totalPrice}`} disabled />
      </div>
      <div className="form-group">
        <label>My budget: </label>
        <input
          value={typeof budget === "number" ? `R${budget}.00` : "R0.00"}
          disabled
        />
      </div>
      <div className="form-group">
        <label>Current cost: </label>
        <input value={Math.abs(currentCost).toFixed(2)} disabled />
      </div>

      <div className="form-group">
        <label>Change: </label>
        <input value={(budget - Math.abs(currentCost)).toFixed(2)} disabled />
      </div>
    </div>
  );
}

function Lists({ itemList, setItemList, currentCost, setCurrentCost }) {
  return (
    <div className="list">
      <ListTable
        itemList={itemList}
        setItemList={setItemList}
        setCurrentCost={setCurrentCost}
        currentCost={currentCost}
      />
    </div>
  );
}

function ListTable({ itemList, setItemList, currentCost, setCurrentCost }) {
  function handlePurchase(item) {
    const updateItems = itemList.map((i) => {
      if (i.id === item.id) {
        setCurrentCost(
          (currentCost = i.purchased
            ? currentCost + i.itemPrice
            : currentCost + -i.itemPrice)
        );
        return { ...i, purchased: !i.purchased };
      }
      return i;
    });

    setItemList(updateItems);
  }
  return (
    <table className="">
      <thead>
        <tr className="table-head-row">
          <th>Name</th>
          <th>Price</th>
          <th className="bin">Purchased</th>
        </tr>
      </thead>
      <tbody>
        {itemList.map((item) => (
          <tr key={item.id}>
            <td>{item.itemName}</td>
            <td>R{item.itemPrice}</td>
            <td onClick={() => handlePurchase(item)} className="item-check">
              {item.purchased ? "✅" : "❌"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
