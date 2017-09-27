<template>
  <div class="alcodehol">
    <h1>{{teamName}}</h1>
    <textarea cols='40' id='txtarea' rows='5' class='codeBox' type='text' placeholder="Tu código aquí" resizable="resizable"></textarea>
    <button @click='sendScript()'> ENVIAR A JUEZ </button>
  </div>
</template>

<script>
// setInterval(function () {
//   alert('Message to alert every 5 seconds')
// }, 30000)

import axios from 'axios'

export default {
  name: 'alcodehol',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    sendScript: function () {
      console.log('holaaa')
      const theScript = window.btoa(document.getElementById('txtarea').value)
      console.log(theScript)
      axios.post('/solution/' + this.teamName, {script: theScript})
      .then(data => alert('TOMA SHOT'))
      .catch(err => alert('error' + err))
    }
  },
  props: {
    teamName: {required: true}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.alcodehol{
  height:90%
}

.codeBox {
  height: 90%;
  width:70%;
}


</style>
