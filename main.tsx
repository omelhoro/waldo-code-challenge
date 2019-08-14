import "babel-polyfill";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Dropdown } from "semantic-ui-react";
import { capitalize } from "lodash";
import {
  calculatePizzaPrice,
  fetchPizzaDetails,
  fetchPizzaSizes,
  setDefaultToppings
} from "./utils";
import { Cart } from "./components/cart";
import { ToppingsSelection } from "./components/toppings-selection";
import { AddToCart } from "./components/add-to-cart";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [loadingState, setLoadingState] = useState({});
  const [pizzaForm, setPizzaForm] = useState({});
  const [cart, setCart] = useState([]);

  // Fetch available pizza sizes on mount
  useEffect(() => {
    fetchPizzaSizes(state =>
      setLoadingState({ ...loadingState, pizzaSizes: state })
    ).then(setPizzas);
  }, []);

  // Refetch pizza details on every change for getting the most up to date prices/details
  useEffect(() => {
    if (pizzaForm.name) {
      fetchPizzaDetails(pizzaForm.name, state =>
        setLoadingState({ ...loadingState, pizzaDetails: state })
      ).then(details =>
        setPizzaForm({
          ...pizzaForm,
          details,
          toppingsSelected: setDefaultToppings(details)
        })
      );
    }
  }, [pizzaForm.name]);

  const pizzaPrice = calculatePizzaPrice(pizzaForm);

  return (
    <div>
      <h1>Waldo Code Challenge</h1>

      <Dropdown
        placeholder="Select Pizza Size"
        fluid
        selection
        loading={loadingState.pizzaSizes}
        onChange={(event, { value }) => {
          setPizzaForm({
            name: value
          });
        }}
        options={pizzas.map(({ name, basePrice }) => ({
          key: name,
          text: `${capitalize(name)} pizza (Base price ${basePrice}$)`,
          value: name
        }))}
      />

      <br />

      <ToppingsSelection
        details={pizzaForm.details}
        loading={loadingState.pizzaDetails}
        toppingsSelected={pizzaForm.toppingsSelected}
        onSelect={(name: string, checked: boolean) =>
          setPizzaForm({
            ...pizzaForm,
            toppingsSelected: {
              ...pizzaForm.toppingsSelected,
              [name]: checked
            }
          })
        }
      />

      <AddToCart
        price={pizzaPrice}
        disabled={!pizzaForm.details}
        onClick={() =>
          setCart([
            ...cart,
            { ...pizzaForm, id: Math.random().toString(), price: pizzaPrice }
          ])
        }
      />

      <br />

      <Cart
        items={cart}
        removeItem={(id: string) =>
          setCart(cart.filter(pizza => id !== pizza.id))
        }
      />
    </div>
  );
}

render(<App />, document.querySelector("#app"));
