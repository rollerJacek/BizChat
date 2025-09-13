init();
function init() {
    // --- SEKCJA GLOBALNA (działa na wszystkich stronach) ---
    const mainContainer = document.querySelector('.main-container');
    const workingTimerElement = document.getElementById('working-timer');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const chatSidebar = document.getElementById('chat-sidebar'); // dodane do globalnej obsługi

    // Licznik czasu
    if (workingTimerElement) { 
        let startTime = Date.now(); 
        setInterval(() => { 
            const totalSeconds = Math.floor((Date.now() - startTime) / 1000); 
            const hours = Math.floor(totalSeconds / 3600); 
            const minutes = Math.floor((totalSeconds % 3600) / 60); 
            const seconds = totalSeconds % 60; 
            workingTimerElement.textContent = [ 
                String(hours).padStart(2, '0'), 
                String(minutes).padStart(2, '0'), 
                String(seconds).padStart(2, '0') 
            ].join(':'); 
        }, 1000); 
    }

    // Przełącznik motywu
    if (themeToggleBtn) { 
        themeToggleBtn.addEventListener('click', () => { 
            document.body.classList.toggle('light-theme'); 
            const icon = themeToggleBtn.querySelector('i'); 
            icon.classList.toggle('fa-sun'); 
            icon.classList.toggle('fa-moon'); 
        }); 
    }

    // --- FUNKCJA RESPONSYWNOŚCI ---
    const checkTabletChatVisibility = () => {
        if (window.innerWidth > 768 && window.innerWidth <= 1024) {
            const isSidebarExpanded = !sidebar.classList.contains('collapsed');
            const isChatListExpanded = chatSidebar && !chatSidebar.classList.contains('collapsed');
            if (isSidebarExpanded && isChatListExpanded) {
                mainContainer.classList.add('hide-chat-area');
            } else {
                mainContainer.classList.remove('hide-chat-area');
            }
        } else {
            mainContainer.classList.remove('hide-chat-area');
        }
    };

    // Globalna obsługa sidebara
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('visible');
                if (chatSidebar) chatSidebar.classList.remove('visible');
            } else {
                sidebar.classList.toggle('collapsed');
                checkTabletChatVisibility();
            }
        });
    }

    // --- SEKCJA DLA STRONY GŁÓWNEJ (index.html) ---
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
        const chatListItems = document.querySelectorAll('.chat-list-item');
        const toggleChatListBtn = document.getElementById('toggle-chat-list-btn');
        const toggleChatListDesktopBtn = document.getElementById('toggle-chat-list-desktop-btn');

        // Obsługa przycisków responsywności (z pierwszego pliku)
        if (toggleChatListBtn) toggleChatListBtn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            chatSidebar.classList.toggle('visible'); 
            sidebar.classList.remove('visible'); 
        });
        if (toggleChatListDesktopBtn) toggleChatListDesktopBtn.addEventListener('click', () => { 
            chatSidebar.classList.toggle('collapsed'); 
            checkTabletChatVisibility(); 
        });
        chatListItems.forEach(item => { 
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) chatSidebar.classList.remove('visible'); 
            }); 
        });
        document.addEventListener('click', (e) => { 
            if (window.innerWidth <= 768) { 
                if (sidebar.classList.contains('visible') && !sidebar.contains(e.target) && e.target !== menuBtn) sidebar.classList.remove('visible'); 
                if (chatSidebar && chatSidebar.classList.contains('visible') && !chatSidebar.contains(e.target) && e.target !== toggleChatListBtn) chatSidebar.classList.remove('visible'); 
            } 
        });
        window.addEventListener('resize', checkTabletChatVisibility);

        checkTabletChatVisibility();
    }

   // --- SEKCJA DLA PODSTRONY WORKFLOW (workflow.html) ---
if (document.querySelector('.workflow-module')) {
    const addRequestBtn = document.getElementById('add-request-btn');
    const requestsList = document.getElementById('requests-list');
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    const weekRangeSpan = document.getElementById('week-range');

    const weeks = ["25.08 - 31.08.2025", "01.09 - 07.09.2025", "08.09 - 14.09.2025", "15.09 - 21.09.2025"];
    let currentWeekIndex = 2;

    const updateCalendarView = () => {
        if (weekRangeSpan) weekRangeSpan.textContent = weeks[currentWeekIndex];
        if (prevWeekBtn) prevWeekBtn.disabled = currentWeekIndex === 0;
        if (nextWeekBtn) nextWeekBtn.disabled = currentWeekIndex === weeks.length - 1;
    };

    if (prevWeekBtn) prevWeekBtn.addEventListener('click', () => {
        if (currentWeekIndex > 0) {
            currentWeekIndex--;
            updateCalendarView();
        }
    });

    if (nextWeekBtn) nextWeekBtn.addEventListener('click', () => {
        if (currentWeekIndex < weeks.length - 1) {
            currentWeekIndex++;
            updateCalendarView();
        }
    });

    if (addRequestBtn) {
        addRequestBtn.addEventListener('click', () => {
            if (document.querySelector('.request-form-row')) return;

            const formRow = document.createElement('div');
            formRow.className = 'request-item-row request-form-row';
            formRow.innerHTML = `
                <div><div class="status-indicator pending" title="Oczekujący"></div></div>
                <div class="date-range-field">
                    <input type="date" class="date-from" title="Data od">
                    <input type="date" class="date-to" title="Data do">
                </div>
                <div>
                    <select class="request-type">
                        <option>Praca zdalna</option>
                        <option>Nieobecność</option>
                    </select>
                </div>
                <div class="decision-cell">
                    <div class="decision-checkbox-wrapper disabled" title="Decyzja przełożonego (nieaktywne)">
                        <input type="checkbox" disabled>
                        <i class="fas fa-check"></i>
                    </div>
                </div>
                <div class="action-cell">
                    <button class="icon-button save-request-btn" title="Zapisz wniosek"><i class="fas fa-save"></i></button>
                </div>
            `;
            requestsList.appendChild(formRow);

            const saveBtn = formRow.querySelector('.save-request-btn');
            saveBtn.addEventListener('click', () => {
                const dateFrom = formRow.querySelector('.date-from').value;
                const dateTo = formRow.querySelector('.date-to').value;
                const type = formRow.querySelector('.request-type').value;

                if (!dateFrom || !dateTo) {
                    alert('Proszę wybrać daty.');
                    return;
                }

                const submittedRow = document.createElement('div');
                submittedRow.className = 'request-item-row';
                submittedRow.innerHTML = `
                    <div><div class="status-indicator pending" title="Oczekujący"></div></div>
                    <div><span>${dateFrom} - ${dateTo}</span></div>
                    <div><span>${type}</span></div>
                    <div class="decision-cell"><i class="fas fa-hourglass-half" title="Oczekuje na decyzję przełożonego"></i></div>
                    <div class="action-cell"></div>
                `;
                requestsList.insertBefore(submittedRow, formRow);
                formRow.remove();
            });
        });
    }

    updateCalendarView();
}

      // --- SEKCJA DLA PODSTRONY ZADANIA (zadania.html) ---
    if (document.querySelector('.tasks-module')) {
        const tasksTable = document.getElementById('tasks-table');
        const addTaskBtn = document.getElementById('add-task-btn');

        // Logika rozwijania treści zadania
        tasksTable.addEventListener('click', (e) => {
            const clickedRow = e.target.closest('.task-row');
            if (!clickedRow) return;

            // Usuń zaznaczenie z innych wierszy
            tasksTable.querySelectorAll('.task-row').forEach(row => {
                if (row !== clickedRow) {
                    row.classList.remove('selected');
                }
            });

            // Przełącz zaznaczenie klikniętego wiersza
            clickedRow.classList.toggle('selected');
        });

        // Logika dodawania nowego zadania
        addTaskBtn.addEventListener('click', () => {
            // Sprawdź czy formularz już nie istnieje
            if (tasksTable.querySelector('.task-form-row')) return;

            const formRow = document.createElement('div');
            formRow.className = 'task-form-row';
            formRow.innerHTML = `
                <input type="text" placeholder="Przypisany" class="task-form-user">
                <div></div>
                <select class="task-form-priority">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <input type="text" placeholder="Tytuł zadania" class="task-form-title">
                <input type="text" placeholder="Treść zadania" class="task-form-content">
            `;
            tasksTable.appendChild(formRow);
            
            // Dodajemy niewidzialny przycisk zapisu, który aktywuje się po wciśnięciu Enter w ostatnim polu
            const contentInput = formRow.querySelector('.task-form-content');
            contentInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const user = formRow.querySelector('.task-form-user').value || 'Nieprzypisany';
                    const priority = formRow.querySelector('.task-form-priority').value;
                    const title = formRow.querySelector('.task-form-title').value || 'Nowe zadanie';
                    const content = contentInput.value || 'Brak treści.';

                    const newRow = document.createElement('div');
                    newRow.className = 'task-row';
                    newRow.innerHTML = `
                        <div>${user}</div>
                        <div><span class="task-status in-progress" title="W trakcie"></span></div>
                        <div>${priority}</div>
                        <div>${title}</div>
                        <div class="task-content">${content}</div>
                    `;
                    tasksTable.appendChild(newRow);
                    formRow.remove();
                 }
            });
        });
    }

    // --- SEKCJA DLA PODSTRONY PANEL ADMINA (panel-admina.html) ---
if (document.querySelector('.admin-module')) {
    const userList = document.getElementById('user-list');
    const userModal = document.getElementById('user-modal');
    const deactivateModal = document.getElementById('deactivate-user-modal');
    const userModalClose = document.getElementById('user-modal-close');
    const userForm = document.getElementById('user-form');
    const addUserBtn = document.getElementById('add-user-btn');
    const modalTitle = document.getElementById('modal-title');
    const saveUserBtn = document.getElementById('save-user-btn');
    
    const cancelDeactivateBtn = document.getElementById('cancel-deactivate-btn');
    const confirmDeactivateBtn = document.getElementById('confirm-deactivate-btn');
    const userToDeactivateNameSpan = document.getElementById('user-to-deactivate-name');
    
    let rowToEdit = null;
    let rowToDeactivate = null;

    // Otwórz modal do DODAWANIA użytkownika
    addUserBtn.addEventListener('click', () => {
        rowToEdit = null; // Upewnij się, że nie edytujemy
        userForm.reset(); // Wyczyść formularz
        modalTitle.textContent = 'Dodaj nowego użytkownika';
        saveUserBtn.textContent = 'Dodaj użytkownika';
        userForm.querySelector('#edit-pass1').placeholder = "Ustaw hasło";
        userModal.classList.add('visible');
    });

    // Delegacja zdarzeń dla przycisków Edytuj i Dezaktywuj
    userList.addEventListener('click', (e) => {
        const editButton = e.target.closest('.edit-btn');
        const deactivateButton = e.target.closest('.deactivate-btn');

        if (editButton) {
            rowToEdit = editButton.closest('.user-row');
            const data = rowToEdit.dataset;
            
            modalTitle.textContent = 'Edytuj dane użytkownika';
            saveUserBtn.textContent = 'Zapisz zmiany';
            userForm.querySelector('#edit-pass1').placeholder = "Pozostaw puste, by nie zmieniać";

            // Wypełnij formularz
            userForm.querySelector('#edit-user-id').value = data.id;
            userForm.querySelector('#edit-imie').value = data.imie;
            userForm.querySelector('#edit-dzial').value = data.dzial;
            userForm.querySelector('#edit-stanowisko').value = data.stanowisko;
            userForm.querySelector('#edit-adres').value = data.adres;
            userForm.querySelector('#edit-email').value = data.email;
            userForm.querySelector('#edit-telefon').value = data.telefon;
            userForm.querySelector('#edit-typ').value = data.typ;

            userModal.classList.add('visible');
        }

        if (deactivateButton) {
            rowToDeactivate = deactivateButton.closest('.user-row');
            userToDeactivateNameSpan.textContent = rowToDeactivate.dataset.imie;
            deactivateModal.classList.add('visible');
        }
    });

    // Zapisz zmiany (Edycja lub Dodanie)
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            id: userForm.querySelector('#edit-user-id').value,
            imie: userForm.querySelector('#edit-imie').value,
            dzial: userForm.querySelector('#edit-dzial').value,
            stanowisko: userForm.querySelector('#edit-stanowisko').value,
            adres: userForm.querySelector('#edit-adres').value,
            email: userForm.querySelector('#edit-email').value,
            telefon: userForm.querySelector('#edit-telefon').value,
            typ: userForm.querySelector('#edit-typ').value
        };

        if (rowToEdit) { // Jesteśmy w trybie edycji
            // Aktualizuj dane w atrybutach data-*
            Object.keys(formData).forEach(key => rowToEdit.dataset[key] = formData[key]);
            // Aktualizuj tekst w komórkach
            rowToEdit.children[1].textContent = formData.imie;
            rowToEdit.children[2].textContent = formData.dzial;
            rowToEdit.children[3].textContent = formData.typ;
            alert('Dane zaktualizowane (symulacja).');
        } else { // Jesteśmy w trybie dodawania
            const newId = Math.floor(Math.random() * 900) + 100; // Losowe ID dla dema
            const newRow = document.createElement('div');
            newRow.className = 'user-row';
            newRow.dataset.id = newId;
            Object.keys(formData).forEach(key => newRow.dataset[key] = formData[key]);

            newRow.innerHTML = `
                <div>${newId}</div>
                <div>${formData.imie}</div>
                <div>${formData.dzial}</div>
                <div>${formData.typ}</div>
                <div><button class="icon-button edit-btn" title="Edytuj"><i class="fas fa-pencil-alt"></i></button></div>
                <div><button class="icon-button deactivate-btn" title="Dezaktywuj"><i class="fas fa-user-slash"></i></button></div>
            `;
            userList.appendChild(newRow);
            alert('Użytkownik dodany');
        }
        
        userModal.classList.remove('visible');
    });

    // Zamykanie modali
    userModalClose.addEventListener('click', () => userModal.classList.remove('visible'));
    cancelDeactivateBtn.addEventListener('click', () => deactivateModal.classList.remove('visible'));
    userModal.addEventListener('click', (e) => { if (e.target === userModal) userModal.classList.remove('visible'); });
    deactivateModal.addEventListener('click', (e) => { if (e.target === deactivateModal) deactivateModal.classList.remove('visible'); });

    // Potwierdzenie deaktywacji
    confirmDeactivateBtn.addEventListener('click', () => {
        if (rowToDeactivate) {
            rowToDeactivate.classList.toggle('deactivated');
        }
        deactivateModal.classList.remove('visible');
        rowToDeactivate = null;
    });
}



// --- SEKCJA DLA PODSTRONY USTAWIENIA (ustawienia.html) ---
if (document.querySelector('.settings-module')) {
    const themeSwitchOnPage = document.getElementById('theme-toggle-switch-page');
    if (themeSwitchOnPage) {
        // Ustaw stan przełącznika na podstawie aktualnego motywu
        themeSwitchOnPage.checked = !document.body.classList.contains('light-theme');

        themeSwitchOnPage.addEventListener('change', () => {
            document.body.classList.toggle('light-theme');
            // Zsynchronizuj ikonę w nagłówku
            const headerIcon = document.querySelector('#theme-toggle-btn i');
            if (headerIcon) {
                headerIcon.classList.toggle('fa-sun');
                headerIcon.classList.toggle('fa-moon');
            }
        });
    }

}
}




