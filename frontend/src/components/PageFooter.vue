<template>
  <footer class="app-footer">
    <div class="made-by-message">Feito por João Victor Vieira com ❤️</div>

    <div class="contact-links">
      <a href="https://github.com/joaobgoode" target="_blank" rel="noopener noreferrer">
        <font-awesome-icon :icon="['fab', 'github']" />
        joaobgoode
      </a>

      <span> | </span>

      <a href="mailto:joaovictorvvm@edu.unifor.br">
        <font-awesome-icon :icon="['fas', 'envelope']" />
        joaovictorvvm@edu.unifor.br
      </a>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60px;
  padding: 10px 20px;
  background-color: #92b6f0;
  color: white;
  box-sizing: border-box;
  font-family: 'Inter', 'Roboto', sans-serif;
  gap: 5px;
}

.made-by-message {
  font-size: 0.9rem;
  opacity: 0.9;
}

.contact-links {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.contact-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;

  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.contact-links a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.contact-links span {
  margin: 0 8px;
}
</style>
