import Card from "../components/Card";
import DetailsCard from "../components/DetailsCard";
import HeadData from "../components/HeadData";
import SideMenu from "../components/SideMenu";
import { useEffect, useState } from "react";

function DashboardPage() {

    const [captors, setCaptors] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const captorsResponse = await fetch(
                    "http://45.155.171.156:5000/sensors/lastsensors"
                );
                const captorsResponseData = await captorsResponse.json();
                setCaptors(captorsResponseData); // Get the last 10 items

                const lastReadingDate =
                    captorsResponseData[captorsResponseData.length - 1]?.readingDate;
                setLastUpdate(lastReadingDate);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Fetch data initially

        const interval = setInterval(fetchData, 5 * 60 * 1000); // Fetch data every 5 minutes

        return () => {
            clearInterval(interval); // Clear the interval when the component unmounts
        };
    }, []);

    return (
        <div className="flex h-full w-full flex-col">
            <SideMenu />

            {captors && <HeadData lastUpdate={lastUpdate} sensorsCount={captors.length} />}

            <div className="flex w-full h-full p-20 flex-wrap space-x-8 items-center justify-center">
                <DetailsCard/>

                <div className="flex flex-wrap w-full justify-center items-center">
                    {captors?.map((item) => (
                        <Card
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
            
        </div>

        
    );
}

export default DashboardPage;
