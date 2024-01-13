import { useState } from "react";

const Dashboard = () => {
    const [chart, setChart] = useState("");

    return (
        <div className="dashboard">
            <div className="lateral">
                <nav>
                    <ul>
                        <li>
                            <button onClick={() => setChart("chart1")}>
                                GRÁFICO 1
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart2")}>
                                GRÁFICO 2
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart3")}>
                                GRÁFICO 3
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart4")}>
                                GRÁFICO 4
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="chart-container">{chart}</div>
        </div>
    );
};

export default Dashboard;
