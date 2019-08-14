import React, { memo } from "react";
import { capitalize, sumBy } from "lodash";
import { TotalValue } from "./total-value";

function _Cart({ items, removeItem }) {
  const sum = sumBy(items, "price");
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <i className="big cart icon"></i>
      </div>

      {items.length ? (
        <>
          <ul className="ui middle relaxed aligned divided list">
            {items.map(pizza => {
              return (
                <div key={pizza.id} className="list-item item">
                  <div>
                    {capitalize(pizza.name)} pizza with{" "}
                    {
                      Object.values(pizza.toppingsSelected).filter(Boolean)
                        .length
                    }{" "}
                    toppings ({pizza.price}$):
                    <br />
                    <i>
                      {Object.entries(pizza.toppingsSelected)
                        .filter(([key, value]) => value)
                        .map(([key]) => key)
                        .join(", ")}
                    </i>
                  </div>
                  <button
                    className="ui icon small button"
                    title="Delete"
                    onClick={() => removeItem(pizza.id)}
                  >
                    <i className="delete icon"></i>
                  </button>
                </div>
              );
            })}
          </ul>
          <TotalValue sum={sum} />
        </>
      ) : (
        <div className="center-text">Cart Empty</div>
      )}
    </>
  );
}

export const Cart = memo(_Cart);
