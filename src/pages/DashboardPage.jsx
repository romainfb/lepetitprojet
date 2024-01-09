import { useEffect, useState } from "react";

import Card from "../components/Card";
import HeadData from "../components/HeadData";
import SideMenu from "../components/SideMenu";

import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import DetailsCard from "../components/DetailsCard/DetailsCard";

function DashboardPage() {

    const [sensors, setSensors] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    /* Selected sensor datas */

    const [selectedSensorNumber, setSensorSelected] = useState(null);
    const [selectedSensorDatas, setSelectedSensorDatas] = useState(null);
    const [selectedSensorDates, setSelectedSensorDates] = useState(null);
    const [selectedSensorTemperatures, setSelectedSensorTemperatures] = useState(null);
    const [selectedSensorHumidities, setSelectedSensorHumidities] = useState(null);

    const [selectedSensorLibelle, setSelectedSensorLibelle] = useState(null);

    /* useEffect for selected sensor libelle */

    useEffect(() => {

        if(selectedSensorNumber === null) return;

        const fetchSensorLibelle = async () => {
          try {
            const response = await fetch(`http://45.155.171.156:5000/get_libelle=${selectedSensorNumber}`);
            if (response.ok) {
              const data = await response.json();

              if(data.sensorLibelle){
                setSelectedSensorLibelle(data.sensorLibelle);
              }else{
                setSelectedSensorLibelle(`Détecteur ${selectedSensorNumber}`);
              }
            } else {
              console.error('Failed to fetch sensor libellé');
            }
          } catch (error) {
            console.error('An error occurred while fetching sensor libellé', error);
          }
        };
    
        // Call the function to fetch sensor libellé
        fetchSensorLibelle();
    
        // Dependency array is empty to run the effect only once when the component mounts
      }, [selectedSensorNumber]);


    /* useEffect for selected sensor datas */

    useEffect(() => {
        
        (async () => {

            if(selectedSensorNumber === null) return;
            
            try{
                const selectedSensorDatasResponse = await fetch(`http://45.155.171.156:5000/sensor=${selectedSensorNumber}`,);
                const selectedSensorDatasResponseData = await selectedSensorDatasResponse.json();

                const lastTenDatas = selectedSensorDatasResponseData.slice(-15);

                setSelectedSensorDatas(lastTenDatas);

                const selectedSensorTemperatures = lastTenDatas.map((item) => item.temperatureReading);
                setSelectedSensorTemperatures(selectedSensorTemperatures);

                const selectedSensorDates = lastTenDatas.map((item) => format(new Date(item.readingDate), 'dd MMMM yyyy à HH:mm', {locale: frLocale}));
                setSelectedSensorDates(selectedSensorDates);

                const selectedSensorHumidities = lastTenDatas.map((item) => item.humidityLevel);
                setSelectedSensorHumidities(selectedSensorHumidities);

            } catch (error) {
                console.log(error);
            }

        })();

    }, [selectedSensorNumber]);

    /* useEffect for all sensors datas */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sensorsResponse = await fetch(
                    "http://45.155.171.156:5000/sensors/lastsensors"
                );
                const sensorsResponseData = await sensorsResponse.json();
                setSensors(sensorsResponseData);

                const lastReadingDate = sensorsResponseData[sensorsResponseData.length - 1]?.readingDate;
                setLastUpdate(lastReadingDate);


            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Fetch data initially

        const interval = setInterval(fetchData, 20 * 1000);

        return () => {
            clearInterval(interval); // Clear the interval when the component unmounts
        };

    }, []);

    

    return (
        <div className="flex h-full w-full flex-col">

            <SideMenu />

            {sensors && <HeadData lastUpdate={lastUpdate} sensorsCount={sensors.length} />}

            <div className="flex w-full h-full p-20 flex-wrap space-x-8 items-center justify-center">
                
                { /* Details card */}

                {selectedSensorDatas && selectedSensorDates && selectedSensorTemperatures && selectedSensorHumidities && selectedSensorLibelle &&(
                    <DetailsCard selectedSensorDatas={selectedSensorDatas} selectedSensorDates={selectedSensorDates} selectedSensorTemperatures={selectedSensorTemperatures} selectedSensorHumidities={selectedSensorHumidities} selectedSensorLibelle={selectedSensorLibelle}/>
                )}

                { /* Sensors cards */}

                <div className="flex flex-wrap w-full justify-center items-center">
                    {sensors?.map((item) => (
                        <Card
                            setSensorSelected = {setSensorSelected}
                            setSelectedSensorLibelle={setSelectedSensorLibelle}
                            key={item.id}
                            sensorID={item.sensorID}
                            receiverNumber={item.receiverNumber}
                            sensorNumber={item.sensorNumber}
                            sensorStatus={item.sensorStatus}
                            temperatureReading={item.temperatureReading}
                            humidityLevel={item.humidityLevel}
                            batteryLevel={item.batteryLevel}
                            signalStrength={item.signalStrength}
                            readingDate={item.readingDate}
                        />
                    ))}
                </div>
            </div>

            <button className="my-12 py-6 px-4">Bouton mail</button>
            
        </div>
        
    );
}

export default DashboardPage;
