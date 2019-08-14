import React, { memo } from "react";

function _ToppingsSelection({ loading, details, toppingsSelected, onSelect }) {
  if (loading) {
    return <div className="ui active centered inline loader"></div>;
  }

  if (!details) {
    return (
      <div className="center-text" style={{ height: 50 }}>
        Please select a pizza size first to pick toppings
      </div>
    );
  }

  const { name, maxToppings } = details;
  const selecteToppingsCount = Object.values(toppingsSelected).filter(Boolean)
    .length;
  const hasUnlimitedToppings = maxToppings === null;

  return (
    <>
      <div className="center-text">
        <b>
          For your <b>{name}</b> pizza you can select{" "}
          {details.maxToppings
            ? `up to ${maxToppings} toppings:`
            : "unlimited toppings:"}
        </b>
      </div>

      <div className="ui form">
        {details.toppings.map(toppingConfig => {
          const {
            topping: { name, price }
          } = toppingConfig;
          const domId = `topping-${name}`;
          const selected = toppingsSelected[name] || false;
          return (
            <div className="field" key={domId}>
              <div className="ui checkbox">
                <input
                  disabled={
                    selected
                      ? false
                      : hasUnlimitedToppings
                      ? false
                      : // disable in case we reached max toppings
                        selecteToppingsCount === maxToppings
                  }
                  id={domId}
                  type="checkbox"
                  value={name}
                  onChange={({ target: { value, checked } }) =>
                    onSelect(value, checked)
                  }
                  checked={selected}
                />
                <label htmlFor={domId}>
                  {name} ({price}$)
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export const ToppingsSelection = memo(_ToppingsSelection);
