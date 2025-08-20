export function States({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some Item...</em>
      </p>
    );
  const numItems = items.length;
  const packedItem = [];
  items.filter(item => {
    if (item.packed) {
      packedItem.push(item);
    }
  });
  const perc = Math.round(((packedItem.length / numItems) * 100));

  return (
    <footer className="stats">
      <em>
        {perc === 100 ? `You got everything. Ready to go..` : `You have ${numItems} item in your list, Already packed ${packedItem.length} (${perc}%)`}

      </em>
    </footer>
  );
}
