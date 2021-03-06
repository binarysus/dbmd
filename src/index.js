function parse(input) {

  // Remove comments.
  input = input.replace(/<!(-{2,3}).+?\1>/gs, "");

  // Extracting page titles
  const unFilteredTitles = input.match(/(?<=^# ).+/gm);
  const titles = [];

  const unFilteredPages = input.split(/^# .+\s*$/gm);
  unFilteredPages.shift();

  // Remove blank pages and their corresponding titles.
  const pages = [];
  for (let i = 0; i < unFilteredPages.length; i++) {
    if (/\S+/.test(unFilteredPages[i])) {
      pages.push(unFilteredPages[i]);
      titles.push(unFilteredTitles[i]);
    }
    else {
      console.warn("Empty page detected");
    }
  }

  // Extracting extra components from each page.
  const components = [];
  for (let i = 0; i < pages.length; i++) {
    const x = pages[i].split(/^###---###$/gm);
    components.push(x[1] ?? "");
    pages[i] = x[0].trim();
  }

  // Extracting code blocks from components.
  const codeBlocks = [];
  for (let i = 0; i < components.length; i++) {
    codeBlocks[i] = [];
    const x = components[i].matchAll(/\$\$(?<label>.+?)\$\$\n(?<content>.+?)(?=\$\$.+?\$\$\n|::::|# .+?\n)/gs);
    for (const e of x) {
      let a = e.groups.content.split(/^>>>.+?\n\s*/gm);
      a.shift();

      const l = e.groups.content.match(/(?<=^>>>).+?(?=\n)/gm);
      if (a.some(e => !/\S+/.test(e))) throw new Error("Empty codeblock detected");
      a = a.map((y, i) => { return { label: l[i], content: "```" + l[i].split(" ")[0] + "\n" + y + "```" }; });
      codeBlocks[i].push({ name: e.groups.label, content: a });
    }
  }

  // Extracting Button rows from components and converting to button objects.
  const buttons = [];
  for (let i = 0; i < components.length; i++) {
    buttons[i] = [];
    const x = components[i].matchAll(/::::\n(?<content>.+?)::::/gs);
    for (const e of x) {
      let ind = e.groups.content.split(/^%%%%\n/gm);
      ind = ind.filter(y => /\S+/.test(y));
      ind = ind.map(s => {
        const cl = s.trim().split("\n");
        const obj = {};
        cl.forEach(f => {
          const [k, v] = f.split(/(?<!:.*)\s*:\s*/);
          if (!v) throw new Error("Missing button field");
          obj[k] = v;
        });
        buttons[i].push(obj);
      });
    }
  }

  // Combining everything into an array of page objects.
  const output = [];
  for (let i = 0; i < pages.length; i++) {
    const pageObject = {};
    pageObject.title = titles[i];
    pageObject.content = pages[i];
    pageObject.codeblocks = codeBlocks[i];
    pageObject.buttons = buttons[i];
    output.push(pageObject);
  }

  return output;
}

module.exports.parse = parse;
