import SideMenu from "../components/SideMenu";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

function ShareDataPage() {

    const {numberSensor } = useParams();

    const [sensorDetails, setSensorDetails] = useState(null);
    const [sensorUpdates, setSensorUpdates] = useState(null);
    const [sensorTemperature, setSensorTemperature] = useState(null);
    const [sensorHumidity, setSensorHumidity] = useState(null);

    useEffect(() => {
        
        (async () => {
            try{
                console.log(numberSensor);
                const sensorDetailsResponse = await fetch(`http://45.155.171.156:5000/sensor=${numberSensor}`,);
                const sensorDetailsResponseData = await sensorDetailsResponse.json();

                setSensorDetails(sensorDetailsResponseData);

                const sensorTemperature = sensorDetailsResponseData.map((item) => item.temperatureReading);
                setSensorTemperature(sensorTemperature);

                const sensorUpdates = sensorDetailsResponseData.map((item) => format(new Date(item.readingDate), 'dd MMMM yyyy à HH:mm', {locale: frLocale}));
                setSensorUpdates(sensorUpdates);

                const sensorHumidity = sensorDetailsResponseData.map((item) => item.humidityLevel);
                setSensorHumidity(sensorHumidity);

            } catch (error) {
                console.log(error);
            }

        })();
    }, []);

    const chartConfig = {
        type: "line",
        height: 240,
        series: [
        {
            name: "Température",
            data: sensorTemperature,
        },
        {
            name: "Humidité",
            data: sensorHumidity && sensorHumidity[0] !== 255 ? sensorHumidity : [],
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
            categories: sensorUpdates,
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

            {sensorDetails && (
                <div className="flex w-full h-fit items-center justify-center mt-12 text-center">
                    <h1 className="text-4xl font-black">Partage du capteur <br /><span className="text-5xl">N°{sensorDetails[0].sensorNumber}</span></h1>
                </div>
            )
            }
            
            <div className="flex w-full h-full p-20 flex-wrap space-x-8 items-center justify-center">
                
                { /* Details card */}

                {sensorDetails && (
                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title w-fit">
                                Capteur n°{sensorDetails[0].sensorNumber}
                                <div className="badge bg-green-700 text-white"></div>
                            </h2>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">{sensorDetails[sensorDetails.length - 1].temperatureReading}°C</div>
                                <div className="badge badge-outline">{sensorDetails[sensorDetails.length - 1].batteryLevel}% batterie</div>

                                <div className="badge badge-outline">
                                    {sensorDetails[sensorDetails.length - 1].humidityLevel === 255 ? (
                                        <div>Humidité N/A</div>
                                    ) : (
                                        <div>{sensorDetails[sensorDetails.length - 1].humidityLevel}% d'humidité</div>
                                    )}
                                </div>

                                <div className="badge badge-outline">
                                    {sensorDetails[sensorDetails.length - 1].sensorStatus ? (
                                        <div>Connecté</div>
                                    ) : (
                                        <div>Déconnecté</div>
                                    )}
                                </div>
                            </div>

                            {sensorUpdates && sensorTemperature && sensorHumidity ? <Chart {...chartConfig} /> : <div>Loading...</div>}
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
                                            {sensorDetails.map((detail, index) => (
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
