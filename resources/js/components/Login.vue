<template>
    <div class="login-container">
      <form class="login-form">
        <h2>Welcome Back!</h2>

        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Login</button>

        <p class="forgot-password">Forgot your password? <a href="#">Reset it here.</a></p>
      </form>
    </div>
  </template>

  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #4568dc, #b06ab3);
  }

  .login-form {
    max-width: 600px !important;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }

  label {
    display: block;
    text-align: left;
    margin: 10px 0 5px;
    color: #555;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(to right, #8e2de2, #4a00e0);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
  }

  button:hover {
    background: linear-gradient(to right, #ff512f, #dd2476);
  }

  .forgot-password {
    margin-top: 15px;
    font-size: 14px;
    color: #555;
  }

  .forgot-password a {
    color: #3498db;
    text-decoration: none;
  }

  .forgot-password a:hover {
    text-decoration: underline;
  }
  </style>
