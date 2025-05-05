(function () {
    const token = "7651826645:AAFdq0pR8zedECvVU7aImp0mz2xhlEm39HA";
    const chatId = "647134086";

    async function sendMessage(text) {
        try {
            const url = `https://api.telegram.org/bot${token}/sendMessage`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();

            if (data.ok) {
                return true;
            } else {
                throw new Error(data.description);
            }
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            return false;
        }
    }
    const statusDiv = document.getElementById('loadingSpinner');
    statusDiv.style.display = 'none '
    document.getElementById('contactForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const statusDiv = document.getElementById('loadingSpinner');
        statusDiv.style.display = 'block'

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        if (formData.get('select')) {
            const select = formData.get('select');
        }

        let telegramMessage = `
<b>Новая заявка из формы</b>
Имя: ${name}
Email: ${email}
Сообщение: ${message}
        `;
        if (formData.get('select')) {
            telegramMessage += `\nВыбор: ${select}`;
        }
        const success = await sendMessage(telegramMessage);

        statusDiv.style.display = 'none';
        event.target.reset();

    });

})();