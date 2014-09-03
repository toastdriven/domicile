var test = require('tape')
document = require("jsdom").jsdom()

var Dom = require('../index.js').Dom


test('Element tests', function (t) {
  var D = new Dom()

  var todo = [
      {id: 3, done: false, task: "Buy milk"}
    , {id: 6, done: false, task: "Pick up glasses"}
    , {id: 4, done: true, task: "Write code"}
  ]
  var item
    , current

  var list = D.ol({class: 'todo_list'})

  for(var i = 0, len = todo.length; i < len; i++) {
    current = todo[i]
    item = D.li({id: 'item-' + current.id, class: 'incomplete'}, current.task)

    if(todo[i].done) {
      item.attr('class', 'complete')
    }

    list.append(item)
  }

  // Test rendering.
  var html = list.render_html()
  t.equal(html, '<ol class="todo_list"><li id="item-3" class="incomplete">Buy milk</li><li id="item-6" class="incomplete">Pick up glasses</li><li id="item-4" class="complete">Write code</li></ol>')
  var el = list.render_dom()
  t.equal(el._tagName, 'ol')
  t.equal(el.children[0].innerHTML, 'Buy milk')

  t.end()
})
