import { GoodsItem } from "./GoodsItem";

export function GoodsList(props) {
    const {goods = [], addToBasket} = props;
    if (!goods.length){
        return <h3>Not found</h3>;
    }
    return (
        <div className = "goods">
            {goods.map((item) => (
                <GoodsItem key={item.id} {...item} addToBasket = {addToBasket}/>
            ))}
        </div>
    );
}