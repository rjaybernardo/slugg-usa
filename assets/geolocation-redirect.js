$(document).ready(() => {
    if (window.geolocationEnabled) {
        $.ajax({
            url: 'https://ipapi.co/json/',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                const country = data.country;
                const currentUrl = window.location.href;

                if (country === 'AU' && !currentUrl.includes('www.slugg.co')) {
                    window.location.href = 'https://www.slugg.com.au';
                } else if (country === 'US' && !currentUrl.includes('www.slugg.com.au')) {
                    window.location.href = 'https://www.slugg.co';
                }
                // No redirection for other countries
            },
            error: () => console.error('Error with IP Lookup'),
        });
    }
});
