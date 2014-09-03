var Element = require('./element.js').Element

SUPPORTED_TAGS = [
    'div'
  , 'span'

  , 'h1'
  , 'h2'
  , 'h3'
  , 'h4'
  , 'h5'
  , 'h6'

  , 'header'
  , 'nav'
  , 'section'
  , 'article'
  , 'details'
  , 'figure'
  , 'figcaption'
  , 'picture'
  , 'menu'
  , 'menuitem'
  , 'meter'
  , 'progress'
  , 'summary'
  , 'time'
  , 'footer'

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
  , 'select'
  , 'option'
  , 'optgroup'
  , 'button'
  , 'label'
  , 'fieldset'
  , 'legend'

  , 'table'
  , 'thead'
  , 'tbody'
  , 'tfoot'
  , 'tr'
  , 'th'
  , 'td'

  , 'abbr'
  , 'acronym'
  , 'blockquote'
  , 'address'
  , 'aside'
  , 'caption'
  , 'code'
  , 'q'
  , 'samp'
  , 'var'
  , 'output'

  , 'hr'
  , 'br'

  , 'strong'
  , 'em'
  , 'b'
  , 'i'
  , 'u'
  , 's'
  , 'strike'
  , 'del'
  , 'sup'
  , 'sub'
  , 'pre'
  , 'area'
  , 'ins'
  , 'map'
  , 'mark'
  , 'small'
  , 'wbr'

  , 'canvas'
  , 'object'
  , 'param'
  , 'audio'
  , 'embed'
  , 'iframe'
  , 'video'
]

var Dom = function(tag_list, delay_setup) {
  this.AVAILABLE_TAGS = tag_list || SUPPORTED_TAGS

  if(delay_setup !== true) {
    this._setup()
  }
}

var cons = Dom
  , proto = cons.prototype

proto._setup = function() {
  // Setup all the various tags.
  for(var i = 0; i < this.AVAILABLE_TAGS.length; i++) {
    this._create(this.AVAILABLE_TAGS[i])
  }
}

proto._create = function(tag_name) {
  this[tag_name] = function() {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift(tag_name)

    var El = function() {
      Element.apply(this, args)
    }

    El.prototype = Object.create(Element.prototype)
    El.prototype.constructor = El

    var el = new El()
    return el
  }
}

module.exports.Dom = Dom
