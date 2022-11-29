import { LEVELS } from './../all-level.model';

LEVELS.levels.push({
    "id": "tutorial-move",
    "name": "Movement Tutorial",
    "description": "A level that shows how to move the character around",
    "ordinal": 1,
    "board": [
        [
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "wall",
                "locked": true
            }
        ],
        [
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "player"
            },
            {
                "key": "free"
            },
            {
                "key": "free"
            },
            {
                "key": "wall",
                "locked": true
            }
        ],
        [
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "free"
            },
            {
                "key": "wall"
            },
            {
                "key": "free"
            },
            {
                "key": "wall",
                "locked": true
            }
        ],
        [
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "free"
            },
            {
                "key": "free"
            },
            {
                "key": "goal"
            },
            {
                "key": "wall",
                "locked": true
            }
        ],
        [
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "wall",
                "locked": true
            },
            {
                "key": "wall",
                "locked": true
            }
        ]
    ],
    "startingCode": "//This is where your code goes.\n//Once you write something, you can click \"play\"\n//And it will execute your code.\n\n//There is an object called `Player`.\n//This is you. You can move him using special \"functions\".\n//These functions look like this:\nPlayer.down();\nPlayer.down();\nPlayer.right();\nPlayer.right();\nPlayer.right();\n\n//Now click \"play\" and watch the old lady move!",
    "finishingCode": "Player.down();\nPlayer.down();\nPlayer.right();\nPlayer.right();\nPlayer.right();",
    "availableActions": [
        "move",
        'left',
        'right',
        'up',
        'down'
    ],
    "maxMoves": 5,
    "maxStamina": 0,
    "gridSize": 5,
    "icons": {
        "wall": {
            "key": "outdoor_garden",
            "name": "wall",
            "description": "An impassable object. Cannot be jumped or walked through"
        },
        "hole": {
            "key": "check_box_outline_blank",
            "name": "hole",
            "description": "An obstacle that needs to be jumped over."
        },
        "free": {
            "key": "texture",
            "name": "free",
            "description": "A free space that the player can stand on"
        },
        "goal": {
            "key": "flag",
            "name": "goal",
            "description": "The objective of the level",
            "max": 1
        },
        "enemy": {
            "key": "bug_report",
            "name": "enemy",
            "description": "An enemy that must be defeated in order to pass"
        },
        "player": {
            "key": "elderly_woman",
            "name": "player",
            "description": "The player's character",
            "max": 1
        },
        "key": {
            "key": "key",
            "name": "key",
            "description": "A key the player can collect to open a door. Can only be used once."
        },
        "closed door": {
            "key": "door_front",
            "name": "closed door",
            "description": "A closed door that is impassable without a key."
        },
        "opened door": {
            "key": "door_open",
            "name": "opened door",
            "description": "A door that has been opened with a key."
        }
    }
});