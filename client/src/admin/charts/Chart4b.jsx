import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";

const Chart4b = () => {
    const [loading, setLoading] = useState(true);
    const { session } = useSession();
    const [dataProcessed, setDataProcessed] = useState([]);
    const [numberOfComments, setNumberOfComments] = useState(0);

    useEffect(() => {
        apiCharts(session.idCompany, 4).then((result) => {
            const data = processData(result);
            setDataProcessed(data);
            setLoading(false);
        });
    }
    , []);

    const processData = (data) => {
        setNumberOfComments(data.data.length);

        let tagCount = {};
        data.data.forEach((comment) => {
            if (tagCount[comment.idTag]) {
                tagCount[comment.idTag] += 1; // Incrementa si el idTag ya existe
            } else {
                tagCount[comment.idTag] = 1; // Inicializa con 1 si es la primera vez que aparece este idTag
            }
        });
        // Reemplazar los nombres de las claves de tagCount por los nombres de los tags que están en data.tags.idTag
        const tagCountProcessed = {};
        for (const key in tagCount) {
            // Asegúrate de que la comparación se haga con el mismo tipo de datos
        const tag = data.tags.find((tag) => tag.idTag.toString() === key);
        
        if (tag) {
            tagCountProcessed[tag.name] = tagCount[key];
        } else {
            // Manejar el caso en que no se encuentra el tag
            tagCountProcessed[`Unknown tag with id ${key}`] = tagCount[key];
        }
        }
        return tagCountProcessed;
    }



   
    class Chart extends React.Component {
        render() {
            return (
                <Plot
                    data={[
                        {
                            labels: Object.keys(dataProcessed),
                            values: Object.values(dataProcessed),
                            name: "NLP a partir de los comentarios",
                            type: "pie",
                            hole: 0.4,
                            marker: {
                                colors: [
                                    "#3834D0",
                                    "#6ECFBC",
                                    "#FF80A9",
                                    "#FFC466",
                                    "#FF7453"
                                ],
                            },
                        },
                    ]}
                    layout={{
                        width: 720,
                        height: 440,
                        title: "Clasificación de sentimientos en los comentarios | NLP",
                        annotations: [
                            {
                                text: `Comentarios analizados: ${numberOfComments}`,
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
        <div className="chart">
            <h2>Clasificación de sentimientos en los comentarios | NLP</h2>
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div>
                    <Chart/>
                </div>
            )}
        </div>
    );
}

export default Chart4b;