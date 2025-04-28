// import { useState, useEffect } from "react";
// import { API_KEY, API_URL } from "../components/config";
// import { Preloader } from "../components/Preloader";
// import { Cart } from "../components/Cart";
// import { GoodsList } from "../components/GoodsList";
// import { BasketList } from "../components/BasketList";

// export function Shop() {
//   const [goods, setGoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [order, setOrder] = useState([]);
//   const [isBasketShow, setBasketShow] = useState(false);

//   useEffect(function getGoods() {
//     fetch(API_URL, {
//       headers: {
//         Authorization: API_KEY,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         data.featured && setGoods(data.featured);
//         setLoading(false);
//       });
//   });

//     const addToBasket = (item) => {
//         const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
//         if(itemIndex < 0) {
//             const newItem = {
//                 ...item,
//                 quantity:1,
//             };
//             setOrder([...order, newItem]);
//         } else {
//             const newOrder = order.map((orderItem, index) => {
//                 if(index === itemIndex){
//                     return {
//                         ...orderItem,
//                         quantity: orderItem.quantity + 1,
//                     };
//                 } else {
//                     return orderItem;
//                 }
//             });
//             setOrder(newOrder);
//         }
//     };

//     const removeFromBasket = (itemId) => {
//       const newOrder = order.filter((e1) => e1.id !== itemId);
//       setOrder(newOrder);
//     };

//     const handleBasketShow = () => {
//         setBasketShow(!isBasketShow);
//     };

//     const incQuantity = (itemId) => {
//       const newOrder = order.map((e1) => {
//         if (e1.id === itemId) {
//           const newQuantity = e1.quantity + 1;
//           return {
//             ...e1,
//             quantity: newQuantity,
//           };
//         } else {
//           return e1;
//         }
//       });
//       setOrder(newOrder);
//     };

//     const decQuantity = (itemId) => {
//       const newOrder = order.map((e1) => {
//         if (e1.id === itemId) {
//           const newQuantity = e1.quantity - 1;
//           return {
//             ...e1,
//             quantity: newQuantity >= 0 ? newQuantity : 0,
//           };
//         } else {
//           return e1;
//         }
//       });
//       setOrder(newOrder);
//     };

//   return (
//     <main className="container content">
//       <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
//       {loading ? (
//         <Preloader />
//         ) : (
//         <GoodsList goods={goods} addToBasket={addToBasket}/>)
//     }
//     {isBasketShow && (
//         <BasketList 
//             order={order}  
//             handleBasketShow = {handleBasketShow} 
//             removeFromBasket = {removeFromBasket}
//             incQuantity = {incQuantity}
//             decQuantity = {decQuantity}
//         />
//       )}
//     </main>
//   );
// }

import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../components/config";
import { Preloader } from "../components/Preloader";
import { GoodsList } from "../components/GoodsList";
import { BasketList } from "../components/BasketList";
import { Tooltip } from "../components/Tooltip";

export function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setIsBasketShow] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL, {
        headers: { Authorization: API_KEY },
      });
      const data = await response.json();
      setGoods(data.shop);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isTooltipVisible) {
      const timer = setTimeout(() => {
        setTooltipVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTooltipVisible]);

  const addToBasket = (item) => {
    setOrder((prevOrder) => {
      const itemIndex = prevOrder.findIndex(
        (orderItem) => orderItem.mainId === item.mainId
      );

      if (itemIndex < 0) {
        return [...prevOrder, { ...item, quantity: 1 }];
      }

      return prevOrder.map((orderItem, index) =>
        index === itemIndex
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    });
    setTooltipVisible(true);
  };

  const removeFromBasket = (mainId) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.mainId !== mainId));
  };

  const incrementQuantity = (mainId) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.mainId === mainId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (mainId) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((item) => {
          if (item.mainId === mainId) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleBasketShow = () => {
    setIsBasketShow((prev) => !prev);
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsBasketShow(false);
    }
  };

  return (
    <main className="container content">
      <div className="cart-container">
        <div className="cart" onClick={handleBasketShow}>
          <i className="material-icons">shopping_basket</i>
          {order.length > 0 && (
            <span className="cart-quantity">{order.length}</span>
          )}
        </div>
      </div>

      {isBasketShow && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsBasketShow(false)}
            >
              &times;
            </button>
            <BasketList
              order={order}
              removeFromBasket={removeFromBasket}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          </div>
        </div>
      )}

      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}
      <Tooltip isVisible={isTooltipVisible} message="Товар в корзине!" />
    </main>
  );
}