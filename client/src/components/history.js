// import React, { useState, useEffect } from 'react';
// import { IoChevronBackCircleOutline } from 'react-icons/io5';
// import css_styles from "./history.module.css";
// import prjLogo from '../images/icon_car.png';
// import css__styles from "../components/style.module.css";

// const History = () => {
//     const [historyData, setHistoryData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     const fetchHistory = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/api/v1/history');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             const data = await response.json();
//             setHistoryData(data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error.message);
//         }
//     };

//     const goBack = () => {
//         window.location.href = '/';
//     };

//     return (
//         <div >
//             <div className={css__styles.Header}>
//                 <img src={prjLogo} alt="Logo" width={55} height={35} />
//                 <h2>SpotWise</h2>
//             </div>
//             <button className={css__styles['back-button']} onClick={goBack}>
//                 <IoChevronBackCircleOutline className={css__styles.icon}/>
//             </button>
//             <div className={css_styles['table-container']}>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <table className={css_styles.table}>
//                         <thead>
//                             <tr>
//                                 <th>No.</th>
//                                 <th>Timestamp</th>
//                                 <th>location</th>
//                                 <th>Pay Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {historyData.map((history, index) => (
//                                 <tr key={index}>
//                                     <td>{history.id}</td>
//                                     <td>{history.timestamp}</td>
//                                     <td>{history.location}</td>
//                                     <td>{history.payAmount}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default History;


import React, { useState, useEffect } from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import prjLogo from '../images/icon_car.png';
import css__styles from "../components/style.module.css";
import css_styles from "./history.module.css";

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/history');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setHistoryData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const goBack = () => {
        window.location.href = '/';
    };

    return (
        <div className={css_styles.container}>
            <div className={css__styles.Header}>
                <img src={prjLogo} alt="Logo" width={55} height={35} />
                <h2>SpotWise</h2>
            </div>
            <button className={css__styles['back-button']} onClick={goBack}>
                <IoChevronBackCircleOutline className={css__styles.icon}/>
            </button>
            <div className={css_styles['tiles-container']}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    historyData.map((history, index) => (
                        <div key={index} className={css_styles.tile}>
                            <div className={css_styles['tile-heading']}>Timestamp:</div>
                            <div className={css_styles['tile-content']}>{history.timestamp}</div>
                            <div className={css_styles['tile-heading']}>Location:</div>
                            <div className={css_styles['tile-content']}>{history.location}</div>
                            <div className={css_styles['tile-heading']}>Pay Amount:</div>
                            <div className={css_styles['tile-content']}>{history.payAmount}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;
