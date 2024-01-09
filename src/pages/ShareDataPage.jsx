import SideMenu from "../components/SideMenu";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

function ShareDataPage() {

    const {numberSensor } = useParams();

    const [selectedSensorDatas, setSelectedSensorDatas] = useState(null);
    const [selectedSensorDates, setSensorUpdates] = useState(null);
    const [selectedSensorTemperatures, setSensorTemperature] = useState(null);
    const [selectedSensorHumidities, setSensorHumidity] = useState(null);

    useEffect(() => {
        
        (async () => {
            try{
                const selectedSensorDatasResponse = await fetch(`http://45.155.171.156:5000/sensor=${numberSensor}`,);
                const selectedSensorDatasResponseData = await selectedSensorDatasResponse.json();

                setSelectedSensorDatas(selectedSensorDatasResponseData);

                const selectedSensorTemperatures = selectedSensorDatasResponseData.map((item) => item.temperatureReading);
                setSensorTemperature(selectedSensorTemperatures);

                const selectedSensorDates = selectedSensorDatasResponseData.map((item) => format(new Date(item.readingDate), 'dd MMMM yyyy à HH:mm', {locale: frLocale}));
                setSensorUpdates(selectedSensorDates);

                const selectedSensorHumidities = selectedSensorDatasResponseData.map((item) => item.humidityLevel);
                setSensorHumidity(selectedSensorHumidities);

            } catch (error) {
                console.log(error);
            }

        })();
    }, [numberSensor]);

    const chartConfig = {
        type: "line",
        height: 240,
        series: [
        {
            name: "Température",
            data: selectedSensorTemperatures,
        },
        {
            name: "Humidité",
            data: selectedSensorHumidities && selectedSensorHumidities[0] !== 255 ? selectedSensorHumidities : [],
        },
        ],
        options: {
        chart: {
            toolbar: {
            show: false,
            },
        },
        title: {
            show: "",
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#e5e7eb"],
        stroke: {
            lineCap: "round",
            curve: "smooth",
        },
        markers: {
            size: 0,
        },
        xaxis: {
            axisTicks: {
            show: false,
            },
            axisBorder: {
            show: false,
            },
            labels: {
            style: {
                colors: "#e5e7eb",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
            },
            },
            categories: selectedSensorDates,
        },
        yaxis: {
            labels: {
            style: {
                colors: "#e5e7eb",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
            },
            },
        },
        grid: {
            show: false,
            borderColor: "#e5e7eb",
            strokeDashArray: 5,
            xaxis: {
            lines: {
                show: true,
            },
            },
            padding: {
            top: 5,
            right: 20,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
        },
    };


    return (
        <div className="flex h-full w-full flex-col">

            <SideMenu />

            {selectedSensorDatas && (
                <div className="flex w-full h-fit items-center justify-center mt-12 text-center">
                    <h1 className="text-4xl font-black">Partage du capteur <br /><span className="text-5xl">N°{selectedSensorDatas[0].sensorNumber}</span></h1>
                </div>
            )
            }
            
            <div className="flex w-full h-full p-20 flex-wrap space-x-8 items-center justify-center">
                
                { /* Details card */}

                {selectedSensorDatas && (
                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title w-fit">
                                Capteur n°{selectedSensorDatas[0].sensorNumber}
                                <div className="badge bg-green-700 text-white"></div>
                            </h2>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">{selectedSensorDatas[selectedSensorDatas.length - 1].temperatureReading}°C</div>
                                <div className="badge badge-outline">{selectedSensorDatas[selectedSensorDatas.length - 1].batteryLevel}% batterie</div>

                                <div className="badge badge-outline">
                                    {selectedSensorDatas[selectedSensorDatas.length - 1].humidityLevel === 255 ? (
                                        <div>Humidité N/A</div>
                                    ) : (
                                        <div>{selectedSensorDatas[selectedSensorDatas.length - 1].humidityLevel}% d'humidité</div>
                                    )}
                                </div>

                                <div className="badge badge-outline">
                                    {selectedSensorDatas[selectedSensorDatas.length - 1].sensorStatus ? (
                                        <div>Connecté</div>
                                    ) : (
                                        <div>Déconnecté</div>
                                    )}
                                </div>
                            </div>

                            {selectedSensorDates && selectedSensorTemperatures && selectedSensorHumidities ? <Chart {...chartConfig} /> : <div>Loading...</div>}
                        </div>

                        <div className="collapse bg-base-200 rounded-t-none">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">Historique des données</div>
                            <div className="collapse-content">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Température</th>
                                                <th>Humidité</th>
                                                <th>Batterie</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedSensorDatas.map((detail, index) => (
                                                <tr key={index} className={index % 2 === 0 ? "bg-base-200" : ""}>
                                                    <th>{detail.readingDate}</th>
                                                    <td>{detail.temperatureReading}°C</td>
                                                    <td>{detail.humidityLevel === 255 ? "Non communiquée" : `${detail.humidityLevel}%`}</td>
                                                    <td>{detail.batteryLevel}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                
            </div>
            
        </div>

        
    );
}

export default ShareDataPage;
