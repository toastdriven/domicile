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
available (85 tags currently) on it, for easy creation of tags.

**Example:**

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

**Example:**

```javascript
var Dom = require('domicile').Dom

// Default params, all tags present as methods.
// Note: You must use ``new`` here to instantiate the class.
var dom_1 = new Dom()
var ul = dom_1.ul()
var li = dom_1.li({class: 'complete'}, "Done, son.")

// You can check what tags are available.
console.log(dom_1.AVAILABLE_TAGS)
// Returns: ['div', 'span', ...]

// Overridden tags.
var dom_2 = new Dom(['p', 'a'])
// Only ``dom_2.p`` & ``dom_2.a`` are available as methods.
```


### ``domicile.Element(tag_name, [attributes], [children_or_content])``

The main class of Domicile, this handles creating HTML elements. The same
class handles all different forms of tags.

Requires a ``tag_name`` argument, which should be a string of the tag name.
Ex. ``'div'``, ``'ul'``, ``'a'``, etc.

(Optionally) Accepts an ``attributes`` argument, which should be either
``null`` (no custom attributes) or an ``object`` with keys as the attribute
names & values as the attribute values.

(Optionally) Accepts a ``children_or_content`` argument. If provided, two
things are accepted. If a plain string is provided, that string will become
the text in the element. Alternatively, you can provide 1-N ``Element`` objects,
which become the child elements.

**Example:**

```javascript
var Element = require('domicile').Element

// The simplest form, an empty div: ``<div></div>``
var just_a_div = new Element('div')

// A plain paragraph: ``<p>Hello!</p>``
var plain_para = new Element('p', null, 'Hello!')

// A complex form element: ``<input type="text" name="username" class="big login">``
var username = new Element('input', {type: 'text', name: 'username', class: 'big login'})

// A ordered list with several elements: <ol rel="todo"><li data-complete="true">Buy milk</li><li data-complete="false">Write docs</li></ol>
var todo = new Element('ol', {rel: 'todo'}
  , new Element('li', {'data-complete': 'true'}, 'Buy milk')
  , new Element('li', {'data-complete': 'false'}, 'Write docs')
)
```

#### ``Element`` Methods

##### ``Element.append(el)``

Appends an ``Element`` to the end of the children on an element.

**Example:**

```javascript
var Element = require('domicile').Element
var div = new Element('div')

var welcome = new Element('span', {class: 'welcome'}, 'Welcome, ' + username + '!')
div.append(welcome)
```

##### ``Element.insert(el, offset)``

Inserts an ``Element`` at a given position within the children on an element.

**Example:**

```javascript
var Element = require('domicile').Element
var ul = new Element('ul', null
  , new Element('li', null, 'First')
  , new Element('li', null, 'Third')
)

var second = new Element('li', null, 'Second')
ul.insert(second, 1)
```

##### ``Element.remove(offset)``

Removes a specific child ``Element`` on an element.

**Example:**

```javascript
var Element = require('domicile').Element
var ul = new Element('ul', null
  , new Element('li', null, 'First')
  , new Element('li', null, 'Third')
)

ul.remove(1)
```

##### ``Element.clear()``

Clears all children & content on an element.

**Example:**

```javascript
var Element = require('domicile').Element
var ul = new Element('ul', null
  , new Element('li', null, 'First')
  , new Element('li', null, 'Third')
)

ul.clear()
// Now equivalent to ``new Element('ul')``
```

##### ``Element.attr(key, value)``

Adds/updates an attribute on an element.

**Example:**

```javascript
var Element = require('domicile').Element
var div = new Element('div')

div.attr('id', 'test')
div.attr('class', 'yup')

// Manually set the content after the fact.
div.content = 'Test message'
```

##### ``Element.render_dom()``

Renders an element as a native DomElement(s).

**Example:**

```javascript
var Element = require('domicile').Element
var ul = new Element('ul', null
  , new Element('li', null, 'First')
  , new Element('li', null, 'Third')
)

var el = ul.render_dom()

// Now you can append elsewhere...
var parent = document.getElementById('something')
parent.appendChild(el)
```

##### ``Element.render_html()``

Renders an element as HTML text, suitable for ``.innerHTML``.

**Example:**

```javascript
var Element = require('domicile').Element
var ul = new Element('ul', null
  , new Element('li', null, 'First')
  , new Element('li', null, 'Third')
)

var html = ul.render_html()
console.log(html)
// Returns: "<ul><li>First</li><li>Third</li></ul>"

// Now you can insert it elsewhere...
var parent = document.getElementById('something')
parent.innerHTML = html
```
