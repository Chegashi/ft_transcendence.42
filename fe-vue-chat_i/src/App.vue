<script setup>
  import { io } from 'socket.io-client';
  import { onBeforeMount, ref } from 'vue';

  const socket = io('http://localhost:3001');

  const messages = ref([]);
  const messageText = ref('');
  const joined = ref(false); 
  const name = ref('');
  const typingDisplay = ref('');

  onBeforeMount(() => {
    socket.emit('findAllMessages', {}, (response) => { // while i dnt have a payload use object {},  3th parm for response callback
      messages.value = response;
    });

    socket.on('message', (message) => {
      messages.value.push(message);
    });

    socket.on('typing', ({ name, isTypting }) => {
      if(isTypting){ // trying false
        typingDisplay.value = `${name} is typing...`; 
      }
      else {
        typingDisplay.value = '';
      }
    });
  });

  const join = () => {
    socket.emit('join', {name: name.value}, () => { // name for a payload && retuen names on 3th param for everyone jioned
      joined.value = true;
    })
  }

  const sendMessage = () => {
    socket.emit('createMessage', {text: messageText.value}, () => {
      messageText.value = '';
    })
  }

  let timeout;
  const emitTyping = () => {
    socket.emit('typing', { isTypting: false });
    timeout = setTimeout(() => {
      socket.emit('typing', { isTypting: true });
    }, 2000);
  };
</script>

<template>
  <div class="chat">
    <div v-if="!joined">
      <form @submit.prevent="join">
        <label>Who are you?</label>
        <input v-model="name" />
        <button type="submit">Send</button>
      </form>
    </div>
    <div class="chat-container" v-else>
      <div class="messages-container">
        <div v-for="message in messages">
          [{{ message.name }}]: {{ message.text }}
        </div>
      </div>

      <div v-if="typingDisplay">{{ typingDisplay  }}</div>

      <br />
      <hr />

      <div class="message-input">
        <form @submit.prevent="sendMessage">
          <label>Message:</label>
          <input v-model="messageText" @input="emitTyping"/>

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
  @import './assets/base.css'; 

  .chat {
    padding: 20px;
    height: 100vh;
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .message-container {
    flex: 1;
  }

</style>
