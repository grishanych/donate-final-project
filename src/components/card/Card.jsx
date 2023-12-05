/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import PropTypes from "prop-types";
import { Icons } from "./Icons";
import { counterIncrement } from "../../redux/actionsCreators/counterActionsCreators";
import { addFavorites, addToCart } from "../../redux/actions/cartActions";
import styles from "./Card.module.scss";
import Button from "../button/Button";

export function Card({ item }) {
  const {
    itemNo,
    shortName,
    currentPrice,
    currentValue,
    goal,
    nameCloudinary,
    category,
    _id,
  } = item;
  const dispatch = useDispatch();
  // eslint-disable-next-line no-underscore-dangle
  const isItemInCart = useSelector((state) => state.cart.items.some((cartItem) => cartItem._id === _id));
  // eslint-disable-next-line no-underscore-dangle
  const isItemInFavorites = useSelector((state) => state.favorites.items.some((favItem) => favItem._id === _id));

  const isUserLoggedIn = localStorage.getItem("userLogin");

  // for working with Cloudinary
  const cld = new Cloudinary({
    cloud: { cloudName: "dzaxltnel" },
    url: { secure: true },
  });
  const myImage = cld.image(`${nameCloudinary[0]}`);
  const imageURL = myImage.toURL();

  async function addCartToServer() {
    try {
      axios
        .put(`http://localhost:4000/api/cart/${_id}`)
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  }

  const handleAddToCart = async () => {
    if (isUserLoggedIn) {
      if (!isItemInCart) {
        addCartToServer();
        dispatch(addToCart(item));
        dispatch(counterIncrement());
      }
    } else if (!isUserLoggedIn) {
      const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];
      const isItemInLSCart = currentProducts && currentProducts.some((cartItem) => cartItem.product === _id);
      if (!isItemInLSCart && !isItemInCart) {
        currentProducts.push(item);
        localStorage.setItem("Cart", JSON.stringify(currentProducts));

        dispatch(addToCart(item));
        dispatch(counterIncrement());
      }
    }
  };

  async function addFavoritesToServer() {
    try {
      axios
        .put(`http://localhost:4000/api/wishlist/${_id}`)
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  }

  const handleAddFavorites = () => {
    if (isUserLoggedIn) {
      if (!isItemInFavorites) {
        addFavoritesToServer();
        dispatch(addFavorites(item));
        dispatch(counterIncrement());
      }
    } else if (!isUserLoggedIn) {
      // !
      // do nothing
    }
  };

  return (
    <li className={styles.cardItemWrapper}>
      <div className={styles.cardContainer}>
        <div className={styles.cardItemIconsWrapper}>
          {category === "Благодійний лот" ? (
            <div className={styles.decorLot}>ЛОТ</div>
          ) : category === "Донат" ? (
            <div className={styles.decorDonat}>ДОНАТ</div>
          ) : (<div className={styles.decorGoods}>10% на ЗСУ</div>)}

          <Icons
            imageURL={imageURL}
            itemNo={itemNo}
            name={shortName}
            price={currentPrice}
            id={_id}
            category={category}
            handleAddFavorites={handleAddFavorites}
            handleAddToCart={handleAddToCart}
            loggedIn={isUserLoggedIn}
          />
        </div>
      
        <div className={styles.cardItemImageWrapper}>
          <Link to={`/product/${itemNo}`}>
            <img src={imageURL} className={styles.cardItemImage} alt="My img" />
          </Link>
        </div>
        <Link to={`/product/${itemNo}`} className={styles.cardLink}>
          <div className={styles.cardItemTextWrapper}>
            <h3 className={styles.cardItemHeadline}>{shortName}</h3>
            {currentPrice ? (
              <p className={styles.cardItemPrice}>
                {currentPrice}
                {" "}
                грн
              </p>
            ) : goal && category === "Благодійний лот" ? (
              <p className={styles.cardItemGoalLot}>
                Ставка:
                {" "}
                {currentValue}
                {" "}
                грн
              </p>
            ) : goal && category === "Донат" ? (
              <p className={styles.cardItemGoalDonat}>
                Ціль:
                {" "}
                {goal}
                {" "}
                грн
              </p>
            ) : null}
          </div>
        </Link>

        <div className={styles.buttonWrapper}>
          {category === "Благодійний лот" ? (
            <Button text="Підняти ставку" width="80%" />
          ) : category === "Донат" ? (
            <Button text="Зробити донат" width="80%" />
          ) : <Button text="Купити" width="80%" />}
        </div>
      </div>
    </li>
  );
}

// Card.propTypes = {
//   itemNo: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   price: PropTypes.oneOfType([
//     PropTypes.string.isRequired,
//     PropTypes.number.isRequired,
//   ]),
//   nameCloudinary: PropTypes.string.isRequired,
// };
