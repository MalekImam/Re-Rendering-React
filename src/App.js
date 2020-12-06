import React from "react"
import { Grid } from "@material-ui/core"

const OrderStateContext = React.createContext()
const OrderDispatchContext = React.createContext()

const OrderProvider = ({ children }) => {
  const initialState = {
    selectedItem: "",
    products: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  }
  const orderReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_PRODUCTS":
        return { ...state, products: action.data }
      case "UPDATE_CATEGORIES":
        return { ...state, categories: action.data }
      case "UPDATE_SELECTEDITEM":
        return { ...state, selectedItem: action.data }
      default:
        break
    }
  }
  const [state, dispatch] = React.useReducer(orderReducer, initialState)
  return (
    <OrderStateContext.Provider value={state}>
      <OrderDispatchContext.Provider value={dispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderStateContext.Provider>
  )
}

const useOrderState = () => {
  const context = React.useContext(OrderStateContext)
  if (context === undefined)
    throw new Error("useOrderState must be used within an OrderProvider")
  return context
}

const useOrderDispatch = () => {
  const dispatch = React.useContext(OrderDispatchContext)
  if (dispatch === undefined)
    throw new Error("useOrderDispatch must be used within an OrderProvider")
  const updateSelectedItem = (item) =>
    dispatch({ type: "UPDATE_SELECTEDITEM", data: item })
  return updateSelectedItem
}

function App() {
  console.log("********************* Redner ---- /t APP *********************")
  return (
    <OrderProvider>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <OrderLayout />
        </Grid>
        <Grid item xs={6}>
          <OrderInfo />
        </Grid>
      </Grid>
    </OrderProvider>
  )
}

const Categories = React.memo(({ categories }) => {
  console.log("Redner ---- /t Categories")
  // const categories = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  return (
    <>
      {categories.map((category) => (
        <div key={category} style={{ marginLeft: 100 }}>
          {category}
        </div>
      ))}
      <br />
      <br />
    </>
  )
})

const ProductCard = ({ p }) => {
  console.log("Render ---- /t Product Card")
  const updateSelectedItem = useOrderDispatch()
  return (
    <div
      onClick={() => {
        updateSelectedItem(p)
      }}
    >
      {p}
    </div>
  )
}

const Products = React.memo(({ products }) => {
  console.log("Redner ---- /t Products")
  // const products = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  return (
    <>
      {products.map((product) => (
        <div key={product} style={{ marginLeft: 100, marginBottom: 20 }}>
          <ProductCard p={product} />
        </div>
      ))}
    </>
  )
})

const OrderLayout = React.memo(() => {
  console.log("Redner ---- /t Order Layout")
  const { products } = useOrderState()
  const { categories } = useOrderState()
  return (
    <>
      <Categories categories={categories} />
      <Products products={products} />
    </>
  )
})

const OrderInfo = () => {
  console.log("Render ---- /t Order Info_____________________")
  const { selectedItem } = useOrderState()
  return <div>{`${selectedItem}.`}</div>
}

export default App
