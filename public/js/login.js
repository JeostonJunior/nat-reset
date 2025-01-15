document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/auth/loginValidation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Credenciais inválidas');
        }

        const { token } = await response.json();
        localStorage.clear();
        localStorage.setItem('authToken', token);        

        // Faz a requisição para a rota protegida com o token no cabeçalho
        const protectedResponse = await fetch('/protected/home', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!protectedResponse.ok) {
          throw new Error('Acesso negado');
        }

        const content = await protectedResponse.text();
        document.body.innerHTML = content;
      } catch (error) {
        console.error('Erro ao autenticar:', error);
        alert('Erro ao autenticar. Verifique suas credenciais.');
      }
    });
  } else {
    console.error('Formulário de login não encontrado');
  }
});
