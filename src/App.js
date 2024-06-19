import "./App.css";
import Weather from "./components/Weather";
import cloudbg from "./assests/cloudbg.jpg";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${cloudbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <Weather></Weather>
    </div>
  );
}

export default App;
