document.addEventListener("DOMContentLoaded", function () {
    LoadPatients();

    function LoadPatients() {
        fetch('http://localhost:5065/api/patients', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar pacientes: ' + response.statusText);
                }
                return response.json();
            })
            .then(patients => {
                showPatients(patients);
            })
            .catch(error => {
                console.error('Falha ao buscar pacientes:', error);
            });
    }

    function showPatients(patients) {
        const listPatients = document.querySelector('#listPatients');
        listPatients.innerHTML = '';

        patients.forEach(patient => {
            const listItem = document.createElement('li');
            listItem.dataset.patientId = patient.id;

            const namePatient = document.createElement('span');
            namePatient.textContent = `${patient.name}`;
            listItem.appendChild(namePatient);

            const cpfPatients = document.createElement('span');
            cpfPatients.textContent = `${patient.cpf}`;
            listItem.appendChild(cpfPatients);

            const birthDate = new Date(patient.date);
            const formattedBirthDate = birthDate.toLocaleDateString('en-US');

            const birthDatePatient = document.createElement('span');
            birthDatePatient.textContent = `${formattedBirthDate}`;
            listItem.appendChild(birthDatePatient);

            const phoneNumberPatient = document.createElement('span');
            phoneNumberPatient.textContent = `${patient.phoneNumber}`;
            listItem.appendChild(phoneNumberPatient);
            phoneNumberPatient.innerHTML = '<i class="bi bi-telephone"></i>' + patient.phoneNumber;

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.dataset.patientId = patient.id;
            editButton.addEventListener('click', function () {
                editPatient(patient.id);
            });
            listItem.appendChild(editButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function () {
                removePatient(patient.id);
            });
            listItem.appendChild(removeButton);

            listPatients.appendChild(listItem);
        });
    }

    function removePatient(patientId) {
        // Mostra um diálogo de confirmação
        if (confirm('Tem certeza que deseja remover este paciente?')) {
            // Se o usuário confirmar, prossegue com a requisição DELETE
            fetch(`http://localhost:5065/api/patients/${patientId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        const item = document.querySelector(`li[data-patient-id="${patientId}"]`);
                        if (item) {
                            item.remove();
                        }
                        alert('Paciente removido com sucesso!');
                    } else {
                        console.error('Erro ao remover paciente:', response);
                        alert('Falha ao remover paciente. Tente novamente.');
                    }
                })
                .catch(error => console.error('Erro ao remover paciente:', error));
        }
        // Se o usuário cancelar, a remoção não ocorre
    }


    function editPatient(patientId) {
        window.location.href = `../edit_patient/edit_patient.html?id=${patientId}`;
        console.log(`edit paciente com ID ${patientId}`);
    }
});
