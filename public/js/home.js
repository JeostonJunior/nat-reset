document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('authToken');
  console.log('Home');

  if (!token) {
    alert('Você não está autenticado!');
    window.location.href = '/login';
    return;
  }

  try {
    const response = await fetch('/protected/home', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    const html = await response.text();
    document.body.innerHTML = html;
  } catch (err) {
    console.error(err);
    alert('Sessão expirada ou token inválido!');
    window.location.href = '/login';
  }
});
