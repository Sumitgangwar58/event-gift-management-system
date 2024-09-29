import "./App.css";
import UserContextProvider from "./context/userContextProvider";
import RenderRoutes from "./routes/RenderHelper";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <RenderRoutes />
      </div>
    </UserContextProvider>
  );
}

export default App;
