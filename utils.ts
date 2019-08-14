import axios from "axios";

const waldo = axios.create({
  baseURL: "https://core-graphql.dev.waldo.photos/pizza"
});

export function setDefaultToppings(pizzaConfig) {
  return pizzaConfig.toppings.reduce(
    (agg, toppingConfig) => ({
      ...agg,
      [toppingConfig.topping.name]: toppingConfig.defaultSelected
    }),
    {}
  );
}

export function calculatePizzaPrice(pizzaForm) {
  if (pizzaForm.details) {
    const sum =
      pizzaForm.details.basePrice +
      pizzaForm.details.toppings.reduce(
        (agg, { topping: { price, name } }) =>
          pizzaForm.toppingsSelected[name] ? agg + price : agg,
        0
      );

    return parseFloat(sum.toFixed(2));
  }

  return null;
}

interface IPizzaSize {
  name: string;
  basePrice: number;
}

export async function fetchPizzaSizes(
  updateLoadingState: LoadingStateUpdader
): Promise<IPizzaSize> {
  try {
    updateLoadingState(true);
    const { data } = await waldo.post("", {
      query: `
query {
  pizzaSizes {
    name
    basePrice
  }
}
`
    });
    return data.data.pizzaSizes;
  } catch (error) {
    // TODO
  } finally {
    updateLoadingState(false);
  }
}

interface IPizzaDetails {
  name: string;
  basePrice: number;
  maxToppings: number;
  toppings: {
    topping: { name: string; price: number };
    defaultSelected: boolean;
  }[];
}

type LoadingStateUpdader = (state: boolean) => void;

export async function fetchPizzaDetails(
  size: string,
  updateLoadingState: LoadingStateUpdader
): Promise<IPizzaDetails> {
  try {
    updateLoadingState(true);
    const { data } = await waldo.post("", {
      query: `
query {
  pizzaSizeByName(name: ${size.toUpperCase()}) {
    name
    basePrice
    maxToppings
    toppings {
      topping {
        name
        price
      }
      defaultSelected
    }
  }
}
`
    });
    return data.data.pizzaSizeByName;
  } catch (error) {
    // TODO
  } finally {
    updateLoadingState(false);
  }
}
