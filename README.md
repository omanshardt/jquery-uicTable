# uicTable

The plugin's purpose is a very simple but important one: **uicTable** keeps the header section of a table in place while scolling through the table. By doing this **uicTable** does not generate exessive overhaed and performs well on all modern browsers (Internet Explorer currently not supported, budge MS Edge works). The only browser that had some performance issues with the full implementation (Safari) is able to handle this task natively via css and therefore is not affected by this plugin with the exception of getting set a single css declaration for the **thead element** of the table.

**uicTable** supports all kind of table layouts: no matter if the table (or it's colums) has a fixed width or if it is totally flexible according to it's parent container or it's content, the fix header always works as expected. This is also true if the table exeeds the width of it's parent container and needs to be scrolled horizontally. The headers will always stay in place where they should be.

## How does it work?
in Safari things are simple: the **thead element** gets the new css declaration ``position: -webkit-sticky; top: 0px;`` what makes it stay in place without any further treatment. That's it! 

Other browsers currently do not support the new ``position:sticky`` css declaration even not with a vendor prefix or at least not on **thead** or **th elements** (Firefox). So in these browsers the plugin unfolds it's magic: the content of every **th element** gets wrapped into a **div element** that itself is placed within the **th element**. Instead of the original ``th -> content `` structure, the element's hierarchie is ``th -> div -> content`` after applying the plugin.
The **divs** get applied the most common css declarations from their parent's **th element**'s computed styles whereas these css rules will be reset to their initial values for the **th-elements** . This will work in a lot of cases. For more sophisticated layouts the set of considerd css declarations can be set in the plugin's config. See below for some hints how to specify these rules.

In a second step the table is wrapped into a **div** container that is placed within the initial table's parent element. Now when scrolling, the plugin tracks the ``scrollTop``-value and adjusts the ``top`` property of the divs in the opposite direction. Because the **divs** have ``position:relative`` applied, moving the divs does not affect any other sizing or placements. The original **th elements** do scroll out of view while the divs stay on their initial position.

## How to use?
- Download the plugin.
- Include jQuery and uicTable in your project
````javascript
<script src="path/to/file/jquery-1.10.1.min.js" type="text/javascript"></script>
<script src="path/to/file/uicTable.js" type="text/javascript"></script>
````

- Apply plugin to an html table.
````javascript
$('table').uicTable();
````
- That's it!.

If you want to provide some more css rules than the initial ones that should to be transferred from the **th elements** to the **divs** use the following config.
````javascript
$('table').uicTable({
    additionalCSS: ['height', 'text-align', …]
});
````
If you want to override the initial set of css rules that should to be transferred from the **th elements** to the **divs** use the following config.
````javascript
$('table').uicTable({
    css: ['height', 'text-align', …]
});
````

CSS rules that do inherit (i. e. ``color``) and don't break the layout don't need to be transferred, others (i. e. ``box-shadow``) need to be transferred to apply (only) on the divs. To find out the declaration's identifiers, a view into the computed styles within the developer's section of the browsers can help. For example it is not possible to transfer the ``border`` property by just providing ``border``. Instead it is needed to provide ``border-top``, ``border-right``, ``border-bottom``, ``border-left`` for Chrome, and ``border-top-width``, ``border-top-color``, ``border-top-style``, ``border-right-width``, ``border-right-color``, ``border-right-style``, ``border-bottom-width``, ``border-bottom-color``, ``border-bottom-style``, ``border-left-width``, ``border-left-color``, ``border-left-style`` for Chrome and Firefox.
## Author
Ole Manshardt