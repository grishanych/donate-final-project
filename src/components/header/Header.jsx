// /* eslint-disable react/button-has-type */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useMediaQuery } from "@mui/material";
import { updateInputValue } from "../../redux/actionsCreators/inputValueActionsCreators";
import Cart from "./icons/cart/IconCart";
import IconEnter from "./icons/enter/IconEnter";
import IconOut from "./icons/enter/IconOut";
import logo from "../footer/icons/logo.png";
import { logOut } from "../../redux/actions/loggedInActions";
import Button from "../button/Button";
import Navigation from "./Navigation";
import { resetCart, resetFavorites } from "../../redux/actions/cartActions";
// import { IconSearchMobile } from "./icons/search/IconSearch";
import HeartFavorite from "./icons/favorites/Heart";
import BurgerMenu from "./BurgerMenu";
import { REGISTRATION_URL } from "../../endpoints/endpoints";
import styles from "./Header.module.scss";

function Header() {
  const cartCount = useSelector((state) => state.cart.itemCount);
  const favoriteCount = useSelector((state) => state.favorites.itemCount);
  const isLoggedInFromRedux = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  // const isMobileScreen = useMediaQuery("(max-width: 767px)");

  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const inputValueFromRedux = useSelector((state) => state.inputValue.inputValue);
  const [inputValue, setInputValue] = useState(inputValueFromRedux);
  const searchResultsRef = useRef(null);
  const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  const getProductDetails = async (productId) => {
    try {
      await axios.get(`http://localhost:4000/api/products/${productId}`);
      // const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
      // setSelectedProduct(response.data);
    } catch (error) {
      console.error("Помилка при отриманні деталей товару:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResultsRef, searchResults]);

  const toggleBar = () => {
    setShowBurgerMenu(!showBurgerMenu);
    if (showInput) {
      setShowInput(false);
    }
  };

  const updateFavoritesToServer = async (newFavorites) => {
    try {
      const response = await axios.put(REGISTRATION_URL, { favorites: newFavorites });
      return response.data.favorites;
    } catch (error) {
      console.error("Помилка при оновленні улюблених товарів:", error);
      return null;
    }
  };

  const doLogOut = async () => {
    try {
      const currentFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
      if (currentFavorites.length > 0) {
        await updateFavoritesToServer(currentFavorites);
      }

      localStorage.removeItem("userLogin");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("CountCartProducts");
      localStorage.removeItem("CountFavoritesProducts");
      localStorage.removeItem("Cart");
      localStorage.removeItem("token");
      localStorage.removeItem("Favorites");

      dispatch(resetCart());
      dispatch(resetFavorites());
      dispatch(logOut());
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  };
  // const [categoryName, setCategoryName] = useState('');

  const performSearch = async (query) => {
    // console.log(query);
    try {
      const searchPhrases = {
        query,
      };
  
      // await axios.post("http://localhost:4000/api/products/search", searchPhrases);
      const response = await axios.post("http://localhost:4000/api/products/search", searchPhrases);
      const products = response.data;
  
      
      setSearchResults(products);
  
      if (products.length > 0) {
        // setCategoryName(products[0].category);
      } else {
        // setCategoryName('');
      }
    } catch (error) {
      console.error("Error while searching for products:", error);
      setSearchResults([]);
      // setCategoryName('');
    }
  };

  const handleResultClick = async (result) => {
    setSearchResults([]);
    setShowInput(false);
  
    if (result) {
      await getProductDetails(result.id);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(updateInputValue(value));
    setInputValue(value);

    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }

    if (value === "") {
      setSearchResults([]);
      handleResultClick();
    } else {
      const newTimeoutId = setTimeout(() => {
        performSearch(value);
      }, 1000);
      
      setDebounceTimeoutId(newTimeoutId);
    }
  };


  return (
    <header className={styles.header}>
      <div className={styles.mobileHeader}>
        {/* <Button
          toPage={`/products-search?query=${inputValue}`}
          type="submit"
          className={styles.buttonMobileHeader}
          width="45px"
          color=""
        >
          <IconSearchMobile />
        </Button> */}
        <input
          ref={searchResultsRef}
          className={styles.inputMobileHeader}
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Пошук..."
        />
        {searchResults.length > 0 && inputValue !== "" && (
          <div className={styles.searchResults} ref={searchResultsRef}>
            {searchResults.map((result) => (
              <li className={styles.searchResultItem} key={result.id}>
                <Link to={`/product/${result.itemNo}`} key={result.id} className={styles.searchResultItem}>
                  {result.shortName}
                </Link>
              </li>
            ))}
          </div>
        )}

        {/* {isMobileScreen && <BurgerMenu toggleBar={toggleBar} />} */}
        <BurgerMenu toggleBar={toggleBar} />
      </div>


      <div className={styles.headerLaptop}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>

        {showBurgerMenu && <BurgerMenu />}
        <Navigation />

        <div className={styles.headerLaptopIcons}>
          {isLoggedInFromRedux ? (
            <div className={styles.navRightSideMenu}>
              <Link to="/favorites">
                <HeartFavorite />
              </Link>
              {favoriteCount === 0 ? null : <span>{favoriteCount}</span>}
            </div>
          ) : null}
          <div className={styles.navRightSideMenu}>
            <Link to="/cart">
              <Cart />
            </Link>
            {cartCount === 0 ? null : <span>{cartCount}</span>}
          </div>
        </div>

        <Button toPage={isLoggedInFromRedux ? "/" : "/log-in"} width="40px" padding="10px" onClick={isLoggedInFromRedux ? doLogOut : null}>
          {isLoggedInFromRedux ? <IconOut /> : <IconEnter /> }
        </Button>
      </div>
    </header>
  );
}

export default Header;
