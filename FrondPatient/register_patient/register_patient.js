document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createPatientForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const birthDate = document.getElementById('birthDate').value; // Obtém a data de nascimento diretamente
        const phoneNumber = document.getElementById('phoneNumber').value;

        fetch('http://localhost:5065/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                cpf: cpf,
                birthDate: birthDate, // Envia a data de nascimento como string no formato 'yyyy-MM-dd'
                phoneNumber: phoneNumber
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao criar paciente');
            }
        })
        .then(data => {
            alert('Paciente criado com sucesso.');
            form.reset();
        })
        .catch(error => {
            alert('Erro ao criar paciente: ' + error.message);
        });
    });
});
