function togglePassword() {
    const passwordInput = document.getElementById('secretKey');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}