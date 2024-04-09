document.getElementById('dropArea').addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
});

document.getElementById('dropArea').addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length) {
        processFile(files[0]);
    }
});

function processFile(file) {
    if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (event) => {
            const jsonData = JSON.parse(event.target.result);
            displayData(jsonData);
        };
        reader.readAsText(file);
    } else {
        alert('Veuillez déposer un fichier JSON.');
    }
}

function createCard(title, data) {
    const card = document.createElement('div');
    card.className = 'card';
    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = title;
    card.appendChild(header);

    for (const key in data) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `<span class="key">${key}:</span> <span class="value">${data[key]}</span>`;
        card.appendChild(itemDiv);
    }

    return card;
}

function displayData(data) {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = ''; // Clear previous content

    // Example categories - adjust according to your data structure
    const systemInfoData = {
        "Username": data.Username,
        "Administrator": data.Administrator,
        "Computer name": data["Computer name"],
        "Domain": data.Domain,
        "OS": data.OS,
        "OS Version": data["Version"],
        "System Architecture": data["System Architecture"],
        "Initial Install Date": data["System Install Date"]
    };
    const motherboardInfoData = {
        "Motherboard Manufacturer": data["Manufacturer"],
        "Motherboard Model": data["Model"],
        "BIOS Version": data["BIOS Version"]
    };
    const cpuInfoData = {
        "CPU Model": data["CPU"],
        "CPU Cores": data["Number Of Cores"],
        "Number Of Threads": data["Number Of Threads"],
        "CPU Frequency": data["Frequency"],
        "CPU Architecture": data["Architecture"],
        "L2 Cache Size": data["L2 Cache Size"],
        "L3 Cache Size": data["L3 Cache Size"],
        "Socket": data["Socket"],
        "Virtualization": data["Virtualization"]
    };
    const gpuInfoData = {
        "GPU": data.GPU,
        "GPU Memory": data["GPU VRAM"],
        "GPU Driver Version": data["GPU Driver Version"],
        "GPU Driver Date": data["GPU Driver Date"]
    };
    const ramInfoData = {
        "RAM Manufacturer": data["RAM Manufacturer"],
        "Total RAM Amount": data["Total RAM Amount"],
        "RAM Speed": data["RAM Speed"],
        "RAM Slot": data["RAM Slot"],
        "RAM Channel": data["RAM Channel"]
    };
    const networkInfoData = {
        "IP Address": data["IP Address"],
        "Mac Address": data["MAC Address"],
        "Gateway": data.Gateway,
        "DNS": data.DNS,
        "DHCP": data.DHCP
    };
    const storageInfoData = {
        "Total Storage": data["Total Disk Space"],
        "Free Storage": data["Total Free Space"],
        "Storage Type": data["Disks Type"],
        "Storage Model": data["Disks Model"],
        "Disk Health": data["Disks Health"],
        "Disk Partitions Type": data["Disks Partitions"],
        "Bitlocker Status": data["Bitlocker Encryption"],
    };
    const miskInfoData = {
        "Printers": data.Printers,
        "Active Antivirus": data["Active Antivirus"],
        "Other Antivirus": data["Other Antivirus"],
        "Office Version": data["Office Version"],
        "System Install Date": data["System Install Date"],
        "Scan Date": data["Scan Date"],
        "Scan ID": data["Scan ID"]
    };

    cardsContainer.appendChild(createCard('System Information', systemInfoData));
    cardsContainer.appendChild(createCard('Motherboard Information', motherboardInfoData));
    cardsContainer.appendChild(createCard('CPU Information', cpuInfoData));
    cardsContainer.appendChild(createCard('RAM Information', ramInfoData));
    cardsContainer.appendChild(createCard('GPU Information', gpuInfoData));
    cardsContainer.appendChild(createCard('Network Information', networkInfoData));
    cardsContainer.appendChild(createCard('Storage Information', storageInfoData));

    // Add more cards as needed
}