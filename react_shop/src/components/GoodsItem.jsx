// export function GoodsItem(props) {
//     const { id, name, description, price, full_background, addToBasket = Function.prototype } = props;
  
//     return (
//       <div className="card" id={id}>
//         <div className="card-image">
//           <img src={full_background} alt={name} />
//           <span className="card-title">{name}</span>
//         </div>
//         <div className="card-content">
//           <p>{description}</p>
//         </div>
//         <div className="card-action">
//           <button className="btn" onClick={() => addToBasket ({id,name,price})}>Купить</button>
//           <span className="right">{price}</span>
//         </div>
//       </div>
//     );
//   }

export function GoodsItem({
  mainId,
  displayName,
  displayDescription,
  price,
  displayAssets,
  addToBasket,
}) {
  const backgroundImage = displayAssets.length
    ? displayAssets[0].full_background
    : displayName;

  return (
    <div className="card">
      <div className="card-image">
        <img src={backgroundImage} alt={displayName} />
      </div>
      <div className="card-content">
        <span className="card-title">{displayName}</span>
        <p>{displayDescription}</p>
      </div>
      <div className="card-action">
        <div>
          <button
            className="btn blue lighten-1"
            onClick={() =>
              addToBasket({
                mainId,
                displayName,
                price,
              })
            }
          >
            Купить
          </button>
        </div>
        <div>
          <span className="right">{price.finalPrice} V</span>
        </div>
      </div>
    </div>
  );
}