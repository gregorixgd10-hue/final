const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const welcomeText = document.getElementById("welcomeText");
    const loginMsg = document.getElementById("loginMsg");
    const registerMsg = document.getElementById("registerMsg");

    // Mostrar pantalla según sesión activa
    document.addEventListener("DOMContentLoaded", () => {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      if (activeUser) {
        showWelcome(activeUser.username);
      }
    });

    // Cambiar a registro
    function showRegister() {
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      welcomeScreen.classList.add("hidden");
      loginMsg.textContent = "";
      registerMsg.textContent = "";
    }

    // Cambiar a login
    function showLogin() {
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      welcomeScreen.classList.add("hidden");
      loginMsg.textContent = "";
      registerMsg.textContent = "";
    }

    // Mostrar pantalla de bienvenida
    function showWelcome(username) {
      loginForm.classList.add("hidden");
      registerForm.classList.add("hidden");
      welcomeScreen.classList.remove("hidden");
      welcomeText.textContent = `¡Bienvenido, ${username}! 😄`;
    }

    // Cerrar sesión
    function logout() {
      localStorage.removeItem("activeUser");
          window.location.href = "login.html";
      showLogin();
    }

    // Manejo de registro
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("regUser").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPass").value;
      const confirm = document.getElementById("regConfirm").value;

      if (password !== confirm) {
        registerMsg.textContent = "Las contraseñas no coinciden.";
        registerMsg.className = "error";
        return;
      }

      const confirmData = confirmDialog(username, email, password);
      if (!confirmData) {
        registerMsg.textContent = "Registro cancelado.";
        registerMsg.className = "error";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const exists = users.find(u => u.email === email || u.username === username);
      if (exists) {
        registerMsg.textContent = "El usuario o correo ya existe.";
        registerMsg.className = "error";
        return;
      }

      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      registerMsg.textContent = "Registro exitoso 🎉";
      registerMsg.className = "success";

      registerForm.reset();
      setTimeout(() => showLogin(), 1500);
    });

    // Confirmar datos antes de registrar
    function confirmDialog(username, email, password) {
      return confirm(
        `Por favor confirma tus datos:\n\nUsuario: ${username}\nEmail: ${email}\nContraseña: ${"*".repeat(password.length)}\n\n¿Son correctos?`
      );
    }

    // Manejo de inicio de sesión
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const userInput = document.getElementById("loginUser").value.trim();
      const passInput = document.getElementById("loginPass").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        u => (u.username === userInput || u.email === userInput) && u.password === passInput
      );

      if (user) {
        loginMsg.textContent = "";
        localStorage.setItem("activeUser", JSON.stringify(user));
        showWelcome(user.username);
      } else {
        loginMsg.textContent = "Usuario o contraseña incorrectos.";
        loginMsg.className = "error";
      }
    });


/* Log out

const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "Servicios.html"
}

const logoutbutton = document.querySelector(logout)

logoutbutton.addEventListener("click", logout) */






