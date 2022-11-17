let game = {
   lockMode: false,
   firstCard: null,
   secondCard: null,

   setCard: function(id){
      let card = this.cards.filter(card => card.id === id)[0]
      if(card.flipped || this.lockMode){
         return false
      }

      if(!this.firstCard){
         this.firstCard = card
         this.firstCard.flipped = true 
         return true
      }else{
         this.secondCard = card
         this.secondCard.flipped = true
         this.lockMode = true
         return true
      }
   },

   checkMatch: function(){
      let firstCardIconName = this.firstCard.icon
      let secondCardIconName = this.secondCard.icon
      if(!firstCardIconName || !secondCardIconName){
         return false;
      }
      return firstCardIconName === secondCardIconName
      // console.log(this.firstCard.icon)
      // console.log(this.secondCard.icon)
   },

   clearCards: function(){
      this.firstCard = null
      this.secondCard = null 
      this.lockMode = false
   },

   unflipCard: function(){
      this.firstCard.flipped = false
      this.secondCard.flipped = false
      this.clearCards()
   },

   checkGameOver: function(){
      return this.cards.filter(card => card.flipped).length == this.cards.length;
   },
   
   images : [
      'blocked',
      'divide',
      'export',
      'load',
      'phone',
      'power',
      'torta',
      'user'],

      cards : null,

      createCardsFromImages: function(){
         this.cards = []
      
         this.images.forEach((image) => {
            this.cards.push(this.createPairFromImage(image))
         })
      
         // for(let image of images){
         //    cards.push(createPairFromImage(image))
         // }
      
         this.cards = this.cards.flatMap(pair => pair)
         this.shuffleCards()
      },
      
      createPairFromImage: function(image){
         return[{
            id: this.createdIdWithImage(image),
            icon: image,
            flipped: false
         }, {
            id: this.createdIdWithImage(image),
            icon: image,
            flipped: false
         }]
      },
      
      createdIdWithImage: function(image){
         return image + parseInt(Math.random() * 1000)
      },

      
      shuffleCards: function(cards){
         let currentIndex = this.cards.length
         let randomIndex = 0
         
         while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
         }
   }

}