var Element = require('./lib/element.js').Element

var Dom = function() {
  // FIXME: I'm not smart enough to meta-program this. :sadface:
  //        Look below for a crappier implementation.
  /*
  // Build up the available tags.
  for(var i = 0, len = this.SUPPORTED_TAGS.length; i < len; i++) {
    var tag_name = this.SUPPORTED_TAGS[i]
  }
  */
}

var cons = Dom
  , proto = cons.prototype

// TODO: Start with a small list & expand later.
proto.SUPPORTED_TAGS = [
    'div'
  , 'span'

  , 'h1'
  , 'h2'
  , 'h3'
  , 'h4'
  , 'h5'
  , 'h6'

  , 'p'
  , 'a'
  , 'img'

  , 'ul'
  , 'ol'
  , 'li'

  , 'dl'
  , 'dt'
  , 'dd'

  , 'form'
  , 'input'
  , 'textarea'
  , 'button'
]

// FIXME: Begin crappy implementation.
function create(tag_name) {
  return function(attributes) {
    var args = Array.prototype.slice.call(arguments, 1)
    var el = new Element(tag_name, attributes)

    for(var i = 0, len = args.length; i < len; i++) {
      el.append(args[i])
    }

    return el
  }
}

for(var i = 0; i < proto.SUPPORTED_TAGS.length; i++) {
  var tag_name = proto.SUPPORTED_TAGS[i]
  proto[tag_name] = create(tag_name)
}
// FIXME: End crappy implementation.

module.exports.Dom = Dom
module.exports.Element = Element
