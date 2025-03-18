document.addEventListener('DOMContentLoaded', function() {
    function convertIP_Rapid7() {
        const inputBox = document.getElementById('editor1').value;
        const outputBox = document.getElementById('editor2');

        // Process input
        const ipAddresses = inputBox.replace(/[\n, , ]+/g, ' ').split(' ').filter(ip => ip.trim() !== '');
        if (ipAddresses.length > 0) {
            const rapid7Output = 'where("destination_address" = ' + ipAddresses.map(ip => `"${ip}"`).join(' OR ') + '),\nwhere("source_address" = ' + ipAddresses.map(ip => `"${ip}"`).join(' OR ') + ')';
            outputBox.value = rapid7Output;
        } else {
            outputBox.value = 'No valid IP addresses provided';
        }
    }

    // Expose the function to the global scope
    window.convertIP_Rapid7 = convertIP_Rapid7;
});
