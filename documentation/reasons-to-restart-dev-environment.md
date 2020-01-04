# Reasons you will likely need to restart the dev environemnt

Some changes made to author-facing content will update automatically. Others will not, and you will have to restart the task. The following is a non-exhaustive list of reasons you will likely find yourself in the latter position.

* Changed a font or font subset setting.
* Updated an Ink file. These should generally work well, but they will likely restart entirely, or perhaps in some cases not update at all.
* Added, renamed, or removed a passage, header, footer, or plugin.
* Altered a plugin which renders content. (It is possible that no plugin updates do hot reloading at present. Todo: investigate.)
* Altered a template file (in `templates/`).
* Altered any of the configuration or scripting in `config/`.
* Updated a package.
* Edited or instrumented an external dependency (e.g. a package in `node_modules/`).

More will be added to this page as needed.
