import './App.css';
import DashboardPage from './pages/DashboardPage';
import {APIProvider} from "@vis.gl/react-google-maps";

function App() {
  return (
    <APIProvider apiKey={"AIzaSyDCD_o6x0XdEC_AYLx3b1ICfI8lWAYtIN0"}>
      <DashboardPage />

    </APIProvider>
  );
}

export default App;
