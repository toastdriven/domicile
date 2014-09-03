var test = require('tape')
document = require("jsdom").jsdom()

var Element = require('../lib/element.js').Element


test('Element tests', function (t) {
  var div = new Element('div', null, "Hello, world!")
  var login = new Element('form', {method: 'POST', action: '#'}
    , new Element('input', {type: 'text', id: 'login_username', 'class': 'big'})
    , new Element('input', {type: 'submit', 'value': 'Login'})
  )

  // Test basic initialization.
  t.equal(div.tag_name, 'div')
  t.deepEqual(div.attributes, {})
  t.equal(div.content, 'Hello, world!')
  t.equal(div.children.length, 0)

  // Test advanced initialization.
  t.equal(login.tag_name, 'form')
  t.deepEqual(login.attributes, {method: 'POST', action: '#'})
  t.equal(login.content, null)
  t.equal(login.children.length, 2)
  var child_1 = login.children[0]
  t.equal(child_1.tag_name, 'input')
  t.deepEqual(child_1.attributes, {type: 'text', id: 'login_username', 'class': 'big'})
  t.equal(child_1.content, null)
  t.equal(child_1.children.length, 0)
  var child_2 = login.children[1]
  t.equal(child_2.tag_name, 'input')
  t.deepEqual(child_2.attributes, {type: 'submit', value: 'Login'})
  t.equal(child_2.content, null)
  t.equal(child_2.children.length, 0)

  // Test appending.
  var todo = [
      {id: 3, done: false, task: "Buy milk"}
    , {id: 6, done: false, task: "Pick up glasses"}
    , {id: 4, done: true, task: "Write code"}
  ]
  var item
    , current

  var list = new Element('ol', {class: 'todo_list'})
  t.equal(list.children.length, 0)

  for(var i = 0, len = todo.length; i < len; i++) {
    current = todo[i]
    item = new Element('li', {id: 'item-' + current.id, class: 'incomplete'}, current.task)

    if(todo[i].done) {
      item.class = 'complete'
    }

    list.append(item)
  }

  t.equal(list.children.length, 3)

  // Test inserting.
  var new_item = item = new Element('li', {id: 'item-' + current.id, class: 'incomplete'}, 'Make another todolist app')
  list.insert(new_item, 1)
  t.equal(list.children.length, 4)
  t.equal(list.children[0].content, 'Buy milk')
  t.equal(list.children[1].content, 'Make another todolist app')
  t.equal(list.children[2].content, 'Pick up glasses')
  t.equal(list.children[3].content, 'Write code')

  // Test removing.
  list.remove(2)
  t.equal(list.children.length, 3)
  t.equal(list.children[0].content, 'Buy milk')
  t.equal(list.children[1].content, 'Make another todolist app')
  t.equal(list.children[2].content, 'Write code')

  // Test clearing.
  var clear_list = new Element('ul', null
    , new Element('li', null, "whatever")
    , new Element('li', null, "not for long")
  )
  t.equal(clear_list.children.length, 2)
  clear_list.clear()
  t.equal(clear_list.content, null)
  t.equal(clear_list.children.length, 0)

  // Test setting attributes.
  var crazy_input = new Element('input')
  t.deepEqual(crazy_input.attributes, {})
  crazy_input.attr('type', 'text')
  crazy_input.attr('data-id', 'thing-1')
  crazy_input.attr('value', 'test test')
  t.deepEqual(crazy_input.attributes, {
      'type': 'text'
    , 'data-id': 'thing-1'
    , 'value': 'test test'
  })

  // Test basic DOM rendering.
  var div_el = div.render_dom()
  t.equal(div_el._tagName, 'div')
  t.equal(div_el.innerHTML, 'Hello, world!')
  var username_el = child_1.render_dom()
  t.equal(username_el._tagName, 'input')
  t.equal(username_el.className, 'big')
  t.equal(username_el.innerHTML, '')

  // Test basic HTML rendering.
  t.equal(div.render_html(), "<div>Hello, world!</div>")
  t.equal(child_1.render_html(), '<input type="text" id="login_username" class="big">')
  t.equal(child_2.render_html(), '<input type="submit" value="Login">')
  t.equal(list.render_html(), '<ol class="todo_list"><li id="item-3" class="incomplete">Buy milk</li><li id="item-4" class="incomplete">Make another todolist app</li><li id="item-4" class="incomplete">Write code</li></ol>')

  // Test advanced HTML rendering.
  // FIXME: Unfortunately, due to a bug (?), jsdom can't handle the
  //        ``.outerHTML`` call here. This works in browser, as can be seen by
  //        running ``browserify test.js -o bundle.js``, then checking the
  //        ``test.html`` file in browser.
  // t.equal(login.render_html(), '<form method="POST" action="#"><input type="text" id="login_username" class="big"><input type="submit" value="Login"></form>')

  t.end()
})
