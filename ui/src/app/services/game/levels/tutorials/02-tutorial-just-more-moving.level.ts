import { LEVELS } from "../all-level.model";

LEVELS.levels.push({
    "id": "just-more-moving",
    "name": "Tutorial - Just More Moving",
    "description": "Just some more moving. \nIt's super difficult :)",
    "ordinal": 2,
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
                "key": "free"
            },
            {
                "key": "free"
            },
            {
                "key": "free"
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
                "key": "wall"
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
                "key": "wall"
            },
            {
                "key": "free"
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
                "key": "wall"
            },
            {
                "key": "wall"
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
                "key": "wall"
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
    "startingCode": "//Go ahead and try this one yourself.\n//Hint: You have 4 basic movement functions:\n//Player.left(); \n//Player.right();\n//Player.up();\n//Player.down();",
    "finishingCode": "Player.up();\nPlayer.up();\nPlayer.up();\nPlayer.up();\nPlayer.right();\nPlayer.right();\nPlayer.right();\nPlayer.right();\nPlayer.down();\nPlayer.down();\nPlayer.left();\nPlayer.left();\nPlayer.down();\nPlayer.down();\nPlayer.right();\nPlayer.right();",
    "availableActions": [
        "move",
        'left',
        'right',
        'up',
        'down'
    ],
    "maxMoves": 16,
    "maxStamina": 999,
    "gridSize": 7,
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