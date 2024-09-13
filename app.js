function getRandomValue(maxHealth , minHealth ){
    return Math.floor(Math.random()*(maxHealth-minHealth)) + minHealth ;
  };

const app = Vue.createApp({
    data() {
      return { 
        monsterHealth: 100,
        playerHealth: 100,
        currentRound: 0,
        winner: null,
        logMessages:[]
      };
    },
    watch:{
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <=0 ){
                this.winner = "draw";
                return;
            }
            else if(value <= 0){
                this.winner="player";
                this.monsterHealth = 0;
                return;
            }

        },
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <=0 ){
                this.winner = "draw";
                return;
            }
            else if(value <= 0){
                this.winner="monster";
                this.playerHealth = 0;
                return;
            }
        }
    },
    computed:{
        monsterBarStyle(){
            return {width: this.monsterHealth +'%' }
        },
        playerBarStyle(){
            return {width: this.playerHealth +'%' }
        },
        specialAttackAvailable(){
            return this.currentRound % 3 !== 0
        }
    },
    methods:{
        startNewGame(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = []
        },
        surrender(){
            this.winner = "monster"
        }
        ,
        attackMonster(){
            this.currentRound++;
            let attackValue =  getRandomValue(12,5);
            this.addlogMessages("player", "attack", attackValue)
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            let attackValue =  getRandomValue(15,8);
            this.addlogMessages("monster", "attack", attackValue)
            this.playerHealth -= attackValue;
        },
        specialAttack(){
            this.currentRound++;
            let attackValue =  getRandomValue(10,25);
            this.addlogMessages("player", "attack", attackValue)
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            if(this.playerHealth >100) return;
            let healValue =  getRandomValue(8,20);
            this.addlogMessages("player", "heal", healValue)
            this.playerHealth += healValue;
            this.attackPlayer();
        },
        addlogMessages(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })

        }
    }
  });
  

  app.mount('#game');