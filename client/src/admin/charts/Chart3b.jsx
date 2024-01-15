import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";



const Chart3b = () => {
    const [loading, setLoading] = useState(true);
    const { session } = useSession();
    const [reasonsVotes, setReasonsVotes] = useState([]);
    const [numberOfVotes, setNumberOfVotes] = useState(0);

    useEffect(() => {
        apiCharts(session.idCompany, 3).then((result) => {
            const counterOrdered = processData(result);
            setReasonsVotes(counterOrdered);
            setLoading(false);
    }
    )}
    , []);

    const processData = (data) => {
        setNumberOfVotes(data.data.length);
        // Contar los votos de cada motivo
        const reasonsCount = data.reasons.map((feeling) => {
            const count = data.data.filter((vote) => vote.idReason === feeling.idReason).length;
            return {
                ...feeling,
                count,
            };
        });
        // Ordenar feeligsCount de mayor a menor
        const reasonsCountSorted = reasonsCount.sort((a, b) => b.count - a.count);
        
        // Devolver los 5 motivos más frecuentes
        reasonsCountSorted.splice(5, reasonsCountSorted.length - 5);

        return {
            reasons: reasonsCountSorted.map((feeling) => feeling.name),
            votes: reasonsCountSorted.map((feeling) => feeling.count),
        };
       
    };
    
    class Chart extends React.Component {
        render() {
            return (
                <Plot

                    data = {[
                        {
                            labels: reasonsVotes.reasons,
                            values: reasonsVotes.votes,
                            name: 'Valoración del día',
                            type: 'pie',
                            hole: 0.4,
                            marker: {
                                colors: ['#3834D0', '#6ECFBC', '#FF80A9', '#FFC466', '#FF7453']
                            }
                            
                        }
                    ]}
                    layout={{
                        width: 720,
                        height: 440,
                        title: 'Conteo de los 5 motivos más frecuentes',
                        annotations: [
                            {
                                text: `Votos totales: ${numberOfVotes}`,
                                showarrow: false,
                                arrowhead: 7,
                                x: 1,
                                y: 1,
                                xref: "paper",
                                yref: "paper",
                                xanchor: "right",
                                yanchor: "top",
                            },
                        ],
                    }}
                />
            );
        }
    }

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
                ) : (
                    <div className="chart-container">
                    <h1>Conteo de motivos</h1>
                    <Chart />
                </div>
            )}
        </div>
    );
};

export default Chart3b;
