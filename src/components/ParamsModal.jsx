import React, { useState, useEffect } from 'react';

const ParamsModal = () => {

    const [params, setParams] = useState(null);

    const [alertToggled, setAlertToggled] = useState(params?.alertToggled);
    const [receiverMail, setReceiverMail] = useState(params?.receiverMail);
    const [temperatureThreshold, setTemperatureThreshold] = useState(params?.temperatureThreshold);
    const [humidityThreshold, setHumidityThreshold] = useState(params?.humidityThreshold);

    console.log(alertToggled, receiverMail, temperatureThreshold, humidityThreshold);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://45.155.171.156:5000/get_params');
                const data = await response.json();

                setAlertToggled(data.alertToggled);
                setReceiverMail(data.receiverMail);
                setTemperatureThreshold(data.temperatureThreshold);
                setHumidityThreshold(data.humidityThreshold);

                setParams(data);
            } catch (error) {
                console.error('Error fetching params:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {

        const data = {
            alertToggled,
            receiverMail,
            temperatureThreshold,
            humidityThreshold,
            thresholdTemperature: temperatureThreshold,
            dateUpdatedParams: new Date().toISOString()
        };

        try {
            const response = await fetch('http://45.155.171.156:5000/set_params', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Params updated successfully');
            } else {
                console.error('Failed to update params');
            }
        } catch (error) {
            console.error('Error updating params:', error);
        }
    };

    return (
        <>
        <div className="flex w-1/2 justify-end">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-20 " onClick={() => document.getElementById('param_modal').showModal()}>
                <span className='text-3xl font-normal'>&#9872;</span>
            </button>
        </div>
            

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="param_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-6">Paramétrez les alertes</h3>

                    <form method="dialog" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Alertes par mail</span>
                                <input type="checkbox" className="toggle" checked={alertToggled} onChange={(e) => setAlertToggled(e.target.checked)} />
                            </label>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label className="label text-sm">Adresse de réception</label>
                            <input type="text" placeholder="Adresse mail des alertes" className="input w-full max-w-xs" value={receiverMail} onChange={(e) => setReceiverMail(e.target.value)} />
                        </div>

                        <label className="label text-sm">Seuil d'alerte température</label>
                        <input type="range" min={0} max="100" className="range" step="10" value={temperatureThreshold} onChange={(e) => setTemperatureThreshold(e.target.value)} />
                        <div className="w-full flex justify-between text-xs px-2 mb-4">
                            <span>-20°C</span>
                            <span>-15°C</span>
                            <span>-10°C</span>
                            <span>-5°C</span>
                            <span>0°C</span>
                            <span>5°C</span>
                            <span>10°C</span>
                            <span>15°C</span>
                            <span>20°C</span>
                            <span>25°C</span>
                        </div>

                        <label className="label text-sm">Seuil d'alerte d'humidité</label>
                        <input type="range" min={0} max="100" className="range" step="10" value={humidityThreshold} onChange={(e) => setHumidityThreshold(e.target.value)} />
                        <div className="w-full flex justify-between text-xs px-2">
                            <span>0</span>
                            <span>10</span>
                            <span>20</span>
                            <span>30</span>
                            <span>40</span>
                            <span>50</span>
                            <span>60</span>
                            <span>70</span>
                            <span>80</span>
                            <span>90</span>
                            <span>100</span>
                        </div>

                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn mr-2">Enregistrer</button>
                            <button className="btn">Annuler</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default ParamsModal;
