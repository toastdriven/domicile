domicile
========

Programmatic creation of DOM elements.

Vaguely similar to React's DOM bits.


Example:
--------

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


License
-------

**BSD**
