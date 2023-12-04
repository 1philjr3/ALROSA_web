document.getElementById('loginButton').addEventListener('click', function() {
    console.log('Кнопка нажата!');

    import('https://openfpcdn.io/fingerprintjs/v4')
        .then(FingerprintJS => FingerprintJS.load())
        .then(fp => fp.get())
        .then(result => {
            // This is the visitor identifier:
            const visitorId = result.visitorId;
            console.log(visitorId);

            // Now, you can send the visitorId to your server or perform any other actions.

            // Create a Blob with the data
            const blob = new Blob([visitorId], { type: 'text/plain' });

            // Create a download link
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'visitorId.txt';

            // Append the link to the body
            document.body.appendChild(link);

            // Trigger the click event on the link to initiate the download
            link.click();

            // Remove the link from the DOM
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error initializing or getting fingerprint:', error);
        });
});
