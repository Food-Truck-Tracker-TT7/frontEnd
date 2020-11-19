import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-weight: inherit;
	font-style: inherit;
	font-size: 100%;
	font-family: inherit;
	vertical-align: baseline;
}

:focus {
	outline: 0;
}
body {
	line-height: 1;
	color: black;
	background: white;
}
ol, ul {
	list-style: none;
}

table {
	border-collapse: separate;
	border-spacing: 0;
}
caption, th, td {
	text-align: left;
	font-weight: normal;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: "";
}
blockquote, q {
	quotes: "" "";
}

html {
    font-size: 65.2%;
}

body {
	background-color: ${props => props.theme.backgroundColor}
}

.search {
  position: absolute;
  top: 10rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 10;
}

.search input {
  padding: 0.5rem;
  font-size: 1.5rem;
  width: 100%;
}

.locate {
  position: absolute;
  top: 10rem;
  right: 1rem;
  background: white;
  border: 1px solid black;
  z-index: 10;
  cursor: pointer;
}
.searchResults {
  background-color: white;
  border: 1px solid black;
  margin: 0;
  font-size: 1.6rem;
  li {
	  cursor: pointer;
  }
}


`;

export default GlobalStyles;
