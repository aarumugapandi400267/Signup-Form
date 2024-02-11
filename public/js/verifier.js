var studentPhone = document.getElementById('studentphone')
let errorStuPhone = document.getElementById('stuphoneerror')

studentPhone.addEventListener('input', (event) => {
    let inputValue = event.target.value
    if (inputValue.length < 10 || inputValue.length > 10 || inputValue.slice(0, 1) < 6) {
        errorStuPhone.style.display = 'block'
        document.getElementById('stuphoneerror').innerHTML = 'Enter Valid Phone'
        return
    } else {
        errorStuPhone.style.display = 'none'
        return
    }
})

function populateTaluks() {
    var district = document.getElementById('district').value;
    var talukSelect = document.getElementById('taluk');
    var talukWrap = document.getElementById('talukWrap');

    // Clear previous options
    talukSelect.innerHTML = '';

    // Add taluk options based on the selected district
    if (district === 'salem') {
        var salemtaluks = ['Salem',
            'Salem West',
            'Salem South',
            'Yercaud',
            'Gangavalli',
            'Attur',
            'Pethanaickenpalayam',
            'Valapady']; // Example taluks for Salem
        for (var i = 0; i < salemtaluks.length; i++) {
            var option = document.createElement('option');
            option.value = salemtaluks[i];
            option.text = salemtaluks[i];
            talukSelect.appendChild(option);
        }
        talukWrap.style.display = 'block'; // Show taluk dropdown
    } else if (district == "erode") {
        var erodetaluks = ['Erode',
            'Modakkurichi',
            'Kodumudi',
            'Perundurai',
            'Bhavani',
            'Anthiyur',
            'Gobichettipalayam',
            'Sathyamangalam',
            'Thalavadi',
            'Nambiyur']
        for (var i = 0; i < erodetaluks.length; i++) {
            var option = document.createElement('option');
            option.value = erodetaluks[i];
            option.text = erodetaluks[i];
            talukSelect.appendChild(option);
        }
        talukWrap.style.display = 'block';
    } else if (district == "namakkal") {
        var namakkaltaluks = ['Tiruchengode',
            'Namakkal',
            'Rasipuram',
            'Paramathi Velur',
            'Sendamangalam',
            'Kumarapalayam',
            'Kolli Hills',
            'Mohanur']
        for (var i = 0; i < namakkaltaluks.length; i++) {
            var option = document.createElement('option');
            option.value = namakkaltaluks[i];
            option.text = namakkaltaluks[i];
            talukSelect.appendChild(option);
        }
        talukWrap.style.display = 'block';
    } else {
        talukWrap.style.display = 'none';
    }
}
populateTaluks()