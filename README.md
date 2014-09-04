domicile
========

Programmatic creation of DOM elements.

Vaguely similar to React's DOM bits.


Example:
--------

```javascript
var D = require('domicile').D

var todo = [
    {id: 3, done: false, task: "Buy milk"},
    {id: 6, done: false, task: "Pick up glasses"},
    {id: 4, done: true, task: "Write code"}
]
var item,
    current

var list = D.ol({class: 'todo_list'})

for(var i = 0, len = todo.length; i < len; i++) {
    current = todo[i]
    item = D.li({id: 'item-' + current.id, class: 'incomplete'}, current.task)

    if(todo[i].done) {
        item.attr('class', 'complete')
    }

    list.append(item)
}

// Rendering time!
list.render_html() // -> Gives an HTML string suitable for ``.innerHTML``
// ...or...
list.render_dom() // -> Gives a DOM elements suitable for ``.appendChild``
```


License
-------

**BSD**


API
---

### ``domicile.D``

A pre-built instance of ``domicile.Dom``. A convenient shortcut.

Like all instances of ``domicile.Dom``, this has a method per-HTML-tag
available on it, for easy creation of tags.

Example:

```javascript
var D = require('domicile').D

// Create a simple div.
var div_1 = D.div(null, "Hello, world!")

// Now with some attributes.
var div_2 = D.div({class: 'greeting', 'id': 'welcome_msg'}, "Hello!")
```


### ``domicile.Dom([tag_list], [delay_setup=false])``

Handles automatically setting up a variety of methods, one per-HTML-tag.

(Optionally) Accepts ``tag_list``, an array of strings of tag names. By
default, if nothing is provided, the default list of all HTML5 tags is used.

(Optionally) Accepts ``delay_setup``, a boolean. By default, this is considered
``false``, meaning setup is run immediately when creating a new instance.
Delaying setup is useful if you either want to conserve memory or avoid
automatically setting up all the various instance methods.

Example:

```javascript
var Dom = require('domicile').Dom

// Default params, all tags present as methods.
var dom_1 = new Dom()
var ul = dom_1.ul()
var li = dom_1.li({class: 'complete'}, "Done, son.")

// Overridden tags.
var dom_2 = new Dom(['p', 'a'])
// Only ``dom_2.p`` & ``dom_2.a`` are available as methods.
```


### ``domicile.Element(tag_name, [attributes], [children_or_content])``
