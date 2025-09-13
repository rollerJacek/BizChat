import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/main.css';

const Tasks = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="content-container page-container">
                    <main className="page-content">
                        <div className="tasks-module">
                            <div className="tasks-header">
                                <h2>Lista zadań</h2>
                            </div>
                            <div className="tasks-table" id="tasks-table">
                                <div className="tasks-table-header-row">
                                    <div>Przypisane do</div>
                                    <div>Status</div>
                                    <div>Priorytet</div>
                                    <div>Tytuł</div>
                                    <div>Treść</div>
                                </div>
                                <div className="task-row">
                                    <div>Jan Kowalski</div>
                                    <div><span className="task-status in-progress" title="W trakcie"></span></div>
                                    <div>3</div>
                                    <div>Przygotować raport kwartalny</div>
                                    <div className="task-content">Szczegółowy opis zadania dotyczącego przygotowania raportu kwartalnego. Należy uwzględnić dane sprzedażowe z ostatnich trzech miesięcy oraz prognozy na kolejny kwartał.</div>
                                </div>
                                <div className="task-row">
                                    <div>Marta Nowak</div>
                                    <div><span className="task-status done" title="Wykonane"></span></div>
                                    <div>5</div>
                                    <div>Organizacja spotkania z klientem X</div>
                                    <div className="task-content">Zarezerwować salę, przygotować agendę i wysłać zaproszenia do wszystkich uczestników.</div>
                                </div>
                            </div>
                            <div className="tasks-legend">
                                <div className="legend-item">
                                    <span className="task-status in-progress"></span>
                                    <span>W trakcie</span>
                                </div>
                                <div className="legend-item">
                                    <span className="task-status done"></span>
                                    <span>Wykonane</span>
                                </div>
                            </div>
                            <div className="add-task-container">
                                <button className="icon-button" id="add-task-btn" title="Dodaj nowe zadanie">
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Tasks;
