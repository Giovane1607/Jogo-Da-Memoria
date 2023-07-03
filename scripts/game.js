let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    apps: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'JavaScript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    setCard: (id) => {
        let card = game.cards.filter((card) => card.id === id)[0];
        console.log(card);
        if (card.flipped || game.lockMode) {
            return false;
        }

        if (!game.firstCard) {
            game.firstCard = card;
            game.firstCard.flipped = true
            return true;
            
        } else {
            game.secondCard = card;
            game.secondCard.flipped = true
            game.lockMode = true;
            return true;
        }
    },

    checkMatch: () => {
        if (!game.firstCard || !game.secondCard){
            return false;
        } 
            return game.firstCard.icon === game.secondCard.icon;
    },

    clearCards: () => {
        game.firstCard = null;
        game.secondCard = null;
        game.lockMode = false;
    },

    unflipCards: () =>{
        game.firstCard.flipped = false;
        game.secondCard.flipped = false;
        game.clearCards();
    },

    checkGameOver(){
        
      return  game.cards.filter(card=>!card.flipped).length == 0;

    },


    cards: null,

    createCardsFromApps: () => {
        game.cards = [];

        game.apps.forEach((app) => {
            game.cards.push(game.createPairFromApp(app));
        });

        game.cards = game.cards.flatMap((pair) => pair);
        game.shuffleCards();
        return game.cards;
    },

    createPairFromApp: (app) => {
        return [
            {
                id: game.createIdWithApp(app),
                icon: app,
                flipped: false,
            },
            {
                id: game.createIdWithApp(app),
                icon: app,
                flipped: false,
            },
        ];
    },

    createIdWithApp: (app) => {
        return app + parseInt(Math.random() * 1000);
    },

    shuffleCards: () => {
        let currentIndex = game.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [game.cards[randomIndex], game.cards[currentIndex]] = [
                game.cards[currentIndex],
                game.cards[randomIndex],
            ];
        }
    },
};

