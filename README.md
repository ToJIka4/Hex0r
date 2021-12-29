# Hex0r

Hex0r is some simple javascript that shows a hex viewer for binary or non-binary data. 

# Example

![alt tag](http://raw.github.com/gratajik/Hex0r/master/help/example_screenshot.PNG)

# Options

All parameters should be on a div of class "hex04window".  Data attributes are used to control it.

Example
```` html
<div class="hex0rwindow" data-row-width="16" data-word-size="1" data-row-break="8"
        data-trim="true" data-base64="true" data-caption="Hex0r Example - base 64 file"
        data-highlights="" data-show-line-nums="true">
       Some data to show in the viewer
</div>
````

*  **row_width** The number of bytes to show per row
*  **word-size** The word size to show. Allows you to show the binary data in 1, 2 or 4 (or more) byte groups.
*  **row-break** Break between groups
*  **trim** Trim whitespace
*  **base64** Base 64 decode the data in the div (if false, will show exactly that is in the div)
*  **caption** The bottom caption for the viewer
*  **highlights** Highlight areas of the viewer hex
*  **show-line-nums** Determines parts of the binary data to be highlighted. This string takes the format of a comma separated list of values where each highlight is a tuple of 4 values: start_offset:end_offset:color:description. For example, here is a single highlight:
4:20:#F4FA58:This is an interesting part
And here is a list of two highlights:
4:20:#F4FA58:This is an interesting part,36:56:#54FAF8:This is another interesting part 
*  **offset** The start address of data. Affects the start offset and shifts first line

# Usage

Take a look at hex04_example.html for the sample.

You will need to include jquery
``` html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js" type="text/javascript"></script>
````

Include the style sheet 
``` html
<link rel="stylesheet" type="text/css" href="hex0r.css" />
````

Create a **div** for class **hex04rwindow**, fill out the params, and, inside the div, include the data you would like to show the viewer.  Any number of viewers can be on a page.

``` html
<div class="hex0rwindow" data-row-width="16" data-word-size="1" data-row-break="8"
    data-trim="true" data-base64="true" data-caption="Hex0r Example - base 64 file, with highlighting"
    data-highlights="16:17:#F4FA58:Initial value of SP register,128:152:#54FAF8:Portable Executable signature and header"
    data-show-line-nums="true" title="">
    /9j/4AAQSkZJRgABAQEASABIAAD/4RzmRXhpZgAATU0AKgAAAAgADAEPAAIAAAAJ AAAAngEQAAIAAAAQAAAAqAESAAMAAAABAAEAAAEaAAUAAAABAAAAuAEbAAUAAAAB
    AAAAwAEoAAMAAAABAAIAAAExAAIAAAAvAAAAyAEyAAIAAAAUAAAA+AITAAMAAAAB AAIAAIKYAAIAAAAFAAABDIdpAAQAAAABAAABEsSlAAcAAAAcAAAEkAAABKxGVUpJ
    RklMTQAARmluZVBpeCBGNDU1ICAgAAAAAEgAAAABAAAASAAAAA==
</div>
```
