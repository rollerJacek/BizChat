import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/main.css';

const Workflow = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="content-container page-container">
                    <main className="page-content">

                        <div className="workflow-module">
                            <div className="workflow-header">
                                <h2>Grafik zespołu</h2>
                                <div className="calendar-nav">
                                    <button id="prev-week" title="Poprzedni tydzień"><i className="fas fa-chevron-left"></i></button>
                                    <span id="week-range"></span>
                                    <button id="next-week" title="Następny tydzień"><i className="fas fa-chevron-right"></i></button>
                                </div>
                            </div>
                            <div className="workflow-schedule-list">
                                <div className="schedule-row header-row">
                                    <div>Użytkownik</div>
                                    <div>Pon</div>
                                    <div>Wt</div>
                                    <div>Śr</div>
                                    <div>Czw</div>
                                    <div>Pt</div>
                                    <div>Sob</div>
                                    <div>Nd</div>
                                </div>

                                <div className="schedule-row">
                                    <div>Jan Kowalski</div>
                                    <div><div className="day-square"></div></div>
                                    <div><div className="day-square blue" data-tooltip="Praca zdalna"></div></div>
                                    <div><div className="day-square"></div></div>
                                    <div><div className="day-square red" data-tooltip="Nieobecność"></div></div>
                                    <div><div className="day-square"></div></div>
                                    <div><div className="day-square weekend"></div></div>
                                    <div><div className="day-square weekend"></div></div>
                                </div>

                                <div className="schedule-row">
                                    <div>Marta Nowak</div>
                                    <div><div className="day-square"></div></div>
                                    <div><div className="day-square"></div></div>
                                    <div><div className="day-square"></div></div>
                                    <div><div className="day-square"></div></div>
                                    <div><div className="day-square blue" data-tooltip="Praca zdalna"></div></div>
                                    <div><div className="day-square weekend"></div></div>
                                    <div><div className="day-square weekend"></div></div>
                                </div>
                            </div>
                            <div className="calendar-legend">
                                <div className="legend-item">
                                    <div className="day-square"></div>
                                    <span>Dzień pracy</span>
                                </div>
                                <div className="legend-item">
                                    <div className="day-square blue"></div>
                                    <span>Praca zdalna</span>
                                </div>
                                <div className="legend-item">
                                    <div className="day-square red"></div>
                                    <span>Nieobecność</span>
                                </div>
                                <div className="legend-item">
                                    <div className="day-square weekend"></div>
                                    <span>Weekend</span>
                                </div>
                            </div>
                        </div>

                        <div className="workflow-module">
                            <div className="workflow-header">
                                <h2>Moje wnioski</h2>
                                <button className="icon-button" id="add-request-btn" title="Dodaj nowy wniosek">
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <div className="requests-grid" id="requests-list">
                                <div className="requests-header">Status</div>
                                <div className="requests-header">Data</div>
                                <div className="requests-header">Rodzaj</div>
                                <div className="requests-header">Decyzja</div>
                                <div className="requests-header">Akcja</div>

                                <div className="request-item-row">
                                    <div><div className="status-indicator approved" title="Zatwierdzony"></div></div>
                                    <div><span>2025-09-09 - 2025-09-10</span></div>
                                    <div><span>Praca zdalna</span></div>
                                    <div className="decision-cell"><i className="fas fa-check-circle approved" title="Zatwierdzony przez przełożonego"></i></div>
                                    <div className="action-cell"></div> </div>

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Workflow;
