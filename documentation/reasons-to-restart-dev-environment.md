# Reasons you will likely neing to restart the dev environemnt

Some changes made to author-facing content will update automatically. Others will not, and you will have to restart the task. The following is a non-exhaustive list of reasons you will likely find yourself in the latter position.

* Changing a font setting.
* Updating an Ink file. These should generally work well, but they will likely restart entirely, or perhaps in some cases not update at all.
* Adding, renaming, or removing a passage, header, footer, plugin, or Ink mutator.
* Altering a template file (in `templates/`).
* Altering any of the configuration or scripting in `config/`. This does not include `accelerator.config.js`.
* Updating or instrumenting an external dependency (e.g. a package in `node_modules/`).

More will be added to this page as needed.
