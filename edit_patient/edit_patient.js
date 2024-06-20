document.addEventListener('DOMContentLoaded', function(){
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
        // Ajustar formato da data para preencher o input type="datetime-local"
        const birthDate = new Date(patient.date).toISOString().slice(0,16);
        document.getElementById('birthDate').value = birthDate;
        document.getElementById('phoneNumber').value = patient.phoneNumber;
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
            "name": document.getElementById('name').value,
            "cpf": document.getElementById('cpf').value,
            "phoneNumber": document.getElementById('phoneNumber').value,
            "date": new Date(document.getElementById('birthDate').value).toISOString()
        };

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
                alert('Cliente atualizado com sucesso!');
                window.location.href = 'index.html'; // Redireciona após sucesso
            } else {
                console.error('Erro ao atualizar cliente:', response);
                alert('Falha ao atualizar cliente. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar cliente:', error);
            alert('Erro ao atualizar cliente. Tente novamente.');
        });
    });
});