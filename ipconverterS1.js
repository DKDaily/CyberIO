document.addEventListener('DOMContentLoaded', function() {
    function convertIP_SentinelOne() {
        const inputBox = document.getElementById('editor1').value;
        const outputBox = document.getElementById('editor2');

        // Process input
        const ipAddresses = inputBox.replace(/[\n, ]+/g, ' ').split(' ').filter(ip => ip.trim() !== '');
        if (ipAddresses.length > 0) {
            const sentinelOneOutput = 'IP = "' + ipAddresses.join(' OR ') + '"';
            outputBox.value = sentinelOneOutput;
        } else {
            outputBox.value = 'No valid IP addresses provided';
        }
    }

    // Expose the function to the global scope
    window.convertIP_SentinelOne = convertIP_SentinelOne;
});
