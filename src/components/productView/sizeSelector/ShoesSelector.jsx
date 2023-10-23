import React from "react";
import styles from "../ProductView.module.scss";

function ShoesSelector() {
  const shoeSizes = [39, 40, 41, 42, 43, 44, 45, 46];

  const handleSizeChange = (event) => {
    // eslint-disable-next-line no-unused-vars
    const selectedSize = event.target.value;
  };

  return (
    <div className={styles.selectContainer}>
      <p className={styles.size}>Розмір:</p>
      <select className={styles.selectedOption} onChange={handleSizeChange}>
        {shoeSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ShoesSelector;
