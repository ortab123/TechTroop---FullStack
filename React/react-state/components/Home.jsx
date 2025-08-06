import Item from "../components/Item";
export default function Home({ storeData, shouldDiscount }) {
  const getPrice = (itemObj) => {
    if (shouldDiscount) {
      return Math.round(itemObj.price * (1 - itemObj.discount));
    }
    return itemObj.price;
  };

  return (
    <div>
      {storeData.map((itemObj, index) => (
        <Item key={index} item={itemObj.item} price={getPrice(itemObj)} />
      ))}
    </div>
  );
}
