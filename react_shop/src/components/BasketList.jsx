// import { BasketItem } from "./BasketItem";

// export function BasketList(props){
//     const { 
//         order = [], 
//         handleBasketShow = Function.prototype,
//         removeFromBasket = Function.prototype,
//         incQuantity = Function.prototype,
//         decQuantity = Function.prototype,
//      } = props;
//     const totalPrice = order.reduce((sum,e1) => {
//         return sum + e1.price * e1.quantity;
//     }, 0);
//     return (
//         <ul className="collection">
//             <li className="collection-item active blue lighten-1">Корзина</li>
//             {order.length ? (
//                 order.map((item) => <BasketItem key={item.id} removeFromBasket={removeFromBasket} incQuantity={incQuantity} decQuantity={decQuantity} {...item} />)
//             ) : (
//                 <li className="collection-item">Корзина пуста</li>
//             )}
//             <li className="collection-item active blue lighten-1">Общая стоимость заказа: {totalPrice} руб.</li>
//             <i className = "material-icons basket-clear" onClick={handleBasketShow}>clear</i>
//         </ul>
//     )
// }
import { BasketItem } from "./BasketItem";

export function BasketList({
  order,
  removeFromBasket,
  incrementQuantity,
  decrementQuantity,
}) {
  const calculateTotalPrice = () => {
    return order.reduce(
      (sum, item) => sum + item.price.finalPrice * item.quantity,
      0
    );
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="basket-modal">
      <h2 className="collection-item active">Ваша корзина</h2>
      <ul className="cart-list">
        {order.length ? (
          order.map((item) => (
            <BasketItem
              key={item.mainId}
              item={item}
              decrementQuantity={decrementQuantity}
              incrementQuantity={incrementQuantity}
              removeFromBasket={removeFromBasket}
            />
          ))
        ) : (
          <li className="collection-item">Корзина пуста</li>
        )}
      </ul>
      <div className="total-price">Итого: {totalPrice} руб.</div>
    </div>
  );
}