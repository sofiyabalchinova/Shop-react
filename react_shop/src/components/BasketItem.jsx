// export function BasketItem(props) {
//     const {id, name, price, quantity, removeFromBasket = Function.prototype, incQuantity = Function.prototype, decQuantity = Function.prototype, } = props;
//     return (
//         <ul  className="collection">
//             <li className="collection-item">
//                 {name} <i class = "material-icons basket-quantity">remove</i> X {quantity} 
//                 <i class = "material-icons basket-quantity">add</i>= {price * quantity} {" "}руб.
//                 <span className="secondary-content" onClick={() => removeFromBasket(id)}>
//                     <i className="material-icons basket-delete">clear</i>
//                 </span>
//             </li>
//         </ul>
//     );
// }

export function BasketItem({
    item,
    decrementQuantity,
    incrementQuantity,
    removeFromBasket,
  }) {
    return (
      <li className="collection-item">
        <div className="plus-minus-btn">
          <button
            className="minus-button"
            onClick={() => decrementQuantity(item.mainId)}
          >
            -
          </button>
          <button
            className="plus-button"
            onClick={() => incrementQuantity(item.mainId)}
          >
            +
          </button>
        </div>
        {item.displayName} * {item.quantity} ={" "}
        {item.price.finalPrice * item.quantity}
        <span className="secondary-content">
          <i
            className="material-icons basket-delete"
            onClick={() => removeFromBasket(item.mainId)}
          >
            clear
          </i>
        </span>
      </li>
    );
  }