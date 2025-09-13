import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/main.css';

const Manual = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <Sidebar />

                <div className="content-container page-container">
                    <main className="page-content">
                        <a href="profil.html" className="back-to-profile-btn">
                            <i className="fas fa-arrow-left"></i> Wróć do profilu
                        </a>
                        <div className="text-content-module">
                            <h2>Instrukcja Obsługi Aplikacji HR Portal</h2>
                            <section>
                                <h3>Logowanie do Systemu</h3>
                                <p>Aby uzyskać dostęp do portalu, należy otworzyć stronę logowania. W formularzu wprowadź swoją unikalną nazwę użytkownika oraz hasło przypisane do Twojego konta, a następnie kliknij przycisk "Zaloguj się". W razie problemów z hasłem, skorzystaj z opcji "Nie pamiętasz hasła?".</p>
                            </section>

                            <section>
                                <h3>Komunikator (Strona Główna)</h3>
                                <p>Główny moduł komunikacyjny. Po lewej stronie znajduje się lista Twoich rozmów grupowych i prywatnych. Po prawej stronie wyświetla się okno wybranego czatu. Czas pracy jest mierzony od momentu zalogowania i widoczny w prawym górnym rogu.</p>
                            </section>

                            <section>
                                <h3>Workflow</h3>
                                <p>Moduł do zarządzania grafikiem i wnioskami. W górnej części widzisz kalendarz tygodniowy swojego zespołu z oznaczeniem nieobecności i pracy zdalnej. W dolnej części zarządzasz swoimi wnioskami - możesz dodawać nowe i śledzić status istniejących.</p>
                            </section>

                            <section>
                                <h3>Zadania</h3>
                                <p>Tutaj znajduje się lista zadań przypisanych do Ciebie lub Twojego zespołu. Możesz śledzić ich status i priorytet. Kliknięcie na wiersz zadania rozwija jego pełną treść. Kierownicy i admini mogą dodawać nowe zadania za pomocą przycisku "+".</p>
                            </section>

                            <section>
                                <h3>Profil</h3>
                                <p>Twoje centrum informacyjne. Znajdziesz tu swoje dane personalne i kontaktowe, informacje o koncie oraz linki do ustawień, polityki prywatności i tej instrukcji.</p>
                            </section>

                            <section>
                                <h3>Panel Admina</h3>
                                <p>Dostępny tylko dla administratorów. Umożliwia zarządzanie wszystkimi użytkownikami w systemie: dodawanie nowych kont, edycję istniejących danych oraz ich deaktywację.</p>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Manual;
