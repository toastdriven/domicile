var D = require('./index.js').D
var Element = require('./lib/element.js').Element

var login = new Element('form', {method: 'POST', action: '#'}
  , new Element('input', {'type': 'text', 'id': 'login_username', 'class': 'big'})
  , new Element('input', {'type': 'submit', 'value': 'Login'})
)

var alt = D.form({method: 'POST', action: '#'}
  , D.input({'type': 'radio', 'value': 'yes'}, "Yes")
  , D.input({'type': 'radio', 'value': 'no'}, "No")
  , D.input({'type': 'submit', 'value': 'Like it?'})
)

document.onreadystatechange = function() {
  var via_inner = document.getElementById('via_innerHTML')
  via_inner.innerHTML = login.render_html()

  var via_dom = document.getElementById('via_dom')
  var like_form = alt.render_dom()
  via_dom.appendChild(like_form)
}
