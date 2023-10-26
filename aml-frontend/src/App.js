import "./App.css";
import Overview from "./pages/Overview";
import Navbar from "./components/Navbar";
import KYC from "./pages/KYC";
import TransactionMonitoring from "./pages/TransactionMonitoring";
import Documentation from "./pages/Documentation";
function App() {
  return (
    <div>
      <Navbar />
      <Documentation/>
      {/* <Overview /> */}
      {/* <KYC /> */}
      {/* <TransactionMonitoring /> */}
      {/* <div className='footer'></div> */}

    </div>
  );
}

export default App;
