



export function Item({ item, onDeleteItem, onToggleItem }) {
  console.log(item);
  return (
    <li style={{ overflow: "hidden" }}>
      <input type="checkbox" value={item.packed} onChange={() => { onToggleItem(item.id); }} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button style={{ overflow: "hidden" }} onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
