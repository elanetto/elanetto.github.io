/* Denne koden er inspirert av denne videoen:
https://www.youtube.com/watch?v=R1S_NhKkvGA&ab_channel=WebDevSimplified
*/

/* All images used are my own: Anette T. Hanssen. 
The images were all taken at Bakkeløkka Secondary School.
*/

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const bodyEl = document.querySelector('body')

// use the term 'state' to determind what is in the pockets.
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
                text: 'Go to the 9C classroom.',
                nextText: 7
            }
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
            }

        ]
    },
    {
        id: 7,
        text: 'You entered the 9C classroom. Where do you want to explore first?',
        options: [
            {
                text: 'The lockers',
                nextText: 12
            },
            {
                text: 'Look at the walls',
                nextText: 13
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
        id: 10,
        text: 'You put the key in your pocket. Where do you go next?',
        options: [
            {
            text: 'The 9C classroom',
            nextText: 7
            },
            {
            text: 'The kitchen area',
            nextText: 14
            }
        ]
    },
]

startGame()