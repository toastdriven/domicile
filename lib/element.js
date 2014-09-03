var Element = function(tag_name, attributes) {
  var args = Array.prototype.slice.call(arguments, 2)
  var err

  this.tag_name = tag_name || 'div'
  this.attributes = attributes || {}
  this.content = null
  this.children = []

  if(args.length > 0 ) {
    if(args.length === 1 && typeof args[0] === 'string') {
      this.content = args[0]
    } else {
      for(var i = 0, len = args.length; i < len; i++) {
        err = this.append(args[i])

        if(err) {
          return "You must provide a collection of elements."
        }
      }
    }
  }
}

var cons = Element
  , proto = cons.prototype

proto.toString = function() {
  return '<' + this.tag_name + ': ' + JSON.stringify(this.attributes) + '>'
}

proto.verify_child = function(el) {
  if(! el.render_dom) {
    return "'append' received a non-Element argument"
  }

  return null
}

proto.append = function(el) {
  if(typeof el === 'string') {
    this.content = el
    return null
  }

  var err = this.verify_child(el)

  if(err) {
    return err
  }

  this.children.push(el)
  return null
}

proto.insert = function(el, offset) {
  var err = this.verify_child(el)

  if(err) {
    return err
  }

  this.children.splice(offset, 0, el)
  return null
}

proto.remove = function(offset) {
  this.children.splice(offset, 1)
  return null
}

proto.clear = function() {
  this.content = null
  this.children = []
  return null
}

proto.attr = function(key, value) {
  this.attributes[key] = value
  return null
}

proto.render_dom = function() {
  var el = document.createElement(this.tag_name)
  var attr_keys = Object.keys(this.attributes)
  var child
  var key

  for(var i = 0, len = attr_keys.length; i < len; i++) {
    key = attr_keys[i]

    if(key === 'class') {
      el.className = this.attributes[key]
    } else if(this.attributes.hasOwnProperty(key)) {
      el[key] = this.attributes[key]
    }
  }

  if(this.content !== null) {
    var text = document.createTextNode(this.content)
    el.appendChild(text)
  }

  for(var i = 0, len = this.children.length; i < len; i++) {
    child = this.children[i]
    el.appendChild(child.render_dom())
  }

  return el
}

proto.render_html = function() {
  var el = this.render_dom()
  return el.outerHTML
}

module.exports.Element = Element
