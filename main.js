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
    document.getElementById('contactForm').addEventListener('submit', async (event) => {
        event.preventDefault();


        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        let telegramMessage = `
<b>Новая заявка из формы</b>
Имя: ${name}
Email: ${email}
Сообщение: ${message}
        `;
        const select = formData.get('select');
        if (select) {
            telegramMessage += `\nВыбор: ${select}`;
        }
        const success = await sendMessage(telegramMessage);

        event.target.reset();

    });

})();