## Listerous ##

### Feature overview ###

Listerous is an application for creating simple lists, and collaborating on them with other users. It's powered by Firebase, so the code here is just a front-end, and all lists are stored on the Firebase servers. Each list has a unique URL, and creating a new one (using the create new button from the interface) generates a random URL and your list is henceforth accessible with that ID. Also, by navigating to listero.us/whatever, you can either create or access a list with the ID "whatever". When you view a list, it's identity is stored in a browser cookie, so you can view an index of your most recently viewed 10 lists from the history page (sorted by recency of access). Listerous has been tested in a majority of modern desktop browsers, and is designed to function just as well on iOS, and hopefully other mobile browsers.

### Security ###

More or less irrelevant. Listerous doesn't maintain any user state, so your lists are technically public. However, as the great Professor X has said, "anonymity will be the first line of defense" -- it's practically impossible that someone else will guess your list's ID hash, unless you create lists with common IDs (e.g. listero.us/test). In the Firebase I'm using behind my deployment of Listerous, I have the ruleset:

```
{
  "rules": {
    ".read": false,
    ".write": false,
    "lists": {
      ".read": false,
      ".write": true,
      "$list": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

This ensures that new lists can be created and modified within the untouchable "lists" structure, but a directory of existing lists cannot be read from an API endpoint. And you can only delete/modify lists if you have their ID, so we should be set.

### Coming eventually ###

*   __Better iPad formatting.__ Listerous thinks your iPad is an iPhone, so the interface is huge. It shouldn't be difficult to format as if the site was being viewed from a desktop browser...
*   __A more flashy history page.__ What I have now works and looks okay, but there's always room for a little more swag.
*   __Highlighting fields on click?__ This feature is built in already and ready to deploy with the change of a variable, but I can't decide if it's the right thing to do. If you have an opinion, let me know.
*   __Built in sharing options,__ i.e. click this to email, tweet, post, whatever your list.
*   __Your ideas!__ Listerous is open source, so feel free to re-implement or re-deploy at will, or hit me up with your ideas and I'll probably see fit to implement them.