db = db.getSiblingDB("message-board");
db.createCollection("test");
db.createUser({
  user: "messageBoard",
  pwd: "messageBoard",
  roles: [
    {
      role: "readWrite",
      db: "message-board",
    },
  ],
});
