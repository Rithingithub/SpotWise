//In history.js
import React, { useState, useEffect } from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import prjLogo from '../images/icon_car.png';
import css__styles from "../components/style.module.css";
import css_styles from "./history.module.css";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        let { data: Histories, error } = await supabase
            .from('Histories')
            .select('*');
        
        if (error) {
            console.error('Error fetching data:', error.message);
        } else {
            setHistoryData(Histories);
        }
        setLoading(false);
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
