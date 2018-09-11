import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
// 可以更容易的发送ajax requests
import VueResource from 'vue-resource'
Vue.use(TurbolinksAdapter)
Vue.use(VueResource)

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  // console.log(Vue.http.headers

  var element = document.getElementById('nestedform')
  if (element != null) {

    var team = JSON.parse(element.dataset.team)
    var players_attributes = JSON.parse(element.dataset.playersAttributes)
    players_attributes.forEach(function(player){ player._destroy = null})
    // 给team附加上数据。
    team.players_attributes = players_attributes

    var app = new Vue({
      el: element,
      data: function(){
        return { team: team}
      },
      methods: {
        addPlayer: function() {
          this.team.players_attributes.push({
            id: null,
            name: "",
            _destroy: null,
          })
        },
        removePlayer: function(index) {
          var player = this.team.players_attributes[index]
          // id是null，代表这个player是新增的，否则就是已经在数据库中存在的。
          if (player.id == null) {
            this.team.players_attributes.splice(index, 1)
          } else {
            // 发出请求中，表示删除这个player。
            // Team模块上加上选项： has_many :players, dependent: :destroy
            // 注意要在accepts_nested_attributes_for方法中增加allow_destroy: true.
            player._destroy = '1'
          }
        },
        undoRemovePlayer: function(index) {
          this.team.players_attributes[index]._destroy = null
        },
        saveTeam: function() {
          // 通过条件判断是create还是update已有team
          // Create a new team
          if (this.team.id == null) {
            this.$http.post('/teams', {team: this.team}).then(response => {
              // window.location = `/teams/${response.body.id}`
              // 也可以使用:
              Turbolinks.visit(`/teams/${response.body.id}`)
            }, response => {
              console.log(response)
            })
          // Edit an existing team
          } else {
            this.$http.put(`/teams/${this.team.id}`, {team: this.team}).then(response => {
              Turbolinks.visit(`/teams/${response.body.id}`)
            }, response => {
              console.log(response)
            })
          }
        }
      }
    })
  }
})
