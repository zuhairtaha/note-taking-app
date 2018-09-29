# NoteTakingApp
Homework:
The problem for this time is similar to the challenge from last week, but with couple of added twists to challenge you, and also help revise some older concepts:
1. Create a REST API using Express or Node HTTP module for a Note taking application. Each `note` should have a `title`, `content` and `tags`.
2. You can add a fixed number of `tags` for the application, or you can have a separate resource to manage `tags`.
3. Create an HTML form to create/edit a note. It should take the `title`, and `content` as text fields and offer checkboxes for`tags` in the system.
4. Save the `notes` and/or `tags` in a JSON file.
5. Implement search by `tag`.
6. For added challenge, you can try and save each  `note` in a new file, and track the `notes` as a collection in a separate one. This will really help you revise async data-loading from the disk.
7. As another added challenge, you can choose to give an option to the user to persist the `note` on disk, or persist it to a remote server. (This of it as local storage or cloud-sync which you get in many apps). I have implemented a simple server, the kind of which you would make yourself at https://atomic-acrobat-217415.appspot.com/notes There's no put/delete and tag persistence, but basic posting, listing (all or by id) works. Think about how you would extend your model to keep a track of whether the `note` is saved on disk, or on the API, and how you can access it.

Have a good one guys, and ask for any help here :slightly_smiling_face:
