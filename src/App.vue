<template>
  <div id="app">
    <div class='teamData'>
      <h1>Puntaje: {{score}} </h1>
      <button @click='updateScore()'>Actualizar Puntaje</button>
      <h1 class='teamName'>Equipo: {{teamName}}</h1>
    </div>
    <div v-show='isNew==true' style='display:flex; width:10rem; margin:auto'>
      <input v-model='teamName'>
      <div class='btnEnviarNombre' @click="saveTeamName(teamName)"> Enviar </div>
    </div>
    <img v-show='!isNew' class='banner' src="./assets/banner.jpg">
    <alcodehol :teamName='teamName' v-show='!isNew'> </alcodehol>
  </div>
</template>

<script>

import Cookie from 'js-cookie'
import alcodehol from './components/Alcodehol'
import axios from 'axios'
window.Cookie = Cookie

export default {
  name: 'app',
  components: {alcodehol},
  data: function () {
    return {
      teamName: '',
      score: 0,
      isNew: true
    }
  },
  methods: {
    saveTeamName: function (aName) {
      Cookie.set('teamName', aName, { expires: 7 })
      this.isNew = false
      axios.post('/newTeam/' + aName)
      .then(data => alert('TOMA SHOT'))
      .catch(err => alert(err))
    },
    updateScore: function () {
      axios.get('/score/' + this.teamName)
      .then(data => {
        this.score = data.data
        return ''
      })
      .catch(err => {
        alert(err)
      })
    }
  },
  mounted: function () {
    this.isNew = Cookie.get('teamName') === undefined
    if (!this.isNew) {
      this.teamName = Cookie.get('teamName')
      axios.get('/score/' + this.teamName)
      .then(data => {
        this.score = data.data
        return ''
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 80%;
}

.teamData{
  text-align: left;
  margin-left: 1rem
}

.btnEnviarNombre {
  background-color: red;
  width: 4.5rem;
}

router-view {
  height: 90%;
}

.banner {
  max-height: 30%
}
</style>
