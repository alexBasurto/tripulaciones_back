import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";

const Chart2b = () => {
    //
    const [loading, setLoading] = useState(true);
    const { session } = useSession();
    const [reasonsVotes, setReasonsVotes] = useState([]);

    useEffect(() => {
        apiCharts(session.idCompany, 3).then((result) => {
            console.log("LA API ME DEVUELVE ESTO", result);
            const counterOrdered = processData(result);
            console.log(counterOrdered);
            setReasonsVotes(counterOrdered);
            setLoading(false);
        });
    }, []);

    const processData = (data) => {
        // Contar los votos de cada motivo
        const reasonsCount = data.reasons.map((reason) => {
            const count = data.data.filter(
                (vote) => vote.idReason === reason.idReason
            ).length;
            return {
                ...reason,
                count,
            };
        });
        console.log(reasonsCount);
        // Ordenar reasonsCount de mayor a menor
        const reasonsCountSorted = reasonsCount.sort(
            (a, b) => b.count - a.count
        );
        console.log(reasonsCountSorted);

        // // Obtener los 5 motivos más frecuentes
        // reasonsCountSorted.splice(5);

        return {
            reasons: reasonsCountSorted.map((reason) => reason.name),
            votes: reasonsCountSorted.map((reason) => reason.count),
        };
    };

    class Chart extends React.Component {
        render() {
            return (
                <Plot
                    data={[
                        {
                            x: reasonsVotes.reasons,
                            y: reasonsVotes.votes,
                            name: "Valoración del día",
                            type: "bar",
                            marker: {
                                color: [
                                    "#3834D0",
                                    "#6ECFBC",
                                    "#FF80A9",
                                    "#FFC466",
                                    "#FF7453",
                                    "#3834D0",
                                    "#6ECFBC",
                                    "#FF80A9",
                                    "#FFC466",
                                    "#FF7453",
                                    "#3834D0",
                                    "#6ECFBC",
                                    "#FF80A9",
                                    "#FFC466",
                                    "#FF7453",
                                ],
                            },
                        },
                    ]}
                    layout={{
                        width: 720,
                        height: 440,
                        title: "Conteo de los 5 motivos más frecuentes",
                        xaxis: {
                            title: "Motivos",
                        },
                        yaxis: {
                            title: "Conteo",
                        },
                    }}
                />
            );
        }
    }

    return (
        <div>
            <h1>Conteo de motivos</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Chart />
                </div>
            )}
        </div>
    );
};

export default Chart2b;
