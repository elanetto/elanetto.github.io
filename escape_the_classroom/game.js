/* Denne koden er inspirert av denne videoen:
https://www.youtube.com/watch?v=R1S_NhKkvGA&ab_channel=WebDevSimplified
*/

/* Alle bildene jeg har brukt, er mine egne: Anette T. Hanssen. 
Alle bildene er tatt på Bakkeløkka Ungdomsskole, Nesodden.
*/

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const bodyEl = document.querySelector('body')

// bruker begrepet 'state' for å se hva man har i lommene.
let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    /* En If-test som sjekker om det er en img i TextNode. Den bytter til den img som er der */
    if('img' in textNode) {
        bodyEl.style.backgroundImage = `url(./images/${textNode.img})`
    }
    /* Dersom det ikke er en img i textNode, så beholder den det forrige bildet */

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button) 
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You enter the 9th grade base, but no one is there. The door locked behind you. What do you do?',
        img: 'start_here_9B.jpg',
        options: [
            {
                text: 'Explore the 9B classroom',
                nextText: 3
            },
            {
                text: 'Check your phone',
                setState: { deadPhone: true },
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Your phone is dead.',
        options: [
            {
                text: 'Explore classroom 9B',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'You found a note on a desk. What do you do?',
        img: 'explore_9B_classroom.jpg',
        options: [
            {
                text: 'Pick it up',
                setState: { secretNote: true},
                nextText: 4
            },
            {
                text: 'Ignore it',
                nextText: 5
            }
        ]

    },
    {
        id: 4,
        text: 'The note says: "B3 AW4RE OF TH3 SUBST1TUTE TEACHER!" You put the note in your pocket. Where do you go next?',
        options: [
            {
                text: 'Explore the lockers in 9B',
                nextText: 6
            },
            {
                text: 'Go to the 9C classroom.',
                nextText: 7
            }

        ]
    },
    {
        id: 5,
        text: 'You ignore the note. Where do you want to go next?',
        options: [
            {
                text: 'Explore the lockers in 9B',
                nextText: 6
            },
            {
                text: 'Explore somewhere else',
                nextText: 10
            },
        ]
    },
    {
        id: 6,
        text: 'Three of the lockers were unlocked. You found three objects. Which one do you grab?',
        img: 'three_lockers_are_unlocked.jpg',
        options: [
            {
                text: 'A can of coke',
                nextText: 8
            },
            {
                text: 'A pair of scissors',
                nextText: 9
            },
            {
                text: 'a key',
                setState: { key: true},
                nextText: 10
            },
            {
                text: 'grab them all!',
                nextText: 11
            },
            {
                text: 'Ignore them all. Explore somewhere else',
                nextText: 10
            },

        ]
    },
    {
        id: 7,
        text: 'You entered the 9C classroom. Where do you want to explore first?',
        img: '9C_classroom.jpg',
        options: [
            {
                text: 'The lockers',
                nextText: 12
            },
            {
                text: 'Look at the walls',
                nextText: 13
            },
            {
                text: 'Explore somewhere else',
                nextText: 10
            },
        ]
    },
    {
        id: 13,
        text: '"THE SUBSTITUTE TEACHER IS EVIL!" is written on the wall',
        img: 'the9c_wall.jpg',
        options: [
            {
                text: 'Continue exploring',
                nextText: 10
            }
        ]
    },
    {
        id: 8,
        text: 'You took the can of coke, and sipped it. It was POISONED. YOU DIED.',
        img: 'youdied.gif',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You cut yourself on the scissors, and there was no one there to give you a first aid plaster. YOU DIED.',
        img: 'youdied.gif',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'You cut yourself on the scissors, and you tried to soothe yourself by drinking the coke. The coke was toxic. YOU DIED.',
        img: 'youdied.gif',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
    },
    {
        id: 10,  /* HOVED MENYEN */
        text: 'Where do you go next?',
        img: 'inbetween.jpg',
        options: [
            {
            text: 'The 9C classroom',
            nextText: 7
            },
            {
            text: 'The kitchen area',
            nextText: 14
            },
            {
            text: 'The 9A classroom',
            nextText: 35
            },
            {
            text: 'The toilet',
            nextText: 31
            },
            {
            text: 'The 9B classroom',
            nextText: 3
            },
        ]
    },
    {
        id: 12,
        text: 'It seems like one of the lockers are unlocked, and there is a 4-digit code lock on an other one. What do you do?',
        img: '9C_lockers_closed.jpg',
        options: [
            {
            text: 'Open the unlocked locker',
            nextText: 15
            },
            {
            text: 'Try guessing the 4 digits on the locked locker',
            requiredState: (currentState) => currentState.secretNote,
            nextText: 17
            }
        ]
    },
    {
        id: 15,
        text: 'The locker was empty. What do you do?',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Try guessing the 4-digit code on the locked locker',
            requiredState: (currentState) => currentState.secretNote,
            nextText: 16
            },
            {
            text: 'Explore the 9C classroom',
            nextText: 7
            }
        ]
    },
    {
        id: 16,
        text: 'The locker was empty. What do you do?',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Have a look at the note you picked up earlier',
            requiredState: (currentState) => currentState.secretNote,
            nextText: 17
            },
            {
            text: 'Continue exploring',
            nextText: 10
            }
        ]
    },
    {
        id: 17,  /* Add guess the code game here */
        text: 'The note said "B3 AW4RE OF TH3 SUBST1TUTE TEACHER!" What 4-digit code will you use to open the locker? ',
        img: '9C_lockers_closed.jpg',
        options: [
            {
                text: 'Whatever. Continue exploring',
                nextText: 10
            },
            {
                text: '3134',
                nextText: 41
            },
            {
                text: '3431',
                nextText: 19
            },
            {
                text: '1334',
                nextText: 41
            },
        ]
    },
    {
        id: 41,  /* Add guess the code game here */
        text: 'WRONG CODE! Try again! The note said "B3 AW4RE OF TH3 SUBST1TUTE TEACHER!" What 4-digit code will you use to open the locker? ',
        img: '9C_lockers_closed.jpg',
        options: [
            {
                text: 'Whatever. Continue exploring',
                nextText: 10
            },
            {
                text: '3134',
                nextText: 41
            },
            {
                text: '3431',
                nextText: 19
            },
            {
                text: '1334',
                nextText: 41
            },
        ]
    },
    {
        id: 19,
        text: 'There is a powerbank inside the locker!',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Use the powerbank to charge your phone',
            requiredState: (currentState) => currentState.deadPhone,
            setState: { powerBank: true},
            setState: { phone: true},
            nextText: 20
            },
            {
            text: 'Put the powerbank in your pockets',
            setState: { powerBank: true},
            nextText: 10
            },
            {
            text: 'Ignore it, and move on',
            nextText: 10
            }
        ]
    },
    {
        id: 20,  /* Add pickture of phone in hand */
        text: 'Your phone is working again! What do you do?',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Text your friends',
            nextText: 21
            },
            {
            text: 'Call your mum',
            nextText: 22
            },
            {
            text: 'Call the substitute teacher',
            nextText: 23
            }
        ]
    },
    {
        id: 21,  /* Add pickture of phone in hand: Snap? */
        text: 'You snapped your friends. They are all laughing at you! "What are you doing at school?! We have the DAY OFF, you dingus!" They are sending you snaps of all the fun things that they are doing, while you are locked in at school. This is not helping. What do you do?',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Put away the phone and continue trying to find a way out.',
            nextText: 10
            },
            {
            text: 'Call your mum',
            nextText: 22
            },
            {
            text: 'Call the substitute teacher',
            nextText: 23
            }
        ]
    },
    {
        id: 22,  /* Add pickture of phone in hand: Calling mum */
        text: 'You tried calling your mum, but she is not answering her phone. She is probably working. What do you do?',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Put away the phone and continue trying to find a way out.',
            nextText: 10
            },
            {
            text: 'Text your friends',
            nextText: 21
            },
            {
            text: 'Call the substitute teacher',
            nextText: 23
            }
        ]
    },
    {
        id: 23,  /* Add pickture of phone in hand: calling the sub */
        text: 'You tried calling the substitute teacher. You can hear it RINGING all the way from classroom 9B! When did the substitute teacher get there?! What do you do?',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Stop the call, and run away and hide. QUICKLY!',
            nextText: 31
            },
            {
            text: 'Let it ring until the sub answers',
            nextText: 24
            },
        ]
    },
    {
        id: 14,
        text: 'The kitchen area looks.... like it always does. What do you do?',
        img: 'kitchen_area.jpg',
        options: [
            {
            text: 'Wait a minute! Maybe the key I found unlocks the cabinet above the sink?',
            requiredState: (currentState) => currentState.key,
            nextText: 30
            },
            {
            text: 'Explore somewhere else',
            nextText: 10
            }
        ]
    },
    {
        id: 30,
        text: 'The key fit! Do you want to make a cup of tea?',
        img: 'kitchen.jpg',
        options: [
            {
            text: 'Yes!',
            nextText: 32
            },
            {
            text: 'Nah',
            nextText: 10
            }
        ]
    },
    {
        id: 32,
        text: 'You made a cup of tea! You feel refreshed! :) ',
        img: 'cup.jpg',
        options: [
            {
            text: 'Ok, whatever',
            nextText: 10
            }
        ]
    },
    {
        id: 31,
        text: 'You entered the mens toilet. What do you do?',
        img: 'mens_toilet.jpg',
        options: [
            {
            text: 'Get the heck out of here',
            nextText: 10
            },
            {
            text: 'Have a closer look at one of the toilets',
            nextText: 33
            }
        ]
    },
    {
        id: 33,
        text: 'You entered one of the mens toilet. What do you do?',
        img: 'the_toilet.jpg',
        options: [
            {
            text: 'Get the heck out of here',
            nextText: 10
            },
            {
            text: 'Open the toilet ring',
            nextText: 34
            }
        ]
    },
    {
        id: 34,
        text: 'Hmmmm, ok. This is weird. Why are there numbers here? ...what do you do?',
        img: 'toilet_53.jpg',
        options: [
            {
            text: 'Write down the numbers "53", and continue exploring',
            setState: { numbersToilet: true},
            nextText: 10
            },
            {
            text: 'Ignore the numbers, and continue exploring',
            nextText: 10
            }
        ]
    },
    {
        id: 24,  /* Add pickture of phone in hand: calling the sub */
        text: 'The substitute teacher answers. You whisper "Hello?", but all you hear is breathing. What do you do?',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Stop the call, and run away and hide. QUICKLY!',
            nextText: 31
            },
            {
            text: 'Yell "HELLOOOOO?" into the phone',
            nextText: 25
            }
        ]
    },
    {
        id: 25,  /* Add pickture of phone in hand: calling the sub */
        text: 'The substitute teacher answers between her breaths. "Sorry... stairs.... woooah!" She gets her breath back, and asks "What can I do for you today?"',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Stop the call, and run away and hide. QUICKLY!',
            nextText: 31
            },
            {
            text: 'Tell her that you are locked in at school',
            nextText: 26
            },
            {
            text: 'You suddenly realise that she might be the one who locked you in! She might be EVIL! You whisper "...sorry... wring number" and hang up the phone. Hide in the bathroom!',
            nextText: 31
            }
        ]
    },
    {
        id: 26,  /* Add pickture of phone in hand: calling the sub */
        text: '"You are locked in at school!? How awful! Where are you? I will get you out right now!"',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Stop the call, and run away and hide. QUICKLY!',
            nextText: 31
            },
            {
            text: 'Tell her where you are',
            nextText: 27
            },
        ]
    },
    {
        id: 27,
        text: 'The substitute teacher explains that it is a teachers planning day, and that all students had the day off. She lets you out. YOU DID IT! ',
        img: 'the_school.jpg',
        options: [
            {
            text: 'Play again!',
            nextText: 1
            }
        ]
    },
    {
        id: 35,
        text: 'You entered the 9A classroom. What do you do?',
        img: '9A_classroom.jpg',
        options: [
            {
            text: 'Search the walls for clues',
            nextText: 36
            },
            {
            text: 'Search the 9A lockers',
            nextText: 37
            },
            {
            text: 'Explore somewhere else',
            nextText: 10
            },
        ]
    },
    {
        id: 36,
        text: 'There are loads of stuff on the walls. But, you noticed something odd. Someone have written "The last two digits are not here. But if you have them, the answer to everything is 42" What does it mean?',
        img: '9A_walls.jpg',
        options: [
            {
            text: 'Write down the numbers "42" as a clue',
            setState: { numbersFortyTwo: true},
            nextText: 35
            },
            {
            text: 'Ignore the numbers',
            nextText: 35
            },
        ]
    },
    {
        id: 37,
        text: 'All of the lockers re locked. There is one locker which can be opened with a 4-digit code. What do you do?',
        img: '9A_lockers.jpg',
        options: [
            {
            text: 'Use your clues to open it',
            requiredState: (currentState) => currentState.numbersToilet,
            requiredState: (currentState) => currentState.numbersFortyTwo,
            nextText: 38
            },
            {
            text: 'Keep on exploring',
            nextText: 10
            },
        ]
    },
    {
        id: 38,
        text: 'The clues you had found were the numbers "53" and "42". The last hint said that "the last two digits are not here" and that "42 was the answer to everything". What do you guess that the code is?',
        img: '9A_lockers.jpg',
        options: [
            {
            text: '3542',
            nextText: 39
            },
            {
            text: '4235',
            nextText: 39
            },
            {
            text: '4253',
            nextText: 40
            },
            {
            text: '5342',
            nextText: 39
            },
        ]
    },
    {
        id: 39,
        text: 'WRONG! Try again. The clues you had found were the numbers "53" and "42". The last hint said that "the last two digits are not here" and that "42 was the answer to everything". What do you guess that the code is?',
        img: '9A_lockers.jpg',
        options: [
            {
            text: '3542',
            nextText: 39
            },
            {
            text: '4235',
            nextText: 39
            },
            {
            text: '4253',
            nextText: 40
            },
            {
            text: '5342',
            nextText: 39
            },
        ]
    },
    {
        id: 40,  /* If they guess correctly on the code */
        text: 'There is a phone inside the locker! The phone has no power, though.',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Use the powerbank to charge your phone',
            requiredState: (currentState) => currentState.powerBank,
            setState: { phone: true},
            nextText: 20
            },
            {
            text: 'Put the dead phone in your pockets',
            setState: { deadPhone: true},
            nextText: 10
            },
            {
            text: 'Ignore it, and move on',
            nextText: 10
            }
        ]
    },
]

startGame()