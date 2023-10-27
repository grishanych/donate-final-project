import DocumentTitle from "../DocumentTitle";


function Returns() {
  return (
    <>
      <DocumentTitle title="Обмін та повернення" />
      <h1 style={{ fontSize: "22px", margin: "10px 0" }}>Обмін та повернення</h1>
      <div>
        <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#666" }}>
          {`У нашому магазині Ви можете повернути або обміняти товар протягом 14 днів з моменту покупки.
            Це право гарантує вам Закон про захист прав споживача. Повернення чи обмін товару провадиться шляхом повернення нам придбаного товару з наступним відшкодуванням коштів покупцю.`}
          <br />
          Перед тим як повертати товар, будь ласка, переконайтеся, що:
          <br />
          <br />
          1) Товар, не був у вжитку і не має слідів використання:
          подряпин, сколів, потертостей, не зазнавав змін і т.д.
          <br />
          2) Товар повністю укомплектований та не порушена цілісність упаковки.
          <br />
          3) Збережено всі ярлики та заводське маркування.
          <br />
          <br />
          Якщо вищезгадане має місце, ми повернемо Вам кошти за товар або обміняємо на інший.
          <br />
          <br />
          <br />
          Одяг, який не підлягає поверненню чи обміну,
          відповідно до ЗУ «Про захист прав споживачів»:
          <br />
          <br />

          1) рукавички
          <br />
          2) натільна білизна - термобілизна, футболки
          <br />
          3) шкарпетки
          <br />
          4) шапки
          <br />
          5) товари вживані або складського зберігання
          <br />
          <br />

          Якщо повернення посилки відбулося з вини магазину, а саме:
          <br />
          1) товар не відповідає опису на сайті магазину
          <br />
          2) код отриманого товару не відповідає коду замовленого товару
          <br />
          3) бракований товар
          <br />
          <br />
          Ми компенсуємо вартість пересилки.
        </p>
        <br />
        <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#666" }}>
          {`Якщо повернення здійснюється покупцем не з вини магазину,
            повернення здійснюється за рахунок покупця згідно з тарифами Нової Пошти.`}
        </p>
      </div>
    </>
  );
}

export default Returns;