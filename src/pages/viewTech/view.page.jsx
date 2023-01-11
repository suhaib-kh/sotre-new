import { useEffect, useState, useContext } from 'react';
import './view.css';
import Spinner from '../../components/core/spinner/spinner.component';
import FilterBar from '../../components/view/filter-bar/filter-bar.component';
import Item from '../../components/view/item/item.component';
import { getCartQuantity } from '../../utils/cart';
import { CartContext } from '../../components/providers/cart-provider.component';
import { fetchItems } from '../../services/items.service';
import useFilterItems from '../../hooks/filter-items.hook';
import useToggle from '../../hooks/common/toggle.hook';

/**
 * @type {Array<{
 * id: number;
 * name: string;
 * description: string;
 * ingredients: string[];
 * price: number;
 * category: string;
 * image: string;
 * }>}
 */
const initialItems = [];

const ViewPage = () => {
  const [menuItems, setMenuItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [isTourist, toggleIsTourist] = useToggle(false);

  const cartContext = useContext(CartContext);

  const getMenuItems = async () => {
    setLoading(true);
    const items = [
      {
      "id": "55101",
      "name": "Dishwasher",
      "price": 1000,
      "description": "AmazonBasics 6 Place Setting Dishwasher (with Scheduler, Tough Indian Masala and Oil stains, Silver)",
      "category": "Electrical Tools",
      "ingredients": [
      "tomato",
      "cucumber",
      "onion"
      ],
      "image": "https://azcd.harveynorman.com.au/media/catalog/product/cache/21/image/992x558/9df78eab33525d08d6e5fb8d27136e95/s/m/sms8edi01a-bosch-60cm-series-8-freestanding-dishwasher.jpg"
      },
      {
      "id": "55111",
      "name": "Wash Machine",
      "price": 2000,
      "description": "AmazonBasics Fully Automatic Front Load Washing Machines are equipped with a range of smart features designed to deliver efficient performance at an affordable price.",
      "category": "Electrical Tools",
      "ingredients": [
      "rice",
      "chicken"
      ],
      "image": "https://www.lg.com/sa_en/images/washing-machines/md07541925/gallery/D_01.jpg"
      },
      {
      "id": "55012",
      "name": "Vacuum Cleaner",
      "price": 200,
      "description": "Power 1200W. Powerful Suction. In-built Blower Function. Compact and Convenient. 4.5m Long Cord. Filter Type : Cloth Bag.",
      "category": "Electrical Tools",
      "ingredients": [
      "chicken",
      "garlic",
      "fries"
      ],
      "image": "https://royal.ps/storage/products/February2022/ydlVgxAz8rRuaqAjt5MI.jpg"
      },
      {
      "id": "5513",
      "name": "fridge",
      "image": "https://sbitany.com/image/cache/catalog/GR-X720INS%20(%2046710%20)/download1-20210929123425-1000x1000.png",
      "description": "Featuring various wash programs, a spacious design, and innovative functions, the Bosch 60cm Series 8 Freestanding Dishwasher\n",
      "price": 2500,
      "category": "Electrical Tools",
      "ingredients": [
      "Cheese",
      "Pastry",
      "Syrup",
      "Pistachio "
      ]
      }];
    setMenuItems(items);
    setLoading(false);
  };

  useEffect(() => { getMenuItems(); }, []);

  const filteredItems = useFilterItems(menuItems, isTourist);  

  return (
    <div className="view-page">
      <h1>View Menu Items</h1>
      {/* <FilterBar isTourist={isTourist} toggleIsTourist={toggleIsTourist} /> */}
      {
        loading
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Spinner /></div>
          : (
            <div className="items-container">
              {
                filteredItems.length
                  ? filteredItems.map((item, index) => (
                    <Item
                      data={item}
                      key={item.name + index}
                      dispatch={cartContext.dispatch}
                      cartQuantity={getCartQuantity(item.id, cartContext.cart)}
                    />
                  ))
                  : (
                    <div className="no-results">
                      <img src="./frustrated-realistic.png" alt="No results" />
                      <p>No results found</p>
                    </div>
                  )
              }
            </div>
          )
      }
    </div>
  );
};

export default ViewPage;