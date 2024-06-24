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

            // Tratamento da data de nascimento
            const birthDate = new Date(patient.birthDate);
            const formattedBirthDate = birthDate.toLocaleDateString('pt-BR'); // Define o formato desejado para exibição

            const birthDatePatient = document.createElement('span');
            birthDatePatient.textContent = `${formattedBirthDate}`;
            listItem.appendChild(birthDatePatient);

            const phoneNumberPatient = document.createElement('span');
            phoneNumberPatient.textContent = `${patient.phoneNumber}`;
            listItem.appendChild(phoneNumberPatient);

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
        if (confirm('Tem certeza que deseja remover este paciente?')) {
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
    }

    function editPatient(patientId) {
        window.location.href = `../edit_patient/edit_patient.html?id=${patientId}`;
        console.log(`Editar paciente com ID ${patientId}`);
    }
});
