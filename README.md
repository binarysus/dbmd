# dbmd - discord bot mark down
Markdown language and parser to convert plaintext to a json object which can be used by a discord bot to easily render a message with features such as dynamic codeblocks, buttons and so on.

**dbmd** is a plaintext to json markdown language with which a user can write up easily managable messages formatted for easy use in discord bots with features such as easy pagination, dynamic codeblocking, buttons and so on.

The language aims at ease of use and simplicity on both ends, plaintext *and* code.

## Formatting not handled by the parser

Note that the parser ignores any formatting you do for discord to handle so stuff like \*italic*, \*\*bold**, \_\_underlined__, \~\~strikethrough\~~, \`Inline codeblocks\`,
\`\`\`
codeblocks
\`\`\`
and so on will be ignored by the parser and be rendered in discord as

*italic*, **bold**, __underlined__, s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ , `Inline codeblocks` and
```
codeblocks
```

## Formatting handled by the parser

The plaintext is seperated into different pages and each page has two parts, text components and non-text components

### Text components

Text components are fully dependant on text and do not require any external work on the code side after it has been parsed.
The different text components are:

#### \# Page titles

The parser seperates the plaintext into different pages for easy pagination and therefore there is a need for labeling each page.

Each page should be titled in the format `# My title`. Note that the space after the `#` is mandatory and will result in a wrong parse if omitted.
The contents of the title can include anything but a newline character.

#### \<!-- Comments -->

Comments are always necessary for maintainability and so our parser supports both inline and multiline comments.

Inline comments are formatted as `<!-- My comment -->` and multiline comments are formatted as:
```
<!--
  Here
  is
  my 
  multiline
  comment
  xD
-->
```
Note that you can use either `<!-- comment -->` or `<!--- comment --->` in both cases!

#### [+Dynamic code blocks+]

Dynamic code blocks are code blocks which can be easily swapped between different blocks based on sub labels. The format to be used is `[+Label+]` and each dynamic codeblock can have sublabels configured later on in [Non-text components]().
Note that you can still use static codeblocks in the format \`\`\`codeblock\`\`\` without the parser interfering!

### Non-text components

Components which are handled internally by bots are Non-text components. Currently they only include Dynamic codeblock sub labels and Buttons but will potentially support dropdowns and so on in the future.

Text components and non text components are to be seperated by `###---###` in each pages.

#### Dynamic codeblock sub labels

Each dynamic codeblock should have atleast one sublabel. they are formatted as:
```
$$code-block-label$$
>>>sublabel
Write your code here!
as many lines as you want : D
>>>sublabel2
each label can have as many amounts of sublabels as you want as long as they're uniquely named

$$code-block-label2$$
>>>note
keep in mind that it is mandatory for each dynamic code block to have atleast one sub-label
```

#### Buttons

Each page can have upto 5 button rows and each row can have upto 5 buttons (corresponding to the number of rows and buttons a message can have).
A row is represented by `::::` on both ends with buttons inside which are seperated by `%%%%`

The formatting goes as follows:

```
::::

style: PRIMARY
label: my button label
customId: my-id
disabled: false

%%%%

style: SUCCESS
label: pwetty green button
customId: gween
disabled: true

::::

::::

style: LINK
label: click me!
link: https://paste.cheeze2000.net/funosu

::::
```

##### Button properties
Buttons have a set of properties, most of which are optional. They are:

```
style: one of ["PRIMARY", "SECONDARY", "SUCCESS", "DANGER", "LINK"] (defaults to primary)
label: text that appears on the button, max 80 characters (Mandatory field)
custom_id: a user identifier for the button, max 100 characters (defaults to a generated id)
url:	string	a url for link-style buttons (only for LINK buttons)
disabled:	whether the button is disabled (default false)
```

read more about buttons [here](https://discord.com/developers/docs/interactions/message-components#buttons).

you can view a sample input of the pre-parse data [here](https://github.com/binarysus/dbmd/blob/main/sample.txt) and the parsed json data [here](https://github.com/binarysus/dbmd/blob/main/output.json).

Author: itsUrcute.
