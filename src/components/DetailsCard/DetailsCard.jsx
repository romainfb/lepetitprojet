import Chart from "react-apexcharts";
import {APIProvider, Map, Marker, useMarkerRef} from '@vis.gl/react-google-maps'
import DataHistory from "./DataHistory";
import ShareModal from "./ShareModal";

const DetailsCard = ({selectedSensorDatas, selectedSensorDates, selectedSensorTemperatures, selectedSensorHumidities, selectedSensorLibelle}) => {

    const [markerRef, marker] = useMarkerRef();
    const currentURL = window.location.href;

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
        <div className="card w-full bg-base-100 shadow-xl">
                        
        <ShareModal selectedSensorDatas={selectedSensorDatas} currentURL={currentURL} />

        <div className="card-body">
            <h2 className="card-title w-fit">
                {selectedSensorLibelle}
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

            

            <Chart {...chartConfig} />

        </div>

        <div className="flex w-full h-60 rounded-full">
            <APIProvider apiKey={process.env.REACT_APP_SUPERSECRET}>
                <Map zoom={12} center={{lat: 44.8543782, lng: -0.5752278}}>
                    <Marker ref={markerRef} position={{lat: 44.8543782, lng: -0.5752278}} />
                </Map>
            </APIProvider>
        </div>

        <DataHistory selectedSensorDatas={selectedSensorDatas} />
        
    </div>
    );
};

export default DetailsCard;