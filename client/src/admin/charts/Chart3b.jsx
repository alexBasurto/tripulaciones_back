import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";



const Chart3b = () => {
    // 
    const [loading, setLoading] = useState(true);
    const { session } = useSession();
    const [reasonsVotes, setReasonsVotes] = useState([]);

    useEffect(() => {
        apiCharts(session.idCompany, 3).then((result) => {
            console.log(result);
            const counterOrdered = processData(result);
            console.log(counterOrdered);
            setReasonsVotes(counterOrdered);
            setLoading(false);
    }
    )}
    , []);

    const processData = (data) => {
        // Contar los votos de cada motivo
        const reasonsCount = data.reasons.map((feeling) => {
            const count = data.data.filter((vote) => vote.idReason === feeling.idReason).length;
            return {
                ...feeling,
                count,
            };
        });
        console.log(reasonsCount);
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

export default Chart3b;
