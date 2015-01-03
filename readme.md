Scrolline.js
========================================

A jQuery plugin. Create a scroll line bar indicator on the page.

## Demonstration

* [Anthonyly.com/jquery.plugins/scrolline](http://anthonyly.com/jquery.plugins/scrolline)

## Documentation

### Basic Usage

Include scrolline.js file in the page, along with jQuery.

```html
<script src="js/jquery.js"></script>
<script src="js/scrolline.js"></script>
```

Then call ``$.scrolline();`` to launch the plugin.

### Options

You can apply a set of optional options:

* ``includeInitialScreen`` (Boolean) - Determines whether the scrolline will include the initial screen (default ``false``)
* ``direction`` (String) - Can be **vertical** or **horizontal** (default ``'horizontal'``)
* ``position`` (String) -  Define the position of the scrolline : **top** and **bottom** for the horizontal position, **left** or **right** for the vertical position (default ``top`` for horizontal and ``left`` for vertical)
* ``reverse`` (Boolean) - Revert the scrolline's direction (default ``false``)
* ``scrollEnd`` (Function) - Callback function to be executed at the end of scrolling
* ``styles`` (Object) - Styling of the scrollines
* ``styles.backColor`` (String) - Define the color of back's scrolline. The possible values are regular color values used in CSS like: ``#ffffff``, ``#fff``, ``rgb(255, 255, 255)`` or ``transparent``  (default ``'#ecf0f1'``)
* ``styles.frontColor`` (String) - Define the color of front's scrolline (default ``'#2ecc71'``)
* ``styles.opacity`` (Number) - Define alpha's scrolline, value must be between **0** and **1** (default ``1``)
* ``styles.weight`` (Number) - Define the width of the vertical scrolline (or the height of the horizontal) in pixels (default ``5``)
* ``styles.zIndex`` (Number) - Change the z-index value if needed (default ``10``)

### Example

Reverse scrolline with custom colors at the bottom of the screen:

```js
$.scrolline({
    reverse: true,
    position: 'bottom',
    styles: {
        backColor : '#2980b9',
        frontColor : '#f1c40f',
        weight : 12
    }
});
```

Vertical scrolline at the right side of the screen with a callback:

```js
$.scrolline({
    position: 'right',
    direction: 'vertical',
    styles: {
        weight: 30,
    },
    scrollEnd : function() {
		alert('End of scroll!');
	}
});
```

## Compatibility

* Safari
* Firefox
* Chrome
* IE
* Safari mobile

## Credits

### Author
[Alex Bondarev](http://alexbondarev.com)
You can find me on twitter [@skip405](http://twitter.com/skip405)

### Original idea
[Anthony Ly](http://anthonyly.com), on twitter [@Pik_at](http://twitter.com/pik_at)

### Licence
Licence MIT