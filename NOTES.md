## Meteor Publications

Since Meteor Publications use `this`, they MUST be named functions. I.e:

```js
if (Meteor.isServer) {
  Meteor.publish('notebooks.mine', function notebooksPublication() {
    const { userId } = this;

    check(userId, String);

    return Notebooks.find({
      ownerId: userId,
    });
  });
}
```
