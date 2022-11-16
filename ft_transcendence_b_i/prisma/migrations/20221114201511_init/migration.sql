-- CreateTable
CREATE TABLE "Player" (
    "player_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://i.imgur.com/1DmPoeh.png',
    "is_playing" BOOLEAN NOT NULL DEFAULT false,
    "wines" INTEGER NOT NULL DEFAULT 0,
    "loses" INTEGER NOT NULL DEFAULT 0,
    "authentification_token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "game_history" (
    "id_game_history" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "winner_id" INTEGER NOT NULL,
    "winner_scoor" INTEGER NOT NULL,
    "looser_id" INTEGER NOT NULL,
    "losser_scoor" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "game_history_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "Player" ("player_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_history_looser_id_fkey" FOREIGN KEY ("looser_id") REFERENCES "Player" ("player_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chatroom" (
    "chat_room_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ischannel" BOOLEAN NOT NULL,
    "ispublic" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "message" (
    "message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,
    CONSTRAINT "message_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Player" ("player_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chatroom" ("chat_room_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "membership" (
    "id_membership" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "rool" TEXT NOT NULL,
    CONSTRAINT "membership_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("player_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "membership_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chatroom" ("chat_room_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "relation" (
    "id_relation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player1_id" INTEGER NOT NULL,
    "player2_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "relation_player1_id_fkey" FOREIGN KEY ("player1_id") REFERENCES "Player" ("player_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "relation_player2_id_fkey" FOREIGN KEY ("player2_id") REFERENCES "Player" ("player_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Player_authentification_token_key" ON "Player"("authentification_token");
