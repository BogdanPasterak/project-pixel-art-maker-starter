# Pixel Art Maker Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

To get started, open `designs.js` and start building out the app's functionality.

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.



## Bogdan Pasterak ##

Udacity course student - Google Developer Challenge Scholarship: Front-End Web Dev.

# My work

- I started with performing the tasks listed in the specification.
- I quickly noticed some errors in this project.
  1. After resizing, the image was cleaned.
  2. Drawing support caused several problems.
    a. The lines were not still.
    b. Sometimes the system tried to perform "drag and drop" operations.
    c. Going outside the area resulted in undesirable effects.
  3. The design was unattractive and difficult to use.
  4. It did not react to the changed dimensions of the document, it was not responsive.
- Systematically day by day I tried to remove these errors.

Ad 1. This task was quite simple. All you need to do is check inside the loop whether
  the row or cell exists. There were three states possible. It existed but it should not,
  existed and should stay, it did not exist and it had to exist.
  During the construction of the table, each td element is still a unique ID containing
  the row and column number. Here, too, I added the third parameter, the size of a single
  pixel, limiting it to min 3. The next step was to limit the size of the div, validate
  the entered data and interact with them. You entered the fourth parameter, check box
  blocking the pixel size. It was possible to delete the submit button and perform
  validation and redrawing of the offhand grid.

Ad 2. Hand-drawn drawing will only give continuous lines when we connect individual
  points with line segments. For this goal, I built the class Point, cooperating with cells.
  Next, the Line class whose one "l" object supports all drawing operations. The line
  contains two Point (start and stop) objects and an activity marker. It stores a line
  in the array of painted pots, which allows you to restore these colours. It was relatively
  easy to remove the "drag and drop" effect. Function "event.preventDefault();" protection
  against draggable. With the activity marker, it was also easy to check whether it was
  the beginning of drawing or just leaving the area.
    The ready procedure of the line allowed to easily improve the functionality of the
  project. After adding the line, it was time for a rectangle and a circle.
  It was time for filling and smearing. Filling is built very simply thanks to my favourite method "Recursive Procedure".

Ad 3. Removing the submit key improves interaction with the user. Unfriendly to use was
  the   choice of colours. That's why I decided to add tables of basic colours.
  The additional 8 colours are predefined by the user in the colour selection with colorPicker.
  The new colour is inserted in place of the least used colour. The animated title is more
  attractive. The problem with loading fonts and solving it was described in the forum.
  (https://discussions.udacity.com/t/art-final-project-pixel-art-maker-art/450105/415)
  In addition, the background image is made by hand. Also blink effect when changing the size
  of the grid showing the corrections made. Combining a checkbox with a label also makes
  the choice of mode easier.

Ad 4. The reaction to change the size is:
  - matching grid dimensions (min-width 300px).
  - match the length of the title.
  - centring and animation of the title.
  - folding (shortening) the row of grid sizes selection.
  - folding (shortening) row with selection of drawing mode.
  - plans to operate mobile devices.


# A working version also on CodePen (https://codepen.io/BogdanPasterak/pen/YYEmRd)
# Detailed explanations also inside the code in the comments.
# Additional questions please contact me (mailto:bogdanpasterak@gmail.com)

# I wish you fun Bogdan Pasterak
