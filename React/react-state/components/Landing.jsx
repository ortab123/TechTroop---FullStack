export default function Landing({ userName, storeData }) {
  const hottestItem = storeData.find((item) => item.hottest);

  return (
    <div>
      Welcome, {userName}. The hottest item is {hottestItem.item} for $
      {hottestItem.price}
    </div>
  );
}
