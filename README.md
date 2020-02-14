# Tracitor - a <a href="https://www.tracery.io/" target="_blank">Tracery</a> editor
### What is this?
An editor for <a href="https://www.tracery.io/" target="_blank">Tracery</a>, made with a simple UI.
### Installation
You can use this application by doing one of the following:
- Visit the <a href="https://theawesomefufuman.github.io/Tracitor/" target="_blank">web version</a> of the project
- Download the repository and open index.html
### Usage
#### JSON editor
The JSON editor works the same way as <a href="https://www.tracery.io/" target="_blank">Tracery</a> does. Fill in your Tracery grammar JSON object and click on '📖 Generate story'. The start symbol for the Tracery grammar is always 'origin', so make sure that you have a symbol called 'origin' that refers to the rest of your symbols for the application to work. The button titled '📋 Copy JSON to the clipboard' copies the JSON object to the clipboard for use and/or storage outside of this application.

#### Simple editor
The simple editor works in a similar way to the JSON editor. You create a symbol by giving it a title in the first field and a rules in the second field(separated by commas). To add another symbol, click the button titled '✔️ Add another symbol'. Once your symbols are all set up, you can put it all together in the big textarea below the symbol input fields by refering to the symbols by their name(s) surrounded with '#'s, e.g. #animal# for a symbol with the title 'animal'. Finally you click '📖 Generate story' to see the result. The button titled '📋 Copy JSON to the clipboard' copies the template for your current story to the clipboard for use and/or storage outside of this application. To import a saved story, paste the information in the JSON editor and click on '📖 Generate story'.

#### View generated story
Here you will see the result of the generated story that you have created. Click on '📋 Copy the story to the clipboard' to copy the story in the textarea. Click on '📖 Reroll story' to generate a new random story from the symbols that you have created in either the JSON editor or in the Simple Editor.

For a more extensive explanation on how to use Tracery within this editor, either visit the <a href="https://github.com/galaxykate/tracery/" target="_blank">Tracery Github page</a> or this <a href="http://www.crystalcodepalace.com/traceryTut.html" target="_blank">Tracery turorial</a>.

### Contact
You can reach me at tracitor[dot]contact[at]gmail[dot]com
### Acknowledgments
I would like to thank the authors of the following technologies. Without them, this small project would not be possible.
 - <a href="https://www.tracery.io/" target="_blank">Tracery</a>
 - <a href="https://jquery.com/" target="_blank">JQuery</a>
 - <a href="https://jsonlint.com/" target="_blank">jsonlint.com</a>
 - <a href="https://github.com/lgarron/clipboard-polyfill" target="_blank">clipboard-polyfill</a>
 - <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>
 - <a href="https://beautifier.io/" target="_blank">beautifier.io</a>
 
### Background image
<a href="https://commons.wikimedia.org/wiki/File:Lower_Manhattan_from_Jersey_City_November_2014_panorama_3.jpg" target="_blank">Wikimedia Commons</a>
### License
> MIT License
> 
> Copyright (c) 2020 theAwesomeFufuman
> 
> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> "Software"), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:
> 
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
