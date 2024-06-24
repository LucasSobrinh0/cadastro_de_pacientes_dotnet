document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id');

    if (!patientId) {
        console.error('ID do paciente não encontrado na URL.');
        return;
    }

    // Fetch para obter os dados do paciente
    fetch(`http://localhost:5065/api/patients/${patientId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        return response.json();
    })
    .then(patient => {
        // Preencher os campos do formulário com os dados obtidos
        document.getElementById('name').value = patient.name;
        document.getElementById('cpf').value = patient.cpf;
        document.getElementById('phoneNumber').value = patient.phoneNumber;
        document.getElementById('birthDate').value = patient.birthDate;
    })
    .catch(error => {
        console.error('Erro ao carregar paciente:', error);
        alert('Erro ao carregar paciente. Tente novamente.');
    });

    // Adicionar evento de submit ao formulário
    const editPatientForm = document.getElementById('editPatientForm');
    editPatientForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter os dados do formulário
        const data = {
            id: patientId,
            name: document.getElementById('name').value,
            cpf: document.getElementById('cpf').value,
            birthDate: document.getElementById('birthDate').value,
            phoneNumber: document.getElementById('phoneNumber').value
        };

        console.log('Dados do formulário:', data);

        // Fetch para atualizar os dados do paciente
        fetch(`http://localhost:5065/api/patients/${patientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('Paciente atualizado com sucesso!');
                window.location.href = '../home/index.html'; // Redireciona após sucesso
            } else {
                return response.json().then(err => {
                    console.error('Erro ao atualizar paciente:', err);
                    alert(`Falha ao atualizar paciente: ${err.title} - ${err.detail || err.message}`);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar paciente:', error);
            alert('Erro ao atualizar paciente. Tente novamente.');
        });
    });
});
